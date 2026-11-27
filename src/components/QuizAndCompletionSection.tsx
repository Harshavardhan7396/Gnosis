import { CheckCircle2, AlertCircle, ArrowRight, Award, Terminal } from 'lucide-react';
import type { QuizData, CompletionData } from '../types/lesson';
import { ExplainText } from './ExplainText';
import { AskAboutButton } from './AskAboutButton';
import { SectionFeedbackWidget } from './SectionFeedbackWidget';
import {
  SectionListenButton,
  SpeakableHighlight,
  SpeakableText,
} from './SectionListenButton';
import { SectionTranslationPill, useSectionShimmer } from './SectionTranslationPill';
import {
  buildSentenceUnits,
  sanitizeTextForSpeech,
  type SpeechUnit,
} from '../utils/speech';

interface QuizAndCompletionSectionProps {
  lessonId?: string;
  lessonTitle?: string;
  lessonNumber?: number;
  quiz?: QuizData;
  quizzes?: QuizData[];
  completion: CompletionData;
  selectedAnswers: Record<string, string>;
  onSelectAnswer: (questionKey: string, optionId: string, isCorrect: boolean) => void;
  lessonCompleted: boolean;
  onCompleteLesson: () => void;
  hasNextLesson: boolean;
  onNextLesson?: () => void;
  onBackToLessons: () => void;
  onTryItYourself?: () => void;
  allCourseCompleted?: boolean;
  onOpenFinishScreen?: () => void;
}

