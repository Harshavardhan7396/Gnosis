import { useState, useRef, useEffect } from 'react';
import { User, Menu, X, CheckCircle2, RotateCcw, Settings, Sun, Moon } from 'lucide-react';
import type { Lesson } from '../types/lesson';
import type { AppSettings, ResolvedTheme, TextSize, ThemePreference } from '../utils/settings';
import { LANGUAGE_OPTIONS, type SupportedLanguage } from '../utils/lessonTranslation';

interface TopBarProps {
  currentView:
    | 'lessons'
    | 'lesson'
    | 'glossary'
    | 'sandbox'
    | 'stuck'
    | 'cheat-sheet'
    | 'feedback'
    | 'translate-admin'
    | 'finished';
  lessons: Lesson[];
  activeLessonIndex: number;
  completedLessonsCount: number;
  streakDays: number;
  settings: AppSettings;
  resolvedTheme: ResolvedTheme;
  onChangeTheme: (theme: ThemePreference) => void;
  onChangeTextSize: (size: TextSize) => void;
  language: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  onOpenLessonsPage: () => void;
  onOpenGlossary: () => void;
  onOpenSandbox: () => void;
  onOpenStuck: () => void;
  onOpenCheatSheet: () => void;
  onStartLearning: () => void;
  completedStepIds: string[];
  quizSolved: boolean;
  lessonCompleted: boolean;
  onResetProgress: () => void;
}

