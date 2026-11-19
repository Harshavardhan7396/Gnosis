import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { Lesson } from '../types/lesson';
import {
  applyTranslatedEntries,
  extractLessonSections,
  getInstantSectionTranslation,
  getLanguageLabel,
  isTranslatableLanguage,
  streamSectionTranslation,
  type LessonTranslationSection,
  type SupportedLanguage,
} from '../utils/lessonTranslation';

export type SectionTranslationStatus =
  | 'idle'
  | 'queued'
  | 'streaming'
  | 'ready'
  | 'error';

interface SectionRuntimeState {
  status: SectionTranslationStatus;
  translations: Record<string, string>;
  error?: string;
}

export interface LessonTranslationContextValue {
  language: SupportedLanguage;
  languageLabel: string;
  lessonId: string;
  getSectionStatus: (sectionId: string) => SectionTranslationStatus;
  getSectionError: (sectionId: string) => string | undefined;
  isSectionShowingEnglish: (sectionId: string) => boolean;
  toggleSectionEnglish: (sectionId: string) => void;
  retrySection: (sectionId: string) => void;
}

const LessonTranslationContext = createContext<LessonTranslationContextValue | null>(null);

const MAX_CONCURRENT_REQUESTS = 4;

export function LessonTranslationProvider({
  value,
  children,
}: {
  value: LessonTranslationContextValue;
  children: ReactNode;
}) {
  return (
    <LessonTranslationContext.Provider value={value}>
      {children}
    </LessonTranslationContext.Provider>
  );
}

export function useLessonTranslation(): LessonTranslationContextValue {
  const ctx = useContext(LessonTranslationContext);
  if (!ctx) {
    return {
      language: 'en',
      languageLabel: 'English',
      lessonId: '',
      getSectionStatus: () => 'idle',
      getSectionError: () => undefined,
      isSectionShowingEnglish: () => false,
      toggleSectionEnglish: () => {},
      retrySection: () => {},
    };
  }
  return ctx;
}

