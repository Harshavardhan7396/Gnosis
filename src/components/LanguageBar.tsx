import { useState, type FormEvent } from 'react';
import {
  Languages,
  MessageSquareWarning,
  Check,
  X,
} from 'lucide-react';
import {
  LANGUAGE_OPTIONS,
  getLanguageLabel,
  type SupportedLanguage,
} from '../utils/lessonTranslation';
import { saveConfusingNote } from '../utils/feedback';

interface LanguageBarProps {
  lessonId: string;
  lessonTitle: string;
  language: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  readyCount: number;
  totalCount: number;
  activeCount: number;
}

export function LanguageBar({
  lessonId,
  lessonTitle,
  language,
  onChangeLanguage,
  readyCount,
  totalCount,
  activeCount,
}: LanguageBarProps) {
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportSent, setReportSent] = useState(false);

  const languageLabel = getLanguageLabel(language);

  const handleSubmitReport = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = reportText.trim();
    if (!trimmed) return;
    saveConfusingNote({
      lessonId,
      lessonTitle,
      sectionId: `translation-${language}`,
      sectionTitle: `AI Translation (${languageLabel})`,
      noteText: trimmed,
    });
    setReportText('');
    setReportOpen(false);
    setReportSent(true);
    window.setTimeout(() => setReportSent(false), 3500);
  };

  return (
    <div className="no-print mb-5 space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-outline-variant/25">
        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
          <Languages className="w-4 h-4 text-primary shrink-0" />
          <span className="font-medium text-on-surface">Lesson language</span>
        </div>

        <div
          role="group"
          aria-label="Select lesson language"
          className="inline-flex flex-wrap items-center rounded-lg bg-surface-container-low border border-outline-variant/40 p-1 gap-1"
        >
          {LANGUAGE_OPTIONS.map((opt) => {
            const active = language === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setReportOpen(false);
                  setReportSent(false);
                  onChangeLanguage(opt.id);
                }}
                aria-pressed={active}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest/70'
                }`}
              >
                {opt.id === 'en' ? opt.label : `${opt.label} (${opt.nativeLabel})`}
              </button>
            );
          })}
        </div>
      </div>

      {language !== 'en' && (
        <div className="rounded-xl bg-surface-container-low/75 border border-outline-variant/40 px-4 py-2.5 space-y-2.5 text-xs text-on-surface-variant">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <MessageSquareWarning className="w-4 h-4 text-primary shrink-0" />
              <span>
                Translated by AI, so please tell us if something looks wrong.
              </span>
              {totalCount > 0 && (
                <span className="hidden sm:inline font-mono text-[11px] text-on-surface-variant/75 tabular-nums">
                  ({readyCount}/{totalCount} sections{activeCount > 0 ? ' · translating visible...' : ''})
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {reportSent ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary">
                  <Check className="w-3.5 h-3.5" />
                  Thanks for telling us!
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setReportOpen((prev) => !prev)}
                  className="text-xs font-medium text-primary hover:underline cursor-pointer whitespace-nowrap"
                >
                  {reportOpen ? 'Cancel' : 'Tell us'}
                </button>
              )}
              <button
                type="button"
                onClick={() => onChangeLanguage('en')}
                className="text-xs font-medium text-on-surface hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
              >
                Show English
              </button>
            </div>
          </div>

          {reportOpen && (
            <form onSubmit={handleSubmitReport} className="flex flex-wrap items-center gap-2 pt-1">
              <input
                type="text"
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Which word or sentence looked wrong?"
                aria-label="Describe what looked wrong in the translation"
                className="flex-1 min-w-[200px] px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/45 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={!reportText.trim()}
                className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-medium hover:bg-primary-container transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                Send note
              </button>
              <button
                type="button"
                onClick={() => setReportOpen(false)}
                aria-label="Close translation note form"
                className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
