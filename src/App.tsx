/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { lessons as rawLessons, roadmapLevels as rawRoadmapLevels } from './data/lessons.js';
import type { Lesson, ProgressStep, RoadmapLevel } from './types/lesson';
import { TopBar } from './components/TopBar';
import { StickyStepTracker } from './components/StickyStepTracker';
import { LessonsPage } from './components/LessonsPage';
import { GlossaryPage } from './components/GlossaryPage';
import { PracticeSandboxPage } from './components/PracticeSandboxPage';
import { WhereAmIStuckPage } from './components/WhereAmIStuckPage';
import { CheatSheetPage } from './components/CheatSheetPage';
import { FeedbackDashboardPage } from './components/FeedbackDashboardPage';
import { TranslateAdminPage } from './components/TranslateAdminPage';
import { FinishScreenPage } from './components/FinishScreenPage';
import { HeroSection } from './components/HeroSection';
import { ProgressRow } from './components/ProgressRow';
import { ConceptLessonSections } from './components/ConceptLessonSections';
import { StepSection } from './components/StepSection';
import { PracticeScreen } from './components/PracticeScreen';
import { VocabularySection } from './components/VocabularySection';
import { BranchDiagramSection } from './components/BranchDiagramSection';
import { QuizAndCompletionSection } from './components/QuizAndCompletionSection';
import { CheatSheetModal } from './components/CheatSheetModal';
import { Footer } from './components/Footer';
import { AskGitStartBox } from './components/AskGitStartBox';
import { ContextualAskDrawer } from './components/ContextualAskDrawer';
import { SelectionAskFloatingButton } from './components/SelectionAskFloatingButton';
import { AskContextProvider } from './context/AskContext';
import { SpeechProvider, useSpeech } from './context/SpeechContext';
import {
  LessonTranslationProvider,
  useLessonTranslationSession,
} from './context/LessonTranslationContext';
import { getStreakState, recordActivityToday, type StreakState } from './utils/streak';
import {
  getDueReviewLessons,
  recordReviewOutcome,
  removeLessonReviewSchedule,
  scheduleLessonCompletionReview,
  snoozeLessonReview,
  syncCompletedLessonsReview,
  type SpacedReviewMap,
} from './utils/spacedReview';
import { LanguageBar } from './components/LanguageBar';
import {
  applySettingsToDocument,
  getSavedSettings,
  resolveTheme,
  saveSettings,
  type AppSettings,
  type ResolvedTheme,
  type TextSize,
  type ThemePreference,
} from './utils/settings';
import {
  getSavedLanguage,
  saveLanguage,
  type SupportedLanguage,
} from './utils/lessonTranslation';
import {
  getLessonLockReason,
  getLevelUnlockMap,
  isLessonUnlocked,
} from './utils/lessonUnlock';

const lessons = rawLessons as Lesson[];
const roadmapLevels = rawRoadmapLevels as RoadmapLevel[];
const STORAGE_KEY = 'gitstart-progress-v1';
const LAST_LESSON_STORAGE_KEY = 'gitstart-last-lesson-v1';

interface SavedProgress {
  completedStepIds: string[];
  selectedAnswers: Record<string, string>;
  quizScore: number;
  quizTotal: number;
  lessonCompleted: boolean;
}

const EMPTY_PROGRESS: SavedProgress = {
  completedStepIds: [],
  selectedAnswers: {},
  quizScore: 0,
  quizTotal: 0,
  lessonCompleted: false,
};

const TUTORIAL_SCROLL_STEP_MAP: Array<{ elementId: string; progressStepId: string }> = [
  { elementId: 'hero-overview', progressStepId: 'open-repo' },
  { elementId: 'step-01', progressStepId: 'create-file' },
  { elementId: 'step-02', progressStepId: 'name-write' },
  { elementId: 'step-03', progressStepId: 'commit' },
  { elementId: 'practice', progressStepId: 'commit' },
  { elementId: 'quick-check', progressStepId: 'verify' },
];

const CONCEPT_SCROLL_STEP_MAP: Array<{ elementId: string; progressStepId: string }> = [
  { elementId: 'hero-overview', progressStepId: 'story' },
  { elementId: 'concept-story', progressStepId: 'story' },
  { elementId: 'concept-meaning', progressStepId: 'meaning' },
  { elementId: 'concept-diagram', progressStepId: 'diagram' },
  { elementId: 'concept-where', progressStepId: 'where' },
  { elementId: 'quick-check', progressStepId: 'verify' },
];

