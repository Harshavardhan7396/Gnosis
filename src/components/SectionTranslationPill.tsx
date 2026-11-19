import { Languages, RotateCcw } from 'lucide-react';
import { useLessonTranslation } from '../context/LessonTranslationContext';

interface SectionTranslationPillProps {
  sectionId: string;
  compact?: boolean;
  className?: string;
}

export function useSectionShimmer(sectionId: string): boolean {
  const { language, getSectionStatus, isSectionShowingEnglish } = useLessonTranslation();
  if (language === 'en' || isSectionShowingEnglish(sectionId)) return false;
  const status = getSectionStatus(sectionId);
  return status === 'queued' || status === 'streaming';
}

export function SectionTranslationPill({
  sectionId,
  compact = false,
  className = '',
}: SectionTranslationPillProps) {
  const {
    language,
    languageLabel,
    getSectionStatus,
    getSectionError,
    isSectionShowingEnglish,
    toggleSectionEnglish,
    retrySection,
  } = useLessonTranslation();

  if (language === 'en') {
    return null;
  }

  const status = getSectionStatus(sectionId);
  const showingEnglish = isSectionShowingEnglish(sectionId);
  const error = getSectionError(sectionId);

  if (status === 'error' && !showingEnglish) {
    return (
      <button
        type="button"
        onClick={() => retrySection(sectionId)}
        title={error || 'Translation failed'}
        className={`no-print inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-primary/40 bg-primary-fixed/25 text-primary text-[11px] font-medium hover:bg-primary-fixed/40 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${className}`}
      >
        <RotateCcw className="w-3 h-3 shrink-0" />
        <span>Retry {languageLabel}</span>
      </button>
    );
  }

  if ((status === 'queued' || status === 'streaming') && !showingEnglish) {
    return (
      <span
        className={`no-print inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-outline-variant/45 bg-surface-container-low text-on-surface-variant text-[11px] font-medium relative overflow-hidden whitespace-nowrap shrink-0 ${className}`}
        aria-live="polite"
      >
        <span className="absolute inset-0 translate-shimmer-bar pointer-events-none" aria-hidden="true" />
        <Languages className="w-3 h-3 text-primary relative z-10 shrink-0" />
        <span className="relative z-10">
          {compact ? 'Translating...' : `Translating to ${languageLabel}...`}
        </span>
      </span>
    );
  }

  if (status === 'ready' || showingEnglish) {
    return (
      <button
        type="button"
        onClick={() => toggleSectionEnglish(sectionId)}
        aria-pressed={showingEnglish}
        className={`no-print inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
          showingEnglish
            ? 'border-primary/45 bg-primary-fixed/25 text-primary hover:bg-primary-fixed/40'
            : 'border-outline-variant/45 bg-surface-container-low/70 text-on-surface-variant hover:text-on-surface hover:border-outline-variant'
        } ${className}`}
      >
        <Languages className="w-3 h-3 shrink-0" />
        <span>{showingEnglish ? `Show ${languageLabel}` : 'Show English'}</span>
      </button>
    );
  }

  return null;
}
