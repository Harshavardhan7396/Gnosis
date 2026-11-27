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
      "Your own personal copy of someone else's repository on GitHub.",
    comparison: "Like a photocopy of someone's recipe book on your own shelf so you can scribble freely.",
    whereToFind:
      "Click the Fork button near the top right of someone else's repository page.",
  },
  clone: {
    meaning:
      'A copy of a repository downloaded to your computer so you can work on it locally or offline.',
    comparison: 'Like carrying a copy of the recipe book to your desk at home.',
    whereToFind:
      'Click the green <> Code button on a repository page to copy the HTTPS web address.',
  },
  'original repository': {
    meaning:
      'The repository belonging to someone else that you copied when you created a fork.',
    comparison: 'Like the original recipe book you copied from.',
    whereToFind:
      'Linked right under your fork name ("forked from original-owner/project").',
  },
  'download zip': {
    meaning:
      'A plain folder download of the repository files on your computer, without Git history.',
    comparison: 'Like printing out a folder of the current pages with no history notes attached.',
    whereToFind:
      'Click the green <> Code button on a repository page and choose Download ZIP.',
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
      "A note in your project's to-do list: a problem to fix, an idea to try, or a question to ask.",
    comparison: "Like a sticky note on the project's wall where anyone can write a problem or idea.",
    whereToFind:
      'Click the Issues tab near the top of any repository page.',
  },
  label: {
    meaning:
      'A colored tag added to an issue to show what kind of note it is, such as bug or documentation.',
    comparison: 'Like a colored sticker on a sticky note so you can spot similar notes fast.',
    whereToFind:
      'Shown under Labels on the right side of an issue, and next to titles in the Issues list.',
  },
  assignee: {
    meaning: 'The person chosen to work on an issue.',
    comparison: 'Like the teammate who takes the sticky note off the wall to work on it.',
    whereToFind: 'Click Assignees on the right side of an issue page.',
  },
  'open and closed': {
    meaning: 'Open means an issue is still waiting; Closed means it is fixed or finished.',
    comparison: 'Like sorting sticky notes into a "Waiting" column and a "Done" column.',
    whereToFind:
      'Click Open or Closed at the top of the Issues list, or look at the badge under an issue title.',
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
  tab: {
    meaning:
      'Tabs are the menu at the top of a repository. Each tab opens a different area of your project.',
    comparison: 'Like one door in the menu at the top of a repository.',
    whereToFind:
      'Look at the row of tabs right under the repository name (Code, Issues, Pull requests, and more).',
  },
  'github actions': {
    meaning:
      'GitHub Actions runs tasks for you automatically when something happens in your repository, such as a new commit.',
    comparison: 'Like a robot that does jobs for you without anyone pressing a button.',
    whereToFind: 'Click the Actions tab at the top of your repository.',
  },
  workflow: {
    meaning: 'A list of automatic steps saved in a file inside your repository.',
    comparison: 'Like a recipe card telling the robot which checks to run.',
    whereToFind:
      'Listed on the left side of the Actions tab, and saved inside the .github/workflows folder.',
  },
  run: {
    meaning: 'One time the workflow ran.',
    comparison: 'Like one ring of the school bell when a change arrives.',
    whereToFind: 'Shown in the main list inside the Actions tab with a green check or red cross.',
  },
  project: {
    meaning:
      'A planning board where you track work, often issues, as cards that move across columns.',
    comparison: 'Like a wall with sticky notes organized in Todo, Doing, and Done columns.',
    whereToFind: 'Click the Projects tab in a repository or New project in the + menu.',
  },
  card: {
    meaning: 'One task on a project planning board.',
    comparison: 'Like one sticky note on the wall that you move as work progresses.',
    whereToFind: 'Shown inside a column on the Projects board.',
  },
  column: {
    meaning: 'A stage of work on a project board, such as Todo, In progress, or Done.',
    comparison: 'Like one section on the wall where matching sticky notes sit together.',
    whereToFind: 'Displayed side by side across the Board view in the Projects tab.',
  },
  wiki: {
    meaning:
      "A set of written pages for your project's guides and notes, kept separate from your files.",
    comparison: 'Like the instruction booklet kept inside a board game box.',
    whereToFind: 'Click the Wiki tab in the top row of tabs on a repository.',
  },
  dependabot: {
    meaning: 'A helper that warns you about risky tools or packages your project uses.',
    comparison: 'Like a safety recall notice for a tool inside your workshop.',
    whereToFind: 'Shown under Security and quality → Overview.',
  },
  'secret scanning': {
    meaning: 'A guard that spots passwords, API keys, or tokens uploaded by mistake.',
    comparison: 'Like a gatekeeper checking that you did not drop your house keys in public.',
    whereToFind: 'Shown under Security and quality → Overview.',
  },
  'code scanning': {
    meaning: 'An automatic check that looks through your code for common coding mistakes.',
    comparison: 'Like a smoke alarm scanning for problems automatically.',
    whereToFind: 'Shown under Security and quality → Overview (optional and needs setup).',
  },
  'security policy': {
    meaning: 'A short note telling people how to report a safety problem safely.',
    comparison: 'Like a sign saying who to call if something goes wrong in a building.',
    whereToFind: 'Shown under Security and quality → Overview.',
  },
  insights: {
    meaning: 'Charts and numbers showing activity in your repository.',
    comparison: 'Like a school report card showing what happened this week.',
    whereToFind: 'Click the Insights tab near the right side of the repository tab bar.',
  },
  pulse: {
    meaning: 'A one-week summary of pull requests, issues, and commits in your project.',
    comparison: 'Like the front page of your weekly project report card.',
    whereToFind: 'Opens first when you click the Insights tab.',
  },
  contributors: {
    meaning: 'The people who changed files or added commits to the project.',
    comparison: 'Like the list of classmates who helped write a group project.',
    whereToFind: 'Click Contributors in the left menu of the Insights tab.',
  },
  traffic: {
    meaning: 'Numbers showing visits and clones of your repository over the last 14 days.',
    comparison: 'Like a visitor counter at the door showing recent guests.',
    whereToFind: 'Click Traffic in the left menu of the Insights tab.',
  },
  'default branch': {
    meaning: 'The main branch of your project, usually named main.',
    comparison: 'Like the front display copy of a book that visitors see first.',
    whereToFind: 'Shown in Settings → General under Default branch.',
  },
  collaborator: {
    meaning: 'Someone you invite to help edit and manage your repository.',
    comparison: 'Like giving a trusted friend a spare key to help work on your project.',
    whereToFind: 'Click Settings → Collaborators in the left menu.',
  },
  visibility: {
    meaning: 'Whether your repository is Public (anyone can see it) or Private (only invited people).',
    comparison: 'Like choosing whether a notebook sits on a public library shelf or in a locked desk.',
    whereToFind: 'Shown at the bottom of Settings → General inside the Danger Zone.',
  },
  'danger zone': {
    meaning: 'The section at the bottom of Settings with big actions that are hard to undo, like deleting.',
    comparison: 'Like a locked red switch box for major changes you rarely touch.',
    whereToFind: 'Scroll to the very bottom of Settings → General.',
  },
  copilot: {
    meaning: "GitHub's AI helper that can answer questions and help work on tasks.",
    comparison: 'Like an optional robot assistant sitting beside your desk.',
    whereToFind: 'Click the Agents tab in a repository.',
  },
  'ai agent': {
    meaning: 'An AI helper that does small tasks for you automatically.',
    comparison: 'Like a helper robot you can ask to handle a small job.',
    whereToFind: 'Opens from the Agents tab (some features need a paid Copilot plan).',
  },
  release: {
    meaning: 'A named, downloadable version of your project, with notes about what changed.',
    comparison: 'Like a bakery packing a labeled bag ("Fresh batch, version 1") instead of handing customers the whole kitchen.',
    whereToFind: 'Click Releases in the right sidebar of the Code tab, then click Create a new release.',
  },
  tag: {
    meaning: 'A bookmark placed on one commit to mark a version, like v1.0.0.',
    comparison: 'Like sticking a labeled tab on one page of a notebook to mark an important milestone.',
    whereToFind: 'Chosen at the top of the new release form (Choose a tag) or under Tags on the Code tab.',
  },
  'version number': {
    meaning: 'A number like v1.0.0 that shows which update of a project you are looking at.',
    comparison: 'Like edition numbers on a book: v1.0.1 for a small fix, v1.1.0 for a new feature.',
    whereToFind: 'Typed into the Tag box when creating a release and shown on the release page.',
  },
  'release notes': {
    meaning: 'A short list of what is new, improved, or fixed in a release.',
    comparison: 'Like the little note inside a freshly packed box telling you what changed since last time.',
    whereToFind: 'Written in the Description box when making a release (or filled with Generate release notes).',
  },
  'github pages': {
    meaning: 'A free GitHub feature that turns HTML files in a public repository into a live website.',
    comparison: 'Like printing a poster and putting it in a shop window so anyone walking by can see it.',
    whereToFind: 'Open Settings → Pages, pick Deploy from a branch, choose main and / (root), and click Save.',
  },
  'index.html': {
    meaning: 'The main homepage file that a web browser loads first when someone opens your site.',
    comparison: 'Like the front cover or entrance door of your website.',
    whereToFind: 'Created as a file named index.html at the top level (/ root) of your repository.',
  },
  deploy: {
    meaning: 'To publish your project files so they go live on the web for people to visit.',
    comparison: 'Like moving your finished poster from your desk into the front window.',
    whereToFind: 'Starts automatically when you click Save in Settings → Pages or push commits to main.',
  },
  'static website': {
    meaning: 'A website built from ready-made HTML, CSS, and image files that do not need a custom server.',
    comparison: 'Like a printed brochure that shows the same clear pages to every visitor.',
    whereToFind: 'Hosted for free on GitHub Pages for public repositories.',
  },
  gist: {
    meaning: 'A tiny repository for sharing one file or snippet with a link.',
    comparison: 'Like a sticky note for code that still remembers your edits.',
    whereToFind: 'Visit gist.github.com or click the + menu at the top right and choose New gist.',
  },
  snippet: {
    meaning: 'A small piece of code or text, like a single tip, function, or checklist.',
    comparison: 'Like one short recipe card instead of a whole binder.',
    whereToFind: 'Pasted into the content box when creating a gist.',
  },
  'secret gist': {
    meaning: 'A gist that is not listed in public search, though anyone who has the link can read it.',
    comparison: 'Like an unlisted postcard—hidden from the directory, not locked.',
    whereToFind: 'Created with the default Create secret gist button at gist.github.com.',
  },
  'public gist': {
    meaning: 'A gist listed openly so everyone can find and read it.',
    comparison: 'Like pinning a note on a public bulletin board.',
    whereToFind: 'Click the arrow beside Create secret gist and pick Create public gist.',
  },
  'profile readme': {
    meaning: 'A short welcome message shown right at the top of your GitHub profile page.',
    comparison: 'Like wearing a friendly name tag with a quick hello at an event.',
    whereToFind: 'Saved as README.md inside a Public repository named exactly like your username.',
  },
  'special repository': {
    meaning: 'A Public repository named exactly like your username that displays its README on your profile.',
    comparison: 'Like a secret door on GitHub that opens when both names match.',
    whereToFind: 'Shows "You found a secret!" on the Create a new repository screen.',
  },
  profile: {
    meaning: 'Your public page on GitHub showing your picture, repositories, and Profile README.',
    comparison: 'Like your personal front page or introduction card on GitHub.',
    whereToFind: 'Click your profile picture at the top right and choose Your profile.',
  },
  git: {
    meaning: 'A free program installed on your computer that tracks every change to your files.',
    comparison: 'Like the stove in your own kitchen while GitHub is the shared kitchen online.',
    whereToFind: 'Run git --version in Terminal (Mac/Linux) or Git Bash (Windows).',
  },
  terminal: {
    meaning: 'A text window on your computer where you type short commands instead of clicking buttons.',
    comparison: 'Like a direct walkie-talkie for telling your computer exactly what to do.',
    whereToFind: 'Open Git Bash on Windows, Terminal on Mac (Cmd+Space), or Ctrl+Alt+T on Linux.',
  },
  command: {
    meaning: 'A short text instruction you type in a terminal and run by pressing Enter.',
    comparison: 'Like typing a clear one-line order such as git --version or cd my-first-project.',
    whereToFind: 'Typed at the prompt inside Terminal or Git Bash, followed by pressing Enter.',
  },
  'git config': {
    meaning: 'A Git command that saves settings on your computer, like your name and email.',
    comparison: 'Like writing your name tag once so every future commit knows who saved it.',
    whereToFind: 'Run git config --global user.name "Your Name" in your terminal.',
  },
  cd: {
    meaning: 'Stands for "change directory" and moves your terminal into another folder.',
    comparison: 'Like double-clicking a folder to step inside it before you open the files.',
    whereToFind: 'Type cd my-first-project (with your project folder name) and press Enter.',
  },
  'working tree': {
    meaning: 'Your project folder on your computer where you see and edit your current files.',
    comparison: 'Like your workbench holding the files you are working on right now.',
    whereToFind: 'Checked anytime by typing git status inside your cloned project folder.',
  },
  origin: {
    meaning: "Git's default nickname for the online copy of your repository on GitHub.",
    comparison: 'Like a saved bookmark linking your laptop folder back to your GitHub page.',
    whereToFind: 'Created automatically by git clone and shown when you run git status.',
  },
  'staging area': {
    meaning:
      'A waiting area where you place the exact file changes you want in your next commit.',
    comparison: 'Like placing selected items into a shipping box before you seal it with tape.',
    whereToFind: 'Put files into it with git add, and inspect it anytime with git status.',
  },
  'untracked file': {
    meaning:
      'A new file in your project folder that Git notices, but has not added to any commit yet.',
    comparison: 'Like a fresh note on your desk that is not packed inside your box yet.',
    whereToFind: 'Shown in red under Untracked files when you type git status.',
  },
  'commit id': {
    meaning:
      'The short unique code (like 3f9c2ab) Git assigns to each saved commit so you can find that snapshot.',
    comparison: 'Like a tracking number stamped on a sealed box so you can look up that exact save point.',
    whereToFind: 'Shown right after you run git commit -m "..." and in your commit history.',
  },
  push: {
    meaning:
      'Sending your saved local commits from your computer up to your repository on GitHub.',
    comparison: 'Like dropping your sealed letter into the mailbox so your team receives it.',
    whereToFind: 'Type git push in your terminal inside your cloned project folder.',
  },
  pull: {
    meaning:
      'Downloading newer commits from GitHub down to your computer so your local folder stays up to date.',
    comparison: 'Like opening your mailbox to bring home the new letters your friends sent.',
    whereToFind: 'Type git pull in your terminal inside your cloned project folder.',
  },
  remote: {
    meaning:
      'The online copy of your repository stored on GitHub, usually nicknamed origin.',
    comparison: 'Like the shared team board online connected to the notebook on your desk.',
    whereToFind: 'Linked automatically by git clone and used whenever you run git push or git pull.',
  },
  'personal access token': {
    meaning:
      'A special secret key created on GitHub that you use to sign in from the terminal instead of your password.',
    comparison: 'Like a special passcard generated just for your terminal when a regular password is not accepted.',
    whereToFind: 'GitHub Settings → Developer settings → Personal access tokens.',
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
  'original repository': 'Original repository',
  'download zip': 'Download ZIP',
  merge: 'Merge',
  issue: 'Issue',
  markdown: 'Markdown',
  'main branch': 'main branch',
  'commit message': 'Commit message',
  'base branch': 'Base branch',
  'compare branch': 'Compare branch',
  review: 'Review',
  label: 'Label',
  assignee: 'Assignee',
  'open and closed': 'Open and Closed',
  tab: 'Tab',
  'github actions': 'GitHub Actions',
  workflow: 'Workflow',
  run: 'Run',
  project: 'Project',
  card: 'Card',
  column: 'Column',
  wiki: 'Wiki',
  dependabot: 'Dependabot',
  'secret scanning': 'Secret scanning',
  'code scanning': 'Code scanning',
  'security policy': 'Security policy',
  insights: 'Insights',
  pulse: 'Pulse',
  contributors: 'Contributors',
  traffic: 'Traffic',
  'default branch': 'Default branch',
  collaborator: 'Collaborator',
  visibility: 'Visibility',
  'danger zone': 'Danger Zone',
  copilot: 'Copilot',
  'ai agent': 'AI agent',
  release: 'Release',
  tag: 'Tag',
  'version number': 'Version number',
  'release notes': 'Release notes',
  'github pages': 'GitHub Pages',
  'index.html': 'index.html',
  deploy: 'Deploy',
  'static website': 'Static website',
  gist: 'Gist',
  snippet: 'Snippet',
  'secret gist': 'Secret gist',
  'public gist': 'Public gist',
  'profile readme': 'Profile README',
  'special repository': 'Special repository',
  profile: 'Profile',
  git: 'Git',
  terminal: 'Terminal',
  command: 'Command',
  'git config': 'git config',
  cd: 'cd',
  'working tree': 'Working tree',
  origin: 'origin',
  'staging area': 'Staging area',
  'untracked file': 'Untracked file',
  'commit id': 'Commit ID',
  push: 'Push',
  pull: 'Pull',
  remote: 'Remote',
  'personal access token': 'Personal access token',
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
  'original repository': 'original repository',
  'download zip': 'download zip',
  merge: 'merge',
  merged: 'merge',
  merging: 'merge',
  review: 'review',
  reviews: 'review',
  issue: 'issue',
  issues: 'issue',
  label: 'label',
  labels: 'label',
  assignee: 'assignee',
  assignees: 'assignee',
  'open and closed': 'open and closed',
  markdown: 'markdown',
  md: 'markdown',
  tab: 'tab',
  tabs: 'tab',
  'repository tab': 'tab',
  'repository tabs': 'tab',
  'github actions': 'github actions',
  actions: 'github actions',
  'actions tab': 'github actions',
  workflow: 'workflow',
  workflows: 'workflow',
  run: 'run',
  runs: 'run',
  'workflow run': 'run',
  project: 'project',
  projects: 'project',
  'projects tab': 'project',
  card: 'card',
  cards: 'card',
  column: 'column',
  columns: 'column',
  wiki: 'wiki',
  wikis: 'wiki',
  'wiki tab': 'wiki',
  dependabot: 'dependabot',
  'dependabot alerts': 'dependabot',
  'secret scanning': 'secret scanning',
  'code scanning': 'code scanning',
  'security policy': 'security policy',
  insights: 'insights',
  'insights tab': 'insights',
  pulse: 'pulse',
  contributors: 'contributors',
  contributor: 'contributors',
  traffic: 'traffic',
  'default branch': 'default branch',
  collaborator: 'collaborator',
  collaborators: 'collaborator',
  visibility: 'visibility',
  'danger zone': 'danger zone',
  copilot: 'copilot',
  'github copilot': 'copilot',
  'ai agent': 'ai agent',
  'ai agents': 'ai agent',
  agents: 'ai agent',
  release: 'release',
  releases: 'release',
  tag: 'tag',
  tags: 'tag',
  'version number': 'version number',
  'version numbers': 'version number',
  version: 'version number',
  'release notes': 'release notes',
  'github pages': 'github pages',
  pages: 'github pages',
  'index html': 'index.html',
  'index.html': 'index.html',
  deploy: 'deploy',
  deployed: 'deploy',
  deploying: 'deploy',
  'static website': 'static website',
  'static websites': 'static website',
  'static site': 'static website',
  gist: 'gist',
  gists: 'gist',
  'new gist': 'gist',
  snippet: 'snippet',
  snippets: 'snippet',
  'secret gist': 'secret gist',
  'secret gists': 'secret gist',
  'public gist': 'public gist',
  'public gists': 'public gist',
  'profile readme': 'profile readme',
  'special repository': 'special repository',
  'special repo': 'special repository',
  profile: 'profile',
  'profile page': 'profile',
  git: 'git',
  terminal: 'terminal',
  'git bash': 'terminal',
  command: 'command',
  commands: 'command',
  'git config': 'git config',
  cd: 'cd',
  'change directory': 'cd',
  'working tree': 'working tree',
  origin: 'origin',
  'git clone': 'clone',
  'staging area': 'staging area',
  staged: 'staging area',
  'git add': 'staging area',
  'untracked file': 'untracked file',
  'untracked files': 'untracked file',
  'commit id': 'commit id',
  'commit ids': 'commit id',
  'git commit': 'commit',
  push: 'push',
  pushes: 'push',
  pushed: 'push',
  pushing: 'push',
  'git push': 'push',
  pull: 'pull',
  pulls: 'pull',
  pulled: 'pull',
  pulling: 'pull',
  'git pull': 'pull',
  remote: 'remote',
  remotes: 'remote',
  'personal access token': 'personal access token',
  'personal access tokens': 'personal access token',
  pat: 'personal access token',
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
