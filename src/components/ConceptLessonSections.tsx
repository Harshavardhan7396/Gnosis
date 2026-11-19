import { useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  GitBranch,
  GitMerge,
  GitPullRequest,
  History,
  Menu,
  Search,
  User,
  FileText,
  Lock,
} from 'lucide-react';
import type { ConceptLessonContent } from '../types/lesson';
import { AskAboutButton } from './AskAboutButton';
import { SectionFeedbackWidget } from './SectionFeedbackWidget';
import {
  SectionListenButton,
  SpeakableHighlight,
  SpeakableText,
} from './SectionListenButton';
import { SectionTranslationPill, useSectionShimmer } from './SectionTranslationPill';
import { ScreenshotFrame } from './ScreenshotFrame';
import { useSpeech } from '../context/SpeechContext';
import {
  buildSentenceUnits,
  sanitizeTextForSpeech,
  type SpeechUnit,
} from '../utils/speech';

interface ConceptLessonSectionsProps {
  lessonId?: string;
  lessonTitle?: string;
  concept: ConceptLessonContent;
  onSectionInteracted: (progressStepId: string) => void;
}

function WhereToFindMockup({
  whereToFind,
  activeMarker,
  onSelectMarker,
}: {
  whereToFind: ConceptLessonContent['whereToFind'];
  activeMarker: number;
  onSelectMarker: (num: number) => void;
}) {
  const renderMarkerPin = (num: number, x: number, y: number) => {
    const isActive = activeMarker === num;
    return (
      <button
        key={num}
        type="button"
        onClick={() => onSelectMarker(num)}
        style={{ left: `${x}%`, top: `${y}%` }}
        aria-label={`Marker ${num}`}
        className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full font-mono text-xs font-semibold flex items-center justify-center transition-all shadow-sm cursor-pointer z-10 ${
          isActive
            ? 'bg-primary text-on-primary ring-4 ring-primary/25 scale-110'
            : 'bg-surface-container-lowest text-primary border-2 border-primary hover:bg-primary-fixed'
        }`}
      >
        {num}
      </button>
    );
  };

  return (
    <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/45 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] overflow-hidden">
      {/* Browser Bar */}
      <div className="bg-surface-container-high/60 border-b border-outline-variant/30 px-4 sm:px-5 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1.5 opacity-60 shrink-0" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
        </div>
        <div className="flex-1 max-w-xs mx-auto bg-surface-container-lowest/85 border border-outline-variant/30 px-3 py-1 rounded text-center">
          <span className="font-mono text-[11px] text-on-surface-variant truncate block">
            {whereToFind.windowUrl}
          </span>
        </div>
      </div>

      {/* Screen Canvas with Numbered Markers */}
      <div
        className={`relative bg-surface-container-low/30 select-none overflow-hidden ${
          whereToFind.screenType === 'pull-request-flow'
            ? 'h-80 sm:h-[340px] p-3 sm:p-4'
            : 'h-64 sm:h-72 p-4 sm:p-6'
        }`}
      >
        {whereToFind.screenType === 'github-home' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-on-surface" />
                <span className="text-xs font-semibold text-on-surface">GitHub</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-on-surface-variant">Sign in</span>
                <span className="px-2.5 py-1 rounded bg-on-surface text-surface text-[11px] font-medium">
                  Sign up
                </span>
              </div>
            </div>
            <div className="my-auto rounded-lg bg-surface-container-low/60 border border-outline-variant/30 p-4 text-center">
              <p className="text-xs font-medium text-on-surface mb-1">alex-dev / class-essay</p>
              <p className="text-[11px] text-on-surface-variant">
                Every saved draft kept neatly in one place online.
              </p>
            </div>
          </div>
        )}

        {whereToFind.screenType === 'signup-form' && (
          <div className="h-full max-w-xs mx-auto rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-4 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="h-8 rounded border border-outline-variant/40 bg-surface-container-low/40 px-3 flex items-center text-[11px] font-mono text-on-surface-variant">
                alex@example.com
              </div>
              <div className="h-8 rounded border border-outline-variant/40 bg-surface-container-low/40 px-3 flex items-center text-[11px] font-mono text-on-surface-variant">
                ••••••••••••
              </div>
              <div className="h-8 rounded border border-outline-variant/40 bg-surface-container-low/40 px-3 flex items-center text-[11px] font-mono text-on-surface">
                alex-dev
              </div>
            </div>
            <div className="h-8 rounded-lg bg-secondary text-on-secondary text-xs font-medium flex items-center justify-center">
              Create account
            </div>
          </div>
        )}

        {whereToFind.screenType === 'dashboard' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 flex flex-col overflow-hidden">
            <div className="px-3 py-2.5 border-b border-surface-container-high flex items-center justify-between gap-2 bg-surface-container-low/40">
              <div className="flex items-center gap-2">
                <Menu className="w-4 h-4 text-on-surface" />
                <span className="text-xs font-semibold text-on-surface">Dashboard</span>
              </div>
              <div className="flex-1 max-w-[160px] px-2.5 py-1 rounded bg-surface-container-lowest border border-outline-variant/35 flex items-center gap-1.5 text-[11px] text-on-surface-variant">
                <Search className="w-3 h-3" />
                <span className="truncate">Type / to search</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center">
                <User className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-12">
              <div className="col-span-5 border-r border-surface-container-high p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-on-surface">Top repos</span>
                  <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary text-[10px] font-medium">
                    New
                  </span>
                </div>
                <div className="text-[11px] font-mono text-on-surface-variant truncate">
                  alex-dev/notes
                </div>
              </div>
              <div className="col-span-7 p-3 text-[11px] text-on-surface-variant flex items-center justify-center text-center">
                Home activity feed
              </div>
            </div>
          </div>
        )}

        {whereToFind.screenType === 'repo-page' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-3.5 flex flex-col justify-between">
            <div className="flex items-center gap-2 pb-2.5 border-b border-surface-container-high">
              <span className="text-xs font-medium text-on-surface">alex-dev / my-first-project</span>
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-outline-variant/40 text-on-surface-variant">
                Public
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-on-surface border-b border-surface-container-high pb-2">
              <span className="font-medium border-b-2 border-primary pb-0.5">&lt;&gt; Code</span>
              <span className="text-on-surface-variant">Issues</span>
              <span className="text-on-surface-variant">Settings</span>
            </div>
            <div className="rounded border border-outline-variant/35 divide-y divide-outline-variant/25 text-[11px] font-mono">
              <div className="px-3 py-2 flex items-center gap-2 text-on-surface">
                <FileText className="w-3.5 h-3.5 text-secondary" />
                <span>README.md</span>
              </div>
              <div className="px-3 py-2 flex items-center gap-2 text-on-surface-variant">
                <FileText className="w-3.5 h-3.5 text-outline" />
                <span>notes.txt</span>
              </div>
            </div>
          </div>
        )}

        {whereToFind.screenType === 'commit-history' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2.5 border-b border-surface-container-high text-xs">
              <span className="inline-flex items-center gap-1.5 font-mono text-on-surface">
                <GitBranch className="w-3.5 h-3.5 text-secondary" />
                <span>main</span>
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-on-surface-variant">
                <History className="w-3.5 h-3.5" />
                <span>3 commits</span>
              </span>
            </div>
            <div className="rounded border border-outline-variant/35 divide-y divide-outline-variant/25 text-[11px]">
              <div className="px-3 py-2.5 flex items-center justify-between gap-2 bg-surface-container-low/40">
                <span className="font-medium text-on-surface truncate">Fix spelling typo</span>
                <span className="font-mono text-on-surface-variant shrink-0">10m ago</span>
              </div>
              <div className="px-3 py-2.5 flex items-center justify-between gap-2">
                <span className="text-on-surface-variant truncate">Add project goals</span>
                <span className="font-mono text-on-surface-variant shrink-0">2h ago</span>
              </div>
              <div className="px-3 py-2.5 flex items-center justify-between gap-2">
                <span className="text-on-surface-variant truncate">Create README.md</span>
                <span className="font-mono text-on-surface-variant shrink-0">yesterday</span>
              </div>
            </div>
          </div>
        )}

        {whereToFind.screenType === 'pull-request-flow' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-2.5 sm:p-3 flex flex-col justify-between gap-2 text-[10px]">
            {/* Top Bar: branch + Pull requests tab + New pull request */}
            <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-surface-container-high">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-outline-variant/45 bg-surface-container-low font-mono text-on-surface shrink-0">
                <GitBranch className="w-3 h-3 text-secondary" />
                <span>my-experiment</span>
              </span>
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-flex items-center gap-1 font-medium text-primary border-b-2 border-primary pb-0.5 whitespace-nowrap">
                  <GitPullRequest className="w-3 h-3" />
                  <span>Pull requests</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-secondary text-on-secondary font-medium whitespace-nowrap">
                  New pull request
                </span>
              </div>
            </div>

            {/* Banner with Compare & pull request */}
            <div className="rounded border border-outline-variant/40 bg-surface-container-low/65 px-2.5 py-1.5 flex items-center justify-between gap-2">
              <span className="text-on-surface-variant truncate">
                <span className="font-mono text-on-surface">my-experiment</span> had recent commits
              </span>
              <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-medium whitespace-nowrap shrink-0">
                Compare &amp; pull request
              </span>
            </div>

            {/* Base & Compare branch boxes */}
            <div className="rounded border border-outline-variant/35 bg-surface-container-low/35 px-2.5 py-1.5 flex items-center justify-center gap-1.5 font-mono">
              <span className="px-2 py-0.5 rounded border border-outline-variant/45 bg-surface-container-lowest text-on-surface">
                base: main
              </span>
              <span className="text-on-surface-variant">←</span>
              <span className="px-2 py-0.5 rounded border border-primary/45 bg-primary-fixed/20 text-primary font-medium">
                compare: my-experiment
              </span>
            </div>

            {/* Split bottom: Title/Description + Create PR | Diff + Merge PR */}
            <div className="grid grid-cols-12 gap-2 flex-1 min-h-0">
              <div className="col-span-6 rounded border border-outline-variant/35 p-2 flex flex-col justify-between bg-surface-container-low/20">
                <div className="space-y-1">
                  <div className="px-2 py-1 rounded border border-outline-variant/40 bg-surface-container-lowest text-on-surface font-medium truncate">
                    Update first paragraph
                  </div>
                  <div className="px-2 py-1 rounded border border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant truncate">
                    Made the opening clearer for readers.
                  </div>
                </div>
                <div className="pt-1">
                  <span className="inline-block px-2.5 py-1 rounded bg-secondary text-on-secondary font-medium">
                    Create pull request
                  </span>
                </div>
              </div>

              <div className="col-span-6 rounded border border-outline-variant/35 p-2 flex flex-col justify-between bg-surface-container-low/20">
                <div className="space-y-1 font-mono text-[9px] sm:text-[10px]">
                  <div className="px-1.5 py-0.5 rounded bg-secondary-container/45 text-secondary truncate">
                    + Clearer intro paragraph.
                  </div>
                  <div className="px-1.5 py-0.5 rounded bg-primary-fixed/35 text-primary truncate">
                    - Old draft sentence.
                  </div>
                </div>
                <div className="pt-1 flex justify-end">
                  <span className="inline-block px-2.5 py-1 rounded bg-secondary text-on-secondary font-medium">
                    Merge pull request
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {whereToFind.markers.map((marker) =>
          renderMarkerPin(marker.number, marker.xPercent, marker.yPercent)
        )}
      </div>
    </div>
  );
}

export function ConceptLessonSections({
  lessonId = 'lesson',
  lessonTitle = 'Lesson',
  concept,
  onSectionInteracted,
}: ConceptLessonSectionsProps) {
  const [activeMarker, setActiveMarker] = useState<number>(
    concept.whereToFind.markers[0]?.number ?? 1
  );

  const storyAndMeaningText = [
    concept.story.title,
    ...concept.story.paragraphs,
    `${concept.oneLineMeaning.term}: ${concept.oneLineMeaning.meaning}`,
    concept.oneLineMeaning.extraTerm && concept.oneLineMeaning.extraMeaning
      ? `${concept.oneLineMeaning.extraTerm}: ${concept.oneLineMeaning.extraMeaning}`
      : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  const diagramText = [
    concept.diagram.title,
    concept.diagram.subtitle,
    ...concept.diagram.nodes.map(
      (n, idx) => `${idx + 1}. ${n.label}${n.sublabel ? ` — ${n.sublabel}` : ''}`
    ),
    concept.diagram.caption,
  ].join('\n');

  const whereText = [
    concept.whereToFind.title,
    concept.whereToFind.subtitle,
    ...concept.whereToFind.markers.map((m) => `${m.number}. ${m.label}: ${m.description}`),
  ].join('\n');

  const { activeSectionId, activeUnitId } = useSpeech();

  const storySectionId = `${lessonId}-story`;
  const meaningSectionId = `${lessonId}-meaning`;
  const diagramSectionId = `${lessonId}-diagram`;
  const whereSectionId = `${lessonId}-where`;
  const afterMergingSectionId = `${lessonId}-after-merging`;
  const mistakeSectionId = `${lessonId}-mistake`;

  const isTranslatingStory = useSectionShimmer('story');
  const isTranslatingMeaning = useSectionShimmer('meaning');
  const isTranslatingDiagram = useSectionShimmer('diagram');
  const isTranslatingWhere = useSectionShimmer('where');
  const isTranslatingAfterMerging = useSectionShimmer('afterMerging');
  const isTranslatingMistake = useSectionShimmer('mistake');

  const buildStoryUnits = (): SpeechUnit[] => [
    {
      id: `${storySectionId}-title`,
      text: concept.story.title,
      speechText: sanitizeTextForSpeech(concept.story.title),
    },
    ...concept.story.paragraphs.flatMap((paragraph, idx) =>
      buildSentenceUnits(`${storySectionId}-p${idx}`, paragraph)
    ),
  ];

  const buildMeaningUnits = (): SpeechUnit[] => {
    const units: SpeechUnit[] = [
      {
        id: `${meaningSectionId}-term`,
        text: concept.oneLineMeaning.term,
        speechText: sanitizeTextForSpeech(concept.oneLineMeaning.term),
      },
      ...buildSentenceUnits(`${meaningSectionId}-body`, concept.oneLineMeaning.meaning),
    ];
    if (concept.oneLineMeaning.extraTerm && concept.oneLineMeaning.extraMeaning) {
      units.push(
        {
          id: `${meaningSectionId}-extra-term`,
          text: concept.oneLineMeaning.extraTerm,
          speechText: sanitizeTextForSpeech(concept.oneLineMeaning.extraTerm),
        },
        ...buildSentenceUnits(`${meaningSectionId}-extra-body`, concept.oneLineMeaning.extraMeaning)
      );
    }
    return units;
  };

  const buildDiagramUnits = (): SpeechUnit[] => {
    const units: SpeechUnit[] = [
      {
        id: `${diagramSectionId}-title`,
        text: concept.diagram.title,
        speechText: sanitizeTextForSpeech(concept.diagram.title),
      },
      ...buildSentenceUnits(`${diagramSectionId}-sub`, concept.diagram.subtitle),
    ];

    if (concept.diagram.variant === 'git-timeline') {
      units.push({
        id: `${diagramSectionId}-code`,
        text: 'Without Git code example',
        speechText: 'Without Git: code example.',
        isCodeBlock: true,
      });
    }

    concept.diagram.nodes.forEach((node, index) => {
      units.push({
        id: `${diagramSectionId}-node-${index}`,
        text: `${node.label}${node.sublabel ? ` — ${node.sublabel}` : ''}`,
        speechText: `${index + 1}. ${sanitizeTextForSpeech(node.label)}. ${
          node.sublabel ? sanitizeTextForSpeech(node.sublabel) : ''
        }`.trim(),
      });
    });

    units.push(...buildSentenceUnits(`${diagramSectionId}-cap`, concept.diagram.caption));
    return units;
  };

  const buildWhereUnits = (): SpeechUnit[] => {
    const units: SpeechUnit[] = [
      {
        id: `${whereSectionId}-title`,
        text: concept.whereToFind.title,
        speechText: sanitizeTextForSpeech(concept.whereToFind.title),
      },
      ...buildSentenceUnits(`${whereSectionId}-sub`, concept.whereToFind.subtitle),
    ];

    concept.whereToFind.markers.forEach((marker) => {
      units.push(
        {
          id: `${whereSectionId}-m-${marker.number}-label`,
          text: marker.label,
          speechText: `Marker ${marker.number}: ${sanitizeTextForSpeech(marker.label)}.`,
        },
        ...buildSentenceUnits(`${whereSectionId}-m-${marker.number}-desc`, marker.description)
      );
    });

    return units;
  };

  const buildAfterMergingUnits = (): SpeechUnit[] => {
    if (!concept.afterMerging) return [];
    return [
      {
        id: `${afterMergingSectionId}-title`,
        text: concept.afterMerging.title,
        speechText: sanitizeTextForSpeech(concept.afterMerging.title),
      },
      ...buildSentenceUnits(`${afterMergingSectionId}-body`, concept.afterMerging.text),
    ];
  };

  const buildMistakeUnits = (): SpeechUnit[] => [
    {
      id: `${mistakeSectionId}-title`,
      text: concept.commonMistake.title,
      speechText: sanitizeTextForSpeech(concept.commonMistake.title),
    },
    ...buildSentenceUnits(`${mistakeSectionId}-body`, concept.commonMistake.text),
  ];

  const isCodeStripActive =
    activeSectionId === diagramSectionId && activeUnitId === `${diagramSectionId}-code`;

  return (
    <div className="flex flex-col gap-16 sm:gap-24 py-8 sm:py-12">
      {/* 1. Real-life story + One-line meaning */}
      <section
        id="concept-story"
        data-translate-section="story"
        data-section-title={concept.story.title}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start scroll-mt-24"
      >
        <div
          className={`lg:col-span-7 space-y-5 rounded-xl ${
            isTranslatingStory ? 'translate-section-shimmer' : ''
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <span className="text-xs tracking-[0.12em] text-primary font-semibold uppercase">
              {concept.story.eyebrow}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <SectionTranslationPill sectionId="story" />
              <SectionListenButton
                sectionId={storySectionId}
                sectionLabel={concept.story.title}
                getUnits={buildStoryUnits}
              />
              <AskAboutButton
                sectionId={`${lessonId}-story`}
                topic={concept.story.title}
                sectionText={storyAndMeaningText}
              />
            </div>
          </div>
          <h2 className="text-[28px] sm:text-[34px] leading-[1.24] font-normal text-on-surface tracking-[-0.015em]">
            <SpeakableHighlight sectionId={storySectionId} unitId={`${storySectionId}-title`}>
              {concept.story.title}
            </SpeakableHighlight>
          </h2>
          <div className="space-y-4 max-w-[62ch]">
            {concept.story.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-[16px] sm:text-[17px] leading-[1.7] text-on-surface-variant"
              >
                <SpeakableText
                  sectionId={storySectionId}
                  unitPrefix={`${storySectionId}-p${idx}`}
                  text={paragraph}
                />
              </p>
            ))}
          </div>
          <SectionFeedbackWidget
            lessonId={lessonId}
            lessonTitle={lessonTitle}
            sectionId="story"
            sectionTitle={concept.story.title}
          />
        </div>

        {/* 2. One-line meaning card */}
        <div
          id="concept-meaning"
          data-translate-section="meaning"
          data-section-title={concept.oneLineMeaning.term}
          className={`lg:col-span-5 rounded-xl bg-surface-container-lowest border border-outline-variant/45 p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] space-y-5 scroll-mt-24 ${
            isTranslatingMeaning ? 'translate-section-shimmer' : ''
          }`}
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs tracking-[0.12em] text-primary font-semibold uppercase">
                {concept.oneLineMeaning.eyebrow}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <SectionTranslationPill sectionId="meaning" compact />
                <SectionListenButton
                  sectionId={meaningSectionId}
                  sectionLabel={concept.oneLineMeaning.term}
                  getUnits={buildMeaningUnits}
                />
                <AskAboutButton
                  sectionId={`${lessonId}-meaning`}
                  topic={concept.oneLineMeaning.term}
                  sectionText={storyAndMeaningText}
                />
              </div>
            </div>
            <h3 className="text-xl font-medium text-on-surface mb-2">
              <SpeakableHighlight
                sectionId={meaningSectionId}
                unitId={`${meaningSectionId}-term`}
              >
                {concept.oneLineMeaning.term}
              </SpeakableHighlight>
            </h3>
            <p className="text-sm sm:text-[15px] text-on-surface-variant leading-relaxed">
              <SpeakableText
                sectionId={meaningSectionId}
                unitPrefix={`${meaningSectionId}-body`}
                text={concept.oneLineMeaning.meaning}
              />
            </p>
          </div>

          {concept.oneLineMeaning.extraTerm && concept.oneLineMeaning.extraMeaning && (
            <div className="pt-4 border-t border-outline-variant/30">
              <h4 className="text-base font-medium text-on-surface mb-1.5">
                <SpeakableHighlight
                  sectionId={meaningSectionId}
                  unitId={`${meaningSectionId}-extra-term`}
                >
                  {concept.oneLineMeaning.extraTerm}
                </SpeakableHighlight>
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                <SpeakableText
                  sectionId={meaningSectionId}
                  unitPrefix={`${meaningSectionId}-extra-body`}
                  text={concept.oneLineMeaning.extraMeaning}
                />
              </p>
            </div>
          )}
          <SectionFeedbackWidget
            lessonId={lessonId}
            lessonTitle={lessonTitle}
            sectionId="meaning"
            sectionTitle={concept.oneLineMeaning.term}
            className="!mt-4"
          />
        </div>
      </section>

      {/* 3. Simple labeled diagram */}
      <section
        id="concept-diagram"
        data-translate-section="diagram"
        data-section-title={concept.diagram.title}
        className={`w-full scroll-mt-24 ${isTranslatingDiagram ? 'translate-section-shimmer' : ''}`}
      >
        <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/45 p-6 sm:p-8 lg:p-12 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <span className="text-xs tracking-[0.12em] text-primary font-semibold uppercase mb-2 block">
                {concept.diagram.eyebrow}
              </span>
              <h2 className="text-[26px] sm:text-[32px] leading-[1.24] font-normal text-on-surface tracking-[-0.015em] mb-2">
                <SpeakableHighlight
                  sectionId={diagramSectionId}
                  unitId={`${diagramSectionId}-title`}
                >
                  {concept.diagram.title}
                </SpeakableHighlight>
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                <SpeakableText
                  sectionId={diagramSectionId}
                  unitPrefix={`${diagramSectionId}-sub`}
                  text={concept.diagram.subtitle}
                />
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start">
              <SectionTranslationPill sectionId="diagram" />
              <SectionListenButton
                sectionId={diagramSectionId}
                sectionLabel={concept.diagram.title}
                getUnits={buildDiagramUnits}
              />
              <AskAboutButton
                sectionId={`${lessonId}-diagram`}
                topic={concept.diagram.title}
                sectionText={diagramText}
              />
            </div>
          </div>

          {concept.diagram.variant === 'git-timeline' && (
            <div
              className={`mb-6 p-4 rounded-lg border text-xs text-on-surface-variant flex flex-wrap items-center gap-2 transition-colors ${
                isCodeStripActive
                  ? 'bg-primary-fixed/30 border-primary/50 ring-2 ring-primary/25'
                  : 'bg-surface-container-low/50 border-outline-variant/30'
              }`}
            >
              <span className="font-semibold text-primary">Without Git:</span>
              <code className="font-mono px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/30">
                essay_final.docx
              </code>
              <code className="font-mono px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/30">
                essay_final_v2.docx
              </code>
              <code className="font-mono px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/30">
                essay_REAL_final.docx
              </code>
            </div>
          )}

          {concept.diagram.variant === 'pull-request-flow' && (
            <div className="mb-6 rounded-xl border border-outline-variant/40 bg-surface-container-low/45 p-4 sm:p-6 overflow-x-auto">
              <svg
                viewBox="0 0 680 185"
                className="w-full min-w-[460px] h-auto"
                role="img"
                aria-label="Diagram showing main branch, my-experiment branch splitting off, and a curved pull request arrow merging back into main"
              >
                <defs>
                  <marker
                    id="pr-arrow-head"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0,1 L7,4 L0,7 z" className="fill-primary" />
                  </marker>
                </defs>

                {/* Main branch long horizontal line */}
                <line
                  x1="36"
                  y1="48"
                  x2="644"
                  y2="48"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-on-surface/75"
                />
                <circle cx="56" cy="48" r="6" className="fill-on-surface" />
                <circle cx="170" cy="48" r="6" className="fill-on-surface" />
                <circle cx="560" cy="48" r="7.5" className="fill-secondary" />
                <circle cx="628" cy="48" r="6" className="fill-on-surface" />

                {/* Main label */}
                <rect
                  x="32"
                  y="14"
                  width="64"
                  height="22"
                  rx="6"
                  className="fill-surface-container-lowest stroke-outline-variant"
                  strokeWidth="1"
                />
                <text
                  x="64"
                  y="29"
                  textAnchor="middle"
                  className="fill-on-surface font-mono text-[12px] font-semibold"
                >
                  main
                </text>

                {/* Smaller branch line splitting off from main */}
                <path
                  d="M 170 48 C 205 48, 210 132, 245 132 L 420 132"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-primary"
                />
                <circle cx="275" cy="132" r="6" className="fill-primary" />
                <circle cx="385" cy="132" r="6" className="fill-primary" />

                {/* my-experiment label */}
                <rect
                  x="225"
                  y="148"
                  width="126"
                  height="24"
                  rx="6"
                  className="fill-surface-container-lowest stroke-primary/50"
                  strokeWidth="1"
                />
                <text
                  x="288"
                  y="164"
                  textAnchor="middle"
                  className="fill-primary font-mono text-[11.5px] font-semibold"
                >
                  my-experiment
                </text>

                {/* Curved arrow from my-experiment back to main */}
                <path
                  d="M 420 132 C 485 132, 495 62, 548 51"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  markerEnd="url(#pr-arrow-head)"
                  className="text-primary"
                />

                {/* Pull request callout pill on arrow */}
                <rect
                  x="398"
                  y="74"
                  width="216"
                  height="24"
                  rx="6"
                  className="fill-surface-container-lowest stroke-primary/60"
                  strokeWidth="1"
                />
                <text
                  x="506"
                  y="90"
                  textAnchor="middle"
                  className="fill-primary text-[11.5px] font-semibold"
                >
                  Pull request: please merge this
                </text>
              </svg>
            </div>
          )}

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              concept.diagram.nodes.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            } gap-4 items-stretch`}
          >
            {concept.diagram.nodes.map((node, index) => {
              const isNodeActive =
                activeSectionId === diagramSectionId &&
                activeUnitId === `${diagramSectionId}-node-${index}`;
              const toneClasses = isNodeActive
                ? 'border-primary/70 bg-primary-fixed/35 ring-2 ring-primary/25'
                : node.tone === 'primary'
                  ? 'border-primary/45 bg-primary-fixed/20'
                  : node.tone === 'secondary'
                    ? 'border-secondary/45 bg-secondary-container/25'
                    : 'border-outline-variant/45 bg-surface-container-low/45';

              return (
                <div
                  key={node.label}
                  className={`rounded-xl border p-4 sm:p-5 flex flex-col justify-between relative transition-colors ${toneClasses}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[11px] font-semibold text-on-surface-variant/80">
                      0{index + 1}
                    </span>
                    {node.label.toLowerCase().includes('visibility') && (
                      <Lock className="w-3.5 h-3.5 text-on-surface-variant" />
                    )}
                  </div>
                  <div>
                    <p className="text-base font-medium text-on-surface mb-1">{node.label}</p>
                    {node.sublabel && (
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {node.sublabel}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 pt-5 border-t border-outline-variant/25 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            <SpeakableText
              sectionId={diagramSectionId}
              unitPrefix={`${diagramSectionId}-cap`}
              text={concept.diagram.caption}
            />
          </p>
          <SectionFeedbackWidget
            lessonId={lessonId}
            lessonTitle={lessonTitle}
            sectionId="diagram"
            sectionTitle={concept.diagram.title}
          />
        </div>
      </section>

      {/* 4. "Where to find it" screen with numbered markers */}
      <section
        id="concept-where"
        data-translate-section="where"
        data-section-title={concept.whereToFind.title}
        className={`scroll-mt-24 ${
          concept.whereToFind.screenshots && concept.whereToFind.screenshots.length > 0
            ? 'space-y-8'
            : 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'
        } ${isTranslatingWhere ? 'translate-section-shimmer' : ''}`}
      >
        {concept.whereToFind.screenshots && concept.whereToFind.screenshots.length > 0 ? (
          <>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <span className="text-xs tracking-[0.12em] text-primary font-semibold uppercase">
                  {concept.whereToFind.eyebrow}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <SectionTranslationPill sectionId="where" />
                  <SectionListenButton
                    sectionId={whereSectionId}
                    sectionLabel={concept.whereToFind.title}
                    getUnits={buildWhereUnits}
                  />
                  <AskAboutButton
                    sectionId={`${lessonId}-where`}
                    topic={concept.whereToFind.title}
                    sectionText={whereText}
                  />
                </div>
              </div>
              <h2 className="text-[26px] sm:text-[32px] leading-[1.24] font-normal text-on-surface tracking-[-0.015em]">
                <SpeakableHighlight
                  sectionId={whereSectionId}
                  unitId={`${whereSectionId}-title`}
                >
                  {concept.whereToFind.title}
                </SpeakableHighlight>
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-[65ch]">
                <SpeakableText
                  sectionId={whereSectionId}
                  unitPrefix={`${whereSectionId}-sub`}
                  text={concept.whereToFind.subtitle}
                  withExplain={false}
                />
              </p>
            </div>

            <div className="space-y-10">
              {concept.whereToFind.screenshots.map((shot) => (
                <div
                  key={shot.id || shot.src}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
                >
                  <div
                    className="lg:col-span-7"
                    onClick={() => onSectionInteracted('where')}
                  >
                    {shot.title && (
                      <h3 className="text-lg font-medium text-on-surface mb-3">
                        {shot.title}
                      </h3>
                    )}
                    <ScreenshotFrame
                      src={shot.src}
                      alt={shot.alt}
                      caption={shot.caption}
                      markers={shot.markers}
                    />
                  </div>

                  <div className="lg:col-span-5 space-y-2.5">
                    {shot.markers.map((marker) => (
                      <div
                        key={marker.n}
                        className="rounded-xl p-3.5 border bg-surface-container-low/40 border-outline-variant/35 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                          {marker.n}
                        </span>
                        <p className="text-xs sm:text-[13px] text-on-surface leading-relaxed">
                          {marker.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <SectionFeedbackWidget
              lessonId={lessonId}
              lessonTitle={lessonTitle}
              sectionId="where"
              sectionTitle={concept.whereToFind.title}
            />
          </>
        ) : (
          <>
            <div className="lg:col-span-6">
              <WhereToFindMockup
                whereToFind={concept.whereToFind}
                activeMarker={activeMarker}
                onSelectMarker={(num) => {
                  setActiveMarker(num);
                  onSectionInteracted('where');
                }}
              />
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2">
                  <span className="text-xs tracking-[0.12em] text-primary font-semibold uppercase">
                    {concept.whereToFind.eyebrow}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <SectionTranslationPill sectionId="where" />
                    <SectionListenButton
                      sectionId={whereSectionId}
                      sectionLabel={concept.whereToFind.title}
                      getUnits={buildWhereUnits}
                    />
                    <AskAboutButton
                      sectionId={`${lessonId}-where`}
                      topic={concept.whereToFind.title}
                      sectionText={whereText}
                    />
                  </div>
                </div>
                <h2 className="text-[26px] sm:text-[32px] leading-[1.24] font-normal text-on-surface tracking-[-0.015em] mb-2">
                  <SpeakableHighlight
                    sectionId={whereSectionId}
                    unitId={`${whereSectionId}-title`}
                  >
                    {concept.whereToFind.title}
                  </SpeakableHighlight>
                </h2>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  <SpeakableText
                    sectionId={whereSectionId}
                    unitPrefix={`${whereSectionId}-sub`}
                    text={concept.whereToFind.subtitle}
                    withExplain={false}
                  />
                </p>
              </div>

              <div className="space-y-3">
                {concept.whereToFind.markers.map((marker) => {
                  const isSelected = activeMarker === marker.number;
                  return (
                    <div
                      key={marker.number}
                      className={`w-full text-left rounded-xl p-4 border flex items-start gap-3.5 transition-colors ${
                        isSelected
                          ? 'bg-surface-container-lowest border-primary/50 shadow-xs'
                          : 'bg-surface-container-low/40 border-outline-variant/35 hover:bg-surface-container-lowest/80'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMarker(marker.number);
                          onSectionInteracted('where');
                        }}
                        className={`w-6 h-6 rounded-full font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-lowest border border-primary/50 text-primary hover:bg-primary-fixed'
                        }`}
                        aria-label={`Highlight marker ${marker.number}: ${marker.label}`}
                      >
                        {marker.number}
                      </button>
                      <div className="min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMarker(marker.number);
                            onSectionInteracted('where');
                          }}
                          className="text-left text-sm font-medium text-on-surface hover:text-primary transition-colors block mb-1 cursor-pointer"
                        >
                          <SpeakableHighlight
                            sectionId={whereSectionId}
                            unitId={`${whereSectionId}-m-${marker.number}-label`}
                          >
                            {marker.label}
                          </SpeakableHighlight>
                        </button>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          <SpeakableText
                            sectionId={whereSectionId}
                            unitPrefix={`${whereSectionId}-m-${marker.number}-desc`}
                            text={marker.description}
                          />
                        </p>
                        {marker.screenshot && (
                          <div
                            className="mt-3.5"
                            onClick={() => {
                              setActiveMarker(marker.number);
                              onSectionInteracted('where');
                            }}
                          >
                            <ScreenshotFrame
                              src={marker.screenshot.src}
                              alt={marker.screenshot.alt}
                              caption={marker.screenshot.caption}
                              markers={marker.screenshot.markers}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <SectionFeedbackWidget
                lessonId={lessonId}
                lessonTitle={lessonTitle}
                sectionId="where"
                sectionTitle={concept.whereToFind.title}
              />
            </div>
          </>
        )}
      </section>

      {/* 4b. After merging (optional concept callout) */}
      {concept.afterMerging && (
        <section
          id="concept-after-merging"
          data-translate-section="afterMerging"
          data-section-title={concept.afterMerging.title}
          className={`w-full scroll-mt-24 ${isTranslatingAfterMerging ? 'translate-section-shimmer' : ''}`}
        >
          <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/45 p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2">
              <span className="text-xs tracking-[0.12em] text-primary font-semibold uppercase">
                {concept.afterMerging.eyebrow}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <SectionTranslationPill sectionId="afterMerging" />
                <SectionListenButton
                  sectionId={afterMergingSectionId}
                  sectionLabel={concept.afterMerging.title}
                  getUnits={buildAfterMergingUnits}
                />
                <AskAboutButton
                  sectionId={`${lessonId}-after-merging`}
                  topic={concept.afterMerging.title}
                  sectionText={`${concept.afterMerging.title}\n${concept.afterMerging.text}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <h3 className="text-xl sm:text-2xl font-medium text-on-surface mb-2.5">
                  <SpeakableHighlight
                    sectionId={afterMergingSectionId}
                    unitId={`${afterMergingSectionId}-title`}
                  >
                    {concept.afterMerging.title}
                  </SpeakableHighlight>
                </h3>
                <p className="text-sm sm:text-[15px] text-on-surface-variant leading-relaxed max-w-[65ch]">
                  <SpeakableText
                    sectionId={afterMergingSectionId}
                    unitPrefix={`${afterMergingSectionId}-body`}
                    text={concept.afterMerging.text}
                  />
                </p>
              </div>

              <div className="lg:col-span-4 rounded-lg border border-outline-variant/40 bg-surface-container-low/55 p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-600/15 border border-purple-500/35 text-purple-700 dark:text-purple-300 text-xs font-semibold">
                    <GitMerge className="w-3.5 h-3.5 shrink-0" />
                    <span>Merged</span>
                  </span>
                  <span className="font-mono text-[11px] text-on-surface-variant">
                    into main
                  </span>
                </div>
                <div className="pt-2 border-t border-outline-variant/25 flex items-center justify-between gap-2 text-xs">
                  <span className="text-on-surface-variant truncate font-mono">
                    my-experiment
                  </span>
                  <span className="px-2.5 py-1 rounded border border-outline-variant/45 bg-surface-container-lowest text-on-surface font-medium whitespace-nowrap">
                    Delete branch
                  </span>
                </div>
              </div>
            </div>

            <SectionFeedbackWidget
              lessonId={lessonId}
              lessonTitle={lessonTitle}
              sectionId="after-merging"
              sectionTitle={concept.afterMerging.title}
              className="!mt-5"
            />
          </div>
        </section>
      )}

      {/* 5. Common mistake callout */}
      <section
        id="concept-mistake"
        data-translate-section="mistake"
        className={`w-full scroll-mt-24 ${isTranslatingMistake ? 'translate-section-shimmer' : ''}`}
        data-section-title={concept.commonMistake.title}
      >
        <div className="border-l-2 border-primary/70 bg-surface-container-low/60 p-6 sm:p-8 rounded-r-xl border-y border-r border-outline-variant/35">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-1.5">
                <span className="text-[11px] tracking-[0.12em] text-primary font-semibold uppercase">
                  {concept.commonMistake.eyebrow}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <SectionTranslationPill sectionId="mistake" />
                  <SectionListenButton
                    sectionId={mistakeSectionId}
                    sectionLabel={concept.commonMistake.title}
                    getUnits={buildMistakeUnits}
                  />
                  <AskAboutButton
                    sectionId={`${lessonId}-mistake`}
                    topic={concept.commonMistake.title}
                    sectionText={`${concept.commonMistake.title}\n${concept.commonMistake.text}`}
                  />
                </div>
              </div>
              <h3 className="text-lg font-medium text-on-surface mb-2">
                <SpeakableHighlight
                  sectionId={mistakeSectionId}
                  unitId={`${mistakeSectionId}-title`}
                >
                  {concept.commonMistake.title}
                </SpeakableHighlight>
              </h3>
              <p className="text-sm sm:text-[15px] text-on-surface-variant leading-relaxed max-w-[65ch]">
                <SpeakableText
                  sectionId={mistakeSectionId}
                  unitPrefix={`${mistakeSectionId}-body`}
                  text={concept.commonMistake.text}
                />
              </p>
              {concept.commonMistake.screenshot && (
                <div className="mt-6 max-w-3xl">
                  <ScreenshotFrame
                    src={concept.commonMistake.screenshot.src}
                    alt={concept.commonMistake.screenshot.alt}
                    caption={concept.commonMistake.screenshot.caption}
                    markers={concept.commonMistake.screenshot.markers}
                  />
                </div>
              )}
              <SectionFeedbackWidget
                lessonId={lessonId}
                lessonTitle={lessonTitle}
                sectionId="mistake"
                sectionTitle={concept.commonMistake.title}
                className="!mt-5"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
