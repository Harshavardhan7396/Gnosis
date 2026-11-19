import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  FileText,
  FolderGit2,
  GitBranch,
  GitPullRequest,
  History,
  HelpCircle,
  ImageOff,
  LifeBuoy,
  Menu,
  Pencil,
  Search,
  Upload,
  User,
  X,
} from 'lucide-react';
import { stuckSituations as rawStuckSituations } from '../data/stuckSituations.js';
import type { StuckSituation } from '../types/lesson';
import { ExplainText } from './ExplainText';
import { AskAboutButton } from './AskAboutButton';

const stuckSituations = rawStuckSituations as StuckSituation[];

interface WhereAmIStuckPageProps {
  onBackToLessons: () => void;
  onOpenSandbox?: () => void;
}

function StuckScreenMockup({
  situation,
  activeMarker,
  onSelectMarker,
}: {
  situation: StuckSituation;
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
        aria-label={`Fix step ${num}`}
        className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full font-mono text-xs font-semibold flex items-center justify-center transition-all shadow-sm cursor-pointer z-20 ${
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
      <div className="bg-surface-container-high/60 border-b border-outline-variant/30 px-4 py-2.5 flex items-center gap-3">
        <div className="flex items-center gap-1.5 opacity-60 shrink-0" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
        </div>
        <div className="flex-1 max-w-sm mx-auto bg-surface-container-lowest/90 border border-outline-variant/30 px-3 py-1 rounded text-center">
          <span className="font-mono text-[11px] text-on-surface-variant truncate block">
            {situation.windowUrl}
          </span>
        </div>
      </div>

      {/* Screen Canvas with Numbered Markers */}
      <div className="relative h-72 sm:h-80 bg-surface-container-low/30 p-3.5 sm:p-5 select-none overflow-hidden">
        {situation.screenType === 'repo-toolbar' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-3.5 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-surface-container-high">
                <div className="flex items-center gap-2 text-xs font-medium text-on-surface min-w-0">
                  <FolderGit2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span className="truncate">alex-dev / my-first-project</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded border border-outline-variant/40 text-on-surface-variant shrink-0">
                  Public
                </span>
              </div>

              <div className="flex items-center gap-4 text-[11px] border-b border-surface-container-high pb-1.5">
                <span className="font-semibold text-on-surface border-b-2 border-primary pb-1">
                  &lt;&gt; Code
                </span>
                <span className="text-on-surface-variant">Issues</span>
                <span className="text-on-surface-variant">Pull requests</span>
                <span className="text-on-surface-variant hidden sm:inline">Settings</span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-outline-variant/45 bg-surface-container-low text-[11px] font-mono text-on-surface">
                  <GitBranch className="w-3 h-3 text-secondary" />
                  <span>main</span>
                  <ChevronDown className="w-3 h-3 text-on-surface-variant" />
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-primary/45 bg-primary-fixed/30 text-[11px] font-medium text-primary">
                  <span>Add file</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="rounded border border-outline-variant/30 bg-surface-container-low/50 px-3 py-2 flex items-center justify-between text-[11px] text-on-surface-variant">
              <span>Signed in as alex-dev (Owner)</span>
              <span className="text-secondary font-medium">Can edit</span>
            </div>
          </div>
        )}

        {situation.screenType === 'commit-box' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-3.5 flex flex-col justify-between">
            <div className="relative flex items-center justify-between pb-2 border-b border-surface-container-high">
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-outline-variant/40 bg-surface-container-low text-[11px] font-mono text-on-surface">
                <GitBranch className="w-3 h-3 text-secondary" />
                <span>main</span>
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-primary/45 bg-primary-fixed/30 text-[11px] font-medium text-primary">
                  <span>Add file</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="absolute right-0 top-8 w-40 rounded-lg border border-outline-variant/45 bg-surface-container-lowest shadow-md py-1 text-[11px] z-10">
                  <div className="px-3 py-1.5 text-on-surface-variant">Create new file</div>
                  <div className="px-3 py-1.5 bg-primary-fixed/30 text-primary font-medium flex items-center gap-1.5">
                    <Upload className="w-3 h-3" />
                    <span>Upload files</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-outline-variant/40 bg-surface-container-low/45 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-on-surface">Commit changes</span>
                <span className="inline-flex items-center gap-1 text-[10px] text-primary">
                  <ImageOff className="w-3 h-3" />
                  <span>Text only</span>
                </span>
              </div>
              <div className="h-8 rounded border border-outline-variant/45 bg-surface-container-lowest px-2.5 flex items-center text-[11px] text-on-surface-variant font-mono">
                Add team photo
              </div>
              <div className="flex justify-end">
                <span className="px-2.5 py-1 rounded bg-secondary text-on-secondary text-[10px] font-medium">
                  Commit changes
                </span>
              </div>
            </div>
          </div>
        )}

        {situation.screenType === 'commit-missing' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-surface-container-high">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-primary/45 bg-primary-fixed/25 text-[11px] font-mono text-primary">
                <GitBranch className="w-3 h-3" />
                <span>main</span>
                <ChevronDown className="w-3 h-3" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-outline-variant/40 bg-surface-container-low text-[11px] font-mono text-on-surface">
                <History className="w-3 h-3 text-secondary" />
                <span>3 commits</span>
              </div>
            </div>

            <div className="rounded border border-outline-variant/35 divide-y divide-outline-variant/25 text-[11px]">
              <div className="px-3 py-2.5 bg-surface-container-low/65 flex items-center justify-between gap-2">
                <span className="font-medium text-on-surface truncate">
                  alex-dev · Update README
                </span>
                <span className="font-mono text-[10px] text-secondary shrink-0">just now</span>
              </div>
              <div className="px-3 py-2 flex items-center gap-2 font-mono text-on-surface">
                <FileText className="w-3.5 h-3.5 text-secondary" />
                <span>README.md</span>
              </div>
              <div className="px-3 py-2 flex items-center gap-2 font-mono text-on-surface-variant">
                <FileText className="w-3.5 h-3.5 text-outline" />
                <span>notes.txt</span>
              </div>
            </div>
          </div>
        )}

        {situation.screenType === 'branch-indicator' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-3.5 flex flex-col justify-between">
            <div className="rounded border border-outline-variant/35 bg-surface-container-low/50 px-2.5 py-1.5 flex items-center justify-between text-[11px] font-mono">
              <span className="text-on-surface-variant truncate">.../my-first-project</span>
              <span className="text-primary font-semibold shrink-0">/tree/my-experiment</span>
            </div>

            <div className="flex-1 pt-2.5 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-primary/50 bg-primary-fixed/25 text-[11px] font-mono text-primary">
                <GitBranch className="w-3 h-3" />
                <span>my-experiment</span>
                <ChevronDown className="w-3 h-3" />
              </div>

              <div className="w-52 rounded-lg border border-outline-variant/45 bg-surface-container-lowest shadow-sm py-1 text-[11px] font-mono">
                <div className="px-3 py-1.5 text-on-surface-variant border-b border-outline-variant/20 text-[10px] font-sans uppercase tracking-wider">
                  Switch branches
                </div>
                <div className="px-3 py-1.5 text-on-surface flex items-center gap-2">
                  <span className="w-3" />
                  <span>main</span>
                </div>
                <div className="px-3 py-1.5 bg-secondary-container/35 text-secondary font-medium flex items-center gap-2">
                  <Check className="w-3 h-3" />
                  <span>my-experiment</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {situation.screenType === 'file-mistake' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-3.5 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-mono pb-2 border-b border-surface-container-high">
              <span className="text-on-surface-variant">my-first-project</span>
              <span className="text-outline">/</span>
              <span className="font-semibold text-primary underline decoration-primary/40">
                README.md
              </span>
            </div>

            <div className="rounded border border-outline-variant/40 overflow-hidden my-auto">
              <div className="px-3 py-1.5 bg-surface-container-low/70 border-b border-outline-variant/30 flex items-center justify-between text-[11px]">
                <span className="font-mono text-on-surface-variant">3 lines</span>
                <div className="flex items-center gap-2">
                  <span className="text-on-surface-variant">Raw</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-primary/45 bg-primary-fixed/30 text-primary font-medium">
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </span>
                </div>
              </div>
              <div className="p-3 font-mono text-[11px] text-on-surface space-y-1">
                <div># My First Project</div>
                <div className="text-on-surface-variant">Learning GitHub step by step.</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-[10px] text-on-surface-variant">
                Note: Fix typo in README
              </span>
              <span className="px-2.5 py-1 rounded bg-secondary text-on-secondary text-[11px] font-medium">
                Commit changes
              </span>
            </div>
          </div>
        )}

        {situation.screenType === 'find-repo' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 overflow-hidden flex flex-col">
            <div className="px-3 py-2 border-b border-surface-container-high bg-surface-container-low/50 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Menu className="w-3.5 h-3.5 text-on-surface" />
                <span className="text-xs font-semibold text-on-surface">Dashboard</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center">
                <User className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="relative flex-1 grid grid-cols-12">
              <div className="col-span-6 border-r border-surface-container-high p-3 space-y-2">
                <div className="text-[11px] font-medium text-on-surface">Top repositories</div>
                <div className="rounded border border-outline-variant/30 bg-surface-container-low/50 px-2 py-1 text-[10px] text-on-surface-variant">
                  Find a repository...
                </div>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="text-primary font-medium truncate">
                    alex-dev/my-first-project
                  </div>
                  <div className="text-on-surface-variant truncate">alex-dev/notes</div>
                </div>
              </div>

              <div className="col-span-6 p-2.5 bg-surface-container-low/20">
                <div className="ml-auto w-36 rounded-lg border border-outline-variant/45 bg-surface-container-lowest shadow-sm py-1 text-[11px]">
                  <div className="px-3 py-1.5 text-on-surface-variant">Your profile</div>
                  <div className="px-3 py-1.5 bg-primary-fixed/30 text-primary font-medium">
                    Your repositories
                  </div>
                  <div className="px-3 py-1.5 text-on-surface-variant">Your stars</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {situation.screenType === 'pr-no-banner' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-3.5 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-[11px] border-b border-surface-container-high pb-2">
                <span className="text-on-surface-variant">&lt;&gt; Code</span>
                <span className="text-on-surface-variant">Issues</span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary border-b-2 border-primary pb-1">
                  <GitPullRequest className="w-3 h-3" />
                  <span>Pull requests</span>
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-[11px] text-on-surface-variant">
                  Open a pull request anytime
                </span>
                <span className="px-2.5 py-1 rounded bg-secondary text-on-secondary text-[11px] font-medium whitespace-nowrap">
                  New pull request
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-outline-variant/40 bg-surface-container-low/50 p-3 flex items-center justify-center gap-2 font-mono text-[11px]">
              <span className="px-2.5 py-1 rounded border border-outline-variant/45 bg-surface-container-lowest text-on-surface">
                base: main
              </span>
              <span className="text-on-surface-variant">←</span>
              <span className="px-2.5 py-1 rounded border border-primary/45 bg-primary-fixed/25 text-primary font-medium">
                compare: my-experiment
              </span>
            </div>
          </div>
        )}

        {situation.screenType === 'pr-nothing-to-compare' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-3.5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[11px] font-medium text-on-surface block">
                Compare changes
              </span>
              <div className="rounded-lg border border-outline-variant/40 bg-surface-container-low/55 p-3 flex items-center justify-between gap-2 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded border border-outline-variant/45 bg-surface-container-lowest text-on-surface">
                  base: main
                </span>
                <span className="text-on-surface-variant">←</span>
                <span className="px-2.5 py-1 rounded border border-primary/50 bg-primary-fixed/30 text-primary font-medium">
                  compare: main
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-primary/35 bg-primary-fixed/15 p-3.5 text-center space-y-1">
              <p className="text-xs font-medium text-on-surface">
                There isn&apos;t anything to compare.
              </p>
              <p className="text-[11px] text-on-surface-variant">
                Pick your branch in compare and make sure it has at least one commit.
              </p>
            </div>
          </div>
        )}

        {situation.screenType === 'pr-merge-disabled' && (
          <div className="h-full rounded-lg bg-surface-container-lowest border border-outline-variant/35 p-3.5 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3 rounded-lg border border-primary/35 bg-primary-fixed/15 p-3">
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Merging is blocked</span>
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  Review required or this branch has conflicts.
                </p>
              </div>
            </div>

            <div className="rounded border border-outline-variant/35 bg-surface-container-low/45 px-3 py-2 flex items-center justify-between text-[11px]">
              <span className="text-on-surface-variant">At least 1 approving review required</span>
              <span className="px-2 py-0.5 rounded border border-outline-variant/45 bg-surface-container-lowest text-on-surface font-medium shrink-0">
                Files changed → Review
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1 border-t border-surface-container-high">
              <span className="text-[11px] text-on-surface-variant">
                Or click Resolve conflicts if shown
              </span>
              <span className="px-3 py-1.5 rounded bg-surface-container-high text-on-surface-variant/75 text-[11px] font-medium border border-outline-variant/40 cursor-not-allowed shrink-0">
                Merge pull request
              </span>
            </div>
          </div>
        )}

        {situation.steps.map((step) =>
          renderMarkerPin(step.number, step.xPercent, step.yPercent)
        )}
      </div>
    </div>
  );
}

