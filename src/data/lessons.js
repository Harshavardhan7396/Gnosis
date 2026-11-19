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
      'Your own personal copy of someone else’s public repository saved under your GitHub account.',
    analogy: 'Copying a friend’s recipe card into your own box so you can adjust it freely.',
    whereToFind:
      'Click the Fork button in the top-right corner of another person’s repository page.',
    lessonId: 'what-is-repository',
  },
  clone: {
    key: 'clone',
    term: 'Clone',
    meaning:
      'Downloading a complete copy of a GitHub repository onto your own computer so you can work offline.',
    analogy: 'Saving an entire shared cloud folder onto your laptop so everything stays synced.',
    whereToFind:
      'Click the green <> Code button above a repository file list to copy its download link.',
    lessonId: 'what-is-repository',
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
      'A note or task card used to report a problem, ask a question, or suggest an improvement for a project.',
    analogy: 'Pinning a clear sticky note to a shared project board so nobody forgets a task.',
    whereToFind:
      'Click the Issues tab right next to Code at the top of any repository page.',
    lessonId: 'what-is-repository',
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
      'Find your way around every tab at the top of a GitHub repository without guessing what anything is for.',
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
          },
          {
            number: 7,
            label: 'Review the green and red lines, then click "Merge pull request"',
            description:
              'The owner checks the changes—green lines were added, red lines were removed—then clicks "Merge pull request" and confirms.',
            xPercent: 77,
            yPercent: 79,
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
    comingSoon: true,
    cardTitle: 'Fork and clone',
    cardDescription:
      'Make your own personal copy of someone else’s repository and download it safely.',
    readTime: 'Coming soon',
  },
  {
    id: 'issues',
    slug: 'issues',
    levelId: 'level-2',
    comingSoon: true,
    cardTitle: 'Issues',
    cardDescription:
      'Report bugs, ask questions, and keep track of to-do tasks on a shared board.',
    readTime: 'Coming soon',
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
    id: 'code-tab',
    slug: 'code-tab',
    levelId: 'level-3',
    comingSoon: true,
    cardTitle: 'Code tab',
    cardDescription:
      'Browse folders, switch branches, read the README, and check recent commit history.',
    readTime: 'Coming soon',
  },
  {
    id: 'issues-tab',
    slug: 'issues-tab',
    levelId: 'level-3',
    comingSoon: true,
    cardTitle: 'Issues tab',
    cardDescription:
      'Filter open questions, read labels, and open clear bug reports or feature requests.',
    readTime: 'Coming soon',
  },
  {
    id: 'pull-requests-tab',
    slug: 'pull-requests-tab',
    levelId: 'level-3',
    comingSoon: true,
    cardTitle: 'Pull requests tab',
    cardDescription:
      'Compare proposed edits side by side, leave helpful comments, and follow reviews.',
    readTime: 'Coming soon',
  },
  {
    id: 'actions-tab',
    slug: 'actions-tab',
    levelId: 'level-3',
    comingSoon: true,
    cardTitle: 'Actions tab',
    cardDescription:
      'Watch automated checks run tests and builds whenever files are updated.',
    readTime: 'Coming soon',
  },
  {
    id: 'projects-tab',
    slug: 'projects-tab',
    levelId: 'level-3',
    comingSoon: true,
    cardTitle: 'Projects tab',
    cardDescription:
      'Organize issues and pull requests into simple kanban boards, tables, and checklists.',
    readTime: 'Coming soon',
  },
  {
    id: 'wiki-tab',
    slug: 'wiki-tab',
    levelId: 'level-3',
    comingSoon: true,
    cardTitle: 'Wiki tab',
    cardDescription:
      'Write and organize multi-page project handbooks that go deeper than a single README.',
    readTime: 'Coming soon',
  },
  {
    id: 'security-tab',
    slug: 'security-tab',
    levelId: 'level-3',
    comingSoon: true,
    cardTitle: 'Security tab',
    cardDescription:
      'Spot dependency safety alerts, security policies, and private vulnerability reports.',
    readTime: 'Coming soon',
  },
  {
    id: 'insights-tab',
    slug: 'insights-tab',
    levelId: 'level-3',
    comingSoon: true,
    cardTitle: 'Insights tab',
    cardDescription:
      'View contributor charts, commit pulse, network graphs, and repository activity.',
    readTime: 'Coming soon',
  },
  {
    id: 'settings-tab',
    slug: 'settings-tab',
    levelId: 'level-3',
    comingSoon: true,
    cardTitle: 'Settings tab',
    cardDescription:
      'Rename your repository, invite collaborators, adjust visibility, and configure options.',
    readTime: 'Coming soon',
  },

  // =========================================================================
  // LEVEL 4: Extras
  // =========================================================================
  {
    id: 'releases',
    slug: 'releases',
    levelId: 'level-4',
    comingSoon: true,
    cardTitle: 'Releases',
    cardDescription:
      'Package finished milestones with version tags, release notes, and downloadable ZIP files.',
    readTime: 'Coming soon',
  },
  {
    id: 'github-pages',
    slug: 'github-pages',
    levelId: 'level-4',
    comingSoon: true,
    cardTitle: 'GitHub Pages',
    cardDescription:
      'Turn files inside a repository into a free, live website hosted right on GitHub.',
    readTime: 'Coming soon',
  },
  {
    id: 'gists',
    slug: 'gists',
    levelId: 'level-4',
    comingSoon: true,
    cardTitle: 'Gists',
    cardDescription:
      'Save and share a single note, checklist, or snippet without creating a full repository.',
    readTime: 'Coming soon',
  },
  {
    id: 'profile-readme',
    slug: 'profile-readme',
    levelId: 'level-4',
    comingSoon: true,
    cardTitle: 'Profile README',
    cardDescription:
      'Create a custom welcome introduction pinned at the top of your personal GitHub profile.',
    readTime: 'Coming soon',
  },

  // =========================================================================
  // LEVEL 5: On your computer
  // =========================================================================
  {
    id: 'install-git',
    slug: 'install-git',
    levelId: 'level-5',
    comingSoon: true,
    cardTitle: 'Install Git',
    cardDescription:
      'Set up Git on Windows, Mac, or Linux and introduce your name and email once.',
    readTime: 'Coming soon',
  },
  {
    id: 'clone-local',
    slug: 'clone-local',
    levelId: 'level-5',
    comingSoon: true,
    cardTitle: 'Clone',
    cardDescription:
      'Download an online repository into a real folder on your computer so you can edit locally.',
    readTime: 'Coming soon',
  },
  {
    id: 'add-and-commit',
    slug: 'add-and-commit',
    levelId: 'level-5',
    comingSoon: true,
    cardTitle: 'Add and commit',
    cardDescription:
      'Stage your changed files on your laptop and save clean offline commit checkpoints.',
    readTime: 'Coming soon',
  },
  {
    id: 'push-and-pull',
    slug: 'push-and-pull',
    levelId: 'level-5',
    comingSoon: true,
    cardTitle: 'Push and pull',
    cardDescription:
      'Upload your local commits up to GitHub and bring down newer updates from your team.',
    readTime: 'Coming soon',
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
