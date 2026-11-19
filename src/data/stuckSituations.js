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
];
