import type { ProgressStep } from '../types/lesson';

interface ProgressRowProps {
  steps: ProgressStep[];
  activeStepId: string;
  completedStepIds: string[];
  onSelectStep: (step: ProgressStep) => void;
}

export function ProgressRow({
  steps,
  activeStepId,
  completedStepIds,
  onSelectStep,
}: ProgressRowProps) {
  return (
    <section
      id="progress-row"
      className="w-full py-6 sm:py-10 my-4 sm:my-6"
      aria-label="Lesson progress"
    >
      <div className="bg-surface-container-lowest/80 border border-outline-variant/40 p-4 sm:p-6 rounded-xl shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)]">
        <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const isActive = step.id === activeStepId;
            const isCompleted = completedStepIds.includes(step.id);

            return (
              <div key={step.id} className="contents sm:flex sm:items-center sm:flex-1 sm:last:flex-none">
                <button
                  type="button"
                  onClick={() => onSelectStep(step)}
                  className={`flex items-center gap-2.5 px-2.5 py-2 sm:px-1 sm:py-1 rounded-lg text-left transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-on-surface font-medium bg-surface-container-low/70 sm:bg-transparent'
                      : isCompleted
                        ? 'text-on-surface hover:text-primary'
                        : 'text-on-surface-variant/70 hover:text-on-surface'
                  }`}
                >
                  <span
                    className={`font-mono text-xs tabular-nums ${
                      isActive
                        ? 'font-semibold text-primary'
                        : isCompleted
                          ? 'font-semibold text-secondary'
                          : 'text-on-surface-variant/60'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span className="text-[13px] sm:text-sm whitespace-nowrap">{step.label}</span>
                </button>

                {index < steps.length - 1 && (
                  <div
                    className={`hidden sm:block flex-1 h-[1px] mx-3 ${
                      isCompleted ? 'bg-secondary/40' : 'bg-outline-variant/35'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
