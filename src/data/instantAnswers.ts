export interface AskResult {
  meaning: string;
  comparison: string;
  whereToFind: string;
}

export const INSTANT_ANSWERS: Record<string, AskResult> = {
  readme: {
    meaning:
      'A welcome file (usually README.md) that explains what a project does and how to use it.',
    comparison: 'Like the cover page and welcome note at the front of a cookbook.',
    whereToFind:
      'Shown automatically right below the file list on a repository’s main Code page.',
  },
  repository: {
    meaning:
      'A project folder on GitHub that holds your files alongside their full history of changes.',
    comparison: 'Like a smart project binder that remembers every draft you ever saved.',
    whereToFind:
      'Open your Repositories tab from your profile menu, or click New from the top + button.',
  },
  branch: {
    meaning:
      'A separate copy of your project where you can try new edits without touching the main version.',
    comparison: 'Like making a photocopy of a drawing to test colors before painting the original.',
    whereToFind:
      'Click the branch dropdown (usually labeled main) above the file list on the Code tab.',
  },
  commit: {
    meaning:
      'A saved snapshot of your changes at one moment, paired with a short note saying what changed.',
    comparison: 'Like a save-game checkpoint with a quick label explaining your progress.',
    whereToFind:
      'Click the Commits link with the small clock icon near the top right of the file list.',
  },
  'pull request': {
    meaning:
      'A message asking a project group or owner to review changes from your branch and add them to main.',
    comparison: 'Like handing your edited essay to a teacher or group to approve before updating the original.',
    whereToFind:
      'Click the Pull requests tab near the top of any repository page.',
  },
  'base branch': {
    meaning:
      'The target branch (usually main) that receives your new changes when a pull request is merged.',
    comparison: 'Like the final clean essay waiting to get approved updates.',
    whereToFind:
      'The left branch dropdown labeled base on the Compare or New pull request page.',
  },
  'compare branch': {
    meaning:
      'Your own branch containing the new commits you want to show and add to the base branch.',
    comparison: 'Like your edited draft copy with your changes highlighted.',
    whereToFind:
      'The right branch dropdown labeled compare on the Compare or New pull request page.',
  },
  fork: {
    meaning:
      'Your own personal copy of someone else’s public project saved under your GitHub account.',
    comparison: 'Like copying a friend’s recipe card into your own box so you can tweak it safely.',
    whereToFind:
      'Click the Fork button in the top-right area of someone else’s repository page.',
  },
  clone: {
    meaning:
      'Downloading a full copy of a GitHub repository onto your own computer so you can work locally.',
    comparison: 'Like saving a whole shared folder onto your laptop so you can edit offline.',
    whereToFind:
      'Click the green <> Code button on a repository page to copy its download link.',
  },
  merge: {
    meaning:
      'Combining approved changes from your compare branch into the base branch.',
    comparison: 'Like stapling your corrected page neatly into the final essay.',
    whereToFind:
      'Open a Pull request page and click the green Merge pull request button.',
  },
  review: {
    meaning:
      'Reading someone’s pull request changes and approving them or leaving helpful comments.',
    comparison: 'Like a teammate reading your essay draft and leaving encouraging notes.',
    whereToFind:
      'Click the Files changed tab inside a pull request and click Review changes.',
  },
  issue: {
    meaning:
      'A note or task card used to report a problem, ask a question, or suggest a new idea.',
    comparison: 'Like putting a sticky note on a shared project board for the team to see.',
    whereToFind:
      'Click the Issues tab near the top of any repository page.',
  },
  markdown: {
    meaning:
      'A simple plain-text way to format notes using symbols like # for headings and ** for bold.',
    comparison: 'Like writing quick shorthand notes that automatically turn into a neat page.',
    whereToFind:
      'Used inside README.md files and comments anywhere you write text on GitHub.',
  },
  'main branch': {
    meaning:
      'The primary, official timeline of a repository where your finished and trusted files live.',
    comparison: 'Like the clean published edition of a book sitting on the display shelf.',
    whereToFind:
      'Shown in the branch dropdown labeled main above the file list on the Code tab.',
  },
  'commit message': {
    meaning:
      'The short, plain-English note you write when saving a commit to explain what changed.',
    comparison: 'Like a clear label on a storage box so you know what is inside later.',
    whereToFind:
      'Typed into the Commit changes box when saving a file and shown in Commit history.',
  },
};

export const TERM_DISPLAY_NAMES: Record<keyof typeof INSTANT_ANSWERS, string> = {
  readme: 'README',
  repository: 'Repository',
  branch: 'Branch',
  commit: 'Commit',
  'pull request': 'Pull request',
  fork: 'Fork',
  clone: 'Clone',
  merge: 'Merge',
  issue: 'Issue',
  markdown: 'Markdown',
  'main branch': 'main branch',
  'commit message': 'Commit message',
  'base branch': 'Base branch',
  'compare branch': 'Compare branch',
  review: 'Review',
};

const ALIAS_TO_KEY: Record<string, keyof typeof INSTANT_ANSWERS> = {
  readme: 'readme',
  'readme md': 'readme',
  'readme file': 'readme',
  repository: 'repository',
  repositories: 'repository',
  repo: 'repository',
  repos: 'repository',
  branch: 'branch',
  branches: 'branch',
  'main branch': 'main branch',
  'main branches': 'main branch',
  'base branch': 'base branch',
  'base branches': 'base branch',
  'compare branch': 'compare branch',
  'compare branches': 'compare branch',
  commit: 'commit',
  commits: 'commit',
  committed: 'commit',
  'commit message': 'commit message',
  'commit messages': 'commit message',
  'pull request': 'pull request',
  'pull requests': 'pull request',
  pr: 'pull request',
  prs: 'pull request',
  fork: 'fork',
  forks: 'fork',
  forking: 'fork',
  clone: 'clone',
  cloning: 'clone',
  merge: 'merge',
  merged: 'merge',
  merging: 'merge',
  review: 'review',
  reviews: 'review',
  issue: 'issue',
  issues: 'issue',
  markdown: 'markdown',
  md: 'markdown',
};

export function normalizeQuestionKey(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[?!.,'"]+$/g, '')
    .replace(/\s+/g, ' ');
}

export interface InstantTermMatch {
  key: string;
  displayName: string;
  answer: AskResult;
}

export function findInstantTermMatch(question: string): InstantTermMatch | null {
  const normalized = question
    .trim()
    .toLowerCase()
    .replace(/[?!.,'"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) return null;

  const directMatch = ALIAS_TO_KEY[normalized];
  if (directMatch) {
    return {
      key: String(directMatch),
      displayName: TERM_DISPLAY_NAMES[directMatch],
      answer: INSTANT_ANSWERS[directMatch],
    };
  }

  // Match simple beginner definition questions or phrases like "a branch", "what is a pull request"
  const stripped = normalized
    .replace(
      /^(what is|what s|whats|what are|what does|meaning of|define|explain|tell me about|how does)\s+/,
      ''
    )
    .replace(/^(a|an|the)\s+/, '')
    .replace(/\s+(mean|means|work|works|do|in github|on github)$/g, '')
    .replace(/\s+(in github|on github)$/g, '')
    .trim();

  const strippedMatch = ALIAS_TO_KEY[stripped];
  if (strippedMatch) {
    return {
      key: String(strippedMatch),
      displayName: TERM_DISPLAY_NAMES[strippedMatch],
      answer: INSTANT_ANSWERS[strippedMatch],
    };
  }

  return null;
}

export function findInstantAnswer(question: string): AskResult | null {
  return findInstantTermMatch(question)?.answer ?? null;
}
