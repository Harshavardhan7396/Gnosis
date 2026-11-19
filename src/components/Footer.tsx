interface FooterProps {
  onOpenLessonsPage: () => void;
  onOpenGlossary: () => void;
  onOpenSandbox: () => void;
  onOpenStuck: () => void;
  onOpenCheatSheet: () => void;
  onOpenColophon: () => void;
}

export function Footer({
  onOpenLessonsPage,
  onOpenGlossary,
  onOpenSandbox,
  onOpenStuck,
  onOpenCheatSheet,
  onOpenColophon,
}: FooterProps) {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span className="text-[22px] leading-[30px] text-on-surface tracking-tight font-semibold">
            GitStart
          </span>
          <p className="text-[15px] leading-[24px] text-on-surface-variant">
            An artisanal, calm approach to version control literacy.
          </p>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-6 text-[15px] leading-[24px] text-on-surface-variant"
          aria-label="Footer navigation"
        >
          <button
            type="button"
            onClick={onOpenLessonsPage}
            className="hover:text-on-surface transition-colors whitespace-nowrap cursor-pointer"
          >
            Lessons
          </button>
          <button
            type="button"
            onClick={onOpenGlossary}
            className="hover:text-on-surface transition-colors whitespace-nowrap cursor-pointer"
          >
            Glossary
          </button>
          <button
            type="button"
            onClick={onOpenSandbox}
            className="hover:text-on-surface transition-colors whitespace-nowrap cursor-pointer"
          >
            Practice Sandbox
          </button>
          <button
            type="button"
            onClick={onOpenStuck}
            className="hover:text-on-surface transition-colors whitespace-nowrap cursor-pointer"
          >
            Where am I stuck?
          </button>
          <button
            type="button"
            onClick={onOpenCheatSheet}
            className="hover:text-on-surface transition-colors whitespace-nowrap cursor-pointer"
          >
            Cheat sheet
          </button>
          <button
            type="button"
            onClick={onOpenColophon}
            className="hover:text-on-surface transition-colors whitespace-nowrap cursor-pointer"
          >
            Colophon
          </button>
        </nav>

        <div className="text-[15px] leading-[24px] text-on-surface-variant text-center md:text-right">
          © 2025 GitStart. Quietly designed for clarity.
        </div>
      </div>
    </footer>
  );
}