export function TopBar({
  currentView,
  lessons,
  activeLessonIndex,
  completedLessonsCount,
  streakDays,
  settings,
  resolvedTheme,
  onChangeTheme,
  onChangeTextSize,
  language,
  onChangeLanguage,
  onOpenLessonsPage,
  onOpenGlossary,
  onOpenSandbox,
  onOpenStuck,
  onOpenCheatSheet,
  onStartLearning,
  completedStepIds,
  quizSolved,
  lessonCompleted,
  onResetProgress,
}: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;
      if (progressRef.current && !progressRef.current.contains(target)) {
        setProgressOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(target)) {
        setSettingsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setProgressOpen(false);
        setSettingsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const activeLesson = lessons[activeLessonIndex] ?? lessons[0];
  const availableLessonsCount = lessons.filter((l) => !l.comingSoon).length || lessons.length;
  const totalCheckpoints = activeLesson.progressSteps?.length ?? 0;
  const doneCount = Math.min(
    totalCheckpoints,
    completedStepIds.length + (quizSolved ? 1 : 0) + (lessonCompleted ? 1 : 0)
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/92 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/25">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5 lg:gap-8">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onOpenLessonsPage();
            }}
            className="flex items-center gap-2 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <span className="text-[22px] leading-[30px] text-on-surface tracking-tight font-semibold">
              GitStart
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="Primary navigation">
            <button
              type="button"
              onClick={onOpenLessonsPage}
              aria-current={currentView === 'lessons' ? 'page' : undefined}
              className={`text-[15px] leading-[24px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'lessons'
                  ? 'text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              Lessons
            </button>

            <button
              type="button"
              onClick={onOpenGlossary}
              aria-current={currentView === 'glossary' ? 'page' : undefined}
              className={`text-[15px] leading-[24px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'glossary'
                  ? 'text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              Glossary
            </button>

            <button
              type="button"
              onClick={onOpenSandbox}
              aria-current={currentView === 'sandbox' ? 'page' : undefined}
              className={`text-[15px] leading-[24px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'sandbox'
                  ? 'text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              Practice Sandbox
            </button>

            <button
              type="button"
              onClick={onOpenStuck}
              aria-current={currentView === 'stuck' ? 'page' : undefined}
              className={`text-[15px] leading-[24px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'stuck'
                  ? 'text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              Where am I stuck?
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheatSheet();
              }}
              aria-current={currentView === 'cheat-sheet' ? 'page' : undefined}
              className={`text-[15px] leading-[24px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'cheat-sheet'
                  ? 'text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              Cheat sheet
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onStartLearning();
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 lg:px-5 py-2 rounded-lg bg-primary-container text-on-primary text-[14px] lg:text-[15px] leading-[20px] font-medium hover:bg-primary transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Start learning
          </button>

          {/* Settings Menu */}
          <div className="relative" ref={settingsRef}>
            <button
              type="button"
              onClick={() => {
                setSettingsOpen((prev) => !prev);
                setProgressOpen(false);
              }}
              aria-label="Open display settings"
              aria-expanded={settingsOpen}
              className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-colors shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                settingsOpen
                  ? 'bg-primary-fixed/40 border-primary/50 text-primary'
                  : 'bg-surface-container-lowest border-outline-variant/50 text-on-surface-variant hover:text-on-surface hover:border-outline-variant'
              }`}
            >
              <Settings className="w-[16px] h-[16px]" strokeWidth={2} />
            </button>

            {settingsOpen && (
              <div
                role="dialog"
                aria-label="Display settings"
                className="absolute right-0 top-11 w-72 rounded-xl bg-surface-container-lowest border border-outline-variant/50 shadow-[0_12px_32px_-4px_rgba(28,25,23,0.12)] p-5 z-50 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                    Settings
                  </span>
                  {settings.theme === 'system' ? (
                    <span className="text-[11px] text-secondary font-medium">
                      System ({resolvedTheme})
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onChangeTheme('system')}
                      className="text-[11px] font-medium text-primary hover:underline cursor-pointer"
                    >
                      Use system
                    </button>
                  )}
                </div>

                {/* Light / Dark Mode Toggle */}
                <div className="space-y-2">
                  <span className="text-xs font-medium text-on-surface block">Appearance</span>
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-surface-container-low border border-outline-variant/35">
                    <button
                      type="button"
                      onClick={() => onChangeTheme('light')}
                      aria-pressed={resolvedTheme === 'light'}
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        resolvedTheme === 'light'
                          ? 'bg-surface-container-lowest text-primary border border-primary/35 shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5 shrink-0" />
                      <span>Light</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onChangeTheme('dark')}
                      aria-pressed={resolvedTheme === 'dark'}
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        resolvedTheme === 'dark'
                          ? 'bg-surface-container-lowest text-primary border border-primary/35 shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5 shrink-0" />
                      <span>Dark</span>
                    </button>
                  </div>
                </div>

                {/* Text Size Selector */}
                <div className="space-y-2 pt-3 border-t border-outline-variant/30">
                  <span className="text-xs font-medium text-on-surface block">Text size</span>
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-surface-container-low border border-outline-variant/35">
                    {(
                      [
                        { id: 'normal', label: 'Normal' },
                        { id: 'large', label: 'Large' },
                        { id: 'extra-large', label: 'Extra large' },
                      ] as const
                    ).map((opt) => {
                      const active = settings.textSize === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => onChangeTextSize(opt.id)}
                          aria-pressed={active}
                          className={`px-2 py-1.5 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                            active
                              ? 'bg-surface-container-lowest text-primary border border-primary/35 shadow-xs'
                              : 'text-on-surface-variant hover:text-on-surface'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Language Selector */}
                <div className="space-y-2 pt-3 border-t border-outline-variant/30">
                  <span className="text-xs font-medium text-on-surface block">Lesson language</span>
                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg bg-surface-container-low border border-outline-variant/35">
                    {LANGUAGE_OPTIONS.map((opt) => {
                      const active = language === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => onChangeLanguage(opt.id)}
                          aria-pressed={active}
                          className={`px-2 py-1.5 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                            active
                              ? 'bg-surface-container-lowest text-primary border border-primary/35 shadow-xs'
                              : 'text-on-surface-variant hover:text-on-surface'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={progressRef}>
            <button
              type="button"
              onClick={() => {
                setProgressOpen((prev) => !prev);
                setSettingsOpen(false);
              }}
              aria-label="Toggle learning progress"
              aria-expanded={progressOpen}
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:opacity-90 transition-opacity shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <User className="w-[17px] h-[17px]" strokeWidth={2} />
            </button>

            {progressOpen && (
              <div className="absolute right-0 top-11 w-72 rounded-xl bg-surface-container-lowest border border-outline-variant/50 shadow-[0_12px_32px_-4px_rgba(28,25,23,0.08)] p-5 z-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                    Lesson Progress
                  </span>
                  <span className="font-mono text-xs text-primary font-medium tabular-nums">
                    {doneCount}/{totalCheckpoints}
                  </span>
                </div>
                <p className="text-sm font-medium text-on-surface mb-3">
                  {activeLesson.titleStart}
                  {activeLesson.titleHighlight}
                  {activeLesson.titleEnd}
                </p>
                <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden mb-4">
                  <div
                    className="h-full bg-secondary transition-all duration-300"
                    style={{ width: `${Math.round((doneCount / totalCheckpoints) * 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30 text-xs">
                  <span className="inline-flex items-center gap-1.5 text-on-surface-variant">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                    {lessonCompleted ? 'Completed' : 'In progress'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onResetProgress();
                      setProgressOpen(false);
                    }}
                    className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
                <div className="mt-3 pt-2.5 border-t border-outline-variant/25 flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span className="tabular-nums">
                    {completedLessonsCount} of {availableLessonsCount} lessons done
                  </span>
                  {streakDays >= 1 && (
                    <span className="text-secondary font-medium tabular-nums">
                      {streakDays}-day streak
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-10 h-10 rounded-lg border border-outline-variant/40 bg-surface-container-lowest flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors shrink-0 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/30 bg-surface px-4 py-4 space-y-2 shadow-sm">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLessonsPage();
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-[15px] cursor-pointer ${
              currentView === 'lessons'
                ? 'font-semibold text-on-surface bg-surface-container-low/70'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/50'
            }`}
          >
            Lessons
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenGlossary();
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-[15px] cursor-pointer ${
              currentView === 'glossary'
                ? 'font-semibold text-on-surface bg-surface-container-low/70'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/50'
            }`}
          >
            Glossary
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSandbox();
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-[15px] cursor-pointer ${
              currentView === 'sandbox'
                ? 'font-semibold text-on-surface bg-surface-container-low/70'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/50'
            }`}
          >
            Practice Sandbox
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenStuck();
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-[15px] cursor-pointer ${
              currentView === 'stuck'
                ? 'font-semibold text-on-surface bg-surface-container-low/70'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/50'
            }`}
          >
            Where am I stuck?
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCheatSheet();
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-[15px] cursor-pointer ${
              currentView === 'cheat-sheet'
                ? 'font-semibold text-on-surface bg-surface-container-low/70'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/50'
            }`}
          >
            Cheat sheet
          </button>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartLearning();
              }}
              className="w-full inline-flex items-center justify-center px-5 py-3 rounded-lg bg-primary-container text-on-primary text-[15px] font-medium hover:bg-primary transition-colors cursor-pointer"
            >
              Start learning
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
