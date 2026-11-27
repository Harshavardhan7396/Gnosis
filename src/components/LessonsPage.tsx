import { ArrowRight, CheckCircle2, Lock, Clock, Calendar, Sparkles } from 'lucide-react';
import type { Lesson, RoadmapLevel } from '../types/lesson';
import type { StreakState } from '../utils/streak';
import type { DueLessonReview } from '../utils/spacedReview';
import {
  getLessonLockReason,
  getLevelUnlockMap,
  isLessonUnlocked,
} from '../utils/lessonUnlock';
import { QuickReviewCard } from './QuickReviewCard';

export interface LessonProgressSummary {
  completedStepIds: string[];
  selectedAnswers: Record<string, string>;
  quizScore: number;
  quizTotal: number;
  lessonCompleted: boolean;
}

interface LessonsPageProps {
  levels: RoadmapLevel[];
  lessons: Lesson[];
  progressByLessonId: Record<string, LessonProgressSummary>;
  continueLessonIndex: number;
  hasAnyProgress: boolean;
  streakState: StreakState;
  dueReviews?: DueLessonReview[];
  onCompleteReview?: (lessonId: string, allCorrect: boolean) => void;
  onSnoozeReview?: (lessonId: string) => void;
  onRevisitSection?: (lessonIndex: number, targetId: string) => void;
  onSelectLesson: (index: number) => void;
  onOpenSandbox?: () => void;
  onOpenFinishScreen?: () => void;
}

