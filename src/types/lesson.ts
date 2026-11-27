export interface CodeSegment {
  type: 'text' | 'code';
  value: string;
}

export interface GlossaryTerm {
  key: string;
  term: string;
  meaning: string;
  analogy: string;
  whereToFind: string;
  lessonId: string;
}

export interface HeroMockupData {
  url: string;
  owner: string;
  repoName: string;
  visibility: string;
  commitCount: string;
  branchName: string;
  branchCount: string;
  addFileLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  existingFile?: {
    name: string;
    message: string;
  };
}

export interface ProgressStep {
  id: string;
  number: string;
  label: string;
  targetId: string;
}

export interface StepCallout {
  icon: 'lightbulb' | 'help' | 'bookmark';
  label: string;
  text: string;
}

export interface ScreenshotOverlayMarker {
  n: number;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

export interface LessonScreenshot {
  id?: string;
  title?: string;
  src: string;
  alt: string;
  caption: string;
  markers: ScreenshotOverlayMarker[];
}

export interface AddFileMockupData {
  kind: 'add-file-dropdown';
  windowTitle: string;
  branchName: string;
  metaText: string;
  buttonLabel: string;
  menuItems: Array<{
    id: string;
    label: string;
    active?: boolean;
  }>;
  hintText: string;
  screenshots?: LessonScreenshot[];
}

export interface EditorMockupData {
  kind: 'file-editor';
  windowTitle: string;
  repoPrefix: string;
  defaultFileName: string;
  defaultLines: Array<{
    prefix?: string;
    text: string;
    isBlank?: boolean;
    hasCursor?: boolean;
  }>;
  screenshots?: LessonScreenshot[];
}

export interface CommitMockupData {
  kind: 'commit-modal';
  windowTitle: string;
  heading: string;
  titleLabel: string;
  defaultTitle: string;
  descriptionLabel: string;
  defaultDescription: string;
  branchPrefix: string;
  branchName: string;
  branchSuffix: string;
  submitLabel: string;
  submittedLabel: string;
}

export interface BranchDropdownMockupData {
  kind: 'branch-dropdown';
  windowTitle: string;
  branchName: string;
  metaText: string;
  searchPlaceholder: string;
  branches: string[];
  hintText: string;
  screenshots?: LessonScreenshot[];
}

export interface BranchCreateMockupData {
  kind: 'branch-create';
  windowTitle: string;
  typedBranchName: string;
  baseBranch: string;
  hintText: string;
  screenshots?: LessonScreenshot[];
}

export interface BranchSwitchMockupData {
  kind: 'branch-switch';
  windowTitle: string;
  activeBranch: string;
  baseBranch: string;
  fileName: string;
  commitTitle: string;
  statusText: string;
}

export type StepMockupData =
  | AddFileMockupData
  | EditorMockupData
  | CommitMockupData
  | BranchDropdownMockupData
  | BranchCreateMockupData
  | BranchSwitchMockupData;

export interface LessonStep {
  id: string;
  eyebrow: string;
  titlePrefix: string;
  titleBold?: string;
  titleCodePill?: string;
  titleSuffix?: string;
  description: string;
  callout: StepCallout;
  align: 'text-left' | 'text-right';
  mockup: StepMockupData;
}

export interface PracticeStage {
  id: string;
  number: string;
  label: string;
  instruction: string;
  successMessage: string;
}

export interface PracticeData {
  mode: 'add-file' | 'create-branch';
  eyebrow: string;
  title: string;
  subtitle: string;
  repoOwner: string;
  repoName: string;
  branchName: string;
  suggestedFileName: string;
  suggestedBranchName?: string;
  defaultFileContent: string;
  defaultCommitMessage: string;
  stages: PracticeStage[];
}

export interface VocabularyCard {
  id: string;
  icon: 'folder' | 'branch' | 'check';
  accent: 'primary' | 'secondary';
  term: string;
  definition: string;
  analogyLabel: string;
  analogy: string;
}

export interface DiagramTakeaway {
  id: string;
  phase: 'branching' | 'committing' | 'merging';
  title: string;
  description: string;
}

export interface DiagramSectionData {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  legend: Array<{
    label: string;
    tone: 'dark' | 'primary';
  }>;
  takeaways: DiagramTakeaway[];
}

export interface QuizOption {
  id: string;
  labelPrefix: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface QuizData {
  id?: string;
  eyebrow: string;
  questionPrefix: string;
  questionCode?: string;
  questionSuffix: string;
  sectionTargetId?: string;
  sectionLabel?: string;
  options: QuizOption[];
}

export interface CompletionData {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  completedCtaLabel: string;
  nextUpPrefix: string;
  nextUpTitle: string;
  nextUpDuration: string;
}

export interface ConceptDiagramNode {
  label: string;
  sublabel?: string;
  tone?: 'neutral' | 'primary' | 'secondary';
}

export interface ConceptWhereMarker {
  number: number;
  label: string;
  description: string;
  xPercent: number;
  yPercent: number;
  screenshot?: LessonScreenshot;
}

export interface ConceptLessonContent {
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  oneLineMeaning: {
    eyebrow: string;
    term: string;
    meaning: string;
    extraTerm?: string;
    extraMeaning?: string;
  };
  diagram: {
    eyebrow: string;
    title: string;
    subtitle: string;
    variant:
      | 'git-timeline'
      | 'signup-flow'
      | 'dashboard-map'
      | 'repo-box'
      | 'commit-checkpoints'
      | 'pull-request-flow'
      | 'issue-flow'
      | 'fork-clone-flow'
      | 'staging-flow';
    nodes: ConceptDiagramNode[];
    caption: string;
  };
  whereToFind: {
    eyebrow: string;
    title: string;
    subtitle: string;
    windowUrl: string;
    screenType:
      | 'github-home'
      | 'signup-form'
      | 'dashboard'
      | 'repo-page'
      | 'commit-history'
      | 'pull-request-flow'
      | 'issues-page'
      | 'fork-clone-page'
      | 'agents-page';
    screenshotSrc?: string;
    screenshotAlt?: string;
    screenshotCaption?: string;
    screenshotsNote?: string;
    screenshots?: LessonScreenshot[];
    extraScreenshots?: LessonScreenshot[];
    showStepList?: boolean;
    commands?: Array<{
      id?: string;
      step?: string;
      label: string;
      command: string;
      note?: string;
    }>;
    markers: ConceptWhereMarker[];
  };
  secondaryWhere?: {
    eyebrow?: string;
    title: string;
    subtitle: string;
    windowUrl: string;
    screenshotSrc: string;
    screenshotAlt: string;
    screenshotCaption: string;
    markers: ConceptWhereMarker[];
  };
  afterMerging?: {
    eyebrow: string;
    title: string;
    text: string;
  };
  tip?: {
    eyebrow: string;
    title: string;
    text: string;
    codeSnippet?: string;
    copyable?: boolean;
  };
  commonMistake: {
    eyebrow: string;
    title: string;
    text: string;
    items?: Array<{
      title: string;
      text: string;
    }>;
    screenshot?: LessonScreenshot;
  };
}

export interface RoadmapLevel {
  id: string;
  number: number;
  title: string;
  ability: string;
}

export interface Lesson {
  id: string;
  slug: string;
  levelId: string;
  comingSoon?: boolean;
  unlockWithLevel?: boolean;
  kind: 'concept' | 'tutorial';
  cardTitle: string;
  cardDescription: string;
  readTime: string;
  meta: string;
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
  descriptionSegments: CodeSegment[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  heroMockup: HeroMockupData;
  progressSteps: ProgressStep[];
  // Present on 'tutorial' lessons (Lessons 5 and 7)
  steps?: LessonStep[];
  practice?: PracticeData;
  vocabulary?: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: VocabularyCard[];
  };
  diagram?: DiagramSectionData;
  // Present on 'concept' lessons (Lessons 1-4 and 6)
  concept?: ConceptLessonContent;
  // Single quiz (tutorial lessons) or 3-question quiz (concept lessons)
  quiz?: QuizData;
  quizzes?: QuizData[];
  reviewQuestions?: QuizData[];
  completion: CompletionData;
}

export interface AskSectionContext {
  id: string;
  topic: string;
  lessonTitle: string;
  sectionText: string;
  mode?: 'section' | 'selection';
  selectedText?: string;
  paragraphText?: string;
  sectionTitle?: string;
  autoQuestion?: string;
}

export type StuckScreenType =
  | 'repo-toolbar'
  | 'commit-box'
  | 'commit-missing'
  | 'branch-indicator'
  | 'file-mistake'
  | 'find-repo'
  | 'pr-no-banner'
  | 'pr-nothing-to-compare'
  | 'pr-merge-disabled'
  | 'issues-tab-missing'
  | 'issue-assign-someone'
  | 'issue-closed-mistake'
  | 'fork-button-missing'
  | 'fork-own-repo'
  | 'fork-already-exists'
  | 'settings-tab-missing'
  | 'tab-missing'
  | 'actions-no-runs'
  | 'actions-red-cross'
  | 'projects-cant-create'
  | 'projects-cant-drag'
  | 'wiki-tab-missing'
  | 'wiki-not-in-files'
  | 'security-tab-missing'
  | 'security-dependabot-disabled'
  | 'insights-community-discussions'
  | 'insights-dependency-disabled'
  | 'settings-cant-see'
  | 'agents-upgrade-page'
  | 'agents-tab-missing'
  | 'release-cant-find-create'
  | 'release-publish-greyed'
  | 'release-attach-binaries'
  | 'pages-404-error'
  | 'pages-cant-find-settings'
  | 'gist-create-greyed'
  | 'gist-delete'
  | 'profile-readme-not-showing'
  | 'profile-secret-message-missing'
  | 'git-command-not-found'
  | 'git-mac-developer-tools'
  | 'git-repo-not-found'
  | 'git-not-a-repo'
  | 'git-nothing-to-commit'
  | 'git-tell-me-who-you-are'
  | 'git-auth-failed'
  | 'git-everything-up-to-date'
  | 'git-no-upstream-branch'
  | 'git-installer-nothing-opened';

export interface StuckFixStep {
  number: number;
  label: string;
  description: string;
  xPercent: number;
  yPercent: number;
}

export interface StuckSituation {
  id: string;
  title: string;
  summary: string;
  whatIsHappening: string;
  whyItHappens: string;
  screenType: StuckScreenType;
  windowUrl: string;
  steps: StuckFixStep[];
}