function QuizQuestionCard({
  lessonId,
  sectionId,
  item,
  qIndex,
  selectedOptionId,
  onSelectAnswer,
}: {
  lessonId: string;
  sectionId: string;
  item: QuizData;
  qIndex: number;
  selectedOptionId: string | null;
  onSelectAnswer: (questionKey: string, optionId: string, isCorrect: boolean) => void;
}) {
  const qKey = item.id ?? `q-${qIndex}`;
  const translateSectionId = `quiz-${qKey}`;
  const isTranslatingQuestion = useSectionShimmer(translateSectionId);

  const questionFullText = `${item.questionPrefix}${item.questionCode ?? ''}${item.questionSuffix}`;
  const quizSectionText = [
    `${item.eyebrow}: ${questionFullText}`,
    ...item.options.map((o) => `${o.labelPrefix} ${o.text}`),
  ].join('\n');

  return (
    <div
      id={`quiz-card-${qKey}`}
      data-translate-section={translateSectionId}
      className={`${qIndex > 0 ? 'pt-8 border-t border-outline-variant/30' : ''} ${
        isTranslatingQuestion ? 'translate-section-shimmer rounded-lg' : ''
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
        <span className="text-xs tracking-[0.12em] text-primary font-semibold uppercase">
          <SpeakableHighlight
            sectionId={sectionId}
            unitId={`${sectionId}-${qKey}-eyebrow`}
          >
            {item.eyebrow}
          </SpeakableHighlight>
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <SectionTranslationPill sectionId={translateSectionId} compact />
          <AskAboutButton
            sectionId={`${lessonId}-quiz-${qKey}`}
            topic={item.eyebrow}
            sectionText={quizSectionText}
          />
        </div>
      </div>
      <h3 className="text-[18px] sm:text-[20px] font-normal text-on-surface mb-5 leading-relaxed">
        <SpeakableHighlight
          sectionId={sectionId}
          unitId={`${sectionId}-${qKey}-question`}
        >
          {item.questionPrefix}
          {item.questionCode && (
            <code className="font-mono text-sm px-2 py-0.5 rounded bg-surface-container-low border border-outline-variant/30 whitespace-nowrap">
              {item.questionCode}
            </code>
          )}
          {item.questionSuffix}
        </SpeakableHighlight>
      </h3>

      <div className="space-y-3" role="radiogroup" aria-label={item.eyebrow}>
        {item.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const showCorrect = isSelected && option.isCorrect;
          const showIncorrect = isSelected && !option.isCorrect;

          return (
            <label
              key={option.id}
              className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-lg border transition-colors cursor-pointer ${
                showCorrect
                  ? 'bg-secondary-container/25 border-secondary/35'
                  : showIncorrect
                    ? 'bg-primary-fixed/25 border-primary/30'
                    : 'bg-surface-container-low/40 border-outline-variant/30 hover:border-outline-variant/60'
              }`}
            >
              <input
                className="w-3.5 h-3.5 mt-1 accent-primary shrink-0 cursor-pointer"
                name={`quiz-${qKey}`}
                type="radio"
                value={option.id}
                checked={isSelected}
                onChange={() => onSelectAnswer(qKey, option.id, option.isCorrect)}
              />
              <div className="flex-1 min-w-0">
                <span
                  className={`text-xs sm:text-[13px] text-on-surface block ${
                    isSelected ? 'font-medium mb-1' : ''
                  }`}
                >
                  <SpeakableText
                    sectionId={sectionId}
                    unitPrefix={`${sectionId}-${qKey}-opt-${option.id}`}
                    text={`${option.labelPrefix} ${option.text}`}
                    withExplain={false}
                  />
                </span>

                {showCorrect && (
                  <p className="text-xs text-on-secondary-container leading-relaxed">
                    {option.feedback}
                  </p>
                )}

                {showIncorrect && (
                  <p className="text-xs text-primary leading-relaxed">
                    {option.feedback}
                  </p>
                )}
              </div>

              {showCorrect && (
                <CheckCircle2 className="w-[18px] h-[18px] text-secondary shrink-0 mt-0.5" />
              )}
              {showIncorrect && (
                <AlertCircle className="w-[18px] h-[18px] text-primary shrink-0 mt-0.5" />
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export function QuizAndCompletionSection({
  lessonId = 'lesson',
  lessonTitle = 'Lesson',
  lessonNumber = 1,
  quiz,
  quizzes,
  completion,
  selectedAnswers,
  onSelectAnswer,
  lessonCompleted,
  onCompleteLesson,
  hasNextLesson,
  onNextLesson,
  onBackToLessons,
  onTryItYourself,
  allCourseCompleted = false,
  onOpenFinishScreen,
}: QuizAndCompletionSectionProps) {
  const questionList: QuizData[] = quizzes && quizzes.length > 0 ? quizzes : quiz ? [quiz] : [];

  const quizTotal = questionList.length;
  const quizScore = questionList.reduce((acc, item, idx) => {
    const qKey = item.id ?? `q-${idx}`;
    const chosenId = selectedAnswers[qKey];
    const isCorrect = item.options.some((opt) => opt.id === chosenId && opt.isCorrect);
    return acc + (isCorrect ? 1 : 0);
  }, 0);
  const answeredCount = questionList.filter((item, idx) => {
    const qKey = item.id ?? `q-${idx}`;
    return Boolean(selectedAnswers[qKey]);
  }).length;

  const sectionId = `${lessonId}-quiz`;
  const isTranslatingCompletion = useSectionShimmer('completion');

  const buildQuizUnits = (): SpeechUnit[] =>
    questionList.flatMap((item, qIndex) => {
      const qKey = item.id ?? `q-${qIndex}`;
      const questionSpeech = `${item.questionPrefix}${item.questionCode ? 'code example' : ''}${item.questionSuffix}`;
      return [
        {
          id: `${sectionId}-${qKey}-eyebrow`,
          text: item.eyebrow,
          speechText: sanitizeTextForSpeech(item.eyebrow),
        },
        {
          id: `${sectionId}-${qKey}-question`,
          text: `${item.questionPrefix}${item.questionCode ?? ''}${item.questionSuffix}`,
          speechText: sanitizeTextForSpeech(questionSpeech),
        },
        ...item.options.flatMap((option) =>
          buildSentenceUnits(
            `${sectionId}-${qKey}-opt-${option.id}`,
            `${option.labelPrefix} ${option.text}`
          )
        ),
      ];
    });

  return (
    <section
      id="quick-check"
      data-section-title="Quick check quiz"
      className="w-full py-14 sm:py-20 scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Quiz Card */}
        <div className="lg:col-span-7 rounded-xl bg-surface-container-lowest border border-outline-variant/40 p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] space-y-8">
          {quizTotal > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-outline-variant/25 text-xs text-on-surface-variant">
              <span className="font-medium text-on-surface">
                Quick check · {quizTotal} {quizTotal === 1 ? 'question' : 'questions'}
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <SectionListenButton
                  sectionId={sectionId}
                  sectionLabel="Quick check quiz"
                  getUnits={buildQuizUnits}
                />
                <span className="font-mono tabular-nums">
                  Score: {quizScore}/{quizTotal}
                  {answeredCount > 0 && answeredCount < quizTotal
                    ? ` (${answeredCount} answered)`
                    : ''}
                </span>
              </div>
            </div>
          )}

          {questionList.map((item, qIndex) => {
            const qKey = item.id ?? `q-${qIndex}`;
            return (
              <QuizQuestionCard
                key={qKey}
                lessonId={lessonId}
                sectionId={sectionId}
                item={item}
                qIndex={qIndex}
                selectedOptionId={selectedAnswers[qKey] ?? null}
                onSelectAnswer={onSelectAnswer}
              />
            );
          })}
        </div>

        {/* Lesson Completion Card / Calm Completion Screen */}
        <div
          id="quick-check-completion"
          data-translate-section="completion"
          className={`lg:col-span-5 rounded-xl bg-surface-container-high/40 border border-outline-variant/40 p-6 sm:p-8 lg:p-10 flex flex-col justify-between lg:sticky lg:top-28 ${
            isTranslatingCompletion ? 'translate-section-shimmer' : ''
          }`}
        >
          {lessonCompleted ? (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-secondary-container/35 border border-secondary/30 text-on-secondary-container">
                  <Award className="w-4 h-4 text-secondary shrink-0" />
                  <span className="text-xs font-semibold tracking-[0.06em] uppercase">
                    Lesson {String(lessonNumber).padStart(2, '0')} Complete
                  </span>
                </div>
                <SectionTranslationPill sectionId="completion" compact />
              </div>

              <div>
                <h3 className="text-[24px] sm:text-[28px] font-normal text-on-surface mb-2.5 leading-snug">
                  Well done — lesson finished
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {hasNextLesson
                    ? 'Your progress is saved and the next lesson is now unlocked.'
                    : 'You finished all available lessons so far! Feel free to revisit any lesson or check the glossary anytime.'}
                </p>
              </div>

              {quizTotal > 0 && (
                <div className="rounded-lg bg-surface-container-lowest/85 border border-outline-variant/35 px-4 py-3 flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">Quiz score</span>
                  <span className="font-mono font-medium text-on-surface tabular-nums">
                    {quizScore} of {quizTotal} correct
                  </span>
                </div>
              )}

              <div className="space-y-3 pt-1">
                {onTryItYourself && (
                  <button
                    type="button"
                    onClick={onTryItYourself}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-surface-container-lowest border border-primary/45 text-primary text-sm font-medium hover:bg-primary-fixed/25 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Terminal className="w-4 h-4 shrink-0" />
                    <span>Try it yourself</span>
                  </button>
                )}

                {hasNextLesson && onNextLesson && (
                  <button
                    type="button"
                    onClick={onNextLesson}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary text-sm font-medium shadow-sm hover:bg-primary-container transition-colors cursor-pointer"
                  >
                    <span>Continue to Lesson {lessonNumber + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {allCourseCompleted && onOpenFinishScreen && (
                  <button
                    type="button"
                    onClick={onOpenFinishScreen}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary text-sm font-medium shadow-sm hover:bg-primary-container transition-colors cursor-pointer"
                  >
                    <span>Open completion summary</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={onBackToLessons}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    hasNextLesson || (allCourseCompleted && onOpenFinishScreen)
                      ? 'bg-surface-container-lowest border border-outline-variant/45 text-on-surface hover:bg-surface-container-low'
                      : 'bg-secondary text-on-secondary shadow-sm hover:opacity-95'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Back to all lessons</span>
                </button>
              </div>

              {hasNextLesson && (
                <p className="text-center text-xs text-on-surface-variant/80">
                  {completion.nextUpPrefix}
                  <span className="text-on-surface font-medium">{completion.nextUpTitle}</span> ·{' '}
                  {completion.nextUpDuration}
                </p>
              )}
            </div>
          ) : (
            <>
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs tracking-[0.12em] text-on-surface-variant/80 font-semibold uppercase">
                    {completion.eyebrow}
                  </span>
                  <SectionTranslationPill sectionId="completion" compact />
                </div>
                <h3 className="text-[24px] sm:text-[28px] font-normal text-on-surface mb-3.5 leading-snug">
                  {completion.title}
                </h3>
                <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
                  <ExplainText text={completion.description} />
                </p>
              </div>

              <div className="space-y-3">
                {onTryItYourself && (
                  <button
                    type="button"
                    onClick={onTryItYourself}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-surface-container-lowest border border-primary/45 text-primary text-sm font-medium hover:bg-primary-fixed/25 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Terminal className="w-4 h-4 shrink-0" />
                    <span>Try it yourself</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onCompleteLesson}
                  className="w-full inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-primary text-on-primary text-sm font-medium shadow-sm hover:bg-primary-container transition-colors cursor-pointer"
                >
                  <span>{completion.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-xs text-on-surface-variant/80 pt-1">
                  {completion.nextUpPrefix}
                  <span className="text-on-surface font-medium">{completion.nextUpTitle}</span> ·{' '}
                  {completion.nextUpDuration}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <SectionFeedbackWidget
        lessonId={lessonId}
        lessonTitle={lessonTitle}
        sectionId="quiz"
        sectionTitle="Quick check quiz"
      />
    </section>
  );
}
