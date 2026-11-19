import { ArrowRight, ArrowLeft, History, GitBranch, ChevronDown, FileText } from 'lucide-react';
import type { Lesson } from '../types/lesson';
import {
  SectionListenButton,
  SpeakableHighlight,
  SpeakableSegments,
} from './SectionListenButton';
import { SectionTranslationPill, useSectionShimmer } from './SectionTranslationPill';
import { splitCodeSegmentsIntoSentences, type SpeechUnit } from '../utils/speech';

interface HeroSectionProps {
  lesson: Lesson;
  lessonIndex: number;
  totalLessons: number;
  onBackToLessons: () => void;
  onStartStepOne: () => void;
  onJumpToVocabulary: () => void;
}

export function HeroSection({
  lesson,
  lessonIndex,
  totalLessons,
  onBackToLessons,
  onStartStepOne,
  onJumpToVocabulary,
}: HeroSectionProps) {
  const { heroMockup } = lesson;
  const sectionId = `${lesson.id}-hero`;
  const titleText = `${lesson.titleStart}${lesson.titleHighlight}${lesson.titleEnd}`;
  const isTranslatingHero = useSectionShimmer('hero');

  const buildHeroUnits = (): SpeechUnit[] => {
    const descSentences = splitCodeSegmentsIntoSentences(
      `${sectionId}-desc`,
      lesson.descriptionSegments
    );
    return [
      {
        id: `${sectionId}-title`,
        text: titleText,
        speechText: titleText,
      },
      ...descSentences.map((s) => ({
        id: s.id,
        text: s.speechText,
        speechText: s.speechText,
      })),
    ];
  };

  return (
    <section
      id="hero-overview"
      data-translate-section="hero"
      data-section-title="Lesson Overview"
      className={`w-full pb-12 sm:pb-16 pt-2 sm:pt-4 scroll-mt-24 ${
        isTranslatingHero ? 'translate-section-shimmer' : ''
      }`}
    >
      <div className="mb-6 flex items-center gap-3 text-xs text-on-surface-variant">
        <button
          type="button"
          onClick={onBackToLessons}
          className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All lessons</span>
        </button>
        <span aria-hidden="true">·</span>
        <span className="tabular-nums">
          Lesson {String(lessonIndex + 1).padStart(2, '0')} of{' '}
          {String(totalLessons).padStart(2, '0')}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Lesson Premise */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-8">
            <div className="text-[11px] font-semibold tracking-[0.12em] text-on-surface-variant/80 uppercase">
              {lesson.meta}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <SectionTranslationPill sectionId="hero" />
              <SectionListenButton
                sectionId={sectionId}
                sectionLabel="Lesson introduction"
                getUnits={buildHeroUnits}
              />
            </div>
          </div>

          <h1 className="text-[36px] leading-[1.14] sm:text-[44px] lg:text-[56px] lg:leading-[1.12] font-normal text-on-surface tracking-[-0.02em] mb-6 sm:mb-8 [text-wrap:balance]">
            <SpeakableHighlight sectionId={sectionId} unitId={`${sectionId}-title`}>
              {lesson.titleStart}
              <span className="font-medium text-primary">{lesson.titleHighlight}</span>
              {lesson.titleEnd}
            </SpeakableHighlight>
          </h1>

          <p className="text-[16px] sm:text-[17px] leading-[1.7] text-on-surface-variant max-w-[62ch] mb-8">
            <SpeakableSegments
              sectionId={sectionId}
              unitPrefix={`${sectionId}-desc`}
              segments={lesson.descriptionSegments}
            />
          </p>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <button
              type="button"
              onClick={onStartStepOne}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-primary-container text-on-primary text-[15px] font-medium shadow-sm hover:bg-primary transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lesson.primaryCtaLabel}
            </button>

            <button
              type="button"
              onClick={onJumpToVocabulary}
              className="inline-flex items-center gap-1.5 text-[15px] text-on-surface-variant hover:text-on-surface transition-colors group whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{lesson.secondaryCtaLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: GitHub Repository Overview Mockup */}
        <div className="lg:col-span-6 min-w-0">
          <div className="w-full rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] overflow-hidden">
            {/* Browser Bar */}
            <div className="bg-surface-container-high/60 border-b border-outline-variant/30 px-4 sm:px-5 py-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5 opacity-60 shrink-0" aria-hidden="true">
                <span className="w-2 h-2 rounded-full bg-outline" />
                <span className="w-2 h-2 rounded-full bg-outline" />
                <span className="w-2 h-2 rounded-full bg-outline" />
              </div>
              <div className="flex-1 min-w-0 max-w-sm mx-auto bg-surface-container-lowest/80 border border-outline-variant/30 px-3 py-1 rounded text-center">
                <span className="font-mono text-[11px] sm:text-[12px] text-on-surface-variant truncate block">
                  {heroMockup.url}
                </span>
              </div>
            </div>

            {/* Mockup Interior */}
            <div className="p-5 sm:p-8 bg-surface-container-lowest">
              {/* Repo Title + Visibility + Commits */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-surface-container-high">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 min-w-0 text-[17px] sm:text-[20px] leading-snug text-on-surface">
                  <span className="font-normal text-on-surface-variant/70 whitespace-nowrap">
                    {heroMockup.owner} /
                  </span>
                  <span className="font-medium whitespace-nowrap">{heroMockup.repoName}</span>
                  <span className="text-[11px] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded text-on-surface-variant border border-outline-variant/40 whitespace-nowrap shrink-0">
                    {heroMockup.visibility}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-on-surface-variant/80 font-mono text-xs whitespace-nowrap shrink-0">
                  <History className="w-3.5 h-3.5 shrink-0" />
                  <span>{heroMockup.commitCount}</span>
                </div>
              </div>

              {/* Toolbar: main branch + Add file */}
              <div className="flex items-center justify-between py-2.5 px-2.5 sm:px-3 rounded-lg bg-surface-container-low/70 border border-outline-variant/30 mb-6 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-lowest border border-outline-variant/30 font-mono text-xs text-on-surface whitespace-nowrap shrink-0">
                    <GitBranch className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span className="whitespace-nowrap">{heroMockup.branchName}</span>
                    <ChevronDown className="w-3 h-3 text-on-surface-variant shrink-0" />
                  </div>
                  <span className="font-mono text-xs text-on-surface-variant/80 whitespace-nowrap shrink-0">
                    {heroMockup.branchCount}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onStartStepOne}
                  className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-md bg-surface-container-lowest border border-outline-variant/50 text-on-surface text-xs font-medium hover:bg-surface-container-low transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span className="whitespace-nowrap">{heroMockup.addFileLabel}</span>
                  <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>

              {/* Existing file row if Lesson 2+ */}
              {heroMockup.existingFile && (
                <div className="rounded-lg border border-outline-variant/40 px-4 py-2.5 mb-4 flex items-center justify-between bg-surface-container-lowest text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span className="font-mono font-medium text-on-surface truncate">
                      {heroMockup.existingFile.name}
                    </span>
                  </div>
                  <span className="text-on-surface-variant truncate ml-3">
                    {heroMockup.existingFile.message}
                  </span>
                </div>
              )}

              {/* Repository Guidance Box */}
              <div className="rounded-lg border border-dashed border-outline-variant/60 px-5 py-8 sm:p-10 text-center flex flex-col items-center justify-center bg-surface-container-low/30">
                <FileText className="w-7 h-7 text-outline mb-3" strokeWidth={1.6} />
                <p className="text-[18px] font-medium text-on-surface mb-1.5">
                  {heroMockup.emptyTitle}
                </p>
                <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
                  {heroMockup.emptyDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
