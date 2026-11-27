/**
 * Extensible list of beginner troubleshooting situations for the "Where am I stuck?" page.
 * To add a new situation, append an object following the same structure:
 *   id, title, summary, whatIsHappening, whyItHappens, screenType, windowUrl, steps
 */
export const stuckSituations = [
  {
    id: 'cant-find-add-file',
    title: "I can't find the Add file button",
    summary: 'Look inside your repository Code tab while signed into your own project.',
    whatIsHappening:
      'You are looking at a GitHub page, and the "Add file" button is missing from where you expected to see it.',
    whyItHappens:
      'The "Add file" button only shows up inside the Code tab of a repository that you have permission to edit. If you are on your home dashboard, inside Settings, signed out, or viewing someone else\'s repository, GitHub hides that button.',
    screenType: 'repo-toolbar',
    windowUrl: 'github.com/alex-dev/my-first-project',
    steps: [
      {
        number: 1,
        label: 'Make sure you are on the Code tab',
        description:
          'Look near the top-left of your repository and click "<> Code". You will not see "Add file" while viewing Issues or Settings.',
        xPercent: 18,
        yPercent: 25,
      },
      {
        number: 2,
        label: 'Look to the right of the branch button',
        description:
          'Find the branch selector (usually "main") above the file list, then look straight across to the right for "Add file".',
        xPercent: 78,
        yPercent: 48,
      },
      {
        number: 3,
        label: 'Check that this is your own repository',
        description:
          'Look at the owner name at the top-left. If it belongs to someone else, click "Fork" first to make your own copy before adding files.',
        xPercent: 52,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'cant-add-image-commit-box',
    title: "I can't add an image in the commit box",
    summary: 'Commit boxes only hold short text notes — upload images as files first.',
    whatIsHappening:
      'You are trying to paste or attach a picture inside the "Commit changes" message box, and nothing is happening.',
    whyItHappens:
      'A commit message is only a short text label that describes what you changed. GitHub keeps image files in the repository folder itself, separate from the commit note.',
    screenType: 'commit-box',
    windowUrl: 'github.com/alex-dev/my-first-project',
    steps: [
      {
        number: 1,
        label: 'Click "Add file" on the repository page',
        description:
          'Go back to the "<> Code" tab of your repository and open the "Add file" dropdown above the file list.',
        xPercent: 78,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'Choose "Upload files"',
        description:
          'Click "Upload files" in the dropdown menu, then drag your image file from your computer onto the page.',
        xPercent: 74,
        yPercent: 41,
      },
      {
        number: 3,
        label: 'Write a short text commit message',
        description:
          'Once the image finishes uploading, type a short plain-text note like "Add team photo" in the commit box and save.',
        xPercent: 28,
        yPercent: 74,
      },
    ],
  },
  {
    id: 'commit-not-showing',
    title: "My commit isn't showing",
    summary: 'Check which branch you are viewing or open the commits history list.',
    whatIsHappening:
      'You pressed "Commit changes" a moment ago, but the new file or edit does not seem to be in your file list.',
    whyItHappens:
      'Most of the time, the commit was saved on a different branch (like "my-experiment" instead of "main"), or the page has not refreshed yet. GitHub never deletes a saved commit on its own.',
    screenType: 'commit-missing',
    windowUrl: 'github.com/alex-dev/my-first-project/tree/main',
    steps: [
      {
        number: 1,
        label: 'Check the branch dropdown at the top-left',
        description:
          'Click the branch button (such as "main") and switch to any other branch you worked on to see if your commit is there.',
        xPercent: 20,
        yPercent: 24,
      },
      {
        number: 2,
        label: 'Open the Commits history counter',
        description:
          'Click the clock icon labeled "Commits" on the right side above the file list to see every save point in order.',
        xPercent: 80,
        yPercent: 24,
      },
      {
        number: 3,
        label: 'Look at the latest commit line and refresh',
        description:
          'Check the commit message bar just above the files. If it looks outdated, refresh the browser tab once.',
        xPercent: 45,
        yPercent: 54,
      },
    ],
  },
  {
    id: 'dont-know-which-branch',
    title: "I don't know which branch I'm on",
    summary: 'Read the branch button on the top-left or check the web address.',
    whatIsHappening:
      'You are looking at files in a repository and are not sure whether you are editing the main branch or a test branch.',
    whyItHappens:
      'Every branch looks almost identical at first glance because they share the same repository layout. GitHub shows the active branch name in two quiet places.',
    screenType: 'branch-indicator',
    windowUrl: 'github.com/alex-dev/my-first-project/tree/my-experiment',
    steps: [
      {
        number: 1,
        label: 'Look at the end of the page address',
        description:
          'When you are on a branch, the web address often ends with "/tree/" followed by the branch name, like "/tree/my-experiment".',
        xPercent: 78,
        yPercent: 16,
      },
      {
        number: 2,
        label: 'Read the branch button above the file list',
        description:
          'The button with the small fork-like branch icon always displays the name of the branch you are currently viewing.',
        xPercent: 25,
        yPercent: 39,
      },
      {
        number: 3,
        label: 'Click it to see the checkmark',
        description:
          'Opening the branch menu puts a checkmark next to your active branch and lets you switch back to "main" anytime.',
        xPercent: 36,
        yPercent: 68,
      },
    ],
  },
  {
    id: 'made-mistake-in-file',
    title: 'I made a mistake in my file',
    summary: 'Open the file, click the pencil icon to edit it, and save a new commit.',
    whatIsHappening:
      'You committed a file and then spotted a typo, wrong line, or mistake inside it.',
    whyItHappens:
      'Making small mistakes after saving is completely normal. Git keeps every old version safe, so fixing a mistake is just making one more clean commit.',
    screenType: 'file-mistake',
    windowUrl: 'github.com/alex-dev/my-first-project/blob/main/README.md',
    steps: [
      {
        number: 1,
        label: 'Click the file name to open it',
        description:
          'From the repository file list, click the name of the file you want to fix (for example, README.md).',
        xPercent: 30,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'Click the pencil icon to edit',
        description:
          'Near the top-right of the file box, click the small pencil icon ("Edit this file") to open the text editor.',
        xPercent: 78,
        yPercent: 39,
      },
      {
        number: 3,
        label: 'Fix the text and commit again',
        description:
          'Correct your lines, click "Commit changes", and write a clear commit message like "Fix typo in README".',
        xPercent: 74,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'cant-find-repository',
    title: "I can't find my repository",
    summary: 'Open your profile menu and click "Your repositories" to see everything.',
    whatIsHappening:
      'You signed into GitHub and want to get back to a project you made earlier, but it is not obvious on the screen.',
    whyItHappens:
      'GitHub opens on a busy Home activity feed, which can push older projects out of sight. Your full repository list lives one click away under your profile menu.',
    screenType: 'find-repo',
    windowUrl: 'github.com',
    steps: [
      {
        number: 1,
        label: 'Click your round profile picture',
        description:
          'Look in the very top-right corner of GitHub and click your profile circle to open your account menu.',
        xPercent: 88,
        yPercent: 18,
      },
      {
        number: 2,
        label: 'Select "Your repositories"',
        description:
          'Click "Your repositories" in the menu to see every project you have created or forked, newest first.',
        xPercent: 72,
        yPercent: 44,
      },
      {
        number: 3,
        label: 'Or check "Top repositories" on the left',
        description:
          'On the Home screen, the left sidebar also lists your recent projects under "Top repositories" with a quick search box.',
        xPercent: 24,
        yPercent: 64,
      },
    ],
  },
  {
    id: 'cant-see-compare-pr-button',
    title: "I can't see the Compare & pull request button",
    summary: 'Open the Pull requests tab and click New pull request to start one anytime.',
    whatIsHappening:
      'You want to open a pull request, but the yellow banner with the green "Compare & pull request" button is not on your repository page.',
    whyItHappens:
      'The quick banner only shows up right after a recent push to a branch. If some time has passed or you closed the banner, GitHub hides it—but you can still open a pull request manually.',
    screenType: 'pr-no-banner',
    windowUrl: 'github.com/alex-dev/my-first-project/pulls',
    steps: [
      {
        number: 1,
        label: 'Open the Pull requests tab',
        description:
          'Click "Pull requests" along the top bar of your repository, right beside Code and Issues.',
        xPercent: 40,
        yPercent: 25,
      },
      {
        number: 2,
        label: 'Click the green "New pull request" button',
        description:
          'Look near the top-right of the Pull requests page and click "New pull request".',
        xPercent: 78,
        yPercent: 45,
      },
      {
        number: 3,
        label: 'Pick your base and compare branches',
        description:
          'Choose main as your base branch and select your edited branch in the compare box.',
        xPercent: 46,
        yPercent: 74,
      },
    ],
  },
  {
    id: 'nothing-to-compare',
    title: "It says there isn't anything to compare",
    summary: 'Make sure the two branches are different and your branch has at least one new commit.',
    whatIsHappening:
      'You started a new pull request, and GitHub shows the message "There isn\'t anything to compare."',
    whyItHappens:
      'This happens when the base and compare boxes point to the exact same branch (like main vs. main), or when your compare branch has no new commits yet compared to base.',
    screenType: 'pr-nothing-to-compare',
    windowUrl: 'github.com/alex-dev/my-first-project/compare',
    steps: [
      {
        number: 1,
        label: 'Check the base branch box',
        description:
          'Make sure the left box ("base") is set to the branch that will receive the changes, usually main.',
        xPercent: 28,
        yPercent: 30,
      },
      {
        number: 2,
        label: 'Pick a different branch in compare',
        description:
          'Make sure the right box ("compare") is set to your edited branch, not main as well.',
        xPercent: 68,
        yPercent: 30,
      },
      {
        number: 3,
        label: 'Confirm your branch has at least one commit',
        description:
          'If both branches already match, edit a file and save a commit on your branch first so there is something new to compare.',
        xPercent: 50,
        yPercent: 74,
      },
    ],
  },
  {
    id: 'merge-button-grey-disabled',
    title: 'The Merge button is grey or disabled',
    summary: 'Read the status box right above or under the button to see what is missing.',
    whatIsHappening:
      'Your pull request is open, and you want to finish it, but the "Merge pull request" button is greyed out and will not click.',
    whyItHappens:
      'The repository may require someone else to approve a review first, automated checks may still be running, or your branch may have a conflict where two people changed the same lines.',
    screenType: 'pr-merge-disabled',
    windowUrl: 'github.com/alex-dev/my-first-project/pull/1',
    steps: [
      {
        number: 1,
        label: 'Read the status box above the button',
        description:
          'GitHub explains why merging is blocked right there—for example, "Review required" or "This branch has conflicts".',
        xPercent: 36,
        yPercent: 34,
      },
      {
        number: 2,
        label: 'Wait for review or checks if requested',
        description:
          'If a review is needed, ask a teammate to open "Files changed" and click Approve. Wait a moment if checks are still running.',
        xPercent: 76,
        yPercent: 52,
      },
      {
        number: 3,
        label: 'Fix any listed conflict before merging',
        description:
          'If GitHub mentions a conflict, click "Resolve conflicts" beside the message to pick which lines to keep.',
        xPercent: 76,
        yPercent: 77,
      },
    ],
  },
  {
    id: 'cant-see-issues-tab',
    title: "I can't see the Issues tab",
    summary: 'Open repository Settings and make sure Issues is ticked under Features.',
    whatIsHappening:
      'You are looking at the top bar of a repository, and the "Issues" tab next to Code is missing.',
    whyItHappens:
      'The repository owner may have turned Issues off, or you may be looking at a fork. GitHub turns Issues off by default on forked repositories.',
    screenType: 'issues-tab-missing',
    windowUrl: 'github.com/alex-dev/my-first-project/settings',
    steps: [
      {
        number: 1,
        label: 'Open the repository Settings tab',
        description:
          'If this is your own repository, click "Settings" on the far right of the top bar.',
        xPercent: 84,
        yPercent: 22,
      },
      {
        number: 2,
        label: 'Scroll to the Features list and tick Issues',
        description:
          'Find the "Features" section on the main Settings page and check the box next to "Issues".',
        xPercent: 32,
        yPercent: 62,
      },
      {
        number: 3,
        label: 'Check if you are viewing a fork',
        description:
          'Forks have Issues turned off by default. If you want to report a problem on the original project, click the link to the original repository under the project name.',
        xPercent: 38,
        yPercent: 86,
      },
    ],
  },
  {
    id: 'cant-assign-someone',
    title: "I can't assign someone",
    summary: 'You can only assign people who have access to the repository.',
    whatIsHappening:
      'You open the Assignees menu on an issue and type a friend’s username, but their name does not show up or cannot be clicked.',
    whyItHappens:
      'For safety, GitHub only lets you assign people who already have access to work on that repository (such as collaborators or someone who commented on the issue).',
    screenType: 'issue-assign-someone',
    windowUrl: 'github.com/alex-dev/my-first-project/issues/new',
    steps: [
      {
        number: 1,
        label: 'Click Assignees on the right sidebar',
        description:
          'Look at the right side of the issue and click the gear or header labeled "Assignees".',
        xPercent: 78,
        yPercent: 28,
      },
      {
        number: 2,
        label: 'Pick someone from the repository list',
        description:
          'You can assign yourself ("Assign yourself") or anyone already added as a collaborator on the repository.',
        xPercent: 78,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'Ask the owner to invite your teammate',
        description:
          'If your friend does not appear, ask the repository owner to open Settings → Collaborators and invite them first.',
        xPercent: 34,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'closed-issue-by-mistake',
    title: 'I closed an issue by mistake',
    summary: 'Open the closed issue and click Reopen issue to bring it back.',
    whatIsHappening:
      'You clicked "Close issue" too soon, and now the issue disappeared from the main Open list.',
    whyItHappens:
      'Closing an issue does not delete it—GitHub simply moves it into the Closed list to keep the Open list tidy.',
    screenType: 'issue-closed-mistake',
    windowUrl: 'github.com/alex-dev/my-first-project/issues/3',
    steps: [
      {
        number: 1,
        label: 'Click the Closed filter on the Issues tab',
        description:
          'On the Issues page, click "Closed" right next to "Open" so you can see finished and closed notes.',
        xPercent: 35,
        yPercent: 22,
      },
      {
        number: 2,
        label: 'Open the issue you closed',
        description:
          'Click the title of the issue you want back to open its conversation page.',
        xPercent: 38,
        yPercent: 46,
      },
      {
        number: 3,
        label: 'Click Reopen issue at the bottom',
        description:
          'Scroll down below the comment box and click "Reopen issue". It moves right back to Open.',
        xPercent: 76,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'cant-find-fork-button',
    title: "I can't find the Fork button",
    summary: 'Look at the top right of the repository page, or widen your browser window.',
    whatIsHappening:
      'You opened someone else’s repository to make your own copy, and you cannot see the "Fork" button.',
    whyItHappens:
      'The Fork button sits near the top right of the repository page, next to Watch and Star. On a narrow phone or small window, GitHub can tuck those buttons out of view.',
    screenType: 'fork-button-missing',
    windowUrl: 'github.com/original-owner/sample-project',
    steps: [
      {
        number: 1,
        label: 'Check the top-right bar of the repository',
        description:
          'Look across the top row from the repository name for Pin, Watch, Fork, and Star.',
        xPercent: 78,
        yPercent: 25,
      },
      {
        number: 2,
        label: 'Widen the window or switch to a computer',
        description:
          'On a narrow screen, widen your browser window or open the page on a laptop or desktop so the top-right buttons appear clearly.',
        xPercent: 50,
        yPercent: 56,
      },
      {
        number: 3,
        label: 'Make sure you are signed in',
        description:
          'If you are signed out, sign in to your GitHub account first so GitHub knows where to save your copy.',
        xPercent: 86,
        yPercent: 84,
      },
    ],
  },
  {
    id: 'no-fork-button-own-repo',
    title: 'There is no Fork button on my own repository',
    summary: 'You cannot fork your own project—edit it directly instead.',
    whatIsHappening:
      'You are looking at a repository that belongs to your own account, and the Fork button is missing or cannot be clicked.',
    whyItHappens:
      'You only fork someone else’s repository. Because you already own this project, you do not need a separate copy—you can edit files or create a branch directly.',
    screenType: 'fork-own-repo',
    windowUrl: 'github.com/your-username/my-first-project',
    steps: [
      {
        number: 1,
        label: 'Check the owner name at the top left',
        description:
          'Notice that the name before the slash is your own username, so this repository is already yours.',
        xPercent: 26,
        yPercent: 24,
      },
      {
        number: 2,
        label: 'Edit files directly or open a branch',
        description:
          'Use "Add file" or open the branch dropdown to make a new branch like my-experiment instead of forking.',
        xPercent: 72,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'Fork only on other people’s projects',
        description:
          'Visit a repository whose address starts with someone else’s name when you want to use Fork.',
        xPercent: 48,
        yPercent: 84,
      },
    ],
  },
  {
    id: 'already-have-fork',
    title: 'GitHub says I already have a fork',
    summary: 'Open your repositories list, because your copy already exists.',
    whatIsHappening:
      'You clicked Fork on someone else’s repository, and GitHub tells you that you already forked it.',
    whyItHappens:
      'You forked this project earlier, so GitHub already created a copy under your account instead of making a second one.',
    screenType: 'fork-already-exists',
    windowUrl: 'github.com/original-owner/sample-project/fork',
    steps: [
      {
        number: 1,
        label: 'Click your profile picture in the top right',
        description:
          'Open your account menu in the top-right corner of GitHub.',
        xPercent: 86,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'Open "Your repositories"',
        description:
          'Click "Your repositories" to see every project and fork saved under your account.',
        xPercent: 70,
        yPercent: 45,
      },
      {
        number: 3,
        label: 'Open your existing fork from the list',
        description:
          'Click your copy (it says "forked from original-owner/sample-project" underneath) and continue working there.',
        xPercent: 34,
        yPercent: 74,
      },
    ],
  },
  {
    id: 'cant-see-settings-tab',
    title: "I can't see the Settings tab",
    summary: 'Settings only appears for owners and admins of that repository.',
    whatIsHappening:
      'You are looking at the row of tabs near the top of a repository, and the Settings tab is not there.',
    whyItHappens:
      'You need admin access to see and use Settings. Repository owners always have admin access, while visitors and most teammates only see the public tabs.',
    screenType: 'settings-tab-missing',
    windowUrl: 'github.com/someone-else/sample-project',
    steps: [
      {
        number: 1,
        label: 'Check who owns the repository at the top left',
        description:
          'Look at the name before the slash. If it is not your username, you are viewing someone else’s project and will not see Settings.',
        xPercent: 25,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'Look at the end of the top tab row',
        description:
          'On repositories you own or have admin access to, Settings is the last tab on the right of the tab bar.',
        xPercent: 80,
        yPercent: 48,
      },
      {
        number: 3,
        label: 'Ask the owner for Admin access or work in your own repo',
        description:
          'If you need to change settings on a team project, ask the repository owner to grant you Admin access—or open one of your own repositories.',
        xPercent: 50,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'tab-is-missing',
    title: 'A tab is missing',
    summary: 'The repository owner may have turned it off in Settings under Features.',
    whatIsHappening:
      'You expected to see a tab like Issues, Wiki, or Projects in the top bar of a repository, and it is not shown.',
    whyItHappens:
      'Not every tab is always turned on. A repository owner can switch off features like Issues, Wikis, or Projects in Settings when the project does not need them.',
    screenType: 'tab-missing',
    windowUrl: 'github.com/alex-dev/my-first-project/settings',
    steps: [
      {
        number: 1,
        label: 'Open the Settings tab (if you are an owner or admin)',
        description:
          'Click the Settings tab at the right end of the repository tab bar.',
        xPercent: 82,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'Scroll down to the Features section',
        description:
          'On the main General settings page, look for the Features checklist (Wikis, Issues, Projects).',
        xPercent: 30,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'Tick the checkbox to turn the tab back on',
        description:
          'Check the box next to the tab you want to show, and it appears right away in the top row.',
        xPercent: 22,
        yPercent: 72,
      },
    ],
  },
  {
    id: 'actions-no-runs',
    title: "I don't see any runs",
    summary: 'No workflow has been added yet, so click New workflow.',
    whatIsHappening:
      'You opened the Actions tab in your repository and the list of runs is empty.',
    whyItHappens:
      'GitHub Actions only starts running after you add at least one workflow file to your repository.',
    screenType: 'actions-no-runs',
    windowUrl: 'github.com/alex-dev/my-first-project/actions',
    steps: [
      {
        number: 1,
        label: 'Open the Actions tab',
        description:
          'Make sure you are inside the Actions tab of your repository.',
        xPercent: 34,
        yPercent: 18,
      },
      {
        number: 2,
        label: 'Click New workflow',
        description:
          'Click the "New workflow" button to browse ready-made automatic tasks.',
        xPercent: 22,
        yPercent: 48,
      },
      {
        number: 3,
        label: 'Pick one, click Configure, then Commit changes',
        description:
          'Choose a suggested workflow, click Configure, and commit the new file. Runs will appear whenever changes happen.',
        xPercent: 74,
        yPercent: 78,
      },
    ],
  },
  {
    id: 'actions-red-cross',
    title: 'My run has a red cross',
    summary: 'Click the run, then the failed step, and read the message.',
    whatIsHappening:
      'One of the workflow runs in your Actions tab shows a red cross instead of a green check.',
    whyItHappens:
      'A red cross only means one of the automatic checks failed—nothing in GitHub is broken, and it tells you what to fix.',
    screenType: 'actions-red-cross',
    windowUrl: 'github.com/alex-dev/my-first-project/actions',
    steps: [
      {
        number: 1,
        label: 'Click the run with the red cross',
        description:
          'Click the title of the run next to the red cross to open its summary page.',
        xPercent: 42,
        yPercent: 36,
      },
      {
        number: 2,
        label: 'Click the failed job and failed step',
        description:
          'Click the job that shows a red cross, then expand the step marked in red.',
        xPercent: 34,
        yPercent: 60,
      },
      {
        number: 3,
        label: 'Read the message to see what failed',
        description:
          'Read the plain message inside that step to see which line or check needs fixing.',
        xPercent: 54,
        yPercent: 80,
      },
    ],
  },
  {
    id: 'projects-cant-create',
    title: "I can't find where to create a project",
    summary: 'Use the Projects tab or the plus menu at the top right.',
    whatIsHappening:
      'You want to start a planning board with columns, and you are not sure where to click to create one.',
    whyItHappens:
      'You can start a new project either from the Projects tab inside a repository or from the + menu in the top bar.',
    screenType: 'projects-cant-create',
    windowUrl: 'github.com/alex-dev/my-first-project/projects',
    steps: [
      {
        number: 1,
        label: 'Click the Projects tab on your repository',
        description:
          'Click Projects in the row of repository tabs near the top of the page.',
        xPercent: 42,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'Or click the + button at the top right',
        description:
          'Click the plus (+) icon in GitHub’s top bar and choose "New project".',
        xPercent: 84,
        yPercent: 20,
      },
      {
        number: 3,
        label: 'Click New project and choose Board',
        description:
          'Click the green New project button and pick Board to get Todo, In progress, and Done columns.',
        xPercent: 52,
        yPercent: 72,
      },
    ],
  },
  {
    id: 'projects-cant-drag',
    title: "I can't drag cards",
    summary: 'You need write access to the project.',
    whatIsHappening:
      'You opened a project board and tried dragging a task card to another column, but it will not move.',
    whyItHappens:
      'Visitors can look at a public project board, but only people with write access to that project can move cards or edit items.',
    screenType: 'projects-cant-drag',
    windowUrl: 'github.com/someone-else/sample-project/projects',
    steps: [
      {
        number: 1,
        label: 'Check who owns the project',
        description:
          'Look at the owner name at the top. If it is someone else’s project, you may only have view access.',
        xPercent: 26,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'Ask the owner for write access',
        description:
          'If you are working together on the project, ask the owner to invite you with write access.',
        xPercent: 68,
        yPercent: 56,
      },
      {
        number: 3,
        label: 'Or create your own project board',
        description:
          'Open your own repository or click + → New project to build a board where you can move every card.',
        xPercent: 50,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'wiki-tab-missing',
    title: 'There is no Wiki tab',
    summary: 'The owner may have turned it off in Settings, under Features.',
    whatIsHappening:
      'You looked across the top bar of a repository for the Wiki tab, and it is not there.',
    whyItHappens:
      'Not every repository uses a wiki, so owners can turn the Wiki tab off in Settings under Features.',
    screenType: 'wiki-tab-missing',
    windowUrl: 'github.com/alex-dev/my-first-project/settings',
    steps: [
      {
        number: 1,
        label: 'Open the Settings tab (for owners and admins)',
        description:
          'Click Settings at the right end of the repository tab bar. (Only owners and admins see Settings.)',
        xPercent: 82,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'Scroll down to Features',
        description:
          'On the main Settings page, look for the Features checklist.',
        xPercent: 32,
        yPercent: 52,
      },
      {
        number: 3,
        label: 'Check the Wikis box',
        description:
          'Tick the checkbox next to Wikis to bring the Wiki tab back to the top bar.',
        xPercent: 24,
        yPercent: 72,
      },
    ],
  },
  {
    id: 'wiki-not-in-files',
    title: 'My wiki page is not in the file list',
    summary: 'Wiki pages are stored separately, so open the Wiki tab.',
    whatIsHappening:
      'You saved a new wiki page, then clicked the Code tab and could not find it in your repository file list.',
    whyItHappens:
      'GitHub keeps wiki pages separate from your normal repository files so your Code tab stays tidy.',
    screenType: 'wiki-not-in-files',
    windowUrl: 'github.com/alex-dev/my-first-project/wiki',
    steps: [
      {
        number: 1,
        label: 'Do not look in the Code tab file list',
        description:
          'The Code tab only lists your regular project files like README.md and hello.html.',
        xPercent: 18,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'Click the Wiki tab at the top',
        description:
          'Click Wiki in the top row of repository tabs to open your project guides.',
        xPercent: 58,
        yPercent: 20,
      },
      {
        number: 3,
        label: 'Find all your pages in the list on the side',
        description:
          'Look on the right side of the Wiki tab to jump between every wiki page you saved.',
        xPercent: 76,
        yPercent: 66,
      },
    ],
  },
  {
    id: 'security-tab-missing',
    title: "I don't see this tab (Security and quality)",
    summary: 'The name may be Security or Security and quality, and some options are only for owners.',
    whatIsHappening:
      'You are looking across the top bar of a repository for the Security and quality tab, and it has a shorter name or fewer items.',
    whyItHappens:
      'GitHub sometimes names this tab "Security" or "Security and quality", and only owners or admins see all settings and alerts.',
    screenType: 'security-tab-missing',
    windowUrl: 'github.com/alex-dev/my-first-project/security',
    steps: [
      {
        number: 1,
        label: 'Look for Security or Security and quality',
        description:
          'Check between Wiki and Insights in the top row of tabs—either name opens the same safety area.',
        xPercent: 56,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'Check if you own the repository',
        description:
          'On someone else’s repository, visitors see the public security policy, while private alerts stay hidden.',
        xPercent: 28,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'Open one of your own repositories',
        description:
          'On a repository you own, you can view every alert and turn safety checks on.',
        xPercent: 72,
        yPercent: 80,
      },
    ],
  },
  {
    id: 'security-dependabot-disabled',
    title: 'Dependabot alerts are Disabled',
    summary: 'Click Enable Dependabot alerts to turn them on.',
    whatIsHappening:
      'You opened Security and quality → Overview and saw "Disabled" next to Dependabot alerts.',
    whyItHappens:
      'Dependabot alerts may start turned off until an owner turns them on for that repository.',
    screenType: 'security-dependabot-disabled',
    windowUrl: 'github.com/alex-dev/my-first-project/security',
    steps: [
      {
        number: 1,
        label: 'Open Security and quality',
        description:
          'Click the Security and quality tab in your repository’s top bar.',
        xPercent: 54,
        yPercent: 18,
      },
      {
        number: 2,
        label: 'Find the Dependabot alerts row',
        description:
          'Look down the Overview list until you see Dependabot alerts marked Disabled.',
        xPercent: 34,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'Click Enable Dependabot alerts',
        description:
          'Click the Enable Dependabot alerts button on the right so GitHub warns you about risky tools.',
        xPercent: 76,
        yPercent: 54,
      },
    ],
  },
  {
    id: 'insights-community-discussions',
    title: 'The Community page asks me to enable Discussions',
    summary: 'That page needs Discussions turned on, so you can skip it.',
    whatIsHappening:
      'You clicked Community in the Insights left menu and saw a prompt asking you to enable Discussions.',
    whyItHappens:
      'GitHub’s Community health view checks for Discussions, which are turned off by default on new repositories.',
    screenType: 'insights-community-discussions',
    windowUrl: 'github.com/alex-dev/my-first-project/community',
    steps: [
      {
        number: 1,
        label: 'Notice you are on Insights → Community',
        description:
          'The Community checklist shows optional items like a README, license, and Discussions.',
        xPercent: 20,
        yPercent: 48,
      },
      {
        number: 2,
        label: 'You can safely skip Discussions',
        description:
          'Most small projects do not need Discussions turned on—leaving it off will not hurt anything.',
        xPercent: 72,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'Pick Pulse or Traffic on the left instead',
        description:
          'Click Pulse for your weekly summary or Traffic for recent visits and clones.',
        xPercent: 20,
        yPercent: 26,
      },
    ],
  },
  {
    id: 'insights-dependency-disabled',
    title: 'The Dependency graph is disabled',
    summary: 'Click Enable the dependency graph if you want it.',
    whatIsHappening:
      'You clicked Dependency graph inside the Insights tab and saw a notice saying it is disabled.',
    whyItHappens:
      'On some repositories, especially private ones, the dependency graph starts turned off until you click to turn it on.',
    screenType: 'insights-dependency-disabled',
    windowUrl: 'github.com/alex-dev/my-first-project/network/dependencies',
    steps: [
      {
        number: 1,
        label: 'Open Insights → Dependency graph',
        description:
          'Click Dependency graph in the left sidebar of the Insights tab.',
        xPercent: 20,
        yPercent: 54,
      },
      {
        number: 2,
        label: 'Click Enable the dependency graph',
        description:
          'If you want GitHub to list the external packages your project uses, click Enable the dependency graph.',
        xPercent: 64,
        yPercent: 62,
      },
      {
        number: 3,
        label: 'Or skip it if you have plain files',
        description:
          'If your repository only holds simple HTML or text notes, you do not need the dependency graph at all.',
        xPercent: 54,
        yPercent: 84,
      },
    ],
  },
  {
    id: 'settings-cant-see',
    title: "I can't see Settings",
    summary: "Only owners and admins see it. If the project is someone else's, fork it to get your own copy that you own.",
    whatIsHappening:
      'You looked at the top bar of a repository and the Settings tab is missing.',
    whyItHappens:
      'Settings only appears for owners and admins of that repository. Visitors cannot change another person’s project settings.',
    screenType: 'settings-cant-see',
    windowUrl: 'github.com/someone-else/sample-project',
    steps: [
      {
        number: 1,
        label: 'Check the owner name at the top left',
        description:
          'Look before the slash. If it is someone else’s username, you do not own this repository.',
        xPercent: 26,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'Click Fork to make your own copy',
        description:
          'If you want your own version whose settings you can change, click Fork at the top right.',
        xPercent: 82,
        yPercent: 20,
      },
      {
        number: 3,
        label: 'Open Settings on your own copy',
        description:
          'On your fork (or any repository you created), Settings appears on the right side of the tab bar.',
        xPercent: 80,
        yPercent: 62,
      },
    ],
  },
  {
    id: 'agents-upgrade-page',
    title: 'The upgrade page keeps showing',
    summary: 'That is normal on a free plan, so ignore it.',
    whatIsHappening:
      'You clicked the Agents tab and see "Do more with Copilot" with an "Upgrade to Copilot Pro" button.',
    whyItHappens:
      'Some Copilot agent features require a paid plan, so GitHub shows an upgrade offer on free accounts.',
    screenType: 'agents-upgrade-page',
    windowUrl: 'github.com/alex-dev/my-first-project/agents',
    steps: [
      {
        number: 1,
        label: 'Do not worry about the upgrade button',
        description:
          'Seeing "Upgrade to Copilot Pro" is completely normal when you use a free GitHub account.',
        xPercent: 50,
        yPercent: 52,
      },
      {
        number: 2,
        label: 'Ignore the upgrade offer',
        description:
          'You do not need to pay or click Upgrade to finish this course or use GitHub.',
        xPercent: 50,
        yPercent: 76,
      },
      {
        number: 3,
        label: 'Click Code or another tab to keep learning',
        description:
          'Click back to the Code tab or any other free tab whenever you are ready.',
        xPercent: 18,
        yPercent: 18,
      },
    ],
  },
  {
    id: 'agents-tab-missing',
    title: "I don't see the Agents tab",
    summary: 'GitHub is adding it step by step, and features differ by account.',
    whatIsHappening:
      'You looked across the top bar of a repository between Pull requests and Actions, and there is no Agents tab.',
    whyItHappens:
      'Agents is a newer feature that GitHub is rolling out gradually, and what tabs appear can differ depending on the account or repository.',
    screenType: 'agents-tab-missing',
    windowUrl: 'github.com/alex-dev/my-first-project',
    steps: [
      {
        number: 1,
        label: 'Look between Pull requests and Actions',
        description:
          'When enabled on an account, Agents sits right between Pull requests and Actions.',
        xPercent: 40,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'Understand this is normal',
        description:
          'GitHub adds new tabs step by step, and some organizations turn AI tabs off.',
        xPercent: 50,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'Keep going without it',
        description:
          'You do not need the Agents tab for this course—all the core GitHub tabs work right away.',
        xPercent: 50,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'release-cant-find-create',
    title: "I can't find Create a new release",
    summary: 'Open Releases from the Code tab sidebar—you need write access.',
    whatIsHappening:
      'You want to package a new version of your project, but you do not see a Create a new release button anywhere in the top menu.',
    whyItHappens:
      'The Releases link lives in the right-hand sidebar of the Code tab, and only people with write access to the repository can create a release.',
    screenType: 'release-cant-find-create',
    windowUrl: 'github.com/alex-dev/my-first-project',
    steps: [
      {
        number: 1,
        label: 'Click the Code tab on your own repository',
        description:
          'Go back to the main Code tab and make sure you have write access (for example, it is your own repository).',
        xPercent: 18,
        yPercent: 18,
      },
      {
        number: 2,
        label: 'Look in the right-hand sidebar under Releases',
        description:
          'Scroll down the right sidebar past About to find the Releases section.',
        xPercent: 78,
        yPercent: 46,
      },
      {
        number: 3,
        label: 'Click Create a new release',
        description:
          'Click Create a new release (or Draft a new release on the Releases page) to start.',
        xPercent: 78,
        yPercent: 74,
      },
    ],
  },
  {
    id: 'release-publish-greyed',
    title: 'Publish release is greyed out',
    summary: 'Choose or create a version tag first so the button turns green.',
    whatIsHappening:
      'You typed a release title and notes, but the Publish release button at the bottom cannot be clicked.',
    whyItHappens:
      'Every GitHub release must be attached to a tag (like v1.0.0) so GitHub knows which snapshot to package.',
    screenType: 'release-publish-greyed',
    windowUrl: 'github.com/alex-dev/my-first-project/releases/new',
    steps: [
      {
        number: 1,
        label: 'Click the Choose a tag dropdown at the top',
        description:
          'Look near the top of the new release form for the Choose a tag button.',
        xPercent: 25,
        yPercent: 28,
      },
      {
        number: 2,
        label: 'Type a version like v1.0.0 and click Create new tag',
        description:
          'Type v1.0.0 into the tag box, then click Create new tag: v1.0.0 on publish.',
        xPercent: 32,
        yPercent: 52,
      },
      {
        number: 3,
        label: 'Click the green Publish release button',
        description:
          'Once a tag is chosen, the Publish release button becomes active and ready to click.',
        xPercent: 26,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'release-attach-binaries',
    title: 'Where is my own app file?',
    summary: 'GitHub adds Source code automatically—drop your own files in Attach binaries.',
    whatIsHappening:
      'You see Source code (zip) and Source code (tar.gz) on your release, and wonder how to include a file you built yourself.',
    whyItHappens:
      'GitHub always creates the Source code zip files automatically. Any extra file you want people to download must be added in the Attach binaries box.',
    screenType: 'release-attach-binaries',
    windowUrl: 'github.com/alex-dev/my-first-project/releases/new',
    steps: [
      {
        number: 1,
        label: 'Source code zips are added automatically',
        description:
          'GitHub automatically packages your repository code as zip and tar.gz files for every release.',
        xPercent: 50,
        yPercent: 28,
      },
      {
        number: 2,
        label: 'Find the Attach binaries box below the notes',
        description:
          'Scroll below the Description box on the release form to find Attach binaries by dropping them here.',
        xPercent: 50,
        yPercent: 58,
      },
      {
        number: 3,
        label: 'Drag or select your own file to upload it',
        description:
          'Drop your extra file (or click selecting them) before clicking Publish release.',
        xPercent: 72,
        yPercent: 78,
      },
    ],
  },
  {
    id: 'pages-404-error',
    title: "I see 404, There isn't a GitHub Pages site here",
    summary: 'Add an index.html file in your chosen folder, or wait 1 to 2 minutes and refresh.',
    whatIsHappening:
      'You opened your github.io web address, and instead of your webpage you see a 404 page saying There isn’t a GitHub Pages site here.',
    whyItHappens:
      'Either there is no index.html file in the branch and folder you picked, or GitHub is still finishing building your site.',
    screenType: 'pages-404-error',
    windowUrl: 'alex-dev.github.io/my-first-project/',
    steps: [
      {
        number: 1,
        label: 'Check that index.html is in your chosen folder',
        description:
          'Look in your main branch (at the root folder /) and make sure the homepage file is named index.html in lowercase.',
        xPercent: 32,
        yPercent: 30,
      },
      {
        number: 2,
        label: 'Verify Branch and folder in Settings → Pages',
        description:
          'Confirm Source is Deploy from a branch and the branch and folder match main and / (root).',
        xPercent: 68,
        yPercent: 56,
      },
      {
        number: 3,
        label: 'Wait 1 to 2 minutes, then refresh',
        description:
          'New GitHub Pages sites and updates take a minute or two to build—wait briefly and reload the page.',
        xPercent: 50,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'pages-cant-find-settings',
    title: "I can't find Pages in Settings",
    summary: 'Only owners see Settings, and private repos may need a paid plan.',
    whatIsHappening:
      'You want to turn on GitHub Pages, but either you do not see the Settings tab or the Pages option says you need to upgrade.',
    whyItHappens:
      'Only repository owners and admins see the Settings tab, and GitHub Pages is free on public repositories while private repositories may require a paid plan.',
    screenType: 'pages-cant-find-settings',
    windowUrl: 'github.com/alex-dev/my-first-project/settings',
    steps: [
      {
        number: 1,
        label: 'Make sure you are the owner of the repository',
        description:
          'Visitors cannot see Settings. Open your own repository (or fork someone else’s first).',
        xPercent: 78,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'Check if your repository is Public',
        description:
          'GitHub Pages is free for public repositories—private repositories may need a paid GitHub plan.',
        xPercent: 35,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'Click Pages in the Settings left sidebar',
        description:
          'Once you are the owner of a public repository, click Pages under Code and automation in Settings.',
        xPercent: 25,
        yPercent: 78,
      },
    ],
  },
  {
    id: 'gist-create-greyed',
    title: 'The Create gist button is greyed out',
    summary: 'Add some content and a filename so the button turns green.',
    whatIsHappening:
      'You opened New gist and typed a description, but the Create secret gist button is still faded and will not click.',
    whyItHappens:
      'GitHub requires at least a little text or code in the content box (and works best with a filename like hello.py) before it can save a gist.',
    screenType: 'gist-create-greyed',
    windowUrl: 'gist.github.com',
    steps: [
      {
        number: 1,
        label: 'Type a filename with its ending (like hello.py)',
        description:
          'Fill in the Filename including extension box so your snippet has a name and colors.',
        xPercent: 25,
        yPercent: 24,
      },
      {
        number: 2,
        label: 'Write or paste some content in the big box',
        description:
          'A gist cannot be empty—paste or type at least one line of code or text.',
        xPercent: 50,
        yPercent: 52,
      },
      {
        number: 3,
        label: 'Click Create secret gist (or Create public gist)',
        description:
          'Once content is added, the Create button turns active and ready to click.',
        xPercent: 76,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'gist-delete',
    title: 'I want to delete a gist',
    summary: 'Open the gist you want to remove and click Delete at the top right.',
    whatIsHappening:
      'You made a test gist you no longer want and are looking for how to remove it.',
    whyItHappens:
      'Deleting a gist happens directly on that gist’s own page while you are signed in as its owner.',
    screenType: 'gist-delete',
    windowUrl: 'gist.github.com/alex-dev/abc123',
    steps: [
      {
        number: 1,
        label: 'Open the gist from your profile or Your gists list',
        description:
          'Click your profile picture and choose Your gists, then open the gist you want to remove.',
        xPercent: 22,
        yPercent: 22,
      },
      {
        number: 2,
        label: 'Find the Edit and Delete buttons at the top right',
        description:
          'At the top right of your own gist page, you will see Edit and a red Delete button.',
        xPercent: 78,
        yPercent: 22,
      },
      {
        number: 3,
        label: 'Click Delete and confirm',
        description:
          'Click Delete and confirm in the prompt to permanently remove the gist.',
        xPercent: 78,
        yPercent: 60,
      },
    ],
  },
  {
    id: 'profile-readme-not-showing',
    title: 'My README does not show',
    summary: 'Check that the repo name matches your username, it is Public, and README.md is in main.',
    whatIsHappening:
      'You created a repository and edited a README file, but your welcome message still does not appear on your GitHub profile page.',
    whyItHappens:
      'GitHub only displays the welcome box when three rules match: the repository name equals your exact username, visibility is Public, and the file is named README.md on the main branch.',
    screenType: 'profile-readme-not-showing',
    windowUrl: 'github.com/alex-dev',
    steps: [
      {
        number: 1,
        label: 'Check the repository name matches your username',
        description:
          'Look at the repository name—every letter must match your GitHub username (for example, alex-dev/alex-dev).',
        xPercent: 28,
        yPercent: 24,
      },
      {
        number: 2,
        label: 'Confirm the repository is Public',
        description:
          'If the badge says Private, open Settings → Danger Zone and change visibility to Public.',
        xPercent: 74,
        yPercent: 24,
      },
      {
        number: 3,
        label: 'Check the file is named README.md in main',
        description:
          'Make sure the file is called README.md (not readme.txt) and lives in the main branch.',
        xPercent: 50,
        yPercent: 66,
      },
    ],
  },
  {
    id: 'profile-secret-message-missing',
    title: 'I never saw the secret message',
    summary: 'You may have mistyped the repository name—match your username letter for letter.',
    whatIsHappening:
      'You typed your name on the Create a new repository screen, but the green "You found a secret!" box never popped up.',
    whyItHappens:
      'That banner only appears when Repository name matches your GitHub username (shown in the Owner dropdown right next to it) letter for letter.',
    screenType: 'profile-secret-message-missing',
    windowUrl: 'github.com/new',
    steps: [
      {
        number: 1,
        label: 'Look at your exact username under Owner',
        description:
          'Check the Owner box on the left—that shows your exact GitHub username spelling.',
        xPercent: 22,
        yPercent: 24,
      },
      {
        number: 2,
        label: 'Retype Repository name to match letter for letter',
        description:
          'Remove any extra spaces, dashes, or words so Repository name matches Owner completely.',
        xPercent: 66,
        yPercent: 24,
      },
      {
        number: 3,
        label: 'Watch for the "You found a secret!" banner below',
        description:
          'As soon as both names match, GitHub displays the green secret repository message.',
        xPercent: 50,
        yPercent: 66,
      },
    ],
  },
  {
    id: 'git-command-not-found',
    title: '"git is not recognized" or "command not found"',
    summary: 'Close the terminal, open it again, and on Windows use Git Bash.',
    whatIsHappening:
      'You typed git --version and pressed Enter, and the terminal replied that git is not recognized or command not found.',
    whyItHappens:
      'Either your terminal was already open before you finished installing Git, or you opened another shell instead of Git Bash on Windows.',
    screenType: 'git-command-not-found',
    windowUrl: 'Terminal / Git Bash',
    steps: [
      {
        number: 1,
        label: 'Close your terminal window completely',
        description:
          'A terminal opened before installation does not know Git is installed yet.',
        xPercent: 18,
        yPercent: 20,
      },
      {
        number: 2,
        label: 'On Windows, search for and open Git Bash',
        description:
          'Open your Start menu, type Git Bash, and open it instead of the older Command Prompt.',
        xPercent: 50,
        yPercent: 52,
      },
      {
        number: 3,
        label: 'Run git --version again',
        description:
          'Type git --version and press Enter. If it still fails, run the Git installer again.',
        xPercent: 50,
        yPercent: 80,
      },
    ],
  },
  {
    id: 'git-mac-developer-tools',
    title: 'My Mac asks to install developer tools',
    summary: 'Click Install, wait for it to finish, then try git --version again.',
    whatIsHappening:
      'You typed git --version in Terminal on a Mac, and a popup appeared saying the git command requires the command line developer tools.',
    whyItHappens:
      'macOS uses Apple’s developer tools package to provide Git, so the very first time you run git it offers to install it for you.',
    screenType: 'git-mac-developer-tools',
    windowUrl: 'macOS Terminal',
    steps: [
      {
        number: 1,
        label: 'Click Install on the Apple popup window',
        description:
          'Do not close or cancel the popup—click the blue Install button and accept the terms.',
        xPercent: 72,
        yPercent: 68,
      },
      {
        number: 2,
        label: 'Wait a few minutes for the download to finish',
        description:
          'Let macOS finish downloading and installing the tools without closing your laptop.',
        xPercent: 32,
        yPercent: 48,
      },
      {
        number: 3,
        label: 'Run git --version again in Terminal',
        description:
          'Once the popup says The software was installed, type git --version and press Enter.',
        xPercent: 50,
        yPercent: 84,
      },
    ],
  },
  {
    id: 'git-repo-not-found',
    title: '"fatal: repository not found"',
    summary: 'Check the web address for typos and make sure you copied the HTTPS link.',
    whatIsHappening:
      'You ran git clone and Git replied with "fatal: repository not found" instead of downloading your files.',
    whyItHappens:
      'There is usually a small typo in the web address, an extra space, or the address came from somewhere other than the HTTPS box in the green Code button.',
    screenType: 'git-repo-not-found',
    windowUrl: 'github.com/your-username/my-first-project',
    steps: [
      {
        number: 1,
        label: 'Open your repository on GitHub and click the green Code button',
        description:
          'Go back to the repository’s Code tab so you can copy the exact link again.',
        xPercent: 76,
        yPercent: 22,
      },
      {
        number: 2,
        label: 'Make sure HTTPS is selected and click Copy',
        description:
          'Check that HTTPS is underlined (not SSH), then click the copy icon so it starts with https://.',
        xPercent: 50,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'Run git clone again with the pasted HTTPS address',
        description:
          'Type git clone, one space, paste the full https://...git link, and press Enter.',
        xPercent: 50,
        yPercent: 84,
      },
    ],
  },
  {
    id: 'git-not-a-repo',
    title: '"fatal: not a git repository"',
    summary: 'You are not inside the project folder yet, so move into it with cd.',
    whatIsHappening:
      'You typed git status (or another Git command) and saw "fatal: not a git repository (or any of the parent directories): .git".',
    whyItHappens:
      'After running git clone, Git puts the files inside a new subfolder, while your terminal is still sitting one level above it.',
    screenType: 'git-not-a-repo',
    windowUrl: 'Terminal',
    steps: [
      {
        number: 1,
        label: 'Check which folder you are currently in with pwd',
        description:
          'Type pwd (or ls to see subfolders) to confirm you are outside your project folder.',
        xPercent: 32,
        yPercent: 24,
      },
      {
        number: 2,
        label: 'Move into your cloned folder using cd',
        description:
          'Type cd my-first-project (using your own repository name) and press Enter.',
        xPercent: 50,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'Run git status again inside the folder',
        description:
          'Now that you are inside the project folder, git status will show your branch cleanly.',
        xPercent: 50,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'git-nothing-to-commit',
    title: '"nothing added to commit"',
    summary: 'Run git add first so Git knows which changes to include in the commit.',
    whatIsHappening:
      'You typed git commit -m "..." and Git replied "nothing added to commit but untracked files present" (or "no changes added to commit").',
    whyItHappens:
      'Git only commits changes that you have placed into the staging area first using git add.',
    screenType: 'git-nothing-to-commit',
    windowUrl: 'Terminal',
    steps: [
      {
        number: 1,
        label: 'Check which files are untracked or changed',
        description:
          'Type git status and press Enter. Files in red are not in the staging area yet.',
        xPercent: 32,
        yPercent: 22,
      },
      {
        number: 2,
        label: 'Stage your file with git add',
        description:
          'Type git add hello.txt (using your file name, or git add . for all changed files) and press Enter.',
        xPercent: 50,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'Run git commit again with -m',
        description:
          'Now type git commit -m "Add hello.txt" and press Enter to save your commit cleanly.',
        xPercent: 50,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'git-tell-me-who-you-are',
    title: '"Please tell me who you are"',
    summary: 'Set your name and email with git config, as shown in the Install Git lesson.',
    whatIsHappening:
      'You ran git commit and Git stopped with "*** Please tell me who you are. Run git config --global user.email ...".',
    whyItHappens:
      'Every commit needs an author name and email, and Git has not saved yours on this computer yet.',
    screenType: 'git-tell-me-who-you-are',
    windowUrl: 'Terminal',
    steps: [
      {
        number: 1,
        label: 'Save your name in Git',
        description:
          'Type git config --global user.name "Your Name" (with your real name) and press Enter.',
        xPercent: 50,
        yPercent: 26,
      },
      {
        number: 2,
        label: 'Save your email in Git',
        description:
          'Type git config --global user.email "you@example.com" (matching your GitHub email) and press Enter.',
        xPercent: 50,
        yPercent: 55,
      },
      {
        number: 3,
        label: 'Run your commit command again',
        description:
          'Now run git commit -m "Your message" again and press Enter. Git remembers your details from now on.',
        xPercent: 50,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'git-auth-failed',
    title: '"Authentication failed"',
    summary: 'Use the browser sign-in window or a personal access token, because passwords do not work.',
    whatIsHappening:
      'You ran git push, entered a password in the terminal, and Git stopped with "remote: Invalid username or token" or "Authentication failed".',
    whyItHappens:
      'GitHub no longer accepts your regular account password in the terminal for security reasons.',
    screenType: 'git-auth-failed',
    windowUrl: 'Terminal & Browser Sign-In',
    steps: [
      {
        number: 1,
        label: 'Use the browser sign-in window if it pops up',
        description:
          'Look behind your terminal for a GitHub browser window asking you to sign in and authorize Git.',
        xPercent: 50,
        yPercent: 24,
      },
      {
        number: 2,
        label: 'Or create a Personal access token on GitHub',
        description:
          'Open GitHub Settings → Developer settings → Personal access tokens and copy the generated token.',
        xPercent: 50,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'Paste the token instead of a password',
        description:
          'Run git push again and paste your personal access token when prompted instead of your GitHub password.',
        xPercent: 50,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'git-everything-up-to-date',
    title: '"Everything up-to-date"',
    summary: 'There is nothing new to push—your commits are already on GitHub.',
    whatIsHappening:
      'You ran git push and expected changes to upload, but Git only printed "Everything up-to-date".',
    whyItHappens:
      'Either all of your commits are already on GitHub, or you edited a file on your computer without running git add and git commit yet.',
    screenType: 'git-everything-up-to-date',
    windowUrl: 'Terminal',
    steps: [
      {
        number: 1,
        label: 'Run git status to check for uncommitted files',
        description:
          'Type git status and press Enter. If it lists modified or untracked files, they are not committed yet.',
        xPercent: 50,
        yPercent: 24,
      },
      {
        number: 2,
        label: 'Stage and commit any local changes first',
        description:
          'Run git add . and git commit -m "Describe your change", pressing Enter after each command.',
        xPercent: 50,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'If working tree is clean, you are already synced',
        description:
          'If git status says working tree clean, everything you committed is already safely uploaded to GitHub.',
        xPercent: 50,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'git-no-upstream-branch',
    title: '"The current branch has no upstream branch"',
    summary: 'Run git push -u origin followed by your branch name.',
    whatIsHappening:
      'You switched to a new branch locally and typed git push, and Git said "fatal: The current branch has no upstream branch."',
    whyItHappens:
      'Your new branch only exists on your computer right now, so Git does not know which branch on GitHub to push it to.',
    screenType: 'git-no-upstream-branch',
    windowUrl: 'Terminal',
    steps: [
      {
        number: 1,
        label: 'Look at your branch name in the error or git status',
        description:
          'Notice the name of your current branch, such as my-experiment.',
        xPercent: 50,
        yPercent: 22,
      },
      {
        number: 2,
        label: 'Run git push -u origin with your branch name',
        description:
          'Type git push -u origin my-experiment (using your own branch name) and press Enter.',
        xPercent: 50,
        yPercent: 54,
      },
      {
        number: 3,
        label: 'Future pushes on this branch need only git push',
        description:
          'The -u links your branch to GitHub so next time you can just type git push.',
        xPercent: 50,
        yPercent: 82,
      },
    ],
  },
  {
    id: 'git-installer-nothing-opened',
    title: 'The installer finished but nothing opened',
    summary: 'Press the Windows key, search for Git Bash, and open it.',
    whatIsHappening:
      'You finished installing Git on Windows and clicked Finish, or closed the window, and no black terminal screen opened.',
    whyItHappens:
      'By default, the "Launch Git Bash" box on the last installer screen is unticked, so Git installs quietly in the background.',
    screenType: 'git-installer-nothing-opened',
    windowUrl: 'Windows Start Menu',
    steps: [
      {
        number: 1,
        label: 'Press the Windows key on your keyboard',
        description:
          'Press the Windows key (or click the Start button in your bottom taskbar) to open Start search.',
        xPercent: 20,
        yPercent: 22,
      },
      {
        number: 2,
        label: 'Search for Git Bash',
        description:
          'Type Git Bash into the search box so the Git Bash app appears in the results.',
        xPercent: 50,
        yPercent: 50,
      },
      {
        number: 3,
        label: 'Click Git Bash to open it',
        description:
          'Click Open (or press Enter) to launch the Git Bash terminal window.',
        xPercent: 50,
        yPercent: 80,
      },
    ],
  },
];
