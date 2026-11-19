import { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Trash2,
  ClipboardList,
} from 'lucide-react';
import type { Lesson } from '../types/lesson';
import {
  getFeedbackStore,
  clearAllFeedback,
  makeSectionFeedbackKey,
  FEEDBACK_UPDATED_EVENT,
  type FeedbackStore,
  type FeedbackNote,
} from '../utils/feedback';

interface FeedbackDashboardPageProps {
  lessons: Lesson[];
  onBackToApp: () => void;
  onOpenLesson: (lessonIndex: number) => void;
}

interface SectionDescriptor {
  sectionId: string;
  sectionTitle: string;
  thumbsUp: number;
  thumbsDown: number;
  notes: FeedbackNote[];
}

function getLessonSections(lesson: Lesson): Array<{ sectionId: string; sectionTitle: string }> {
  const list: Array<{ sectionId: string; sectionTitle: string }> = [];

  if (lesson.kind === 'concept' && lesson.concept) {
    list.push(
      { sectionId: 'story', sectionTitle: lesson.concept.story.title },
      { sectionId: 'meaning', sectionTitle: lesson.concept.oneLineMeaning.term },
      { sectionId: 'diagram', sectionTitle: lesson.concept.diagram.title },
      { sectionId: 'where', sectionTitle: lesson.concept.whereToFind.title }
    );
    if (lesson.concept.afterMerging) {
      list.push({
        sectionId: 'after-merging',
        sectionTitle: lesson.concept.afterMerging.title,
      });
    }
    list.push({ sectionId: 'mistake', sectionTitle: lesson.concept.commonMistake.title });
  } else {
    if (lesson.steps) {
      for (const step of lesson.steps) {
        const title = `${step.titlePrefix}${step.titleBold ?? ''}${step.titleSuffix ?? ''}${
          step.titleCodePill ? ` ${step.titleCodePill}` : ''
        }`.trim();
        list.push({ sectionId: step.id, sectionTitle: title });
      }
    }
    if (lesson.practice) {
      list.push({ sectionId: 'practice', sectionTitle: lesson.practice.title });
    }
    if (lesson.vocabulary) {
      list.push({ sectionId: 'vocabulary', sectionTitle: lesson.vocabulary.title });
    }
    if (lesson.diagram) {
      list.push({
        sectionId: 'branch-diagram',
        sectionTitle: `${lesson.diagram.titlePrefix}${lesson.diagram.titleHighlight}`.trim(),
      });
    }
  }

  list.push({ sectionId: 'quiz', sectionTitle: 'Quick check quiz' });
  return list;
}

