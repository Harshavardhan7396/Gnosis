import { useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Check,
  Copy,
  Download,
  GitBranch,
  GitFork,
  GitMerge,
  GitPullRequest,
  History,
  Menu,
  Search,
  Terminal,
  User,
  FileText,
  Lock,
  Lightbulb,
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
          whereToFind.screenType === 'pull-request-flow' ||
          whereToFind.screenType === 'issues-page' ||
          whereToFind.screenType === 'fork-clone-page'
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

        {whereToFind.screenType === 'issues-page' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-2.5 sm:p-3 flex flex-col justify-between gap-2 text-[10px]">
            {/* Top Bar: Code + Issues tab + New issue */}
            <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-surface-container-high">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-on-surface-variant">&lt;&gt; Code</span>
                <span className="inline-flex items-center gap-1 font-medium text-primary border-b-2 border-primary pb-0.5 whitespace-nowrap">
                  <AlertCircle className="w-3 h-3" />
                  <span>Issues</span>
                </span>
                <span className="hidden sm:inline text-on-surface-variant">Pull requests</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-medium whitespace-nowrap shrink-0">
                New issue
              </span>
            </div>

            {/* Open / Closed + search + Labels */}
            <div className="rounded border border-outline-variant/40 bg-surface-container-low/60 px-2.5 py-1.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-medium">
                <span className="text-on-surface">2 Open</span>
                <span className="text-on-surface-variant">1 Closed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-primary-fixed/35 text-primary font-medium">
                  bug
                </span>
                <span className="px-1.5 py-0.5 rounded border border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant">
                  documentation
                </span>
              </div>
            </div>

            {/* New issue form + Assignees / Labels */}
            <div className="grid grid-cols-12 gap-2 flex-1 min-h-0">
              <div className="col-span-7 rounded border border-outline-variant/35 p-2 flex flex-col justify-between bg-surface-container-low/20">
                <div className="space-y-1">
                  <div className="px-2 py-1 rounded border border-outline-variant/40 bg-surface-container-lowest text-on-surface font-medium truncate">
                    Button is hard to see on mobile
                  </div>
                  <div className="px-2 py-1 rounded border border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant truncate">
                    Expected a bigger Add file button.
                  </div>
                </div>
                <div className="pt-1">
                  <span className="inline-block px-2.5 py-1 rounded bg-secondary text-on-secondary font-medium">
                    Submit new issue
                  </span>
                </div>
              </div>

              <div className="col-span-5 rounded border border-outline-variant/35 p-2 flex flex-col justify-between bg-surface-container-low/20">
                <div className="space-y-1">
                  <div className="text-on-surface-variant font-medium">Assignees: @alex-dev</div>
                  <div className="text-on-surface-variant">Labels: bug</div>
                </div>
                <div className="pt-1 flex justify-end">
                  <span className="inline-block px-2 py-1 rounded border border-outline-variant/45 bg-surface-container-lowest text-on-surface font-medium">
                    Close / Reopen issue
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {whereToFind.screenType === 'fork-clone-page' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-2.5 sm:p-3 flex flex-col justify-between gap-2 text-[10px]">
            {/* Row 1: Original repository + Fork button */}
            <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-surface-container-high">
              <div className="min-w-0">
                <span className="font-mono text-on-surface-variant truncate block">
                  <span className="text-primary font-medium">original-owner</span> / sample-project
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-outline-variant/45 bg-surface-container-low text-on-surface font-medium whitespace-nowrap shrink-0">
                <GitFork className="w-3 h-3 text-primary" />
                <span>Fork 12</span>
              </span>
            </div>

            {/* Row 2: Create fork bar */}
            <div className="rounded border border-outline-variant/40 bg-surface-container-low/60 px-2.5 py-1.5 flex items-center justify-between gap-2">
              <span className="text-on-surface-variant truncate">
                Owner: <span className="font-mono text-on-surface">your-username</span> · Main branch only
              </span>
              <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-medium whitespace-nowrap shrink-0">
                Create fork
              </span>
            </div>

            {/* Row 3: Your fork header + green Code button */}
            <div className="rounded border border-outline-variant/35 bg-surface-container-low/30 px-2.5 py-1.5 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="font-mono text-on-surface font-medium truncate">
                  your-username / sample-project
                </div>
                <div className="text-[9px] text-on-surface-variant truncate">
                  forked from original-owner/sample-project
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-medium whitespace-nowrap shrink-0">
                &lt;&gt; Code
              </span>
            </div>

            {/* Row 4: Clone HTTPS + Download ZIP */}
            <div className="rounded border border-outline-variant/35 p-2 bg-surface-container-low/20 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-on-surface">Local · Clone · HTTPS</span>
                <span className="inline-flex items-center gap-1 text-on-surface-variant">
                  <Download className="w-3 h-3 text-secondary" />
                  <span>Download ZIP</span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 px-2 py-1 rounded border border-outline-variant/40 bg-surface-container-lowest font-mono text-[9px] text-on-surface-variant">
                <span className="truncate">https://github.com/your-username/sample-project.git</span>
                <Copy className="w-3 h-3 text-primary shrink-0" />
              </div>
            </div>
          </div>
        )}

        {whereToFind.screenType === 'agents-page' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-3.5 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-[11px] border-b border-surface-container-high pb-2">
              <span className="text-on-surface-variant">Code</span>
              <span className="text-on-surface-variant">Issues</span>
              <span className="text-on-surface-variant">Pull requests</span>
              <span className="font-semibold text-primary border-b-2 border-primary pb-0.5">
                Agents
              </span>
            </div>

            <div className="my-auto rounded-lg border border-outline-variant/40 bg-surface-container-low/50 p-4 text-center space-y-2.5">
              <p className="text-xs font-semibold text-on-surface">
                Do more with Copilot
              </p>
              <p className="text-[11px] text-on-surface-variant">
                Copilot is GitHub’s AI helper for small tasks.
              </p>
              <span className="inline-block px-3 py-1.5 rounded bg-secondary text-on-secondary text-[11px] font-medium">
                Upgrade to Copilot Pro
              </span>
            </div>

            <div className="text-[10px] text-on-surface-variant text-center border-t border-surface-container-high pt-2">
              Free plan screen — you do not need to upgrade to finish this course.
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
  const [copiedCommandKey, setCopiedCommandKey] = useState<string | null>(null);

  const handleCopyCommand = (key: string, commandText: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(commandText).catch(() => {});
    }
    setCopiedCommandKey(key);
    window.setTimeout(() => {
      setCopiedCommandKey((current) => (current === key ? null : current));
    }, 1800);
  };

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
    ...(concept.whereToFind.screenshotsNote ? [concept.whereToFind.screenshotsNote] : []),
    ...concept.whereToFind.markers.map((m) => `${m.number}. ${m.label}: ${m.description}`),
    ...(concept.whereToFind.commands ?? []).map(
      (c) => `${c.step ? `${c.step} — ` : ''}${c.label}: ${c.command}`
    ),
  ].join('\n');

  const { activeSectionId, activeUnitId } = useSpeech();

  const storySectionId = `${lessonId}-story`;
  const meaningSectionId = `${lessonId}-meaning`;
  const diagramSectionId = `${lessonId}-diagram`;
  const whereSectionId = `${lessonId}-where`;
  const afterMergingSectionId = `${lessonId}-after-merging`;
  const tipSectionId = `${lessonId}-tip`;
  const mistakeSectionId = `${lessonId}-mistake`;

  const isTranslatingStory = useSectionShimmer('story');
  const isTranslatingMeaning = useSectionShimmer('meaning');
  const isTranslatingDiagram = useSectionShimmer('diagram');
  const isTranslatingWhere = useSectionShimmer('where');
  const isTranslatingAfterMerging = useSectionShimmer('afterMerging');
  const isTranslatingTip = useSectionShimmer('tip');
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

  const buildTipUnits = (): SpeechUnit[] => {
    if (!concept.tip) return [];
    return [
      {
        id: `${tipSectionId}-title`,
        text: concept.tip.title,
        speechText: sanitizeTextForSpeech(concept.tip.title),
      },
      ...buildSentenceUnits(`${tipSectionId}-body`, concept.tip.text),
    ];
  };

  const buildMistakeUnits = (): SpeechUnit[] => [
    {
      id: `${mistakeSectionId}-title`,
      text: concept.commonMistake.title,
      speechText: sanitizeTextForSpeech(concept.commonMistake.title),
    },
    ...buildSentenceUnits(`${mistakeSectionId}-body`, concept.commonMistake.text),
    ...(concept.commonMistake.items ?? []).flatMap((item, idx) => [
      {
        id: `${mistakeSectionId}-item-${idx}-title`,
        text: item.title,
        speechText: sanitizeTextForSpeech(item.title),
      },
      ...buildSentenceUnits(`${mistakeSectionId}-item-${idx}-body`, item.text),
    ]),
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

          {concept.diagram.variant === 'fork-clone-flow' && (
            <div className="mb-6 rounded-xl border border-outline-variant/40 bg-surface-container-low/45 p-4 sm:p-6 overflow-x-auto">
              <svg
                viewBox="0 0 820 215"
                className="w-full min-w-[540px] h-auto"
                role="img"
                aria-label="Diagram showing Original repository (original-owner), an arrow labeled Fork to Your fork (your-username, on GitHub), an arrow labeled Clone to Your computer, and a curved arrow labeled Pull request from Your fork back to Original repository"
              >
                <defs>
                  <marker
                    id="fc-arrow-neutral"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0,1 L7,4 L0,7 z" className="fill-on-surface" />
                  </marker>
                  <marker
                    id="fc-arrow-primary"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0,1 L7,4 L0,7 z" className="fill-primary" />
                  </marker>
                </defs>

                {/* Curved Pull request arrow from Your fork back to Original repository */}
                <path
                  d="M 420 92 C 420 20, 124 20, 124 85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  markerEnd="url(#fc-arrow-primary)"
                  className="text-primary"
                />
                <rect
                  x="218"
                  y="24"
                  width="108"
                  height="24"
                  rx="6"
                  className="fill-surface-container-lowest stroke-primary/60"
                  strokeWidth="1"
                />
                <text
                  x="272"
                  y="40"
                  textAnchor="middle"
                  className="fill-primary text-[12px] font-semibold"
                >
                  Pull request
                </text>

                {/* Box 1: Original repository */}
                <rect
                  x="16"
                  y="94"
                  width="216"
                  height="92"
                  rx="12"
                  className="fill-surface-container-lowest stroke-outline-variant"
                  strokeWidth="1.5"
                />
                <text
                  x="124"
                  y="133"
                  textAnchor="middle"
                  className="fill-on-surface text-[14px] font-semibold"
                >
                  Original repository
                </text>
                <text
                  x="124"
                  y="155"
                  textAnchor="middle"
                  className="fill-on-surface-variant font-mono text-[12px]"
                >
                  (original-owner)
                </text>

                {/* Arrow 1 -> 2: Fork */}
                <line
                  x1="238"
                  y1="140"
                  x2="300"
                  y2="140"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  markerEnd="url(#fc-arrow-primary)"
                  className="text-primary"
                />
                <text
                  x="270"
                  y="126"
                  textAnchor="middle"
                  className="fill-primary text-[12px] font-semibold"
                >
                  Fork
                </text>

                {/* Box 2: Your fork */}
                <rect
                  x="308"
                  y="94"
                  width="224"
                  height="92"
                  rx="12"
                  className="fill-surface-container-lowest stroke-primary/60"
                  strokeWidth="1.5"
                />
                <text
                  x="420"
                  y="133"
                  textAnchor="middle"
                  className="fill-primary text-[14px] font-semibold"
                >
                  Your fork
                </text>
                <text
                  x="420"
                  y="155"
                  textAnchor="middle"
                  className="fill-on-surface-variant font-mono text-[11.5px]"
                >
                  (your-username, on GitHub)
                </text>

                {/* Arrow 2 -> 3: Clone */}
                <line
                  x1="538"
                  y1="140"
                  x2="600"
                  y2="140"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  markerEnd="url(#fc-arrow-neutral)"
                  className="text-on-surface/80"
                />
                <text
                  x="570"
                  y="126"
                  textAnchor="middle"
                  className="fill-on-surface text-[12px] font-semibold"
                >
                  Clone
                </text>

                {/* Box 3: Your computer */}
                <rect
                  x="608"
                  y="94"
                  width="196"
                  height="92"
                  rx="12"
                  className="fill-surface-container-lowest stroke-secondary/60"
                  strokeWidth="1.5"
                />
                <text
                  x="706"
                  y="144"
                  textAnchor="middle"
                  className="fill-secondary text-[14px] font-semibold"
                >
                  Your computer
                </text>
              </svg>
            </div>
          )}

          {concept.diagram.variant === 'staging-flow' && (
            <div className="mb-6 rounded-xl border border-outline-variant/40 bg-surface-container-low/45 p-4 sm:p-6 overflow-x-auto">
              <svg
                viewBox="0 0 820 144"
                className="w-full min-w-[540px] h-auto"
                role="img"
                aria-label="Three boxes in a row: Your folder, an arrow labeled git add pointing to Staging area, and an arrow labeled git commit pointing to Commit history"
              >
                <defs>
                  <marker
                    id="stage-arrow-primary"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0,1 L7,4 L0,7 z" className="fill-primary" />
                  </marker>
                  <marker
                    id="stage-arrow-secondary"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0,1 L7,4 L0,7 z" className="fill-secondary" />
                  </marker>
                </defs>

                {/* Box 1: Your folder */}
                <rect
                  x="16"
                  y="26"
                  width="202"
                  height="92"
                  rx="12"
                  className="fill-surface-container-lowest stroke-outline-variant"
                  strokeWidth="1.5"
                />
                <text
                  x="117"
                  y="77"
                  textAnchor="middle"
                  className="fill-on-surface text-[15px] font-semibold"
                >
                  Your folder
                </text>

                {/* Arrow 1 -> 2: git add */}
                <line
                  x1="226"
                  y1="72"
                  x2="298"
                  y2="72"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  markerEnd="url(#stage-arrow-primary)"
                  className="text-primary"
                />
                <text
                  x="263"
                  y="56"
                  textAnchor="middle"
                  className="fill-primary font-mono text-[12px] font-semibold"
                >
                  git add
                </text>

                {/* Box 2: Staging area */}
                <rect
                  x="306"
                  y="26"
                  width="208"
                  height="92"
                  rx="12"
                  className="fill-surface-container-lowest stroke-primary/60"
                  strokeWidth="1.5"
                />
                <text
                  x="410"
                  y="77"
                  textAnchor="middle"
                  className="fill-primary text-[15px] font-semibold"
                >
                  Staging area
                </text>

                {/* Arrow 2 -> 3: git commit */}
                <line
                  x1="522"
                  y1="72"
                  x2="594"
                  y2="72"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  markerEnd="url(#stage-arrow-secondary)"
                  className="text-secondary"
                />
                <text
                  x="559"
                  y="56"
                  textAnchor="middle"
                  className="fill-secondary font-mono text-[12px] font-semibold"
                >
                  git commit
                </text>

                {/* Box 3: Commit history */}
                <rect
                  x="602"
                  y="26"
                  width="202"
                  height="92"
                  rx="12"
                  className="fill-surface-container-lowest stroke-secondary/60"
                  strokeWidth="1.5"
                />
                <text
                  x="703"
                  y="77"
                  textAnchor="middle"
                  className="fill-secondary text-[15px] font-semibold"
                >
                  Commit history
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
            : concept.whereToFind.extraScreenshots && concept.whereToFind.extraScreenshots.length > 0
              ? 'space-y-10'
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

            {concept.whereToFind.showStepList && concept.whereToFind.markers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {concept.whereToFind.markers.map((marker) => (
                  <div
                    key={marker.number}
                    className="rounded-xl p-4 border bg-surface-container-low/45 border-outline-variant/40 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {marker.number}
                    </span>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="text-sm font-medium text-on-surface">
                        <SpeakableHighlight
                          sectionId={whereSectionId}
                          unitId={`${whereSectionId}-m-${marker.number}-label`}
                        >
                          {marker.label}
                        </SpeakableHighlight>
                      </p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        <SpeakableText
                          sectionId={whereSectionId}
                          unitPrefix={`${whereSectionId}-m-${marker.number}-desc`}
                          text={marker.description}
                        />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {concept.whereToFind.commands && concept.whereToFind.commands.length > 0 && (
              <div className="rounded-xl border border-outline-variant/45 bg-surface-container-lowest p-5 sm:p-6 space-y-4 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary shrink-0" />
                    <h3 className="text-base font-medium text-on-surface">
                      Commands to type in your terminal
                    </h3>
                  </div>
                  <span className="text-xs font-medium text-secondary">
                    Press Enter after each command
                  </span>
                </div>

                <div className="space-y-3">
                  {concept.whereToFind.commands.map((item, idx) => {
                    const key = item.id || `${lessonId}-cmd-${idx}`;
                    const isCopied = copiedCommandKey === key;
                    return (
                      <div
                        key={key}
                        className="rounded-lg border border-outline-variant/35 bg-surface-container-low/40 p-3.5 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                            {item.step && (
                              <span className="font-mono font-semibold text-primary">
                                {item.step}
                              </span>
                            )}
                            <span className="font-medium text-on-surface">{item.label}</span>
                          </div>
                          {item.note && (
                            <span className="text-[11px] text-on-surface-variant">{item.note}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-3 rounded-lg bg-[#161b22] text-[#e6edf3] px-3.5 py-2.5 border border-outline-variant/30">
                          <code className="font-mono text-xs sm:text-[13px] overflow-x-auto whitespace-nowrap">
                            {item.command}
                          </code>
                          <button
                            type="button"
                            onClick={() => handleCopyCommand(key, item.command)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium shrink-0 cursor-pointer transition-colors"
                            aria-label={`Copy command: ${item.command}`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-300" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {concept.whereToFind.screenshotsNote && (
              <div className="rounded-xl border border-outline-variant/45 bg-surface-container-low/50 px-4 py-3 text-sm text-on-surface-variant leading-relaxed">
                {concept.whereToFind.screenshotsNote}
              </div>
            )}

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
            <div
              className={
                concept.whereToFind.extraScreenshots && concept.whereToFind.extraScreenshots.length > 0
                  ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'
                  : 'contents'
              }
            >
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
            </div>

            {concept.whereToFind.extraScreenshots &&
              concept.whereToFind.extraScreenshots.length > 0 && (
                <div className="space-y-10">
                  {concept.whereToFind.extraScreenshots.map((shot) => (
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
              )}
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

      {/* 4c. Helpful Tip (optional concept callout) */}
      {concept.tip && (
        <section
          id="concept-tip"
          data-translate-section="tip"
          data-section-title={concept.tip.title}
          className={`w-full scroll-mt-24 ${isTranslatingTip ? 'translate-section-shimmer' : ''}`}
        >
          <div className="border-l-2 border-secondary bg-surface-container-lowest p-6 sm:p-8 rounded-r-xl border-y border-r border-outline-variant/45 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)]">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-5 h-5 text-secondary shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-1.5">
                  <span className="text-[11px] tracking-[0.12em] text-secondary font-semibold uppercase">
                    {concept.tip.eyebrow}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <SectionTranslationPill sectionId="tip" />
                    <SectionListenButton
                      sectionId={tipSectionId}
                      sectionLabel={concept.tip.title}
                      getUnits={buildTipUnits}
                    />
                    <AskAboutButton
                      sectionId={`${lessonId}-tip`}
                      topic={concept.tip.title}
                      sectionText={`${concept.tip.title}\n${concept.tip.text}`}
                    />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-on-surface mb-2">
                  <SpeakableHighlight sectionId={tipSectionId} unitId={`${tipSectionId}-title`}>
                    {concept.tip.title}
                  </SpeakableHighlight>
                </h3>
                <p className="text-sm sm:text-[15px] text-on-surface-variant leading-relaxed max-w-[65ch]">
                  <SpeakableText
                    sectionId={tipSectionId}
                    unitPrefix={`${tipSectionId}-body`}
                    text={concept.tip.text}
                  />
                </p>
                {concept.tip.codeSnippet && (
                  <div className="mt-4 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/40">
                    <span className="text-[11px] text-on-surface-variant">Example:</span>
                    <code className="font-mono text-xs font-semibold text-primary">
                      {concept.tip.codeSnippet}
                    </code>
                    {concept.tip.copyable && (
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCommand(`${lessonId}-tip-snippet`, concept.tip!.codeSnippet!)
                        }
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/45 hover:border-primary/50 text-[11px] font-medium text-on-surface cursor-pointer transition-colors"
                        aria-label={`Copy command: ${concept.tip.codeSnippet}`}
                      >
                        {copiedCommandKey === `${lessonId}-tip-snippet` ? (
                          <>
                            <Check className="w-3 h-3 text-secondary" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-primary" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
                <SectionFeedbackWidget
                  lessonId={lessonId}
                  lessonTitle={lessonTitle}
                  sectionId="tip"
                  sectionTitle={concept.tip.title}
                  className="!mt-5"
                />
              </div>
            </div>
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
                    sectionText={[
                      concept.commonMistake.title,
                      concept.commonMistake.text,
                      ...(concept.commonMistake.items ?? []).map((i) => `${i.title}: ${i.text}`),
                    ].join('\n')}
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
              {concept.commonMistake.items && concept.commonMistake.items.length > 0 && (
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {concept.commonMistake.items.map((item, idx) => (
                    <div
                      key={item.title}
                      className="rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-4 space-y-1.5"
                    >
                      <h4 className="text-sm font-medium text-on-surface">
                        <SpeakableHighlight
                          sectionId={mistakeSectionId}
                          unitId={`${mistakeSectionId}-item-${idx}-title`}
                        >
                          {item.title}
                        </SpeakableHighlight>
                      </h4>
                      <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
                        <SpeakableText
                          sectionId={mistakeSectionId}
                          unitPrefix={`${mistakeSectionId}-item-${idx}-body`}
                          text={item.text}
                        />
                      </p>
                    </div>
                  ))}
                </div>
              )}
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
