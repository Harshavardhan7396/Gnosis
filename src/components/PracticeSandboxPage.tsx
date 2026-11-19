import {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type DragEvent,
} from 'react';
import {
  ArrowLeft,
  Award,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  Code2,
  Eye,
  FileText,
  FolderOpen,
  GitBranch,
  History,
  Image as ImageIcon,
  Info,
  Lightbulb,
  Paperclip,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react';
import { MarkdownPreview } from './MarkdownPreview';
import { AskAboutButton } from './AskAboutButton';

interface SandboxFile {
  id: string;
  name: string;
  content: string;
  kind: 'text' | 'image';
  mimeType?: string;
  branch: string;
  lastCommitMessage: string;
  updatedAt: string;
}

interface SandboxCommit {
  id: string;
  message: string;
  description?: string;
  branch: string;
  fileNames: string[];
  createdAt: string;
}

interface SandboxState {
  branches: string[];
  activeBranch: string;
  files: SandboxFile[];
  commits: SandboxCommit[];
  completedChallengeIds: string[];
  latestCelebrationId: string | null;
}

interface StagedUpload {
  id: string;
  name: string;
  content: string;
  kind: 'text' | 'image';
  mimeType: string;
  sizeBytes: number;
}

type SandboxViewMode = 'repo' | 'create' | 'upload' | 'view-file' | 'commits';

type HighlightTarget =
  | 'add-file-btn'
  | 'create-new-file-item'
  | 'file-name-input'
  | 'open-commit-box-btn'
  | 'commit-submit-btn'
  | 'commit-message-input'
  | 'readme-file-row'
  | 'branch-selector-btn'
  | 'new-branch-input'
  | 'main-branch-option'
  | null;

interface GuidedChallengeDef {
  id: string;
  number: number;
  title: string;
  description: string;
  explanation: string;
  badgeTitle: string;
  lessonCredit: string;
}

const GUIDED_CHALLENGES: GuidedChallengeDef[] = [
  {
    id: 'challenge-1',
    number: 1,
    title: 'Create README.md and commit to main',
    description: 'Use Add file → Create new file, name it README.md, and commit it to main.',
    explanation:
      'You just made a commit: a save point! GitHub stored your README.md on the main timeline with a note explaining what you added.',
    badgeTitle: 'First Save Point',
    lessonCredit: 'Counts toward Lesson 5 progress',
  },
  {
    id: 'challenge-2',
    number: 2,
    title: 'Edit README.md with a clear commit',
    description: 'Open README.md, edit its text, and commit again with a clear message.',
    explanation:
      'You just updated a tracked file and recorded a new checkpoint. Now GitHub remembers both versions safely.',
    badgeTitle: 'Clear Historian',
    lessonCredit: 'Counts toward Lesson 6 progress',
  },
  {
    id: 'challenge-3',
    number: 3,
    title: 'Branch into "my-experiment" and add a file',
    description:
      'Use the branch selector to create "my-experiment", add a new file on it, and commit.',
    explanation:
      'You just worked on a separate branch! Your new file lives safely on my-experiment without changing main.',
    badgeTitle: 'Safe Branching',
    lessonCredit: 'Counts toward Lesson 7 progress',
  },
  {
    id: 'challenge-4',
    number: 4,
    title: 'Switch back to main and compare',
    description: 'Open the branch selector, switch back to main, and see that the new file is not there.',
    explanation:
      'Notice how your my-experiment file stays separate from main! Branches keep ideas isolated until you merge them.',
    badgeTitle: 'Branch Explorer',
    lessonCredit: 'Completes Sandbox practice & Lesson 7',
  },
];

interface PracticeSandboxPageProps {
  onBackToLessons: () => void;
  onChallengeCompleted?: (challengeId: string) => void;
  initialChallengeId?: string | null;
}

const SANDBOX_STORAGE_KEY = 'gitstart-sandbox-v1';
const REPO_NAME = 'my-first-project';
const REPO_OWNER = 'you';
const MAX_LOCAL_IMAGE_BYTES = 1_200_000;

const INITIAL_SANDBOX_STATE: SandboxState = {
  branches: ['main'],
  activeBranch: 'main',
  files: [],
  commits: [],
  completedChallengeIds: [],
  latestCelebrationId: null,
};

const COMMIT_IMAGE_NOTE =
  'The commit box only holds text. To add an image, upload it as a file using Add file, then Upload files.';

const VAGUE_COMMIT_WORDS = new Set(['wip', 'test', 'stuff', 'update', 'fix', 'ok', 'asdf', 'hi']);

function readSandboxState(): SandboxState {
  try {
    const raw = localStorage.getItem(SANDBOX_STORAGE_KEY);
    if (!raw) return INITIAL_SANDBOX_STATE;
    const parsed = JSON.parse(raw) as Partial<SandboxState>;
    return {
      branches:
        Array.isArray(parsed.branches) && parsed.branches.length > 0
          ? parsed.branches
          : ['main'],
      activeBranch: typeof parsed.activeBranch === 'string' ? parsed.activeBranch : 'main',
      files: Array.isArray(parsed.files) ? parsed.files : [],
      commits: Array.isArray(parsed.commits) ? parsed.commits : [],
      completedChallengeIds: Array.isArray(parsed.completedChallengeIds)
        ? parsed.completedChallengeIds
        : [],
      latestCelebrationId:
        typeof parsed.latestCelebrationId === 'string' ? parsed.latestCelebrationId : null,
    };
  } catch {
    return INITIAL_SANDBOX_STATE;
  }
}

function formatShortTime(iso: string): string {
  try {
    const date = new Date(iso);
    const diffMs = Date.now() - date.getTime();
    if (diffMs < 60_000) return 'just now';
    if (diffMs < 3_600_000) return `${Math.floor(diffMs / 60_000)}m ago`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return 'just now';
  }
}

function createSamplePngDataUrl(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="320" viewBox="0 0 640 320"><rect width="640" height="320" fill="#fef9f0"/><rect x="24" y="24" width="592" height="272" rx="14" fill="#ffffff" stroke="#e2beb9" stroke-width="2"/><text x="320" y="148" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="600" fill="#900708">my-first-project</text><text x="320" y="186" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#5a403d">Sample image uploaded in GitStart Practice Sandbox</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function isClearCommitMessage(msg: string): boolean {
  const trimmed = msg.trim();
  if (trimmed.length < 6) return false;
  if (VAGUE_COMMIT_WORDS.has(trimmed.toLowerCase())) return false;
  return true;
}

export function PracticeSandboxPage({
  onBackToLessons,
  onChallengeCompleted,
  initialChallengeId = null,
}: PracticeSandboxPageProps) {
  const [sandbox, setSandbox] = useState<SandboxState>(() => readSandboxState());
  const [viewMode, setViewMode] = useState<SandboxViewMode>('repo');
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [fileViewRaw, setFileViewRaw] = useState(false);

  // Dropdowns
  const [addFileOpen, setAddFileOpen] = useState(false);
  const [branchMenuOpen, setBranchMenuOpen] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');
  const addFileRef = useRef<HTMLDivElement>(null);
  const branchMenuRef = useRef<HTMLDivElement>(null);

  // Editor state
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editorFileName, setEditorFileName] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [editorTab, setEditorTab] = useState<'edit' | 'preview'>('edit');
  const [editorError, setEditorError] = useState<string | null>(null);

  // Upload state
  const [stagedUploads, setStagedUploads] = useState<StagedUpload[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActiveUpload, setDragActiveUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Commit Box state
  const [commitBoxOpen, setCommitBoxOpen] = useState(false);
  const [commitSource, setCommitSource] = useState<'create' | 'upload'>('create');
  const [commitMessage, setCommitMessage] = useState('');
  const [commitDescription, setCommitDescription] = useState('');
  const [commitTargetMode, setCommitTargetMode] = useState<'direct' | 'new-branch'>('direct');
  const [commitNewBranchName, setCommitNewBranchName] = useState('');
  const [commitImageWarning, setCommitImageWarning] = useState(false);
  const [commitBoxError, setCommitBoxError] = useState<string | null>(null);
  const [commitDragOver, setCommitDragOver] = useState(false);

  // Guided challenge hint, focused challenge & Show me ring highlight
  const [focusedChallengeId, setFocusedChallengeId] = useState<string | null>(initialChallengeId);
  const [friendlyHint, setFriendlyHint] = useState<string | null>(null);
  const [highlightTarget, setHighlightTarget] = useState<HighlightTarget>(null);
  const highlightTimerRef = useRef<number | null>(null);
  const challengeCardRefs = useRef<Record<string, HTMLLIElement | null>>({});

  // Calm status notice
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SANDBOX_STORAGE_KEY, JSON.stringify(sandbox));
    } catch {
      setStatusNotice('Browser storage is full. Reset the sandbox or use smaller files.');
    }
  }, [sandbox]);

  // Close menus on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (addFileRef.current && !addFileRef.current.contains(e.target as Node)) {
        setAddFileOpen(false);
      }
      if (branchMenuRef.current && !branchMenuRef.current.contains(e.target as Node)) {
        setBranchMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) {
        window.clearTimeout(highlightTimerRef.current);
      }
    };
  }, []);

  const branchFiles = sandbox.files.filter((f) => f.branch === sandbox.activeBranch);
  const branchCommits = sandbox.commits.filter((c) => c.branch === sandbox.activeBranch);
  const latestCommit = branchCommits[0] ?? null;

  const readmeFile = branchFiles.find(
    (f) => f.kind === 'text' && f.name.toLowerCase() === 'readme.md'
  );

  const selectedFile =
    branchFiles.find((f) => f.id === selectedFileId) ??
    sandbox.files.find((f) => f.id === selectedFileId) ??
    null;

  // Sync when launched from Lessons 5, 6, or 7 via "Try it yourself"
  useEffect(() => {
    if (!initialChallengeId) return;
    setFocusedChallengeId(initialChallengeId);
    setViewMode('repo');
    setSelectedFileId(null);
    setCommitBoxOpen(false);
    setAddFileOpen(false);
    setBranchMenuOpen(false);
    setHighlightTarget(null);

    if (initialChallengeId === 'challenge-2' || initialChallengeId === 'challenge-3') {
      setSandbox((prev) => {
        const hasMainReadme = prev.files.some(
          (f) => f.branch === 'main' && f.name.toLowerCase() === 'readme.md'
        );
        if (hasMainReadme) return prev;
        const nowIso = new Date().toISOString();
        const starterFile: SandboxFile = {
          id: 'main::README.md',
          name: 'README.md',
          content: '# My First Project\n\nWelcome to my practice repository on GitStart.',
          kind: 'text',
          branch: 'main',
          lastCommitMessage: 'Create README.md',
          updatedAt: nowIso,
        };
        const starterCommit: SandboxCommit = {
          id: `c-starter-${Date.now()}`,
          message: 'Create README.md',
          branch: 'main',
          fileNames: ['README.md'],
          createdAt: nowIso,
        };
        return {
          ...prev,
          activeBranch: 'main',
          files: [...prev.files, starterFile],
          commits: [starterCommit, ...prev.commits],
        };
      });
    }

    const hintByChallenge: Record<string, string> = {
      'challenge-1':
        'From Lesson 5: Click "Add file" → "Create new file", name it README.md, and commit it to main.',
      'challenge-2':
        'From Lesson 6: Click "README.md" (or "Edit README"), change the text, and commit with a clear message.',
      'challenge-3':
        'From Lesson 7: Click the "main" branch selector on the left, create "my-experiment", add a file on it, and commit.',
    };
    if (hintByChallenge[initialChallengeId]) {
      setFriendlyHint(hintByChallenge[initialChallengeId]);
    }

    const timer = window.setTimeout(() => {
      challengeCardRefs.current[initialChallengeId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [initialChallengeId]);

  const completedSet = new Set(sandbox.completedChallengeIds);
  const focusedChallenge =
    focusedChallengeId && !completedSet.has(focusedChallengeId)
      ? GUIDED_CHALLENGES.find((c) => c.id === focusedChallengeId) ?? null
      : null;
  const firstUnfinishedChallenge =
    GUIDED_CHALLENGES.find((c) => !completedSet.has(c.id)) ?? null;
  const activeChallenge = focusedChallenge ?? firstUnfinishedChallenge;
  const allChallengesComplete = firstUnfinishedChallenge === null;

  const latestCelebration = sandbox.latestCelebrationId
    ? GUIDED_CHALLENGES.find((c) => c.id === sandbox.latestCelebrationId) ?? null
    : null;

  const clearGuidance = () => {
    setFriendlyHint(null);
    setHighlightTarget(null);
    if (highlightTimerRef.current) {
      window.clearTimeout(highlightTimerRef.current);
      highlightTimerRef.current = null;
    }
  };

  const showHint = (message: string) => {
    setFriendlyHint(message);
  };

  const pulseTarget = (target: HighlightTarget, hintText?: string) => {
    if (highlightTimerRef.current) {
      window.clearTimeout(highlightTimerRef.current);
    }
    setHighlightTarget(target);
    if (hintText) {
      setFriendlyHint(hintText);
    }
    highlightTimerRef.current = window.setTimeout(() => {
      setHighlightTarget(null);
    }, 4500);
  };

  const ringClass = (target: HighlightTarget) =>
    highlightTarget === target
      ? 'ring-4 ring-primary/45 border-primary shadow-[0_0_0_2px_rgba(144,7,8,0.18)] animate-pulse'
      : '';

  // Compute what the user should click next for "Show me"
  const handleShowMe = () => {
    if (!activeChallenge) return;

    if (activeChallenge.id === 'challenge-1') {
      if (commitBoxOpen) {
        pulseTarget(
          'commit-submit-btn',
          'Step: Click “Commit changes” below to save README.md to main.'
        );
      } else if (viewMode === 'create') {
        if (editorFileName.trim().toLowerCase() !== 'readme.md') {
          pulseTarget(
            'file-name-input',
            'Step: Type README.md in the highlighted file name box, then click “Commit changes...”.'
          );
        } else {
          pulseTarget(
            'open-commit-box-btn',
            'Step: Now click “Commit changes...” to open the commit box.'
          );
        }
      } else if (addFileOpen) {
        pulseTarget(
          'create-new-file-item',
          'Step: Click “Create new file” inside the open Add file menu.'
        );
      } else {
        pulseTarget(
          'add-file-btn',
          'Step: Click “Add file” on the top right of the repository toolbar.'
        );
      }
      return;
    }

    if (activeChallenge.id === 'challenge-2') {
      if (commitBoxOpen) {
        if (!isClearCommitMessage(commitMessage)) {
          pulseTarget(
            'commit-message-input',
            'Step: Write a clear commit message like “Add welcome note to README.md”, then click Commit changes.'
          );
        } else {
          pulseTarget(
            'commit-submit-btn',
            'Step: Click “Commit changes” to save your edited README.md.'
          );
        }
      } else if (viewMode === 'create') {
        pulseTarget(
          'open-commit-box-btn',
          'Step: After editing the text, click “Commit changes...” to save your update.'
        );
      } else if (viewMode === 'view-file' && selectedFile?.name.toLowerCase() === 'readme.md') {
        pulseTarget(
          'readme-file-row',
          'Step: Click “Edit file” above the file view to change README.md.'
        );
      } else {
        pulseTarget(
          'readme-file-row',
          'Step: Click “README.md” in the file list (or “Edit README”) to edit it.'
        );
      }
      return;
    }

    if (activeChallenge.id === 'challenge-3') {
      if (sandbox.activeBranch !== 'my-experiment') {
        if (branchMenuOpen) {
          pulseTarget(
            'new-branch-input',
            'Step: Type my-experiment in the highlighted box and click Create.'
          );
        } else {
          pulseTarget(
            'branch-selector-btn',
            'Step: Click the “main” branch selector on the left to create “my-experiment”.'
          );
        }
        return;
      }

      // Already on my-experiment
      if (commitBoxOpen) {
        pulseTarget(
          'commit-submit-btn',
          'Step: Click “Commit changes” to save your new file onto my-experiment.'
        );
      } else if (viewMode === 'create' || viewMode === 'upload') {
        if (viewMode === 'create' && !editorFileName.trim()) {
          pulseTarget(
            'file-name-input',
            'Step: Name your new file (for example notes.txt), then click “Commit changes...”.'
          );
        } else {
          pulseTarget(
            'open-commit-box-btn',
            'Step: Click “Commit changes...” to save this file on my-experiment.'
          );
        }
      } else if (addFileOpen) {
        pulseTarget(
          'create-new-file-item',
          'Step: Click “Create new file” to add a file on my-experiment.'
        );
      } else {
        pulseTarget(
          'add-file-btn',
          'Step: Great, you are on my-experiment! Now click “Add file” to add a new file.'
        );
      }
      return;
    }

    if (activeChallenge.id === 'challenge-4') {
      if (branchMenuOpen) {
        pulseTarget(
          'main-branch-option',
          'Step: Click “main” in the dropdown to switch back and compare.'
        );
      } else {
        pulseTarget(
          'branch-selector-btn',
          'Step: Click the branch selector (“my-experiment”) on the left, then choose “main”.'
        );
      }
    }
  };

  // --- Handlers ---
  const handleStartCreateFile = () => {
    setAddFileOpen(false);
    setHighlightTarget(null);

    if (activeChallenge?.id === 'challenge-2') {
      showHint(
        'For Challenge 2, edit your existing README.md instead of making a brand-new file! Click README.md in the file list (or Edit README).'
      );
    } else if (activeChallenge?.id === 'challenge-3' && sandbox.activeBranch !== 'my-experiment') {
      showHint(
        'First create the "my-experiment" branch using the "main" branch selector on the left, then add your file on that branch!'
      );
    } else if (activeChallenge?.id === 'challenge-4') {
      showHint(
        'You already added a file on my-experiment! Now click the branch selector on the left and switch back to "main".'
      );
    } else {
      setFriendlyHint(null);
    }

    setEditingFileId(null);
    setEditorFileName('');
    setEditorContent('');
    setEditorTab('edit');
    setEditorError(null);
    setCommitBoxOpen(false);
    setStatusNotice(null);
    setViewMode('create');
  };

  const handleStartEditFile = (file: SandboxFile) => {
    setHighlightTarget(null);

    if (
      activeChallenge?.id === 'challenge-3' &&
      sandbox.activeBranch === 'my-experiment'
    ) {
      showHint(
        'Challenge 3 asks you to add a new file on my-experiment. Use Add file → Create new file to make a fresh file!'
      );
    } else if (activeChallenge?.id === 'challenge-4') {
      showHint('For Challenge 4, switch back to "main" using the branch selector on the left.');
    } else {
      setFriendlyHint(null);
    }

    setEditingFileId(file.id);
    setEditorFileName(file.name);
    setEditorContent(file.content);
    setEditorTab('edit');
    setEditorError(null);
    setCommitBoxOpen(false);
    setStatusNotice(null);
    setViewMode('create');
  };

  const handleStartUploadFiles = () => {
    setAddFileOpen(false);
    setHighlightTarget(null);

    if (activeChallenge?.id === 'challenge-1') {
      showHint(
        'Tip for Challenge 1: "Create new file" lets you type a README.md right here in the browser.'
      );
    } else if (activeChallenge?.id === 'challenge-3' && sandbox.activeBranch !== 'my-experiment') {
      showHint(
        'Remember Challenge 3: create the "my-experiment" branch first using the branch selector on the left.'
      );
    }

    setStagedUploads([]);
    setUploadError(null);
    setCommitBoxOpen(false);
    setStatusNotice(null);
    setViewMode('upload');
  };

  const handleOpenCommitBoxFromCreate = () => {
    const cleanName = editorFileName.trim().replace(/^\/+/, '');
    if (!cleanName) {
      setEditorError('Give your file a name first (for example: README.md or notes.txt).');
      return;
    }

    if (activeChallenge?.id === 'challenge-1' && cleanName.toLowerCase() !== 'readme.md') {
      showHint(
        'For Challenge 1, name the file "README.md" (you can still commit this file, or rename it to README.md first).'
      );
    }

    setEditorError(null);
    const defaultMsg = editingFileId ? '' : `Create ${cleanName}`;
    setCommitSource('create');
    setCommitMessage(defaultMsg);
    setCommitDescription('');
    setCommitTargetMode('direct');
    setCommitNewBranchName('');
    setCommitImageWarning(false);
    setCommitBoxError(null);
    setHighlightTarget(null);
    setCommitBoxOpen(true);
  };

  const handleOpenCommitBoxFromUpload = () => {
    if (stagedUploads.length === 0) {
      setUploadError('Choose at least one file to upload before committing.');
      return;
    }
    setUploadError(null);
    const defaultMsg =
      stagedUploads.length === 1
        ? `Upload ${stagedUploads[0].name}`
        : `Upload ${stagedUploads.length} files`;
    setCommitSource('upload');
    setCommitMessage(defaultMsg);
    setCommitDescription('');
    setCommitTargetMode('direct');
    setCommitNewBranchName('');
    setCommitImageWarning(false);
    setCommitBoxError(null);
    setHighlightTarget(null);
    setCommitBoxOpen(true);
  };

  const handleCommitSubmit = () => {
    const rawMsg = commitMessage.trim();
    if (!rawMsg) {
      setCommitBoxError('Write a short commit message explaining what changed.');
      return;
    }

    if (
      activeChallenge?.id === 'challenge-2' &&
      editingFileId &&
      editorFileName.trim().toLowerCase() === 'readme.md' &&
      !isClearCommitMessage(rawMsg)
    ) {
      showHint(
        'Try writing a clearer commit message (at least a few words, like "Add project intro to README.md") so future-you understands what changed.'
      );
      pulseTarget('commit-message-input');
      return;
    }

    let targetBranch = sandbox.activeBranch;
    let nextBranches = sandbox.branches;
    let nextFiles = [...sandbox.files];

    if (commitTargetMode === 'new-branch') {
      const cleaned = commitNewBranchName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9._/-]/g, '');
      if (!cleaned) {
        setCommitBoxError(
          'Type a name for your new branch, or choose "Commit directly to the main branch".'
        );
        return;
      }
      targetBranch = cleaned;
      if (!nextBranches.includes(targetBranch)) {
        nextBranches = [...nextBranches, targetBranch];
        const cloned = nextFiles
          .filter((f) => f.branch === sandbox.activeBranch)
          .map((f) => ({
            ...f,
            id: `${targetBranch}::${f.name}`,
            branch: targetBranch,
          }));
        nextFiles = [...nextFiles, ...cloned];
      }
    }

    const nowIso = new Date().toISOString();
    const touchedNames: string[] = [];
    const createdNewFilesOnTarget: string[] = [];

    if (commitSource === 'create') {
      const cleanName = editorFileName.trim().replace(/^\/+/, '');
      const existingIdx = nextFiles.findIndex(
        (f) => f.branch === targetBranch && f.name.toLowerCase() === cleanName.toLowerCase()
      );
      if (existingIdx < 0) {
        createdNewFilesOnTarget.push(cleanName);
      }
      const newEntry: SandboxFile = {
        id: `${targetBranch}::${cleanName}`,
        name: cleanName,
        content: editorContent,
        kind: 'text',
        branch: targetBranch,
        lastCommitMessage: rawMsg,
        updatedAt: nowIso,
      };
      if (existingIdx >= 0) {
        nextFiles[existingIdx] = newEntry;
      } else {
        nextFiles.push(newEntry);
      }
      touchedNames.push(cleanName);
    } else {
      for (const upload of stagedUploads) {
        const existingIdx = nextFiles.findIndex(
          (f) => f.branch === targetBranch && f.name.toLowerCase() === upload.name.toLowerCase()
        );
        if (existingIdx < 0) {
          createdNewFilesOnTarget.push(upload.name);
        }
        const newEntry: SandboxFile = {
          id: `${targetBranch}::${upload.name}`,
          name: upload.name,
          content: upload.content,
          kind: upload.kind,
          mimeType: upload.mimeType,
          branch: targetBranch,
          lastCommitMessage: rawMsg,
          updatedAt: nowIso,
        };
        if (existingIdx >= 0) {
          nextFiles[existingIdx] = newEntry;
        } else {
          nextFiles.push(newEntry);
        }
        touchedNames.push(upload.name);
      }
    }

    const newCommit: SandboxCommit = {
      id: `c-${Date.now()}`,
      message: rawMsg,
      description: commitDescription.trim() || undefined,
      branch: targetBranch,
      fileNames: touchedNames,
      createdAt: nowIso,
    };

    const nextCommits = [newCommit, ...sandbox.commits];
    const nextCompleted = [...sandbox.completedChallengeIds];
    let newlyEarnedId: string | null = null;

    // Evaluate challenge progress automatically
    const mainCommitsOnReadme = nextCommits.filter(
      (c) =>
        c.branch === 'main' &&
        c.fileNames.some((n) => n.toLowerCase() === 'readme.md')
    );
    const createdReadmeOnMain =
      targetBranch === 'main' &&
      createdNewFilesOnTarget.some((n) => n.toLowerCase() === 'readme.md');
    const editedReadmeOnMain =
      targetBranch === 'main' &&
      touchedNames.some((n) => n.toLowerCase() === 'readme.md') &&
      !createdReadmeOnMain &&
      mainCommitsOnReadme.length >= 2;

    if (!nextCompleted.includes('challenge-1') && createdReadmeOnMain) {
      nextCompleted.push('challenge-1');
      newlyEarnedId = 'challenge-1';
    } else if (
      !nextCompleted.includes('challenge-2') &&
      editedReadmeOnMain &&
      isClearCommitMessage(rawMsg)
    ) {
      nextCompleted.push('challenge-2');
      newlyEarnedId = 'challenge-2';
    } else if (
      !nextCompleted.includes('challenge-3') &&
      targetBranch === 'my-experiment' &&
      createdNewFilesOnTarget.length > 0
    ) {
      nextCompleted.push('challenge-3');
      newlyEarnedId = 'challenge-3';
    }

    setSandbox({
      branches: nextBranches,
      activeBranch: targetBranch,
      files: nextFiles,
      commits: nextCommits,
      completedChallengeIds: nextCompleted,
      latestCelebrationId: newlyEarnedId ?? sandbox.latestCelebrationId,
    });

    if (newlyEarnedId) {
      onChallengeCompleted?.(newlyEarnedId);
      clearGuidance();
    }

    setCommitBoxOpen(false);
    setStagedUploads([]);
    setEditingFileId(null);
    setViewMode('repo');
    setStatusNotice(`Committed ${touchedNames.join(', ')} to the ${targetBranch} branch.`);
  };

  // --- File Upload Processing ---
  const processIncomingFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploadError(null);

    Array.from(fileList).forEach((file) => {
      const isImage =
        file.type.startsWith('image/') || /\.(png|jpe?g|gif|webp|svg)$/i.test(file.name);

      if (isImage && file.size > MAX_LOCAL_IMAGE_BYTES) {
        setUploadError(
          `"${file.name}" is larger than 1.2 MB. Try a smaller image so it saves cleanly in your browser.`
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = typeof reader.result === 'string' ? reader.result : '';
        setStagedUploads((prev) => {
          const filtered = prev.filter((item) => item.name !== file.name);
          return [
            ...filtered,
            {
              id: `${file.name}-${Date.now()}`,
              name: file.name,
              content: result,
              kind: isImage ? 'image' : 'text',
              mimeType: file.type || (isImage ? 'image/png' : 'text/plain'),
              sizeBytes: file.size,
            },
          ];
        });
      };

      if (isImage) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const handleAddSampleImage = () => {
    const sampleUrl = createSamplePngDataUrl();
    setStagedUploads((prev) => [
      ...prev.filter((f) => f.name !== 'project-banner.svg'),
      {
        id: `sample-img-${Date.now()}`,
        name: 'project-banner.svg',
        content: sampleUrl,
        kind: 'image',
        mimeType: 'image/svg+xml',
        sizeBytes: sampleUrl.length,
      },
    ]);
    setUploadError(null);
  };

  // --- Commit Box Image Attachment Guards ---
  const triggerCommitImageNote = () => {
    setCommitImageWarning(true);
    setCommitBoxError(null);
  };

  const handleCommitPaste = (e: ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const items = Array.from(e.clipboardData?.items ?? []);
    const files = Array.from(e.clipboardData?.files ?? []);
    const hasImageBinary =
      items.some((item) => item.type.startsWith('image/')) ||
      files.some((f) => f.type.startsWith('image/') || /\.(png|jpe?g|gif|webp|svg)$/i.test(f.name));

    const pastedText = e.clipboardData?.getData('text/plain') ?? '';
    const hasImageMarkup =
      /^data:image\//i.test(pastedText.trim()) || /!\[[^\]]*\]\([^)]*\)/.test(pastedText);

    if (hasImageBinary || hasImageMarkup) {
      e.preventDefault();
      triggerCommitImageNote();
    }
  };

  const handleCommitDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCommitDragOver(false);
    const files = Array.from(e.dataTransfer?.files ?? []);
    const droppedText = e.dataTransfer?.getData('text/plain') ?? '';
    if (
      files.length > 0 ||
      /^data:image\//i.test(droppedText.trim()) ||
      /!\[[^\]]*\]\([^)]*\)/.test(droppedText)
    ) {
      triggerCommitImageNote();
    }
  };

  const handleSwitchOrCreateBranch = (branchName: string) => {
    const cleaned = branchName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9._/-]/g, '');
    if (!cleaned) return;

    setHighlightTarget(null);

    if (sandbox.branches.includes(cleaned)) {
      const nextCompleted = [...sandbox.completedChallengeIds];
      let newlyEarnedId: string | null = null;

      if (
        cleaned === 'main' &&
        nextCompleted.includes('challenge-3') &&
        !nextCompleted.includes('challenge-4')
      ) {
        nextCompleted.push('challenge-4');
        newlyEarnedId = 'challenge-4';
      } else if (activeChallenge?.id === 'challenge-3' && cleaned !== 'my-experiment') {
        showHint(
          'Challenge 3 asks for a branch called "my-experiment". Type my-experiment in the branch box to create it!'
        );
      }

      setSandbox((prev) => ({
        ...prev,
        activeBranch: cleaned,
        completedChallengeIds: nextCompleted,
        latestCelebrationId: newlyEarnedId ?? prev.latestCelebrationId,
      }));

      if (newlyEarnedId) {
        onChallengeCompleted?.(newlyEarnedId);
        clearGuidance();
      }
    } else {
      if (activeChallenge?.id === 'challenge-3' && cleaned !== 'my-experiment') {
        showHint(
          'You created a branch! To check off Challenge 3, create a branch named "my-experiment".'
        );
      } else if (activeChallenge?.id === 'challenge-3' && cleaned === 'my-experiment') {
        setFriendlyHint(
          'Nice! Now you are on my-experiment. Click Add file → Create new file to add a new file on this branch.'
        );
      }

      const cloned = sandbox.files
        .filter((f) => f.branch === sandbox.activeBranch)
        .map((f) => ({
          ...f,
          id: `${cleaned}::${f.name}`,
          branch: cleaned,
        }));
      setSandbox((prev) => ({
        ...prev,
        branches: [...prev.branches, cleaned],
        activeBranch: cleaned,
        files: [...prev.files, ...cloned],
      }));
      setStatusNotice(`Created and switched to branch "${cleaned}".`);
    }

    setNewBranchName('');
    setBranchMenuOpen(false);
    setViewMode('repo');
  };

  const handleBranchButtonClick = () => {
    const nextOpen = !branchMenuOpen;
    setBranchMenuOpen(nextOpen);
    setHighlightTarget(null);

    if (nextOpen) {
      if (activeChallenge?.id === 'challenge-1') {
        showHint(
          'That menu switches branches. For Challenge 1, click "Add file" on the right to create README.md first!'
        );
      } else if (activeChallenge?.id === 'challenge-2') {
        showHint(
          'Stay on main for Challenge 2 — click README.md in the file list (or Edit README) to update it.'
        );
      }
    }
  };

  const handleAddFileButtonClick = () => {
    const nextOpen = !addFileOpen;
    setAddFileOpen(nextOpen);
    setHighlightTarget(null);

    if (nextOpen) {
      if (activeChallenge?.id === 'challenge-2') {
        showHint(
          'To edit an existing file, click README.md directly in the file list below (instead of Add file).'
        );
      } else if (activeChallenge?.id === 'challenge-3' && sandbox.activeBranch !== 'my-experiment') {
        showHint(
          'First create the "my-experiment" branch using the "main" branch selector on the left!'
        );
      } else if (activeChallenge?.id === 'challenge-4') {
        showHint(
          'For Challenge 4, switch back to "main" using the branch selector on the left.'
        );
      }
    }
  };

  const handleResetSandbox = () => {
    setSandbox(INITIAL_SANDBOX_STATE);
    setViewMode('repo');
    setSelectedFileId(null);
    setAddFileOpen(false);
    setBranchMenuOpen(false);
    setCommitBoxOpen(false);
    setEditorFileName('');
    setEditorContent('');
    setStagedUploads([]);
    setCommitImageWarning(false);
    clearGuidance();
    setStatusNotice('Sandbox reset back to an empty my-first-project repository.');
    try {
      localStorage.removeItem(SANDBOX_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const completedCount = sandbox.completedChallengeIds.length;
  const challengeContextText = [
    'Practice Sandbox Guided Challenges on my-first-project:',
    ...GUIDED_CHALLENGES.map(
      (c) =>
        `${c.number}. ${c.title} (${completedSet.has(c.id) ? 'Done' : 'Not yet'}): ${c.description}`
    ),
    activeChallenge ? `Currently working on: ${activeChallenge.title}` : 'All 4 challenges completed.',
  ].join('\n');

  return (
    <div className="w-full py-6 sm:py-10" data-ask-selectable="true">
      {/* Back link + reset */}
      <div className="mb-5 flex items-center justify-between gap-4 flex-wrap">
        <button
          type="button"
          onClick={onBackToLessons}
          className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to lessons</span>
        </button>

        <button
          type="button"
          onClick={handleResetSandbox}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-xs font-medium text-on-surface hover:border-primary/50 hover:text-primary transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset sandbox</span>
        </button>
      </div>

      {/* Clear Practice Mode Banner */}
      <div
        role="status"
        className="mb-6 rounded-xl bg-primary-fixed/30 border border-primary/30 px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="flex items-start sm:items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <p className="text-sm font-medium text-on-surface">
              Practice mode: nothing here is real
            </p>
            <p className="text-xs text-on-surface-variant">
              Everything stays safely inside your browser with no GitHub account needed. Follow the
              4 guided challenges on the right or explore freely.
            </p>
          </div>
        </div>
      </div>

      {/* Subtle status feedback */}
      {statusNotice && (
        <div className="mb-5 rounded-lg bg-secondary-container/25 border border-secondary/35 px-4 py-2.5 flex items-center justify-between gap-3 text-xs text-on-secondary-container">
          <span>{statusNotice}</span>
          <button
            type="button"
            onClick={() => setStatusNotice(null)}
            className="text-on-secondary-container/80 hover:text-on-secondary-container underline cursor-pointer whitespace-nowrap"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Two-Column Sandbox + Guided Challenges Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN (8 cols): Fake GitHub Repository Shell */}
        <div className="lg:col-span-8 min-w-0">
          <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/50 shadow-[0_4px_24px_-2px_rgba(28,25,23,0.05)] overflow-visible">
            {/* Browser Chrome */}
            <div className="bg-surface-container-high/60 border-b border-outline-variant/35 px-4 sm:px-6 py-3 flex items-center gap-3 rounded-t-xl">
              <div className="flex items-center gap-1.5 opacity-60 shrink-0" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-outline" />
                <span className="w-2.5 h-2.5 rounded-full bg-outline" />
                <span className="w-2.5 h-2.5 rounded-full bg-outline" />
              </div>
              <div className="flex-1 min-w-0 max-w-md mx-auto bg-surface-container-lowest/90 border border-outline-variant/35 px-3 py-1 rounded text-center">
                <span className="font-mono text-[11px] sm:text-xs text-on-surface-variant truncate block">
                  github.com/{REPO_OWNER}/{REPO_NAME}
                </span>
              </div>
            </div>

            {/* Repository Header */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-outline-variant/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('repo');
                    setSelectedFileId(null);
                  }}
                  className="flex items-center gap-1.5 text-[18px] sm:text-[20px] text-on-surface hover:text-primary transition-colors cursor-pointer min-w-0"
                >
                  <span className="text-on-surface-variant/75 font-normal whitespace-nowrap">
                    {REPO_OWNER} /
                  </span>
                  <span className="font-semibold truncate">{REPO_NAME}</span>
                </button>
                <span className="text-[11px] font-semibold tracking-[0.08em] uppercase px-2 py-0.5 rounded border border-outline-variant/45 text-on-surface-variant whitespace-nowrap shrink-0">
                  Public
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setViewMode(viewMode === 'commits' ? 'repo' : 'commits');
                  if (activeChallenge?.id === 'challenge-1' && branchCommits.length === 0) {
                    showHint(
                      'No commits yet! Click "Add file" → "Create new file" to make your first commit.'
                    );
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low/70 border border-outline-variant/35 font-mono text-xs text-on-surface hover:border-primary/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums"
              >
                <History className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                <span>
                  {branchCommits.length} {branchCommits.length === 1 ? 'commit' : 'commits'}
                </span>
              </button>
            </div>

            {/* Repository Toolbar (Branch Selector + Add file dropdown) */}
            <div className="px-4 sm:px-6 py-3.5 bg-surface-container-low/40 border-b border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
              {/* Branch Selector */}
              <div className="relative" ref={branchMenuRef}>
                <button
                  type="button"
                  onClick={handleBranchButtonClick}
                  aria-expanded={branchMenuOpen}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 font-mono text-xs text-on-surface hover:border-outline transition-all whitespace-nowrap shrink-0 cursor-pointer ${ringClass(
                    'branch-selector-btn'
                  )}`}
                >
                  <GitBranch className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span className="whitespace-nowrap">{sandbox.activeBranch}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                </button>

                {branchMenuOpen && (
                  <div className="absolute left-0 top-10 w-64 rounded-xl bg-surface-container-lowest border border-outline-variant/55 shadow-[0_12px_32px_-4px_rgba(28,25,23,0.12)] p-3 z-30 space-y-2.5">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant">
                      Switch or create branch
                    </div>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={newBranchName}
                        onChange={(e) => setNewBranchName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSwitchOrCreateBranch(newBranchName);
                          }
                        }}
                        placeholder="my-experiment"
                        aria-label="New branch name"
                        className={`flex-1 min-w-0 font-mono text-xs px-2.5 py-1.5 rounded-md bg-surface-container-low/50 border border-outline-variant/45 text-on-surface focus:outline-none focus:border-primary ${ringClass(
                          'new-branch-input'
                        )}`}
                      />
                      {newBranchName.trim() && (
                        <button
                          type="button"
                          onClick={() => handleSwitchOrCreateBranch(newBranchName)}
                          className="px-2.5 py-1.5 rounded-md bg-primary-container text-on-primary text-xs font-medium hover:bg-primary cursor-pointer whitespace-nowrap"
                        >
                          Create
                        </button>
                      )}
                    </div>
                    <div className="border-t border-outline-variant/25 pt-2 space-y-1">
                      {sandbox.branches.map((branch) => {
                        const active = branch === sandbox.activeBranch;
                        return (
                          <button
                            key={branch}
                            type="button"
                            onClick={() => handleSwitchOrCreateBranch(branch)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-md font-mono text-xs flex items-center justify-between cursor-pointer ${
                              active
                                ? 'bg-surface-container-low font-medium text-on-surface'
                                : 'text-on-surface-variant hover:bg-surface-container-low/50'
                            } ${branch === 'main' ? ringClass('main-branch-option') : ''}`}
                          >
                            <span className="truncate">{branch}</span>
                            {active && <Check className="w-3.5 h-3.5 text-secondary shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Toolbar Actions: Add file dropdown */}
              <div className="relative" ref={addFileRef}>
                <button
                  type="button"
                  onClick={handleAddFileButtonClick}
                  aria-expanded={addFileOpen}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/55 text-xs font-medium text-on-surface hover:border-primary/50 transition-all whitespace-nowrap shrink-0 cursor-pointer ${ringClass(
                    'add-file-btn'
                  )}`}
                >
                  <span className="whitespace-nowrap">Add file</span>
                  <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                </button>

                {addFileOpen && (
                  <div className="absolute right-0 top-10 w-52 rounded-xl bg-surface-container-lowest border border-outline-variant/55 shadow-[0_12px_32px_-4px_rgba(28,25,23,0.12)] py-1.5 z-30">
                    <button
                      type="button"
                      onClick={handleStartCreateFile}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-2.5 text-sm text-on-surface hover:bg-surface-container-low/70 transition-colors whitespace-nowrap cursor-pointer ${ringClass(
                        'create-new-file-item'
                      )}`}
                    >
                      <Plus className="w-4 h-4 text-primary shrink-0" />
                      <span className="whitespace-nowrap">Create new file</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleStartUploadFiles}
                      className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 text-sm text-on-surface hover:bg-surface-container-low/70 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-secondary shrink-0" />
                      <span className="whitespace-nowrap">Upload files</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Main Workspace Body */}
            <div className="p-4 sm:p-6 space-y-6">
              {/* VIEW 1: REPO FILE LIST */}
              {viewMode === 'repo' && (
                <>
                  {branchFiles.length === 0 ? (
                    <div
                      onClick={() => {
                        if (activeChallenge?.id === 'challenge-1') {
                          showHint(
                            'This empty area just shows your files once added. Click the "Add file" button above on the right!'
                          );
                        }
                      }}
                      className="rounded-xl border border-dashed border-outline-variant/65 bg-surface-container-low/25 px-6 py-12 text-center flex flex-col items-center cursor-pointer hover:bg-surface-container-low/35 transition-colors"
                    >
                      <FolderOpen className="w-8 h-8 text-outline mb-3" strokeWidth={1.6} />
                      <h2 className="text-lg font-medium text-on-surface mb-1.5">
                        This repository is empty
                      </h2>
                      <p className="text-sm text-on-surface-variant max-w-md leading-relaxed mb-6">
                        Click <strong className="font-medium text-on-surface">Add file</strong>{' '}
                        above to create a new file like{' '}
                        <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface-container-low border border-outline-variant/35">
                          README.md
                        </code>{' '}
                        or upload files from your device.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartCreateFile();
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary text-xs font-medium hover:bg-primary transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Create new file</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartUploadFiles();
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-xs font-medium text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload files</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* File Table */}
                      <div className="rounded-xl border border-outline-variant/45 overflow-hidden">
                        {latestCommit && (
                          <div className="bg-surface-container-low/75 px-4 py-2.5 border-b border-outline-variant/30 flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="font-medium text-on-surface whitespace-nowrap">
                                {REPO_OWNER}
                              </span>
                              <span className="text-on-surface-variant truncate">
                                {latestCommit.message}
                              </span>
                            </div>
                            <span className="font-mono text-on-surface-variant shrink-0 tabular-nums">
                              {formatShortTime(latestCommit.createdAt)}
                            </span>
                          </div>
                        )}

                        <div className="divide-y divide-outline-variant/25">
                          {branchFiles.map((file) => {
                            const isReadme = file.name.toLowerCase() === 'readme.md';
                            return (
                              <button
                                key={file.id}
                                type="button"
                                onClick={() => {
                                  setHighlightTarget(null);
                                  setSelectedFileId(file.id);
                                  setFileViewRaw(false);
                                  setViewMode('view-file');
                                }}
                                className={`w-full text-left px-4 py-3 flex items-center justify-between gap-4 hover:bg-surface-container-low/45 transition-all cursor-pointer ${
                                  isReadme ? ringClass('readme-file-row') : ''
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  {file.kind === 'image' ? (
                                    <ImageIcon className="w-4 h-4 text-primary shrink-0" />
                                  ) : (
                                    <FileText className="w-4 h-4 text-secondary shrink-0" />
                                  )}
                                  <span className="font-mono text-xs sm:text-[13px] font-medium text-on-surface truncate hover:text-primary">
                                    {file.name}
                                  </span>
                                </div>

                                <div className="flex items-center gap-4 min-w-0 text-xs text-on-surface-variant">
                                  <span className="hidden sm:inline truncate max-w-[200px]">
                                    {file.lastCommitMessage}
                                  </span>
                                  <span className="font-mono text-[11px] whitespace-nowrap shrink-0 tabular-nums">
                                    {formatShortTime(file.updatedAt)}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Nicely rendered README.md on the repository homepage */}
                      {readmeFile && (
                        <div className="rounded-xl border border-outline-variant/45 overflow-hidden">
                          <div className="bg-surface-container-low/65 px-4 sm:px-5 py-2.5 border-b border-outline-variant/30 flex items-center justify-between gap-3">
                            <span className="font-mono text-xs font-semibold text-on-surface">
                              {readmeFile.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleStartEditFile(readmeFile)}
                              className="text-xs font-medium text-primary hover:underline cursor-pointer whitespace-nowrap"
                            >
                              Edit README
                            </button>
                          </div>
                          <div className="p-5 sm:p-6 bg-surface-container-lowest">
                            <MarkdownPreview content={readmeFile.content} />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {/* VIEW 2: CREATE / EDIT FILE EDITOR */}
              {viewMode === 'create' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5 p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant/40">
                    <span className="font-mono text-xs text-on-surface-variant whitespace-nowrap">
                      {REPO_NAME} /
                    </span>
                    <input
                      type="text"
                      value={editorFileName}
                      onChange={(e) => {
                        setEditorFileName(e.target.value);
                        if (editorError) setEditorError(null);
                      }}
                      placeholder="Name your file... (e.g. README.md)"
                      aria-label="File name"
                      className={`flex-1 min-w-[180px] font-mono text-xs sm:text-sm px-3 py-2 rounded-md bg-surface-container-lowest border border-outline-variant/50 text-on-surface focus:outline-none focus:border-primary ${ringClass(
                        'file-name-input'
                      )}`}
                    />
                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        type="button"
                        onClick={() => setViewMode('repo')}
                        className="px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-xs font-medium text-on-surface-variant hover:text-on-surface cursor-pointer whitespace-nowrap"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenCommitBoxFromCreate}
                        className={`px-4 py-2 rounded-lg bg-secondary text-on-secondary text-xs font-medium hover:opacity-95 transition-all cursor-pointer whitespace-nowrap ${ringClass(
                          'open-commit-box-btn'
                        )}`}
                      >
                        Commit changes...
                      </button>
                    </div>
                  </div>

                  {editorError && (
                    <p role="alert" className="text-xs text-primary font-medium">
                      {editorError}
                    </p>
                  )}

                  <div className="rounded-xl border border-outline-variant/45 overflow-hidden">
                    <div className="bg-surface-container-low/60 px-4 py-2 border-b border-outline-variant/30 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditorTab('edit')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium cursor-pointer ${
                          editorTab === 'edit'
                            ? 'bg-surface-container-lowest text-on-surface border border-outline-variant/40'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditorTab('preview')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium cursor-pointer ${
                          editorTab === 'preview'
                            ? 'bg-surface-container-lowest text-on-surface border border-outline-variant/40'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    </div>

                    {editorTab === 'edit' ? (
                      <textarea
                        rows={10}
                        value={editorContent}
                        onChange={(e) => setEditorContent(e.target.value)}
                        aria-label="File content editor"
                        placeholder="Write your file contents here... (Markdown like # Heading and **bold** works in .md files)"
                        className="w-full p-4 font-mono text-xs sm:text-[13px] bg-surface-container-lowest text-on-surface leading-relaxed focus:outline-none resize-y"
                      />
                    ) : (
                      <div className="p-5 min-h-[220px] bg-surface-container-lowest">
                        {editorFileName.trim().toLowerCase().endsWith('.md') ||
                        !editorFileName.trim() ? (
                          <MarkdownPreview content={editorContent} />
                        ) : (
                          <pre className="font-mono text-xs text-on-surface whitespace-pre-wrap leading-relaxed">
                            {editorContent || '(Empty file)'}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* VIEW 3: UPLOAD FILES */}
              {viewMode === 'upload' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <h2 className="text-base font-medium text-on-surface">
                        Upload files to {REPO_NAME}
                      </h2>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Choose an image or text file from your device, then commit it to save.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setViewMode('repo')}
                        className="px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-xs font-medium text-on-surface-variant hover:text-on-surface cursor-pointer whitespace-nowrap"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenCommitBoxFromUpload}
                        className={`px-4 py-2 rounded-lg bg-secondary text-on-secondary text-xs font-medium hover:opacity-95 transition-all cursor-pointer whitespace-nowrap ${ringClass(
                          'open-commit-box-btn'
                        )}`}
                      >
                        Commit changes...
                      </button>
                    </div>
                  </div>

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActiveUpload(true);
                    }}
                    onDragLeave={() => setDragActiveUpload(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActiveUpload(false);
                      processIncomingFiles(e.dataTransfer.files);
                    }}
                    className={`rounded-xl border border-dashed p-8 text-center transition-colors ${
                      dragActiveUpload
                        ? 'border-primary bg-primary-fixed/15'
                        : 'border-outline-variant/65 bg-surface-container-low/25'
                    }`}
                  >
                    <Upload className="w-7 h-7 text-outline mx-auto mb-3" />
                    <p className="text-sm font-medium text-on-surface mb-1">
                      Drag files here to add them to your repository
                    </p>
                    <p className="text-xs text-on-surface-variant mb-4">
                      Supports images (PNG, JPG, GIF, SVG) as well as text and Markdown files.
                    </p>

                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        processIncomingFiles(e.target.files);
                        e.target.value = '';
                      }}
                    />

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/55 text-xs font-medium text-on-surface hover:border-primary/50 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Choose your files
                      </button>
                      <button
                        type="button"
                        onClick={handleAddSampleImage}
                        className="px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Try with a sample image
                      </button>
                    </div>
                  </div>

                  {uploadError && (
                    <p role="alert" className="text-xs text-primary font-medium">
                      {uploadError}
                    </p>
                  )}

                  {stagedUploads.length > 0 && (
                    <div className="rounded-xl border border-outline-variant/45 divide-y divide-outline-variant/25">
                      {stagedUploads.map((item) => (
                        <div
                          key={item.id}
                          className="px-4 py-3 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {item.kind === 'image' ? (
                              <ImageIcon className="w-4 h-4 text-primary shrink-0" />
                            ) : (
                              <FileText className="w-4 h-4 text-secondary shrink-0" />
                            )}
                            <span className="font-mono font-medium text-on-surface truncate">
                              {item.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setStagedUploads((prev) => prev.filter((f) => f.id !== item.id))
                            }
                            aria-label={`Remove ${item.name}`}
                            className="p-1 text-on-surface-variant hover:text-primary cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* VIEW 4: SINGLE FILE CONTENT VIEW */}
              {viewMode === 'view-file' && selectedFile && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFileId(null);
                          setViewMode('repo');
                        }}
                        className="inline-flex items-center gap-1 text-primary hover:underline cursor-pointer font-medium"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{REPO_NAME}</span>
                      </button>
                      <span className="text-on-surface-variant">/</span>
                      <span className="font-mono font-medium text-on-surface">
                        {selectedFile.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedFile.kind === 'text' &&
                        selectedFile.name.toLowerCase().endsWith('.md') && (
                          <button
                            type="button"
                            onClick={() => setFileViewRaw((prev) => !prev)}
                            className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/45 text-xs font-medium text-on-surface hover:border-outline transition-colors cursor-pointer whitespace-nowrap"
                          >
                            {fileViewRaw ? 'Rendered' : 'Raw'}
                          </button>
                        )}

                      {selectedFile.kind === 'text' && (
                        <button
                          type="button"
                          onClick={() => handleStartEditFile(selectedFile)}
                          className={`px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-xs font-medium text-on-surface hover:border-primary/50 transition-colors cursor-pointer whitespace-nowrap ${ringClass(
                            'readme-file-row'
                          )}`}
                        >
                          Edit file
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-outline-variant/45 overflow-hidden">
                    <div className="bg-surface-container-low/65 px-4 py-2.5 border-b border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
                      <span>Latest commit: {selectedFile.lastCommitMessage}</span>
                      <span className="font-mono">{formatShortTime(selectedFile.updatedAt)}</span>
                    </div>

                    <div className="p-5 sm:p-7 bg-surface-container-lowest">
                      {selectedFile.kind === 'image' ? (
                        <div className="flex flex-col items-center">
                          <img
                            src={selectedFile.content}
                            alt={selectedFile.name}
                            className="max-w-full max-h-[420px] rounded-lg border border-outline-variant/35 object-contain"
                          />
                        </div>
                      ) : selectedFile.name.toLowerCase().endsWith('.md') && !fileViewRaw ? (
                        <MarkdownPreview content={selectedFile.content} />
                      ) : (
                        <pre className="font-mono text-xs sm:text-[13px] text-on-surface whitespace-pre-wrap leading-relaxed overflow-x-auto">
                          {selectedFile.content || '(Empty file)'}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 5: COMMIT HISTORY */}
              {viewMode === 'commits' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-base font-medium text-on-surface">
                      Commits on{' '}
                      <code className="font-mono text-primary">{sandbox.activeBranch}</code>
                    </h2>
                    <button
                      type="button"
                      onClick={() => setViewMode('repo')}
                      className="text-xs font-medium text-primary hover:underline cursor-pointer"
                    >
                      Back to files
                    </button>
                  </div>

                  {branchCommits.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-outline-variant/55 p-8 text-center text-sm text-on-surface-variant">
                      No commits on {sandbox.activeBranch} yet. Add or upload a file to create your
                      first commit!
                    </div>
                  ) : (
                    <div className="rounded-xl border border-outline-variant/45 divide-y divide-outline-variant/25">
                      {branchCommits.map((c) => (
                        <div key={c.id} className="px-4 sm:px-5 py-3.5 space-y-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-medium text-on-surface">{c.message}</p>
                            <span className="font-mono text-xs text-on-surface-variant shrink-0 tabular-nums">
                              {formatShortTime(c.createdAt)}
                            </span>
                          </div>
                          {c.description && (
                            <p className="text-xs text-on-surface-variant">{c.description}</p>
                          )}
                          <p className="font-mono text-[11px] text-on-surface-variant/80">
                            Files: {c.fileNames.join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols): Guided Challenges Side Panel */}
        <aside
          aria-label="Guided Sandbox Challenges"
          data-section-title="Guided Sandbox Challenges"
          className="lg:col-span-4 rounded-xl bg-surface-container-lowest border border-outline-variant/50 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] p-5 sm:p-6 space-y-5 lg:sticky lg:top-24"
        >
          {/* Side Panel Header + Ask about this */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary block mb-1">
                Guided Challenges
              </span>
              <h2 className="text-lg font-medium text-on-surface leading-snug">
                Learn by doing
              </h2>
            </div>

            <AskAboutButton
              sectionId="sandbox-guided-challenges"
              topic="Practice Sandbox Challenges"
              lessonTitle="Practice Sandbox"
              sectionText={challengeContextText}
            />
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-on-surface-variant tabular-nums">
              <span>Checklist progress</span>
              <span className="font-mono font-medium text-on-surface">
                {completedCount} of {GUIDED_CHALLENGES.length} done
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-300"
                style={{
                  width: `${Math.round((completedCount / GUIDED_CHALLENGES.length) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Celebration Badge for Latest Completed Challenge */}
          {latestCelebration && (
            <div className="rounded-xl bg-secondary-container/30 border border-secondary/35 p-4 space-y-2">
              <div className="flex items-center gap-2 text-on-secondary-container">
                <Award className="w-4 h-4 text-secondary shrink-0" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                  {allChallengesComplete
                    ? 'All Challenges Complete · Badge Earned'
                    : `Badge Earned: ${latestCelebration.badgeTitle}`}
                </span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                {latestCelebration.explanation}
              </p>
              <p className="text-[11px] text-secondary font-medium">
                {latestCelebration.lessonCredit}
              </p>
            </div>
          )}

          {/* Friendly Hint Box (never an error) */}
          {friendlyHint && (
            <div
              role="note"
              className="rounded-xl bg-primary-fixed/25 border border-primary/30 p-3.5 flex items-start gap-2.5 text-xs text-on-surface"
            >
              <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1.5">
                <p className="leading-relaxed">{friendlyHint}</p>
                <button
                  type="button"
                  onClick={() => setFriendlyHint(null)}
                  className="text-[11px] font-medium text-primary hover:underline cursor-pointer"
                >
                  Got it
                </button>
              </div>
            </div>
          )}

          {/* Active Challenge "Show me" CTA */}
          {activeChallenge && (
            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-xs text-on-surface-variant">
                Stuck on Challenge {activeChallenge.number}?
              </span>
              <button
                type="button"
                onClick={handleShowMe}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-fixed/40 border border-primary/35 text-xs font-medium text-primary hover:bg-primary-fixed/65 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Show me</span>
              </button>
            </div>
          )}

          {/* Challenge Progress Checklist */}
          <ol className="space-y-3 pt-1">
            {GUIDED_CHALLENGES.map((challenge, idx) => {
              const isDone = completedSet.has(challenge.id);
              const isCurrent = activeChallenge?.id === challenge.id;

              return (
                <li
                  key={challenge.id}
                  ref={(el) => {
                    challengeCardRefs.current[challenge.id] = el;
                  }}
                  className={`rounded-xl border p-3.5 transition-colors ${
                    isDone
                      ? 'bg-secondary-container/15 border-secondary/30'
                      : isCurrent
                        ? 'bg-surface-container-low/70 border-primary/45'
                        : 'bg-surface-container-low/30 border-outline-variant/30 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                      ) : (
                        <Circle
                          className={`w-4 h-4 ${
                            isCurrent ? 'text-primary' : 'text-outline-variant'
                          }`}
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-semibold text-on-surface-variant">
                          Challenge {idx + 1}
                        </span>
                        {isDone && (
                          <span className="text-[11px] font-medium text-secondary whitespace-nowrap">
                            Done
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-[13px] font-medium text-on-surface leading-snug">
                        {challenge.title}
                      </p>

                      {!isDone && (
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {challenge.description}
                        </p>
                      )}

                      {isDone && (
                        <p className="text-xs text-on-secondary-container leading-relaxed pt-1">
                          {challenge.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>

      {/* COMMIT CHANGES BOX (Modal) */}
      {commitBoxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/35 backdrop-blur-[2px]"
          onClick={() => setCommitBoxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="commit-box-title"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onDragOver={(e) => {
              e.preventDefault();
              setCommitDragOver(true);
            }}
            onDragLeave={() => setCommitDragOver(false)}
            onDrop={handleCommitDrop}
            className={`w-full max-w-lg rounded-xl bg-surface-container-lowest border shadow-[0_16px_40px_-4px_rgba(28,25,23,0.18)] overflow-hidden transition-colors ${
              commitDragOver
                ? 'border-primary ring-2 ring-primary/25'
                : 'border-outline-variant/55'
            }`}
          >
            <div className="bg-surface-container-low/80 px-5 py-4 border-b border-outline-variant/35 flex items-center justify-between">
              <h2 id="commit-box-title" className="text-base font-medium text-on-surface">
                Commit changes
              </h2>
              <button
                type="button"
                onClick={() => setCommitBoxOpen(false)}
                className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label
                  htmlFor="sandbox-commit-message"
                  className="block text-xs font-medium text-on-surface mb-1.5"
                >
                  Commit message
                </label>
                <input
                  id="sandbox-commit-message"
                  type="text"
                  value={commitMessage}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/!\[[^\]]*\]\([^)]*\)|^data:image\//i.test(val)) {
                      triggerCommitImageNote();
                      return;
                    }
                    setCommitMessage(val);
                    if (commitBoxError) setCommitBoxError(null);
                  }}
                  onPaste={handleCommitPaste}
                  placeholder={
                    editingFileId
                      ? 'e.g. Add welcome message to README.md'
                      : 'Write a short note explaining what changed'
                  }
                  className={`w-full font-mono text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-on-surface focus:outline-none focus:border-primary ${ringClass(
                    'commit-message-input'
                  )}`}
                />
              </div>

              <div>
                <label
                  htmlFor="sandbox-commit-description"
                  className="block text-xs font-medium text-on-surface-variant mb-1.5"
                >
                  Extended description (optional)
                </label>
                <textarea
                  id="sandbox-commit-description"
                  rows={3}
                  value={commitDescription}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/!\[[^\]]*\]\([^)]*\)|data:image\//i.test(val)) {
                      triggerCommitImageNote();
                      return;
                    }
                    setCommitDescription(val);
                  }}
                  onPaste={handleCommitPaste}
                  placeholder="Add an optional longer note..."
                  className="w-full font-mono text-xs px-3.5 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/45 text-on-surface focus:outline-none focus:border-primary resize-none"
                />
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={triggerCommitImageNote}
                    className="inline-flex items-center gap-1.5 text-[11px] text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    <Paperclip className="w-3 h-3" />
                    <span>Attach an image</span>
                  </button>
                  <span className="text-[11px] text-on-surface-variant/75">Plain text only</span>
                </div>
              </div>

              {commitImageWarning && (
                <div
                  role="note"
                  className="rounded-lg bg-primary-fixed/30 border border-primary/35 p-3.5 flex items-start gap-2.5 text-xs text-on-surface"
                >
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-1.5 leading-relaxed">
                    <p>{COMMIT_IMAGE_NOTE}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setCommitBoxOpen(false);
                        handleStartUploadFiles();
                      }}
                      className="font-medium text-primary hover:underline cursor-pointer"
                    >
                      Open Upload files →
                    </button>
                  </div>
                </div>
              )}

              {/* Branch Target Radio Options */}
              <div className="rounded-lg border border-outline-variant/40 bg-surface-container-low/45 p-3.5 space-y-2.5">
                <label className="flex items-start gap-2.5 text-xs text-on-surface cursor-pointer">
                  <input
                    type="radio"
                    name="commit-branch-target"
                    checked={commitTargetMode === 'direct'}
                    onChange={() => setCommitTargetMode('direct')}
                    className="mt-0.5 accent-primary cursor-pointer"
                  />
                  <span>
                    Commit directly to the{' '}
                    <code className="font-mono font-medium text-primary">
                      {sandbox.activeBranch}
                    </code>{' '}
                    branch
                  </span>
                </label>

                <label className="flex items-start gap-2.5 text-xs text-on-surface cursor-pointer">
                  <input
                    type="radio"
                    name="commit-branch-target"
                    checked={commitTargetMode === 'new-branch'}
                    onChange={() => setCommitTargetMode('new-branch')}
                    className="mt-0.5 accent-primary cursor-pointer"
                  />
                  <span className="flex-1">
                    Create a new branch for this commit
                    {commitTargetMode === 'new-branch' && (
                      <input
                        type="text"
                        value={commitNewBranchName}
                        onChange={(e) => setCommitNewBranchName(e.target.value)}
                        placeholder="e.g. my-experiment"
                        aria-label="New branch name for commit"
                        className="mt-2 w-full font-mono text-xs px-2.5 py-1.5 rounded bg-surface-container-lowest border border-outline-variant/45 text-on-surface focus:outline-none focus:border-primary"
                      />
                    )}
                  </span>
                </label>
              </div>

              {commitBoxError && (
                <p role="alert" className="text-xs text-primary font-medium">
                  {commitBoxError}
                </p>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-outline-variant/25">
                <button
                  type="button"
                  onClick={() => setCommitBoxOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-xs font-medium text-on-surface-variant hover:text-on-surface cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCommitSubmit}
                  className={`px-5 py-2 rounded-lg bg-secondary text-on-secondary text-xs font-medium hover:opacity-95 transition-all cursor-pointer whitespace-nowrap ${ringClass(
                    'commit-submit-btn'
                  )}`}
                >
                  Commit changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
