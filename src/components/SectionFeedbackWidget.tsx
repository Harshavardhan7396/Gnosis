import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import {
  getSectionFeedback,
  recordSectionVote,
  saveConfusingNote,
  FEEDBACK_UPDATED_EVENT,
} from '../utils/feedback';

interface SectionFeedbackWidgetProps {
  lessonId: string;
  lessonTitle: string;
  sectionId: string;
  sectionTitle: string;
  className?: string;
}

export function SectionFeedbackWidget({
  lessonId,
  lessonTitle,
  sectionId,
  sectionTitle,
  className = '',
}: SectionFeedbackWidgetProps) {
  const [vote, setVote] = useState<'up' | 'down' | undefined>(() => {
    return getSectionFeedback(lessonId, sectionId)?.userVote;
  });
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    const syncFromStorage = () => {
      const saved = getSectionFeedback(lessonId, sectionId);
      setVote(saved?.userVote);
    };
    syncFromStorage();
    window.addEventListener(FEEDBACK_UPDATED_EVENT, syncFromStorage);
    return () => window.removeEventListener(FEEDBACK_UPDATED_EVENT, syncFromStorage);
  }, [lessonId, sectionId]);

  const handleVote = (nextVote: 'up' | 'down') => {
    const updated = recordSectionVote({
      lessonId,
      lessonTitle,
      sectionId,
      sectionTitle,
      vote: nextVote,
    });
    setVote(updated.userVote);

    if (nextVote === 'down') {
      setShowFollowUp(true);
      setNoteSaved(false);
    } else {
      setShowFollowUp(false);
      setNoteSaved(false);
    }
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) {
      setShowFollowUp(false);
      return;
    }
    saveConfusingNote({
      lessonId,
      lessonTitle,
      sectionId,
      sectionTitle,
      noteText: noteInput,
    });
    setNoteInput('');
    setNoteSaved(true);
    setShowFollowUp(false);
  };

  return (
    <div
      data-ask-ignore="true"
      className={`mt-6 pt-4 border-t border-outline-variant/25 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-medium text-on-surface-variant">
            Was this helpful?
          </span>
          {vote === 'up' && (
            <span className="text-[11px] text-secondary font-medium">
              Thanks for letting us know.
            </span>
          )}
          {vote === 'down' && !showFollowUp && (
            <span className="text-[11px] text-on-surface-variant">
              {noteSaved ? 'Feedback saved — thank you.' : 'Noted — thanks for telling us.'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleVote('up')}
            aria-label={`Thumbs up for ${sectionTitle}`}
            aria-pressed={vote === 'up'}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              vote === 'up'
                ? 'bg-secondary-container/35 border-secondary/45 text-secondary'
                : 'bg-surface-container-low/70 border-outline-variant/40 text-on-surface-variant hover:text-secondary hover:border-secondary/40 hover:bg-surface-container-lowest'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5 shrink-0" />
            <span>Yes</span>
          </button>

          <button
            type="button"
            onClick={() => handleVote('down')}
            aria-label={`Thumbs down for ${sectionTitle}`}
            aria-pressed={vote === 'down'}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              vote === 'down'
                ? 'bg-primary-fixed/35 border-primary/45 text-primary'
                : 'bg-surface-container-low/70 border-outline-variant/40 text-on-surface-variant hover:text-primary hover:border-primary/40 hover:bg-surface-container-lowest'
            }`}
          >
            <ThumbsDown className="w-3.5 h-3.5 shrink-0" />
            <span>No</span>
          </button>
        </div>
      </div>

      {showFollowUp && (
        <form
          onSubmit={handleSaveNote}
          className="mt-3 rounded-lg border border-outline-variant/40 bg-surface-container-low/55 p-3.5 space-y-2.5"
        >
          <label
            htmlFor={`confusing-input-${lessonId}-${sectionId}`}
            className="block text-xs font-medium text-on-surface"
          >
            What was confusing?{' '}
            <span className="text-on-surface-variant font-normal">(optional)</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id={`confusing-input-${lessonId}-${sectionId}`}
              type="text"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              maxLength={280}
              placeholder="Tell us which word or step felt unclear..."
              className="flex-1 h-9 px-3 rounded-md border border-outline-variant/50 bg-surface-container-lowest text-xs text-on-surface placeholder:text-on-surface-variant/65 focus:outline-none focus:border-primary"
            />
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-md bg-primary text-on-primary text-xs font-medium hover:bg-primary-container transition-colors whitespace-nowrap cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
              <button
                type="button"
                onClick={() => setShowFollowUp(false)}
                className="px-3 h-9 rounded-md border border-outline-variant/45 bg-surface-container-lowest text-xs text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap cursor-pointer"
              >
                Skip
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