export function LessonsPage({
  levels,
  lessons,
  progressByLessonId,
  continueLessonIndex,
  hasAnyProgress,
  streakState,
  dueReviews = [],
  onCompleteReview,
  onSnoozeReview,
  onRevisitSection,
  onSelectLesson,
  onOpenSandbox,
  onOpenFinishScreen,
}: LessonsPageProps) {
  const playableLessons = lessons.filter((lesson) => !lesson.comingSoon);
  const completedCount = playableLessons.filter(
    (lesson) => progressByLessonId[lesson.id]?.lessonCompleted
  ).length;
  const availableTotal = playableLessons.length;
  const progressPercent =
    availableTotal > 0 ? Math.round((completedCount / availableTotal) * 100) : 0;

  const firstUnfinishedIndex = lessons.findIndex(
    (lesson) => !lesson.comingSoon && !progressByLessonId[lesson.id]?.lessonCompleted
  );
  const levelUnlockMap = getLevelUnlockMap(levels, lessons, progressByLessonId);

  const continueLesson = lessons[continueLessonIndex] ?? playableLessons[0] ?? lessons[0];
  const continuePlayableNumber = Math.max(
    1,
    playableLessons.findIndex((l) => l.id === continueLesson?.id) + 1
  );

  // Build per-level sections with sequential level unlocking
  const levelSections = levels.reduce<
    Array<{
      level: RoadmapLevel;
      items: Array<{ lesson: Lesson; globalIndex: number }>;
      completedInLevel: number;
      totalInLevel: number;
      availableInLevel: number;
      percent: number;
      isLevelUnlocked: boolean;
      isLevelCompleted: boolean;
      prevLevelNumber: number | null;
    }>
  >((acc, level, idx) => {
    const items = lessons
      .map((lesson, globalIndex) => ({ lesson, globalIndex }))
      .filter(({ lesson }) => lesson.levelId === level.id);

    const totalInLevel = items.length;
    const availableInLevel = items.filter(({ lesson }) => !lesson.comingSoon).length;
    const completedInLevel = items.filter(
      ({ lesson }) => !lesson.comingSoon && Boolean(progressByLessonId[lesson.id]?.lessonCompleted)
    ).length;

    const percent = totalInLevel > 0 ? Math.round((completedInLevel / totalInLevel) * 100) : 0;
    const isLevelCompleted = totalInLevel > 0 && completedInLevel === totalInLevel;
    const prevLevel = idx > 0 ? acc[idx - 1] : null;
    const isLevelUnlocked = idx === 0 ? true : Boolean(prevLevel?.isLevelCompleted);

    acc.push({
      level,
      items,
      completedInLevel,
      totalInLevel,
      availableInLevel,
      percent,
      isLevelUnlocked,
      isLevelCompleted,
      prevLevelNumber: prevLevel ? prevLevel.level.number : null,
    });
    return acc;
  }, []);

  const completedLevelsCount = levelSections.filter((s) => s.isLevelCompleted).length;

  return (
    <div className="w-full py-6 sm:py-12">
      {/* Home Page Hero */}
      <section className="w-full pb-12 sm:pb-16 pt-2 border-b border-outline-variant/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <div className="text-[11px] font-semibold tracking-[0.12em] text-primary uppercase mb-4">
              GitStart · 5-Level Learning Roadmap
            </div>
            <h1 className="text-[36px] leading-[1.14] sm:text-[46px] lg:text-[56px] lg:leading-[1.12] font-normal text-on-surface tracking-[-0.02em] mb-6 [text-wrap:balance]">
              Learn GitHub <span className="font-medium text-primary">from zero</span>
            </h1>
            <p className="text-[16px] sm:text-[17px] leading-[1.7] text-on-surface-variant max-w-[60ch] mb-8">
              A calm, step-by-step roadmap built for complete beginners. Start with the basics in
              your browser, then grow into collaboration, every repository tab, extras, and Git on
              your computer.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              {hasAnyProgress ? (
                <>
                  <button
                    type="button"
                    onClick={() => onSelectLesson(continueLessonIndex)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-on-primary text-[15px] font-medium shadow-sm hover:bg-primary transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Continue where you left off</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectLesson(0)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-on-surface text-[14px] font-medium hover:bg-surface-container-low transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Start Lesson 1</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectLesson(0)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-on-primary text-[15px] font-medium shadow-sm hover:bg-primary transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Start Lesson 1</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <a
                href="#start-here"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('start-here')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap"
              >
                <span>Explore all {levels.length} levels</span>
              </a>

              {onOpenSandbox && (
                <button
                  type="button"
                  onClick={onOpenSandbox}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Open Practice Sandbox</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Calm Home Progress Summary Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/45 p-5 sm:p-6 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                  Your Roadmap Progress
                </span>
                <span className="text-xs font-medium text-on-surface tabular-nums">
                  {completedCount} of {availableTotal} lessons done
                </span>
              </div>

              <div
                className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Course completion progress"
              >
                <div
                  className="h-full bg-secondary transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-on-surface-variant">
                <span className="truncate">
                  {completedLevelsCount === levels.length && levels.length > 0
                    ? 'All 5 levels complete · You finished GitStart'
                    : completedCount === availableTotal && availableTotal > 0
                      ? `Level ${completedLevelsCount} completed · Ready for what’s next`
                      : hasAnyProgress && continueLesson
                        ? `Up next: Lesson ${continuePlayableNumber} · ${continueLesson.cardTitle}`
                        : 'Begin with Level 1 · Lesson 1 whenever you are ready'}
                </span>

                {/* Subtle, non-shaming daily streak */}
                <span className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-secondary shrink-0" />
                  {streakState.streakDays >= 1 ? (
                    <span className="tabular-nums text-on-surface font-medium">
                      {streakState.streakDays}-day streak
                    </span>
                  ) : (
                    <span>Steady, unhurried pace</span>
                  )}
                </span>
              </div>

              {completedLevelsCount === levels.length &&
                levels.length > 0 &&
                onOpenFinishScreen && (
                  <div className="pt-2 border-t border-outline-variant/25">
                    <button
                      type="button"
                      onClick={onOpenFinishScreen}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary-container/35 border border-secondary/35 text-on-secondary-container text-xs font-medium hover:bg-secondary-container/55 transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <span>You finished GitStart — view summary</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>

      {dueReviews.length > 0 && onCompleteReview && onSnoozeReview && onRevisitSection && (
        <QuickReviewCard
          dueReviews={dueReviews}
          onCompleteReview={onCompleteReview}
          onSnoozeReview={onSnoozeReview}
          onRevisitSection={onRevisitSection}
        />
      )}

      {/* 5-Level Roadmap Overview & Sections */}
      <section id="start-here" className="w-full pt-12 sm:pt-14 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs tracking-[0.12em] text-primary font-semibold uppercase mb-2 block">
              Start here · Roadmap
            </span>
            <h2 className="text-[28px] sm:text-[34px] leading-[1.22] font-normal text-on-surface tracking-[-0.015em]">
              5 levels from beginner to confident
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant tabular-nums">
            <span>
              {completedLevelsCount} of {levels.length} levels completed
            </span>
            <span aria-hidden="true">·</span>
            <span>Complete each level to unlock the next</span>
          </div>
        </div>

        {/* Compact 5-Level Quick Jump Grid */}
        <nav
          aria-label="Roadmap levels"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10 sm:mb-12"
        >
          {levelSections.map(
            ({
              level,
              completedInLevel,
              totalInLevel,
              isLevelUnlocked,
              isLevelCompleted,
            }) => (
              <a
                key={level.id}
                href={`#${level.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(level.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`rounded-xl border px-4 py-3.5 transition-colors flex flex-col justify-between gap-2 ${
                  isLevelCompleted
                    ? 'bg-surface-container-lowest border-secondary/40 hover:border-secondary/65'
                    : isLevelUnlocked
                      ? 'bg-surface-container-lowest border-primary/40 hover:border-primary/70'
                      : 'bg-surface-container-low/50 border-outline-variant/35 hover:border-outline-variant/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                  <span
                    className={
                      isLevelUnlocked ? 'text-primary font-semibold' : 'text-on-surface-variant'
                    }
                  >
                    Level {level.number}
                  </span>
                  {isLevelCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                  ) : !isLevelUnlocked ? (
                    <Lock className="w-3 h-3 text-on-surface-variant/75 shrink-0" />
                  ) : (
                    <span className="text-on-surface-variant tabular-nums">
                      {completedInLevel}/{totalInLevel}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-on-surface leading-snug">
                  {level.title}
                </span>
              </a>
            )
          )}
        </nav>

        {/* Individual Level Sections */}
        <div className="space-y-14 sm:space-y-16">
          {levelSections.map(
            ({
              level,
              items,
              completedInLevel,
              totalInLevel,
              percent,
              isLevelUnlocked,
              isLevelCompleted,
              prevLevelNumber,
            }) => {
              const gridColsClass =
                items.length >= 9
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 md:grid-cols-2';

              return (
                <section
                  key={level.id}
                  id={level.id}
                  aria-labelledby={`${level.id}-title`}
                  className="pt-10 border-t border-outline-variant/35 scroll-mt-24"
                >
                  {/* Level Header: Title + "What you will be able to do" + Progress Bar */}
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                    <div className="max-w-2xl space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-xs font-semibold tracking-[0.1em] uppercase text-primary">
                          Level {level.number}
                        </span>
                        <span className="text-outline-variant" aria-hidden="true">
                          ·
                        </span>
                        {isLevelCompleted ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>Completed</span>
                          </span>
                        ) : isLevelUnlocked ? (
                          <span className="text-xs font-medium text-primary">Unlocked</span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant">
                            <Lock className="w-3.5 h-3.5 shrink-0" />
                            <span>Complete Level {prevLevelNumber} to unlock</span>
                          </span>
                        )}
                      </div>

                      <h3
                        id={`${level.id}-title`}
                        className="text-[26px] sm:text-[32px] leading-[1.2] font-normal text-on-surface tracking-[-0.015em]"
                      >
                        {level.title}
                      </h3>

                      <p className="text-sm sm:text-[15px] text-on-surface-variant leading-relaxed">
                        <span className="font-medium text-on-surface">
                          What you will be able to do:{' '}
                        </span>
                        {level.ability}
                      </p>
                    </div>

                    {/* Level Progress Bar */}
                    <div className="w-full lg:w-72 shrink-0 rounded-xl bg-surface-container-lowest border border-outline-variant/40 px-4 py-3.5 space-y-2">
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <span className="text-on-surface-variant">Level {level.number} progress</span>
                        <span className="font-mono font-medium text-on-surface tabular-nums">
                          {completedInLevel} / {totalInLevel}
                        </span>
                      </div>
                      <div
                        className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden"
                        role="progressbar"
                        aria-valuenow={percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Level ${level.number} (${level.title}) progress`}
                      >
                        <div
                          className="h-full bg-secondary transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Level Lesson Cards */}
                  <div className={`grid ${gridColsClass} gap-5 lg:gap-6`}>
                    {items.map(({ lesson, globalIndex }, posInLevel) => {
                      const playableIndex = playableLessons.findIndex((l) => l.id === lesson.id);
                      const lessonNumber = (playableIndex >= 0 ? playableIndex : globalIndex) + 1;
                      const lessonNum = String(lessonNumber).padStart(2, '0');

                      // Coming soon card (Levels 2–5 until content is added in lessons.js)
                      if (lesson.comingSoon) {
                        return (
                          <article
                            key={lesson.id}
                            className={`rounded-xl border p-5 sm:p-6 flex flex-col justify-between transition-colors ${
                              isLevelUnlocked
                                ? 'bg-surface-container-lowest/80 border-outline-variant/45'
                                : 'bg-surface-container-low/50 border-outline-variant/30 opacity-85'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-3 mb-3.5">
                                <span className="font-mono text-xs font-semibold tabular-nums text-on-surface-variant/80">
                                  {level.number}.{posInLevel + 1}
                                </span>

                                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md border border-outline-variant/40 bg-surface-container-low text-on-surface-variant whitespace-nowrap shrink-0">
                                  <Sparkles className="w-3 h-3 text-primary/75 shrink-0" />
                                  <span>Coming soon</span>
                                </span>
                              </div>

                              <h4 className="text-[18px] sm:text-[19px] leading-[1.3] font-medium text-on-surface mb-2">
                                {lesson.cardTitle}
                              </h4>
                              <p className="text-sm text-on-surface-variant leading-relaxed">
                                {lesson.cardDescription}
                              </p>
                            </div>

                            <div className="pt-4 mt-5 border-t border-outline-variant/25 flex items-center justify-between gap-2 text-xs text-on-surface-variant">
                              {isLevelUnlocked ? (
                                <span className="inline-flex items-center gap-1.5 text-primary/90 font-medium">
                                  <Clock className="w-3.5 h-3.5 shrink-0" />
                                  <span>Lesson content coming soon</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5">
                                  <Lock className="w-3.5 h-3.5 shrink-0 opacity-80" />
                                  <span>Complete Level {prevLevelNumber} to unlock</span>
                                </span>
                              )}
                            </div>
                          </article>
                        );
                      }

                      // Full interactive lesson card (Level 1 + any future populated lessons)
                      const progress = progressByLessonId[lesson.id];
                      const isCompleted = Boolean(progress?.lessonCompleted);
                      const isUnlocked = isLessonUnlocked(
                        lesson,
                        globalIndex,
                        lessons,
                        progressByLessonId,
                        levelUnlockMap
                      );
                      const lockReason = getLessonLockReason(lesson, lessonNumber, levelUnlockMap);
                      const isNextUp = isLevelUnlocked && globalIndex === firstUnfinishedIndex;
                      const totalSteps = lesson.progressSteps?.length ?? 0;
                      const completedStepsCount = progress?.completedStepIds.length ?? 0;
                      const quizTotal =
                        progress?.quizTotal ||
                        (lesson.quizzes?.length ?? (lesson.quiz ? 1 : 0));
                      const answeredQuizCount = Object.keys(progress?.selectedAnswers ?? {}).length;

                      return (
                        <article
                          key={lesson.id}
                          className={`rounded-xl border p-6 sm:p-7 flex flex-col justify-between transition-colors ${
                            isUnlocked
                              ? 'bg-surface-container-lowest border-outline-variant/45 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] hover:border-outline-variant'
                              : 'bg-surface-container-low/55 border-outline-variant/30 opacity-80'
                          }`}
                        >
                          <div>
                            {/* Card Top Meta */}
                            <div className="flex items-center justify-between gap-3 mb-4">
                              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                                <span
                                  className={`font-mono font-semibold tabular-nums ${
                                    isUnlocked ? 'text-primary' : 'text-on-surface-variant/70'
                                  }`}
                                >
                                  {lessonNum}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                                  <Clock className="w-3.5 h-3.5 opacity-70" />
                                  <span>{lesson.readTime}</span>
                                </span>
                              </div>

                              {isCompleted ? (
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary whitespace-nowrap shrink-0">
                                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                                  <span>Completed</span>
                                </span>
                              ) : isUnlocked ? (
                                <span className="text-xs font-medium text-primary whitespace-nowrap shrink-0">
                                  Unlocked
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant/80 whitespace-nowrap shrink-0">
                                  <Lock className="w-3.5 h-3.5 shrink-0" />
                                  <span>Locked</span>
                                </span>
                              )}
                            </div>

                            {/* Card Title & One-line Description */}
                            <h4 className="text-[20px] sm:text-[22px] leading-[1.3] font-medium text-on-surface mb-2">
                              {lesson.cardTitle}
                            </h4>
                            <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
                              {lesson.cardDescription}
                            </p>

                            {/* Saved Steps & Quiz Score Mini-Row */}
                            {(completedStepsCount > 0 || answeredQuizCount > 0 || isCompleted) && (
                              <div className="flex flex-wrap items-center gap-3 mb-5 text-[11px] font-mono text-on-surface-variant tabular-nums">
                                <span>
                                  Steps: {Math.min(totalSteps, completedStepsCount)}/{totalSteps}
                                </span>
                                {quizTotal > 0 && (answeredQuizCount > 0 || isCompleted) && (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <span>
                                      Quiz: {progress?.quizScore ?? 0}/{quizTotal}
                                    </span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Action Footer */}
                          <div className="pt-4 border-t border-outline-variant/30">
                            {isUnlocked ? (
                              <button
                                type="button"
                                onClick={() => onSelectLesson(globalIndex)}
                                className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                                  isNextUp
                                    ? 'bg-primary-container text-on-primary hover:bg-primary'
                                    : 'bg-surface-container-low border border-outline-variant/45 text-on-surface hover:bg-surface-container'
                                }`}
                              >
                                <span>
                                  {isCompleted
                                    ? `Review Lesson ${lessonNumber}`
                                    : `Start Lesson ${lessonNumber}`}
                                </span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                disabled
                                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-surface-container-high/60 border border-outline-variant/30 text-xs font-medium text-on-surface-variant cursor-not-allowed whitespace-nowrap"
                              >
                                <Lock className="w-3.5 h-3.5 shrink-0" />
                                <span>{lockReason}</span>
                              </button>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
}
