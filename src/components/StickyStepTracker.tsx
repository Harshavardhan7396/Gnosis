import { Check } from 'lucide-react';
import type { ProgressStep } from '../types/lesson';

interface StickyStepTrackerProps {
  visible: boolean;
  steps: ProgressStep[];
  activeStepId: string;
  completedStepIds: string[];
  onSelectStep: (step: ProgressStep) => void;
}

export function StickyStepTracker({
  visible,
  steps,
  activeStepId,
  completedStepIds,
  onSelectStep,
}: StickyStepTrackerProps) {
  return (
    <div
      aria-hidden={!visible}
      className={`fixed top-16 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-b border-outline-variant/35 shadow-[0_2px_10px_rgba(28,25,23,0.04)] transition-all duration-200 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-11 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-5 w-full">
          {steps.map((step, index) => {
            const isActive = step.id === activeStepId;
            const isCompleted = completedStepIds.includes(step.id);

            return (
              <div key={step.id} className="flex items-center gap-2 sm:gap-4 shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectStep(step)}
                  tabIndex={visible ? 0 : -1}
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-primary font-semibold bg-primary-fixed/35'
                      : isCompleted
                        ? 'text-secondary font-medium hover:bg-surface-container-low'
                        : 'text-on-surface-variant/75 hover:text-on-surface'
                  }`}
                >
                  {isCompleted && !isActive ? (
                    <Check className="w-3 h-3 text-secondary shrink-0" />
                  ) : (
                    <span className="font-mono text-[11px] tabular-nums">{step.number}</span>
                  )}
                  <span className={isActive ? 'inline' : 'hidden sm:inline'}>{step.label}</span>
                </button>

                {index < steps.length - 1 && (
                  <span className="hidden md:inline-block w-4 h-[1px] bg-outline-variant/40" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
