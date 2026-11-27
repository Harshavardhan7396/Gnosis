/**
 * GitStart Beginner Learning Path
 *
 * 7 sequential lessons in order. Completing a lesson unlocks the next one.
 * Add or edit lessons here without touching any React components.
 */

export const glossaryTerms = {
  repository: {
    key: 'repository',
    term: 'Repository',
    meaning:
      'A project folder tracked by GitHub that stores all your files alongside their complete history of changes.',
    analogy: 'A smart project vault that remembers every single revision ever saved.',
    whereToFind:
      'Open your Repositories tab from your profile menu, or click New from the + button in the top bar.',
    lessonId: 'what-is-repository',
  },
  branch: {
    key: 'branch',
    term: 'Branch',
    meaning:
      'An independent parallel copy of your project where you can work safely without changing the main version.',
    analogy: 'A draft photocopy you scribble on before touching the master archival document.',
    whereToFind:
      'Click the branch dropdown (usually labeled main) right above the file list on your Code tab.',
    lessonId: 'create-first-branch',
  },
  commit: {
    key: 'commit',
    term: 'Commit',
    meaning:
      'A saved snapshot of your files at a specific moment, paired with a short note explaining what changed.',
    analogy: 'A saved checkpoint in an adventure game with a timestamp and a label.',
    whereToFind:
      'Click the Commits link with the small clock icon near the top right of your repository file list.',
    lessonId: 'what-is-commit',
  },
  readme: {
    key: 'readme',
    term: 'README',
    meaning:
      'A welcome file (usually README.md) that explains what a project does and how someone can use it.',
    analogy: 'The cover page and welcome letter sitting right at the front of a cookbook.',
    whereToFind:
      'Displayed automatically directly beneath the file list on a repository’s main Code page.',
    lessonId: 'add-first-file',
  },
  markdown: {
    key: 'markdown',
    term: 'Markdown',
    meaning:
      'A simple plain-text formatting language that turns symbols like # and ** into clean headings and bold text.',
    analogy: 'Lightweight shorthand notes that automatically typeset themselves into a clean document.',
    whereToFind:
      'Used inside README.md files, issues, and comments wherever you write text on GitHub.',
    lessonId: 'add-first-file',
  },
  'main branch': {
    key: 'main branch',
    term: 'main branch',
    meaning:
      'The primary, official timeline of a repository where your finished and trusted files live.',
    analogy: 'The clean published edition of a book sitting on the display shelf.',
    whereToFind:
      'Shown by default in the branch selector button labeled main above the file list on the Code tab.',
    lessonId: 'add-first-file',
  },
  'pull request': {
    key: 'pull request',
    term: 'Pull request',
    meaning:
      'A polite message saying "I made changes on my branch. Please review them and add them to the main project."',
    analogy: 'Handing your edited essay to a teacher or group to approve before adding it.',
    whereToFind:
      'Click the green Compare & pull request banner button, or open the Pull requests tab at the top of a repository.',
    lessonId: 'pull-requests',
  },
  'base branch': {
    key: 'base branch',
    term: 'Base branch',
    meaning:
      'The destination branch in a pull request where the changes will go, usually main.',
    analogy: 'The final essay that everyone is building together.',
    whereToFind:
      'The left branch dropdown labeled base: on the New pull request screen.',
    lessonId: 'pull-requests',
  },
  'compare branch': {
    key: 'compare branch',
    term: 'Compare branch',
    meaning:
      'Your own branch that holds the new changes you want to share and review.',
    analogy: 'Your edited copy of the essay with your changes written on it.',
    whereToFind:
      'The right branch dropdown labeled compare: on the New pull request screen.',
    lessonId: 'pull-requests',
  },
  fork: {
    key: 'fork',
    term: 'Fork',
    meaning:
      "Your own personal copy of someone else's repository on GitHub.",
    analogy:
      "A photocopy of someone's recipe book on your own shelf where you can scribble freely.",
    whereToFind:
      "Click the Fork button near the top right of another person's repository page.",
    lessonId: 'fork-and-clone',
  },
  clone: {
    key: 'clone',
    term: 'Clone',
    meaning:
      'A copy of a repository downloaded onto your own computer so you can work locally or offline.',
    analogy: 'Carrying a copy of the recipe book to your desk at home.',
    whereToFind:
      'Click the green <> Code button above a repository file list and copy the HTTPS web address.',
    lessonId: 'fork-and-clone',
  },
  'original repository': {
    key: 'original repository',
    term: 'Original repository',
    meaning:
      'The repository belonging to someone else that you copied when you created a fork.',
    analogy: 'The original recipe book you copied from.',
    whereToFind:
      'Shown in a small link under your fork name ("forked from original-owner/project").',
    lessonId: 'fork-and-clone',
  },
  'download zip': {
    key: 'download zip',
    term: 'Download ZIP',
    meaning:
      'A plain folder of the project files downloaded to your computer, with no Git history.',
    analogy: 'A stack of printed pages in a folder, without the history of past drafts.',
    whereToFind:
      'Click the green <> Code button on a repository page and choose Download ZIP at the bottom of the menu.',
    lessonId: 'fork-and-clone',
  },
  merge: {
    key: 'merge',
    term: 'Merge',
    meaning:
      'Adding the approved changes from one branch cleanly into another branch, such as main.',
    analogy: 'Stapling your corrected page into the final essay.',
    whereToFind:
      'Open a pull request page and click the green Merge pull request button and confirm.',
    lessonId: 'pull-requests',
  },
  review: {
    key: 'review',
    term: 'Review',
    meaning:
      'Reading someone else’s changes in a pull request and either approving them or leaving helpful comments.',
    analogy: 'A friend or teacher reading your draft, adding notes, and giving a thumbs up.',
    whereToFind:
      'Open a pull request, click the Files changed tab, and click Review changes.',
    lessonId: 'pull-requests',
  },
  issue: {
    key: 'issue',
    term: 'Issue',
    meaning:
      "A note in your project's to-do list: a problem to fix, an idea to try, or a question to ask.",
    analogy:
      "A sticky note on the project's wall where anyone can write a problem, an idea, or a question.",
    whereToFind:
      'Click the Issues tab next to Code at the top of any repository page.',
    lessonId: 'issues',
  },
  label: {
    key: 'label',
    term: 'Label',
    meaning:
      'A colored tag added to an issue so everyone can see what kind of note it is, like bug or documentation.',
    analogy: 'A colored tag on the note so you can spot similar tasks fast.',
    whereToFind:
      'Shown under Labels on the right side of an issue, and next to titles in the Issues list.',
    lessonId: 'issues',
  },
  assignee: {
    key: 'assignee',
    term: 'Assignee',
    meaning: 'The person chosen to work on an issue.',
    analogy: 'The person who takes the note off the wall to work on it.',
    whereToFind:
      'Click Assignees on the right side of an issue page to pick someone.',
    lessonId: 'issues',
  },
  'open and closed': {
    key: 'open and closed',
    term: 'Open and Closed',
    meaning:
      'Open means an issue is still waiting, and Closed means it is fixed or finished.',
    analogy: 'Two sides of the wall: still waiting to be done, or already finished.',
    whereToFind:
      'Click Open or Closed at the top of the Issues list, or look at the badge under an issue title.',
    lessonId: 'issues',
  },
  'commit message': {
    key: 'commit message',
    term: 'Commit message',
    meaning:
      'The short, plain-English title you write when saving a commit to explain what changed and why.',
    analogy: 'A clear label on a storage box so you know what is inside without opening it.',
    whereToFind:
      'Typed inside the Commit changes box when saving a file, and listed beside each checkpoint in History.',
    lessonId: 'what-is-commit',
  },
  tab: {
    key: 'tab',
    term: 'Tab',
    meaning:
      'Tabs are the menu at the top of a repository. Each tab opens a different area of your project.',
    analogy: 'One door in the menu at the top of a repository.',
    whereToFind:
      'Look at the row of tabs right under the repository name (Code, Issues, Pull requests, and more).',
    lessonId: 'tabs-at-a-glance',
  },
  'github actions': {
    key: 'github actions',
    term: 'GitHub Actions',
    meaning: 'A robot that does jobs for you automatically when something happens in your repository.',
    analogy: 'A school bell that rings by itself when the time comes, without anyone pressing a button.',
    whereToFind: 'Click the Actions tab in the top row of your repository.',
    lessonId: 'actions-tab',
  },
  workflow: {
    key: 'workflow',
    term: 'Workflow',
    meaning: 'A list of automatic steps saved in a file inside your repository.',
    analogy: 'A checklist saved in a folder so the robot knows what to run every time.',
    whereToFind: 'Click New workflow in the Actions tab, or look inside the .github/workflows folder.',
    lessonId: 'actions-tab',
  },
  run: {
    key: 'run',
    term: 'Run',
    meaning: 'One time the workflow ran.',
    analogy: 'One time the school bell rang after a change arrived.',
    whereToFind: 'Shown in the main list inside the Actions tab with a green check or red cross.',
    lessonId: 'actions-tab',
  },
  project: {
    key: 'project',
    term: 'Project',
    meaning: 'A planning board where you track work, often issues, as cards that move across columns.',
    analogy: 'Sticky notes on a wall arranged in To do, Doing, and Done columns.',
    whereToFind: 'Click the Projects tab on a repository or New project in the + menu.',
    lessonId: 'projects-tab',
  },
  card: {
    key: 'card',
    term: 'Card',
    meaning: 'One task on a project planning board.',
    analogy: 'One sticky note on the wall that you drag to a new column when work moves.',
    whereToFind: 'Shown inside each column on the Board view of the Projects tab.',
    lessonId: 'projects-tab',
  },
  column: {
    key: 'column',
    term: 'Column',
    meaning: 'A stage of work on a project board, such as Todo, In progress, or Done.',
    analogy: 'One section on the wall for notes at the same stage of work.',
    whereToFind: 'Shown side by side on the Board view inside the Projects tab.',
    lessonId: 'projects-tab',
  },
  wiki: {
    key: 'wiki',
    term: 'Wiki',
    meaning: 'A booklet of written pages for your project guides and notes, kept separate from your files.',
    analogy: 'The instruction booklet kept inside a board game box.',
    whereToFind: 'Click the Wiki tab near the top of a repository.',
    lessonId: 'wiki-tab',
  },
  dependabot: {
    key: 'dependabot',
    term: 'Dependabot',
    meaning: 'A helper that warns you about risky tools or packages your project uses.',
    analogy: 'A safety recall notice for a tool inside your workshop.',
    whereToFind: 'Shown under Security and quality → Overview.',
    lessonId: 'security-and-quality-tab',
  },
  'secret scanning': {
    key: 'secret scanning',
    term: 'Secret scanning',
    meaning: 'A guard that spots passwords, API keys, or tokens uploaded by mistake.',
    analogy: 'A gatekeeper checking that you did not drop your house keys in public.',
    whereToFind: 'Shown under Security and quality → Overview.',
    lessonId: 'security-and-quality-tab',
  },
  'code scanning': {
    key: 'code scanning',
    term: 'Code scanning',
    meaning: 'An automatic check for common coding mistakes.',
    analogy: 'A smoke alarm scanning for problems automatically.',
    whereToFind: 'Shown under Security and quality → Overview (needs setup).',
    lessonId: 'security-and-quality-tab',
  },
  'security policy': {
    key: 'security policy',
    term: 'Security policy',
    meaning: 'A short note on who to tell about a safety problem and how to report it.',
    analogy: 'A sign in a building saying who to call if something goes wrong.',
    whereToFind: 'Shown at the top of Security and quality → Overview.',
    lessonId: 'security-and-quality-tab',
  },
  insights: {
    key: 'insights',
    term: 'Insights',
    meaning: 'Charts and numbers about activity in your project.',
    analogy: 'A school report card for your project, showing what happened this week.',
    whereToFind: 'Click the Insights tab near the right side of your repository tab bar.',
    lessonId: 'insights-tab',
  },
  pulse: {
    key: 'pulse',
    term: 'Pulse',
    meaning: 'A one-week summary of pull requests, issues, and commits in your project.',
    analogy: 'The front page of your weekly project report card.',
    whereToFind: 'Opens first when you click the Insights tab.',
    lessonId: 'insights-tab',
  },
  contributors: {
    key: 'contributors',
    term: 'Contributors',
    meaning: 'The people who changed the project.',
    analogy: 'The list of classmates who helped write a group project.',
    whereToFind: 'Click Contributors in the left menu of the Insights tab.',
    lessonId: 'insights-tab',
  },
  traffic: {
    key: 'traffic',
    term: 'Traffic',
    meaning: 'Visits and clones of your repository over the last 14 days.',
    analogy: 'A visitor counter at the door showing recent guests.',
    whereToFind: 'Click Traffic in the left menu of the Insights tab.',
    lessonId: 'insights-tab',
  },
  'default branch': {
    key: 'default branch',
    term: 'Default branch',
    meaning: 'The main branch of your project, usually main.',
    analogy: 'The clean front copy of a book sitting on the display shelf.',
    whereToFind: 'Shown in Settings → General under Default branch.',
    lessonId: 'settings-tab',
  },
  collaborator: {
    key: 'collaborator',
    term: 'Collaborator',
    meaning: 'Someone you invite to help edit and work on your repository.',
    analogy: 'A trusted friend given a spare key to the project room.',
    whereToFind: 'Click Settings → Collaborators in the left menu.',
    lessonId: 'settings-tab',
  },
  visibility: {
    key: 'visibility',
    term: 'Visibility',
    meaning: 'Whether a repository is public or private.',
    analogy: 'Choosing whether a notebook sits on an open library shelf or in a locked desk.',
    whereToFind: 'Shown in the Danger Zone at the bottom of Settings → General.',
    lessonId: 'settings-tab',
  },
  'danger zone': {
    key: 'danger zone',
    term: 'Danger Zone',
    meaning: 'The section in Settings with actions that are hard to undo, like deleting a repository.',
    analogy: 'A locked red switch box for big actions you rarely touch.',
    whereToFind: 'Scroll to the bottom of Settings → General.',
    lessonId: 'settings-tab',
  },
  copilot: {
    key: 'copilot',
    term: 'Copilot',
    meaning: "GitHub's AI helper.",
    analogy: 'A helper robot you can ask to do small jobs.',
    whereToFind: 'Opens from the Agents tab on a repository.',
    lessonId: 'agents-tab',
  },
  'ai agent': {
    key: 'ai agent',
    term: 'AI agent',
    meaning: 'A helper that does tasks for you.',
    analogy: 'A helper robot that handles small jobs when asked.',
    whereToFind: 'Opens from the Agents tab (some features need a paid Copilot plan).',
    lessonId: 'agents-tab',
  },
  release: {
    key: 'release',
    term: 'Release',
    meaning: 'A named, downloadable version of your project, with notes about what changed.',
    analogy: 'A bakery packing a labeled bag ("Fresh batch, version 1") instead of handing customers the whole kitchen.',
    whereToFind: 'Click Releases in the right sidebar of the Code tab, then click Create a new release.',
    lessonId: 'releases',
  },
  tag: {
    key: 'tag',
    term: 'Tag',
    meaning: 'A bookmark placed on one commit to mark a version, like v1.0.0.',
    analogy: 'Sticking a labeled tab on one page of a notebook to mark an important milestone.',
    whereToFind: 'Chosen under Choose a tag when creating a release.',
    lessonId: 'releases',
  },
  'version number': {
    key: 'version number',
    term: 'Version number',
    meaning: 'A label like v1.0.0 that shows which update of a project a release is.',
    analogy: 'Book edition numbers: v1.0.1 for a small fix, v1.1.0 for a new feature.',
    whereToFind: 'Typed in the Tag box when creating a release and displayed on the release page.',
    lessonId: 'releases',
  },
  'release notes': {
    key: 'release notes',
    term: 'Release notes',
    meaning: 'A short description listing what is new or fixed in a release.',
    analogy: 'The short note inside a delivered box explaining what changed since the last batch.',
    whereToFind: 'Written in the Description box on the new release page (or created with Generate release notes).',
    lessonId: 'releases',
  },
  'github pages': {
    key: 'github pages',
    term: 'GitHub Pages',
    meaning: 'A GitHub feature that turns HTML files in your repository into a live website.',
    analogy: 'Printing a poster and placing it in a shop window so anyone walking by can read it.',
    whereToFind: 'Open Settings → Pages, pick Deploy from a branch, choose main and / (root), and click Save.',
    lessonId: 'github-pages',
  },
  'index.html': {
    key: 'index.html',
    term: 'index.html',
    meaning: 'The main homepage file that a browser opens first when someone visits your site.',
    analogy: 'The front door or cover page of your website.',
    whereToFind: 'Saved as a file named index.html at the top level (/ root) of your repository.',
    lessonId: 'github-pages',
  },
  deploy: {
    key: 'deploy',
    term: 'Deploy',
    meaning: 'To publish your project files so they go live on the web for visitors.',
    analogy: 'Putting your finished poster up in the shop window.',
    whereToFind: 'Runs automatically when you click Save in Settings → Pages or commit to main.',
    lessonId: 'github-pages',
  },
  'static website': {
    key: 'static website',
    term: 'Static website',
    meaning: 'A website made of ready-made HTML, CSS, and image files without a custom server.',
    analogy: 'A printed brochure that shows the same clear pages to everyone who opens it.',
    whereToFind: 'Hosted free on GitHub Pages for public repositories.',
    lessonId: 'github-pages',
  },
  gist: {
    key: 'gist',
    term: 'Gist',
    meaning: 'A tiny repository for sharing one file or snippet with a link.',
    analogy: 'A sticky note for code that still remembers your edits.',
    whereToFind: 'Go to gist.github.com or click New gist in the + menu.',
    lessonId: 'gists',
  },
  snippet: {
    key: 'snippet',
    term: 'Snippet',
    meaning: 'A small piece of code or text, like one quick example or checklist.',
    analogy: 'A single recipe card instead of a full recipe book.',
    whereToFind: 'Written inside the content box when creating a gist.',
    lessonId: 'gists',
  },
  'secret gist': {
    key: 'secret gist',
    term: 'Secret gist',
    meaning: 'A gist that is not listed publicly, though anyone with the link can still read it.',
    analogy: 'An unlisted postcard: hidden from public boards, not locked.',
    whereToFind: 'Chosen with the default Create secret gist button.',
    lessonId: 'gists',
  },
  'public gist': {
    key: 'public gist',
    term: 'Public gist',
    meaning: 'A gist that everyone on GitHub can find and read.',
    analogy: 'A note pinned openly on a public bulletin board.',
    whereToFind: 'Open the arrow next to Create secret gist and click Create public gist.',
    lessonId: 'gists',
  },
  'profile readme': {
    key: 'profile readme',
    term: 'Profile README',
    meaning: 'A welcome message shown right at the top of your GitHub profile page.',
    analogy: 'A friendly name tag with a short hello at an event.',
    whereToFind: 'Stored as README.md in a Public repository matching your exact username.',
    lessonId: 'profile-readme',
  },
  'special repository': {
    key: 'special repository',
    term: 'Special repository',
    meaning: 'A Public repository named exactly like your username that displays its README on your profile.',
    analogy: 'A hidden welcome board that unlocks when your repository name matches your username.',
    whereToFind: 'Shows "You found a secret!" when creating a new repository.',
    lessonId: 'profile-readme',
  },
  profile: {
    key: 'profile',
    term: 'Profile',
    meaning: 'Your public page on GitHub showing your picture, repositories, and Profile README.',
    analogy: 'Your personal welcome desk on GitHub.',
    whereToFind: 'Click your profile picture at the top right and select Your profile.',
    lessonId: 'profile-readme',
  },
  git: {
    key: 'git',
    term: 'Git',
    meaning: 'A free program on your computer that tracks changes to your files.',
    analogy: 'The stove on your own computer, while GitHub is the shared kitchen online.',
    whereToFind: 'Check it in Terminal or Git Bash with git --version.',
    lessonId: 'install-git',
  },
  terminal: {
    key: 'terminal',
    term: 'Terminal',
    meaning: 'A text window where you type commands for your computer to run.',
    analogy: 'A walkie-talkie where you type short instructions instead of clicking icons.',
    whereToFind: 'Search for Git Bash on Windows, Terminal on Mac, or press Ctrl+Alt+T on Linux.',
    lessonId: 'install-git',
  },
  command: {
    key: 'command',
    term: 'Command',
    meaning: 'A short instruction you type in a terminal and run by pressing Enter.',
    analogy: 'A single-line order you give the computer, like git --version.',
    whereToFind: 'Typed inside Terminal or Git Bash, followed by pressing Enter.',
    lessonId: 'install-git',
  },
  'git config': {
    key: 'git config',
    term: 'git config',
    meaning: 'A command that saves your name and email in Git on your computer.',
    analogy: 'Writing your name tag once so Git attaches it to your commits.',
    whereToFind: 'Run git config --global user.name "Your Name" in the terminal.',
    lessonId: 'install-git',
  },
  cd: {
    key: 'cd',
    term: 'cd',
    meaning: 'Short for "change directory", which moves your terminal into a folder.',
    analogy: 'Stepping inside a room before picking up the tools inside.',
    whereToFind: 'Type cd my-first-project and press Enter.',
    lessonId: 'clone-local',
  },
  'working tree': {
    key: 'working tree',
    term: 'Working tree',
    meaning: 'Your project folder on your computer holding the files you are editing.',
    analogy: 'Your desk where your current project pages sit while you edit them.',
    whereToFind: 'Checked inside your project folder by typing git status.',
    lessonId: 'clone-local',
  },
  origin: {
    key: 'origin',
    term: 'origin',
    meaning: "Git's nickname for the online copy of your project on GitHub.",
    analogy: 'A saved shortcut linking your computer folder back to GitHub.',
    whereToFind: 'Set automatically when you run git clone.',
    lessonId: 'clone-local',
  },
  'staging area': {
    key: 'staging area',
    term: 'Staging area',
    meaning: 'The waiting area where you put file changes before saving them in a commit.',
    analogy: 'Putting items into a shipping box before you seal it.',
    whereToFind: 'Fill it with git add and check it with git status.',
    lessonId: 'add-and-commit',
  },
  'untracked file': {
    key: 'untracked file',
    term: 'Untracked file',
    meaning: 'A new file Git sees in your folder that has not been added to any commit yet.',
    analogy: 'A new note sitting on your desk that is not in the box yet.',
    whereToFind: 'Shown in red under Untracked files when you run git status.',
    lessonId: 'add-and-commit',
  },
  'commit id': {
    key: 'commit id',
    term: 'Commit ID',
    meaning: 'The unique short code (like 3f9c2ab) Git gives each saved commit.',
    analogy: 'A receipt number printed on a sealed package.',
    whereToFind: 'Shown right after git commit -m "..." and on GitHub commit history.',
    lessonId: 'add-and-commit',
  },
  push: {
    key: 'push',
    term: 'Push',
    meaning: 'Sending your saved commits from your computer up to GitHub.',
    analogy: 'Dropping your packed box into the post to send it to your shared shelf.',
    whereToFind: 'Run git push in your terminal inside your project folder.',
    lessonId: 'push-and-pull',
  },
  pull: {
    key: 'pull',
    term: 'Pull',
    meaning: 'Downloading newer commits from GitHub down to your computer.',
    analogy: 'Opening the mailbox to bring home new letters your friends sent.',
    whereToFind: 'Run git pull in your terminal inside your project folder.',
    lessonId: 'push-and-pull',
  },
  remote: {
    key: 'remote',
    term: 'Remote',
    meaning: 'The online repository on GitHub connected to the folder on your computer.',
    analogy: 'The shared notice board online linked to your desk at home.',
    whereToFind: 'Linked as origin when you run git clone.',
    lessonId: 'push-and-pull',
  },
  'personal access token': {
    key: 'personal access token',
    term: 'Personal access token',
    meaning: 'A secret key from GitHub settings used to sign in from the terminal instead of a password.',
    analogy: 'A special passcard made just for your terminal door.',
    whereToFind: 'GitHub Settings → Developer settings → Personal access tokens.',
    lessonId: 'push-and-pull',
  },
};

export const roadmapLevels = [
  {
    id: 'level-1',
    number: 1,
    title: 'Basics',
    ability:
      'Create a GitHub account, start your own repository, add files, save commit checkpoints, and try changes safely on a branch.',
  },
  {
    id: 'level-2',
    number: 2,
    title: 'Working with others',
    ability:
      'Copy someone else’s repository, propose changes with pull requests, track tasks with issues, and resolve conflicting edits calmly.',
  },
  {
    id: 'level-3',
    number: 3,
    title: 'Every tab explained',
    ability:
      'Know what every tab on a repository does, and when to use it.',
  },
  {
    id: 'level-4',
    number: 4,
    title: 'Extras',
    ability:
      'Publish a free website with GitHub Pages, share packaged releases and quick Gist snippets, and customize your Profile README.',
  },
  {
    id: 'level-5',
    number: 5,
    title: 'On your computer',
    ability:
      'Install Git on your laptop, download projects locally, save commits offline, and sync updates smoothly with GitHub.',
  },
];

