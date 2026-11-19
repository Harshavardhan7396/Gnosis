import { useState } from 'react';
import {
  Lightbulb,
  HelpCircle,
  Bookmark,
  ChevronUp,
  ChevronDown,
  Check,
  RotateCcw,
  GitBranch,
  Plus,
  FileText,
} from 'lucide-react';
import type {
  LessonStep,
  AddFileMockupData,
  EditorMockupData,
  CommitMockupData,
  BranchDropdownMockupData,
  BranchCreateMockupData,
  BranchSwitchMockupData,
} from '../types/lesson';
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

interface StepSectionProps {
  lessonId?: string;
  lessonTitle?: string;
  steps: LessonStep[];
  onStepActionComplete: (stepId: string) => void;
}

function CalloutIcon({ icon }: { icon: 'lightbulb' | 'help' | 'bookmark' }) {
  if (icon === 'help') {
    return <HelpCircle className="w-[18px] h-[18px] text-primary mt-0.5 shrink-0" />;
  }
  if (icon === 'bookmark') {
    return <Bookmark className="w-[18px] h-[18px] text-primary mt-0.5 shrink-0" />;
  }
  return <Lightbulb className="w-[18px] h-[18px] text-primary mt-0.5 shrink-0" />;
}

function AddFileMockup({
  data,
  onSelectCreate,
}: {
  data: AddFileMockupData;
  onSelectCreate: () => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState('create-new-file');

  return (
    <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] overflow-hidden">
      <div className="bg-surface-container-high/60 border-b border-outline-variant/30 px-4 sm:px-5 py-3 flex items-center gap-2">
        <div className="flex items-center gap-1.5 opacity-60 shrink-0" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
        </div>
        <span className="ml-3 font-mono text-xs text-on-surface-variant/80 truncate">
          {data.windowTitle}
        </span>
      </div>

      <div className="p-5 sm:p-8 bg-surface-container-lowest">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-surface-container-high gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-medium whitespace-nowrap shrink-0">
              {data.branchName}
            </span>
            <span className="text-on-surface-variant text-xs sm:text-sm font-normal whitespace-nowrap truncate">
              {data.metaText}
            </span>
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs sm:text-sm font-medium hover:bg-surface-container transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="whitespace-nowrap">{data.buttonLabel}</span>
              {dropdownOpen ? (
                <ChevronUp className="w-4 h-4 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 shrink-0" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-11 w-48 rounded-lg bg-surface-container-lowest border border-outline-variant/40 shadow-[0_12px_32px_-4px_rgba(28,25,23,0.08)] py-1.5 z-10">
                {data.menuItems.map((item) => {
                  const isSelected = selectedItem === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedItem(item.id);
                        if (item.id === 'create-new-file') {
                          onSelectCreate();
                        }
                      }}
                      className={`w-full text-left px-4 py-2.5 flex items-center justify-between text-sm transition-colors whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? 'bg-surface-container-low/80 text-on-surface font-medium border-l-2 border-primary'
                          : 'text-on-surface-variant/85 hover:bg-surface-container-low/40 hover:text-on-surface'
                      }`}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-lg bg-surface-container-low/40 border border-outline-variant/30 text-center">
          <p className="font-mono text-xs text-on-surface-variant/90 leading-relaxed">
            {data.hintText}
          </p>
        </div>
      </div>
    </div>
  );
}

function EditorMockup({
  data,
  onInteract,
}: {
  data: EditorMockupData;
  onInteract: () => void;
}) {
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');
  const [fileName, setFileName] = useState(data.defaultFileName);

  return (
    <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] overflow-hidden">
      <div className="bg-surface-container-high/60 border-b border-outline-variant/30 px-4 sm:px-5 py-3 flex items-center gap-2">
        <div className="flex items-center gap-1.5 opacity-60 shrink-0" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
        </div>
        <span className="ml-3 font-mono text-xs text-on-surface-variant/80 truncate">
          {data.windowTitle}
        </span>
      </div>

      <div className="p-5 sm:p-8 bg-surface-container-lowest">
        <div className="flex items-center gap-2 mb-6 p-2 rounded-lg bg-surface-container-low/60 border border-outline-variant/30">
          <span className="font-mono text-xs text-on-surface-variant/80 pl-1.5 whitespace-nowrap shrink-0">
            {data.repoPrefix}
          </span>
          <div className="relative flex-1 min-w-0">
            <input
              aria-label="File name"
              className="w-full font-mono text-xs px-3 py-1.5 rounded bg-surface-container-lowest text-on-surface border border-outline-variant/40 focus:outline-none focus:border-primary"
              type="text"
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
                onInteract();
              }}
            />
          </div>
        </div>

        <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low/20 p-4 sm:p-5">
          <div
            className="flex items-center gap-4 text-on-surface-variant/70 pb-3 mb-4 border-b border-outline-variant/20 text-[11px] font-semibold uppercase tracking-[0.08em]"
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'edit'}
              onClick={() => {
                setTab('edit');
                onInteract();
              }}
              className={`pb-0.5 transition-colors whitespace-nowrap cursor-pointer ${
                tab === 'edit'
                  ? 'text-on-surface font-medium border-b border-primary'
                  : 'text-on-surface-variant/70 hover:text-on-surface'
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'preview'}
              onClick={() => {
                setTab('preview');
                onInteract();
              }}
              className={`pb-0.5 transition-colors whitespace-nowrap cursor-pointer ${
                tab === 'preview'
                  ? 'text-on-surface font-medium border-b border-primary'
                  : 'text-on-surface-variant/70 hover:text-on-surface'
              }`}
            >
              Preview
            </button>
          </div>

          {tab === 'edit' ? (
            <div className="font-mono text-xs space-y-1.5 text-on-surface font-normal leading-relaxed">
              {data.defaultLines.map((line, i) =>
                line.isBlank ? (
                  <p key={i} className="h-3" aria-hidden="true" />
                ) : (
                  <p key={i} className={line.prefix ? 'text-on-surface' : 'text-on-surface-variant/90'}>
                    {line.prefix && (
                      <span className="text-primary font-medium">{line.prefix} </span>
                    )}
                    <span>{line.text}</span>
                    {line.hasCursor && (
                      <span
                        className="inline-block w-1.5 h-3.5 bg-primary ml-1 align-middle"
                        aria-hidden="true"
                      />
                    )}
                  </p>
                )
              )}
            </div>
          ) : (
            <div className="space-y-2.5 text-on-surface">
              <h4 className="text-lg font-semibold text-on-surface">My First Project</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                A minimal repository to explore Git and GitHub without intimidation.
              </p>
              <h5 className="text-sm font-semibold text-on-surface pt-1">Welcome</h5>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                This file was authored directly in the browser.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CommitMockup({
  data,
  onCommit,
}: {
  data: CommitMockupData;
  onCommit: () => void;
}) {
  const [title, setTitle] = useState(data.defaultTitle);
  const [description, setDescription] = useState(data.defaultDescription);
  const [committed, setCommitted] = useState(false);

  return (
    <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] overflow-hidden">
      <div className="bg-surface-container-high/60 border-b border-outline-variant/30 px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 opacity-60 shrink-0" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
        </div>
        <span className="font-mono text-xs text-on-surface-variant/80 whitespace-nowrap">
          {data.windowTitle}
        </span>
      </div>

      <div className="p-5 sm:p-8 bg-surface-container-lowest">
        <h3 className="text-[18px] font-medium text-on-surface mb-5">{data.heading}</h3>

        <div className="space-y-5">
          <div>
            <label className="block text-[11px] font-semibold text-on-surface-variant/80 mb-2 uppercase tracking-[0.08em]">
              {data.titleLabel}
            </label>
            <input
              className="w-full font-mono text-xs px-3.5 py-2.5 rounded-lg bg-surface-container-low/50 border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (committed) setCommitted(false);
              }}
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-on-surface-variant/80 mb-2 uppercase tracking-[0.08em]">
              {data.descriptionLabel}
            </label>
            <textarea
              className="w-full font-mono text-xs px-3.5 py-2.5 rounded-lg bg-surface-container-low/50 border border-outline-variant/30 text-on-surface-variant focus:outline-none focus:border-primary resize-none leading-relaxed"
              rows={2}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (committed) setCommitted(false);
              }}
            />
          </div>

          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-surface-container-high">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary shrink-0" aria-hidden="true" />
              <span className="text-xs text-on-surface-variant">
                {data.branchPrefix}{' '}
                <code className="font-mono text-on-surface whitespace-nowrap">
                  {data.branchName}
                </code>{' '}
                {data.branchSuffix}
              </span>
            </div>

            {committed ? (
              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary-container/50 border border-secondary/30 text-on-secondary-container text-xs font-medium whitespace-nowrap">
                  <Check className="w-3.5 h-3.5" />
                  <span>{data.submittedLabel}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setCommitted(false)}
                  aria-label="Reset commit form"
                  className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setCommitted(true);
                  onCommit();
                }}
                className="px-5 py-2.5 sm:py-2 rounded-lg bg-secondary text-on-secondary text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
              >
                {data.submitLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BranchDropdownMockup({
  data,
  onInteract,
}: {
  data: BranchDropdownMockupData;
  onInteract: () => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] overflow-hidden">
      <div className="bg-surface-container-high/60 border-b border-outline-variant/30 px-4 sm:px-5 py-3 flex items-center gap-2">
        <div className="flex items-center gap-1.5 opacity-60 shrink-0" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
        </div>
        <span className="ml-3 font-mono text-xs text-on-surface-variant/80 truncate">
          {data.windowTitle}
        </span>
      </div>

      <div className="p-5 sm:p-8 bg-surface-container-lowest">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-surface-container-high gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setOpen((prev) => !prev);
                onInteract();
              }}
              aria-expanded={open}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low border border-primary/50 font-mono text-xs text-on-surface font-medium whitespace-nowrap shrink-0 cursor-pointer"
            >
              <GitBranch className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span className="whitespace-nowrap">{data.branchName}</span>
              <ChevronDown className="w-3.5 h-3.5 shrink-0" />
            </button>

            {open && (
              <div className="mt-2 w-64 rounded-lg bg-surface-container-lowest border border-outline-variant/45 shadow-[0_12px_32px_-4px_rgba(28,25,23,0.08)] p-3 z-10">
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-on-surface-variant/80 mb-2">
                  Switch branches
                </div>
                <div className="px-2.5 py-1.5 rounded bg-surface-container-low/70 border border-outline-variant/35 font-mono text-xs text-on-surface-variant/75 mb-2.5">
                  {data.searchPlaceholder}
                </div>
                <div className="space-y-1">
                  {data.branches.map((branch) => (
                    <div
                      key={branch}
                      className="px-2.5 py-1.5 rounded bg-surface-container-low/60 flex items-center justify-between font-mono text-xs text-on-surface"
                    >
                      <span className="whitespace-nowrap">{branch}</span>
                      <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <span className="text-on-surface-variant text-xs font-normal whitespace-nowrap">
            {data.metaText}
          </span>
        </div>

        <div className="p-5 rounded-lg bg-surface-container-low/40 border border-outline-variant/30 text-center">
          <p className="font-mono text-xs text-on-surface-variant/90 leading-relaxed">
            {data.hintText}
          </p>
        </div>
      </div>
    </div>
  );
}

function BranchCreateMockup({
  data,
  onInteract,
}: {
  data: BranchCreateMockupData;
  onInteract: () => void;
}) {
  const [branchInput, setBranchInput] = useState(data.typedBranchName);
  const [created, setCreated] = useState(false);

  const cleanName = branchInput.trim().replace(/\s+/g, '-') || data.typedBranchName;

  return (
    <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] overflow-hidden">
      <div className="bg-surface-container-high/60 border-b border-outline-variant/30 px-4 sm:px-5 py-3 flex items-center gap-2">
        <div className="flex items-center gap-1.5 opacity-60 shrink-0" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
        </div>
        <span className="ml-3 font-mono text-xs text-on-surface-variant/80 truncate">
          {data.windowTitle}
        </span>
      </div>

      <div className="p-5 sm:p-8 bg-surface-container-lowest space-y-5">
        <div className="max-w-sm mx-auto rounded-lg bg-surface-container-lowest border border-outline-variant/45 shadow-sm p-4 space-y-3">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-on-surface-variant">
            Find or create a branch
          </label>
          <input
            type="text"
            aria-label="New branch name"
            value={branchInput}
            onChange={(e) => {
              setBranchInput(e.target.value);
              setCreated(false);
            }}
            className="w-full font-mono text-xs px-3 py-2 rounded bg-surface-container-low/60 border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary"
          />

          <button
            type="button"
            onClick={() => {
              setCreated(true);
              onInteract();
            }}
            className={`w-full text-left px-3 py-2.5 rounded-md border flex items-center gap-2 text-xs transition-colors cursor-pointer ${
              created
                ? 'bg-secondary-container/30 border-secondary/40 text-on-surface font-medium'
                : 'bg-surface-container-low/80 border-l-2 border-l-primary border-outline-variant/35 text-on-surface hover:bg-surface-container'
            }`}
          >
            {created ? (
              <Check className="w-4 h-4 text-secondary shrink-0" />
            ) : (
              <Plus className="w-4 h-4 text-primary shrink-0" />
            )}
            <span className="truncate">
              Create branch:{' '}
              <code className="font-mono font-semibold">{cleanName}</code> from{' '}
              <code className="font-mono">{data.baseBranch}</code>
            </span>
          </button>
        </div>

        <p className="text-center font-mono text-xs text-on-surface-variant/85 leading-relaxed">
          {data.hintText}
        </p>
      </div>
    </div>
  );
}

function BranchSwitchMockup({
  data,
  onInteract,
}: {
  data: BranchSwitchMockupData;
  onInteract: () => void;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] overflow-hidden">
      <div className="bg-surface-container-high/60 border-b border-outline-variant/30 px-4 sm:px-5 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 opacity-60 shrink-0" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
          <span className="w-2 h-2 rounded-full bg-outline" />
        </div>
        <span className="font-mono text-xs text-on-surface-variant/80 truncate">
          {data.windowTitle}
        </span>
      </div>

      <div className="p-5 sm:p-8 bg-surface-container-lowest space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-surface-container-high">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary-fixed/40 border border-primary/35 font-mono text-xs text-primary font-medium whitespace-nowrap">
            <GitBranch className="w-3.5 h-3.5 shrink-0" />
            <span>{data.activeBranch}</span>
          </div>
          <span className="text-xs text-secondary font-medium">{data.statusText}</span>
        </div>

        <div className="rounded-lg border border-outline-variant/35 bg-surface-container-low/30 p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-on-surface">
            <FileText className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span>{data.fileName}</span>
          </div>
          <div className="px-3 py-2 rounded bg-surface-container-lowest border border-outline-variant/30 font-mono text-xs text-on-surface-variant">
            {data.commitTitle}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <span className="text-xs text-on-surface-variant">
              Saving to <code className="font-mono text-primary">{data.activeBranch}</code> (not{' '}
              <code className="font-mono">{data.baseBranch}</code>)
            </span>
            <button
              type="button"
              onClick={() => {
                setSaved(true);
                onInteract();
              }}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                saved
                  ? 'bg-secondary-container/40 border border-secondary/35 text-on-secondary-container'
                  : 'bg-secondary text-on-secondary hover:opacity-90'
              }`}
            >
              {saved ? 'Saved on branch' : 'Commit changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StepArticleProps {
  lessonId: string;
  lessonTitle: string;
  step: LessonStep;
  onStepActionComplete: (stepId: string) => void;
  scrollToStep: (id: string) => void;
}

function StepArticle({
  lessonId,
  lessonTitle,
  step,
  onStepActionComplete,
  scrollToStep,
}: StepArticleProps) {
  const { activeSectionId, activeUnitId } = useSpeech();
  const isTextRight = step.align === 'text-right';
  const stepTitle = `${step.titlePrefix}${step.titleBold ?? ''}${step.titleSuffix ?? ''}${step.titleCodePill ? ` ${step.titleCodePill}` : ''}`.trim();
  const stepSectionText = `${step.eyebrow}: ${stepTitle}\n${step.description}\n${step.callout.label} ${step.callout.text}`;
  const sectionId = `${lessonId}-${step.id}`;
  const calloutSectionId = `${step.id}-callout`;

  const isTranslatingStep = useSectionShimmer(step.id);
  const isTranslatingCallout = useSectionShimmer(calloutSectionId);

  const buildStepUnits = (): SpeechUnit[] => {
    const titleSpeech = `${step.titlePrefix}${step.titleBold ?? ''}${step.titleSuffix ?? ''}${
      step.titleCodePill ? ' code example' : ''
    }`.trim();

    const units: SpeechUnit[] = [
      {
        id: `${sectionId}-title`,
        text: stepTitle,
        speechText: sanitizeTextForSpeech(titleSpeech),
      },
      ...buildSentenceUnits(`${sectionId}-desc`, step.description),
      {
        id: `${sectionId}-callout-label`,
        text: step.callout.label,
        speechText: sanitizeTextForSpeech(step.callout.label),
      },
      ...buildSentenceUnits(`${sectionId}-callout-body`, step.callout.text),
    ];

    if (step.mockup.kind === 'file-editor') {
      units.push({
        id: `${sectionId}-editor-code`,
        text: 'Code example',
        speechText: 'Code example.',
        isCodeBlock: true,
      });
    }

    return units;
  };

  const isEditorCodeHighlighted =
    activeSectionId === sectionId && activeUnitId === `${sectionId}-editor-code`;

  const textBlock = (
    <div
      className={`lg:col-span-6 flex flex-col items-start ${
        isTextRight ? 'order-1 lg:order-2' : ''
      }`}
    >
      <div
        className={`w-full rounded-xl ${
          isTranslatingStep ? 'translate-section-shimmer' : ''
        }`}
      >
        <div className="w-full flex flex-wrap items-center justify-between gap-2.5 mb-3 sm:mb-4">
          <span className="text-xs tracking-[0.12em] text-primary font-semibold uppercase">
            {step.eyebrow}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <SectionTranslationPill sectionId={step.id} />
            <SectionListenButton
              sectionId={sectionId}
              sectionLabel={stepTitle}
              getUnits={buildStepUnits}
            />
            <AskAboutButton
              sectionId={`${lessonId}-${step.id}`}
              topic={stepTitle}
              sectionText={stepSectionText}
            />
          </div>
        </div>

        <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.32] font-normal text-on-surface tracking-[-0.015em] mb-5 sm:mb-6">
          <SpeakableHighlight sectionId={sectionId} unitId={`${sectionId}-title`}>
            <span>{step.titlePrefix}</span>
            {step.titleBold && <span className="font-medium">{step.titleBold}</span>}
            {step.titleSuffix && <span>{step.titleSuffix}</span>}
            {step.titleCodePill && (
              <>
                {' '}
                <code className="font-mono text-[15px] font-normal px-2.5 py-1 rounded bg-surface-container-low border border-outline-variant/40 text-on-surface inline-block align-middle leading-tight whitespace-nowrap">
                  {step.titleCodePill}
                </code>
              </>
            )}
          </SpeakableHighlight>
        </h2>

        <p className="text-[16px] sm:text-[17px] leading-[1.7] text-on-surface-variant mb-7 sm:mb-8 max-w-[58ch]">
          <SpeakableText
            sectionId={sectionId}
            unitPrefix={`${sectionId}-desc`}
            text={step.description}
          />
        </p>
      </div>

      <div
        id={calloutSectionId}
        data-translate-section={calloutSectionId}
        className={`w-full border-l-2 border-primary/70 bg-surface-container-low/50 p-4 sm:p-5 rounded-r-lg ${
          isTranslatingCallout ? 'translate-section-shimmer' : ''
        }`}
      >
        <div className="flex items-start gap-3.5">
          <CalloutIcon icon={step.callout.icon} />
          <div className="flex-1 min-w-0 space-y-2">
            <p className="text-sm text-on-surface leading-relaxed">
              <SpeakableHighlight
                sectionId={sectionId}
                unitId={`${sectionId}-callout-label`}
                className="font-medium text-on-surface"
              >
                {step.callout.label}
              </SpeakableHighlight>{' '}
              <SpeakableText
                sectionId={sectionId}
                unitPrefix={`${sectionId}-callout-body`}
                text={step.callout.text}
              />
            </p>
            <div className="flex justify-end">
              <SectionTranslationPill sectionId={calloutSectionId} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const mockupBlock = (
    <div
      className={`lg:col-span-6 min-w-0 rounded-xl transition-all ${
        isTextRight ? 'order-2 lg:order-1' : ''
      } ${isEditorCodeHighlighted ? 'ring-2 ring-primary/45' : ''}`}
    >
      {step.mockup.kind === 'add-file-dropdown' &&
        (step.mockup.screenshots && step.mockup.screenshots.length > 0 ? (
          <div
            className="space-y-5"
            onClick={() => onStepActionComplete(step.id)}
          >
            {step.mockup.screenshots.map((shot) => (
              <ScreenshotFrame
                key={shot.id || shot.src}
                src={shot.src}
                alt={shot.alt}
                caption={shot.caption}
                markers={shot.markers}
              />
            ))}
          </div>
        ) : (
          <AddFileMockup
            data={step.mockup}
            onSelectCreate={() => {
              onStepActionComplete(step.id);
              scrollToStep('step-02');
            }}
          />
        ))}
      {step.mockup.kind === 'file-editor' &&
        (step.mockup.screenshots && step.mockup.screenshots.length > 0 ? (
          <div
            className="space-y-5"
            onClick={() => onStepActionComplete(step.id)}
          >
            {step.mockup.screenshots.map((shot) => (
              <ScreenshotFrame
                key={shot.id || shot.src}
                src={shot.src}
                alt={shot.alt}
                caption={shot.caption}
                markers={shot.markers}
              />
            ))}
          </div>
        ) : (
          <EditorMockup
            data={step.mockup}
            onInteract={() => onStepActionComplete(step.id)}
          />
        ))}
      {step.mockup.kind === 'commit-modal' && (
        <CommitMockup
          data={step.mockup}
          onCommit={() => onStepActionComplete(step.id)}
        />
      )}
      {step.mockup.kind === 'branch-dropdown' &&
        (step.mockup.screenshots && step.mockup.screenshots.length > 0 ? (
          <div
            className="space-y-5"
            onClick={() => onStepActionComplete(step.id)}
          >
            {step.mockup.screenshots.map((shot) => (
              <ScreenshotFrame
                key={shot.id || shot.src}
                src={shot.src}
                alt={shot.alt}
                caption={shot.caption}
                markers={shot.markers}
              />
            ))}
          </div>
        ) : (
          <BranchDropdownMockup
            data={step.mockup}
            onInteract={() => onStepActionComplete(step.id)}
          />
        ))}
      {step.mockup.kind === 'branch-create' &&
        (step.mockup.screenshots && step.mockup.screenshots.length > 0 ? (
          <div
            className="space-y-5"
            onClick={() => onStepActionComplete(step.id)}
          >
            {step.mockup.screenshots.map((shot) => (
              <ScreenshotFrame
                key={shot.id || shot.src}
                src={shot.src}
                alt={shot.alt}
                caption={shot.caption}
                markers={shot.markers}
              />
            ))}
          </div>
        ) : (
          <BranchCreateMockup
            data={step.mockup}
            onInteract={() => onStepActionComplete(step.id)}
          />
        ))}
      {step.mockup.kind === 'branch-switch' && (
        <BranchSwitchMockup
          data={step.mockup}
          onInteract={() => onStepActionComplete(step.id)}
        />
      )}
    </div>
  );

  return (
    <article
      id={step.id}
      data-translate-section={step.id}
      data-section-title={stepTitle}
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center scroll-mt-24"
    >
      {isTextRight ? (
        <>
          {mockupBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {mockupBlock}
        </>
      )}
      <div className="lg:col-span-12 order-3">
        <SectionFeedbackWidget
          lessonId={lessonId}
          lessonTitle={lessonTitle}
          sectionId={step.id}
          sectionTitle={stepTitle}
          className="!mt-0"
        />
      </div>
    </article>
  );
}

export function StepSection({
  lessonId = 'lesson',
  lessonTitle = 'Lesson',
  steps,
  onStepActionComplete,
}: StepSectionProps) {
  const scrollToStep = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col gap-20 sm:gap-28 lg:gap-32 py-10 sm:py-16">
      {steps.map((step) => (
        <StepArticle
          key={step.id}
          lessonId={lessonId}
          lessonTitle={lessonTitle}
          step={step}
          onStepActionComplete={onStepActionComplete}
          scrollToStep={scrollToStep}
        />
      ))}
    </div>
  );
}
