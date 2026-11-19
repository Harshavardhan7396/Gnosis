import { useMemo } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Printer,
  Sparkles,
} from 'lucide-react';
import { cheatSheetData, glossaryTerms } from '../data/lessons.js';
import type { GlossaryTerm, Lesson } from '../types/lesson';

interface CheatSheetPageProps {
  lessons: Lesson[];
  completedLessonIds: string[];
  onBackToLessons: () => void;
  onOpenLesson: (lessonIndex: number) => void;
  onOpenGlossaryTerm: (termKey: string) => void;
}

interface LessonCheatSheetSummary {
  lesson: Lesson;
  lessonNumber: number;
  lessonIndex: number;
  keyPoints: string[];
  terms: Array<{
    term: string;
    meaning: string;
    whereToFind?: string;
    glossaryKey?: string;
  }>;
  commonMistake: {
    title: string;
    text: string;
  };
}

const TUTORIAL_COMMON_MISTAKES: Record<string, { title: string; text: string }> = {
  'add-first-file': {
    title: 'Forgetting .md or writing a vague commit note',
    text: 'Name your welcome file README.md (with .md at the end) so GitHub formats it nicely, use "Create new file" when typing in the browser, and write a clear commit note like "Create README.md".',
  },
  'create-first-branch': {
    title: 'Using spaces in branch names or committing to main by mistake',
    text: 'Branch names cannot have spaces—connect words with hyphens like welcome-update. Always glance at the branch label before clicking Commit changes so main stays untouched.',
  },
};

const allGlossaryEntries = Object.values(glossaryTerms) as GlossaryTerm[];

function buildLessonSummary(lesson: Lesson, lessonIndex: number): LessonCheatSheetSummary {
  const keyPoints: string[] = [];
  const terms: LessonCheatSheetSummary['terms'] = [];
  const seenTermNames = new Set<string>();

  const addTerm = (entry: {
    term: string;
    meaning: string;
    whereToFind?: string;
    glossaryKey?: string;
  }) => {
    const normalized = entry.term.trim().toLowerCase();
    if (seenTermNames.has(normalized)) return;
    seenTermNames.add(normalized);
    terms.push(entry);
  };

  // Match glossary terms taught in this lesson
  for (const g of allGlossaryEntries) {
    if (g.lessonId === lesson.id) {
      addTerm({
        term: g.term,
        meaning: g.meaning,
        whereToFind: g.whereToFind,
        glossaryKey: g.key,
      });
    }
  }

  let commonMistake = {
    title: 'Take your time and check which branch you are on',
    text: 'Double-check your file name, branch label, and commit message before clicking Commit changes.',
  };

  if (lesson.kind === 'concept' && lesson.concept) {
    const { oneLineMeaning, diagram, whereToFind, commonMistake: conceptMistake } =
      lesson.concept;

    addTerm({
      term: oneLineMeaning.term,
      meaning: oneLineMeaning.meaning,
    });
    if (oneLineMeaning.extraTerm && oneLineMeaning.extraMeaning) {
      addTerm({
        term: oneLineMeaning.extraTerm,
        meaning: oneLineMeaning.extraMeaning,
      });
    }

    keyPoints.push(`${oneLineMeaning.term}: ${oneLineMeaning.meaning}`);
    if (oneLineMeaning.extraTerm && oneLineMeaning.extraMeaning) {
      keyPoints.push(`${oneLineMeaning.extraTerm}: ${oneLineMeaning.extraMeaning}`);
    }
    if (diagram.caption) {
      keyPoints.push(diagram.caption);
    }
    if (whereToFind.markers.length > 0) {
      keyPoints.push(
        `Where to look: ${whereToFind.markers.map((m) => m.label).join(' · ')}.`
      );
    }
    if (lesson.concept.afterMerging) {
      keyPoints.push(lesson.concept.afterMerging.text);
    }

    commonMistake = {
      title: conceptMistake.title,
      text: conceptMistake.text,
    };
  } else {
    if (lesson.steps) {
      for (const step of lesson.steps) {
        const title = `${step.titlePrefix}${step.titleBold ?? ''}${step.titleSuffix ?? ''}${
          step.titleCodePill ? ` ${step.titleCodePill}` : ''
        }`.trim();
        keyPoints.push(`${title} — ${step.callout.text}`);
      }
    }
    if (lesson.vocabulary) {
      for (const card of lesson.vocabulary.cards) {
        const matchedGlossary = allGlossaryEntries.find(
          (g) => g.term.toLowerCase() === card.term.toLowerCase()
        );
        addTerm({
          term: card.term,
          meaning: card.definition,
          whereToFind: matchedGlossary?.whereToFind,
          glossaryKey: matchedGlossary?.key,
        });
      }
    }
    if (TUTORIAL_COMMON_MISTAKES[lesson.id]) {
      commonMistake = TUTORIAL_COMMON_MISTAKES[lesson.id];
    }
  }

  return {
    lesson,
    lessonNumber: lessonIndex + 1,
    lessonIndex,
    keyPoints,
    terms,
    commonMistake,
  };
}