export const lessons = [
  // LESSON 1: What is GitHub?
  {
    id: 'what-is-github',
    slug: 'what-is-github',
    levelId: 'level-1',
    kind: 'concept',
    cardTitle: 'What is GitHub?',
    cardDescription:
      'See how Git saves every draft and how GitHub keeps your work online.',
    readTime: '4 min read',
    meta: 'Lesson 01 · 4 min read',
    titleStart: 'What is ',
    titleHighlight: 'GitHub',
    titleEnd: '?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Before clicking any buttons, let us see why millions of people use Git and GitHub to keep files safe without messy file copies.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com',
      owner: 'alex-dev',
      repoName: 'class-essay',
      visibility: 'Public',
      commitCount: '4 versions',
      branchName: 'main',
      branchCount: '1 timeline',
      addFileLabel: 'Add file',
      emptyTitle: 'Every version kept in one place',
      emptyDescription:
        'Instead of emailing five different file copies, your whole team looks at one clean online home.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'Five friends and one messy essay',
        paragraphs: [
          'Imagine five friends writing one school essay together. Maya emails a file named essay_final.docx. Leo edits it and saves essay_final_v2.docx. Sam changes an older copy and names it essay_REAL_final.docx.',
          'Soon, nobody knows who has the latest version. Two people edit different copies at the same time, and part of the essay disappears.',
          'Git solves this problem. Git is a free tool that watches a project folder and keeps every saved version safe on a clean timeline. GitHub is a website that holds those Git-saved projects online, so all five friends can see the same latest version from any browser.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'GitHub',
        meaning:
          'A calm online home where your project files and their full history live safely so anyone you choose can view or help edit them.',
        extraTerm: 'Git',
        extraMeaning:
          'The free version-tracking tool running behind the scenes that remembers every draft you ever saved.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'Messy file copies vs. one Git timeline',
        subtitle: 'Git replaces confusing file names with one clear sequence of saved versions.',
        variant: 'git-timeline',
        nodes: [
          { label: 'Draft 1', sublabel: 'Maya starts', tone: 'neutral' },
          { label: 'Draft 2', sublabel: 'Leo adds intro', tone: 'neutral' },
          { label: 'Draft 3', sublabel: 'Sam edits body', tone: 'primary' },
          { label: 'Online', sublabel: 'Stored on GitHub', tone: 'secondary' },
        ],
        caption:
          'Every saved step stays neatly in order, and you can look back at any older draft whenever you want.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'Where GitHub lives in your browser',
        subtitle: 'Click any numbered marker on the screen to see what it does.',
        windowUrl: 'github.com',
        screenType: 'github-home',
        markers: [
          {
            number: 1,
            label: 'Website address (github.com)',
            description:
              'Type github.com into any web browser like Chrome, Safari, or Edge. You do not need to install any software to start.',
            xPercent: 50,
            yPercent: 12,
          },
          {
            number: 2,
            label: 'Sign up button',
            description:
              'In the top-right corner of the page, this button lets you create a free personal account in two minutes.',
            xPercent: 86,
            yPercent: 32,
          },
          {
            number: 3,
            label: 'Project home',
            description:
              'Each project on GitHub gets its own web page showing its files, its description, and its saved history.',
            xPercent: 48,
            yPercent: 68,
          },
        ],
      },
      commonMistake: {
        eyebrow: 'Common mistake',
        title: 'Thinking Git and GitHub are the exact same thing',
        text: 'Git is the tool that saves versions of your files. GitHub is the website that stores those saved projects online. Think of it like your phone camera (Git) versus an online photo album (GitHub).',
      },
    },
    quizzes: [
      {
        id: 'l1-q1',
        eyebrow: 'Question 1 of 3',
        questionPrefix: 'Why did the five friends get confused while writing their essay?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Their computers could not open text documents',
            isCorrect: false,
            feedback: 'Not quite. They could open the files, but everyone saved separate copies with confusing names.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Everyone saved separate copies and nobody knew which one was newest',
            isCorrect: true,
            feedback: 'Correct! Separate emailed copies make it easy to lose edits and hard to tell which version is latest.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Essays can only be written by one person on Earth',
            isCorrect: false,
            feedback: 'Not quite. Teams write together all the time—they just need a shared system that tracks changes.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'Their internet went out for a whole year',
            isCorrect: false,
            feedback: 'Incorrect. The problem was having multiple overlapping file copies.',
          },
        ],
      },
      {
        id: 'l1-q2',
        eyebrow: 'Question 2 of 3',
        questionPrefix: 'What problem does Git solve?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'It makes your screen brighter at night',
            isCorrect: false,
            feedback: 'Not quite. Git is for tracking file versions, not screen brightness.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'It writes your school essays for you automatically',
            isCorrect: false,
            feedback: 'Incorrect. You still write your own files—Git just keeps every saved version organized.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'It keeps every saved version of your files safe in order',
            isCorrect: true,
            feedback: 'Correct! Git works like a timeline so every version stays safe and easy to revisit.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'It deletes old drafts so you only have one copy',
            isCorrect: false,
            feedback: 'Incorrect. Git keeps your old versions safely stored in history rather than deleting them.',
          },
        ],
      },
      {
        id: 'l1-q3',
        eyebrow: 'Question 3 of 3',
        questionPrefix: 'How is GitHub different from Git?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'GitHub is the website where your Git projects live online',
            isCorrect: true,
            feedback: 'Correct! Git tracks versions, and GitHub hosts your projects on the web so you can access or share them.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'GitHub is only for video games, not writing or code',
            isCorrect: false,
            feedback: 'Not quite. People use GitHub for code, notes, guides, websites, and many kinds of files.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'GitHub costs $100 per month just to open a page',
            isCorrect: false,
            feedback: 'Incorrect. GitHub is free to browse and free for personal accounts.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'There is no difference at all',
            isCorrect: false,
            feedback: 'Not quite. Git is the version-tracking tool; GitHub is the website built around it.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 1 Complete',
      title: 'You know what Git and GitHub do',
      description:
        'Git keeps every draft safe on a timeline, and GitHub gives your projects an online home. Next, let us create your free account.',
      ctaLabel: 'Continue to Lesson 2',
      completedCtaLabel: 'Lesson 1 completed',
      nextUpPrefix: 'Next up: ',
      nextUpTitle: 'Create your free account',
      nextUpDuration: '4 min',
    },
  },

  // LESSON 2: Create your free account
  {
    id: 'create-free-account',
    slug: 'create-your-free-account',
    levelId: 'level-1',
    kind: 'concept',
    cardTitle: 'Create your free account',
    cardDescription:
      'Set up your free GitHub profile and pick a clean username in minutes.',
    readTime: '4 min read',
    meta: 'Lesson 02 · 4 min read',
    titleStart: 'Create your ',
    titleHighlight: 'free account',
    titleEnd: '',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'You do not need to pay anything or download any app. Here is how to set up a clean personal GitHub account in two minutes.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/signup',
      owner: 'alex-dev',
      repoName: 'your-profile',
      visibility: 'Free',
      commitCount: 'Step 2',
      branchName: 'main',
      branchCount: '1 account',
      addFileLabel: 'Sign up',
      emptyTitle: 'Your personal address on GitHub',
      emptyDescription:
        'Once you pick a username, your projects will live at a simple link like github.com/alex-dev.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'Getting your own library card',
        paragraphs: [
          'Think about walking into a public library. Anyone can look around, but getting a free library card gives you your own shelf and lets you check out books.',
          'A GitHub account works the exact same way. It is free, takes two minutes, and only asks for three things: your email address, a password, and a username.',
          'A username is your public name tag on GitHub. It becomes part of your web link—for example, github.com/alex-dev—so pick something simple and easy to spell.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'GitHub Username',
        meaning:
          'Your unique public name tag on GitHub that appears in the web address of every project you create.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'Four quick steps to join GitHub',
        subtitle: 'Each step happens right inside one calm sign-up page.',
        variant: 'signup-flow',
        nodes: [
          { label: '1. Email', sublabel: 'Where code goes', tone: 'neutral' },
          { label: '2. Password', sublabel: 'Keep it private', tone: 'neutral' },
          { label: '3. Username', sublabel: 'No spaces', tone: 'primary' },
          { label: '4. Confirm', sublabel: 'Account ready', tone: 'secondary' },
        ],
        caption:
          'GitHub emails you a short number code at the end just to check that your email address is really yours.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'Inside the GitHub sign-up screen',
        subtitle: 'Click each numbered marker to see what to type in each box.',
        windowUrl: 'github.com/signup',
        screenType: 'signup-form',
        markers: [
          {
            number: 1,
            label: 'Email box',
            description:
              'Type an email address you can open right now. GitHub will send a confirmation code there.',
            xPercent: 50,
            yPercent: 28,
          },
          {
            number: 2,
            label: 'Password box',
            description:
              'Create a strong password (at least 8 characters with a mix of letters and numbers) that you do not share.',
            xPercent: 50,
            yPercent: 46,
          },
          {
            number: 3,
            label: 'Username box',
            description:
              'Choose a short name with letters, numbers, or hyphens—like alex-dev. Spaces are not allowed.',
            xPercent: 50,
            yPercent: 64,
          },
          {
            number: 4,
            label: 'Create account button',
            description:
              'Click this button after solving the quick human check and typing the email code.',
            xPercent: 50,
            yPercent: 83,
          },
        ],
        extraScreenshots: [
          {
            id: 'l2-profile-menu',
            title: 'Your account menu once you sign in',
            src: '/assets/aistudio/L3-profile-menu-clean_ce630530.png',
            alt: 'GitHub account profile dropdown menu showing Profile, Settings, Appearance, and Sign out options',
            caption:
              'After creating your account and signing in, clicking your top-right avatar opens your account menu for Profile, Settings, Appearance, and Sign out.',
            markers: [
              {
                n: 1,
                x: 22.0,
                y: 23.7,
                w: 73.2,
                h: 4.4,
                label: 'Profile: your public page',
              },
              {
                n: 2,
                x: 22.0,
                y: 60.5,
                w: 73.2,
                h: 4.7,
                label: 'Settings: change your account details',
              },
              {
                n: 3,
                x: 22.0,
                y: 75.3,
                w: 73.2,
                h: 4.7,
                label: 'Appearance: switch between light and dark mode',
              },
              {
                n: 4,
                x: 22.0,
                y: 92.6,
                w: 73.2,
                h: 4.7,
                label: 'Sign out: leave your account',
              },
            ],
          },
        ],
      },
      commonMistake: {
        eyebrow: 'Common mistake',
        title: 'Putting spaces or private details in your username',
        text: 'Usernames cannot have spaces, and everyone online can see them. Do not type your full street address or password as your username—a simple name like maya-notes works best.',
      },
    },
    quizzes: [
      {
        id: 'l2-q1',
        eyebrow: 'Question 1 of 3',
        questionPrefix: 'How much does it cost to create a personal GitHub account?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'It is completely free',
            isCorrect: true,
            feedback: 'Correct! Personal GitHub accounts are free for learning and building projects.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: '$19 per month after day one',
            isCorrect: false,
            feedback: 'Not quite. You never need a paid plan just to learn or store personal projects.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'You must pay for each file you add',
            isCorrect: false,
            feedback: 'Incorrect. Adding files and saving projects on a free account costs nothing.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'Only companies can make accounts',
            isCorrect: false,
            feedback: 'Not quite. Anyone—students, hobbyists, writers, and beginners—can create a free account.',
          },
        ],
      },
      {
        id: 'l2-q2',
        eyebrow: 'Question 2 of 3',
        questionPrefix: 'Which of these is a valid, clean GitHub username?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'alex smith',
            isCorrect: false,
            feedback: 'Not quite. GitHub usernames cannot contain spaces.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'alex-codes',
            isCorrect: true,
            feedback: 'Correct! Letters and hyphens with no spaces make a clean, valid username.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'alex@home!',
            isCorrect: false,
            feedback: 'Incorrect. Symbols like @ and ! are not allowed in GitHub usernames.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'my secret password 123',
            isCorrect: false,
            feedback: 'Incorrect. Never put spaces or private passwords in a public username.',
          },
        ],
      },
      {
        id: 'l2-q3',
        eyebrow: 'Question 3 of 3',
        questionPrefix: 'Why does GitHub send a short code to your email during sign-up?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'To confirm the email address really belongs to you',
            isCorrect: true,
            feedback: 'Correct! That quick code protects your account and proves your email works.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'To share your password with other users',
            isCorrect: false,
            feedback: 'Incorrect. GitHub never shares your password with anyone.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Because you are required to download a desktop app',
            isCorrect: false,
            feedback: 'Not quite. You can keep using GitHub right in your web browser.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'To delete your old emails',
            isCorrect: false,
            feedback: 'Incorrect. It is only a quick one-time verification code.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 2 Complete',
      title: 'Your account basics are clear',
      description:
        'With a free account and a simple username, you are ready to look around inside GitHub without feeling lost.',
      ctaLabel: 'Continue to Lesson 3',
      completedCtaLabel: 'Lesson 2 completed',
      nextUpPrefix: 'Next up: ',
      nextUpTitle: 'A tour of GitHub',
      nextUpDuration: '5 min',
    },
  },

  // LESSON 3: A tour of GitHub
  {
    id: 'tour-of-github',
    slug: 'tour-of-github',
    levelId: 'level-1',
    kind: 'concept',
    cardTitle: 'A tour of GitHub',
    cardDescription:
      'Learn what each button and tab on the GitHub homepage actually does.',
    readTime: '5 min read',
    meta: 'Lesson 03 · 5 min read',
    titleStart: 'A tour of ',
    titleHighlight: 'GitHub',
    titleEnd: '',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'GitHub has many buttons, but beginners only need four of them. Let us walk through the home screen slowly.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/dashboard',
      owner: 'alex-dev',
      repoName: 'Dashboard',
      visibility: 'Signed in',
      commitCount: '4 landmarks',
      branchName: 'main',
      branchCount: 'Home',
      addFileLabel: 'New',
      emptyTitle: 'Only four spots matter on day one',
      emptyDescription:
        'Once you recognize the menu, search bar, New button, and profile icon, the whole screen feels calm.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'Your first visit to a big grocery store',
        paragraphs: [
          'The first time you walk into a huge grocery store, dozens of signs hang from the ceiling. It looks busy at first.',
          'But once a friend points out four places—the entrance baskets, the aisle signs, the fresh fruit stand, and the checkout—you suddenly feel right at home.',
          'When you sign in to GitHub, you land on your dashboard (your personal home screen). You do not need to learn every button on day one. Just learn four friendly landmarks and ignore the rest.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Dashboard',
        meaning:
          'Your GitHub home screen after signing in, where you see your list of projects and a button to start a new one.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'The four landmarks of GitHub',
        subtitle: 'Everything a beginner needs sits along the top bar and left sidebar.',
        variant: 'dashboard-map',
        nodes: [
          { label: 'Top-left menu', sublabel: 'Navigate pages', tone: 'neutral' },
          { label: 'Search bar', sublabel: 'Find projects', tone: 'neutral' },
          { label: 'New button', sublabel: 'Start a project', tone: 'secondary' },
          { label: 'Profile icon', sublabel: 'Your settings', tone: 'primary' },
        ],
        caption:
          'Whenever you feel lost on GitHub, click the GitHub logo at the top left to return straight to this home screen.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'Tour your GitHub home screen',
        subtitle: 'Click each numbered marker to learn what that part of the screen does.',
        windowUrl: 'github.com',
        screenType: 'dashboard',
        markers: [
          {
            number: 1,
            label: 'Top-left menu button (☰)',
            description:
              'Opens a tidy side list with links back to Home, your tasks, and your saved projects.',
            xPercent: 10,
            yPercent: 18,
          },
          {
            number: 2,
            label: 'Search bar',
            description:
              'Type any project name here to jump straight to your own work or explore public projects by others.',
            xPercent: 52,
            yPercent: 18,
          },
          {
            number: 3,
            label: 'Green “New” button',
            description:
              'Creates a brand-new project box (called a repository) whenever you are ready to start something fresh.',
            xPercent: 28,
            yPercent: 45,
          },
          {
            number: 4,
            label: 'Profile circle (top right)',
            description:
              'Click your little picture in the top-right corner to view your public profile, your repositories, or sign out.',
            xPercent: 90,
            yPercent: 18,
          },
        ],
        screenshots: [
          {
            id: 'l3-dashboard',
            title: 'Your GitHub dashboard',
            src: '/assets/aistudio/L3-dashboard-clean_a3d4b0a0.png',
            alt: 'GitHub dashboard screen showing Home and Feed, Top repositories, Search bar, Plus button, Quick links, Profile avatar, and Pull requests and Issues',
            caption:
              'When you sign in, your dashboard shows the top navigation bar, your Top repositories sidebar, and any Pull requests or Issues that need attention.',
            markers: [
              {
                n: 1,
                x: 1.1,
                y: 11.5,
                w: 19.9,
                h: 9.6,
                label: 'Home and Feed: your start page, and what other people are working on',
              },
              {
                n: 2,
                x: 1.3,
                y: 53.3,
                w: 19.7,
                h: 30.6,
                label: 'Top repositories: quick links to your projects',
              },
              {
                n: 3,
                x: 64.4,
                y: 2.3,
                w: 12.5,
                h: 4.6,
                label: 'Search: find repositories, people, and code',
              },
              {
                n: 4,
                x: 82.6,
                y: 2.3,
                w: 3.3,
                h: 4.6,
                label: 'Plus button: create something new',
              },
              {
                n: 5,
                x: 86.4,
                y: 2.3,
                w: 7.4,
                h: 4.6,
                label: 'Quick links: your issues, pull requests, and repositories',
              },
              {
                n: 6,
                x: 96.8,
                y: 2.3,
                w: 2.3,
                h: 4.6,
                label: 'Your profile picture: opens your account menu',
              },
              {
                n: 7,
                x: 24.7,
                y: 64.6,
                w: 49.5,
                h: 34.5,
                label: 'Pull requests and Issues that need your attention',
              },
            ],
          },
          {
            id: 'l3-plus-menu',
            title: 'The Plus (+) create menu',
            src: '/assets/aistudio/L3-plus-menu-clean_b9d66b49.png',
            alt: 'GitHub Plus create dropdown menu showing New issue, New repository, and New project',
            caption:
              'Click the Plus (+) button in the top bar whenever you want to start a new repository, open an issue, or create a project board.',
            markers: [
              {
                n: 1,
                x: 58.6,
                y: 4.9,
                w: 7.8,
                h: 9.8,
                label: 'Plus button: click to open the create menu',
              },
              {
                n: 2,
                x: 37.4,
                y: 18.2,
                w: 28.0,
                h: 10.6,
                label: 'New issue: report a problem or an idea',
              },
              {
                n: 3,
                x: 37.4,
                y: 28.7,
                w: 27.8,
                h: 9.8,
                label: 'New repository: start a new project',
              },
              {
                n: 4,
                x: 37.4,
                y: 87.7,
                w: 27.8,
                h: 9.8,
                label: 'New project: a board to plan your work',
              },
            ],
          },
          {
            id: 'l3-profile-menu',
            title: 'Your profile menu',
            src: '/assets/aistudio/L3-profile-menu-clean_ce630530.png',
            alt: 'GitHub account profile dropdown menu showing Profile, Settings, Appearance, and Sign out options',
            caption:
              'Click your profile picture in the top-right corner to visit your public profile, adjust settings, switch themes, or sign out.',
            markers: [
              {
                n: 1,
                x: 22.0,
                y: 23.7,
                w: 73.2,
                h: 4.4,
                label: 'Profile: your public page',
              },
              {
                n: 2,
                x: 22.0,
                y: 60.5,
                w: 73.2,
                h: 4.7,
                label: 'Settings: change your account details',
              },
              {
                n: 3,
                x: 22.0,
                y: 75.3,
                w: 73.2,
                h: 4.7,
                label: 'Appearance: switch between light and dark mode',
              },
              {
                n: 4,
                x: 22.0,
                y: 92.6,
                w: 73.2,
                h: 4.7,
                label: 'Sign out: leave your account',
              },
            ],
          },
        ],
      },
      commonMistake: {
        eyebrow: 'Common mistake',
        title: 'Trying to memorize advanced tabs like Actions or Security',
        text: 'GitHub has extra tools built for large software teams—like Actions, Insights, and Security. You do not need any of those right now. Stick to your project list and the New button.',
      },
    },
    quizzes: [
      {
        id: 'l3-q1',
        eyebrow: 'Question 1 of 3',
        questionPrefix: 'What is the green “New” button on the left side of the dashboard used for?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Starting a brand-new project (repository)',
            isCorrect: true,
            feedback: 'Correct! Clicking the green New button lets you set up a fresh project in seconds.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Deleting your entire GitHub account',
            isCorrect: false,
            feedback: 'Not quite. Account settings live under your top-right profile circle—New is for creating projects.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Changing the website font size',
            isCorrect: false,
            feedback: 'Incorrect. The New button creates a new project.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'Sending an email to your friends',
            isCorrect: false,
            feedback: 'Not quite. GitHub is for storing projects, not sending emails.',
          },
        ],
      },
      {
        id: 'l3-q2',
        eyebrow: 'Question 2 of 3',
        questionPrefix: 'Where do you click to view your own profile or sign out?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Your profile circle in the top-right corner',
            isCorrect: true,
            feedback: 'Correct! The small circle in the top right opens your profile, projects list, and account settings.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Inside the search bar',
            isCorrect: false,
            feedback: 'Not quite. The search bar is for finding projects.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'At the bottom of a file',
            isCorrect: false,
            feedback: 'Incorrect. Look at the top-right corner of the page for your profile picture.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'You cannot sign out of GitHub',
            isCorrect: false,
            feedback: 'Not quite. Your top-right profile menu always has a Sign out option.',
          },
        ],
      },
      {
        id: 'l3-q3',
        eyebrow: 'Question 3 of 3',
        questionPrefix: 'Should complete beginners worry about advanced tabs like “Actions” or “Security” right away?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Yes, you must learn every single tab before making a file',
            isCorrect: false,
            feedback: 'Not at all! Beginners can safely ignore advanced team tabs.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'No—you only need the four main landmarks to get started',
            isCorrect: true,
            feedback: 'Correct! Focus on the menu, search bar, New button, and profile circle—everything else can wait.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Yes, or your account locks after an hour',
            isCorrect: false,
            feedback: 'Incorrect. Your free account never locks for ignoring advanced tabs.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'Only if you use a tablet',
            isCorrect: false,
            feedback: 'Not quite. The same four landmarks are all you need on any device.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 3 Complete',
      title: 'You know your way around GitHub',
      description:
        'Now that the home screen feels familiar, let us open up the most important container in GitHub: the repository.',
      ctaLabel: 'Continue to Lesson 4',
      completedCtaLabel: 'Lesson 3 completed',
      nextUpPrefix: 'Next up: ',
      nextUpTitle: 'What is a repository?',
      nextUpDuration: '5 min',
    },
  },

  // LESSON 4: What is a repository?
  {
    id: 'what-is-repository',
    slug: 'what-is-a-repository',
    levelId: 'level-1',
    kind: 'concept',
    cardTitle: 'What is a repository?',
    cardDescription:
      'Understand how a repository stores your files together with their full history.',
    readTime: '5 min read',
    meta: 'Lesson 04 · 5 min read',
    titleStart: 'What is a ',
    titleHighlight: 'repository',
    titleEnd: '?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Every project on GitHub lives inside a repository. Learn what it holds and how it differs from a plain folder on your computer.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/alex-dev/my-first-project',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: '1 commit',
      branchName: 'main',
      branchCount: '1 branch',
      addFileLabel: 'Add file',
      emptyTitle: 'Files + History inside one box',
      emptyDescription:
        'A repository keeps your documents and every saved change neatly together under one roof.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'A wooden recipe box with a memory',
        paragraphs: [
          'Imagine keeping a wooden recipe box in your kitchen. Inside, you store your favorite soup recipe, a list of groceries, and notes from last winter.',
          'Now imagine the box also remembers every edit you ever wrote on each card—so if you change an ingredient today and miss the old taste, you can flip back to last year’s version.',
          'On GitHub, that smart project box is called a repository (often shortened to repo). You create one repository per project—one for a class website, one for study notes, and so on.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Repository (or Repo)',
        meaning:
          'A dedicated project folder on GitHub that stores all your files together with a complete memory of every change ever saved.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'What lives inside a repository?',
        subtitle: 'A plain computer folder only holds current files. A repository holds three things.',
        variant: 'repo-box',
        nodes: [
          { label: 'Project files', sublabel: 'README.md & notes', tone: 'neutral' },
          { label: 'Saved history', sublabel: 'Every past change', tone: 'primary' },
          { label: 'Branches', sublabel: 'Safe draft copies', tone: 'secondary' },
          { label: 'Visibility', sublabel: 'Public or Private', tone: 'neutral' },
        ],
        caption:
          'You choose whether each repository is Public (anyone online can read it) or Private (only you and invited friends can see it).',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'Reading a GitHub repository page',
        subtitle: 'Click each numbered marker to understand what each part of the page shows.',
        windowUrl: 'github.com/alex-dev/my-first-project',
        screenType: 'repo-page',
        markers: [
          {
            number: 1,
            label: 'Owner / Repository name',
            description:
              'Shows who owns the project (alex-dev) followed by a slash and the project name (my-first-project).',
            xPercent: 25,
            yPercent: 25,
          },
          {
            number: 2,
            label: 'Public or Private badge',
            description:
              'Shows who can view this repository. Public means anyone can view; Private means only you.',
            xPercent: 54,
            yPercent: 25,
          },
          {
            number: 3,
            label: 'Code tab',
            description:
              'Your main view of the repository where all files and folders appear.',
            xPercent: 14,
            yPercent: 45,
          },
          {
            number: 4,
            label: 'File list area',
            description:
              'Every document, image, or code file stored in this repository appears neatly in this list.',
            xPercent: 50,
            yPercent: 72,
          },
        ],
        screenshots: [
          {
            id: 'l4-create-new-repository',
            title: 'Creating a new repository',
            src: '/assets/aistudio/L4-create-new-repository-clean_ad14f11e.png',
            alt: 'GitHub Create a new repository screen showing Owner, Repository name, Description, Visibility, and Add README toggle',
            caption:
              'When you create a repository, you pick the owner, type a short name, choose Public or Private, and optionally turn on Add README.',
            markers: [
              {
                n: 1,
                x: 7.1,
                y: 23.4,
                w: 24.8,
                h: 4.0,
                label: 'Owner: the account that will own this project',
              },
              {
                n: 2,
                x: 35.0,
                y: 23.4,
                w: 59.1,
                h: 4.0,
                label: 'Repository name: type a short name, like my-first-project',
              },
              {
                n: 3,
                x: 7.1,
                y: 38.9,
                w: 87.0,
                h: 4.2,
                label: 'Description: one line about your project (optional)',
              },
              {
                n: 4,
                x: 78.6,
                y: 56.6,
                w: 13.5,
                h: 4.2,
                label: 'Visibility: Public means everyone can see it',
              },
              {
                n: 5,
                x: 81.4,
                y: 78.2,
                w: 10.9,
                h: 3.9,
                label: 'Add README: turn this on to start with a README file',
              },
            ],
          },
          {
            id: 'l4-repository-code-tab',
            title: 'The repository Code tab',
            src: '/assets/aistudio/L4-repository-code-tab-clean_f13431ee.png',
            alt: 'GitHub repository Code tab showing navigation tabs, main branch selector, Add file button, Code button, latest commit, and file list',
            caption:
              'Inside your repository, the Code tab shows your branches, Add file and Code buttons, latest commit bar, and file list.',
            markers: [
              {
                n: 1,
                x: 1.1,
                y: 7.4,
                w: 67.4,
                h: 3.8,
                label: 'Tabs: each tab is a different area of your repository',
              },
              {
                n: 2,
                x: 10.1,
                y: 23.0,
                w: 6.9,
                h: 3.8,
                label: 'Branch selector: shows which branch you are on (main)',
              },
              {
                n: 3,
                x: 55.7,
                y: 23.0,
                w: 6.3,
                h: 3.8,
                label: 'Add file: create a new file or upload files',
              },
              {
                n: 4,
                x: 62.5,
                y: 23.0,
                w: 7.1,
                h: 3.8,
                label: 'Code: copy the link to download or clone the project',
              },
              {
                n: 5,
                x: 10.1,
                y: 28.7,
                w: 59.4,
                h: 6.3,
                label: 'Latest commit: the newest save point, and how many there are',
              },
              {
                n: 6,
                x: 10.1,
                y: 35.1,
                w: 59.4,
                h: 43.8,
                label: 'File list: every file and folder, with its last commit message',
              },
            ],
          },
          {
            id: 'l4-folder-view',
            title: 'Inside a repository folder',
            src: '/assets/aistudio/L4-folder-view-clean_c291c879.png',
            alt: 'GitHub folder view showing branch selector, left file tree, parent folder link, and Add file button',
            caption:
              'Opening a folder shows a file tree on the left and a two-dot link to step back up one folder.',
            markers: [
              {
                n: 1,
                x: 1.1,
                y: 14.4,
                w: 14.2,
                h: 7.4,
                label: 'Branch selector: you are on main',
              },
              {
                n: 2,
                x: 1.1,
                y: 33.9,
                w: 18.2,
                h: 67.0,
                label: 'File tree: click to jump to any file or folder',
              },
              {
                n: 3,
                x: 22.2,
                y: 38.3,
                w: 76.7,
                h: 9.3,
                label: 'Two dots: go up one folder',
              },
              {
                n: 4,
                x: 90.4,
                y: 3.3,
                w: 6.0,
                h: 7.4,
                label: 'Add file: add a file in this folder',
              },
            ],
          },
          {
            id: 'l4-repositories-list',
            title: 'Your list of repositories',
            src: '/assets/aistudio/L4-repositories-list-clean_98fbb595.png',
            alt: 'GitHub repositories list screen showing sidebar filters, green New repository button, search box, and repository count and sort controls',
            caption:
              'Your repositories page lets you filter projects on the left, search by name, sort results, or click New repository to start a fresh project.',
            markers: [
              {
                n: 1,
                x: 1.1,
                y: 9.9,
                w: 14.7,
                h: 78.8,
                label: 'Filters: your contributions, your repositories, forks',
              },
              {
                n: 2,
                x: 90.4,
                y: 14.8,
                w: 8.1,
                h: 20.7,
                label: 'New repository: the green button to start a project',
              },
              {
                n: 3,
                x: 18.4,
                y: 39.9,
                w: 80.1,
                h: 19.7,
                label: 'Search your repositories',
              },
              {
                n: 4,
                x: 18.5,
                y: 70.0,
                w: 79.9,
                h: 29.1,
                label: 'How many repositories match, and how they are sorted',
              },
            ],
          },
        ],
      },
      commonMistake: {
        eyebrow: 'Common mistake',
        title: 'Putting private passwords in a Public repository',
        text: 'If a repository is marked Public, anyone on the internet can read its files. Keep personal notes, passwords, or private phone numbers out of Public repositories—use Private whenever you want work kept just to yourself.',
      },
    },
    quizzes: [
      {
        id: 'l4-q1',
        eyebrow: 'Question 1 of 3',
        questionPrefix: 'What is “repo” short for on GitHub?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Repository',
            isCorrect: true,
            feedback: 'Correct! People casually say “repo” instead of typing the full word “repository”.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Report card',
            isCorrect: false,
            feedback: 'Not quite. Repo is short for repository—your project container.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Repeat button',
            isCorrect: false,
            feedback: 'Incorrect. Repo is short for repository.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'Reply message',
            isCorrect: false,
            feedback: 'Not quite. Repo is short for repository.',
          },
        ],
      },
      {
        id: 'l4-q2',
        eyebrow: 'Question 2 of 3',
        questionPrefix: 'How is a repository different from a normal folder on your desktop?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'A repository only holds pictures, never text',
            isCorrect: false,
            feedback: 'Incorrect. A repository can hold text, Markdown, code, and many kinds of files.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'A repository keeps your files along with every saved version in history',
            isCorrect: true,
            feedback: 'Correct! Unlike a regular folder, a repository remembers every past change you saved.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'A repository disappears when you close your browser',
            isCorrect: false,
            feedback: 'Not quite. Your repository stays safely stored online on GitHub.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'There is no difference',
            isCorrect: false,
            feedback: 'Not quite. A regular folder forgets old drafts when you overwrite a file; a repository remembers them.',
          },
        ],
      },
      {
        id: 'l4-q3',
        eyebrow: 'Question 3 of 3',
        questionPrefix: 'Who can view a repository that has a “Public” badge?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Only you on your home Wi-Fi',
            isCorrect: false,
            feedback: 'Not quite. That describes a Private repository—Public means open to anyone online.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Anyone on the internet can view it',
            isCorrect: true,
            feedback: 'Correct! Anyone can read a Public repository, though only you (or people you approve) can change it.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Only GitHub staff members',
            isCorrect: false,
            feedback: 'Incorrect. Public repositories are visible to anyone visiting the link.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'Nobody—not even the owner',
            isCorrect: false,
            feedback: 'Incorrect. Public repositories are open for anyone to read.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 4 Complete',
      title: 'You understand repositories',
      description:
        'Now you are ready to step inside a repository and create your very first real file directly in the browser.',
      ctaLabel: 'Continue to Lesson 5',
      completedCtaLabel: 'Lesson 4 completed',
      nextUpPrefix: 'Next up: ',
      nextUpTitle: 'Add your first file to GitHub',
      nextUpDuration: '5 min',
    },
  },

  // LESSON 5: Add your first file to GitHub (Existing full tutorial lesson)
  {
    id: 'add-first-file',
    slug: 'add-your-first-file',
    levelId: 'level-1',
    kind: 'tutorial',
    cardTitle: 'Add your first file to GitHub',
    cardDescription:
      'Create a README.md file right in your browser without touching the command line.',
    readTime: '5 min read',
    meta: 'Beginner · 5 min read',
    titleStart: 'Add your ',
    titleHighlight: 'first file',
    titleEnd: ' to GitHub',
    descriptionSegments: [
      { type: 'text', value: 'Learn how to author a foundational ' },
      { type: 'code', value: 'README.md' },
      {
        type: 'text',
        value:
          ' directly in your browser without touching the command line. A quiet, essential first step toward version control literacy.',
      },
    ],
    primaryCtaLabel: 'Start Step 1',
    secondaryCtaLabel: "See what you'll learn",
    heroMockup: {
      url: 'github.com/alex-dev/my-first-project',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: '1 commit',
      branchName: 'main',
      branchCount: '1 branch',
      addFileLabel: 'Add file',
      emptyTitle: 'Your repository is ready',
      emptyDescription:
        'Every repository begins with a README. Add one now to introduce your work to others.',
    },
    progressSteps: [
      { id: 'open-repo', number: '01', label: 'Open repository', targetId: 'hero-overview' },
      { id: 'create-file', number: '02', label: 'Create file', targetId: 'step-01' },
      { id: 'name-write', number: '03', label: 'Name & write', targetId: 'step-02' },
      { id: 'commit', number: '04', label: 'Commit', targetId: 'step-03' },
      { id: 'verify', number: '05', label: 'Verify', targetId: 'quick-check' },
    ],
    steps: [
      {
        id: 'step-01',
        eyebrow: 'Step 01',
        titlePrefix: 'Locate the ',
        titleBold: '“Add file”',
        titleSuffix: ' dropdown',
        description:
          'Inside your repository overview, look directly above the file list on the right-hand side. GitHub provides a quiet menu for creating files on the fly without running any terminal commands.',
        callout: {
          icon: 'lightbulb',
          label: 'Pro tip:',
          text: "You don't need Git installed on your computer yet. GitHub allows you to author files entirely in the cloud.",
        },
        align: 'text-left',
        mockup: {
          kind: 'add-file-dropdown',
          windowTitle: 'my-first-project / main',
          branchName: 'main',
          metaText: '1 Branch · 0 Tags',
          buttonLabel: 'Add file',
          menuItems: [
            { id: 'create-new-file', label: 'Create new file', active: true },
            { id: 'upload-files', label: 'Upload files', active: false },
          ],
          hintText: 'Click “Create new file” to launch the browser-based editor.',
          screenshots: [
            {
              id: 'l5-add-file-dropdown',
              src: '/assets/aistudio/L5-add-file-dropdown-clean_139bdfb7.png',
              alt: 'GitHub Add file dropdown open showing Create new file and Upload files options',
              caption:
                'Click Add file, then pick Create new file to type in the browser or Upload files to add images and documents.',
              markers: [
                {
                  n: 1,
                  x: 87.8,
                  y: 3.3,
                  w: 7.6,
                  h: 7.4,
                  label: 'Add file: click to open the menu',
                },
                {
                  n: 2,
                  x: 80.0,
                  y: 13.5,
                  w: 14.7,
                  h: 7.4,
                  label: 'Create new file: write a text file right in your browser',
                },
                {
                  n: 3,
                  x: 80.0,
                  y: 21.3,
                  w: 14.7,
                  h: 7.4,
                  label: 'Upload files: use this for images and other files',
                },
              ],
            },
            {
              id: 'l5-more-options-menu',
              src: '/assets/aistudio/L5-more-options-menu-clean_a5a0f879.png',
              alt: 'GitHub three-dot more options menu showing Copy path, Copy permalink, and Delete directory',
              caption:
                'The three-dot menu beside Add file gives extra folder actions like copying the path or deleting the folder.',
              markers: [
                {
                  n: 1,
                  x: 93.4,
                  y: 7.6,
                  w: 4.4,
                  h: 10.8,
                  label: 'More options: extra actions for this folder',
                },
                {
                  n: 2,
                  x: 63.4,
                  y: 23.0,
                  w: 33.3,
                  h: 20.8,
                  label: 'Copy path or permalink: copy the location of this folder',
                },
                {
                  n: 3,
                  x: 63.4,
                  y: 51.9,
                  w: 33.3,
                  h: 8.9,
                  label: 'Delete directory: removes the folder, so be careful',
                },
              ],
            },
          ],
        },
      },
      {
        id: 'step-02',
        eyebrow: 'Step 02',
        titlePrefix: 'Name your file',
        titleCodePill: 'README.md',
        description:
          "The README file is the welcome mat of any software repository. GitHub automatically recognizes this filename and renders its rich text on your project's main repository homepage for anyone who visits.",
        callout: {
          icon: 'help',
          label: 'Why .md?',
          text: 'It stands for Markdown, a plain-text syntax that makes formatting bold text, bulleted lists, and hyperlinks completely effortless.',
        },
        align: 'text-right',
        mockup: {
          kind: 'file-editor',
          windowTitle: 'Editing new file in my-first-project',
          repoPrefix: 'my-first-project /',
          defaultFileName: 'README.md',
          defaultLines: [
            { prefix: '#', text: 'My First Project' },
            {
              text: 'A minimal repository to explore Git and GitHub without intimidation.',
            },
            { isBlank: true, text: '' },
            { prefix: '##', text: 'Welcome' },
            {
              text: 'This file was authored directly in the browser.',
              hasCursor: true,
            },
          ],
          screenshots: [
            {
              id: 'l5-new-file-editor',
              src: '/assets/aistudio/L5-new-file-editor-clean_2764bbd8.png',
              alt: 'GitHub new file editor showing file name input, main branch indicator, Edit and Preview tabs, editor area, and Commit changes button',
              caption:
                'Name your file at the top, write your content in the editor, preview it, and click Commit changes.',
              markers: [
                {
                  n: 1,
                  x: 12.4,
                  y: 5.8,
                  w: 15.4,
                  h: 6.9,
                  label: 'File name: type a name with its ending, like hello.html',
                },
                {
                  n: 2,
                  x: 29.5,
                  y: 6.7,
                  w: 3.1,
                  h: 4.9,
                  label: 'Branch: your file will be saved on main',
                },
                {
                  n: 3,
                  x: 1.9,
                  y: 18.5,
                  w: 10.5,
                  h: 6.7,
                  label: 'Edit and Preview: write your text, then preview how it looks',
                },
                {
                  n: 4,
                  x: 1.2,
                  y: 27.2,
                  w: 97.5,
                  h: 22.1,
                  label: 'Write the file contents here',
                },
                {
                  n: 5,
                  x: 86.8,
                  y: 5.4,
                  w: 11.9,
                  h: 7.2,
                  label: 'Commit changes: stays grey until the file has a name',
                },
              ],
            },
          ],
        },
      },
      {
        id: 'step-03',
        eyebrow: 'Step 03',
        titlePrefix: 'Write a clear commit message',
        description:
          'Scroll to the bottom of the page to find the “Commit changes” panel. A commit message is a concise historical memorandum explaining what you altered and why.',
        callout: {
          icon: 'bookmark',
          label: 'Best practice:',
          text: 'Keep your commit title under 50 characters, phrased in the present tense like “Initial commit” or “Add project description”.',
        },
        align: 'text-left',
        mockup: {
          kind: 'commit-modal',
          windowTitle: 'Commit modal',
          heading: 'Commit changes',
          titleLabel: 'Commit title',
          defaultTitle: 'Create README.md',
          descriptionLabel: 'Extended description (optional)',
          defaultDescription:
            'Add introductory orientation document detailing purpose of the repo.',
          branchPrefix: 'Commit directly to',
          branchName: 'main',
          branchSuffix: 'branch',
          submitLabel: 'Commit changes',
          submittedLabel: 'Changes committed',
        },
      },
    ],
    practice: {
      mode: 'add-file',
      eyebrow: 'Interactive Practice',
      title: 'Try it yourself on a practice repository',
      subtitle:
        'Follow the exact GitHub workflow step by step. Click each control in order—if you click the wrong thing, a friendly hint will guide you back.',
      repoOwner: 'alex-dev',
      repoName: 'my-first-project',
      branchName: 'main',
      suggestedFileName: 'README.md',
      defaultFileContent:
        '# My First Project\n\nA calm place to practice adding my first file on GitHub.',
      defaultCommitMessage: 'Create README.md',
      stages: [
        {
          id: 'open-add-file',
          number: '1',
          label: 'Click Add file',
          instruction: 'Step 1: Click the “Add file” button in the repository toolbar.',
          successMessage: 'Opened the “Add file” menu.',
        },
        {
          id: 'click-create-new',
          number: '2',
          label: 'Create new file',
          instruction: 'Step 2: Choose “Create new file” from the dropdown.',
          successMessage: 'Launched the browser file editor.',
        },
        {
          id: 'type-filename',
          number: '3',
          label: 'Type a file name',
          instruction: 'Step 3: Type a file name such as README.md in the name field.',
          successMessage: 'File name set! Now save your work below.',
        },
        {
          id: 'commit-changes',
          number: '4',
          label: 'Commit changes',
          instruction: 'Step 4: Click the green “Commit changes” button to save your file.',
          successMessage: 'Committed! Your file now lives safely on the main branch.',
        },
      ],
    },
    vocabulary: {
      eyebrow: 'Vocabulary',
      title: "Words you'll meet",
      subtitle: 'Core version control concepts translated into calm, human metaphors.',
      cards: [
        {
          id: 'repository',
          icon: 'folder',
          accent: 'primary',
          term: 'Repository',
          definition:
            'A dedicated digital container where all project files, history, and revisions live harmoniously together.',
          analogyLabel: 'Think of it like',
          analogy: '“A smart project vault that remembers every single revision ever saved.”',
        },
        {
          id: 'branch',
          icon: 'branch',
          accent: 'secondary',
          term: 'Branch',
          definition:
            'An isolated parallel timeline where you can experiment freely without risking the stability of production code.',
          analogyLabel: 'Think of it like',
          analogy:
            '“A draft photocopy you scribble on before touching the master archival document.”',
        },
        {
          id: 'commit',
          icon: 'check',
          accent: 'primary',
          term: 'Commit',
          definition:
            'A permanent snapshot of your files at a specific moment in time, accompanied by an explanatory author note.',
          analogyLabel: 'Think of it like',
          analogy: '“A saved checkpoint in an adventure game with a stamped timestamp and notes.”',
        },
      ],
    },
    diagram: {
      eyebrow: 'Mental Model',
      titlePrefix: 'Visual Concept: ',
      titleHighlight: 'What is a branch?',
      legend: [
        { label: 'main', tone: 'dark' },
        { label: 'feature', tone: 'primary' },
      ],
      takeaways: [
        {
          id: 'branching-off',
          phase: 'branching',
          title: '1. Branching off',
          description: 'You create a clean workspace safely detached from your live code.',
        },
        {
          id: 'committing-changes',
          phase: 'committing',
          title: '2. Committing changes',
          description: 'Each commit creates an incremental, recoverable milestone of work.',
        },
        {
          id: 'merging-back',
          phase: 'merging',
          title: '3. Merging back',
          description:
            'When polished, your changes combine gracefully back into the master timeline.',
        },
      ],
    },
    quiz: {
      eyebrow: 'Quick Check',
      questionPrefix: 'Where will GitHub automatically display the contents of your ',
      questionCode: 'README.md',
      questionSuffix: '?',
      options: [
        {
          id: 'archive',
          labelPrefix: 'A)',
          text: 'Inside an archived hidden documentation directory',
          isCorrect: false,
          feedback:
            'Not quite. GitHub keeps README files front and center rather than tucking them away in a hidden folder.',
        },
        {
          id: 'home',
          labelPrefix: 'B)',
          text: "Directly on the repository's front page",
          isCorrect: true,
          feedback:
            'Correct. GitHub automatically formats and displays the README file directly beneath your project file list.',
        },
        {
          id: 'settings',
          labelPrefix: 'C)',
          text: 'Only inside your personal account profile settings',
          isCorrect: false,
          feedback:
            'Not quite. A README belongs to the repository itself so anyone visiting the project can read it right away.',
        },
        {
          id: 'commit-log',
          labelPrefix: 'D)',
          text: 'Only inside the raw commit history log',
          isCorrect: false,
          feedback:
            'Incorrect. The commit log records when the file changed, while the repository homepage displays its formatted contents.',
        },
      ],
    },
    reviewQuestions: [
      {
        id: 'l5-rev-1',
        eyebrow: 'Quick Review',
        questionPrefix: 'Which button opens the menu to create a new file in the browser?',
        questionSuffix: '',
        sectionTargetId: 'step-01',
        sectionLabel: 'Step 01: Add file dropdown',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'The “Add file” dropdown above the file list',
            isCorrect: true,
            feedback: 'Right! Clicking “Add file” and choosing “Create new file” opens the browser editor.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'The Settings tab at the top',
            isCorrect: false,
            feedback: 'Not quite. Settings is for repository options—look for “Add file” above the file list.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'The green Code download button',
            isCorrect: false,
            feedback: 'Not quite. The Code button is for copying or downloading the repo, not creating a file.',
          },
        ],
      },
      {
        id: 'l5-rev-2',
        eyebrow: 'Quick Review',
        questionPrefix: 'What does the ',
        questionCode: '.md',
        questionSuffix: ' at the end of README.md stand for?',
        sectionTargetId: 'step-02',
        sectionLabel: 'Step 02: Name your file README.md',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Markdown, a simple plain-text way to format headings and bold text',
            isCorrect: true,
            feedback: 'Correct! Markdown lets you use simple symbols like # to format your welcome file.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Music download',
            isCorrect: false,
            feedback: 'Not quite. It stands for Markdown, a friendly text formatting format.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Mobile device only',
            isCorrect: false,
            feedback: 'Not quite. Markdown files work cleanly on every browser and device.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 5 Complete',
      title: 'Ready to wrap up this lesson?',
      description:
        'You now understand how to author files and save historical commit checkpoints directly in GitHub. Next, let us look closer at what a commit really is.',
      ctaLabel: 'Continue to Lesson 6',
      completedCtaLabel: 'Lesson 5 completed',
      nextUpPrefix: 'Next up: ',
      nextUpTitle: 'What is a commit?',
      nextUpDuration: '4 min',
    },
  },

  // LESSON 6: What is a commit?
  {
    id: 'what-is-commit',
    slug: 'what-is-a-commit',
    levelId: 'level-1',
    kind: 'concept',
    cardTitle: 'What is a commit?',
    cardDescription:
      'Learn how commits act like saved checkpoints with short notes explaining why.',
    readTime: '4 min read',
    meta: 'Lesson 06 · 4 min read',
    titleStart: 'What is a ',
    titleHighlight: 'commit',
    titleEnd: '?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Every time you save a change on GitHub, you make a commit. See how commits build a clear safety net you can always revisit.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/alex-dev/my-first-project/commits',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: '3 commits',
      branchName: 'main',
      branchCount: 'History',
      addFileLabel: 'History',
      emptyTitle: 'Every save leaves a clear breadcrumb',
      emptyDescription:
        'Each commit stores what changed, who saved it, and the short note you wrote.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'Saving your checkpoint in a game',
        paragraphs: [
          'Think about playing an adventure game. Before you walk into a tricky puzzle room, you step onto a glowing checkpoint and save your progress.',
          'If something goes wrong five minutes later, you never have to restart the whole game—you just load your last clean checkpoint.',
          'A commit is that exact checkpoint for your files. Each time you finish a small improvement and click Commit changes, GitHub takes a snapshot of your repository and attaches your short note explaining what changed.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Commit',
        meaning:
          'A saved checkpoint of your project at one moment in time, labeled with a short human message explaining what you changed.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'Three checkpoints on your timeline',
        subtitle: 'Each commit adds one clear step without erasing older ones.',
        variant: 'commit-checkpoints',
        nodes: [
          { label: 'Commit 1', sublabel: 'Create README.md', tone: 'neutral' },
          { label: 'Commit 2', sublabel: 'Add project goals', tone: 'neutral' },
          { label: 'Commit 3', sublabel: 'Fix spelling typo', tone: 'primary' },
          { label: 'Safe history', sublabel: 'Jump back anytime', tone: 'secondary' },
        ],
        caption:
          'Writing short, clear commit messages helps future-you understand every checkpoint at a glance.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'Where your commits live in GitHub',
        subtitle: 'Click each numbered marker to explore the commit history view.',
        windowUrl: 'github.com/alex-dev/my-first-project',
        screenType: 'commit-history',
        markers: [
          {
            number: 1,
            label: 'Commits counter (e.g. 3 commits)',
            description:
              'Look on the right side of the file bar. Clicking this number opens every saved checkpoint in chronological order.',
            xPercent: 85,
            yPercent: 32,
          },
          {
            number: 2,
            label: 'Latest commit title',
            description:
              'Right above your file list, GitHub always shows the short note from the most recent commit.',
            xPercent: 36,
            yPercent: 48,
          },
          {
            number: 3,
            label: 'Timestamp',
            description:
              'Tells you exactly when that checkpoint was saved (like "2 hours ago" or "yesterday").',
            xPercent: 82,
            yPercent: 68,
          },
        ],
        screenshots: [
          {
            id: 'l6-commit-changes-box',
            title: 'The Commit changes box',
            src: '/assets/aistudio/L6-commit-changes-box-clean_4c462d29.png',
            alt: 'GitHub Commit changes dialog showing Commit message input, Extended description box, branch radio buttons, and green Commit changes button',
            caption:
              'When saving a change, write a short commit message, choose main or a new branch, and click Commit changes.',
            markers: [
              {
                n: 1,
                x: 15.0,
                y: 18.8,
                w: 70.0,
                h: 6.4,
                label: 'Commit message: a short note about what you changed',
              },
              {
                n: 2,
                x: 15.0,
                y: 32.9,
                w: 70.0,
                h: 32.1,
                label: 'Extended description: optional extra details',
              },
              {
                n: 3,
                x: 15.0,
                y: 69.0,
                w: 38.1,
                h: 4.0,
                label: 'Commit directly to main: saves the change right away',
              },
              {
                n: 4,
                x: 15.0,
                y: 74.7,
                w: 67.5,
                h: 8.2,
                label: 'New branch: saves on a separate branch and starts a pull request',
              },
              {
                n: 5,
                x: 64.4,
                y: 89.0,
                w: 20.6,
                h: 6.2,
                label: 'Commit changes: click to save your file',
              },
            ],
          },
          {
            id: 'l6-commit-details',
            title: 'Inspecting a saved commit',
            src: '/assets/aistudio/L6-commit-details-clean_bba8fc48.png',
            alt: 'GitHub commit details page showing commit message, main branch label, changed files count, file sidebar, and green added lines',
            caption:
              'When you click a commit, you can read its message, see which branch it lives on, and inspect every green added line.',
            markers: [
              {
                n: 1,
                x: 1.6,
                y: 14.5,
                w: 96.8,
                h: 8.6,
                label: 'Commit message: what changed and why',
              },
              {
                n: 2,
                x: 4.2,
                y: 24.8,
                w: 2.7,
                h: 3.0,
                label: 'Branch: the commit lives on main',
              },
              {
                n: 3,
                x: 1.6,
                y: 29.3,
                w: 96.8,
                h: 5.0,
                label: 'Files changed: how many files this save point touched',
              },
              {
                n: 4,
                x: 1.6,
                y: 41.1,
                w: 17.4,
                h: 58.7,
                label: 'Changed files: click a file to see its changes',
              },
              {
                n: 5,
                x: 21.2,
                y: 53.0,
                w: 77.3,
                h: 28.3,
                label: 'Green lines: lines that were added',
              },
            ],
          },
        ],
      },
      commonMistake: {
        eyebrow: 'Common mistake',
        title: 'Writing vague commit notes like “stuff” or “update”',
        text: 'Three weeks from now, “stuff” will tell you nothing. Always write a short, plain-English title like “Add contact email to README” so you know what each checkpoint did.',
      },
    },
    quizzes: [
      {
        id: 'l6-q1',
        eyebrow: 'Question 1 of 3',
        questionPrefix: 'What is a commit most like in everyday life?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'A saved checkpoint in a game with a short note',
            isCorrect: true,
            feedback: 'Correct! A commit locks in a clean snapshot you can revisit whenever you need.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Deleting your files forever',
            isCorrect: false,
            feedback: 'Not quite. Commits preserve your history rather than erasing it.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Shutting down your laptop',
            isCorrect: false,
            feedback: 'Incorrect. Commits happen inside GitHub to save your project timeline.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'Sending a text message to a friend',
            isCorrect: false,
            feedback: 'Not quite. A commit saves a version of your repository.',
          },
        ],
      },
      {
        id: 'l6-q2',
        eyebrow: 'Question 2 of 3',
        questionPrefix: 'Which commit message is clearest for a beginner project?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'stuff',
            isCorrect: false,
            feedback: 'Not quite. Later on, “stuff” will not remind you what changed.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'asdf123',
            isCorrect: false,
            feedback: 'Incorrect. Random letters make your project history impossible to read.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Add welcome paragraph to README',
            isCorrect: true,
            feedback: 'Correct! Short, specific notes tell you right away what that checkpoint changed.',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'Leaving the box totally blank',
            isCorrect: false,
            feedback: 'Not quite. GitHub asks for a commit title so every checkpoint has meaning.',
          },
        ],
      },
      {
        id: 'l6-q3',
        eyebrow: 'Question 3 of 3',
        questionPrefix: 'Where can you click inside a repository to view all past commits?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'The commits count (like “3 commits”) above the file list',
            isCorrect: true,
            feedback: 'Correct! Clicking the commits count opens your full timeline of checkpoints.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Your browser’s bookmark star',
            isCorrect: false,
            feedback: 'Incorrect. Look inside the repository header above the file list.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'You can never see past commits once saved',
            isCorrect: false,
            feedback: 'Not quite. Seeing past commits is one of GitHub’s best features!',
          },
          {
            id: 'd',
            labelPrefix: 'D)',
            text: 'Only in the Sign out menu',
            isCorrect: false,
            feedback: 'Incorrect. Look for the clock icon and commits count on the repository page.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 6 Complete',
      title: 'You understand commits!',
      description:
        'Now that you know how checkpoints work, let us finish the beginner path by learning how branches let you test ideas safely.',
      ctaLabel: 'Continue to Lesson 7',
      completedCtaLabel: 'Lesson 6 completed',
      nextUpPrefix: 'Next up: ',
      nextUpTitle: 'What is a branch?',
      nextUpDuration: '5 min',
    },
  },

  // LESSON 7: What is a branch? (Existing tutorial lesson)
  {
    id: 'create-first-branch',
    slug: 'what-is-a-branch',
    levelId: 'level-1',
    kind: 'tutorial',
    cardTitle: 'What is a branch?',
    cardDescription:
      'Create a safe parallel copy of your project so you can experiment without risk.',
    readTime: '5 min read',
    meta: 'Beginner · 5 min read',
    titleStart: 'What is a ',
    titleHighlight: 'branch',
    titleEnd: '?',
    descriptionSegments: [
      { type: 'text', value: 'Learn how to spin up a safe parallel workspace off ' },
      { type: 'code', value: 'main' },
      {
        type: 'text',
        value:
          ' directly in your browser. Try new ideas, edit files, and save every commit without touching your live project.',
      },
    ],
    primaryCtaLabel: 'Start Step 1',
    secondaryCtaLabel: "See what you'll learn",
    heroMockup: {
      url: 'github.com/alex-dev/my-first-project',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: '2 commits',
      branchName: 'main',
      branchCount: '1 branch',
      addFileLabel: 'Add file',
      emptyTitle: 'README.md is live on main',
      emptyDescription:
        'Want to test changes without risking what already works? Create a fresh branch right from the main dropdown.',
      existingFile: {
        name: 'README.md',
        message: 'Create README.md',
      },
    },
    progressSteps: [
      { id: 'open-repo', number: '01', label: 'Open branch menu', targetId: 'hero-overview' },
      { id: 'create-file', number: '02', label: 'Find branch box', targetId: 'step-01' },
      { id: 'name-write', number: '03', label: 'Name branch', targetId: 'step-02' },
      { id: 'commit', number: '04', label: 'Work safely', targetId: 'step-03' },
      { id: 'verify', number: '05', label: 'Verify', targetId: 'quick-check' },
    ],
    steps: [
      {
        id: 'step-01',
        eyebrow: 'Step 01',
        titlePrefix: 'Open the ',
        titleBold: '“main”',
        titleSuffix: ' branch switcher',
        description:
          'At the top left of your repository file list, click the button labeled main. That small menu shows every branch in your repository and lets you start a brand-new one in seconds.',
        callout: {
          icon: 'lightbulb',
          label: 'Pro tip:',
          text: 'Your main branch should stay clean and working. Think of it as the published edition of your project.',
        },
        align: 'text-left',
        mockup: {
          kind: 'branch-dropdown',
          windowTitle: 'my-first-project / switch branches',
          branchName: 'main',
          metaText: '1 Branch · 0 Tags',
          searchPlaceholder: 'Find or create a branch...',
          branches: ['main'],
          hintText: 'Click the “main” dropdown and type a name into “Find or create a branch…”.',
          screenshots: [
            {
              id: 'l7-branch-selector',
              src: '/assets/aistudio/L7-branch-selector-clean_52f99ff0.png',
              alt: 'GitHub branch selector dropdown open showing Find or create a branch box, Branches and Tags tabs, main branch, and View all branches',
              caption:
                'Click the branch button to search branches, type a new branch name, or open the full branches list.',
              markers: [
                {
                  n: 1,
                  x: 0.9,
                  y: 7.3,
                  w: 11.3,
                  h: 5.9,
                  label: 'Branch button: shows the branch you are on',
                },
                {
                  n: 2,
                  x: 1.8,
                  y: 22.7,
                  w: 32.8,
                  h: 6.2,
                  label: 'Find or create a branch: type a new name here to make a branch',
                },
                {
                  n: 3,
                  x: 1.8,
                  y: 31.9,
                  w: 13.7,
                  h: 7.4,
                  label: 'Branches and Tags: switch between the two lists',
                },
                {
                  n: 4,
                  x: 1.8,
                  y: 41.5,
                  w: 32.8,
                  h: 5.2,
                  label: 'main: the default branch, marked with a tick',
                },
                {
                  n: 5,
                  x: 1.8,
                  y: 50.5,
                  w: 32.8,
                  h: 5.3,
                  label: 'View all branches: open the full list',
                },
              ],
            },
          ],
        },
      },
      {
        id: 'step-02',
        eyebrow: 'Step 02',
        titlePrefix: 'Name your branch',
        titleCodePill: 'welcome-update',
        description:
          'Type a short, descriptive name with hyphens instead of spaces—like welcome-update. GitHub immediately offers a “Create branch” option right inside the menu so you can copy main into its own safe lane.',
        callout: {
          icon: 'help',
          label: 'Why hyphens?',
          text: 'Branch names cannot contain spaces. Using lowercase words joined by hyphens keeps every branch easy to read.',
        },
        align: 'text-right',
        mockup: {
          kind: 'branch-create',
          windowTitle: 'Creating branch in my-first-project',
          typedBranchName: 'welcome-update',
          baseBranch: 'main',
          hintText: 'Click “Create branch: welcome-update from main” to spin up your parallel copy.',
          screenshots: [
            {
              id: 'l7-branches-page',
              src: '/assets/aistudio/L7-branches-page-clean_b26f7277.png',
              alt: 'GitHub Branches page showing New branch button, sidebar filters, branch search box, main default branch, and Behind/Ahead columns',
              caption:
                'On the Branches page, you can search branches, filter by active or stale, and click New branch.',
              markers: [
                {
                  n: 1,
                  x: 91.7,
                  y: 9.0,
                  w: 6.7,
                  h: 12.9,
                  label: 'New branch: make a new branch',
                },
                {
                  n: 2,
                  x: 1.1,
                  y: 5.8,
                  w: 14.7,
                  h: 62.6,
                  label: 'Filters: Yours, Active, Stale, All',
                },
                {
                  n: 3,
                  x: 18.4,
                  y: 25.5,
                  w: 80.1,
                  h: 13.2,
                  label: 'Search branches by name',
                },
                {
                  n: 4,
                  x: 18.5,
                  y: 71.3,
                  w: 79.9,
                  h: 19.4,
                  label: 'main: the default branch',
                },
                {
                  n: 5,
                  x: 77.4,
                  y: 59.7,
                  w: 8.4,
                  h: 8.4,
                  label: 'Behind and Ahead: how far a branch is from main',
                },
              ],
            },
          ],
        },
      },
      {
        id: 'step-03',
        eyebrow: 'Step 03',
        titlePrefix: 'Edit and commit on your new branch',
        description:
          'GitHub automatically switches you onto welcome-update. Any file you edit or commit now stays strictly inside this branch—leaving main completely untouched until you decide to combine them.',
        callout: {
          icon: 'bookmark',
          label: 'Safety check:',
          text: 'Before clicking Commit changes, glance at the branch label at the bottom to make sure it says your new branch, not main.',
        },
        align: 'text-left',
        mockup: {
          kind: 'branch-switch',
          windowTitle: 'Editing on welcome-update',
          activeBranch: 'welcome-update',
          baseBranch: 'main',
          fileName: 'README.md',
          commitTitle: 'Add friendly welcome section',
          statusText: 'Isolated from main · Safe to experiment',
        },
      },
    ],
    practice: {
      mode: 'create-branch',
      eyebrow: 'Interactive Practice',
      title: 'Create your first branch in a practice repository',
      subtitle:
        'Walk through creating a new branch step by step. Click each control in order—if you click the wrong thing, a friendly hint will guide you back.',
      repoOwner: 'alex-dev',
      repoName: 'my-first-project',
      branchName: 'main',
      suggestedFileName: 'README.md',
      suggestedBranchName: 'welcome-update',
      defaultFileContent:
        '# My First Project\n\n## About\nTesting an update safely on my new branch.',
      defaultCommitMessage: 'Update README on welcome-update branch',
      stages: [
        {
          id: 'open-branch-menu',
          number: '1',
          label: 'Click main',
          instruction: 'Step 1: Click the “main” branch button on the left of the toolbar.',
          successMessage: 'Opened the branch switcher menu.',
        },
        {
          id: 'type-branch-name',
          number: '2',
          label: 'Name the branch',
          instruction: 'Step 2: Type a new branch name such as welcome-update.',
          successMessage: 'Great branch name! Now create it from main.',
        },
        {
          id: 'click-create-branch',
          number: '3',
          label: 'Create branch',
          instruction: 'Step 3: Click “Create branch” in the menu below the box.',
          successMessage: 'Switched onto your new branch!',
        },
        {
          id: 'commit-on-branch',
          number: '4',
          label: 'Commit safely',
          instruction: 'Step 4: Click “Commit changes” to save a test commit on your branch.',
          successMessage: 'Saved on your new branch—main stayed completely untouched!',
        },
      ],
    },
    vocabulary: {
      eyebrow: 'Vocabulary',
      title: "Words you'll meet",
      subtitle: 'Branching terms explained calmly in everyday language.',
      cards: [
        {
          id: 'main-branch',
          icon: 'folder',
          accent: 'primary',
          term: 'Main branch',
          definition:
            'The primary, default timeline of your repository where finished and trusted work lives.',
          analogyLabel: 'Think of it like',
          analogy: '“The final printed book sitting cleanly on the library shelf.”',
        },
        {
          id: 'feature-branch',
          icon: 'branch',
          accent: 'secondary',
          term: 'Branch',
          definition:
            'An isolated parallel timeline where you can experiment freely without risking the stability of main.',
          analogyLabel: 'Think of it like',
          analogy: '“A scratchpad copy where you try edits before touching the master copy.”',
        },
        {
          id: 'merge',
          icon: 'check',
          accent: 'primary',
          term: 'Merge',
          definition:
            'Combining the finished work from your branch cleanly back into the main timeline.',
          analogyLabel: 'Think of it like',
          analogy: '“Approving your draft edits and folding them into the final manuscript.”',
        },
      ],
    },
    diagram: {
      eyebrow: 'Mental Model',
      titlePrefix: 'Visual Concept: ',
      titleHighlight: 'What is a branch?',
      legend: [
        { label: 'main', tone: 'dark' },
        { label: 'welcome-update', tone: 'primary' },
      ],
      takeaways: [
        {
          id: 'branching-off',
          phase: 'branching',
          title: '1. Branching off',
          description: 'You create a clean workspace safely detached from your live code.',
        },
        {
          id: 'committing-changes',
          phase: 'committing',
          title: '2. Committing changes',
          description: 'Each commit creates an incremental, recoverable milestone of work.',
        },
        {
          id: 'merging-back',
          phase: 'merging',
          title: '3. Merging back',
          description:
            'When polished, your changes combine gracefully back into the master timeline.',
        },
      ],
    },
    quiz: {
      eyebrow: 'Quick Check',
      questionPrefix: 'When you save a commit on a new branch like ',
      questionCode: 'welcome-update',
      questionSuffix: ', what happens to your main branch?',
      options: [
        {
          id: 'overwritten',
          labelPrefix: 'A)',
          text: 'Your main branch is immediately overwritten with the new changes',
          isCorrect: false,
          feedback:
            'Not quite. The whole purpose of a branch is keeping your main branch untouched while you work.',
        },
        {
          id: 'deleted',
          labelPrefix: 'B)',
          text: 'GitHub deletes the main branch until you finish editing',
          isCorrect: false,
          feedback: 'Incorrect. Your main branch stays safely right where it is.',
        },
        {
          id: 'untouched',
          labelPrefix: 'C)',
          text: 'Your main branch stays completely untouched and safe',
          isCorrect: true,
          feedback:
            'Correct. Commits on welcome-update stay isolated on that branch until you choose to merge them back into main.',
        },
        {
          id: 'email',
          labelPrefix: 'D)',
          text: 'GitHub locks your repository so no one else can view it',
          isCorrect: false,
          feedback:
            'Not quite. Everyone can still view the repository normally while you experiment on your branch.',
        },
      ],
    },
    reviewQuestions: [
      {
        id: 'l7-rev-1',
        eyebrow: 'Quick Review',
        questionPrefix: 'Where do you click to create or switch to a new branch on GitHub?',
        questionSuffix: '',
        sectionTargetId: 'step-01',
        sectionLabel: 'Step 01: Open the “main” branch switcher',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'The branch button (usually labeled main) above the file list',
            isCorrect: true,
            feedback: 'Correct! The main dropdown lets you switch branches or type a new branch name.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'The Issues tab',
            isCorrect: false,
            feedback: 'Not quite. Issues are for tracking tasks—look for the branch button labeled main on the Code tab.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Your browser’s back button',
            isCorrect: false,
            feedback: 'Not quite. Use the branch dropdown inside the repository page.',
          },
        ],
      },
      {
        id: 'l7-rev-2',
        eyebrow: 'Quick Review',
        questionPrefix: 'How should you separate words when naming a new branch?',
        questionSuffix: '',
        sectionTargetId: 'step-02',
        sectionLabel: 'Step 02: Name your branch',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'With hyphens, like welcome-update (no spaces)',
            isCorrect: true,
            feedback: 'Correct! Branch names cannot have spaces, so hyphens keep them clean and readable.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'With spaces, like welcome update',
            isCorrect: false,
            feedback: 'Not quite. Spaces are not allowed in branch names—use hyphens instead.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Branches cannot be given names',
            isCorrect: false,
            feedback: 'Not quite. Naming your branch clearly helps you remember what idea you are testing.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 7 Complete',
      title: 'You finished Level 1: Basics!',
      description:
        'You now understand Git, GitHub, repositories, creating files, saving commits, and working safely on branches. Level 2 is now unlocked!',
      ctaLabel: 'Continue to Lesson 8',
      completedCtaLabel: 'Level 1 completed',
      nextUpPrefix: 'Next up in Level 2: ',
      nextUpTitle: 'What is a Pull Request?',
      nextUpDuration: '5 min',
    },
  },

  // =========================================================================
  // LEVEL 2: Working with others
  // =========================================================================

  // LESSON 8: What is a Pull Request?
  {
    id: 'pull-requests',
    slug: 'what-is-a-pull-request',
    levelId: 'level-2',
    kind: 'concept',
    cardTitle: 'What is a Pull Request?',
    cardDescription:
      'Share changes from your branch, ask your group to review them, and merge them into main.',
    readTime: '5 min read',
    meta: 'Lesson 08 · Level 2 · 5 min read',
    titleStart: 'What is a ',
    titleHighlight: 'Pull Request',
    titleEnd: '?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'You made changes on your own branch. Now see how to share them politely, let others check your work, and add it to ',
      },
      { type: 'code', value: 'main' },
      { type: 'text', value: '.' },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/alex-dev/class-essay/pulls',
      owner: 'alex-dev',
      repoName: 'class-essay',
      visibility: 'Public',
      commitCount: '1 new commit',
      branchName: 'my-experiment',
      branchCount: '2 branches',
      addFileLabel: 'Compare & pull request',
      emptyTitle: 'Ready to share your branch changes',
      emptyDescription:
        'A pull request lets your group read what you changed before anything is added to main.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'Handing your copy of the essay to the group',
        paragraphs: [
          'You and four friends are writing one essay together. You made your own copy of the essay and changed the first paragraph.',
          'Instead of replacing the original essay right away, you hand your copy to the group and ask them to look over your changes and add them if they like them.',
          'On GitHub, that polite request is called a pull request. Everyone can read your changes, leave friendly notes, and then add your work to the main project when it looks good.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Pull request',
        meaning:
          'A pull request is a message that says "I made changes on my branch. Please review them and add them to the main project."',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'From your branch back into main',
        subtitle:
          'Your branch stays separate while you work, then a pull request brings your changes back to main.',
        variant: 'pull-request-flow',
        nodes: [
          {
            label: '1. Make changes',
            sublabel: 'Edit and save commits on my-experiment.',
            tone: 'neutral',
          },
          {
            label: '2. Ask for review',
            sublabel: 'Open a pull request so others can check your lines.',
            tone: 'primary',
          },
          {
            label: '3. Merge',
            sublabel: 'Add the approved changes into main.',
            tone: 'secondary',
          },
        ],
        caption:
          'Main stays safe the whole time while your group reads and talks about your changes.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to open and merge a pull request',
        subtitle: 'Click each number on the screen or in the steps below to follow along.',
        windowUrl: 'github.com/alex-dev/class-essay/pull/1',
        screenType: 'pull-request-flow',
        markers: [
          {
            number: 1,
            label: 'Make changes on a branch, not on main',
            description:
              'Check the branch button on the left so you are working on your own branch (like my-experiment), not on main.',
            xPercent: 18,
            yPercent: 18,
          },
          {
            number: 2,
            label: 'Click the green "Compare & pull request" button',
            description:
              'Right after you save a commit on your branch, a banner appears at the top of the repository page with a green "Compare & pull request" button. Click it.',
            xPercent: 80,
            yPercent: 25,
            screenshot: {
              id: 'l8-example-compare-banner',
              src: '/assets/aistudio/L8-example-compare-banner-clean_7139e3f6.png',
              alt: 'Example GitHub repository page showing the yellow recent pushes banner and green Compare & pull request button',
              caption:
                "Example illustration: GitHub's real screen may look slightly different. The banner alerts you about your recent branch commits and shows the Compare & pull request button.",
              markers: [
                {
                  n: 1,
                  x: 10.0,
                  y: 39.5,
                  w: 41.0,
                  h: 10.7,
                  label: 'Banner: GitHub notices your new branch and offers to start a pull request',
                },
                {
                  n: 2,
                  x: 72.5,
                  y: 39.8,
                  w: 19.7,
                  h: 10.2,
                  label: 'Compare & pull request: click to start',
                },
              ],
            },
          },
          {
            number: 3,
            label: 'Or use the Pull requests tab and "New pull request"',
            description:
              'If you do not see the banner, open the Pull requests tab at the top of the page and click the green "New pull request" button.',
            xPercent: 45,
            yPercent: 12,
            screenshot: {
              id: 'l8-pull-requests-tab',
              src: '/assets/aistudio/L8-pull-requests-tab-clean_0f304eb5.png',
              alt: 'GitHub Pull requests tab showing New pull request button, sidebar views, search bar, Open and Closed counts, and filter dropdowns',
              caption:
                'Inside the Pull requests tab, click New pull request on the top right or filter existing requests.',
              markers: [
                {
                  n: 1,
                  x: 89.7,
                  y: 7.6,
                  w: 8.8,
                  h: 10.8,
                  label: 'New pull request: start a new request',
                },
                {
                  n: 2,
                  x: 1.1,
                  y: 4.9,
                  w: 14.7,
                  h: 52.4,
                  label: 'Views: pull requests you made or were asked to review',
                },
                {
                  n: 3,
                  x: 18.4,
                  y: 23.8,
                  w: 80.1,
                  h: 10.8,
                  label: 'Search and filter pull requests',
                },
                {
                  n: 4,
                  x: 21.1,
                  y: 45.4,
                  w: 12.1,
                  h: 6.5,
                  label: 'Open and Closed: still waiting, or finished',
                },
                {
                  n: 5,
                  x: 47.1,
                  y: 45.4,
                  w: 46.1,
                  h: 6.5,
                  label: 'Filters: narrow by author, label, and more',
                },
              ],
            },
          },
          {
            number: 4,
            label: 'Check the base and compare branch boxes',
            description:
              'Look at the two branch boxes. The base box is where the changes will go, usually main. The compare box is your branch with the new changes.',
            xPercent: 44,
            yPercent: 42,
          },
          {
            number: 5,
            label: 'Write a title and short description',
            description:
              'Give your pull request a clear title and a short note explaining what you changed and why so reviewers know what to look for.',
            xPercent: 32,
            yPercent: 60,
          },
          {
            number: 6,
            label: 'Click "Create pull request"',
            description:
              'Click the green "Create pull request" button below your description to share your work with the project.',
            xPercent: 34,
            yPercent: 79,
            screenshot: {
              id: 'l8-example-open-pull-request',
              src: '/assets/aistudio/L8-example-open-pull-request-clean_f389428b.png',
              alt: 'Example Open a pull request screen showing base and compare branch selectors, Able to merge indicator, title, description, and Create pull request button',
              caption:
                "Example illustration: GitHub's real screen may look slightly different. Covers Steps 4 to 6: check the base and compare branches, write a title and description, and click Create pull request.",
              markers: [
                {
                  n: 1,
                  x: 10.2,
                  y: 17.5,
                  w: 12.5,
                  h: 4.5,
                  label: 'Base: the branch that receives the changes (main)',
                },
                {
                  n: 2,
                  x: 26.7,
                  y: 17.5,
                  w: 20.8,
                  h: 4.5,
                  label: 'Compare: your branch with the changes (my-experiment)',
                },
                {
                  n: 3,
                  x: 5.8,
                  y: 26.0,
                  w: 43.3,
                  h: 4.5,
                  label: 'Able to merge: no conflicts, so it is safe to continue',
                },
                {
                  n: 4,
                  x: 10.8,
                  y: 37.5,
                  w: 83.3,
                  h: 6.2,
                  label: 'Title: a short name for your change',
                },
                {
                  n: 5,
                  x: 10.8,
                  y: 46.0,
                  w: 83.3,
                  h: 30.5,
                  label: 'Description: explain what you changed and why',
                },
                {
                  n: 6,
                  x: 72.5,
                  y: 79.5,
                  w: 21.7,
                  h: 6.0,
                  label: 'Create pull request: click to send it for review',
                },
              ],
            },
          },
          {
            number: 7,
            label: 'Review the green and red lines, then click "Merge pull request"',
            description:
              'The owner checks the changes—green lines were added, red lines were removed—then clicks "Merge pull request" and confirms.',
            xPercent: 77,
            yPercent: 79,
            screenshot: {
              id: 'l8-example-merged-pull-request',
              src: '/assets/aistudio/L8-example-merged-pull-request-clean_c6992b9e.png',
              alt: 'Example merged pull request screen showing the purple Merged badge, Files changed tab, merged confirmation box, and Delete branch button',
              caption:
                "Example illustration: GitHub's real screen may look slightly different. Once merged, you see the purple Merged badge, the Files changed tab, and a safe Delete branch button.",
              markers: [
                {
                  n: 1,
                  x: 5.8,
                  y: 13.7,
                  w: 11.0,
                  h: 5.7,
                  label: 'Merged: the purple label means your changes are now in main',
                },
                {
                  n: 2,
                  x: 18.0,
                  y: 14.0,
                  w: 45.6,
                  h: 5.1,
                  label: 'Who merged what, and from which branch',
                },
                {
                  n: 3,
                  x: 40.6,
                  y: 24.6,
                  w: 12.5,
                  h: 5.1,
                  label: 'Files changed: see exactly which lines were added or removed',
                },
                {
                  n: 4,
                  x: 12.8,
                  y: 60.0,
                  w: 46.3,
                  h: 9.4,
                  label: 'Success message: the pull request is merged and closed',
                },
                {
                  n: 5,
                  x: 77.5,
                  y: 62.6,
                  w: 14.2,
                  h: 6.0,
                  label: 'Delete branch: safe to click, your work is saved in main',
                },
              ],
            },
          },
        ],
        extraScreenshots: [
          {
            id: 'l8-pull-requests-inbox',
            title: 'Your Pull Requests inbox',
            src: '/assets/aistudio/L8-pull-requests-inbox-clean_c52177e5.png',
            alt: 'GitHub Pull Requests inbox screen showing sidebar views, Select repositories button, Date filter dropdown, and Needs your review section',
            caption:
              'From your global Pull requests page, switch views on the left, filter by repository or date, and check pull requests waiting for your review.',
            markers: [
              {
                n: 1,
                x: 1.1,
                y: 6.1,
                w: 14.7,
                h: 37.0,
                label: 'Views: pull requests you wrote or were asked to review',
              },
              {
                n: 2,
                x: 72.6,
                y: 8.0,
                w: 9.3,
                h: 7.4,
                label: 'Select repositories: pick which projects to show',
              },
              {
                n: 3,
                x: 82.5,
                y: 8.0,
                w: 13.4,
                h: 7.4,
                label: 'Date filter: last month, last year, or any time',
              },
              {
                n: 4,
                x: 18.4,
                y: 20.9,
                w: 64.2,
                h: 36.7,
                label: 'Needs your review: requests waiting for you',
              },
            ],
          },
        ],
      },
      afterMerging: {
        eyebrow: 'After merging',
        title: 'What happens after you merge',
        text: 'Once merged, the pull request shows a purple "Merged" label and your changes are now saved inside main. GitHub may show a "Delete branch" button—clicking it is safe because your work is already safely stored in main.',
      },
      commonMistake: {
        eyebrow: 'Common mistake',
        title: 'Mixing up the base and compare boxes',
        text: 'If the page says "There isn\'t anything to compare", check the two boxes at the top. The base and compare branches might be swapped, or your branch might not have any new commits yet.',
        screenshot: {
          id: 'l8-compare-changes',
          src: '/assets/aistudio/L8-compare-changes-clean_c2a23aed.png',
          alt: 'GitHub Compare changes screen with both base and compare set to main and a greyed-out Create pull request button',
          caption:
            'If both base and compare are set to main, GitHub has nothing to compare and keeps the Create pull request button grey.',
          markers: [
            {
              n: 1,
              x: 9.8,
              y: 42.3,
              w: 7.0,
              h: 11.3,
              label: 'Base: the branch that receives the changes',
            },
            {
              n: 2,
              x: 19.3,
              y: 42.3,
              w: 8.7,
              h: 11.3,
              label: 'Compare: the branch that has your changes',
            },
            {
              n: 3,
              x: 6.8,
              y: 74.2,
              w: 47.4,
              h: 9.0,
              label: 'Both branches are main, so there is nothing to compare',
            },
            {
              n: 4,
              x: 85.8,
              y: 71.9,
              w: 11.7,
              h: 12.9,
              label: 'Create pull request: stays grey until the branches differ',
            },
          ],
        },
      },
    },
    quizzes: [
      {
        id: 'l8-q1',
        eyebrow: 'Question 1 of 3',
        questionPrefix: 'What does a pull request do?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Deletes a branch',
            isCorrect: false,
            feedback:
              'Not quite. Deleting an old branch is an optional step after merging, not what a pull request does.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: "Asks to add your branch's changes into another branch",
            isCorrect: true,
            feedback:
              'Correct! A pull request asks the group to review your branch changes and add them into the main branch.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Downloads the project',
            isCorrect: false,
            feedback:
              'Incorrect. Downloading a project to your computer is called cloning, not a pull request.',
          },
        ],
      },
      {
        id: 'l8-q2',
        eyebrow: 'Question 2 of 3',
        questionPrefix: 'In a pull request, which box is the "base"?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'The branch that receives the changes',
            isCorrect: true,
            feedback:
              'Correct! The base branch (usually main) is where your changes will be added.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Your new branch',
            isCorrect: false,
            feedback:
              'Not quite. Your new branch with the edits goes in the compare box, not the base box.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'The README file',
            isCorrect: false,
            feedback:
              'Incorrect. Base and compare are both branches, not individual files.',
          },
        ],
      },
      {
        id: 'l8-q3',
        eyebrow: 'Question 3 of 3',
        questionPrefix: 'Green lines in a pull request show:',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Errors',
            isCorrect: false,
            feedback:
              'Not quite. Green lines do not mean errors—they show what new text you wrote.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Lines that were removed',
            isCorrect: false,
            feedback:
              'Incorrect. Red lines with a minus sign show what was removed; green shows what is new.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Lines that were added',
            isCorrect: true,
            feedback:
              'Correct! Green lines highlight text you added, and red lines highlight text you removed.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 8 Complete',
      title: 'You know how Pull Requests work!',
      description:
        'You learned how to propose changes on a branch, check the base and compare boxes, read added and removed lines, and merge safely into main.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 8 completed',
      nextUpPrefix: 'Coming soon in Level 2: ',
      nextUpTitle: 'Fork and clone',
      nextUpDuration: 'Next lesson',
    },
  },
  {
    id: 'fork-and-clone',
    slug: 'fork-and-clone',
    levelId: 'level-2',
    unlockWithLevel: true,
    kind: 'concept',
    cardTitle: 'What are Fork and Clone?',
    cardDescription:
      "Make your own copy of someone else's repository on GitHub, and download a copy to your computer.",
    readTime: '5 min read',
    meta: 'Lesson 09 · Level 2 · 5 min read',
    titleStart: 'What are ',
    titleHighlight: 'Fork and Clone',
    titleEnd: '?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Copy someone else’s repository safely to your own GitHub account, or download the files to your computer so you can work anytime.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/original-owner/sample-project',
      owner: 'original-owner',
      repoName: 'sample-project',
      visibility: 'Public',
      commitCount: '5 Commits',
      branchName: 'main',
      branchCount: 'Fork · Clone',
      addFileLabel: '<> Code',
      emptyTitle: 'Copy safely before making changes',
      emptyDescription:
        'A fork gives you your own copy on GitHub. A clone brings a copy onto your computer.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'Photocopying a recipe book to try changes',
        paragraphs: [
          'A friend owns a recipe book. You want to try changing a recipe, but it is her book, so you may not write in it.',
          'You photocopy the whole book onto your own shelf. That copy is a fork, and now you can scribble freely.',
          'Later you carry a copy to your desk at home to work offline. That is a clone. If your change is good, you ask her to add it. That request is a pull request.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Fork',
        meaning:
          "A fork is your own copy of someone else's repository on GitHub.",
        extraTerm: 'Clone',
        extraMeaning:
          'A clone is a copy of a repository downloaded to your computer.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'From someone else’s repository to your desk',
        subtitle:
          'Fork puts a copy in your GitHub account, Clone brings it to your computer, and a Pull request sends good changes back.',
        variant: 'fork-clone-flow',
        nodes: [
          {
            label: 'Original repository (original-owner)',
            sublabel: 'The owner’s original project that you do not edit directly.',
            tone: 'neutral',
          },
          {
            label: 'Your fork (your-username, on GitHub)',
            sublabel: 'Your own copy on GitHub. Send changes back via a Pull request.',
            tone: 'primary',
          },
          {
            label: 'Your computer',
            sublabel: 'Cloned onto your desk so you can read and edit files locally.',
            tone: 'secondary',
          },
        ],
        caption:
          'A fork stays on GitHub under your name; a clone lives on your computer.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to fork and clone a repository',
        subtitle:
          'Follow steps 1 to 7 below and click any number on the screen to see where each button lives.',
        windowUrl: 'github.com/original-owner/sample-project',
        screenType: 'fork-clone-page',
        markers: [
          {
            number: 1,
            label: 'Open the repository you want to copy',
            description:
              "Open the repository you want to copy. Its address starts with someone else's name, not yours.",
            xPercent: 18,
            yPercent: 11,
          },
          {
            number: 2,
            label: 'Click Fork at the top right',
            description:
              'Look near the top right of the repository page and click Fork to start making your own copy.',
            xPercent: 84,
            yPercent: 11,
            screenshot: {
              id: 'l10-example-fork-button',
              src: '/assets/aistudio/L10-example-fork-button-clean_893683e6.png',
              alt: 'Example GitHub repository page highlighting the original owner and the Fork button at the top right',
              caption:
                "Example illustration: GitHub's real screen may look slightly different. Notice the owner name on the left belongs to someone else, and click Fork on the top right.",
              markers: [
                {
                  n: 1,
                  x: 5.2,
                  y: 14.0,
                  w: 31.4,
                  h: 10.0,
                  label: 'Repository owner and name: this project belongs to someone else',
                },
                {
                  n: 2,
                  x: 70.0,
                  y: 14.5,
                  w: 11.7,
                  h: 9.5,
                  label: 'Fork: click to make your own copy',
                },
              ],
            },
          },
          {
            number: 3,
            label: 'Check owner, keep main branch ticked, and click Create fork',
            description:
              'Check that the owner is you, keep "Copy the main branch only" ticked, and click Create fork.',
            xPercent: 82,
            yPercent: 32,
            screenshot: {
              id: 'l10-example-create-fork',
              src: '/assets/aistudio/L10-example-create-fork-clean_f2eee1a6.png',
              alt: 'Example GitHub Create a new fork screen showing Owner, Repository name, Copy the main branch only checkbox, and Create fork button',
              caption:
                "Example illustration: GitHub's real screen may look slightly different. Confirm your username as Owner, keep Copy the main branch only ticked, and click Create fork.",
              markers: [
                {
                  n: 1,
                  x: 5.8,
                  y: 31.9,
                  w: 20.8,
                  h: 6.9,
                  label: 'Owner: your account, where the copy will live',
                },
                {
                  n: 2,
                  x: 30.8,
                  y: 31.9,
                  w: 26.7,
                  h: 6.9,
                  label: 'Repository name: keep the same name or change it',
                },
                {
                  n: 3,
                  x: 5.5,
                  y: 67.5,
                  w: 43.7,
                  h: 10.0,
                  label: 'Copy the main branch only: the simplest choice for beginners',
                },
                {
                  n: 4,
                  x: 5.8,
                  y: 82.8,
                  w: 12.5,
                  h: 7.2,
                  label: 'Create fork: click to make the copy',
                },
              ],
            },
          },
          {
            number: 4,
            label: 'GitHub opens your copy with "forked from" under its name',
            description:
              'GitHub opens your copy. Under its name it says "forked from original-owner/sample-project".',
            xPercent: 30,
            yPercent: 56,
          },
          {
            number: 5,
            label: 'To copy it to your computer, click the green Code button',
            description:
              'Look above the file list on your repository page and click the green <> Code button to open the clone menu.',
            xPercent: 86,
            yPercent: 54,
          },
          {
            number: 6,
            label: 'Choose HTTPS and click the copy icon next to the web address',
            description:
              'Under Local and Clone, make sure HTTPS is selected and click the small copy icon next to the web address.',
            xPercent: 84,
            yPercent: 86,
          },
          {
            number: 7,
            label: 'No terminal yet? Click Download ZIP, or Open with GitHub Desktop',
            description:
              'If you are not ready to use a terminal command yet, click Download ZIP to get a plain folder of the files, or choose Open with GitHub Desktop.',
            xPercent: 78,
            yPercent: 74,
            screenshot: {
              id: 'l10-example-clone-url',
              src: '/assets/aistudio/L10-example-clone-url-clean_d425debd.png',
              alt: 'Example GitHub repository page showing the green Code button and Clone dropdown with HTTPS, web address copy icon, and Download ZIP',
              caption:
                "Example illustration: GitHub's real screen may look slightly different. Click the green Code button (Step 5), choose HTTPS and copy the web address (Step 6), or click Download ZIP (Step 7).",
              markers: [
                {
                  n: 1,
                  x: 84.2,
                  y: 18.8,
                  w: 10.0,
                  h: 5.9,
                  label: 'Code: opens the clone menu',
                },
                {
                  n: 2,
                  x: 64.7,
                  y: 43.4,
                  w: 7.8,
                  h: 5.9,
                  label: 'HTTPS: the simplest way to clone',
                },
                {
                  n: 3,
                  x: 64.7,
                  y: 51.6,
                  w: 28.2,
                  h: 6.9,
                  label: 'Web address: copy it with the small copy icon',
                },
                {
                  n: 4,
                  x: 64.0,
                  y: 78.8,
                  w: 29.5,
                  h: 7.8,
                  label: 'Download ZIP: get the files without a terminal',
                },
              ],
            },
          },
        ],
      },
      tip: {
        eyebrow: 'Tip',
        title: 'When to fork, when to clone, and when to do both',
        text: "Fork when the project is not yours. Clone when you want the files on your computer. To contribute to someone else's project, do both: fork it, clone your fork, change it, then open a pull request.",
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two mistakes beginners make with fork and clone',
        text: 'Watch out for these two mix-ups when copying a project:',
        items: [
          {
            title: '1. Trying to fork your own repository',
            text: 'You do not need to fork your own repository, because you can edit it directly.',
          },
          {
            title: '2. Cloning the original instead of your fork',
            text: 'You cannot send changes back to the original directly, so clone your fork.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l10-q1',
        eyebrow: 'Question 1 of 3',
        questionPrefix: 'What is a fork?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: "A copy of someone else's repository in your GitHub account",
            isCorrect: true,
            feedback:
              "Correct! A fork makes your own copy of someone else's repository on GitHub so you can edit it freely.",
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'A deleted branch',
            isCorrect: false,
            feedback:
              'Not quite. A fork is a full copy of a repository in your account, not a deleted branch.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'A download to your computer',
            isCorrect: false,
            feedback:
              'Incorrect. Downloading a repository to your computer is called a clone, while a fork stays on GitHub.',
          },
        ],
      },
      {
        id: 'l10-q2',
        eyebrow: 'Question 2 of 3',
        questionPrefix: 'Where does a clone live?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'On your computer',
            isCorrect: true,
            feedback:
              'Correct! Cloning downloads the repository onto your computer so you can work on it locally.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: "In the original owner's account",
            isCorrect: false,
            feedback:
              "Not quite. The original repository stays in the owner's account; a clone lives on your computer.",
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'In the Issues tab',
            isCorrect: false,
            feedback:
              'Incorrect. The Issues tab holds notes and tasks, while a clone is a downloaded copy on your computer.',
          },
        ],
      },
      {
        id: 'l10-q3',
        eyebrow: 'Question 3 of 3',
        questionPrefix: 'Which green button gives you the web address to clone?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Code',
            isCorrect: true,
            feedback:
              'Correct! Clicking the green Code button opens the Clone menu with the HTTPS web address and Download ZIP.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Fork',
            isCorrect: false,
            feedback:
              'Not quite. Fork copies the repository to your GitHub account, while Code gives you the web address to clone.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Star',
            isCorrect: false,
            feedback:
              'Incorrect. Star bookmarks a repository you like; Code opens the menu for cloning.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 9 Complete',
      title: 'You know how Fork and Clone work!',
      description:
        "You learned how to fork someone else's repository into your GitHub account and how to clone or download a copy onto your computer.",
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 9 completed',
      nextUpPrefix: 'Next up in Level 2: ',
      nextUpTitle: 'What is an Issue?',
      nextUpDuration: '4 min read',
    },
  },
  {
    id: 'issues',
    slug: 'issues',
    levelId: 'level-2',
    kind: 'concept',
    cardTitle: 'What is an Issue?',
    cardDescription:
      "Report bugs, share ideas, and ask questions in your project's shared to-do list.",
    readTime: '4 min read',
    meta: 'Lesson 09 · Level 2 · 4 min read',
    titleStart: 'What is an ',
    titleHighlight: 'Issue',
    titleEnd: '?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'An easy way to keep track of problems, ideas, and questions on GitHub so nobody forgets them.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/alex-dev/class-essay/issues',
      owner: 'alex-dev',
      repoName: 'class-essay',
      visibility: 'Public',
      commitCount: '2 Open',
      branchName: 'main',
      branchCount: 'Issues tab',
      addFileLabel: 'New issue',
      emptyTitle: 'Keep track of bugs, ideas, and questions',
      emptyDescription:
        'Anyone can write a note, teammates add comments, and you close it when it is fixed.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'The notebook on the wall',
        paragraphs: [
          'You and four friends build one project together. You hang a notebook on the wall where anyone can write a problem ("the button is hard to see"), an idea, or a question.',
          'Others read the note and add comments underneath to help figure it out.',
          'When the problem is fixed or the question is answered, someone ticks it off. On GitHub, that notebook is called Issues.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Issue',
        meaning:
          "An issue is a note in your project's to-do list: a problem to fix, an idea to try, or a question to ask.",
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'From open note to finished',
        subtitle: 'Every issue moves through three simple stages.',
        variant: 'issue-flow',
        nodes: [
          {
            label: 'Open: someone writes it',
            sublabel: 'A teammate writes down a problem, an idea, or a question.',
            tone: 'neutral',
          },
          {
            label: 'Discussed: people comment',
            sublabel: 'Others read the note, ask questions, and leave helpful replies.',
            tone: 'primary',
          },
          {
            label: 'Closed: it is fixed or finished',
            sublabel: 'Someone ticks it off so everyone knows it is done.',
            tone: 'secondary',
          },
        ],
        caption:
          'Closed issues are never deleted—you can still read them later or click Reopen issue if needed.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to read and create an issue',
        subtitle:
          'Follow steps 1 to 8 below and click any number on the screen to see what each part does.',
        windowUrl: 'github.com/alex-dev/class-essay/issues',
        screenType: 'issues-page',
        markers: [
          {
            number: 1,
            label: 'Open your repository and click the Issues tab',
            description:
              'Go to your repository page and click the Issues tab right next to Code at the top.',
            xPercent: 25,
            yPercent: 10,
          },
          {
            number: 2,
            label: 'See the list of Open and Closed issues, search box, and labels',
            description:
              'You see a list of Open (waiting) and Closed (finished) issues, a search box to filter them, and colored tags called labels.',
            xPercent: 20,
            yPercent: 29,
            screenshot: {
              id: 'l9-example-issues-list',
              src: '/assets/aistudio/L9-example-issues-list-clean_5fc7c5d0.png',
              alt: 'Example GitHub Issues list showing New issue button, search bar, Open and Closed counts, an issue title, and a colored bug label',
              caption:
                "Example illustration: GitHub's real screen may look slightly different. Here you can browse Open and Closed issues, search, check colored labels, or start a new issue.",
              markers: [
                {
                  n: 1,
                  x: 80.0,
                  y: 15.8,
                  w: 14.2,
                  h: 11.6,
                  label: 'New issue: click to write a new one',
                },
                {
                  n: 2,
                  x: 5.8,
                  y: 15.8,
                  w: 49.2,
                  h: 11.6,
                  label: 'Search and filter issues',
                },
                {
                  n: 3,
                  x: 6.7,
                  y: 36.3,
                  w: 17.3,
                  h: 8.4,
                  label: 'Open and Closed: unfinished and finished issues',
                },
                {
                  n: 4,
                  x: 9.7,
                  y: 51.6,
                  w: 22.0,
                  h: 8.9,
                  label: 'Issue title: click to read the details',
                },
                {
                  n: 5,
                  x: 32.3,
                  y: 52.6,
                  w: 3.5,
                  h: 6.3,
                  label: 'Label: a colored tag, like bug',
                },
              ],
            },
          },
          {
            number: 3,
            label: 'Click the green "New issue" button',
            description:
              'To add a new note to the project to-do list, click the green New issue button on the top right.',
            xPercent: 86,
            yPercent: 10,
          },
          {
            number: 4,
            label: 'Write a short title that says what is wrong or wanted',
            description:
              'Keep the title clear and specific, like "Button is hard to see on mobile", so teammates know what it is about right away.',
            xPercent: 26,
            yPercent: 52,
          },
          {
            number: 5,
            label: 'Explain what you saw and what you expected',
            description:
              'In the description box below, write clear details about what happened and what you hoped would happen. Markdown formatting works here too.',
            xPercent: 26,
            yPercent: 65,
          },
          {
            number: 6,
            label: 'Optional: pick Assignees and Labels on the right',
            description:
              'Choose Assignees (who will work on it) and Labels (colored tags like bug, documentation, or good first issue) if you want.',
            xPercent: 72,
            yPercent: 54,
          },
          {
            number: 7,
            label: 'Click "Submit new issue"',
            description:
              'When your title and details look clear, click the green Submit new issue button to post it for the whole team.',
            xPercent: 35,
            yPercent: 82,
            screenshot: {
              id: 'l9-example-new-issue',
              src: '/assets/aistudio/L9-example-new-issue-clean_ae1668ea.png',
              alt: 'Example GitHub New issue form showing title box, description box, Assignees, Labels, and Submit new issue button',
              caption:
                "Example illustration: GitHub's real screen may look slightly different. Fill in the title and description (Steps 4–5), optionally pick Assignees and Labels (Step 6), then click Submit new issue (Step 7).",
              markers: [
                {
                  n: 1,
                  x: 5.8,
                  y: 11.6,
                  w: 63.3,
                  h: 7.7,
                  label: 'Title: say what is wrong or wanted in one line',
                },
                {
                  n: 2,
                  x: 5.8,
                  y: 29.0,
                  w: 63.3,
                  h: 41.9,
                  label: 'Description: explain what you saw and what you expected',
                },
                {
                  n: 3,
                  x: 72.7,
                  y: 7.4,
                  w: 21.5,
                  h: 9.4,
                  label: 'Assignees: who will work on it',
                },
                {
                  n: 4,
                  x: 72.7,
                  y: 23.5,
                  w: 21.5,
                  h: 9.4,
                  label: 'Labels: tags like bug or documentation',
                },
                {
                  n: 5,
                  x: 49.2,
                  y: 75.8,
                  w: 20.0,
                  h: 7.7,
                  label: 'Submit new issue: click to post it',
                },
              ],
            },
          },
          {
            number: 8,
            label: 'Click "Close issue" when fixed (or "Reopen issue" if needed)',
            description:
              'When the problem is fixed or finished, open the issue and click Close issue at the bottom. If you closed it by mistake, click Reopen issue.',
            xPercent: 76,
            yPercent: 82,
          },
        ],
      },
      tip: {
        eyebrow: 'Tip',
        title: 'Close an issue automatically from a pull request',
        text: 'In a pull request description you can write "Closes #3" and GitHub closes issue number 3 automatically when the pull request is merged.',
        codeSnippet: 'Closes #3',
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two mistakes beginners make with issues',
        text: 'Watch out for these two mix-ups when writing an issue:',
        items: [
          {
            title: '1. A vague title like "It doesn\'t work"',
            text: 'Always say what is broken and where you saw it, such as "Add file button is hard to see on mobile".',
          },
          {
            title: '2. Mixing up issues and pull requests',
            text: 'An issue is a conversation about a problem, idea, or question. A pull request is the actual file change ready to review and merge.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l9-q1',
        eyebrow: 'Question 1 of 3',
        questionPrefix: 'What is an issue?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'A set of changes to merge',
            isCorrect: false,
            feedback:
              'Not quite. A set of changes ready to review and merge is a pull request, not an issue.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'A note about a problem, idea, or question',
            isCorrect: true,
            feedback:
              "Correct! An issue is a note in your project's to-do list for a problem to fix, an idea to try, or a question to ask.",
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'A copy of the project',
            isCorrect: false,
            feedback:
              'Incorrect. A copy of a project is a branch or a fork, not an issue.',
          },
        ],
      },
      {
        id: 'l9-q2',
        eyebrow: 'Question 2 of 3',
        questionPrefix: 'Which button starts a new issue?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Compare & pull request',
            isCorrect: false,
            feedback:
              'Not quite. Compare & pull request starts a pull request from a branch, not a new issue.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'New issue',
            isCorrect: true,
            feedback:
              'Correct! Click the green New issue button in the Issues tab to write a new note.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Add file',
            isCorrect: false,
            feedback:
              'Incorrect. Add file creates or uploads a file in the Code tab, not an issue.',
          },
        ],
      },
      {
        id: 'l9-q3',
        eyebrow: 'Question 3 of 3',
        questionPrefix: 'What does a "bug" label mean?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Something is not working correctly',
            isCorrect: true,
            feedback:
              'Correct! A bug label tells teammates that something in the project is broken or not working as expected.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'A new feature idea',
            isCorrect: false,
            feedback:
              'Not quite. New ideas usually get a label like enhancement, while bug means something is broken.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'The project is finished',
            isCorrect: false,
            feedback:
              'Incorrect. A bug label marks a problem to fix—when it is fixed, the issue is Closed.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 9 Complete',
      title: 'You know how Issues work!',
      description:
        'You learned how to browse Open and Closed issues, write a clear title and description, add labels and assignees, and close or reopen an issue.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 9 completed',
      nextUpPrefix: 'Coming soon in Level 2: ',
      nextUpTitle: 'Merge and conflicts',
      nextUpDuration: 'Next lesson',
    },
  },
  {
    id: 'merge-and-conflicts',
    slug: 'merge-and-conflicts',
    levelId: 'level-2',
    comingSoon: true,
    cardTitle: 'Merge and conflicts',
    cardDescription:
      'Combine branches cleanly into main and fix overlapping line edits without panic.',
    readTime: 'Coming soon',
  },

  // =========================================================================
  // LEVEL 3: Every tab explained
  // =========================================================================
  {
    id: 'tabs-at-a-glance',
    slug: 'tabs-at-a-glance',
    levelId: 'level-3',
    unlockWithLevel: true,
    kind: 'concept',
    cardTitle: 'Tabs at a glance',
    cardDescription:
      'See what each tab at the top of a repository opens, and learn why clicking is always safe.',
    readTime: '3 min read',
    meta: 'Lesson 11 · Level 3 · 3 min read',
    titleStart: '',
    titleHighlight: 'Tabs',
    titleEnd: ' at a glance',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Every repository has a row of tabs at the top. See what each tab opens so you never feel lost.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/alex-dev/my-first-project',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: '4 commits',
      branchName: 'main',
      branchCount: '1 branch',
      addFileLabel: 'Add file',
      emptyTitle: 'Ten doors along the top bar',
      emptyDescription:
        'Each tab opens a different room of your project—and looking is always safe.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'Ten doors in a row',
        paragraphs: [
          'A school building has ten doors in a row. Each door leads to a different room: a library, a notice board, a workshop.',
          'You can open any door just to look inside without moving or breaking anything in the room.',
          'The row of tabs at the top of every repository works the same way.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Tab',
        meaning:
          'Tabs are the menu at the top of a repository. Each tab opens a different area of your project.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'How the tabs are grouped',
        subtitle: 'Each tab opens a different room inside your repository.',
        variant: 'repo-box',
        nodes: [
          {
            label: 'Files & changes',
            sublabel: 'Code, Issues, Pull requests',
            tone: 'neutral',
          },
          {
            label: 'Plans, guides & helpers',
            sublabel: 'Projects, Wiki, Agents',
            tone: 'primary',
          },
          {
            label: 'Checks, charts & setup',
            sublabel: 'Actions, Security and quality, Insights, Settings',
            tone: 'secondary',
          },
        ],
        caption:
          'Looking is always safe: clicking a tab only shows you that page and never changes your files.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'Look at the row of tabs under the repository name',
        subtitle:
          'Look at the row of tabs under the repository name and click each one. Looking is always safe, because you cannot break anything by clicking tabs.',
        windowUrl: 'github.com/alex-dev/my-first-project',
        screenType: 'repo-page',
        markers: [
          {
            number: 1,
            label: 'Code',
            description: 'Your files, folders, and branches.',
            xPercent: 3.5,
            yPercent: 9.5,
          },
          {
            number: 2,
            label: 'Issues',
            description: 'To-do notes, problems, and ideas.',
            xPercent: 9,
            yPercent: 9.5,
          },
          {
            number: 3,
            label: 'Pull requests',
            description: 'Proposed changes waiting for review.',
            xPercent: 16,
            yPercent: 9.5,
          },
          {
            number: 4,
            label: 'Agents',
            description: 'AI helpers that can work on tasks (may need a paid plan).',
            xPercent: 23,
            yPercent: 9.5,
          },
          {
            number: 5,
            label: 'Actions',
            description: 'Automatic tasks that run when something changes.',
            xPercent: 29,
            yPercent: 9.5,
          },
          {
            number: 6,
            label: 'Projects',
            description: 'A planning board for your work.',
            xPercent: 36,
            yPercent: 9.5,
          },
          {
            number: 7,
            label: 'Wiki',
            description: 'Written guides for your project.',
            xPercent: 41.5,
            yPercent: 9.5,
          },
          {
            number: 8,
            label: 'Security and quality',
            description: 'Safety checks and warnings.',
            xPercent: 49.5,
            yPercent: 9.5,
          },
          {
            number: 9,
            label: 'Insights',
            description: 'Charts about activity in your project.',
            xPercent: 58.5,
            yPercent: 9.5,
          },
          {
            number: 10,
            label: 'Settings',
            description: 'Change how the repository works (owners and admins only).',
            xPercent: 65,
            yPercent: 9.5,
          },
        ],
        screenshots: [
          {
            id: 'l3-tabs-at-a-glance-bar',
            src: '/assets/aistudio/L4-repository-code-tab-clean_f13431ee.png',
            alt: 'GitHub repository page showing all ten navigation tabs at the top: Code, Issues, Pull requests, Agents, Actions, Projects, Wiki, Security and quality, Insights, and Settings',
            caption:
              'Real screenshot. GitHub may change this page. Look at the row of tabs under the repository name and click each one—looking is always safe.',
            markers: [
              {
                n: 1,
                x: 1.3,
                y: 7.4,
                w: 4.4,
                h: 4.2,
                label: 'Code: your files, folders, and branches',
              },
              {
                n: 2,
                x: 6.6,
                y: 7.4,
                w: 4.7,
                h: 4.2,
                label: 'Issues: to-do notes, problems, and ideas',
              },
              {
                n: 3,
                x: 12.3,
                y: 7.4,
                w: 7.4,
                h: 4.2,
                label: 'Pull requests: proposed changes waiting for review',
              },
              {
                n: 4,
                x: 20.7,
                y: 7.4,
                w: 5.2,
                h: 4.2,
                label: 'Agents: AI helpers that can work on tasks (may need a paid plan)',
              },
              {
                n: 5,
                x: 26.8,
                y: 7.4,
                w: 5.3,
                h: 4.2,
                label: 'Actions: automatic tasks that run when something changes',
              },
              {
                n: 6,
                x: 33.1,
                y: 7.4,
                w: 5.5,
                h: 4.2,
                label: 'Projects: a planning board for your work',
              },
              {
                n: 7,
                x: 39.6,
                y: 7.4,
                w: 4.0,
                h: 4.2,
                label: 'Wiki: written guides for your project',
              },
              {
                n: 8,
                x: 44.6,
                y: 7.4,
                w: 10.4,
                h: 4.2,
                label: 'Security and quality: safety checks and warnings',
              },
              {
                n: 9,
                x: 56.0,
                y: 7.4,
                w: 5.5,
                h: 4.2,
                label: 'Insights: charts about activity in your project',
              },
              {
                n: 10,
                x: 62.4,
                y: 7.4,
                w: 5.6,
                h: 4.2,
                label: 'Settings: change how the repository works (owners and admins only)',
              },
            ],
          },
        ],
      },
      commonMistake: {
        eyebrow: 'Common mistake',
        title: 'Thinking a missing tab means something is broken',
        text: 'Not every tab shows for every person or project. Settings only appears for owners and admins, and an owner can turn Issues, Wikis, and Projects off.',
      },
    },
    quizzes: [
      {
        id: 'l11-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'Which tab holds your files?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Code',
            isCorrect: true,
            feedback:
              'Correct! The Code tab holds all your files, folders, and branches.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Wiki',
            isCorrect: false,
            feedback:
              'Not quite. Wiki holds written project guides, while your files live in the Code tab.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Insights',
            isCorrect: false,
            feedback:
              'Incorrect. Insights shows charts about project activity, while your files live in the Code tab.',
          },
        ],
      },
      {
        id: 'l11-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'Who can see the Settings tab?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Only owners and admins',
            isCorrect: true,
            feedback:
              'Correct! Only repository owners and admins see the Settings tab so visitors cannot change project rules.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Everyone',
            isCorrect: false,
            feedback:
              'Not quite. Visitors do not see Settings—only owners and admins can see and change it.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Only people who forked the project',
            isCorrect: false,
            feedback:
              'Incorrect. Forking gives someone their own copy, while Settings on a repository only shows for its owners and admins.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 11 Complete',
      title: 'You know what every tab opens!',
      description:
        'You now know what each tab in the repository menu does, that clicking tabs is always safe, and why some tabs only show for owners or enabled features.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 11 completed',
      nextUpPrefix: 'Coming soon in Level 3: ',
      nextUpTitle: 'Actions tab',
      nextUpDuration: 'Coming soon',
    },
  },
  {
    id: 'actions-tab',
    slug: 'actions-tab',
    levelId: 'level-3',
    unlockWithLevel: true,
    kind: 'concept',
    cardTitle: 'Actions tab',
    cardDescription:
      'Watch automatic tasks run checks and jobs whenever something changes in your repository.',
    readTime: '3 min read',
    meta: 'Lesson 12 · Level 3 · 3 min read',
    titleStart: 'What is the ',
    titleHighlight: 'Actions',
    titleEnd: ' Tab?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'See how GitHub Actions runs helpful checks for you automatically whenever your repository changes.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/alex-dev/my-first-project/actions',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: '3 workflow runs',
      branchName: 'main',
      branchCount: 'Actions tab',
      addFileLabel: 'New workflow',
      emptyTitle: 'Automatic checks after every change',
      emptyDescription:
        'Add a workflow once and GitHub runs it automatically every time a new commit arrives.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'A school bell that rings by itself',
        paragraphs: [
          'Think of a school bell that rings by itself. Nobody presses it. When the time comes, it rings.',
          'GitHub Actions are little robots that do jobs automatically when something happens in your project, like checking your code every time you save a change.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'GitHub Actions',
        meaning:
          'GitHub Actions runs tasks for you automatically when something happens in your repository, such as a new commit.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'How an automatic run happens',
        subtitle: 'One change sets the whole workflow in motion.',
        variant: 'repo-box',
        nodes: [
          {
            label: '1. Something happens',
            sublabel: 'You save a new commit or open a pull request.',
            tone: 'neutral',
          },
          {
            label: '2. A workflow runs',
            sublabel: 'GitHub Actions follows the steps saved in your workflow file.',
            tone: 'primary',
          },
          {
            label: '3. You see the result',
            sublabel: 'Green check means passed, red cross means failed, yellow circle means running.',
            tone: 'secondary',
          },
        ],
        caption:
          'Each time a workflow starts, GitHub lists it as a new run in the Actions tab.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to start and read a workflow run',
        subtitle:
          'Follow steps 1 to 5 to add a ready-made workflow and check whether your runs passed or failed.',
        windowUrl: 'github.com/alex-dev/my-first-project/actions',
        screenType: 'repo-page',
        markers: [
          {
            number: 1,
            label: 'Click the Actions tab',
            description: 'Open your repository and click the Actions tab near the top.',
            xPercent: 36,
            yPercent: 12,
          },
          {
            number: 2,
            label: 'Click New workflow to see ready-made automatic tasks',
            description: 'Browse the suggested workflows ready to run on your project.',
            xPercent: 14,
            yPercent: 28,
          },
          {
            number: 3,
            label: 'Pick one, click Configure, then Commit changes',
            description: 'A small workflow file is added to your project.',
            xPercent: 29,
            yPercent: 45,
          },
          {
            number: 4,
            label: 'Watch a run appear each time you save a change',
            description: 'From then on, each time you save a change, a run appears in the list.',
            xPercent: 29,
            yPercent: 64,
          },
          {
            number: 5,
            label: 'Read the icons and click a run for details',
            description:
              'Green check means passed, red cross means failed, yellow circle means still running. Click a run to read the details.',
            xPercent: 50,
            yPercent: 45,
          },
        ],
        screenshots: [
          {
            id: 'l3-tab-example-actions',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_TAB-example-actions_30acc070.png',
            alt: 'Example GitHub Actions tab showing New workflow button, a passed run with a green check, a failed run with a red cross, and a running workflow',
            caption:
              "Example illustration: GitHub's real screen may look slightly different. Click New workflow to add a task, then read the status icons on each run.",
            markers: [
              {
                n: 1,
                x: 32.9,
                y: 8.0,
                w: 6.6,
                h: 8.4,
                label: 'Actions tab: where automatic tasks live',
              },
              {
                n: 2,
                x: 5.8,
                y: 24.8,
                w: 16.7,
                h: 8.0,
                label: 'New workflow: pick a ready-made automatic task',
              },
              {
                n: 3,
                x: 28.3,
                y: 41.6,
                w: 2.7,
                h: 6.4,
                label: 'Green check: the run passed',
              },
              {
                n: 4,
                x: 28.3,
                y: 60.8,
                w: 2.7,
                h: 6.4,
                label: 'Red cross: the run failed. Click it to see why',
              },
              {
                n: 5,
                x: 31.8,
                y: 38.8,
                w: 38.2,
                h: 11.6,
                label: 'Run name: click to read the details',
              },
            ],
          },
        ],
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two mistakes beginners make with Actions',
        text: 'Keep these two points in mind when using GitHub Actions:',
        items: [
          {
            title: '1. Panicking at a red cross',
            text: 'It only means a check failed, so click it and read the message.',
          },
          {
            title: '2. Adding workflows you do not understand',
            text: 'Start with the suggested ones so you know what each step is checking.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l12-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'What does a green check mean?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'The run passed',
            isCorrect: true,
            feedback:
              'Correct! A green check means every step in the workflow run passed without errors.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'The run is waiting',
            isCorrect: false,
            feedback:
              'Not quite. A yellow circle means a run is still in progress or waiting, while a green check means it passed.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'The run was deleted',
            isCorrect: false,
            feedback:
              'Incorrect. A green check shows that the workflow run finished and passed.',
          },
        ],
      },
      {
        id: 'l12-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'What starts a run?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Something happening in the repository, like a new commit',
            isCorrect: true,
            feedback:
              'Correct! A run starts automatically when something happens in your repository, such as saving a new commit.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Only you pressing a button',
            isCorrect: false,
            feedback:
              'Not quite. GitHub Actions runs automatically on events like a new commit—you do not have to press a button every time.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Only a certain day of the week',
            isCorrect: false,
            feedback:
              'Incorrect. Most workflows run right away whenever a commit or pull request happens in the repository.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 12 Complete',
      title: 'You know how the Actions tab works!',
      description:
        'You now know how GitHub Actions runs workflows automatically after changes and what the green check, red cross, and yellow circle icons mean.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 12 completed',
      nextUpPrefix: 'Next in Level 3: ',
      nextUpTitle: 'Projects tab',
      nextUpDuration: '3 min read',
    },
  },
  {
    id: 'projects-tab',
    slug: 'projects-tab',
    levelId: 'level-3',
    unlockWithLevel: true,
    kind: 'concept',
    cardTitle: 'Projects tab',
    cardDescription:
      'Track tasks as cards that move across Todo, In progress, and Done columns.',
    readTime: '3 min read',
    meta: 'Lesson 13 · Level 3 · 3 min read',
    titleStart: 'What is the ',
    titleHighlight: 'Projects',
    titleEnd: ' Tab?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Plan your work on a simple board where each task is a card you drag from Todo to Done.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/alex-dev/my-first-project/projects',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: '3 columns',
      branchName: 'main',
      branchCount: 'Projects tab',
      addFileLabel: 'New project',
      emptyTitle: 'Todo · In progress · Done',
      emptyDescription:
        'Move task cards across columns so everyone can see what is waiting, underway, or finished.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'Sticky notes in three columns',
        paragraphs: [
          'Imagine sticky notes on a wall in three columns: To do, Doing, Done.',
          'Each note holds one task. You move each note to the next column as the work moves forward.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Project',
        meaning:
          'A project is a planning board where you track work, often issues, as cards that move across columns.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'Three columns on a project board',
        subtitle: 'Drag each card from left to right as work moves forward.',
        variant: 'repo-box',
        nodes: [
          {
            label: 'Todo',
            sublabel: 'Tasks waiting to be started.',
            tone: 'neutral',
          },
          {
            label: 'In progress',
            sublabel: 'Cards someone is working on right now.',
            tone: 'primary',
          },
          {
            label: 'Done',
            sublabel: 'Finished tasks moved here when complete.',
            tone: 'secondary',
          },
        ],
        caption:
          'You can also switch between Board, Table, and Roadmap views to see the same tasks in different ways.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to make a board and move cards',
        subtitle:
          'Follow steps 1 to 5 to create a planning board, add tasks, and drag cards between columns.',
        windowUrl: 'github.com/alex-dev/my-first-project/projects',
        screenType: 'repo-page',
        markers: [
          {
            number: 1,
            label: 'Click the Projects tab, or use the plus menu and New project',
            description:
              'Open Projects from your repository tabs or click the + menu at the top right and choose New project.',
            xPercent: 43,
            yPercent: 11,
          },
          {
            number: 2,
            label: 'Click New project and choose Board',
            description: 'Pick Board to see your tasks laid out in columns.',
            xPercent: 15,
            yPercent: 33,
          },
          {
            number: 3,
            label: 'Use the columns Todo, In progress, and Done',
            description: 'You get the columns Todo, In progress, and Done ready to fill.',
            xPercent: 20,
            yPercent: 45,
          },
          {
            number: 4,
            label: 'Click Add item and type a task, or add an existing issue',
            description: 'Add a quick note directly or connect an issue from your repository.',
            xPercent: 20,
            yPercent: 84,
          },
          {
            number: 5,
            label: 'Drag a card to another column when its status changes',
            description:
              'Drag a card across columns as work moves. Use Table or Roadmap for other views.',
            xPercent: 20,
            yPercent: 57,
          },
        ],
        screenshots: [
          {
            id: 'l3-tab-example-projects',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_TAB-example-projects_08732740.png',
            alt: 'Example GitHub Projects tab showing Board, Table, and Roadmap views, Todo, In progress, and Done columns, task cards, and Add item button',
            caption:
              "Example illustration: GitHub's real screen may look slightly different. Click Add item to add a task, then drag cards across columns as status changes.",
            markers: [
              {
                n: 1,
                x: 39.6,
                y: 7.1,
                w: 6.9,
                h: 7.5,
                label: 'Projects tab: your planning boards',
              },
              {
                n: 2,
                x: 5.0,
                y: 28.9,
                w: 20.8,
                h: 7.9,
                label: 'Views: switch between Board, Table, and Roadmap',
              },
              {
                n: 3,
                x: 6.5,
                y: 42.1,
                w: 26.2,
                h: 5.7,
                label: 'Column: Todo, In progress, or Done',
              },
              {
                n: 4,
                x: 6.7,
                y: 50.0,
                w: 25.8,
                h: 14.3,
                label: 'Card: one task. Drag it to another column when it changes',
              },
              {
                n: 5,
                x: 7.0,
                y: 80.7,
                w: 25.2,
                h: 6.8,
                label: 'Add item: type a task or add an existing issue',
              },
            ],
          },
        ],
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two mistakes beginners make with project boards',
        text: 'Keep your board clear and useful by avoiding these habits:',
        items: [
          {
            title: '1. Putting everything in Todo and never moving cards',
            text: 'Drag cards into In progress and Done as you work so the board stays true.',
          },
          {
            title: '2. Having too many cards In progress',
            text: 'Keep it to a few tasks at once so it is easy to finish what you started.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l13-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'What is a project board for?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Planning and tracking work',
            isCorrect: true,
            feedback:
              'Correct! A project board helps you plan tasks and track them as cards across columns.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Storing files',
            isCorrect: false,
            feedback:
              'Not quite. Your files live in the Code tab, while a project board tracks tasks and plans.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Running automatic tasks',
            isCorrect: false,
            feedback:
              'Incorrect. Automatic tasks run in the Actions tab, while Projects is a board for planning work.',
          },
        ],
      },
      {
        id: 'l13-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'How do you show a task is finished?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Drag its card to Done',
            isCorrect: true,
            feedback:
              'Correct! Dragging a card into the Done column shows everyone the task is finished.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Delete the project',
            isCorrect: false,
            feedback:
              'Not quite. Never delete the whole board—just drag that finished card into Done.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Fork the repository',
            isCorrect: false,
            feedback:
              'Incorrect. Forking copies someone else’s repository; dragging the card to Done marks a task finished.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 13 Complete',
      title: 'You know how the Projects tab works!',
      description:
        'You now know how to start a project board, add tasks or issues as cards, and move them across Todo, In progress, and Done.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 13 completed',
      nextUpPrefix: 'Next in Level 3: ',
      nextUpTitle: 'Wiki tab',
      nextUpDuration: '3 min read',
    },
  },
  {
    id: 'wiki-tab',
    slug: 'wiki-tab',
    levelId: 'level-3',
    unlockWithLevel: true,
    kind: 'concept',
    cardTitle: 'Wiki tab',
    cardDescription:
      'Keep longer guides and notes in a separate booklet of pages for your project.',
    readTime: '3 min read',
    meta: 'Lesson 14 · Level 3 · 3 min read',
    titleStart: 'What is the ',
    titleHighlight: 'Wiki',
    titleEnd: ' Tab?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Give your project its own instruction booklet with helpful pages kept separate from your files.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/alex-dev/my-first-project/wiki',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: '1 wiki page',
      branchName: 'main',
      branchCount: 'Wiki tab',
      addFileLabel: 'New page',
      emptyTitle: 'Welcome to the project wiki',
      emptyDescription:
        'Write guides, rules, and helpful notes in pages stored separately from your repository files.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'The instruction booklet in the game box',
        paragraphs: [
          'Think of the instruction booklet kept inside a board game box, with rules and tips written by the people who play.',
          'Whenever someone wants to look up a rule or read extra tips, they open that booklet instead of digging through the game pieces.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Wiki',
        meaning:
          "A wiki is a set of written pages for your project's guides and notes. It is kept separate from your files.",
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'README vs. Wiki pages',
        subtitle: 'Each place holds a different level of project notes.',
        variant: 'repo-box',
        nodes: [
          {
            label: 'Code tab (Files & README)',
            sublabel: 'Holds your project files and the quick welcome README.',
            tone: 'neutral',
          },
          {
            label: 'Wiki tab (Booklet)',
            sublabel: 'Holds longer guides and notes kept separate from your files.',
            tone: 'primary',
          },
          {
            label: 'Side page list',
            sublabel: 'Every new wiki page appears in a neat list on the side.',
            tone: 'secondary',
          },
        ],
        caption:
          'Keep your quick start steps in README, and use the Wiki when you have several longer pages.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to start and add wiki pages',
        subtitle:
          'Follow steps 1 to 5 to open the Wiki tab and write your first guide page.',
        windowUrl: 'github.com/alex-dev/my-first-project/wiki',
        screenType: 'repo-page',
        markers: [
          {
            number: 1,
            label: 'Click the Wiki tab',
            description: 'Open your repository and click Wiki in the row of tabs at the top.',
            xPercent: 49,
            yPercent: 13,
          },
          {
            number: 2,
            label: 'Click Create the first page',
            description: 'When the wiki is empty, click the green Create the first page button.',
            xPercent: 50,
            yPercent: 75,
          },
          {
            number: 3,
            label: 'Type a title and your text',
            description: 'Write a clear page title and your notes. Markdown works here.',
            xPercent: 50,
            yPercent: 50,
          },
          {
            number: 4,
            label: 'Click Save page',
            description: 'Save the page so teammates and visitors can read it.',
            xPercent: 50,
            yPercent: 80,
          },
          {
            number: 5,
            label: 'Add more pages',
            description: 'Add more pages anytime—they appear in a list on the side.',
            xPercent: 78,
            yPercent: 50,
          },
        ],
        screenshots: [
          {
            id: 'l3-tab-example-wiki',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_TAB-example-wiki_513c88a8.png',
            alt: 'Example GitHub Wiki tab showing the Wiki tab highlighted, welcome message, and green Create the first page button',
            caption:
              "Example illustration: GitHub's real screen may look slightly different. Click Create the first page to write your first guide.",
            markers: [
              {
                n: 1,
                x: 46.8,
                y: 8.7,
                w: 4.6,
                h: 9.1,
                label: 'Wiki tab: written guides for your project',
              },
              {
                n: 2,
                x: 24.1,
                y: 40.4,
                w: 51.7,
                h: 22.6,
                label: 'Welcome message: the wiki is empty until you add a page',
              },
              {
                n: 3,
                x: 40.0,
                y: 69.6,
                w: 20.0,
                h: 10.4,
                label: 'Create the first page: click to start writing',
              },
            ],
          },
        ],
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two mistakes beginners make with wikis',
        text: 'Keep these two reminders in mind when writing guides:',
        items: [
          {
            title: '1. Putting the most important steps only in the wiki',
            text: 'The README is the first thing people read, so always keep basic setup steps there.',
          },
          {
            title: '2. Looking for wiki pages in the file list',
            text: 'They are stored separately from your repository files—open the Wiki tab to read them.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l14-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'What is a wiki for?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Written guides for your project',
            isCorrect: true,
            feedback:
              'Correct! A wiki gives you a place for written guides, rules, and notes for your project.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Saving images only',
            isCorrect: false,
            feedback:
              'Not quite. Wiki pages are for written guides and notes (formatted with Markdown), not just images.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Running tests',
            isCorrect: false,
            feedback:
              'Incorrect. Automated tests run in the Actions tab, while the Wiki tab holds written project guides.',
          },
        ],
      },
      {
        id: 'l14-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'Where can an owner turn the Wiki tab on or off?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Settings, under Features',
            isCorrect: true,
            feedback:
              'Correct! Repository owners can turn the Wiki tab on or off inside Settings, under Features.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'The Issues tab',
            isCorrect: false,
            feedback:
              'Not quite. The Issues tab is for tasks and questions—turning tabs on or off lives in Settings, under Features.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'The Code tab',
            isCorrect: false,
            feedback:
              'Incorrect. The Code tab shows your files, while tab visibility controls live in Settings, under Features.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 14 Complete',
      title: 'You know how the Wiki tab works!',
      description:
        'You now know how to create and save wiki pages using Markdown, and why wiki pages live separately from your Code tab file list.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 14 completed',
      nextUpPrefix: 'Coming soon in Level 3: ',
      nextUpTitle: 'Security and quality tab',
      nextUpDuration: 'Coming soon',
    },
  },
  {
    id: 'security-and-quality-tab',
    slug: 'security-and-quality-tab',
    levelId: 'level-3',
    unlockWithLevel: true,
    kind: 'concept',
    cardTitle: 'Security and quality tab',
    cardDescription:
      'See safety checks, Dependabot warnings, and secret alerts that protect your project.',
    readTime: '3 min read',
    meta: 'Lesson 15 · Level 3 · 3 min read',
    titleStart: 'What is the ',
    titleHighlight: 'Security and quality',
    titleEnd: ' Tab?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Check locks, safety alarms, and warnings that help keep your project and passwords safe.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/alex-dev/my-first-project/security',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: 'Overview',
      branchName: 'main',
      branchCount: 'Security and quality',
      addFileLabel: 'Security policy',
      emptyTitle: 'Locks and smoke alarms for your repository',
      emptyDescription:
        'Check Dependabot alerts, Secret scanning, and your Security policy in one place.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'Locks, smoke alarms, and an emergency sign',
        paragraphs: [
          'A building has locks, smoke alarms, and a sign saying who to call if something goes wrong.',
          'This tab holds the same safety tools for your project so problems are spotted early.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Security and quality tab',
        meaning:
          'This tab shows safety checks for your project and warns you about problems.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'Safety checks inside Security and quality',
        subtitle: 'Each line in the Overview checks a different kind of risk.',
        variant: 'repo-box',
        nodes: [
          {
            label: 'Dependabot alerts',
            sublabel: 'Warns when a tool your project uses has a known problem.',
            tone: 'neutral',
          },
          {
            label: 'Secret scanning',
            sublabel: 'Warns if a password or key is uploaded by mistake.',
            tone: 'primary',
          },
          {
            label: 'Security policy & Code scanning',
            sublabel: 'Tells people how to report problems, plus optional code checks.',
            tone: 'secondary',
          },
        ],
        caption:
          'Each line shows Enabled, Disabled, or Needs setup so you know right away what is turned on.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to read the Security Overview',
        subtitle:
          'Follow steps 1 to 5 to check your safety status, turn on Dependabot alerts, and spot secret warnings.',
        windowUrl: 'github.com/alex-dev/my-first-project/security',
        screenType: 'repo-page',
        markers: [
          {
            number: 1,
            label: 'Click Security and quality',
            description: 'Open your repository and click Security and quality in the top tab row.',
            xPercent: 58,
            yPercent: 9,
          },
          {
            number: 2,
            label: 'Read the Overview',
            description: 'Each line shows Enabled, Disabled, or Needs setup.',
            xPercent: 50,
            yPercent: 37,
          },
          {
            number: 3,
            label: 'Turn on Dependabot alerts',
            description:
              'It warns you when a tool your project uses has a known problem.',
            xPercent: 50,
            yPercent: 70,
          },
          {
            number: 4,
            label: 'Check Secret scanning',
            description:
              'Secret scanning warns you if a password or key is uploaded by mistake.',
            xPercent: 50,
            yPercent: 91,
          },
          {
            number: 5,
            label: 'Review Security policy and optional Code scanning',
            description:
              'Security policy tells people how to report a problem. Code scanning checks for common coding mistakes and needs setup, so it is optional for beginners.',
            xPercent: 50,
            yPercent: 80,
          },
        ],
        screenshots: [
          {
            id: 'l3-tab-example-security',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_TAB-example-security_d08ba4dd.png',
            alt: 'Example GitHub Security and quality tab showing Overview rows for Security policy, Dependabot alerts, Code scanning, and Secret scanning',
            caption:
              "Example illustration: GitHub's real screen may look slightly different. Check each row to see whether it is Enabled, Disabled, or Needs setup.",
            markers: [
              {
                n: 1,
                x: 51.6,
                y: 5.8,
                w: 14.1,
                h: 6.1,
                label: 'Security and quality tab: safety checks and warnings',
              },
              {
                n: 2,
                x: 28.0,
                y: 64.9,
                w: 65.7,
                h: 9.9,
                label: 'Dependabot alerts: warns about problems in tools your project uses',
              },
              {
                n: 3,
                x: 28.0,
                y: 75.9,
                w: 65.7,
                h: 9.9,
                label: 'Code scanning: automatic check for coding mistakes (needs setup)',
              },
              {
                n: 4,
                x: 28.0,
                y: 87.0,
                w: 65.7,
                h: 9.9,
                label: 'Secret scanning: warns if a password or key is uploaded by mistake',
              },
              {
                n: 5,
                x: 28.0,
                y: 31.9,
                w: 65.7,
                h: 9.9,
                label: 'Security policy: tells people how to report a problem',
              },
            ],
          },
        ],
      },
      tip: {
        eyebrow: 'Important tip',
        title: 'Never put passwords, API keys, or tokens in your files',
        text: 'Never put passwords, API keys, or tokens in your files. If you did, change them right away, because deleting the file does not remove them from the history.',
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two mistakes beginners make with security',
        text: 'Watch out for these two mistakes:',
        items: [
          {
            title: '1. Ignoring alerts',
            text: 'Read alerts when they show up so small risks stay easy to fix.',
          },
          {
            title: '2. Thinking a deleted password is safe again',
            text: 'Old commits stay in your history, so you must change the password or key right away.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l15-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'Which feature warns you if a password is uploaded by mistake?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Secret scanning',
            isCorrect: true,
            feedback:
              'Correct! Secret scanning watches for passwords, API keys, and tokens and warns you if one is uploaded.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Wiki',
            isCorrect: false,
            feedback:
              'Not quite. Wiki holds project guides, while Secret scanning warns if a password is uploaded.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Projects',
            isCorrect: false,
            feedback:
              'Incorrect. Projects is a planning board, while Secret scanning protects against leaked passwords.',
          },
        ],
      },
      {
        id: 'l15-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'What does Needs setup mean?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'It is broken',
            isCorrect: false,
            feedback:
              'Not quite. Nothing is broken—it just has not been turned on yet.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'You must turn it on first',
            isCorrect: true,
            feedback:
              'Correct! Needs setup means that check is ready whenever you choose to set it up and turn it on.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'It found a problem',
            isCorrect: false,
            feedback:
              'Incorrect. Needs setup only means you have not configured or enabled that check yet.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 15 Complete',
      title: 'You know how Security and quality works!',
      description:
        'You now know how Dependabot alerts, Secret scanning, Code scanning, and Security policy work—and why passwords never belong in repository files.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 15 completed',
      nextUpPrefix: 'Next in Level 3: ',
      nextUpTitle: 'Insights tab',
      nextUpDuration: '3 min read',
    },
  },
  {
    id: 'insights-tab',
    slug: 'insights-tab',
    levelId: 'level-3',
    unlockWithLevel: true,
    kind: 'concept',
    cardTitle: 'Insights tab',
    cardDescription:
      'See simple charts and numbers about activity, visits, and contributors in your project.',
    readTime: '3 min read',
    meta: 'Lesson 16 · Level 3 · 3 min read',
    titleStart: 'What is the ',
    titleHighlight: 'Insights',
    titleEnd: ' Tab?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Check charts, weekly summaries, and visitor counts to see how your project is growing.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/alex-dev/my-first-project/pulse',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: 'Pulse · 1 week',
      branchName: 'main',
      branchCount: 'Insights tab',
      addFileLabel: 'Period: 1 week',
      emptyTitle: 'A weekly report card for your project',
      emptyDescription:
        'View Pulse, Contributors, Traffic, Commits, Network, and Forks in the left menu.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'A school report card for your project',
        paragraphs: [
          'Think of a school report card for your project, with clear numbers about what happened this week.',
          'At a glance you can see how many changes landed, who helped, and how many visitors stopped by.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Insights',
        meaning:
          'Insights shows charts and numbers about activity in your project.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'What the Insights menu shows',
        subtitle: 'Pick a page on the left to view a different kind of activity.',
        variant: 'repo-box',
        nodes: [
          {
            label: 'Pulse',
            sublabel: 'A one-week summary of pull requests, issues, and commits.',
            tone: 'neutral',
          },
          {
            label: 'Contributors & Commits',
            sublabel: 'Who changed what, plus Commits and Code frequency over time.',
            tone: 'primary',
          },
          {
            label: 'Traffic, Network & Forks',
            sublabel: 'Visits and clones over the last 14 days, branch map, and copies.',
            tone: 'secondary',
          },
        ],
        caption:
          'Use the Period menu at the top right of Pulse when you want to look further back.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to read your project charts',
        subtitle:
          'Follow steps 1 to 4 to open Pulse, browse the left menu, and change the time period.',
        windowUrl: 'github.com/alex-dev/my-first-project/pulse',
        screenType: 'repo-page',
        markers: [
          {
            number: 1,
            label: 'Click Insights',
            description: 'Open your repository and click Insights near the right side of the tabs.',
            xPercent: 69,
            yPercent: 10,
          },
          {
            number: 2,
            label: 'Read Pulse for the last week',
            description:
              'The first page, Pulse, summarizes the last week: pull requests, issues, and commits.',
            xPercent: 60,
            yPercent: 55,
          },
          {
            number: 3,
            label: 'Use the menu on the left',
            description:
              'Contributors shows who changed what. Traffic shows visits and clones over the last 14 days. Commits and Code frequency show activity over time. Network is a map of branches. Forks lists copies.',
            xPercent: 15,
            yPercent: 50,
          },
          {
            number: 4,
            label: 'Use the Period menu to look further back',
            description:
              'Click Period at the top right of Pulse to switch between 1 week, 24 hours, 3 days, or 1 month.',
            xPercent: 86,
            yPercent: 23,
          },
        ],
        screenshots: [
          {
            id: 'l3-tab-example-insights',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_TAB-example-insights_1ec95ab2.png',
            alt: 'Example GitHub Insights tab showing Pulse overview numbers, left sidebar menu, Period selector, and weekly Summary',
            caption:
              "Example illustration: GitHub's real screen may look slightly different. Start on Pulse, use the left menu to switch charts, or change the Period.",
            markers: [
              {
                n: 1,
                x: 65.7,
                y: 6.5,
                w: 6.8,
                h: 6.8,
                label: 'Insights tab: charts about your project',
              },
              {
                n: 2,
                x: 5.5,
                y: 18.7,
                w: 19.8,
                h: 65.8,
                label: 'Menu: Pulse, Contributors, Traffic, Commits, and more',
              },
              {
                n: 3,
                x: 78.3,
                y: 19.7,
                w: 15.8,
                h: 6.5,
                label: 'Period: choose how far back to look',
              },
              {
                n: 4,
                x: 27.8,
                y: 49.7,
                w: 66.0,
                h: 10.3,
                label: 'Numbers: merged and open pull requests, closed and new issues',
              },
              {
                n: 5,
                x: 28.3,
                y: 71.3,
                w: 65.0,
                h: 9.4,
                label: 'Summary: how many commits and authors this week',
              },
            ],
          },
        ],
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two mistakes beginners make with Insights',
        text: 'Keep these two things in mind when checking your charts:',
        items: [
          {
            title: '1. Expecting every chart to update instantly',
            text: 'Some charts only update once a day, so brand-new commits may take a little while to show.',
          },
          {
            title: '2. Expecting Traffic to show a long history',
            text: 'Traffic only shows visits and clones from the last 14 days.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l16-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'Which page gives a one-week summary?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Pulse',
            isCorrect: true,
            feedback:
              'Correct! Pulse opens first in Insights and gives a one-week summary of pull requests, issues, and commits.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Forks',
            isCorrect: false,
            feedback:
              'Not quite. Forks lists copies of the repository, while Pulse gives the one-week summary.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Network',
            isCorrect: false,
            feedback:
              'Incorrect. Network draws a map of branches, while Pulse shows the one-week summary.',
          },
        ],
      },
      {
        id: 'l16-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'How far back does Traffic show?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'The last 14 days',
            isCorrect: true,
            feedback:
              'Correct! GitHub Traffic charts show repository visits and clones over the last 14 days.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'One year',
            isCorrect: false,
            feedback:
              'Not quite. GitHub only keeps Traffic numbers for the last 14 days.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Only today',
            isCorrect: false,
            feedback:
              'Incorrect. Traffic covers two full weeks—the last 14 days.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 16 Complete',
      title: 'You know how the Insights tab works!',
      description:
        'You now know how to read your weekly summary in Pulse, switch between Contributors, Traffic, Commits, Network, and Forks, and adjust the Period.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 16 completed',
      nextUpPrefix: 'Next in Level 3: ',
      nextUpTitle: 'Settings tab',
      nextUpDuration: '3 min read',
    },
  },
  {
    id: 'settings-tab',
    slug: 'settings-tab',
    levelId: 'level-3',
    unlockWithLevel: true,
    kind: 'concept',
    cardTitle: 'Settings tab',
    cardDescription:
      'Rename your project, pick your default branch, turn features on or off, and invite collaborators.',
    readTime: '3 min read',
    meta: 'Lesson 17 · Level 3 · 3 min read',
    titleStart: 'What is the ',
    titleHighlight: 'Settings',
    titleEnd: ' Tab?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Manage your repository name, collaborators, enabled tabs, and visibility from the owner office.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/alex-dev/my-first-project/settings',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: 'General',
      branchName: 'main',
      branchCount: 'Settings tab',
      addFileLabel: 'Owners & admins',
      emptyTitle: 'Where owners change how the repository works',
      emptyDescription:
        'Rename the project, invite collaborators, turn tabs on or off, or visit the Danger Zone.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'The main office of the building',
        paragraphs: [
          'Think of the main office of a building, where the owner decides the name on the sign, who can come in, and which rooms are open.',
          'Visitors can walk through the open rooms, while only the owners and admins step into the main office.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Settings',
        meaning:
          'Settings is where the owner changes how the repository works: its name, who can edit, and which features are on. Only owners and admins see it.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'Three areas inside Settings',
        subtitle: 'Only repository owners and admins see these controls.',
        variant: 'repo-box',
        nodes: [
          {
            label: 'General & Features',
            sublabel: 'Rename the repository, set Default branch, and toggle Wikis, Issues, or Projects.',
            tone: 'neutral',
          },
          {
            label: 'Collaborators & Access',
            sublabel: 'Invite people to help edit and choose Public or Private visibility.',
            tone: 'primary',
          },
          {
            label: 'Danger Zone',
            sublabel: 'Big actions at the bottom that are hard to undo, like deleting.',
            tone: 'secondary',
          },
        ],
        caption:
          'Deleting a repository cannot be undone, so GitHub asks you to type its name to confirm.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to use repository Settings',
        subtitle:
          'Follow steps 1 to 6 to rename your repository, check your default branch, toggle features, and spot the Danger Zone.',
        windowUrl: 'github.com/alex-dev/my-first-project/settings',
        screenType: 'repo-page',
        markers: [
          {
            number: 1,
            label: 'Click Settings',
            description: 'Click Settings at the right end of the repository tabs (owners and admins only).',
            xPercent: 76,
            yPercent: 7,
          },
          {
            number: 2,
            label: 'Use the menu on the left',
            description: 'Switch between General, Collaborators, Branches, Actions, Pages, and more.',
            xPercent: 15,
            yPercent: 32,
          },
          {
            number: 3,
            label: 'Rename the repository in General',
            description: 'In General, type a new Repository name and click Rename if you want to change it.',
            xPercent: 51,
            yPercent: 25,
          },
          {
            number: 4,
            label: 'Check your Default branch',
            description: 'Default branch is the main branch of your project, usually main.',
            xPercent: 60,
            yPercent: 41,
          },
          {
            number: 5,
            label: 'Turn Features on or off',
            description: 'Under Features you can turn Wikis, Issues, and Projects on or off.',
            xPercent: 50,
            yPercent: 65,
          },
          {
            number: 6,
            label: 'Be careful in the Danger Zone',
            description:
              'At the bottom is the Danger Zone. Deleting a repository cannot be undone, so GitHub asks you to type its name to confirm.',
            xPercent: 60,
            yPercent: 88,
          },
        ],
        screenshots: [
          {
            id: 'l3-tab-example-settings',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_TAB-example-settings_bf6bad82.png',
            alt: 'Example GitHub Settings tab showing left menu, Repository name, Default branch, Features checkboxes, and Danger Zone',
            caption:
              "Example illustration: GitHub's real screen may look slightly different. Only owners and admins see Settings.",
            markers: [
              {
                n: 1,
                x: 72.7,
                y: 4.5,
                w: 7.0,
                h: 4.8,
                label: 'Settings tab: only owners and admins can see it',
              },
              {
                n: 2,
                x: 5.5,
                y: 12.3,
                w: 20.3,
                h: 40.9,
                label: 'Menu: General, Collaborators, Branches, Actions, Pages, and more',
              },
              {
                n: 3,
                x: 28.7,
                y: 20.9,
                w: 46.0,
                h: 8.9,
                label: 'Repository name: rename your project here',
              },
              {
                n: 4,
                x: 28.7,
                y: 34.1,
                w: 66.3,
                h: 15.0,
                label: 'Default branch: the main branch of your project',
              },
              {
                n: 5,
                x: 28.7,
                y: 57.5,
                w: 42.2,
                h: 15.2,
                label: 'Features: turn Wikis, Issues, and Projects on or off',
              },
              {
                n: 6,
                x: 28.7,
                y: 79.1,
                w: 66.0,
                h: 18.2,
                label: 'Danger Zone: big actions that are hard to undo, like deleting',
              },
            ],
          },
        ],
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two mistakes beginners make in Settings',
        text: 'Be mindful of these two actions inside Settings:',
        items: [
          {
            title: '1. Clicking Delete this repository without being sure',
            text: 'Deleting a repository cannot be undone—only do it if you truly mean to remove the project.',
          },
          {
            title: '2. Turning off Issues or Wikis and then wondering why the tab disappeared',
            text: 'Unchecking a box under Features hides that tab right away; check the box again to bring it back.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l17-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'Where do you turn Wikis, Issues, and Projects on or off?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Settings, under Features',
            isCorrect: true,
            feedback:
              'Correct! Owners can check or uncheck Wikis, Issues, and Projects inside Settings, under Features.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'The Insights tab',
            isCorrect: false,
            feedback:
              'Not quite. Insights shows activity charts—feature checkboxes live in Settings, under Features.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'The Code tab',
            isCorrect: false,
            feedback:
              'Incorrect. The Code tab shows your files, while tab settings live in Settings, under Features.',
          },
        ],
      },
      {
        id: 'l17-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'Who can see the Settings tab?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Only owners and admins',
            isCorrect: true,
            feedback:
              'Correct! Only owners and admins see the Settings tab so visitors cannot change project rules.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Everyone',
            isCorrect: false,
            feedback:
              'Not quite. Visitors cannot see Settings—only owners and admins can see it.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Only people who starred the project',
            isCorrect: false,
            feedback:
              'Incorrect. Starring just bookmarks a project; only owners and admins see Settings.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 17 Complete',
      title: 'You know how the Settings tab works!',
      description:
        'You now know how owners rename a repository, invite collaborators, set the default branch, toggle tabs under Features, and stay safe around the Danger Zone.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 17 completed',
      nextUpPrefix: 'Next in Level 3: ',
      nextUpTitle: 'Agents tab',
      nextUpDuration: '3 min read',
    },
  },
  {
    id: 'agents-tab',
    slug: 'agents-tab',
    levelId: 'level-3',
    unlockWithLevel: true,
    kind: 'concept',
    cardTitle: 'Agents tab',
    cardDescription:
      "Meet GitHub's AI helper page (Copilot) and learn why beginners can skip paid plans.",
    readTime: '3 min read',
    meta: 'Lesson 18 · Level 3 · 3 min read',
    titleStart: 'What is the ',
    titleHighlight: 'Agents',
    titleEnd: ' Tab?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Understand what the Agents tab opens on GitHub and why everything in this course works on a free account.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/alex-dev/my-first-project/agents',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: 'Copilot',
      branchName: 'main',
      branchCount: 'Agents tab',
      addFileLabel: 'Optional feature',
      emptyTitle: 'An optional AI helper page',
      emptyDescription:
        'Everything in this course works on a free GitHub account—you can skip paid plans.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'A helper robot for small jobs',
        paragraphs: [
          'Imagine a helper robot you can ask to do small jobs around your desk.',
          'It is a newer helper—you can look inside its room anytime, and you never have to use or pay for it to build great projects.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Agents tab',
        meaning:
          "The Agents tab opens GitHub's Copilot page, where an AI helper can work on tasks for you.",
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'What the Agents tab is for',
        subtitle: 'A quick look at Copilot and what free accounts see.',
        variant: 'repo-box',
        nodes: [
          {
            label: 'Copilot',
            sublabel: "GitHub's AI helper.",
            tone: 'neutral',
          },
          {
            label: 'AI agent',
            sublabel: 'A helper that can work on small tasks for you.',
            tone: 'primary',
          },
          {
            label: 'Free account friendly',
            sublabel: 'No upgrade is needed to learn GitHub or finish this course.',
            tone: 'secondary',
          },
        ],
        caption:
          'This is a newer feature. Some parts need a paid Copilot plan, and GitHub may change it, so beginners can skip it for now.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'What you see on the Agents tab',
        subtitle:
          'Follow steps 1 to 3 to see what appears on a free GitHub account.',
        windowUrl: 'github.com/alex-dev/my-first-project/agents',
        screenType: 'agents-page',
        markers: [
          {
            number: 1,
            label: 'Click the Agents tab',
            description:
              'Click Agents in the top row of tabs between Pull requests and Actions.',
            xPercent: 52,
            yPercent: 11,
          },
          {
            number: 2,
            label: 'See the Copilot screen on a free plan',
            description:
              'On a free plan you may see "Do more with Copilot" and an upgrade button.',
            xPercent: 50,
            yPercent: 48,
          },
          {
            number: 3,
            label: 'No upgrade needed',
            description: 'You do not need to upgrade to finish this course.',
            xPercent: 50,
            yPercent: 72,
          },
        ],
      },
      tip: {
        eyebrow: 'Good to know',
        title: 'You can skip this tab for now',
        text: 'This is a newer feature. Some parts need a paid Copilot plan, and GitHub may change it, so beginners can skip it for now.',
      },
      commonMistake: {
        eyebrow: 'Common mistake',
        title: 'Feeling you must pay to learn GitHub',
        text: 'Everything in this course works on a free account. You never have to upgrade or pay to finish any lesson or build projects on GitHub.',
      },
    },
    quizzes: [
      {
        id: 'l18-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'What is the Agents tab about?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'AI helpers, called Copilot',
            isCorrect: true,
            feedback:
              "Correct! The Agents tab opens GitHub's Copilot page for AI helpers that can work on tasks.",
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Your files',
            isCorrect: false,
            feedback:
              'Not quite. Your files live in the Code tab, while Agents is for Copilot AI helpers.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Security alerts',
            isCorrect: false,
            feedback:
              'Incorrect. Security alerts live in Security and quality, while Agents opens Copilot.',
          },
        ],
      },
      {
        id: 'l18-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'Do you need to pay to finish this course?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'No',
            isCorrect: true,
            feedback:
              'Correct! Everything in this course works completely on a free GitHub account.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Yes',
            isCorrect: false,
            feedback:
              'Not quite. You do not need to pay anything—all lessons work on a free GitHub account.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Only for Level 3',
            isCorrect: false,
            feedback:
              'Incorrect. Even Level 3 needs no paid plan—you can skip paid Copilot features and still finish the whole course.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 18 Complete',
      title: 'Level 3 complete—every tab explained!',
      description:
        'You now know what every tab at the top of a GitHub repository does, when to use it, and that everything in this course works on a free account.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 18 completed',
      nextUpPrefix: 'Next up in Level 4: ',
      nextUpTitle: 'Extras',
      nextUpDuration: 'Coming soon',
    },
  },

  // =========================================================================
  // LEVEL 4: Extras
  // =========================================================================
  {
    id: 'releases',
    slug: 'releases',
    levelId: 'level-4',
    unlockWithLevel: true,
    kind: 'concept',
    cardTitle: 'Releases',
    cardDescription:
      'Package a named, downloadable version of your project with notes about what is inside.',
    readTime: '4 min read',
    meta: 'Lesson 19 · Level 4 · 4 min read',
    titleStart: 'What is a ',
    titleHighlight: 'Release',
    titleEnd: '?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Learn how to pack a finished version of your project with a tag like ',
      },
      { type: 'code', value: 'v1.0.0' },
      {
        type: 'text',
        value: ', clear release notes, and downloadable ZIP files.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/alex-dev/my-first-project/releases',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: 'v1.0.0',
      branchName: 'main',
      branchCount: 'Latest release',
      addFileLabel: 'New release',
      emptyTitle: 'A labeled package of your project',
      emptyDescription:
        'Give people one clear version to download instead of sorting through every commit.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'A bakery packs a labeled bag',
        paragraphs: [
          'A bakery does not hand customers the whole kitchen. Instead, it packs a clean, labeled bag: "Fresh batch, version 1".',
          'A release works the same way. It is a labeled package of your project at one moment, with short notes telling people what is inside.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Release',
        meaning:
          'A release is a named, downloadable version of your project, with notes about what changed.',
        extraTerm: 'Tag',
        extraMeaning:
          'A tag is like a bookmark placed on one commit to mark a version, such as v1.0.0.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'How a release gets packed and shared',
        subtitle: 'Three quick pieces turn a commit into a ready-to-download package.',
        variant: 'repo-box',
        nodes: [
          {
            label: 'Tag (v1.0.0)',
            sublabel: 'A bookmark placed on one commit to name the version.',
            tone: 'neutral',
          },
          {
            label: 'Target & Notes',
            sublabel: 'Pick the main branch, write a title, and explain what changed.',
            tone: 'primary',
          },
          {
            label: 'Published Release',
            sublabel: 'Gets a Latest label and free ZIP downloads for anyone.',
            tone: 'secondary',
          },
        ],
        caption:
          'GitHub automatically packs your project files into downloadable Source code ZIP files whenever you publish a release.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to create and publish a release',
        subtitle:
          'Follow steps 1 to 7 to pick a tag, add release notes, and publish your first release.',
        windowUrl: 'github.com/alex-dev/my-first-project/releases/new',
        screenType: 'repo-page',
        markers: [
          {
            number: 1,
            label: 'Click Create a new release in the Releases sidebar',
            description:
              'On the Code tab, look at the right-hand sidebar under Releases and click Create a new release.',
            xPercent: 80,
            yPercent: 62,
          },
          {
            number: 2,
            label: 'Choose or create a tag like v1.0.0',
            description:
              'Click Choose a tag, type a version number such as v1.0.0, and click Create new tag.',
            xPercent: 12,
            yPercent: 23,
          },
          {
            number: 3,
            label: 'Check that Target says main',
            description:
              'Target picks which branch the release comes from. Keep it on main unless you mean another branch.',
            xPercent: 12,
            yPercent: 30,
          },
          {
            number: 4,
            label: 'Write a short Release title',
            description:
              'Give this version a clear, short name so people immediately know what it is.',
            xPercent: 45,
            yPercent: 39,
          },
          {
            number: 5,
            label: 'Write Description or click Generate release notes',
            description:
              'List what is new or fixed. You can also click Generate release notes to fill it in for you.',
            xPercent: 45,
            yPercent: 58,
          },
          {
            number: 6,
            label: 'Click Publish release',
            description:
              'Click the green Publish release button at the bottom to make your release public.',
            xPercent: 14,
            yPercent: 94,
          },
          {
            number: 7,
            label: 'View your finished release page and ZIP download',
            description:
              'Your release appears with a green Latest label, your release notes, and Source code ZIP download links.',
            xPercent: 40,
            yPercent: 66,
          },
        ],
        screenshots: [
          {
            id: 'l4-releases-code-tab',
            title: 'Step 1: Find Releases in the right sidebar',
            src: '/assets/aistudio/L4-repository-code-tab-clean_f13431ee.png',
            alt: 'Real GitHub Code tab showing the Releases section in the right sidebar with Create a new release',
            caption:
              'Real screenshot. GitHub may change this page. Look in the right sidebar of the Code tab under Releases.',
            markers: [
              {
                n: 1,
                x: 71.9,
                y: 58.0,
                w: 18.4,
                h: 9.6,
                label: 'Releases: click Create a new release here',
              },
            ],
          },
          {
            id: 'l4-releases-new-form',
            title: 'Steps 2 to 6: Fill in your tag, target, title, and notes',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_XTRA-example-new-release_fced6e8b.png',
            alt: 'Example GitHub New Release page showing Tag, Target branch, Release title, Description, and Publish release button',
            caption:
              "Example illustration: GitHub's real screen may look slightly different. Pick a tag, check Target is main, write notes, and click Publish release.",
            markers: [
              {
                n: 1,
                x: 5.8,
                y: 21.0,
                w: 12.5,
                h: 5.0,
                label: 'Tag: the version name, like v1.0.0',
              },
              {
                n: 2,
                x: 5.8,
                y: 28.0,
                w: 12.5,
                h: 5.0,
                label: 'Target: the branch the release is made from. Check it says main',
              },
              {
                n: 3,
                x: 5.8,
                y: 36.2,
                w: 88.3,
                h: 6.0,
                label: 'Release title: a short name for this version',
              },
              {
                n: 4,
                x: 5.8,
                y: 45.2,
                w: 88.3,
                h: 26.2,
                label: 'Description: what is new. Generate release notes can write it for you',
              },
              {
                n: 5,
                x: 5.8,
                y: 92.0,
                w: 15.8,
                h: 5.5,
                label: 'Publish release: click to make it public',
              },
            ],
          },
          {
            id: 'l4-releases-published-page',
            title: 'Step 7: Your published release page',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_XTRA-example-release-page_5b61febc.png',
            alt: 'Example GitHub published release page showing title with green Latest label, version details, release notes, and Source code ZIP downloads',
            caption:
              "Example illustration: GitHub's real screen may look slightly different. Visitors can read your release notes and download your project as a ZIP file.",
            markers: [
              {
                n: 1,
                x: 5.3,
                y: 8.8,
                w: 27.8,
                h: 12.6,
                label: 'Title, with a green Latest label',
              },
              {
                n: 2,
                x: 5.3,
                y: 22.8,
                w: 35.5,
                h: 6.0,
                label: 'Version, who released it, and when',
              },
              {
                n: 3,
                x: 5.3,
                y: 33.0,
                w: 32.2,
                h: 8.4,
                label: 'Release notes: what changed',
              },
              {
                n: 4,
                x: 6.2,
                y: 59.5,
                w: 87.7,
                h: 13.0,
                label: 'Source code: click to download the project as a zip file',
              },
            ],
          },
        ],
      },
      tip: {
        eyebrow: 'Version tip',
        title: 'How version numbers like v1.0.0 work',
        text: 'Start your first finished release at v1.0.0. When you fix a tiny bug, raise the last number to v1.0.1. When you add a new feature, raise the middle number to v1.1.0.',
        codeSnippet: 'v1.0.0  →  v1.0.1 (small fix)  →  v1.1.0 (new feature)',
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two mistakes beginners make with releases',
        text: 'Check these two spots before clicking Publish release:',
        items: [
          {
            title: '1. Forgetting to choose or create a tag',
            text: 'Publish release stays greyed out until you pick an existing tag or type a new one like v1.0.0.',
          },
          {
            title: '2. Releasing from the wrong branch',
            text: 'Always check that Target says main unless you specifically want to package a different branch.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l19-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'What is a release?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'A named, downloadable version of your project with notes',
            isCorrect: true,
            feedback:
              'Correct! A release packages a named version of your project with notes and downloadable ZIP files.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'A deleted branch',
            isCorrect: false,
            feedback:
              'Not quite. A release is a labeled, downloadable version of your project, not a deleted branch.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'A type of issue',
            isCorrect: false,
            feedback:
              'Incorrect. Issues are for tracking tasks and bugs, while a release packages a version of your project.',
          },
        ],
      },
      {
        id: 'l19-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'What does ',
        questionCode: 'v1.0.0',
        questionSuffix: ' usually show?',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'The version number',
            isCorrect: true,
            feedback:
              'Correct! Numbers like v1.0.0 are version numbers that show which update people are downloading.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'The author',
            isCorrect: false,
            feedback:
              'Not quite. The author is your GitHub username; v1.0.0 is the version number.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'The branch name',
            isCorrect: false,
            feedback:
              'Incorrect. Branch names are things like main; v1.0.0 is the tag version number.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 19 Complete',
      title: 'You know how Releases work!',
      description:
        'You now know how to pick a version tag like v1.0.0, check your Target branch, write release notes, and publish a downloadable package.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 19 completed',
      nextUpPrefix: 'Next in Level 4: ',
      nextUpTitle: 'GitHub Pages',
      nextUpDuration: '4 min read',
    },
  },
  {
    id: 'github-pages',
    slug: 'github-pages',
    levelId: 'level-4',
    unlockWithLevel: true,
    kind: 'concept',
    cardTitle: 'GitHub Pages',
    cardDescription:
      'Turn an index.html file in your repository into a free, live website on GitHub.',
    readTime: '4 min read',
    meta: 'Lesson 20 · Level 4 · 4 min read',
    titleStart: 'What is ',
    titleHighlight: 'GitHub Pages',
    titleEnd: '?',
    descriptionSegments: [
      {
        type: 'text',
        value: 'Turn a simple ',
      },
      { type: 'code', value: 'index.html' },
      {
        type: 'text',
        value:
          ' file inside your repository into a real, live website anyone can open.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'your-username.github.io/my-first-project/',
      owner: 'alex-dev',
      repoName: 'my-first-project',
      visibility: 'Public',
      commitCount: 'Free hosting',
      branchName: 'main',
      branchCount: 'index.html',
      addFileLabel: 'Settings → Pages',
      emptyTitle: 'Turn HTML files into a live website',
      emptyDescription:
        'Free for public repositories, with updates that deploy automatically whenever you commit to main.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'Putting a poster in a shop window',
        paragraphs: [
          'Imagine printing a bright poster and placing it in a front window facing the street. Anyone walking past can read it without coming inside your workshop.',
          'GitHub Pages does the same thing for your project. It puts your HTML files in a public window so anyone can visit your website in a browser.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'GitHub Pages',
        meaning:
          'GitHub Pages turns HTML files in your repository into a real, live website with its own web address.',
        extraTerm: 'Static website',
        extraMeaning:
          'A website built from ready-made HTML, CSS, and image files—free on GitHub Pages for public repositories (private repositories may need a paid plan).',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'From index.html to a live website',
        subtitle: 'Three simple steps put your page online and keep it updated.',
        variant: 'repo-box',
        nodes: [
          {
            label: 'index.html',
            sublabel: 'Create your homepage file in the root of main.',
            tone: 'neutral',
          },
          {
            label: 'Settings → Pages',
            sublabel: 'Pick Deploy from a branch, main, and / (root), then click Save.',
            tone: 'primary',
          },
          {
            label: 'Live Website',
            sublabel: 'Ready in 1–2 minutes; auto-updates on new commits to main.',
            tone: 'secondary',
          },
        ],
        caption:
          'Once GitHub Pages is turned on, every new commit to main deploys an updated site automatically after a minute or two.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to publish your first website',
        subtitle:
          'Add an index.html file first, then follow steps 1 to 5 in Settings → Pages.',
        windowUrl: 'github.com/alex-dev/my-first-project/settings/pages',
        screenType: 'repo-page',
        markers: [
          {
            number: 0,
            label: 'First, create an index.html file in your repository',
            description:
              'On the Code tab, click Add file → Create new file, name it index.html, add <h1>Hello, GitHub Pages!</h1>, and commit it to main.',
            xPercent: 18,
            yPercent: 30,
          },
          {
            number: 1,
            label: 'Open Settings and click Pages in the left menu',
            description:
              'Click the Settings tab at the top of your repository, then click Pages under Code and automation.',
            xPercent: 15,
            yPercent: 66,
          },
          {
            number: 2,
            label: 'Set Source to Deploy from a branch',
            description:
              'Under Build and deployment, make sure the Source dropdown says Deploy from a branch.',
            xPercent: 42,
            yPercent: 66,
          },
          {
            number: 3,
            label: 'Choose branch main and folder / (root)',
            description:
              'Pick main as the branch and / (root) as the folder where your index.html file lives.',
            xPercent: 42,
            yPercent: 80,
          },
          {
            number: 4,
            label: 'Click Save and wait 1 to 2 minutes',
            description:
              'Click Save so GitHub starts building your site. After 1 to 2 minutes, refresh to see your live link banner at the top.',
            xPercent: 60,
            yPercent: 80,
          },
          {
            number: 5,
            label: 'Open your live web address',
            description:
              'Click the link (like https://your-username.github.io/my-first-project/). Future commits to main update it automatically.',
            xPercent: 48,
            yPercent: 16,
          },
        ],
        screenshots: [
          {
            id: 'l4-pages-settings',
            title: 'Steps 1 to 4: Turn on GitHub Pages in Settings',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_XTRA-example-pages-settings_cc7fede2.png',
            alt: 'Example GitHub Settings Pages screen showing Pages menu item, live site banner, Source Deploy from a branch, main and / (root), and Save button',
            caption:
              "Example illustration: GitHub's real screen may look slightly different. Make sure you have created index.html first, then pick Deploy from a branch, main, and / (root), and click Save.",
            markers: [
              {
                n: 1,
                x: 5.5,
                y: 63.6,
                w: 20.0,
                h: 6.4,
                label: 'Pages: open it from the Settings menu',
              },
              {
                n: 2,
                x: 29.2,
                y: 27.9,
                w: 65.0,
                h: 9.1,
                label: 'This banner shows your live address',
              },
              {
                n: 3,
                x: 29.2,
                y: 63.6,
                w: 25.0,
                h: 6.4,
                label: 'Source: choose Deploy from a branch',
              },
              {
                n: 4,
                x: 29.2,
                y: 77.6,
                w: 25.5,
                h: 6.4,
                label: 'Branch and folder: main and / (root)',
              },
              {
                n: 5,
                x: 56.0,
                y: 77.6,
                w: 7.5,
                h: 6.4,
                label: 'Save: click to start publishing',
              },
            ],
          },
          {
            id: 'l4-pages-live',
            title: 'Step 5: Visit your live website',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_XTRA-example-pages-live_ffd246aa.png',
            alt: 'Example browser window showing a live GitHub Pages site at your-username.github.io/my-first-project/',
            caption:
              "Example illustration: GitHub's real screen may look slightly different. Wait 1 to 2 minutes after saving—later commits to main update this page automatically.",
            markers: [
              {
                n: 1,
                x: 16.3,
                y: 13.1,
                w: 64.0,
                h: 7.7,
                label: "Your site's web address: share it with anyone",
              },
              {
                n: 2,
                x: 9.2,
                y: 30.0,
                w: 50.0,
                h: 43.8,
                label: 'Your page, made from your index.html file',
              },
            ],
          },
        ],
      },
      tip: {
        eyebrow: 'Quick starter file',
        title: 'Create index.html first (free for public repos)',
        text: 'Put a file named index.html at the top of your public repository before turning on GitHub Pages (private repositories may need a paid plan). Here is one line you can paste inside:',
        codeSnippet: '<h1>Hello, GitHub Pages!</h1>',
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Three mistakes beginners make with GitHub Pages',
        text: 'If your website does not show up right away, check these three things:',
        items: [
          {
            title: '1. No index.html file',
            text: 'If index.html is missing from your chosen folder, visitors see a 404 "There isn\'t a GitHub Pages site here" error.',
          },
          {
            title: '2. Expecting the site right away',
            text: 'Wait 1 to 2 minutes after clicking Save or making a new commit, then refresh the page.',
          },
          {
            title: '3. Putting passwords or private notes in your files',
            text: 'Everything deployed to GitHub Pages is public on the internet—never put secrets or private notes there.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l20-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'What is the homepage file called?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'index.html',
            isCorrect: true,
            feedback:
              'Correct! Web browsers and GitHub Pages look for a file named index.html as the homepage.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'home.txt',
            isCorrect: false,
            feedback:
              'Not quite. Plain text files like home.txt will not act as a homepage—name it index.html.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'main.png',
            isCorrect: false,
            feedback:
              'Incorrect. A .png file is an image, while your website homepage file is named index.html.',
          },
        ],
      },
      {
        id: 'l20-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'Where do you turn on GitHub Pages?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Settings, then Pages',
            isCorrect: true,
            feedback:
              'Correct! Open the Settings tab and click Pages in the left menu to deploy your site.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'The Issues tab',
            isCorrect: false,
            feedback:
              'Not quite. Issues is for tracking tasks and bugs; GitHub Pages lives under Settings, then Pages.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'The Wiki tab',
            isCorrect: false,
            feedback:
              'Incorrect. The Wiki tab holds project guides, while GitHub Pages is turned on in Settings, then Pages.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 20 Complete',
      title: 'You know how GitHub Pages works!',
      description:
        'You now know how to create an index.html file, deploy it from Settings → Pages, share your live web address, and keep it updated with commits to main.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 20 completed',
      nextUpPrefix: 'Next in Level 4: ',
      nextUpTitle: 'Gists',
      nextUpDuration: 'Coming soon',
    },
  },
  {
    id: 'gists',
    slug: 'gists',
    levelId: 'level-4',
    unlockWithLevel: true,
    kind: 'concept',
    cardTitle: 'Gists',
    cardDescription:
      'Share a small code snippet or quick note with a link, without creating a full repository.',
    readTime: '4 min read',
    meta: 'Lesson 21 · Level 4 · 4 min read',
    titleStart: 'What is a ',
    titleHighlight: 'Gist',
    titleEnd: '?',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Share a small snippet or quick note in seconds—like a sticky note for code, with full edit history.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'gist.github.com/alex-dev/hello.py',
      owner: 'alex-dev',
      repoName: 'hello.py',
      visibility: 'Secret gist',
      commitCount: '1 revision',
      branchName: 'snippet',
      branchCount: 'Instant link',
      addFileLabel: 'New gist',
      emptyTitle: 'A tiny repository for one snippet',
      emptyDescription:
        'Give your file an ending like hello.py to add syntax colors, then copy the link to share.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'A sticky note for code',
        paragraphs: [
          'You write a quick tip on a sticky note and hand it to a friend. You do not build a whole project box just for one short note.',
          'A gist is a sticky note for code. It lets you share one small snippet cleanly with a single link.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Gist',
        meaning:
          'A gist is a tiny repository for sharing one file or snippet with a link. It keeps its history, so you can edit it later.',
        extraTerm: 'Secret vs. Public gist',
        extraMeaning:
          'A public gist is open for everyone to find and read. A secret gist is not listed, but anyone who has the link can still read it.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'From quick snippet to shareable link',
        subtitle: 'Create a gist in seconds and keep it updated whenever you edit.',
        variant: 'repo-box',
        nodes: [
          {
            label: 'Filename & Content',
            sublabel: 'Add a file ending like hello.py so code colors turn on.',
            tone: 'neutral',
          },
          {
            label: 'Secret or Public',
            sublabel: 'Secret hides it from search; Public lets everyone find it.',
            tone: 'primary',
          },
          {
            label: 'Share & Edit',
            sublabel: 'Send the web address—every future edit saves in history.',
            tone: 'secondary',
          },
        ],
        caption:
          'A gist is still a real mini repository under the hood, so you can edit it anytime and see older versions.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to create and share a gist',
        subtitle:
          'Follow steps 1 to 6 to write a snippet, pick secret or public, and copy your link.',
        windowUrl: 'gist.github.com',
        screenType: 'repo-page',
        markers: [
          {
            number: 1,
            label: 'Go to gist.github.com, or click + and choose New gist',
            description:
              'Visit gist.github.com directly, or click the plus menu at the top right of GitHub and choose New gist.',
            xPercent: 18,
            yPercent: 10,
          },
          {
            number: 2,
            label: 'Type a short description',
            description:
              'Say what your snippet is for in the top description box so people know what they are looking at.',
            xPercent: 45,
            yPercent: 16,
          },
          {
            number: 3,
            label: 'Type a filename with its ending, like hello.py',
            description:
              'Add an ending like .py, .html, or .md. The ending turns on helpful colors for that language.',
            xPercent: 19,
            yPercent: 26,
          },
          {
            number: 4,
            label: 'Write or paste your code or text',
            description:
              'Paste or type your snippet into the large editor box right below the filename.',
            xPercent: 50,
            yPercent: 48,
          },
          {
            number: 5,
            label: 'Click Create secret gist, or open its arrow for Create public gist',
            description:
              'Create secret gist is the default button, or use the arrow next to it to choose Create public gist.',
            xPercent: 80,
            yPercent: 74,
          },
          {
            number: 6,
            label: 'Copy the address of the page and share it',
            description:
              'Once created, copy the URL from your browser address bar and send it to anyone you want to share with.',
            xPercent: 50,
            yPercent: 86,
          },
        ],
        screenshots: [
          {
            id: 'l4-new-gist',
            title: 'Steps 2 to 5: Create a new gist',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_XTRA-example-new-gist_572f3644.png',
            alt: 'Example GitHub New Gist page showing description box, filename with extension hello.py, content editor, Create secret gist button, and secret or public dropdown',
            caption:
              "Example illustration: GitHub's real screen may look slightly different. Fill in a filename with its ending, write your snippet, and pick Create secret gist or Create public gist.",
            markers: [
              {
                n: 1,
                x: 5.8,
                y: 12.8,
                w: 88.3,
                h: 6.4,
                label: 'Description: say what the snippet is for',
              },
              {
                n: 2,
                x: 6.8,
                y: 23.8,
                w: 25.0,
                h: 4.9,
                label: 'Filename with its ending, like hello.py',
              },
              {
                n: 3,
                x: 5.8,
                y: 30.1,
                w: 88.3,
                h: 35.9,
                label: 'Content: write or paste your code or text',
              },
              {
                n: 4,
                x: 75.0,
                y: 69.6,
                w: 19.2,
                h: 6.1,
                label: 'Create secret gist: the default button',
              },
              {
                n: 5,
                x: 64.2,
                y: 77.7,
                w: 30.0,
                h: 18.8,
                label: 'Secret or public: secret means only people with the link can see it',
              },
            ],
          },
        ],
      },
      tip: {
        eyebrow: 'Important tip',
        title: 'A secret gist is not private',
        text: 'A secret gist is not private. Anyone who has the link can read it. Never put passwords or keys in any gist.',
        codeSnippet: 'hello.py  →  turns on code colors',
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two mistakes beginners make with gists',
        text: 'Keep these two points in mind whenever you save a snippet:',
        items: [
          {
            title: '1. Forgetting the file ending',
            text: 'Without an ending like .py, .js, or .md, GitHub treats it as plain text with no syntax colors.',
          },
          {
            title: '2. Thinking secret means private',
            text: 'A secret gist only stays off public search lists—anyone who gets the link can read everything inside it.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l21-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'What is a gist for?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Sharing a small snippet',
            isCorrect: true,
            feedback:
              'Correct! A gist is a tiny repository made for sharing a small piece of code or text with a link.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Storing a whole project',
            isCorrect: false,
            feedback:
              'Not quite. Whole projects with folders belong in a regular repository—gists are for small snippets.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Running automatic tasks',
            isCorrect: false,
            feedback:
              'Incorrect. Running automatic tasks is what GitHub Actions does; gists share small snippets.',
          },
        ],
      },
      {
        id: 'l21-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'Who can see a secret gist?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Anyone who has the link',
            isCorrect: true,
            feedback:
              'Correct! Secret gists are unlisted, but anyone who receives the web address can open and read them.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Only you',
            isCorrect: false,
            feedback:
              'Not quite. Secret does not mean private—anyone you share the link with (or anyone who finds it) can read it.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Only people you invite',
            isCorrect: false,
            feedback:
              'Incorrect. Gists do not have an invite list—anyone who has the link to a secret gist can read it.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 21 Complete',
      title: 'You know how Gists work!',
      description:
        'You now know how to save a small snippet with a file ending, choose between a secret and public gist, and share the link safely.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 21 completed',
      nextUpPrefix: 'Next in Level 4: ',
      nextUpTitle: 'Profile README',
      nextUpDuration: '4 min read',
    },
  },
  {
    id: 'profile-readme',
    slug: 'profile-readme',
    levelId: 'level-4',
    unlockWithLevel: true,
    kind: 'concept',
    cardTitle: 'Profile README',
    cardDescription:
      'Create a custom welcome message pinned right at the top of your GitHub profile page.',
    readTime: '4 min read',
    meta: 'Lesson 22 · Level 4 · 4 min read',
    titleStart: 'What is a ',
    titleHighlight: 'Profile README',
    titleEnd: '?',
    descriptionSegments: [
      {
        type: 'text',
        value: 'Create a special Public repository named after your username to pin a friendly ',
      },
      { type: 'code', value: 'README.md' },
      {
        type: 'text',
        value: ' intro at the top of your GitHub profile.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'github.com/your-username',
      owner: 'your-username',
      repoName: 'your-username',
      visibility: 'Public',
      commitCount: 'Special repo',
      branchName: 'main',
      branchCount: 'README.md',
      addFileLabel: 'Edit README',
      emptyTitle: 'You found a secret!',
      emptyDescription:
        'A Public repository matching your username puts your README.md right at the top of your profile.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'A name tag with a short hello',
        paragraphs: [
          'At an event you wear a name tag with a short hello so people immediately know who you are and what you are working on.',
          'A profile README is that short welcome message sitting at the top of your GitHub profile.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Profile README',
        meaning:
          'A profile README is a README file in a special repository named exactly like your username. GitHub shows it at the top of your profile page.',
        extraTerm: 'Special repository',
        extraMeaning:
          'A Public repository named exactly like your GitHub username, which triggers "You found a secret!" and displays its README on your profile.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'How the special repository appears on your profile',
        subtitle: 'Three exact settings unlock your custom profile welcome box.',
        variant: 'repo-box',
        nodes: [
          {
            label: 'Match Username',
            sublabel: 'Name the repo your exact username to see "You found a secret!".',
            tone: 'neutral',
          },
          {
            label: 'Public + README',
            sublabel: 'Choose Public visibility and turn on Add README.',
            tone: 'primary',
          },
          {
            label: 'Shown on Profile',
            sublabel: 'Edit README.md in Markdown, commit, and view your profile page.',
            tone: 'secondary',
          },
        ],
        caption:
          'Whenever you edit README.md inside your special repository, your GitHub profile page updates right away.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to set up your Profile README',
        subtitle:
          'Follow steps 1 to 7 to create your special repository and display a welcome message on your profile.',
        windowUrl: 'github.com/your-username',
        screenType: 'repo-page',
        markers: [
          {
            number: 1,
            label: 'Click the + menu at the top right and choose New repository',
            description:
              'Start from the plus button at the top right of GitHub and open the New repository form.',
            xPercent: 80,
            yPercent: 12,
          },
          {
            number: 2,
            label: 'In Repository name, type exactly your username',
            description:
              'Spell your GitHub username letter for letter (matching the Owner box on the left).',
            xPercent: 44,
            yPercent: 22,
          },
          {
            number: 3,
            label: 'See the "You found a secret!" message',
            description:
              'GitHub shows "You found a secret!" because this is a special repository.',
            xPercent: 38,
            yPercent: 42,
          },
          {
            number: 4,
            label: 'Choose Public, turn on Add README, and click Create repository',
            description:
              'Make sure visibility is Public, toggle Add README on, and click Create repository.',
            xPercent: 65,
            yPercent: 60,
          },
          {
            number: 5,
            label: 'Open README.md and click the pencil icon to edit',
            description:
              'Inside your new repository (or right from your profile), click the pencil icon to edit README.md.',
            xPercent: 64,
            yPercent: 26,
          },
          {
            number: 6,
            label: 'Write a short intro in Markdown, then click Commit changes',
            description:
              'Use simple Markdown headings and bullets to write a friendly intro, then save with Commit changes.',
            xPercent: 64,
            yPercent: 52,
          },
          {
            number: 7,
            label: 'Open your profile page to see your README at the top',
            description:
              'Click your profile picture → Your profile. Your welcome message appears right at the top.',
            xPercent: 64,
            yPercent: 54,
          },
        ],
        screenshots: [
          {
            id: 'l4-profile-repo',
            title: 'Steps 1 to 4: Create your special repository',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_XTRA-example-profile-repo_e449e909.png',
            alt: 'Example New Repository form showing Repository name matching username, You found a secret banner, Public visibility, and Add README option',
            caption:
              "Example illustration: GitHub's real screen may look slightly different. Match your username exactly, pick Public, and turn on Add README.",
            markers: [
              {
                n: 1,
                x: 30.8,
                y: 19.1,
                w: 26.7,
                h: 6.5,
                label: 'Repository name: it must match your username exactly',
              },
              {
                n: 2,
                x: 5.8,
                y: 34.1,
                w: 66.7,
                h: 16.2,
                label: 'This message means the special repository was found',
              },
              {
                n: 3,
                x: 60.0,
                y: 57.4,
                w: 10.8,
                h: 5.9,
                label: 'Visibility: it must be Public',
              },
              {
                n: 4,
                x: 63.5,
                y: 69.7,
                w: 5.3,
                h: 4.7,
                label: 'Add README: turn it on',
              },
            ],
          },
          {
            id: 'l4-profile-page',
            title: 'Steps 5 to 7: Your welcome message on your profile page',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_XTRA-example-profile-page_b3869032.png',
            alt: 'Example GitHub profile page showing profile picture, README file header with pencil icon, and welcome message displayed at the top',
            caption:
              "Example illustration: GitHub's real screen may look slightly different. Click the pencil icon to edit your intro in Markdown and commit your changes.",
            markers: [
              {
                n: 1,
                x: 6.2,
                y: 13.7,
                w: 12.7,
                h: 28.1,
                label: 'Your profile picture and name',
              },
              {
                n: 2,
                x: 33.7,
                y: 22.6,
                w: 60.2,
                h: 8.1,
                label: 'The README file name, with a pencil to edit it',
              },
              {
                n: 3,
                x: 34.5,
                y: 32.6,
                w: 58.5,
                h: 41.5,
                label: 'Your welcome message, shown at the top of your profile',
              },
            ],
          },
        ],
      },
      tip: {
        eyebrow: 'Ideas to write',
        title: 'What to write (and what to leave out)',
        text: 'Share who you are, what you are learning, what you are building, and helpful links. Do not share private details like your phone number or home address.',
        codeSnippet: 'Hi! I am learning GitHub and building small web projects.',
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two mistakes beginners make with Profile README',
        text: 'If your welcome box does not appear on your profile, check these two settings:',
        items: [
          {
            title: '1. A repository name that does not match your username',
            text: 'Every letter must match your exact GitHub username or GitHub will treat it like a normal project.',
          },
          {
            title: '2. Making it a private repository',
            text: 'A private repository will not show on your public profile page—visibility must be Public.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l22-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'What must the repository be named?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Exactly your username',
            isCorrect: true,
            feedback:
              'Correct! Naming the repository exactly like your GitHub username unlocks the special Profile README.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'profile',
            isCorrect: false,
            feedback:
              'Not quite. Naming it "profile" creates an ordinary repository—you must use your exact username.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'readme',
            isCorrect: false,
            feedback:
              'Incorrect. The file inside is called README.md, while the repository itself must match your exact username.',
          },
        ],
      },
      {
        id: 'l22-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'What must its visibility be?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Public',
            isCorrect: true,
            feedback:
              'Correct! Your special repository must be Public so GitHub can show your welcome message on your profile.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Private',
            isCorrect: false,
            feedback:
              'Not quite. Private repositories stay hidden and will not display your README on your profile.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Either one',
            isCorrect: false,
            feedback:
              'Incorrect. Only a Public special repository shows its README on your profile page.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 22 Complete',
      title: 'Level 4 complete—you finished Extras!',
      description:
        'You now know how to package releases, launch a website with GitHub Pages, share quick Gist snippets, and customize your Profile README.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 22 completed',
      nextUpPrefix: 'Next up in Level 5: ',
      nextUpTitle: 'On your computer',
      nextUpDuration: 'Coming soon',
    },
  },

  // =========================================================================
  // LEVEL 5: On your computer
  // =========================================================================
  {
    id: 'install-git',
    slug: 'install-git',
    levelId: 'level-5',
    kind: 'concept',
    cardTitle: 'Install Git',
    cardDescription:
      'Install Git on Windows, Mac, or Linux and save your name and email once.',
    readTime: '5 min read',
    meta: 'Lesson 23 · Level 5 · 5 min read',
    titleStart: 'Install ',
    titleHighlight: 'Git',
    titleEnd: '',
    descriptionSegments: [
      {
        type: 'text',
        value:
          'Put Git on your own computer, check it with ',
      },
      { type: 'code', value: 'git --version' },
      {
        type: 'text',
        value: ', and introduce your name and email once.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'Terminal · git --version',
      owner: 'your-computer',
      repoName: 'git-setup',
      visibility: 'Local tool',
      commitCount: 'git 2.47.0',
      branchName: 'git config',
      branchCount: 'One-time setup',
      addFileLabel: 'Open Terminal',
      emptyTitle: 'Git runs right on your computer',
      emptyDescription:
        'Git tracks changes locally on your machine; GitHub stores your Git projects online.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'A stove in your own kitchen',
        paragraphs: [
          'Before you can cook at home you need a stove.',
          'GitHub is the shared kitchen on the internet. Git is the stove on your own computer.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'Git',
        meaning:
          'Git is a free program on your computer that tracks changes to your files.',
        extraTerm: 'GitHub',
        extraMeaning:
          'GitHub is the website that stores your Git projects online.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'Three quick setup steps on your computer',
        subtitle: 'You only have to install Git and set your name once.',
        variant: 'repo-box',
        nodes: [
          {
            label: '1. Install Git',
            sublabel: 'Get Git for Windows, accept Mac developer tools, or install on Linux.',
            tone: 'neutral',
          },
          {
            label: '2. Open Terminal',
            sublabel: 'Use Git Bash (Windows), Terminal (Mac), or Ctrl+Alt+T (Linux).',
            tone: 'primary',
          },
          {
            label: '3. Set Name & Email',
            sublabel: 'Run git config so every saved commit knows it came from you.',
            tone: 'secondary',
          },
        ],
        caption:
          'Once Git knows your name and email, every project on your computer remembers them automatically.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to install Git and set your name',
        subtitle:
          'Follow steps 1 to 5. Type each command in your terminal and press Enter after each command.',
        windowUrl: 'Terminal / Git Bash',
        screenType: 'repo-page',
        showStepList: true,
        markers: [
          {
            number: 1,
            label: 'Install Git for your computer',
            description:
              'Windows: go to git-scm.com, download Git for Windows, run it, and keep the default options by clicking Next. Mac: open Terminal and type git --version; if Git is missing, click Install. Ubuntu or Debian Linux: type sudo apt install git and press Enter.',
            xPercent: 20,
            yPercent: 20,
          },
          {
            number: 2,
            label: 'Open a terminal window',
            description:
              'Windows: search for Git Bash in the Start menu. Mac: press Cmd and Space, then type Terminal. Linux: press Ctrl, Alt, and T.',
            xPercent: 20,
            yPercent: 30,
          },
          {
            number: 3,
            label: 'Check that Git works with git --version',
            description:
              'Type git --version and press Enter. You should see a version number like git version 2.47.0.',
            xPercent: 50,
            yPercent: 32,
          },
          {
            number: 4,
            label: 'Tell Git your name and email',
            description:
              'Type git config --global user.name "Your Name" and git config --global user.email "you@example.com", using your own name and email. Press Enter after each command.',
            xPercent: 50,
            yPercent: 54,
          },
          {
            number: 5,
            label: 'Check your saved name',
            description:
              'Type git config --global user.name and press Enter. Git should print your saved name right back.',
            xPercent: 50,
            yPercent: 76,
          },
        ],
        commands: [
          {
            id: 'l23-cmd-linux',
            step: 'Step 1 (Linux)',
            label: 'Install Git on Ubuntu or Debian Linux',
            command: 'sudo apt install git',
            note: 'Skip on Windows and Mac',
          },
          {
            id: 'l23-cmd-version',
            step: 'Step 3',
            label: 'Check that Git is installed (and trigger Mac install if missing)',
            command: 'git --version',
          },
          {
            id: 'l23-cmd-name',
            step: 'Step 4a',
            label: 'Save your name (keep the quote marks)',
            command: 'git config --global user.name "Your Name"',
          },
          {
            id: 'l23-cmd-email',
            step: 'Step 4b',
            label: 'Save your email address',
            command: 'git config --global user.email "you@example.com"',
          },
          {
            id: 'l23-cmd-check',
            step: 'Step 5',
            label: 'Check that Git saved your name',
            command: 'git config --global user.name',
          },
        ],
        screenshotsNote:
          'These screenshots are from Windows. On a Mac or Linux, follow the text steps instead.',
        screenshots: [
          {
            id: 'l5-git-real-download',
            title: 'Step 1, download (Windows)',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_GIT-real-download-page_fdb53e16.png',
            alt: 'Real Windows screenshot of the Git for Windows download page showing the web address, Windows tab, download link, and latest version box',
            caption:
              'Real screenshot (Windows). Your screen may look slightly different.',
            markers: [
              {
                n: 1,
                x: 2.8,
                y: 2.7,
                w: 16.7,
                h: 7.5,
                label: 'The address: git-scm.com/install/windows',
              },
              {
                n: 2,
                x: 38.4,
                y: 54.8,
                w: 8.8,
                h: 16.0,
                label: 'Windows: make sure this tab is selected',
              },
              {
                n: 3,
                x: 39.6,
                y: 76.5,
                w: 15.0,
                h: 7.5,
                label: 'Click here to download: the installer for most Windows laptops',
              },
              {
                n: 4,
                x: 73.8,
                y: 34.2,
                w: 22.8,
                h: 9.9,
                label: 'Latest version: your number may be different, and that is fine',
              },
            ],
          },
          {
            id: 'l5-git-real-setup-finish',
            title: 'Step 1, finish the installer',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_GIT-real-setup-finish_cfd13429.png',
            alt: 'Real Windows screenshot of the final Git Setup Wizard screen with Launch Git Bash, View Release Notes, and Finish',
            caption:
              'Real screenshot (Windows). Your screen may look slightly different.',
            markers: [
              {
                n: 1,
                x: 35.6,
                y: 37.1,
                w: 17.1,
                h: 3.6,
                label: 'Launch Git Bash: tick this to open Git right away',
              },
              {
                n: 2,
                x: 35.6,
                y: 42.0,
                w: 20.1,
                h: 3.6,
                label: 'View Release Notes: untick this, you do not need it',
              },
              {
                n: 3,
                x: 71.8,
                y: 92.8,
                w: 12.3,
                h: 4.7,
                label: 'Finish: click to close the installer',
              },
            ],
          },
          {
            id: 'l5-git-real-git-bash',
            title: 'Step 3, check the version',
            src: '/assets/aistudio/mnt_user-data_outputs_clean_GIT-real-git-bash_c5b1b7b2.png',
            alt: 'Real Windows screenshot of Git Bash showing the prompt, typing git --version, and the version output',
            caption:
              'Real screenshot (Windows). Your screen may look slightly different.',
            markers: [
              {
                n: 1,
                x: 1.7,
                y: 10.3,
                w: 19.3,
                h: 3.4,
                label: 'The prompt: your computer name and the current folder',
              },
              {
                n: 2,
                x: 1.7,
                y: 13.9,
                w: 14.2,
                h: 3.6,
                label: 'The command you type: git --version',
              },
              {
                n: 3,
                x: 1.7,
                y: 17.6,
                w: 27.0,
                h: 3.4,
                label: 'The answer: Git prints its version number',
              },
            ],
          },
          {
            id: 'l5-git-version',
            title: 'What the terminal looks like',
            src: '/assets/aistudio/GIT-example-version-clean_4827af1d.png',
            alt: 'Example terminal window showing git --version, git config --global user.name, git config --global user.email, and checking the saved name',
            caption:
              'Example illustration: your screen may look slightly different. Press Enter after each command you type.',
            markers: [
              {
                n: 1,
                x: 7.0,
                y: 24.8,
                w: 86.0,
                h: 14.4,
                label: 'git --version: shows that Git is installed',
              },
              {
                n: 2,
                x: 7.0,
                y: 47.0,
                w: 86.0,
                h: 6.9,
                label: 'Your name: keep the quote marks',
              },
              {
                n: 3,
                x: 7.0,
                y: 54.5,
                w: 86.0,
                h: 6.9,
                label: "Your email: you can use GitHub's private email address",
              },
              {
                n: 4,
                x: 7.0,
                y: 69.3,
                w: 86.0,
                h: 14.4,
                label: 'Check: Git repeats the name you saved',
              },
            ],
          },
        ],
      },
      tip: {
        eyebrow: 'Privacy tip',
        title: 'You can use a private GitHub email address',
        text: 'If you do not want your real email in your commits, open GitHub, go to Settings, then Emails, and turn on Keep my email addresses private. Use the private address GitHub shows there.',
        codeSnippet: '123456+username@users.noreply.github.com',
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two mistakes beginners make when setting up Git',
        text: 'Check these two points if a command does not work right away:',
        items: [
          {
            title: '1. Typing commands in the browser',
            text: 'Git commands do not go in Chrome, Edge, or Safari. They go inside your terminal (Git Bash on Windows, Terminal on Mac/Linux).',
          },
          {
            title: '2. Forgetting the quote marks around your name',
            text: 'Keep the quote marks around "Your Name" so Git saves your full name with spaces properly.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l23-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'What is Git?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'A program on your computer that tracks changes',
            isCorrect: true,
            feedback:
              'Correct! Git is the free program installed on your computer that tracks file changes, while GitHub stores projects online.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'The GitHub website',
            isCorrect: false,
            feedback:
              'Not quite. GitHub is the website online; Git is the program on your own computer.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'A web browser',
            isCorrect: false,
            feedback:
              'Incorrect. A web browser opens websites—Git is a version tracking program you run in a terminal.',
          },
        ],
      },
      {
        id: 'l23-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'How do you check that Git is installed?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'git --version',
            isCorrect: true,
            feedback:
              'Correct! Typing git --version and pressing Enter prints your installed Git version number.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'git install',
            isCorrect: false,
            feedback:
              'Not quite. There is no git install command—type git --version to check.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'git hello',
            isCorrect: false,
            feedback:
              'Incorrect. Type git --version and press Enter to see if Git is installed.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 23 Complete',
      title: 'Git is installed and ready!',
      description:
        'You now know what Git is, how to open a terminal, how to check git --version, and how to save your name and email with git config.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 23 completed',
      nextUpPrefix: 'Next in Level 5: ',
      nextUpTitle: 'Clone to your computer',
      nextUpDuration: '5 min read',
    },
  },
  {
    id: 'clone-local',
    slug: 'clone-local',
    levelId: 'level-5',
    kind: 'concept',
    cardTitle: 'Clone to your computer',
    cardDescription:
      'Download a full copy of a repository to your computer with git clone and step inside with cd.',
    readTime: '5 min read',
    meta: 'Lesson 24 · Level 5 · 5 min read',
    titleStart: 'Clone to Your ',
    titleHighlight: 'Computer',
    titleEnd: '',
    descriptionSegments: [
      {
        type: 'text',
        value: 'Use ',
      },
      { type: 'code', value: 'git clone' },
      {
        type: 'text',
        value:
          ' to download a full repository folder with its commit history onto your own computer.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'Terminal · git clone',
      owner: 'your-computer',
      repoName: 'my-first-project',
      visibility: 'Local folder',
      commitCount: 'Full history',
      branchName: 'main',
      branchCount: 'origin/main',
      addFileLabel: 'git clone',
      emptyTitle: 'Work right inside your own folder',
      emptyDescription:
        'git clone downloads the files, keeps all past commits, and stays connected to origin on GitHub.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'A photocopy that remembers every draft',
        paragraphs: [
          'Imagine photocopying a book so you can read and edit it at your desk at home.',
          'Cloning a repository is like photocopying a book to read at home—except the copy also remembers every change ever made to the original.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'git clone',
        meaning:
          'git clone downloads a full copy of a repository to your computer, with its history, and connects it to GitHub.',
        extraTerm: 'origin',
        extraMeaning:
          "origin is Git's nickname for your GitHub repository so your local folder remembers where to upload or fetch changes.",
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'Downloading and opening your project folder',
        subtitle: 'Three commands bring your project from GitHub onto your computer.',
        variant: 'repo-box',
        nodes: [
          {
            label: '1. Copy HTTPS Link',
            sublabel: 'On GitHub, click the green Code button and copy the HTTPS web address.',
            tone: 'neutral',
          },
          {
            label: '2. git clone',
            sublabel: 'Downloads the full project folder and history to your computer.',
            tone: 'primary',
          },
          {
            label: '3. cd & git status',
            sublabel: 'Move into the new folder with cd and check it with git status.',
            tone: 'secondary',
          },
        ],
        caption:
          'Whenever git status says "nothing to commit, working tree clean", your folder matches GitHub with no unsaved edits yet.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to clone a repository to your computer',
        subtitle:
          'Follow steps 1 to 6. Press Enter after each command you type in your terminal.',
        windowUrl: 'Terminal · my-first-project',
        screenType: 'repo-page',
        showStepList: true,
        markers: [
          {
            number: 1,
            label: 'Copy the HTTPS address on GitHub',
            description:
              'On GitHub, open your repository, click the green Code button, and copy the HTTPS address.',
            xPercent: 78,
            yPercent: 20,
          },
          {
            number: 2,
            label: 'Run git clone with the copied address',
            description:
              'In the terminal, type git clone, a space, then paste the address, and press Enter.',
            xPercent: 45,
            yPercent: 16,
          },
          {
            number: 3,
            label: 'Watch the download progress',
            description:
              'The first line says Cloning into your project name as Git downloads every file and commit.',
            xPercent: 45,
            yPercent: 30,
          },
          {
            number: 4,
            label: 'Move into the new folder with cd',
            description:
              'Type cd my-first-project (use your own project name) and press Enter.',
            xPercent: 24,
            yPercent: 48,
          },
          {
            number: 5,
            label: 'See the files inside the folder',
            description:
              'Type ls and press Enter to list your files. In Windows Command Prompt, use dir instead.',
            xPercent: 24,
            yPercent: 58,
          },
          {
            number: 6,
            label: 'Check your folder with git status',
            description:
              'Type git status and press Enter. "Nothing to commit, working tree clean" means nothing has changed yet.',
            xPercent: 45,
            yPercent: 78,
          },
        ],
        commands: [
          {
            id: 'l24-cmd-clone',
            step: 'Step 2',
            label: 'Clone your repository (replace with your own HTTPS link)',
            command: 'git clone https://github.com/your-username/my-first-project.git',
          },
          {
            id: 'l24-cmd-cd',
            step: 'Step 4',
            label: 'Move into the new folder (use your own project name)',
            command: 'cd my-first-project',
          },
          {
            id: 'l24-cmd-ls',
            step: 'Step 5',
            label: 'List the files inside the folder',
            command: 'ls',
            note: 'In Windows Command Prompt, use dir',
          },
          {
            id: 'l24-cmd-status',
            step: 'Step 6',
            label: 'Check that nothing has changed yet',
            command: 'git status',
          },
        ],
        screenshots: [
          {
            id: 'l5-git-clone',
            title: 'What cloning looks like in the terminal',
            src: '/assets/aistudio/GIT-example-clone-clean_370e671c.png',
            alt: 'Example terminal window showing git clone, progress output, cd my-first-project, ls file list, and git status working tree clean',
            caption:
              'Example illustration: your screen may look slightly different. Press Enter after each command.',
            markers: [
              {
                n: 1,
                x: 7.0,
                y: 14.8,
                w: 86.0,
                h: 4.2,
                label: 'git clone plus the web address you copied',
              },
              {
                n: 2,
                x: 7.0,
                y: 19.3,
                w: 86.0,
                h: 22.0,
                label: 'Progress: Git is downloading the project',
              },
              {
                n: 3,
                x: 7.0,
                y: 46.0,
                w: 86.0,
                h: 4.2,
                label: 'cd: move into the project folder',
              },
              {
                n: 4,
                x: 7.0,
                y: 54.9,
                w: 86.0,
                h: 8.6,
                label: 'ls: lists the files in the folder',
              },
              {
                n: 5,
                x: 7.0,
                y: 68.2,
                w: 86.0,
                h: 22.0,
                label: 'git status: nothing has changed yet',
              },
            ],
          },
        ],
      },
      tip: {
        eyebrow: 'Folder tip',
        title: 'See which folder you are in first',
        text: 'The copy appears in the folder where your terminal is open. Type pwd and press Enter to see where you are before running git clone.',
        codeSnippet: 'pwd',
        copyable: true,
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two mistakes beginners make when cloning',
        text: 'Avoid these two common folder mix-ups after running git clone:',
        items: [
          {
            title: '1. Forgetting cd',
            text: 'If you forget cd my-first-project, the next Git command gives "fatal: not a git repository" because you are still outside the folder.',
          },
          {
            title: '2. Cloning inside another project folder',
            text: 'Always check pwd first so you do not accidentally download one Git repository inside another.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l24-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'What does ',
        questionCode: 'git clone',
        questionSuffix: ' do?',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Downloads a full copy of a repository',
            isCorrect: true,
            feedback:
              'Correct! git clone downloads a full copy of the repository, including its history, onto your computer.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Deletes a repository',
            isCorrect: false,
            feedback:
              'Not quite. Cloning never deletes anything—it downloads a full copy to your computer.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Creates a branch',
            isCorrect: false,
            feedback:
              'Incorrect. git clone copies an entire repository onto your computer so you can work on it.',
          },
        ],
      },
      {
        id: 'l24-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'What does ',
        questionCode: 'cd',
        questionSuffix: ' do?',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'Moves you into a folder',
            isCorrect: true,
            feedback:
              'Correct! cd stands for "change directory" and moves your terminal into the project folder.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'Copies a file',
            isCorrect: false,
            feedback:
              'Not quite. cd does not copy files—it moves your terminal into another folder.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'Commits a change',
            isCorrect: false,
            feedback:
              'Incorrect. cd moves you into a folder so you can run Git commands inside it.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 24 Complete',
      title: 'Your project is cloned to your computer!',
      description:
        'You now know how to copy your repository HTTPS link, clone it with git clone, move inside with cd, list files with ls, and check git status.',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 24 completed',
      nextUpPrefix: 'Next in Level 5: ',
      nextUpTitle: 'Add and commit',
      nextUpDuration: '5 min read',
    },
  },
  {
    id: 'add-and-commit',
    slug: 'add-and-commit',
    levelId: 'level-5',
    kind: 'concept',
    cardTitle: 'Add and commit',
    cardDescription:
      'Pick changes with git add and save clean checkpoints on your computer with git commit.',
    readTime: '5 min read',
    meta: 'Lesson 25 · Level 5 · 5 min read',
    titleStart: 'Add and ',
    titleHighlight: 'Commit',
    titleEnd: '',
    descriptionSegments: [
      {
        type: 'text',
        value: 'Use ',
      },
      { type: 'code', value: 'git add' },
      {
        type: 'text',
        value: ' to pick which changes belong in your next save point, then ',
      },
      { type: 'code', value: 'git commit' },
      {
        type: 'text',
        value: ' to save them with a message.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'Terminal · git add & commit',
      owner: 'your-computer',
      repoName: 'my-first-project',
      visibility: 'Local folder',
      commitCount: 'Staging area',
      branchName: 'main',
      branchCount: '3f9c2ab',
      addFileLabel: 'git commit -m',
      emptyTitle: 'Pack first, then seal the box',
      emptyDescription:
        'git add puts your edits into the staging area, and git commit -m "..." seals that snapshot onto your computer.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'Packing a box before you ship it',
        paragraphs: [
          'You pack a box to ship. First you put the items in, which is add. Then you seal it and write a label on the outside, which is commit.',
          'Nothing leaves your home until you also ship it, which is push—we will cover that in the next lesson!',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'git add',
        meaning: 'git add chooses which changes go into your next save point (the staging area).',
        extraTerm: 'git commit',
        extraMeaning: 'git commit saves those staged changes on your computer with a short message.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'From your folder to commit history',
        subtitle: 'Two short commands move a change from a messy draft into a permanent save point.',
        variant: 'staging-flow',
        nodes: [
          {
            label: 'Your folder',
            sublabel: 'You create or edit a file here. Git marks new ones as an untracked file.',
            tone: 'neutral',
          },
          {
            label: 'Staging area',
            sublabel: 'git add places the changes you picked into the waiting box.',
            tone: 'primary',
          },
          {
            label: 'Commit history',
            sublabel: 'git commit -m "..." seals the snapshot and gives it a commit ID.',
            tone: 'secondary',
          },
        ],
        caption:
          'You can edit five files in your folder, then add and commit only the two that belong together.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to add and commit a file in the terminal',
        subtitle:
          'Follow steps 1 to 4 inside your project folder. Press Enter after each command.',
        windowUrl: 'Terminal · my-first-project',
        screenType: 'repo-page',
        showStepList: true,
        markers: [
          {
            number: 1,
            label: 'Check what changed with git status',
            description:
              'Create a new file like hello.txt in your folder, then type git status. Git shows it in red as an untracked file.',
            xPercent: 45,
            yPercent: 28,
          },
          {
            number: 2,
            label: 'Put the file in the staging area with git add',
            description:
              'Type git add hello.txt (or git add . to stage every changed file in the folder) and press Enter.',
            xPercent: 45,
            yPercent: 44,
          },
          {
            number: 3,
            label: 'Check git status again to see it is staged',
            description:
              'Type git status and press Enter. Your file now appears in green under Changes to be committed.',
            xPercent: 45,
            yPercent: 68,
          },
          {
            number: 4,
            label: 'Save your snapshot with git commit -m',
            description:
              'Type git commit -m "Add hello.txt" and press Enter. Git saves it and prints a short commit ID.',
            xPercent: 45,
            yPercent: 80,
          },
        ],
        commands: [
          {
            id: 'l25-cmd-status',
            step: 'Step 1',
            label: 'See new or changed files in your folder',
            command: 'git status',
          },
          {
            id: 'l25-cmd-add-file',
            step: 'Step 2',
            label: 'Put one file into the staging area',
            command: 'git add hello.txt',
          },
          {
            id: 'l25-cmd-add-all',
            step: 'Shortcut',
            label: 'Or stage all changed files in the folder at once',
            command: 'git add .',
            note: 'Note the space and dot at the end',
          },
          {
            id: 'l25-cmd-commit',
            step: 'Step 4',
            label: 'Save the staged files with a message',
            command: 'git commit -m "Add hello.txt"',
          },
        ],
        screenshots: [
          {
            id: 'l5-git-add-commit',
            title: 'Adding and committing a file in the terminal',
            src: '/assets/aistudio/GIT-example-add-commit-clean_3fc1cc39.png',
            alt: 'Example terminal showing an untracked file, git add hello.txt, staged output, git commit -m, and the resulting commit ID',
            caption:
              'Example illustration: your screen may look slightly different. Press Enter after each command.',
            markers: [
              {
                n: 1,
                x: 7.0,
                y: 28.8,
                w: 86.0,
                h: 3.7,
                label: 'Untracked file: Git sees it but is not tracking it yet',
              },
              {
                n: 2,
                x: 7.0,
                y: 44.5,
                w: 86.0,
                h: 3.7,
                label: 'git add: put the file in the staging area',
              },
              {
                n: 3,
                x: 7.0,
                y: 68.1,
                w: 86.0,
                h: 3.7,
                label: 'Staged: the file is ready to be committed',
              },
              {
                n: 4,
                x: 7.0,
                y: 75.9,
                w: 86.0,
                h: 3.7,
                label: 'git commit: save it, with a message after -m',
              },
              {
                n: 5,
                x: 7.0,
                y: 79.8,
                w: 86.0,
                h: 11.5,
                label: 'Result: the commit ID and what changed',
              },
            ],
          },
        ],
      },
      tip: {
        eyebrow: 'Handy shortcut',
        title: 'Use a dot to add all changed files at once',
        text: 'If you edited several files and want to put all of them into the staging area together, type git add . (with a space and a single dot) and press Enter.',
        codeSnippet: 'git add .',
        copyable: true,
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two things that surprise people when committing',
        text: 'Do not panic if either of these happens—they take only a second to fix:',
        items: [
          {
            title: '1. Forgetting -m "..." (stuck in a text editor!)',
            text: 'If you type git commit without -m, a text editor opens inside the terminal. To leave it cleanly: in Nano press Ctrl+O, Enter, then Ctrl+X. In Vim press Esc, type :q!, and press Enter.',
          },
          {
            title: '2. Forgetting git add before git commit',
            text: 'If Git says "nothing added to commit", you have not packed the box yet. Run git add hello.txt (or git add .) first, then commit again.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l25-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'Which command puts changes into the ',
        questionSuffix: 'staging area?',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'git add',
            isCorrect: true,
            feedback:
              'Correct! git add places the files you choose into the staging area so they are ready for your next commit.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'git pull',
            isCorrect: false,
            feedback:
              'Not quite. git pull brings changes down from GitHub—git add stages files on your computer.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'git clone',
            isCorrect: false,
            feedback:
              'Incorrect. git clone downloads a repository once; git add puts changed files into the staging area.',
          },
        ],
      },
      {
        id: 'l25-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'What is ',
        questionCode: '-m',
        questionSuffix: ' for in git commit -m "Add file"?',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'To write the commit message directly in the command',
            isCorrect: true,
            feedback:
              'Correct! -m lets you pass your short commit message right on the command line so an editor does not pop up.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'To delete the file',
            isCorrect: false,
            feedback:
              'Not quite. -m stands for "message" so you can write your commit note right away.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'To merge a branch',
            isCorrect: false,
            feedback:
              'Incorrect. In git commit -m "...", -m is short for message.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 25 Complete',
      title: 'You saved your first local commit!',
      description:
        'You now know how to check git status, stage files with git add, and save a snapshot with git commit -m "...". Next, let us send it up to GitHub!',
      ctaLabel: 'Back to Roadmap',
      completedCtaLabel: 'Lesson 25 completed',
      nextUpPrefix: 'Next in Level 5: ',
      nextUpTitle: 'Push and pull',
      nextUpDuration: '5 min read',
    },
  },
  {
    id: 'push-and-pull',
    slug: 'push-and-pull',
    levelId: 'level-5',
    kind: 'concept',
    cardTitle: 'Push and pull',
    cardDescription:
      'Send your local commits up to GitHub with git push and fetch newer updates with git pull.',
    readTime: '5 min read',
    meta: 'Lesson 26 · Level 5 · 5 min read',
    titleStart: 'Push and ',
    titleHighlight: 'Pull',
    titleEnd: '',
    descriptionSegments: [
      {
        type: 'text',
        value: 'Use ',
      },
      { type: 'code', value: 'git push' },
      {
        type: 'text',
        value: ' to send your commits up to GitHub, and ',
      },
      { type: 'code', value: 'git pull' },
      {
        type: 'text',
        value: ' to bring newer updates down to your computer.',
      },
    ],
    primaryCtaLabel: 'Start reading',
    secondaryCtaLabel: 'Jump to quiz',
    heroMockup: {
      url: 'Terminal · git push & pull',
      owner: 'your-computer',
      repoName: 'my-first-project',
      visibility: 'Connected to origin',
      commitCount: 'Synced',
      branchName: 'main',
      branchCount: 'main -> main',
      addFileLabel: 'git push',
      emptyTitle: 'Ship your commits and fetch new ones',
      emptyDescription:
        'git push uploads your saved commits to GitHub, while git pull downloads newer work from GitHub to your folder.',
    },
    progressSteps: [
      { id: 'story', number: '01', label: 'The story', targetId: 'concept-story' },
      { id: 'meaning', number: '02', label: 'Meaning', targetId: 'concept-meaning' },
      { id: 'diagram', number: '03', label: 'Diagram', targetId: 'concept-diagram' },
      { id: 'where', number: '04', label: 'Where to find', targetId: 'concept-where' },
      { id: 'verify', number: '05', label: 'Quiz', targetId: 'quick-check' },
    ],
    concept: {
      story: {
        eyebrow: 'Real-life story',
        title: 'Sending letters out and checking your mailbox',
        paragraphs: [
          'Remember how committing is like sealing a box on your desk at home? Nobody else can see what is inside yet.',
          'Pushing is dropping your box at the post office so it reaches the shared shelf on GitHub. Pulling is opening your mailbox to bring home any new updates your friends posted while you worked.',
        ],
      },
      oneLineMeaning: {
        eyebrow: 'One-line meaning',
        term: 'git push',
        meaning: 'git push sends your saved commits from your computer up to your remote on GitHub.',
        extraTerm: 'git pull',
        extraMeaning: 'git pull downloads newer commits from GitHub down to your computer.',
      },
      diagram: {
        eyebrow: 'Simple diagram',
        title: 'How your computer and GitHub stay in sync',
        subtitle: 'One command sends your work up, and one brings your team’s work down.',
        variant: 'repo-box',
        nodes: [
          {
            label: '1. Commit at home',
            sublabel: 'Save your snapshots on your computer first with git add and git commit.',
            tone: 'neutral',
          },
          {
            label: '2. git push → GitHub',
            sublabel: 'Sends your new local commits up to the online remote repository.',
            tone: 'primary',
          },
          {
            label: '3. git pull ← GitHub',
            sublabel: 'Brings any newer commits from GitHub down into your local folder.',
            tone: 'secondary',
          },
        ],
        caption:
          'Good habit: run git pull before you start working so your computer starts with the latest files.',
      },
      whereToFind: {
        eyebrow: 'Where to find it',
        title: 'How to push and pull in the terminal',
        subtitle:
          'Run these inside your project folder. Press Enter after each command.',
        windowUrl: 'Terminal · my-first-project',
        screenType: 'repo-page',
        showStepList: true,
        markers: [
          {
            number: 1,
            label: 'Send your saved commits with git push',
            description:
              'Type git push and press Enter. On your very first push, GitHub may open a browser window to sign in (or ask for a personal access token instead of your password).',
            xPercent: 45,
            yPercent: 20,
          },
          {
            number: 2,
            label: 'Confirm the push worked',
            description:
              'Look for a line like main -> main. Refresh your GitHub repository page in your browser to see your new files!',
            xPercent: 45,
            yPercent: 62,
          },
          {
            number: 3,
            label: 'Bring down new updates with git pull',
            description:
              'Type git pull and press Enter to download newer changes from GitHub. If nothing is new, it says "Already up to date."',
            xPercent: 45,
            yPercent: 78,
          },
          {
            number: 4,
            label: 'If a push is rejected, pull first then push again',
            description:
              'If someone else (or you in the browser) added commits on GitHub, Git rejects the push to keep both safe. Run git pull first, then run git push again.',
            xPercent: 45,
            yPercent: 52,
          },
        ],
        commands: [
          {
            id: 'l26-cmd-push',
            step: 'Push',
            label: 'Send your committed work up to GitHub',
            command: 'git push',
          },
          {
            id: 'l26-cmd-pull',
            step: 'Pull',
            label: 'Bring newer changes from GitHub down to your computer',
            command: 'git pull',
          },
          {
            id: 'l26-cmd-new-branch',
            step: 'New branch',
            label: 'Create and switch to a new branch on your computer',
            command: 'git switch -c my-experiment',
          },
          {
            id: 'l26-cmd-push-upstream',
            step: 'First branch push',
            label: 'Push a brand-new branch to GitHub for the first time',
            command: 'git push -u origin my-experiment',
            note: 'After this once, plain git push works on that branch',
          },
        ],
        screenshots: [
          {
            id: 'l5-git-push-pull',
            title: 'Pushing and pulling in the terminal',
            src: '/assets/aistudio/GIT-example-push-pull-clean_fb7ce03c.png',
            alt: 'Example terminal showing git push output main -> main and git pull Already up to date',
            caption:
              'Example illustration: your screen may look slightly different. Press Enter after each command.',
            markers: [
              {
                n: 1,
                x: 7.0,
                y: 19.1,
                w: 86.0,
                h: 5.3,
                label: 'git push: send your commits to GitHub',
              },
              {
                n: 2,
                x: 7.0,
                y: 59.2,
                w: 86.0,
                h: 5.3,
                label: 'Where your commits went',
              },
              {
                n: 3,
                x: 7.0,
                y: 64.9,
                w: 86.0,
                h: 5.3,
                label: 'main -> main: the push worked',
              },
              {
                n: 4,
                x: 7.0,
                y: 76.3,
                w: 86.0,
                h: 5.3,
                label: 'git pull: bring new work from GitHub',
              },
              {
                n: 5,
                x: 7.0,
                y: 82.1,
                w: 86.0,
                h: 5.3,
                label: 'Already up to date: nothing new to bring',
              },
            ],
          },
          {
            id: 'l5-git-push-rejected',
            title: 'If the push is rejected',
            src: '/assets/aistudio/GIT-example-push-rejected-clean_52a49b8e.png',
            alt: 'Example terminal showing a rejected git push error and hint to run git pull before pushing again',
            caption:
              'Example illustration: your screen may look slightly different. Pull first so your folder has GitHub’s newer commits, then push again.',
            markers: [
              {
                n: 1,
                x: 7.0,
                y: 42.8,
                w: 86.0,
                h: 7.5,
                label: 'Rejected: GitHub has newer work than your computer',
              },
              {
                n: 2,
                x: 7.0,
                y: 50.8,
                w: 86.0,
                h: 7.5,
                label: 'Error: your push did not go through',
              },
              {
                n: 3,
                x: 7.0,
                y: 58.8,
                w: 86.0,
                h: 23.5,
                label: 'Hint: pull first, then push again',
              },
            ],
          },
        ],
      },
      tip: {
        eyebrow: 'First-time sign-in & new branches',
        title: 'Browser sign-in, tokens, and pushing a new branch',
        text: 'If Git asks you to sign in the first time you push, use the browser window that opens or paste a personal access token (your normal GitHub password will not work). And if you created a new branch on your computer, link it to GitHub once with git push -u origin your-branch-name.',
        codeSnippet: 'git push -u origin my-experiment',
        copyable: true,
      },
      commonMistake: {
        eyebrow: 'Common mistakes',
        title: 'Two common surprises when pushing',
        text: 'Both of these messages are completely normal and easy to fix:',
        items: [
          {
            title: '1. Typing your regular GitHub password',
            text: 'If you see "Authentication failed", remember GitHub passwords no longer work in the terminal. Use the browser sign-in popup or paste a personal access token.',
          },
          {
            title: '2. Pushing before pulling newer changes',
            text: 'If Git says "rejected" because GitHub has newer commits, do not worry—nothing is lost. Run git pull first, then run git push again.',
          },
        ],
      },
    },
    quizzes: [
      {
        id: 'l26-q1',
        eyebrow: 'Question 1 of 2',
        questionPrefix: 'Which command sends your commits up to GitHub?',
        questionSuffix: '',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'git push',
            isCorrect: true,
            feedback:
              'Correct! git push uploads your saved commits from your computer to your remote repository on GitHub.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'git pull',
            isCorrect: false,
            feedback:
              'Not quite. git pull brings changes down from GitHub—git push sends your commits up.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'git add',
            isCorrect: false,
            feedback:
              'Incorrect. git add stages changes on your computer; git push sends saved commits up to GitHub.',
          },
        ],
      },
      {
        id: 'l26-q2',
        eyebrow: 'Question 2 of 2',
        questionPrefix: 'If ',
        questionCode: 'git push',
        questionSuffix: ' is rejected because GitHub has newer work, what should you run first?',
        options: [
          {
            id: 'a',
            labelPrefix: 'A)',
            text: 'git pull',
            isCorrect: true,
            feedback:
              'Correct! Run git pull to bring GitHub’s newer commits onto your computer first, then run git push again.',
          },
          {
            id: 'b',
            labelPrefix: 'B)',
            text: 'git init',
            isCorrect: false,
            feedback:
              'Not quite. Running git pull brings the newer commits from GitHub so you can push cleanly.',
          },
          {
            id: 'c',
            labelPrefix: 'C)',
            text: 'git version',
            isCorrect: false,
            feedback:
              'Incorrect. Run git pull first to fetch and combine the newer commits from GitHub, then push again.',
          },
        ],
      },
    ],
    completion: {
      eyebrow: 'Lesson 26 Complete',
      title: 'You can push and pull with Git!',
      description:
        'You have completed every single lesson in GitStart—from creating your first browser repository all the way to committing, pushing, and pulling from your own computer.',
      ctaLabel: 'Finish GitStart',
      completedCtaLabel: 'Lesson 26 completed',
      nextUpPrefix: 'Final milestone: ',
      nextUpTitle: 'You finished GitStart',
      nextUpDuration: 'All 5 levels complete',
    },
  },
];

export const cheatSheetData = {
  title: 'Beginner GitHub Cheat Sheet',
  subtitle: 'Essential browser actions and Markdown syntax at a glance.',
  browserActions: [
    {
      action: 'Create a file',
      where: 'Add file → Create new file',
      note: 'Creates a new text or Markdown file directly on GitHub.',
    },
    {
      action: 'Save a snapshot',
      where: 'Commit changes',
      note: 'Records your edits with a short title describing what changed.',
    },
    {
      action: 'Create a branch',
      where: 'main dropdown → Find or create',
      note: 'Creates a safe parallel timeline without changing main.',
    },
  ],
  markdownBasics: [
    { syntax: '# Heading 1', meaning: 'Large page title' },
    { syntax: '## Heading 2', meaning: 'Section subheading' },
    { syntax: '**bold text**', meaning: 'Strong emphasis' },
    { syntax: '- List item', meaning: 'Bulleted list' },
    { syntax: '[Link](https://...)', meaning: 'Clickable hyperlink' },
  ],
};