export function FeedbackDashboardPage({
  lessons,
  onBackToApp,
  onOpenLesson,
}: FeedbackDashboardPageProps) {
  const [store, setStore] = useState<FeedbackStore>(() => getFeedbackStore());
  const [filterMode, setFilterMode] = useState<'all' | 'with-feedback'>('all');
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    const sync = () => setStore(getFeedbackStore());
    window.addEventListener(FEEDBACK_UPDATED_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(FEEDBACK_UPDATED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const groupedByLesson = useMemo(() => {
    return lessons
      .map((lesson, lessonIndex) => ({ lesson, lessonIndex }))
      .filter(({ lesson }) => !lesson.comingSoon)
      .map(({ lesson, lessonIndex }) => {
        const canonicalSections = getLessonSections(lesson);
      const seenIds = new Set(canonicalSections.map((s) => s.sectionId));

      // Include any extra feedback entries stored for this lessonId even if sectionId wasn't in canonical list
      const extraEntries = Object.values(store).filter(
        (rec) => rec.lessonId === lesson.id && !seenIds.has(rec.sectionId)
      );

      const allSections: SectionDescriptor[] = [
        ...canonicalSections.map((s) => {
          const rec = store[makeSectionFeedbackKey(lesson.id, s.sectionId)];
          return {
            sectionId: s.sectionId,
            sectionTitle: s.sectionTitle,
            thumbsUp: rec?.thumbsUp ?? 0,
            thumbsDown: rec?.thumbsDown ?? 0,
            notes: rec?.notes ?? [],
          };
        }),
        ...extraEntries.map((rec) => ({
          sectionId: rec.sectionId,
          sectionTitle: rec.sectionTitle,
          thumbsUp: rec.thumbsUp,
          thumbsDown: rec.thumbsDown,
          notes: rec.notes,
        })),
      ];

      const visibleSections =
        filterMode === 'with-feedback'
          ? allSections.filter((s) => s.thumbsUp > 0 || s.thumbsDown > 0 || s.notes.length > 0)
          : allSections;

      const totalUp = allSections.reduce((sum, s) => sum + s.thumbsUp, 0);
      const totalDown = allSections.reduce((sum, s) => sum + s.thumbsDown, 0);
      const totalNotes = allSections.reduce((sum, s) => sum + s.notes.length, 0);

      return {
        lesson,
        lessonIndex,
        sections: visibleSections,
        totalUp,
        totalDown,
        totalNotes,
      };
    });
  }, [lessons, store, filterMode]);

  const totals = useMemo(() => {
    let up = 0;
    let down = 0;
    let notes = 0;
    let ratedSections = 0;

    for (const rec of Object.values(store)) {
      up += rec.thumbsUp;
      down += rec.thumbsDown;
      notes += rec.notes.length;
      if (rec.thumbsUp > 0 || rec.thumbsDown > 0) {
        ratedSections += 1;
      }
    }
    return { up, down, notes, ratedSections };
  }, [store]);

  const visibleLessons =
    filterMode === 'with-feedback'
      ? groupedByLesson.filter((g) => g.sections.length > 0)
      : groupedByLesson;

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
          Local browser feedback log (/feedback)
        </span>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs tracking-[0.12em] text-primary font-semibold uppercase mb-2">
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Lesson Section Feedback</span>
        </div>
        <h1 className="text-[32px] sm:text-[42px] leading-[1.12] font-normal tracking-[-0.02em] text-on-surface mb-2.5">
          Learner Feedback
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-[65ch]">
          Thumbs up and thumbs down counts recorded in this browser, grouped by lesson and section, along with optional notes about anything confusing.
        </p>
      </header>

      {/* Summary Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
        <div className="rounded-xl border border-outline-variant/45 bg-surface-container-lowest p-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-on-surface-variant block mb-1">
            Thumbs up
          </span>
          <span className="text-2xl font-medium text-secondary tabular-nums">{totals.up}</span>
        </div>
        <div className="rounded-xl border border-outline-variant/45 bg-surface-container-lowest p-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-on-surface-variant block mb-1">
            Thumbs down
          </span>
          <span className="text-2xl font-medium text-primary tabular-nums">{totals.down}</span>
        </div>
        <div className="rounded-xl border border-outline-variant/45 bg-surface-container-lowest p-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-on-surface-variant block mb-1">
            Sections rated
          </span>
          <span className="text-2xl font-medium text-on-surface tabular-nums">
            {totals.ratedSections}
          </span>
        </div>
        <div className="rounded-xl border border-outline-variant/45 bg-surface-container-lowest p-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-on-surface-variant block mb-1">
            Written notes
          </span>
          <span className="text-2xl font-medium text-on-surface tabular-nums">{totals.notes}</span>
        </div>
      </section>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="inline-flex rounded-lg border border-outline-variant/45 bg-surface-container-low p-1">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterMode === 'all'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All lessons &amp; sections
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('with-feedback')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filterMode === 'with-feedback'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Only with feedback
          </button>
        </div>

        {(totals.up > 0 || totals.down > 0 || totals.notes > 0) && (
          <div>
            {!confirmClear ? (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/45 bg-surface-container-lowest text-xs text-on-surface-variant hover:text-primary hover:border-primary/40 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear feedback</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary-fixed/20 px-3 py-1.5 text-xs">
                <span className="text-on-surface">Clear all saved feedback?</span>
                <button
                  type="button"
                  onClick={() => {
                    clearAllFeedback();
                    setConfirmClear(false);
                  }}
                  className="font-semibold text-primary hover:underline cursor-pointer"
                >
                  Yes, clear
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Feedback Grouped by Lesson & Section */}
      {visibleLessons.length === 0 ? (
        <div className="rounded-xl border border-outline-variant/45 bg-surface-container-lowest p-8 text-center">
          <p className="text-sm font-medium text-on-surface mb-1">No section feedback yet</p>
          <p className="text-xs text-on-surface-variant mb-4">
            Visit any lesson section and click thumbs up or thumbs down under &ldquo;Was this helpful?&rdquo; to see counts and notes here.
          </p>
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className="px-4 py-2 rounded-lg border border-outline-variant/45 bg-surface-container-low text-xs font-medium text-on-surface hover:text-primary cursor-pointer"
          >
            Show all lessons &amp; sections
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {visibleLessons.map(({ lesson, lessonIndex, sections, totalUp, totalDown }) => (
            <section
              key={lesson.id}
              className="rounded-xl border border-outline-variant/45 bg-surface-container-lowest overflow-hidden shadow-[0_2px_10px_-2px_rgba(28,25,23,0.03)]"
            >
              <div className="px-5 py-4 bg-surface-container-low/60 border-b border-outline-variant/35 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-primary block">
                    Lesson {String(lessonIndex + 1).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenLesson(lessonIndex)}
                    className="text-base sm:text-lg font-medium text-on-surface hover:text-primary transition-colors text-left cursor-pointer"
                  >
                    {lesson.cardTitle}
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono tabular-nums">
                  <span className="inline-flex items-center gap-1 text-secondary">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{totalUp}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-primary">
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>{totalDown}</span>
                  </span>
                </div>
              </div>

              <div className="divide-y divide-outline-variant/25">
                {sections.map((section) => (
                  <div key={section.sectionId} className="px-5 py-4 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-on-surface">
                          {section.sectionTitle}
                        </p>
                        <span className="font-mono text-[11px] text-on-surface-variant">
                          {section.sectionId}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0 font-mono text-xs tabular-nums">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${
                            section.thumbsUp > 0
                              ? 'bg-secondary-container/30 border-secondary/35 text-secondary font-medium'
                              : 'bg-surface-container-low/50 border-outline-variant/30 text-on-surface-variant'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{section.thumbsUp}</span>
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${
                            section.thumbsDown > 0
                              ? 'bg-primary-fixed/30 border-primary/35 text-primary font-medium'
                              : 'bg-surface-container-low/50 border-outline-variant/30 text-on-surface-variant'
                          }`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                          <span>{section.thumbsDown}</span>
                        </span>
                      </div>
                    </div>

                    {section.notes.length > 0 && (
                      <div className="space-y-2 pt-1">
                        {section.notes.map((note) => (
                          <div
                            key={note.id}
                            className="rounded-lg border-l-2 border-primary/65 border-y border-r border-outline-variant/30 bg-surface-container-low/45 px-3.5 py-2.5 flex items-start gap-2.5"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-[13px] text-on-surface leading-relaxed">
                                {note.text}
                              </p>
                              <span className="font-mono text-[10px] text-on-surface-variant block mt-1">
                                {new Date(note.createdAt).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