export function WhereAmIStuckPage({
  onBackToLessons,
  onOpenSandbox,
}: WhereAmIStuckPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSituationId, setSelectedSituationId] = useState<string | null>(null);
  const [activeMarker, setActiveMarker] = useState<number>(1);

  const filteredSituations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return stuckSituations;
    return stuckSituations.filter((item) => {
      const searchable = [
        item.title,
        item.summary,
        item.whatIsHappening,
        item.whyItHappens,
        ...item.steps.map((s) => `${s.label} ${s.description}`),
      ]
        .join(' ')
        .toLowerCase();
      return searchable.includes(q);
    });
  }, [searchQuery]);

  const selectedSituation = useMemo(
    () => stuckSituations.find((s) => s.id === selectedSituationId) ?? null,
    [selectedSituationId]
  );

  const handleSelectSituation = (id: string) => {
    setSelectedSituationId(id);
    setActiveMarker(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedSituation) {
    const fullContextText = [
      `Situation: ${selectedSituation.title}`,
      `What is happening: ${selectedSituation.whatIsHappening}`,
      `Why it happens: ${selectedSituation.whyItHappens}`,
      'Step-by-step fix:',
      ...selectedSituation.steps.map((s) => `${s.number}. ${s.label}: ${s.description}`),
    ].join('\n\n');

    return (
      <div className="py-4 sm:py-8 max-w-6xl mx-auto" data-ask-selectable="true">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={() => setSelectedSituationId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all situations</span>
          </button>

          <button
            type="button"
            onClick={onBackToLessons}
            className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Back to Lessons
          </button>
        </div>

        {/* Fix Header */}
        <header className="mb-8 border-b border-outline-variant/30 pb-6">
          <div className="flex items-center gap-2 text-xs tracking-[0.12em] text-primary font-semibold uppercase mb-2">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Quick Troubleshooting Fix</span>
          </div>
          <h1 className="text-[30px] sm:text-[40px] leading-[1.15] font-normal tracking-[-0.02em] text-on-surface mb-2.5">
            {selectedSituation.title}
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-[65ch]">
            <ExplainText text={selectedSituation.summary} />
          </p>
        </header>

        {/* What is happening & Why it happens */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/45 p-5 sm:p-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary block mb-2">
              What is happening
            </span>
            <p className="text-sm sm:text-[15px] text-on-surface leading-relaxed">
              <ExplainText text={selectedSituation.whatIsHappening} />
            </p>
          </div>

          <div className="rounded-xl bg-surface-container-low/75 border border-outline-variant/45 p-5 sm:p-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary block mb-2">
              Why it happens
            </span>
            <p className="text-sm sm:text-[15px] text-on-surface leading-relaxed">
              <ExplainText text={selectedSituation.whyItHappens} />
            </p>
          </div>
        </section>

        {/* Step-by-step fix with numbered markers on a screen mockup */}
        <section className="mb-10">
          <div className="mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary block mb-1.5">
              Step-by-step fix
            </span>
            <h2 className="text-xl sm:text-2xl font-normal text-on-surface tracking-[-0.015em]">
              Click a number on the screen or in the steps below
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <StuckScreenMockup
                situation={selectedSituation}
                activeMarker={activeMarker}
                onSelectMarker={setActiveMarker}
              />
            </div>

            <div className="lg:col-span-6 space-y-3">
              {selectedSituation.steps.map((step) => {
                const isSelected = activeMarker === step.number;
                return (
                  <div
                    key={step.number}
                    className={`w-full text-left rounded-xl p-4 border flex items-start gap-3.5 transition-colors ${
                      isSelected
                        ? 'bg-surface-container-lowest border-primary/50 shadow-xs'
                        : 'bg-surface-container-low/45 border-outline-variant/35 hover:bg-surface-container-lowest/80'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveMarker(step.number)}
                      aria-label={`Highlight step ${step.number}: ${step.label}`}
                      className={`w-6 h-6 rounded-full font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-lowest border border-primary/50 text-primary hover:bg-primary-fixed'
                      }`}
                    >
                      {step.number}
                    </button>
                    <div className="min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => setActiveMarker(step.number)}
                        className="text-left text-sm font-medium text-on-surface hover:text-primary transition-colors block mb-1 cursor-pointer"
                      >
                        {step.label}
                      </button>
                      <p className="text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
                        <ExplainText text={step.description} />
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Still stuck? Ask about this */}
        <section className="rounded-xl border border-outline-variant/45 bg-surface-container-low/65 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-medium text-on-surface mb-1">
              Still seeing something different on your screen?
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Describe what you see and get a plain-English hint tailored to this exact issue.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenSandbox && (
              <button
                type="button"
                onClick={onOpenSandbox}
                className="px-4 py-2 rounded-lg border border-outline-variant/50 bg-surface-container-lowest text-xs font-medium text-on-surface hover:border-primary/40 hover:text-primary transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Try in Practice Sandbox
              </button>
            )}
            <AskAboutButton
              sectionId={`stuck-${selectedSituation.id}`}
              topic={selectedSituation.title}
              sectionText={fullContextText}
              lessonTitle={`Troubleshooting: ${selectedSituation.title}`}
              label="Still stuck? Ask about this"
              className="!px-4 !py-2 !text-xs !border-primary/45 !bg-surface-container-lowest !text-primary hover:!bg-primary-fixed/30"
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <button
          type="button"
          onClick={onBackToLessons}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Lessons</span>
        </button>
      </div>

      {/* Header */}
      <header className="mb-8 max-w-3xl">
        <div className="flex items-center gap-2 text-xs tracking-[0.12em] text-primary font-semibold uppercase mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Troubleshooting Guide</span>
        </div>
        <h1 className="text-[34px] sm:text-[46px] leading-[1.1] font-normal tracking-[-0.02em] text-on-surface mb-3">
          Where am I stuck?
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
          Getting lost on GitHub happens to everyone at first. Pick what looks closest to your screen for a calm, step-by-step fix.
        </p>
      </header>

      {/* Top Search Box */}
      <div className="mb-8">
        <label htmlFor="stuck-search-input" className="sr-only">
          Search stuck situations
        </label>
        <div className="relative max-w-2xl">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="stuck-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search what happened (for example: Add file, image, branch, commit)..."
            className="w-full h-11 pl-10 pr-10 rounded-lg border border-outline-variant/55 bg-surface-container-lowest text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-primary"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-on-surface-variant tabular-nums">
          {filteredSituations.length}{' '}
          {filteredSituations.length === 1 ? 'situation' : 'situations'} shown
        </p>
      </div>

      {/* Situations Grid */}
      {filteredSituations.length === 0 ? (
        <div className="rounded-xl border border-outline-variant/45 bg-surface-container-lowest p-8 text-center max-w-2xl">
          <p className="text-sm text-on-surface mb-2">
            No matching situation found for &ldquo;{searchQuery.trim()}&rdquo;.
          </p>
          <p className="text-xs text-on-surface-variant mb-4">
            Try searching a shorter word like &ldquo;commit&rdquo;, &ldquo;branch&rdquo;, or &ldquo;file&rdquo;, or ask GitStart in the bottom-right corner.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 rounded-lg border border-outline-variant/50 bg-surface-container-low text-xs font-medium text-on-surface hover:text-primary cursor-pointer"
          >
            Show all situations
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSituations.map((situation, index) => (
            <button
              key={situation.id}
              type="button"
              onClick={() => handleSelectSituation(situation.id)}
              className="group text-left rounded-xl bg-surface-container-lowest border border-outline-variant/45 hover:border-primary/45 p-5 sm:p-6 transition-all shadow-[0_1px_4px_rgba(28,25,23,0.03)] hover:shadow-[0_6px_20px_-4px_rgba(28,25,23,0.08)] flex flex-col justify-between gap-4 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-primary uppercase">
                    Fix {String(index + 1).padStart(2, '0')}
                  </span>
                  <LifeBuoy className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                </div>
                <h2 className="text-lg font-medium text-on-surface group-hover:text-primary transition-colors mb-1.5">
                  {situation.title}
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {situation.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-outline-variant/25 flex items-center justify-between text-xs font-medium text-primary">
                <span>See step-by-step fix</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