function computeQuizStats(
  lesson: Lesson,
  selectedAnswers: Record<string, string>
): { quizScore: number; quizTotal: number } {
  const questionList =
    lesson.quizzes && lesson.quizzes.length > 0
      ? lesson.quizzes
      : lesson.quiz
        ? [lesson.quiz]
        : [];
  if (questionList.length === 0) {
    return { quizScore: 0, quizTotal: 0 };
  }
  const quizScore = questionList.reduce((acc, q, idx) => {
    const key = q.id ?? `q-${idx}`;
    const chosenId = selectedAnswers[key];
    const isCorrect = q.options.some((opt) => opt.id === chosenId && opt.isCorrect);
    return acc + (isCorrect ? 1 : 0);
  }, 0);
  return { quizScore, quizTotal: questionList.length };
}

function readAllLessonProgress(): Record<string, SavedProgress> {
  const map: Record<string, SavedProgress> = {};
  for (const lesson of lessons) {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY}:${lesson.id}`);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<SavedProgress> & {
          selectedOptionId?: string | null;
        };
        const migratedAnswers: Record<string, string> = parsed.selectedAnswers
          ? { ...parsed.selectedAnswers }
          : parsed.selectedOptionId
            ? { 'q-0': parsed.selectedOptionId }
            : {};
        const stats = computeQuizStats(lesson, migratedAnswers);
        map[lesson.id] = {
          completedStepIds: parsed.completedStepIds ?? [],
          selectedAnswers: migratedAnswers,
          quizScore: typeof parsed.quizScore === 'number' ? parsed.quizScore : stats.quizScore,
          quizTotal: typeof parsed.quizTotal === 'number' ? parsed.quizTotal : stats.quizTotal,
          lessonCompleted: Boolean(parsed.lessonCompleted),
        };
      }
    } catch {
      // Ignore storage errors
    }
  }
  return map;
}

function readLastLessonId(): string | null {
  try {
    return localStorage.getItem(LAST_LESSON_STORAGE_KEY);
  } catch {
    return null;
  }
}

function isLessonQuizSolved(lesson: Lesson, selectedAnswers: Record<string, string>): boolean {
  const questionList =
    lesson.quizzes && lesson.quizzes.length > 0
      ? lesson.quizzes
      : lesson.quiz
        ? [lesson.quiz]
        : [];
  if (questionList.length === 0) return false;
  return questionList.every((q, idx) => {
    const key = q.id ?? `q-${idx}`;
    const chosenId = selectedAnswers[key];
    return q.options.some((opt) => opt.id === chosenId && opt.isCorrect);
  });
}

const LESSON_SANDBOX_CHALLENGE: Record<string, string> = {
  'add-first-file': 'challenge-1',
  'what-is-commit': 'challenge-2',
  'create-first-branch': 'challenge-3',
};

function isFeedbackRoute(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.replace(/\/+$/, '') === '/feedback';
}

function isTranslateAdminRoute(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.replace(/\/+$/, '') === '/translate-admin';
}

function SpeechRouteSync({
  view,
  lessonId,
  language,
}: {
  view: string;
  lessonId: string;
  language: SupportedLanguage;
}) {
  const { stop } = useSpeech();
  useEffect(() => {
    stop();
  }, [view, lessonId, language, stop]);
  return null;
}

export default function App() {
  const [currentView, setCurrentView] = useState<
    | 'lessons'
    | 'lesson'
    | 'glossary'
    | 'sandbox'
    | 'stuck'
    | 'cheat-sheet'
    | 'feedback'
    | 'translate-admin'
    | 'finished'
  >(() =>
    isTranslateAdminRoute()
      ? 'translate-admin'
      : isFeedbackRoute()
        ? 'feedback'
        : 'lessons'
  );
  const [focusedGlossaryKey, setFocusedGlossaryKey] = useState<string | null>(null);
  const [sandboxChallengeId, setSandboxChallengeId] = useState<string | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const currentLesson = lessons[activeLessonIndex];

  const [progressByLessonId, setProgressByLessonId] = useState<Record<string, SavedProgress>>(() =>
    readAllLessonProgress()
  );
  const [lastLessonId, setLastLessonId] = useState<string | null>(() => readLastLessonId());
  const [streakState, setStreakState] = useState<StreakState>(() => getStreakState());
  const [spacedReviewMap, setSpacedReviewMap] = useState<SpacedReviewMap>(() => {
    const initialProgress = readAllLessonProgress();
    const initialCompleted = lessons
      .filter((l) => initialProgress[l.id]?.lessonCompleted)
      .map((l) => l.id);
    return syncCompletedLessonsReview(initialCompleted);
  });
  const [settings, setSettings] = useState<AppSettings>(() => getSavedSettings());
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(getSavedSettings().theme)
  );
  const [language, setLanguage] = useState<SupportedLanguage>(() => getSavedLanguage());

  const currentProgress = progressByLessonId[currentLesson.id] ?? EMPTY_PROGRESS;
  const { completedStepIds, selectedAnswers, lessonCompleted } = currentProgress;

  const [activeProgressStepId, setActiveProgressStepId] = useState<string>(
    currentLesson.progressSteps?.[0]?.id ?? 'story'
  );
  const [showStickyTracker, setShowStickyTracker] = useState(false);
  const [modalMode, setModalMode] = useState<'cheat-sheet' | 'colophon' | null>(null);

  const playableLessons = useMemo(
    () => lessons.filter((lesson) => !lesson.comingSoon),
    []
  );

  const activePlayableIndex = useMemo(() => {
    const idx = playableLessons.findIndex((l) => l.id === currentLesson.id);
    return idx >= 0 ? idx : activeLessonIndex;
  }, [playableLessons, currentLesson.id, activeLessonIndex]);

  const nextPlayableIndex = useMemo(
    () => lessons.findIndex((l, idx) => idx > activeLessonIndex && !l.comingSoon),
    [activeLessonIndex]
  );

  const completedLessonIds = useMemo(
    () =>
      playableLessons
        .filter((lesson) => progressByLessonId[lesson.id]?.lessonCompleted)
        .map((l) => l.id),
    [playableLessons, progressByLessonId]
  );

  const completedLessonsCount = completedLessonIds.length;

  const allLevelsCompleted = useMemo(
    () =>
      roadmapLevels.length > 0 &&
      roadmapLevels.every((level) => {
        const levelLessons = lessons.filter((l) => l.levelId === level.id);
        return (
          levelLessons.length > 0 &&
          levelLessons.every(
            (l) => !l.comingSoon && Boolean(progressByLessonId[l.id]?.lessonCompleted)
          )
        );
      }),
    [progressByLessonId]
  );

  const dueReviews = useMemo(
    () => getDueReviewLessons(lessons, completedLessonIds, spacedReviewMap),
    [completedLessonIds, spacedReviewMap]
  );

  const firstUnfinishedIndex = useMemo(
    () =>
      lessons.findIndex(
        (lesson) => !lesson.comingSoon && !progressByLessonId[lesson.id]?.lessonCompleted
      ),
    [progressByLessonId]
  );

  const lastPlayableIndex = useMemo(() => {
    for (let i = lessons.length - 1; i >= 0; i--) {
      if (!lessons[i].comingSoon) return i;
    }
    return 0;
  }, []);

  const levelUnlockMap = useMemo(
    () => getLevelUnlockMap(roadmapLevels, lessons, progressByLessonId),
    [progressByLessonId]
  );

  const { unlockedLessonIds, lockReasonByLessonId } = useMemo(() => {
    const unlocked = new Set<string>();
    const reasons: Record<string, string> = {};
    let playableCounter = 0;

    lessons.forEach((lesson, idx) => {
      if (!lesson.comingSoon) {
        playableCounter += 1;
      }
      const lessonNum = lesson.comingSoon ? idx + 1 : playableCounter;
      if (isLessonUnlocked(lesson, idx, lessons, progressByLessonId, levelUnlockMap)) {
        unlocked.add(lesson.id);
      } else {
        reasons[lesson.id] = getLessonLockReason(lesson, lessonNum, levelUnlockMap);
      }
    });

    return { unlockedLessonIds: unlocked, lockReasonByLessonId: reasons };
  }, [progressByLessonId, levelUnlockMap]);

  const unlockedMaxIndex =
    firstUnfinishedIndex === -1 ? lastPlayableIndex : firstUnfinishedIndex;

  const hasAnyProgress = useMemo(() => {
    if (lastLessonId) return true;
    return playableLessons.some((lesson) => {
      const p = progressByLessonId[lesson.id];
      return Boolean(
        p &&
          (p.lessonCompleted ||
            p.completedStepIds.length > 0 ||
            Object.keys(p.selectedAnswers).length > 0)
      );
    });
  }, [lastLessonId, playableLessons, progressByLessonId]);

  const continueLessonIndex = useMemo(() => {
    if (lastLessonId) {
      const lastIdx = lessons.findIndex((l) => l.id === lastLessonId);
      if (
        lastIdx >= 0 &&
        !lessons[lastIdx]?.comingSoon &&
        unlockedLessonIds.has(lastLessonId) &&
        !progressByLessonId[lastLessonId]?.lessonCompleted
      ) {
        return lastIdx;
      }
    }
    return firstUnfinishedIndex >= 0 ? firstUnfinishedIndex : lastPlayableIndex;
  }, [
    lastLessonId,
    unlockedLessonIds,
    progressByLessonId,
    firstUnfinishedIndex,
    lastPlayableIndex,
  ]);

  const recordLearningActivity = useCallback(() => {
    const updated = recordActivityToday();
    setStreakState(updated);
  }, []);

  const persistLastLessonId = useCallback((lessonId: string) => {
    setLastLessonId(lessonId);
    try {
      localStorage.setItem(LAST_LESSON_STORAGE_KEY, lessonId);
    } catch {
      // Ignore storage write errors
    }
  }, []);

  const updateLessonProgress = useCallback(
    (lessonId: string, updater: (prev: SavedProgress) => SavedProgress) => {
      setProgressByLessonId((prevMap) => {
        const prevEntry = prevMap[lessonId] ?? EMPTY_PROGRESS;
        const nextEntry = updater(prevEntry);
        try {
          localStorage.setItem(`${STORAGE_KEY}:${lessonId}`, JSON.stringify(nextEntry));
        } catch {
          // Ignore storage write errors
        }
        return {
          ...prevMap,
          [lessonId]: nextEntry,
        };
      });
    },
    []
  );

  useEffect(() => {
    setResolvedTheme(applySettingsToDocument(settings));
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (settings.theme === 'system') {
        setResolvedTheme(applySettingsToDocument(settings));
      }
    };
    mq.addEventListener('change', handleSystemThemeChange);
    return () => mq.removeEventListener('change', handleSystemThemeChange);
  }, [settings]);

  const handleChangeTheme = useCallback((theme: ThemePreference) => {
    setSettings((prev) => ({ ...prev, theme }));
  }, []);

  const handleChangeTextSize = useCallback((textSize: TextSize) => {
    setSettings((prev) => ({ ...prev, textSize }));
  }, []);

  const handleChangeLanguage = useCallback((nextLang: SupportedLanguage) => {
    setLanguage(nextLang);
    saveLanguage(nextLang);
  }, []);

  const {
    activeLesson,
    contextValue: translationContextValue,
    stats: translationStats,
  } = useLessonTranslationSession({
    lesson: currentLesson,
    language,
    enabled: currentView === 'lesson' && language !== 'en',
  });

  useEffect(() => {
    setActiveProgressStepId(currentLesson.progressSteps[0]?.id ?? 'story');
  }, [currentLesson.id, currentLesson.progressSteps]);

  // Scroll-spy for sticky step tracker and synced progress row
  useEffect(() => {
    if (currentView !== 'lesson') {
      setShowStickyTracker(false);
      return;
    }

    const scrollMap =
      currentLesson.kind === 'concept' ? CONCEPT_SCROLL_STEP_MAP : TUTORIAL_SCROLL_STEP_MAP;
    let ticking = false;

    const updateScrollState = () => {
      ticking = false;

      const progressRowEl = document.getElementById('progress-row');
      if (progressRowEl) {
        const rect = progressRowEl.getBoundingClientRect();
        setShowStickyTracker(rect.bottom < 72);
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (nearBottom) {
        setActiveProgressStepId('verify');
        return;
      }

      const triggerLine = window.innerHeight * 0.36;
      let currentMatch = scrollMap[0].progressStepId;

      for (const mapping of scrollMap) {
        const el = document.getElementById(mapping.elementId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            currentMatch = mapping.progressStepId;
          }
        }
      }

      setActiveProgressStepId(currentMatch);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [currentLesson.id, currentLesson.kind, currentView]);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (isTranslateAdminRoute()) {
        setCurrentView('translate-admin');
      } else if (isFeedbackRoute()) {
        setCurrentView('feedback');
      } else {
        setCurrentView((prev) =>
          prev === 'feedback' || prev === 'translate-admin' ? 'lessons' : prev
        );
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const ensureRootPath = useCallback(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
  }, []);

  const openLessonAtIndex = useCallback(
    (index: number, scrollTargetId?: string) => {
      const targetLesson = lessons[index];
      if (!targetLesson || targetLesson.comingSoon) return;
      ensureRootPath();
      persistLastLessonId(targetLesson.id);
      setActiveLessonIndex(index);
      setCurrentView('lesson');
      if (scrollTargetId) {
        window.setTimeout(() => scrollToId(scrollTargetId), 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [ensureRootPath, persistLastLessonId, scrollToId]
  );

  const handleOpenLessonsPage = useCallback(() => {
    ensureRootPath();
    setCurrentView('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [ensureRootPath]);

  const handleOpenGlossary = useCallback(
    (termKey?: string) => {
      ensureRootPath();
      setFocusedGlossaryKey(termKey ? termKey.toLowerCase() : null);
      setCurrentView('glossary');
      if (!termKey) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [ensureRootPath]
  );

  const handleOpenSandbox = useCallback(
    (challengeId?: string) => {
      ensureRootPath();
      setSandboxChallengeId(typeof challengeId === 'string' ? challengeId : null);
      setCurrentView('sandbox');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [ensureRootPath]
  );

  const handleOpenStuck = useCallback(() => {
    ensureRootPath();
    setCurrentView('stuck');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [ensureRootPath]);

  const handleOpenCheatSheet = useCallback(() => {
    ensureRootPath();
    setCurrentView('cheat-sheet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [ensureRootPath]);

  const handleOpenFinishScreen = useCallback(() => {
    ensureRootPath();
    setCurrentView('finished');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [ensureRootPath]);

  const handleStartLearning = () => {
    if (
      currentView === 'lessons' ||
      currentView === 'glossary' ||
      currentView === 'sandbox' ||
      currentView === 'stuck' ||
      currentView === 'cheat-sheet' ||
      currentView === 'feedback' ||
      currentView === 'translate-admin' ||
      currentView === 'finished'
    ) {
      openLessonAtIndex(continueLessonIndex);
    } else {
      scrollToId(currentLesson.kind === 'concept' ? 'concept-story' : 'step-01');
    }
  };

  const markStepCompleted = (progressId: string) => {
    recordLearningActivity();
    persistLastLessonId(currentLesson.id);
    updateLessonProgress(currentLesson.id, (prev) => ({
      ...prev,
      completedStepIds: prev.completedStepIds.includes(progressId)
        ? prev.completedStepIds
        : [...prev.completedStepIds, progressId],
    }));
  };

  const handleSelectProgressStep = (step: ProgressStep) => {
    setActiveProgressStepId(step.id);
    scrollToId(step.targetId);
  };

  const handleStepActionComplete = (stepId: string) => {
    if (stepId === 'step-01') {
      markStepCompleted('open-repo');
      markStepCompleted('create-file');
    } else if (stepId === 'step-02') {
      markStepCompleted('name-write');
    } else if (stepId === 'step-03') {
      markStepCompleted('commit');
    }
  };

  const handleSelectQuizAnswer = (questionKey: string, optionId: string) => {
    recordLearningActivity();
    persistLastLessonId(currentLesson.id);
    const nextAnswers = {
      ...selectedAnswers,
      [questionKey]: optionId,
    };
    const allSolved = isLessonQuizSolved(currentLesson, nextAnswers);
    const stats = computeQuizStats(currentLesson, nextAnswers);

    updateLessonProgress(currentLesson.id, (prev) => ({
      ...prev,
      selectedAnswers: nextAnswers,
      quizScore: stats.quizScore,
      quizTotal: stats.quizTotal,
      completedStepIds:
        allSolved && !prev.completedStepIds.includes('verify')
          ? [...prev.completedStepIds, 'verify']
          : prev.completedStepIds,
    }));

    if (allSolved) {
      setActiveProgressStepId('verify');
    }
  };

  const handleCompleteLesson = () => {
    recordLearningActivity();
    persistLastLessonId(currentLesson.id);
    const allStepIds = currentLesson.progressSteps.map((s) => s.id);
    const stats = computeQuizStats(currentLesson, selectedAnswers);
    updateLessonProgress(currentLesson.id, (prev) => ({
      ...prev,
      completedStepIds: allStepIds,
      quizScore: stats.quizScore,
      quizTotal: stats.quizTotal,
      lessonCompleted: true,
    }));
    const wouldCompleteAllLevels =
      roadmapLevels.length > 0 &&
      roadmapLevels.every((level) => {
        const levelLessons = lessons.filter((l) => l.levelId === level.id);
        return (
          levelLessons.length > 0 &&
          levelLessons.every(
            (l) =>
              !l.comingSoon &&
              (l.id === currentLesson.id || Boolean(progressByLessonId[l.id]?.lessonCompleted))
          )
        );
      });

    setSpacedReviewMap(scheduleLessonCompletionReview(currentLesson.id));
    setActiveProgressStepId(
      currentLesson.progressSteps[currentLesson.progressSteps.length - 1]?.id ?? 'verify'
    );

    if (!allLevelsCompleted && wouldCompleteAllLevels) {
      ensureRootPath();
      setCurrentView('finished');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteSpacedReview = useCallback((lessonId: string, allCorrect: boolean) => {
    const { map } = recordReviewOutcome(lessonId, allCorrect);
    setSpacedReviewMap(map);
  }, []);

  const handleSnoozeSpacedReview = useCallback((lessonId: string) => {
    setSpacedReviewMap(snoozeLessonReview(lessonId));
  }, []);

  const handleSandboxChallengeCompleted = useCallback(
    (challengeId: string) => {
      recordLearningActivity();
      const targetMapping: Record<string, { lessonId: string; stepIds: string[] }> = {
        'challenge-1': {
          lessonId: 'add-first-file',
          stepIds: ['open-repo', 'create-file', 'name-write', 'commit'],
        },
        'challenge-2': {
          lessonId: 'what-is-commit',
          stepIds: ['story', 'meaning', 'where'],
        },
        'challenge-3': {
          lessonId: 'create-first-branch',
          stepIds: ['open-repo', 'create-file', 'name-write'],
        },
        'challenge-4': {
          lessonId: 'create-first-branch',
          stepIds: ['commit'],
        },
      };

      const entry = targetMapping[challengeId];
      if (!entry) return;

      updateLessonProgress(entry.lessonId, (prev) => {
        const merged = Array.from(new Set([...prev.completedStepIds, ...entry.stepIds]));
        return {
          ...prev,
          completedStepIds: merged,
        };
      });
    },
    [recordLearningActivity, updateLessonProgress]
  );

  const handleResetProgress = () => {
    updateLessonProgress(currentLesson.id, () => EMPTY_PROGRESS);
    setSpacedReviewMap(removeLessonReviewSchedule(currentLesson.id));
    setActiveProgressStepId(currentLesson.progressSteps[0]?.id ?? 'story');
    try {
      localStorage.removeItem(`${STORAGE_KEY}:${currentLesson.id}`);
    } catch {
      // Ignore storage errors
    }
  };

  const quizSolved = isLessonQuizSolved(currentLesson, selectedAnswers);
  const currentLessonTitle =
    currentView === 'lessons'
      ? 'GitStart Beginner Learning Path'
      : currentView === 'glossary'
        ? 'Plain-English GitHub Glossary'
        : currentView === 'sandbox'
          ? 'Practice Sandbox'
          : currentView === 'stuck'
            ? 'Where am I stuck? Troubleshooting Guide'
            : currentView === 'cheat-sheet'
              ? 'Personal GitHub Cheat Sheet'
              : currentView === 'feedback'
                ? 'Learner Feedback'
                : currentView === 'translate-admin'
                  ? 'Translation Admin'
                  : currentView === 'finished'
                    ? 'You finished GitStart'
                    : `Lesson ${String(activeLessonIndex + 1).padStart(2, '0')}: ${currentLesson.cardTitle}`;

  return (
    <SpeechProvider language={language}>
      <SpeechRouteSync view={currentView} lessonId={currentLesson.id} language={language} />
      <AskContextProvider
        currentLessonTitle={currentLessonTitle}
        onOpenGlossary={handleOpenGlossary}
      >
        <div id="top" className="min-h-screen flex flex-col bg-surface text-on-surface">
        <TopBar
          currentView={currentView}
          lessons={lessons}
          activeLessonIndex={activeLessonIndex}
          completedLessonsCount={completedLessonsCount}
          streakDays={streakState.streakDays}
          settings={settings}
          resolvedTheme={resolvedTheme}
          onChangeTheme={handleChangeTheme}
          onChangeTextSize={handleChangeTextSize}
          language={language}
          onChangeLanguage={handleChangeLanguage}
          onOpenLessonsPage={handleOpenLessonsPage}
          onOpenGlossary={() => handleOpenGlossary()}
          onOpenSandbox={() => handleOpenSandbox()}
          onOpenStuck={handleOpenStuck}
          onOpenCheatSheet={handleOpenCheatSheet}
          onStartLearning={handleStartLearning}
          completedStepIds={completedStepIds}
          quizSolved={quizSolved}
          lessonCompleted={lessonCompleted}
          onResetProgress={handleResetProgress}
        />

        {currentView === 'lesson' && (
          <StickyStepTracker
            visible={showStickyTracker}
            steps={activeLesson.progressSteps}
            activeStepId={activeProgressStepId}
            completedStepIds={completedStepIds}
            onSelectStep={handleSelectProgressStep}
          />
        )}

        <main className="w-full flex-1 pt-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
            {currentView === 'lessons' ? (
              <LessonsPage
                levels={roadmapLevels}
                lessons={lessons}
                progressByLessonId={progressByLessonId}
                continueLessonIndex={continueLessonIndex}
                hasAnyProgress={hasAnyProgress}
                streakState={streakState}
                dueReviews={dueReviews}
                onCompleteReview={handleCompleteSpacedReview}
                onSnoozeReview={handleSnoozeSpacedReview}
                onRevisitSection={(idx, targetId) => openLessonAtIndex(idx, targetId)}
                onSelectLesson={(idx) => openLessonAtIndex(idx)}
                onOpenSandbox={() => handleOpenSandbox()}
                onOpenFinishScreen={handleOpenFinishScreen}
              />
            ) : currentView === 'glossary' ? (
              <GlossaryPage
                lessons={lessons}
                unlockedMaxIndex={unlockedMaxIndex}
                unlockedLessonIds={unlockedLessonIds}
                lockReasonByLessonId={lockReasonByLessonId}
                focusedTermKey={focusedGlossaryKey}
                onSelectLesson={(idx) => openLessonAtIndex(idx)}
                onBackToLessons={handleOpenLessonsPage}
              />
            ) : currentView === 'sandbox' ? (
              <PracticeSandboxPage
                onBackToLessons={handleOpenLessonsPage}
                onChallengeCompleted={handleSandboxChallengeCompleted}
                initialChallengeId={sandboxChallengeId}
              />
            ) : currentView === 'stuck' ? (
              <WhereAmIStuckPage
                onBackToLessons={handleOpenLessonsPage}
                onOpenSandbox={() => handleOpenSandbox()}
              />
            ) : currentView === 'cheat-sheet' ? (
              <CheatSheetPage
                lessons={lessons}
                completedLessonIds={completedLessonIds}
                onBackToLessons={handleOpenLessonsPage}
                onOpenLesson={(idx) => openLessonAtIndex(idx)}
                onOpenGlossaryTerm={(termKey) => handleOpenGlossary(termKey)}
              />
            ) : currentView === 'feedback' ? (
              <FeedbackDashboardPage
                lessons={lessons}
                onBackToApp={handleOpenLessonsPage}
                onOpenLesson={(idx) => openLessonAtIndex(idx)}
              />
            ) : currentView === 'translate-admin' ? (
              <TranslateAdminPage
                lessons={lessons}
                onBackToApp={handleOpenLessonsPage}
              />
            ) : currentView === 'finished' ? (
              <FinishScreenPage
                levels={roadmapLevels}
                onOpenCheatSheet={handleOpenCheatSheet}
                onBackToLessons={handleOpenLessonsPage}
              />
            ) : (
              <LessonTranslationProvider value={translationContextValue}>
                <div className="flex flex-col w-full" data-ask-selectable="true">
                  <LanguageBar
                    lessonId={currentLesson.id}
                    lessonTitle={currentLesson.cardTitle}
                    language={language}
                    onChangeLanguage={handleChangeLanguage}
                    readyCount={translationStats.ready}
                    totalCount={translationStats.total}
                    activeCount={translationStats.active}
                  />

                  <HeroSection
                    key={`hero-${activeLesson.id}-${language}`}
                    lesson={activeLesson}
                    lessonIndex={activePlayableIndex}
                    totalLessons={playableLessons.length}
                    onBackToLessons={handleOpenLessonsPage}
                    onStartStepOne={() => {
                      if (activeLesson.kind === 'concept') {
                        markStepCompleted('story');
                        setActiveProgressStepId('story');
                        scrollToId('concept-story');
                      } else {
                        markStepCompleted('open-repo');
                        setActiveProgressStepId('create-file');
                        scrollToId('step-01');
                      }
                    }}
                    onJumpToVocabulary={() =>
                      scrollToId(activeLesson.kind === 'concept' ? 'quick-check' : 'vocabulary')
                    }
                  />

                  <ProgressRow
                    steps={activeLesson.progressSteps}
                    activeStepId={activeProgressStepId}
                    completedStepIds={completedStepIds}
                    onSelectStep={handleSelectProgressStep}
                  />

                  {activeLesson.kind === 'concept' && activeLesson.concept ? (
                    <ConceptLessonSections
                      key={`concept-${activeLesson.id}-${language}`}
                      lessonId={activeLesson.id}
                      lessonTitle={activeLesson.cardTitle}
                      concept={activeLesson.concept}
                      onSectionInteracted={(stepId) => markStepCompleted(stepId)}
                    />
                  ) : (
                    <>
                      {activeLesson.steps && (
                        <StepSection
                          key={`steps-${activeLesson.id}-${language}`}
                          lessonId={activeLesson.id}
                          lessonTitle={activeLesson.cardTitle}
                          steps={activeLesson.steps}
                          onStepActionComplete={handleStepActionComplete}
                        />
                      )}

                      {activeLesson.practice && (
                        <PracticeScreen
                          key={`practice-${activeLesson.id}-${language}`}
                          lessonId={activeLesson.id}
                          lessonTitle={activeLesson.cardTitle}
                          data={activeLesson.practice}
                          onPracticeComplete={() => handleStepActionComplete('step-03')}
                        />
                      )}

                      {activeLesson.vocabulary && (
                        <VocabularySection
                          lessonId={activeLesson.id}
                          lessonTitle={activeLesson.cardTitle}
                          eyebrow={activeLesson.vocabulary.eyebrow}
                          title={activeLesson.vocabulary.title}
                          subtitle={activeLesson.vocabulary.subtitle}
                          cards={activeLesson.vocabulary.cards}
                        />
                      )}

                      {activeLesson.diagram && (
                        <BranchDiagramSection
                          key={`diagram-${activeLesson.id}-${language}`}
                          lessonId={activeLesson.id}
                          lessonTitle={activeLesson.cardTitle}
                          data={activeLesson.diagram}
                        />
                      )}
                    </>
                  )}

                  <QuizAndCompletionSection
                    key={`quiz-${activeLesson.id}-${language}`}
                    lessonId={activeLesson.id}
                    lessonTitle={activeLesson.cardTitle}
                    lessonNumber={activePlayableIndex + 1}
                    quiz={activeLesson.quiz}
                    quizzes={activeLesson.quizzes}
                    completion={activeLesson.completion}
                    selectedAnswers={selectedAnswers}
                    onSelectAnswer={handleSelectQuizAnswer}
                    lessonCompleted={lessonCompleted}
                    onCompleteLesson={handleCompleteLesson}
                    hasNextLesson={nextPlayableIndex !== -1}
                    onNextLesson={() => {
                      if (nextPlayableIndex !== -1) {
                        openLessonAtIndex(nextPlayableIndex);
                      }
                    }}
                    onBackToLessons={handleOpenLessonsPage}
                    onTryItYourself={
                      LESSON_SANDBOX_CHALLENGE[activeLesson.id]
                        ? () => handleOpenSandbox(LESSON_SANDBOX_CHALLENGE[activeLesson.id])
                        : undefined
                    }
                    allCourseCompleted={allLevelsCompleted}
                    onOpenFinishScreen={handleOpenFinishScreen}
                  />
                </div>
              </LessonTranslationProvider>
            )}
          </div>
        </main>

        <Footer
          onOpenLessonsPage={handleOpenLessonsPage}
          onOpenGlossary={() => handleOpenGlossary()}
          onOpenSandbox={() => handleOpenSandbox()}
          onOpenStuck={handleOpenStuck}
          onOpenCheatSheet={handleOpenCheatSheet}
          onOpenColophon={() => setModalMode('colophon')}
        />

        <CheatSheetModal mode={modalMode} onClose={() => setModalMode(null)} />
        <SelectionAskFloatingButton />
        <ContextualAskDrawer />
        <AskGitStartBox />
      </div>
      </AskContextProvider>
    </SpeechProvider>
  );
}
