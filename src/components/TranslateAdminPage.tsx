import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Languages,
  Loader2,
  Play,
  Square,
  AlertCircle,
} from 'lucide-react';
import type { Lesson } from '../types/lesson';
import {
  LANGUAGE_OPTIONS,
  buildPreTranslationExportJson,
  extractLessonSections,
  getCachedSectionTranslation,
  getPreTranslatedSection,
  streamSectionTranslation,
  type LessonTranslationSection,
  type TranslatableLanguage,
} from '../utils/lessonTranslation';

interface TranslateAdminPageProps {
  lessons: Lesson[];
  onBackToApp: () => void;
}

type AdminSectionStatus = 'pending' | 'pretranslated' | 'cached' | 'translating' | 'done' | 'error';

interface AdminSectionState {
  status: AdminSectionStatus;
  translations?: Record<string, string>;
  error?: string;
}

const ADMIN_LANGUAGES = LANGUAGE_OPTIONS.filter(
  (opt): opt is { id: TranslatableLanguage; label: string; nativeLabel: string } =>
    opt.id !== 'en'
);

const MAX_CONCURRENCY = 4;

export function TranslateAdminPage({ lessons, onBackToApp }: TranslateAdminPageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<TranslatableLanguage>('te');
  const [forceRegenerate, setForceRegenerate] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [statesByFullId, setStatesByFullId] = useState<Record<string, AdminSectionState>>({});
  const abortControllerRef = useRef<AbortController | null>(null);

  const selectedLanguageOption =
    ADMIN_LANGUAGES.find((l) => l.id === selectedLanguage) ?? ADMIN_LANGUAGES[0];

  const lessonGroups = useMemo(() => {
    return lessons
      .map((lesson, lessonIdx) => ({ lesson, lessonIdx }))
      .filter(({ lesson }) => !lesson.comingSoon)
      .map(({ lesson, lessonIdx }) => ({
        lesson,
        lessonIdx,
        sections: extractLessonSections(lesson),
      }));
  }, [lessons]);

  const allItems = useMemo(() => {
    const items: Array<{ lessonId: string; section: LessonTranslationSection }> = [];
    for (const group of lessonGroups) {
      for (const sec of group.sections) {
        items.push({ lessonId: group.lesson.id, section: sec });
      }
    }
    return items;
  }, [lessonGroups]);

  // Seed status from pre-translations & browser cache whenever language changes
  useEffect(() => {
    abortControllerRef.current?.abort();
    setIsRunning(false);

    const initial: Record<string, AdminSectionState> = {};
    for (const { section } of allItems) {
      const pre = getPreTranslatedSection(section.fullId, section.version, selectedLanguage);
      if (pre) {
        initial[section.fullId] = { status: 'pretranslated', translations: pre };
        continue;
      }
      const cached = getCachedSectionTranslation(
        section.fullId,
        section.version,
        selectedLanguage
      );
      if (cached) {
        initial[section.fullId] = { status: 'cached', translations: cached };
        continue;
      }
      initial[section.fullId] = { status: 'pending' };
    }
    setStatesByFullId(initial);

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [allItems, selectedLanguage]);

  const counts = useMemo(() => {
    let completed = 0;
    let pretranslated = 0;
    let cached = 0;
    let generated = 0;
    let errors = 0;

    for (const { section } of allItems) {
      const st = statesByFullId[section.fullId]?.status ?? 'pending';
      if (st === 'pretranslated') {
        pretranslated++;
        completed++;
      } else if (st === 'cached') {
        cached++;
        completed++;
      } else if (st === 'done') {
        generated++;
        completed++;
      } else if (st === 'error') {
        errors++;
      }
    }

    return {
      total: allItems.length,
      completed,
      pretranslated,
      cached,
      generated,
      errors,
    };
  }, [allItems, statesByFullId]);

  const handleStop = () => {
    abortControllerRef.current?.abort();
    setIsRunning(false);
  };

  const handleGenerateAll = async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsRunning(true);

    const queue = allItems.filter(({ section }) => {
      if (forceRegenerate) return true;
      const st = statesByFullId[section.fullId]?.status;
      return st !== 'pretranslated' && st !== 'cached' && st !== 'done';
    });

    if (queue.length === 0) {
      setIsRunning(false);
      return;
    }

    let cursor = 0;

    const worker = async () => {
      while (!controller.signal.aborted) {
        const idx = cursor++;
        if (idx >= queue.length) break;
        const { lessonId, section } = queue[idx];

        setStatesByFullId((prev) => ({
          ...prev,
          [section.fullId]: {
            status: 'translating',
            translations: prev[section.fullId]?.translations,
          },
        }));

        try {
          const finalMap = await streamSectionTranslation({
            lessonId,
            section,
            language: selectedLanguage,
            signal: controller.signal,
            onPartial: (partialMap) => {
              if (controller.signal.aborted) return;
              setStatesByFullId((prev) => ({
                ...prev,
                [section.fullId]: {
                  status: 'translating',
                  translations: {
                    ...(prev[section.fullId]?.translations ?? {}),
                    ...partialMap,
                  },
                },
              }));
            },
          });

          if (!controller.signal.aborted) {
            setStatesByFullId((prev) => ({
              ...prev,
              [section.fullId]: {
                status: 'done',
                translations: finalMap,
              },
            }));
          }
        } catch (err: unknown) {
          if (controller.signal.aborted) break;
          const msg = err instanceof Error ? err.message : 'Translation failed.';
          setStatesByFullId((prev) => ({
            ...prev,
            [section.fullId]: {
              status: 'error',
              error: msg,
            },
          }));
        }
      }
    };

    const workers = Array.from({ length: Math.min(MAX_CONCURRENCY, queue.length) }, () =>
      worker()
    );
    await Promise.all(workers);

    if (!controller.signal.aborted) {
      setIsRunning(false);
    }
  };

  const handleDownloadJson = () => {
    const sectionsMap: Record<string, { version: string; translations: Record<string, string> }> =
      {};

    for (const { section } of allItems) {
      const state = statesByFullId[section.fullId];
      if (state?.translations && Object.keys(state.translations).length > 0) {
        sectionsMap[section.fullId] = {
          version: section.version,
          translations: state.translations,
        };
      }
    }

    const jsonText = buildPreTranslationExportJson(selectedLanguage, sectionsMap);
    const blob = new Blob([jsonText], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedLanguage}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const progressPercent =
    counts.total > 0 ? Math.round((counts.completed / counts.total) * 100) : 0;

  return (
    <div className="py-4 sm:py-8 max-w-5xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          type="button"
          onClick={onBackToApp}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to GitStart</span>
        </button>

        <span className="font-mono text-[11px] text-on-surface-variant">
          Pre-translation generator (/translate-admin)
        </span>
      </div>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs tracking-[0.12em] text-primary font-semibold uppercase mb-2">
          <Languages className="w-3.5 h-3.5" />
          <span>Translation Admin</span>
        </div>
        <h1 className="text-[32px] sm:text-[42px] leading-[1.12] font-normal tracking-[-0.02em] text-on-surface mb-2.5">
          Pre-translate Lesson Sections
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-[66ch]">
          Generate every lesson section once for Telugu, Hindi, or Tamil, then download the JSON file and save it to{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface-container-low border border-outline-variant/35">
            translations/{selectedLanguage}.json
          </code>{' '}
          so learners see translated lessons immediately.
        </p>
      </header>

      {/* Controls Card */}
      <section className="rounded-xl border border-outline-variant/45 bg-surface-container-lowest p-5 sm:p-6 mb-8 space-y-5 shadow-[0_2px_12px_-2px_rgba(28,25,23,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Choose target language"
            className="inline-flex flex-wrap items-center rounded-lg bg-surface-container-low border border-outline-variant/40 p-1 gap-1"
          >
            {ADMIN_LANGUAGES.map((opt) => {
              const active = selectedLanguage === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isRunning}
                  onClick={() => setSelectedLanguage(opt.id)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer disabled:opacity-60 ${
                    active
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {opt.label} ({opt.nativeLabel})
                </button>
              );
            })}
          </div>

          <label className="inline-flex items-center gap-2 text-xs text-on-surface-variant cursor-pointer select-none">
            <input
              type="checkbox"
              checked={forceRegenerate}
              disabled={isRunning}
              onChange={(e) => setForceRegenerate(e.target.checked)}
              className="accent-primary w-3.5 h-3.5 cursor-pointer"
            />
            <span>Re-translate sections already cached</span>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!isRunning ? (
            <button
              type="button"
              onClick={handleGenerateAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-medium hover:bg-primary-container transition-colors cursor-pointer shadow-xs"
            >
              <Play className="w-4 h-4 shrink-0" />
              <span>Generate all translations for {selectedLanguageOption.label}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStop}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-fixed/40 border border-primary/45 text-primary text-sm font-medium hover:bg-primary-fixed/60 transition-colors cursor-pointer"
            >
              <Square className="w-4 h-4 shrink-0" />
              <span>Stop generation</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDownloadJson}
            disabled={counts.completed === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface text-sm font-medium hover:border-primary/45 hover:text-primary transition-colors cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>Download {selectedLanguage}.json</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 pt-2 border-t border-outline-variant/25">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-medium text-on-surface tabular-nums">
              Progress: {counts.completed} of {counts.total} sections ready ({progressPercent}%)
            </span>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-on-surface-variant tabular-nums">
              <span>Pre-translated: {counts.pretranslated}</span>
              <span>Cached: {counts.cached}</span>
              <span>Generated: {counts.generated}</span>
              {counts.errors > 0 && <span className="text-primary">Errors: {counts.errors}</span>}
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
            <div
              className="h-full bg-secondary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* Per-Lesson Section Breakdown */}
      <div className="space-y-5">
        {lessonGroups.map(({ lesson, lessonIdx, sections }) => {
          const doneInLesson = sections.filter((sec) => {
            const st = statesByFullId[sec.fullId]?.status;
            return st === 'pretranslated' || st === 'cached' || st === 'done';
          }).length;

          return (
            <section
              key={lesson.id}
              className="rounded-xl border border-outline-variant/45 bg-surface-container-lowest overflow-hidden"
            >
              <div className="px-5 py-3.5 bg-surface-container-low/60 border-b border-outline-variant/30 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-primary mr-2">
                    Lesson {String(lessonIdx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium text-on-surface">{lesson.cardTitle}</span>
                </div>
                <span className="font-mono text-xs text-on-surface-variant tabular-nums">
                  {doneInLesson}/{sections.length} sections
                </span>
              </div>

              <div className="divide-y divide-outline-variant/20">
                {sections.map((sec) => {
                  const st = statesByFullId[sec.fullId] ?? { status: 'pending' as const };
                  const previewVal = st.translations
                    ? Object.values(st.translations).find((v) => v.trim().length > 0)
                    : undefined;

                  return (
                    <div
                      key={sec.fullId}
                      className="px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-on-surface">{sec.title}</span>
                          <span className="font-mono text-[10px] text-on-surface-variant/80">
                            {sec.fullId}
                          </span>
                        </div>
                        {previewVal && (
                          <p className="text-[11px] text-on-surface-variant truncate mt-0.5 max-w-[65ch]">
                            {previewVal}
                          </p>
                        )}
                        {st.status === 'error' && st.error && (
                          <p className="text-[11px] text-primary mt-0.5">{st.error}</p>
                        )}
                      </div>

                      <div className="shrink-0">
                        {st.status === 'translating' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-fixed/25 text-primary font-medium">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>Translating...</span>
                          </span>
                        )}
                        {(st.status === 'done' ||
                          st.status === 'pretranslated' ||
                          st.status === 'cached') && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary-container/30 text-on-secondary-container font-medium">
                            <CheckCircle2 className="w-3 h-3 text-secondary" />
                            <span>
                              {st.status === 'pretranslated'
                                ? 'Pre-translated'
                                : st.status === 'cached'
                                  ? 'Cached'
                                  : 'Generated'}
                            </span>
                          </span>
                        )}
                        {st.status === 'error' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-fixed/30 text-primary font-medium">
                            <AlertCircle className="w-3 h-3" />
                            <span>Error</span>
                          </span>
                        )}
                        {st.status === 'pending' && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface-variant">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
