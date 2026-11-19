import { useState, useMemo, useEffect } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';
import type { Lesson, QuizData } from '../types/lesson';
import {
  getNextIntervalDays,
  getSectionLinkForQuestion,
  pickRandomReviewQuestions,
  type DueLessonReview,
} from '../utils/spacedReview';

interface QuickReviewCardProps {
  dueReviews: DueLessonReview[];
  onCompleteReview: (lessonId: string, allCorrect: boolean) => void;
  onSnoozeReview: (lessonId: string) => void;
  onRevisitSection: (lessonIndex: number, targetId: string) => void;
}

export function QuickReviewCard({
  dueReviews,
  onCompleteReview,
  onSnoozeReview,
  onRevisitSection,
}: QuickReviewCardProps) {
  const activeDue = dueReviews[0];
  const lessonId = activeDue?.lesson.id;

  const questions: QuizData[] = useMemo(() => {
    if (!activeDue) return [];
    return pickRandomReviewQuestions(activeDue.lesson, 2);
  }, [lessonId]);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [finishedState, setFinishedState] = useState<{
    allCorrect: boolean;
    nextDays: number;
  } | null>(null);

  useEffect(() => {
    setSelectedAnswers({});
    setFinishedState(null);
  }, [lessonId]);

  if (!activeDue || questions.length === 0) {
    return null;
  }

  const { lesson, lessonIndex, schedule } = activeDue;

  const answeredCount = questions.filter((q, idx) => {
    const qKey = q.id ?? `rev-${idx}`;
    return Boolean(selectedAnswers[qKey]);
  }).length;

  const allAnswered = answeredCount === questions.length;
  const allCorrect =
    allAnswered &&
    questions.every((q, idx) => {
      const qKey = q.id ?? `rev-${idx}`;
      const chosen = selectedAnswers[qKey];
      return q.options.some((opt) => opt.id === chosen && opt.isCorrect);
    });

  const handleSelectOption = (qKey: string, optionId: string) => {
    if (finishedState) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qKey]: optionId,
    }));
  };

  const handleFinish = () => {
    const nextDays = getNextIntervalDays(schedule.intervalDays, allCorrect);
    setFinishedState({ allCorrect, nextDays });
  };

  const handleConfirmNext = () => {
    if (!finishedState) return;
    onCompleteReview(lesson.id, finishedState.allCorrect);
  };

  return (
    <section
      aria-label="Quick spaced review"
      className="w-full pt-8 sm:pt-10"
    >
      <div className="rounded-xl bg-surface-container-lowest border border-primary/35 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.05)] overflow-hidden">
        {/* Header Strip */}
        <div className="bg-surface-container-low/75 border-b border-outline-variant/35 px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary-fixed/40 border border-primary/25 text-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary block">
                Quick review · Lesson {String(lessonIndex + 1).padStart(2, '0')}
              </span>
              <h2 className="text-base sm:text-lg font-medium text-on-surface truncate">
                Friendly refresher: {lesson.cardTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {dueReviews.length > 1 && (
              <span className="font-mono text-[11px] text-on-surface-variant tabular-nums">
                1 of {dueReviews.length} ready
              </span>
            )}
            <button
              type="button"
              onClick={() => onSnoozeReview(lesson.id)}
              className="text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer whitespace-nowrap"
            >
              Maybe later
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 space-y-6">
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Take 30 seconds to keep this fresh. There is no score penalty—just a calm check-in from what you learned earlier.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {questions.map((item, qIndex) => {
              const qKey = item.id ?? `rev-${qIndex}`;
              const chosenId = selectedAnswers[qKey];
              const chosenOption = item.options.find((o) => o.id === chosenId);
              const sectionLink = getSectionLinkForQuestion(lesson, item);

              return (
                <div
                  key={qKey}
                  className="rounded-xl border border-outline-variant/40 bg-surface-container-low/35 p-4 sm:p-5 flex flex-col justify-between gap-4"
                >
                  <div>
                    <span className="font-mono text-[11px] font-semibold text-primary uppercase tracking-wider block mb-1.5">
                      Question {qIndex + 1} of {questions.length}
                    </span>
                    <h3 className="text-sm sm:text-[15px] font-medium text-on-surface leading-snug mb-3.5">
                      {item.questionPrefix}
                      {item.questionCode && (
                        <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/35 whitespace-nowrap">
                          {item.questionCode}
                        </code>
                      )}
                      {item.questionSuffix}
                    </h3>

                    <div className="space-y-2" role="radiogroup" aria-label={`Review question ${qIndex + 1}`}>
                      {item.options.map((opt) => {
                        const isSelected = chosenId === opt.id;
                        const showCorrect = isSelected && opt.isCorrect;
                        const showWrong = isSelected && !opt.isCorrect;

                        return (
                          <label
                            key={opt.id}
                            className={`flex items-start gap-2.5 p-2.5 sm:p-3 rounded-lg border text-xs transition-colors cursor-pointer ${
                              showCorrect
                                ? 'bg-secondary-container/30 border-secondary/45 text-on-surface'
                                : showWrong
                                  ? 'bg-primary-fixed/30 border-primary/40 text-on-surface'
                                  : 'bg-surface-container-lowest border-outline-variant/35 hover:border-outline-variant/70 text-on-surface'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`quick-review-${lesson.id}-${qKey}`}
                              value={opt.id}
                              checked={isSelected}
                              onChange={() => handleSelectOption(qKey, opt.id)}
                              className="w-3.5 h-3.5 mt-0.5 accent-primary shrink-0 cursor-pointer"
                            />
                            <span className="leading-relaxed">
                              {opt.labelPrefix} {opt.text}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {chosenOption && (
                    <div
                      className={`rounded-lg p-3 border text-xs leading-relaxed ${
                        chosenOption.isCorrect
                          ? 'bg-secondary-container/25 border-secondary/35 text-on-secondary-container'
                          : 'bg-surface-container-lowest border-primary/35 text-on-surface'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {chosenOption.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        ) : (
                          <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-1.5">
                          <p>{chosenOption.feedback}</p>
                          {!chosenOption.isCorrect && (
                            <button
                              type="button"
                              onClick={() => onRevisitSection(lessonIndex, sectionLink.targetId)}
                              className="inline-flex items-center gap-1 font-medium text-primary hover:underline cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5 shrink-0" />
                              <span>Read “{sectionLink.label}” again</span>
                              <ArrowRight className="w-3 h-3 shrink-0" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Action / Scheduling Result */}
          <div className="pt-2 border-t border-outline-variant/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {finishedState ? (
              <>
                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm text-on-surface">
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 mt-0.5 sm:mt-0 ${
                      finishedState.allCorrect ? 'text-secondary' : 'text-primary'
                    }`}
                  />
                  <span>
                    {finishedState.allCorrect
                      ? `Nice work! Everything feels solid—we will check back gently in ${finishedState.nextDays} days.`
                      : 'Good check-in! Revisiting once helps ideas stick, so we will keep this handy for tomorrow.'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleConfirmNext}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-secondary text-on-secondary text-xs font-medium hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Done</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                <span className="text-xs text-on-surface-variant tabular-nums">
                  {answeredCount} of {questions.length} answered
                </span>
                <button
                  type="button"
                  disabled={!allAnswered}
                  onClick={handleFinish}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    allAnswered
                      ? 'bg-primary text-on-primary hover:bg-primary-container cursor-pointer'
                      : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
                  }`}
                >
                  <span>Finish quick review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