export function useLessonTranslationSession({
  lesson,
  language,
  enabled,
}: {
  lesson: Lesson;
  language: SupportedLanguage;
  enabled: boolean;
}) {
  const sections = useMemo(() => extractLessonSections(lesson), [lesson]);
  const [sectionStates, setSectionStates] = useState<Record<string, SectionRuntimeState>>({});
  const [englishOverrides, setEnglishOverrides] = useState<Record<string, boolean>>({});

  const sectionsRef = useRef<LessonTranslationSection[]>(sections);
  sectionsRef.current = sections;

  const statesRef = useRef<Record<string, SectionRuntimeState>>(sectionStates);
  statesRef.current = sectionStates;

  const queueRef = useRef<string[]>([]);
  const visibleIdsRef = useRef<Set<string>>(new Set());
  const inFlightRef = useRef<Set<string>>(new Set());
  const controllersRef = useRef<Map<string, AbortController>>(new Map());
  const sessionTokenRef = useRef<number>(0);

  const abortAllRequests = useCallback(() => {
    sessionTokenRef.current += 1;
    controllersRef.current.forEach((ctrl) => ctrl.abort());
    controllersRef.current.clear();
    inFlightRef.current.clear();
    queueRef.current = [];
    visibleIdsRef.current.clear();
  }, []);

  const pumpQueue = useCallback(() => {
    if (!enabled || !isTranslatableLanguage(language)) return;
    const token = sessionTokenRef.current;

    while (
      inFlightRef.current.size < MAX_CONCURRENT_REQUESTS &&
      queueRef.current.length > 0
    ) {
      // Prioritize sections currently on screen first, keeping lesson order as tie-breaker
      let pickIdx = 0;
      const visiblePick = queueRef.current.findIndex((sId) => visibleIdsRef.current.has(sId));
      if (visiblePick !== -1) {
        pickIdx = visiblePick;
      }

      const [nextSectionId] = queueRef.current.splice(pickIdx, 1);
      if (!nextSectionId || inFlightRef.current.has(nextSectionId)) continue;

      const section = sectionsRef.current.find((s) => s.sectionId === nextSectionId);
      if (!section) continue;

      const currentState = statesRef.current[nextSectionId];
      if (currentState?.status === 'ready') continue;

      inFlightRef.current.add(nextSectionId);
      const controller = new AbortController();
      controllersRef.current.set(nextSectionId, controller);

      setSectionStates((prev) => ({
        ...prev,
        [nextSectionId]: {
          status: 'streaming',
          translations: prev[nextSectionId]?.translations ?? {},
        },
      }));

      streamSectionTranslation({
        lessonId: lesson.id,
        section,
        language,
        signal: controller.signal,
        onPartial: (partialMap) => {
          if (sessionTokenRef.current !== token || controller.signal.aborted) return;
          setSectionStates((prev) => ({
            ...prev,
            [nextSectionId]: {
              status: 'streaming',
              translations: {
                ...(prev[nextSectionId]?.translations ?? {}),
                ...partialMap,
              },
            },
          }));
        },
      })
        .then((finalMap) => {
          if (sessionTokenRef.current !== token || controller.signal.aborted) return;
          setSectionStates((prev) => ({
            ...prev,
            [nextSectionId]: {
              status: 'ready',
              translations: finalMap,
            },
          }));
        })
        .catch((err: unknown) => {
          if (sessionTokenRef.current !== token || controller.signal.aborted) return;
          const msg =
            err instanceof Error
              ? err.message
              : 'Could not translate this section right now.';
          setSectionStates((prev) => ({
            ...prev,
            [nextSectionId]: {
              status: 'error',
              translations: {},
              error: msg,
            },
          }));
        })
        .finally(() => {
          inFlightRef.current.delete(nextSectionId);
          controllersRef.current.delete(nextSectionId);
          if (sessionTokenRef.current === token) {
            pumpQueue();
          }
        });
    }
  }, [enabled, language, lesson.id]);

  const enqueueSectionsWithLookahead = useCallback(
    (visibleIndices: number[]) => {
      if (!enabled || !isTranslatableLanguage(language)) return;

      const list = sectionsRef.current;
      const toQueueIndices = new Set<number>();

      for (const idx of visibleIndices) {
        if (idx >= 0 && idx < list.length) {
          toQueueIndices.add(idx);
          if (idx + 1 < list.length) toQueueIndices.add(idx + 1);
          if (idx + 2 < list.length) toQueueIndices.add(idx + 2);
        }
      }

      const sorted = Array.from(toQueueIndices).sort((a, b) => a - b);
      let added = false;

      setSectionStates((prev) => {
        let next = prev;
        for (const idx of sorted) {
          const sec = list[idx];
          if (!sec) continue;
          const existing = prev[sec.sectionId];
          if (
            existing &&
            (existing.status === 'ready' ||
              existing.status === 'streaming' ||
              existing.status === 'queued')
          ) {
            continue;
          }
          if (!queueRef.current.includes(sec.sectionId) && !inFlightRef.current.has(sec.sectionId)) {
            queueRef.current.push(sec.sectionId);
            added = true;
            if (next === prev) next = { ...prev };
            next[sec.sectionId] = {
              status: 'queued',
              translations: existing?.translations ?? {},
            };
          }
        }
        return next;
      });

      if (added || queueRef.current.length > 0) {
        pumpQueue();
      }
    },
    [enabled, language, pumpQueue]
  );

  // Initialize pre-translated / cached sections and observe scroll visibility
  useEffect(() => {
    abortAllRequests();
    setEnglishOverrides({});

    if (!enabled || !isTranslatableLanguage(language)) {
      setSectionStates({});
      return;
    }

    const initialMap: Record<string, SectionRuntimeState> = {};
    for (const sec of sections) {
      const instant = getInstantSectionTranslation(sec, language);
      if (instant) {
        initialMap[sec.sectionId] = {
          status: 'ready',
          translations: instant.translations,
        };
      }
    }
    setSectionStates(initialMap);
    statesRef.current = initialMap;

    const scanInitialVisible = () => {
      const vh = window.innerHeight || 800;
      const visibleIndices: number[] = [];

      sections.forEach((sec, idx) => {
        const el =
          document.querySelector<HTMLElement>(`[data-translate-section="${sec.sectionId}"]`) ??
          document.getElementById(sec.domId);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh + 200 && rect.bottom >= -150) {
          visibleIndices.push(idx);
          visibleIdsRef.current.add(sec.sectionId);
        }
      });

      if (visibleIndices.length === 0 && sections.length > 0) {
        visibleIndices.push(0);
        visibleIdsRef.current.add(sections[0].sectionId);
      }

      enqueueSectionsWithLookahead(visibleIndices);
    };

    const rafId = window.requestAnimationFrame(scanInitialVisible);

    const observer = new IntersectionObserver(
      (entries) => {
        const newlyVisibleIndices: number[] = [];
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          const sId =
            target.getAttribute('data-translate-section') || target.id;
          const idx = sections.findIndex(
            (s) => s.sectionId === sId || s.domId === sId
          );
          if (idx === -1) continue;

          if (entry.isIntersecting) {
            visibleIdsRef.current.add(sections[idx].sectionId);
            newlyVisibleIndices.push(idx);
          } else {
            visibleIdsRef.current.delete(sections[idx].sectionId);
          }
        }
        if (newlyVisibleIndices.length > 0) {
          enqueueSectionsWithLookahead(newlyVisibleIndices);
        }
      },
      {
        rootMargin: '250px 0px 450px 0px',
        threshold: 0.01,
      }
    );

    const attachRafId = window.requestAnimationFrame(() => {
      for (const sec of sections) {
        const el =
          document.querySelector<HTMLElement>(`[data-translate-section="${sec.sectionId}"]`) ??
          document.getElementById(sec.domId);
        if (el) {
          observer.observe(el);
        }
      }
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.cancelAnimationFrame(attachRafId);
      observer.disconnect();
      abortAllRequests();
    };
  }, [abortAllRequests, enabled, enqueueSectionsWithLookahead, language, lesson.id, sections]);

  const toggleSectionEnglish = useCallback((sectionId: string) => {
    setEnglishOverrides((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  }, []);

  const retrySection = useCallback(
    (sectionId: string) => {
      if (!enabled || !isTranslatableLanguage(language)) return;
      setSectionStates((prev) => ({
        ...prev,
        [sectionId]: {
          status: 'queued',
          translations: {},
        },
      }));
      if (!queueRef.current.includes(sectionId) && !inFlightRef.current.has(sectionId)) {
        visibleIdsRef.current.add(sectionId);
        queueRef.current.unshift(sectionId);
        pumpQueue();
      }
    },
    [enabled, language, pumpQueue]
  );

  const activeLesson = useMemo(() => {
    if (!enabled || language === 'en') {
      return lesson;
    }
    const mergedTranslations: Record<string, string> = {};
    for (const sec of sections) {
      if (englishOverrides[sec.sectionId]) continue;
      const runtime = sectionStates[sec.sectionId];
      if (runtime?.translations) {
        Object.assign(mergedTranslations, runtime.translations);
      }
    }
    if (Object.keys(mergedTranslations).length === 0) {
      return lesson;
    }
    return applyTranslatedEntries(lesson, mergedTranslations);
  }, [enabled, englishOverrides, language, lesson, sectionStates, sections]);

  const stats = useMemo(() => {
    if (!enabled || language === 'en') {
      return { total: 0, ready: 0, active: 0, hasAnyTranslated: false };
    }
    let ready = 0;
    let active = 0;
    for (const sec of sections) {
      const st = sectionStates[sec.sectionId]?.status;
      if (st === 'ready') ready++;
      else if (st === 'queued' || st === 'streaming') active++;
    }
    return {
      total: sections.length,
      ready,
      active,
      hasAnyTranslated: ready > 0 || active > 0,
    };
  }, [enabled, language, sectionStates, sections]);

  const contextValue = useMemo<LessonTranslationContextValue>(
    () => ({
      language,
      languageLabel: getLanguageLabel(language),
      lessonId: lesson.id,
      getSectionStatus: (sectionId: string) =>
        sectionStates[sectionId]?.status ?? 'idle',
      getSectionError: (sectionId: string) => sectionStates[sectionId]?.error,
      isSectionShowingEnglish: (sectionId: string) =>
        Boolean(englishOverrides[sectionId]),
      toggleSectionEnglish,
      retrySection,
    }),
    [englishOverrides, language, lesson.id, retrySection, sectionStates, toggleSectionEnglish]
  );

  return {
    activeLesson,
    contextValue,
    stats,
  };
}
