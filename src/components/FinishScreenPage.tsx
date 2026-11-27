import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2 } from 'lucide-react';
import type { RoadmapLevel } from '../types/lesson';

interface FinishScreenPageProps {
  levels: RoadmapLevel[];
  onOpenCheatSheet: () => void;
  onBackToLessons: () => void;
}

const SKILLS_LEARNED = [
  'Create a repository',
  'Make commits',
  'Work with branches and pull requests',
  'Use issues',
  'Publish a website',
  'Use Git on your computer',
];

export function FinishScreenPage({
  levels,
  onOpenCheatSheet,
  onBackToLessons,
}: FinishScreenPageProps) {
  return (
    <div className="w-full py-8 sm:py-14">
      <div className="max-w-3xl mx-auto space-y-8">
        <button
          type="button"
          onClick={onBackToLessons}
          className="inline-flex items-center gap-2 text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to the roadmap</span>
        </button>

        <section className="rounded-2xl bg-surface-container-lowest border border-outline-variant/45 p-7 sm:p-10 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] space-y-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-secondary">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>All 5 levels complete</span>
            </span>

            <h1 className="text-[32px] sm:text-[42px] leading-[1.15] font-normal text-on-surface tracking-[-0.02em]">
              You finished GitStart
            </h1>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-[58ch]">
              Take a moment to notice how far you have come. You started from zero, learned how
              GitHub works in plain language, and carried those skills onto your own computer.
            </p>
          </div>

          {/* 5 Levels completed with ticks */}
          <div className="space-y-3 pt-2 border-t border-outline-variant/30">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
              Levels completed
            </h2>
            <ul className="space-y-2.5">
              {levels.map((level) => (
                <li
                  key={level.id}
                  className="flex items-start gap-3 rounded-xl bg-surface-container-low/55 border border-outline-variant/35 px-4 py-3"
                >
                  <CheckCircle2 className="w-[18px] h-[18px] text-secondary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-on-surface">
                      Level {level.number}: {level.title}
                    </p>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                      {level.ability}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* What you can do now */}
          <div className="space-y-3 pt-2 border-t border-outline-variant/30">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
              What you can do now
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SKILLS_LEARNED.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2.5 rounded-lg bg-secondary-container/20 border border-secondary/25 px-3.5 py-2.5 text-sm text-on-surface"
                >
                  <Check className="w-4 h-4 text-secondary shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={onOpenCheatSheet}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary text-sm font-medium shadow-sm hover:bg-primary-container transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Open the cheat sheet</span>
            </button>

            <button
              type="button"
              onClick={onBackToLessons}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-surface-container-low border border-outline-variant/45 text-on-surface text-sm font-medium hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span>Back to the roadmap</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
