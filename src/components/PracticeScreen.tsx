import { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  GitBranch,
  ChevronDown,
  History,
  FileText,
  FolderOpen,
  RotateCcw,
  Plus,
  Upload,
  Check,
} from 'lucide-react';
import type { PracticeData } from '../types/lesson';
import { AskAboutButton } from './AskAboutButton';
import { SectionFeedbackWidget } from './SectionFeedbackWidget';
import {
  SectionListenButton,
  SpeakableHighlight,
  SpeakableText,
} from './SectionListenButton';
import { SectionTranslationPill, useSectionShimmer } from './SectionTranslationPill';
import { useSpeech } from '../context/SpeechContext';
import {
  buildSentenceUnits,
  sanitizeTextForSpeech,
  type SpeechUnit,
} from '../utils/speech';

interface PracticeScreenProps {
  lessonId?: string;
  lessonTitle?: string;
  data: PracticeData;
  onPracticeComplete: () => void;
}

type FeedbackState =
  | { kind: 'info'; text: string }
  | { kind: 'hint'; text: string }
  | { kind: 'success'; text: string };

export function PracticeScreen({
  lessonId = 'lesson',
  lessonTitle = 'Lesson',
  data,
  onPracticeComplete,
}: PracticeScreenProps) {
  const isBranchMode = data.mode === 'create-branch';

  const [stageIndex, setStageIndex] = useState(0); // 0..3 active, 4 completed
  const [addFileOpen, setAddFileOpen] = useState(false);
  const [branchMenuOpen, setBranchMenuOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [branchInput, setBranchInput] = useState('');
  const [fileContent, setFileContent] = useState(data.defaultFileContent);
  const [commitMessage, setCommitMessage] = useState(data.defaultCommitMessage);
  const [feedback, setFeedback] = useState<FeedbackState>({
    kind: 'info',
    text: data.stages[0].instruction,
  });

  const isCompleted = stageIndex >= data.stages.length;
  const activeStage = data.stages[Math.min(stageIndex, data.stages.length - 1)];

  const handleWrongClick = (hint: string) => {
    setFeedback({ kind: 'hint', text: hint });
  };

  // --- Mode 1: Add file handlers ---
  const handleClickAddFile = () => {
    if (isBranchMode) {
      if (!isCompleted) {
        handleWrongClick(
          'In this practice, we are creating a new branch first. Click the “main” dropdown on the left!'
        );
      }
      return;
    }

    if (stageIndex === 0) {
      setAddFileOpen(true);
      setStageIndex(1);
      setFeedback({
        kind: 'success',
        text: `${data.stages[0].successMessage} Now: ${data.stages[1].instruction}`,
      });
    } else if (stageIndex === 1) {
      setAddFileOpen((prev) => !prev);
      handleWrongClick(
        'The “Add file” menu is open—click “Create new file” inside the dropdown.'
      );
    }
  };

  const handleClickCreateNewFile = () => {
    if (stageIndex === 1 && !isBranchMode) {
      setAddFileOpen(false);
      setStageIndex(2);
      setFeedback({
        kind: 'success',
        text: `${data.stages[1].successMessage} Next: ${data.stages[2].instruction}`,
      });
    }
  };

  const confirmFileName = (nameToCheck: string) => {
    const trimmed = nameToCheck.trim();
    if (!trimmed) {
      handleWrongClick('Type a file name like README.md before moving on.');
      return false;
    }
    if (stageIndex === 2 && !isBranchMode) {
      setStageIndex(3);
      setFeedback({
        kind: 'success',
        text: `${data.stages[2].successMessage} Next: ${data.stages[3].instruction}`,
      });
      return true;
    }
    return true;
  };

  const handleFileNameChange = (value: string) => {
    setFileName(value);
    const trimmed = value.trim();
    if (stageIndex === 2 && !isBranchMode && /^[a-zA-Z0-9._-]+\.[a-zA-Z0-9]{1,8}$/.test(trimmed)) {
      setStageIndex(3);
      setFeedback({
        kind: 'success',
        text: `${data.stages[2].successMessage} Next: ${data.stages[3].instruction}`,
      });
    }
  };

  // --- Mode 2: Create branch handlers ---
  const handleClickBranchDropdown = () => {
    if (!isBranchMode) {
      if (!isCompleted) {
        handleWrongClick(
          'Close! That switches branches. Look to the right for the “Add file” button.'
        );
      }
      return;
    }

    if (stageIndex === 0) {
      setBranchMenuOpen(true);
      setStageIndex(1);
      setFeedback({
        kind: 'success',
        text: `${data.stages[0].successMessage} Next: ${data.stages[1].instruction}`,
      });
    } else if (stageIndex === 1 || stageIndex === 2) {
      setBranchMenuOpen(true);
      handleWrongClick(
        stageIndex === 1
          ? 'Type a new branch name like welcome-update in the search box below.'
          : 'Now click “Create branch” in the open menu below.'
      );
    }
  };

  const sanitizeBranchName = (raw: string) =>
    raw
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9._/-]/g, '');

  const handleBranchInputChange = (value: string) => {
    setBranchInput(value);
    const cleaned = sanitizeBranchName(value);
    if (stageIndex === 1 && isBranchMode && cleaned.length >= 3 && cleaned !== data.branchName) {
      setStageIndex(2);
      setFeedback({
        kind: 'success',
        text: `${data.stages[1].successMessage} Next: ${data.stages[2].instruction}`,
      });
    }
  };

  const handleCreateBranchClick = () => {
    if (!isBranchMode) return;
    if (stageIndex === 1) {
      const cleaned = sanitizeBranchName(branchInput);
      if (cleaned.length < 2 || cleaned === data.branchName) {
        handleWrongClick('Type a new branch name such as welcome-update first.');
        return;
      }
      setStageIndex(2);
    }
    if (stageIndex === 2 || stageIndex === 1) {
      setBranchMenuOpen(false);
      setStageIndex(3);
      setFeedback({
        kind: 'success',
        text: `${data.stages[2].successMessage} Next: ${data.stages[3].instruction}`,
      });
    }
  };

  // --- Shared Commit Handler ---
  const handleCommitClick = () => {
    if (!isBranchMode && stageIndex === 2) {
      if (fileName.trim().length > 0) {
        confirmFileName(fileName);
        return;
      }
      handleWrongClick(
        'Almost! First type a file name such as README.md in the filename field at the top.'
      );
      return;
    }

    if (stageIndex === 3) {
      setStageIndex(4);
      setFeedback({
        kind: 'success',
        text: data.stages[3].successMessage,
      });
      onPracticeComplete();
    }
  };

  const handleReset = () => {
    setStageIndex(0);
    setAddFileOpen(false);
    setBranchMenuOpen(false);
    setFileName('');
    setBranchInput('');
    setFileContent(data.defaultFileContent);
    setCommitMessage(data.defaultCommitMessage);
    setFeedback({
      kind: 'info',
      text: data.stages[0].instruction,
    });
  };

  const committedFileName = fileName.trim() || data.suggestedFileName;
  const activeBranchDisplay =
    isBranchMode && stageIndex >= 3
      ? sanitizeBranchName(branchInput) || data.suggestedBranchName || 'welcome-update'
      : data.branchName;

  const showEditorScreen = !isBranchMode
    ? stageIndex >= 2 && !isCompleted
    : stageIndex === 3 && !isCompleted;

  const { activeSectionId, activeUnitId } = useSpeech();
  const sectionId = `${lessonId}-practice`;
  const isTranslatingPractice = useSectionShimmer('practice');

  const buildPracticeUnits = (): SpeechUnit[] => [
    {
      id: `${sectionId}-title`,
      text: data.title,
      speechText: sanitizeTextForSpeech(data.title),
    },
    ...buildSentenceUnits(`${sectionId}-sub`, data.subtitle),
    ...data.stages.flatMap((stage) =>
      buildSentenceUnits(`${sectionId}-stage-${stage.id}`, stage.instruction)
    ),
  ];

  return (
    <section
      id="practice"
      data-translate-section="practice"
      data-section-title={data.title}
      className={`w-full py-12 sm:py-16 scroll-mt-24 ${
        isTranslatingPractice ? 'translate-section-shimmer' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div className="max-w-2xl">
          <span className="text-xs tracking-[0.12em] text-primary font-semibold uppercase mb-3 block">
            {data.eyebrow}
          </span>
          <h2 className="text-[28px] sm:text-[34px] lg:text-[36px] leading-[1.24] font-normal text-on-surface tracking-[-0.015em] mb-3">
            <SpeakableHighlight sectionId={sectionId} unitId={`${sectionId}-title`}>
              {data.title}
            </SpeakableHighlight>
          </h2>
          <p className="text-[16px] sm:text-[17px] leading-[1.7] text-on-surface-variant">
            <SpeakableText
              sectionId={sectionId}
              unitPrefix={`${sectionId}-sub`}
              text={data.subtitle}
            />
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-end">
          <SectionTranslationPill sectionId="practice" />
          <SectionListenButton
            sectionId={sectionId}
            sectionLabel={data.title}
            getUnits={buildPracticeUnits}
          />
          <AskAboutButton
            sectionId={`${lessonId}-practice`}
            topic={data.title}
            sectionText={[
              data.title,
              data.subtitle,
              ...data.stages.map((s) => `${s.number}. ${s.label}: ${s.instruction}`),
            ].join('\n')}
          />
        </div>
      </div>

      {/* Stage Checklist Strip */}
      <div className="mb-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {data.stages.map((stage, idx) => {
          const done = stageIndex > idx;
          const current = stageIndex === idx;
          const stageHighlighted =
            activeSectionId === sectionId &&
            Boolean(activeUnitId?.startsWith(`${sectionId}-stage-${stage.id}-`));

          return (
            <div
              key={stage.id}
              className={`rounded-lg px-3.5 py-2.5 border flex items-center gap-2.5 text-xs transition-colors ${
                stageHighlighted
                  ? 'bg-primary-fixed/35 border-primary/60 text-on-surface ring-1 ring-primary/25'
                  : done
                    ? 'bg-secondary-container/25 border-secondary/35 text-on-surface'
                    : current
                      ? 'bg-surface-container-lowest border-primary/50 text-on-surface font-medium shadow-xs'
                      : 'bg-surface-container-low/50 border-outline-variant/30 text-on-surface-variant/75'
              }`}
            >
              {done ? (
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              ) : (
                <span
                  className={`font-mono text-[11px] font-semibold tabular-nums shrink-0 ${
                    current ? 'text-primary' : 'text-on-surface-variant/60'
                  }`}
                >
                  0{stage.number}
                </span>
              )}
              <span className="truncate">{stage.label}</span>
            </div>
          );
        })}
      </div>

      {/* Interactive Feedback Banner */}
      <div
        role="status"
        aria-live="polite"
        className={`mb-5 rounded-xl px-4 sm:px-5 py-3.5 border flex items-center justify-between gap-4 transition-colors ${
          feedback.kind === 'success'
            ? 'bg-secondary-container/25 border-secondary/35 text-on-surface'
            : feedback.kind === 'hint'
              ? 'bg-primary-fixed/30 border-primary/35 text-on-surface'
              : 'bg-surface-container-low/70 border-outline-variant/40 text-on-surface'
        }`}
      >
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          {feedback.kind === 'success' ? (
            <CheckCircle2 className="w-[18px] h-[18px] text-secondary shrink-0 mt-0.5 sm:mt-0" />
          ) : feedback.kind === 'hint' ? (
            <AlertCircle className="w-[18px] h-[18px] text-primary shrink-0 mt-0.5 sm:mt-0" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5 sm:mt-0" />
          )}
          <p className="text-xs sm:text-sm leading-relaxed">
            {feedback.kind === 'hint' && (
              <span className="font-semibold text-primary mr-1.5">Friendly hint:</span>
            )}
            {feedback.text}
          </p>
        </div>

        {(stageIndex > 0 || feedback.kind === 'hint') && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Simulated GitHub Repository Window */}
      <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/45 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] overflow-hidden">
        {/* Browser Chrome */}
        <div className="bg-surface-container-high/60 border-b border-outline-variant/30 px-4 sm:px-5 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 opacity-60 shrink-0" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-outline" />
            <span className="w-2 h-2 rounded-full bg-outline" />
            <span className="w-2 h-2 rounded-full bg-outline" />
          </div>
          <div className="flex-1 max-w-md mx-auto bg-surface-container-lowest/85 border border-outline-variant/30 px-3 py-1 rounded text-center">
            <span className="font-mono text-[11px] sm:text-xs text-on-surface-variant truncate block">
              {showEditorScreen && !isBranchMode
                ? `github.com/${data.repoOwner}/${data.repoName}/new/${activeBranchDisplay}`
                : isBranchMode && stageIndex >= 3
                  ? `github.com/${data.repoOwner}/${data.repoName}/tree/${activeBranchDisplay}`
                  : `github.com/${data.repoOwner}/${data.repoName}`}
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] text-on-surface-variant/75 whitespace-nowrap shrink-0">
            Practice mode
          </span>
        </div>

        {/* Fake GitHub Body */}
        {!showEditorScreen ? (
          <div className="p-5 sm:p-8 bg-surface-container-lowest">
            {/* Repo header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-surface-container-high">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[17px] sm:text-[20px] text-on-surface">
                <span className="text-on-surface-variant/70 whitespace-nowrap">
                  {data.repoOwner} /
                </span>
                <span className="font-medium whitespace-nowrap">{data.repoName}</span>
                <span className="text-[11px] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded text-on-surface-variant border border-outline-variant/40 whitespace-nowrap shrink-0">
                  Public
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  !isCompleted &&
                  handleWrongClick(
                    'That shows past commit history. Follow the highlighted step above!'
                  )
                }
                className="flex items-center gap-1.5 text-on-surface-variant/80 hover:text-on-surface font-mono text-xs whitespace-nowrap shrink-0 cursor-pointer"
              >
                <History className="w-3.5 h-3.5" />
                <span>{isCompleted ? '2 commits' : '1 commit'}</span>
              </button>
            </div>

            {/* Repo Toolbar */}
            <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-surface-container-low/70 border border-outline-variant/30 mb-6 gap-2">
              <div className="flex items-center gap-2 min-w-0 relative">
                <button
                  type="button"
                  onClick={handleClickBranchDropdown}
                  aria-expanded={branchMenuOpen}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-lowest border font-mono text-xs text-on-surface hover:bg-surface-container transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isBranchMode && stageIndex === 0
                      ? 'border-primary/60 ring-2 ring-primary/15'
                      : 'border-outline-variant/30'
                  }`}
                >
                  <GitBranch className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span className="whitespace-nowrap">{activeBranchDisplay}</span>
                  <ChevronDown className="w-3 h-3 text-on-surface-variant shrink-0" />
                </button>
                <span className="font-mono text-xs text-on-surface-variant/80 whitespace-nowrap hidden sm:inline">
                  {isBranchMode && isCompleted ? '2 branches' : '1 branch'}
                </span>

                {/* Branch Switcher Dropdown for Lesson 2 */}
                {isBranchMode && branchMenuOpen && !isCompleted && (
                  <div className="absolute left-0 top-10 w-72 sm:w-80 rounded-lg bg-surface-container-lowest border border-outline-variant/50 shadow-[0_12px_32px_-4px_rgba(28,25,23,0.12)] p-3.5 z-20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-on-surface-variant">
                        Switch branches
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleBranchInputChange(data.suggestedBranchName || 'welcome-update')
                        }
                        className="text-[11px] text-primary hover:underline cursor-pointer"
                      >
                        Fill {data.suggestedBranchName || 'welcome-update'}
                      </button>
                    </div>
                    <input
                      type="text"
                      aria-label="Find or create a branch"
                      placeholder="Find or create a branch..."
                      value={branchInput}
                      onChange={(e) => handleBranchInputChange(e.target.value)}
                      className={`w-full font-mono text-xs px-3 py-2 rounded bg-surface-container-low/60 border text-on-surface focus:outline-none ${
                        stageIndex === 1
                          ? 'border-primary/70 ring-2 ring-primary/15'
                          : 'border-outline-variant/40'
                      }`}
                    />

                    {sanitizeBranchName(branchInput).length >= 2 &&
                      sanitizeBranchName(branchInput) !== data.branchName && (
                        <button
                          type="button"
                          onClick={handleCreateBranchClick}
                          className="w-full text-left px-3 py-2.5 rounded-md bg-surface-container-low/80 hover:bg-surface-container border border-outline-variant/40 border-l-2 border-l-primary flex items-center gap-2 text-xs text-on-surface cursor-pointer"
                        >
                          <Plus className="w-4 h-4 text-primary shrink-0" />
                          <span className="truncate">
                            Create branch:{' '}
                            <code className="font-mono font-semibold">
                              {sanitizeBranchName(branchInput)}
                            </code>{' '}
                            from <code className="font-mono">{data.branchName}</code>
                          </span>
                        </button>
                      )}

                    <div className="pt-1 border-t border-outline-variant/25">
                      <div className="px-2.5 py-1.5 rounded bg-surface-container-low/50 flex items-center justify-between font-mono text-xs text-on-surface">
                        <span>{data.branchName}</span>
                        <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleClickAddFile}
                    aria-expanded={addFileOpen}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      !isBranchMode && stageIndex === 0
                        ? 'bg-surface-container-lowest border-primary/60 text-on-surface ring-2 ring-primary/15 hover:bg-surface-container-low'
                        : 'bg-surface-container-lowest border-outline-variant/50 text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <span className="whitespace-nowrap">Add file</span>
                    <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                  </button>

                  {!isBranchMode && addFileOpen && !isCompleted && (
                    <div className="absolute right-0 top-10 w-52 rounded-lg bg-surface-container-lowest border border-outline-variant/50 shadow-[0_12px_32px_-4px_rgba(28,25,23,0.1)] py-1.5 z-20">
                      <button
                        type="button"
                        onClick={handleClickCreateNewFile}
                        className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 text-sm text-on-surface font-medium bg-surface-container-low/60 hover:bg-surface-container-low border-l-2 border-primary transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-primary shrink-0" />
                        <span className="whitespace-nowrap">Create new file</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleWrongClick(
                            '“Upload files” is for files already saved on your computer. Click “Create new file” instead!'
                          )
                        }
                        className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/40 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <Upload className="w-4 h-4 shrink-0" />
                        <span className="whitespace-nowrap">Upload files</span>
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    !isCompleted &&
                    handleWrongClick(
                      isBranchMode
                        ? '“Code” downloads files. To create a branch, click the “main” dropdown on the left.'
                        : 'The “Code” button is for downloading the project. To make a new file, click “Add file”.'
                    )
                  }
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-secondary text-on-secondary text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Code</span>
                  <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            </div>

            {/* File list / Empty state */}
            {isCompleted ? (
              <div className="space-y-4">
                <div className="rounded-lg border border-outline-variant/40 overflow-hidden">
                  <div className="bg-surface-container-low/70 px-4 py-2.5 border-b border-outline-variant/30 flex items-center justify-between text-xs">
                    <span className="font-mono text-on-surface">
                      {data.repoOwner} · {commitMessage || data.defaultCommitMessage}
                    </span>
                    <span className="font-mono text-on-surface-variant">just now</span>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between bg-surface-container-lowest">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-secondary shrink-0" />
                      <span className="font-mono text-xs font-medium text-on-surface">
                        {committedFileName}
                      </span>
                    </div>
                    <span className="text-xs text-on-surface-variant truncate max-w-[200px]">
                      {commitMessage || data.defaultCommitMessage}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg border border-secondary/35 bg-secondary-container/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-on-surface">
                        {isBranchMode
                          ? `Practice complete! Your commit is saved on ${activeBranchDisplay}.`
                          : `Practice complete! You added ${committedFileName} to ${data.branchName}.`}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {isBranchMode
                          ? 'Your main branch remained completely untouched while you worked.'
                          : 'GitHub will now render this file right on your repository homepage.'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-xs font-medium text-on-surface hover:bg-surface-container-low transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Practice again</span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() =>
                  handleWrongClick(
                    isBranchMode
                      ? stageIndex === 0
                        ? 'Click the “main” dropdown button at the top left of the toolbar.'
                        : activeStage.instruction
                      : stageIndex === 0
                        ? 'This is just the empty preview area. Click the “Add file” button above on the right.'
                        : 'Choose “Create new file” from the open dropdown menu above.'
                  )
                }
                className="rounded-lg border border-dashed border-outline-variant/60 px-5 py-10 text-center flex flex-col items-center justify-center bg-surface-container-low/30 cursor-pointer hover:bg-surface-container-low/45 transition-colors"
              >
                <FolderOpen className="w-7 h-7 text-outline mb-3" strokeWidth={1.6} />
                <p className="text-base font-medium text-on-surface mb-1">
                  {isBranchMode
                    ? 'Ready to branch off main'
                    : 'This repository is waiting for its first file'}
                </p>
                <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
                  {activeStage.instruction}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Editor + Commit Panel (Lesson 1 Stages 2-3, Lesson 2 Stage 3) */
          <div className="p-5 sm:p-8 bg-surface-container-lowest space-y-6">
            {isBranchMode ? (
              <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-primary-fixed/25 border border-primary/30 text-xs">
                <div className="flex items-center gap-2 font-mono text-primary font-medium">
                  <GitBranch className="w-4 h-4 shrink-0" />
                  <span>Active branch: {activeBranchDisplay}</span>
                </div>
                <span className="text-on-surface-variant">Editing {data.suggestedFileName}</span>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-surface-container-low/60 border border-outline-variant/35">
                  <span className="font-mono text-xs text-on-surface-variant pl-1 whitespace-nowrap">
                    {data.repoName} /
                  </span>
                  <input
                    type="text"
                    aria-label="New file name"
                    placeholder="Name your file... (e.g. README.md)"
                    value={fileName}
                    onChange={(e) => handleFileNameChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        confirmFileName(fileName);
                      }
                    }}
                    className={`flex-1 min-w-[160px] font-mono text-xs px-3 py-2 rounded bg-surface-container-lowest text-on-surface border focus:outline-none ${
                      stageIndex === 2
                        ? 'border-primary/70 ring-2 ring-primary/15'
                        : 'border-secondary/50'
                    }`}
                  />
                  {stageIndex === 2 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (!fileName.trim()) {
                          handleFileNameChange(data.suggestedFileName);
                        } else {
                          confirmFileName(fileName);
                        }
                      }}
                      className="px-3 py-1.5 rounded bg-surface-container-lowest border border-outline-variant/50 text-xs font-medium text-on-surface hover:bg-surface-container-low transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {fileName.trim() ? 'Use this name' : `Fill ${data.suggestedFileName}`}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-secondary-container/40 text-on-secondary-container text-xs font-medium whitespace-nowrap shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Named</span>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* File Content Box */}
            <div className="rounded-lg border border-outline-variant/35 bg-surface-container-low/20 p-4">
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-outline-variant/25">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-on-surface border-b border-primary pb-0.5">
                  Edit {isBranchMode ? data.suggestedFileName : 'new file'}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleWrongClick(
                      !isBranchMode && stageIndex === 2
                        ? 'First give your file a name in the box above (like README.md).'
                        : 'Your file is ready—click the green “Commit changes” button below!'
                    )
                  }
                  className="text-[11px] font-semibold uppercase tracking-[0.08em] text-on-surface-variant/75 hover:text-on-surface cursor-pointer"
                >
                  Preview
                </button>
              </div>
              <textarea
                aria-label="File contents"
                rows={4}
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                className="w-full font-mono text-xs bg-transparent text-on-surface focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Commit Panel */}
            <div className="rounded-lg border border-outline-variant/40 bg-surface-container-low/40 p-4 sm:p-5 space-y-4">
              <h3 className="text-sm font-medium text-on-surface">Commit changes</h3>
              <input
                type="text"
                aria-label="Commit message"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                className="w-full font-mono text-xs px-3.5 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary"
              />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                  <span>
                    Commit directly to{' '}
                    <code className="font-mono text-on-surface">{activeBranchDisplay}</code> branch
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleWrongClick(
                        'Don’t cancel now! Finish saving your file by clicking “Commit changes”.'
                      )
                    }
                    className="px-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-xs text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCommitClick}
                    className={`px-5 py-2 rounded-lg bg-secondary text-on-secondary text-xs font-medium hover:opacity-90 transition-all whitespace-nowrap cursor-pointer ${
                      stageIndex === 3 ? 'ring-2 ring-secondary/30' : ''
                    }`}
                  >
                    Commit changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <SectionFeedbackWidget
        lessonId={lessonId}
        lessonTitle={lessonTitle}
        sectionId="practice"
        sectionTitle={data.title}
      />
    </section>
  );
}
