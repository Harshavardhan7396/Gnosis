import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cheatSheetData } from '../data/lessons.js';

interface CheatSheetModalProps {
  mode: 'cheat-sheet' | 'colophon' | null;
  onClose: () => void;
}

export function CheatSheetModal({ mode, onClose }: CheatSheetModalProps) {
  useEffect(() => {
    if (!mode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, onClose]);

  if (!mode) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/35 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
    >
      <div
        className="w-full max-w-2xl rounded-xl bg-surface-container-lowest border border-outline-variant/50 shadow-[0_12px_32px_-4px_rgba(28,25,23,0.12)] overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-surface-container-low border-b border-outline-variant/30 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary block mb-0.5">
              {mode === 'cheat-sheet' ? 'Reference' : 'About'}
            </span>
            <h2 id="modal-heading" className="text-xl font-medium text-on-surface">
              {mode === 'cheat-sheet' ? cheatSheetData.title : 'GitStart Colophon'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-lg border border-outline-variant/40 bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {mode === 'cheat-sheet' ? (
            <>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {cheatSheetData.subtitle}
              </p>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant mb-3">
                  GitHub Browser Actions
                </h3>
                <div className="divide-y divide-outline-variant/25 border border-outline-variant/35 rounded-lg bg-surface-container-low/30">
                  {cheatSheetData.browserActions.map((item) => (
                    <div
                      key={item.action}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <p className="text-sm font-medium text-on-surface">{item.action}</p>
                        <p className="text-xs text-on-surface-variant mt-0.5">{item.note}</p>
                      </div>
                      <code className="font-mono text-xs px-2.5 py-1 rounded bg-surface-container-lowest border border-outline-variant/35 text-on-surface whitespace-nowrap self-start sm:self-center">
                        {item.where}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant mb-3">
                  Markdown Essentials (.md)
                </h3>
                <div className="divide-y divide-outline-variant/25 border border-outline-variant/35 rounded-lg bg-surface-container-low/30">
                  {cheatSheetData.markdownBasics.map((item) => (
                    <div
                      key={item.syntax}
                      className="px-4 py-3 flex items-center justify-between gap-4"
                    >
                      <code className="font-mono text-xs text-primary">{item.syntax}</code>
                      <span className="text-xs text-on-surface-variant">{item.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
              <p>
                <strong className="font-medium text-on-surface">GitStart</strong> is designed to make
                version control approachable for complete beginners by focusing on clear language,
                browser-first workflows, and unhurried visual models.
              </p>
              <p>
                Set in <span className="text-on-surface font-medium">Alexandria</span> and{' '}
                <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface">
                  JetBrains Mono
                </code>{' '}
                on a warm archival paper palette.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