export function CheatSheetPage({
  lessons,
  completedLessonIds,
  onBackToLessons,
  onOpenLesson,
  onOpenGlossaryTerm,
}: CheatSheetPageProps) {
  const completedSet = useMemo(() => new Set(completedLessonIds), [completedLessonIds]);

  const availableLessonsCount = useMemo(
    () => lessons.filter((lesson) => !lesson.comingSoon).length,
    [lessons]
  );

  const completedSummaries = useMemo(
    () =>
      lessons
        .map((lesson, idx) => ({ lesson, idx }))
        .filter(({ lesson }) => !lesson.comingSoon && completedSet.has(lesson.id))
        .map(({ lesson, idx }) => buildLessonSummary(lesson, idx)),
    [lessons, completedSet]
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-4 sm:py-8 max-w-5xl mx-auto">
      {/* Screen-only back button */}
      <div className="no-print mb-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToLessons}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Lessons</span>
        </button>

        <span className="font-mono text-xs text-on-surface-variant tabular-nums">
          {completedSummaries.length} of {availableLessonsCount} lessons summarized
        </span>
      </div>

      {/* Page Header */}
      <header className="mb-8 pb-6 border-b border-outline-variant/40 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs tracking-[0.12em] text-primary font-semibold uppercase mb-2.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Personal Study Reference</span>
          </div>
          <h1 className="text-[32px] sm:text-[42px] leading-[1.12] font-normal tracking-[-0.02em] text-on-surface mb-2.5">
            Your GitStart Cheat Sheet
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {completedSummaries.length > 0
              ? `Everything you have learned across ${completedSummaries.length} completed ${
                  completedSummaries.length === 1 ? 'lesson' : 'lessons'
                }—key points, glossary terms, and common mistakes on one clean page.`
              : 'Your personal summary grows automatically as you finish lessons. Print or save this page as a PDF anytime.'}
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="no-print inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-medium hover:bg-primary-container transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
        >
          <Printer className="w-4 h-4 shrink-0" />
          <span>Print / Save as PDF</span>
        </button>
      </header>

      {/* Completed Lessons Summary */}
      {completedSummaries.length === 0 ? (
        <section className="print-card rounded-xl border border-outline-variant/45 bg-surface-container-lowest p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed/35 border border-primary/25 text-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-medium text-on-surface">
                Finish your first lesson to build your cheat sheet
              </h2>
              <p className="text-sm text-on-surface-variant leading-relaxed max-w-[60ch]">
                Each time you complete a lesson, its key points, new GitHub words, and common mistakes appear right here automatically.
              </p>
              <button
                type="button"
                onClick={() => onOpenLesson(0)}
                className="no-print inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-medium hover:bg-primary-container transition-colors cursor-pointer"
              >
                <span>Start Lesson 1: {lessons[0]?.cardTitle}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="space-y-6 mb-10">
          {completedSummaries.map((item) => (
            <article
              key={item.lesson.id}
              className="print-card rounded-xl border border-outline-variant/45 bg-surface-container-lowest overflow-hidden shadow-[0_2px_12px_-2px_rgba(28,25,23,0.04)]"
            >
              {/* Lesson Strip Header */}
              <div className="print-tint px-5 sm:px-6 py-4 bg-surface-container-low/70 border-b border-outline-variant/35 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider shrink-0">
                    Lesson {String(item.lessonNumber).padStart(2, '0')}
                  </span>
                  <span className="text-outline-variant/70" aria-hidden="true">
                    ·
                  </span>
                  <h2 className="text-lg sm:text-xl font-medium text-on-surface truncate">
                    {item.lesson.cardTitle}
                  </h2>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenLesson(item.lessonIndex)}
                    className="no-print text-xs font-medium text-primary hover:underline cursor-pointer"
                  >
                    Revisit lesson
                  </button>
                </div>
              </div>

              {/* Lesson Body: Key points, Glossary terms, Common mistake */}
              <div className="p-5 sm:p-6 space-y-6">
                {/* Key Points */}
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary mb-2.5">
                    Key points
                  </h3>
                  <ul className="space-y-2 text-sm text-on-surface leading-relaxed">
                    {item.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Glossary Terms */}
                {item.terms.length > 0 && (
                  <div className="pt-4 border-t border-outline-variant/25">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary mb-3 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Glossary terms</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.terms.map((t) => (
                        <div
                          key={t.term}
                          className="print-tint rounded-lg border border-outline-variant/35 bg-surface-container-low/45 p-3.5 space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-medium text-on-surface">{t.term}</span>
                            {t.glossaryKey && (
                              <button
                                type="button"
                                onClick={() => onOpenGlossaryTerm(t.glossaryKey!)}
                                className="no-print text-[11px] font-medium text-primary hover:underline cursor-pointer shrink-0"
                              >
                                Open in glossary
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed">
                            {t.meaning}
                          </p>
                          {t.whereToFind && (
                            <p className="text-[11px] text-on-surface-variant/85 pt-1">
                              <span className="font-medium text-on-surface">Where: </span>
                              {t.whereToFind}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common Mistake */}
                <div className="pt-4 border-t border-outline-variant/25">
                  <div className="print-tint rounded-r-lg border-l-2 border-primary/70 border-y border-r border-outline-variant/30 bg-surface-container-low/50 p-4 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary block mb-0.5">
                        Common mistake to avoid
                      </span>
                      <p className="text-sm font-medium text-on-surface mb-1">
                        {item.commonMistake.title}
                      </p>
                      <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
                        {item.commonMistake.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Universal Quick Reference Card */}
      <section className="print-card rounded-xl border border-outline-variant/45 bg-surface-container-lowest p-5 sm:p-6 space-y-6">
        <div className="border-b border-outline-variant/30 pb-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary block mb-1">
            Quick Reference
          </span>
          <h2 className="text-xl font-medium text-on-surface">
            Everyday GitHub Actions &amp; Markdown
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant mb-3">
              GitHub Browser Actions
            </h3>
            <div className="divide-y divide-outline-variant/25 border border-outline-variant/35 rounded-lg bg-surface-container-low/30">
              {cheatSheetData.browserActions.map((item) => (
                <div
                  key={item.action}
                  className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <p className="text-sm font-medium text-on-surface">{item.action}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">{item.note}</p>
                  </div>
                  <code className="font-mono text-[11px] px-2.5 py-1 rounded bg-surface-container-lowest border border-outline-variant/35 text-primary whitespace-nowrap self-start sm:self-center">
                    {item.where}
                  </code>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant mb-3">
              Markdown Essentials (.md)
            </h3>
            <div className="divide-y divide-outline-variant/25 border border-outline-variant/35 rounded-lg bg-surface-container-low/30">
              {cheatSheetData.markdownBasics.map((item) => (
                <div
                  key={item.syntax}
                  className="px-4 py-3 flex items-center justify-between gap-4"
                >
                  <code className="font-mono text-xs text-primary">{item.syntax}</code>
                  <span className="text-xs text-on-surface-variant">{item.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
