import { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import type { DiagramSectionData, DiagramTakeaway } from '../types/lesson';
import { AskAboutButton } from './AskAboutButton';
import { SectionFeedbackWidget } from './SectionFeedbackWidget';
import {
  SectionListenButton,
  SpeakableHighlight,
  SpeakableText,
} from './SectionListenButton';
import { SectionTranslationPill, useSectionShimmer } from './SectionTranslationPill';
import {
  buildSentenceUnits,
  sanitizeTextForSpeech,
  type SpeechUnit,
} from '../utils/speech';

interface BranchDiagramSectionProps {
  lessonId?: string;
  lessonTitle?: string;
  data: DiagramSectionData;
}

export function BranchDiagramSection({
  lessonId = 'lesson',
  lessonTitle = 'Lesson',
  data,
}: BranchDiagramSectionProps) {
  const [activePhase, setActivePhase] = useState<DiagramTakeaway['phase'] | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animProgress, setAnimProgress] = useState(0); // 0 to 1
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  const runAnimation = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setAnimProgress(1);
      return;
    }

    setAnimProgress(0);
    const duration = 1800; // ms
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // Smooth cubic ease-in-out
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setAnimProgress(eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            runAnimation();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hasAnimated]);

  const togglePhase = (phase: DiagramTakeaway['phase']) => {
    setActivePhase((prev) => (prev === phase ? null : phase));
  };

  const sectionId = `${lessonId}-branch-diagram`;
  const headingTitle = `${data.titlePrefix}${data.titleHighlight}`.trim();
  const isTranslatingDiagram = useSectionShimmer('branch-diagram');

  const buildDiagramUnits = (): SpeechUnit[] => [
    {
      id: `${sectionId}-title`,
      text: headingTitle,
      speechText: sanitizeTextForSpeech(headingTitle),
    },
    ...data.takeaways.flatMap((item) => [
      {
        id: `${sectionId}-${item.id}-title`,
        text: item.title,
        speechText: sanitizeTextForSpeech(item.title),
      },
      ...buildSentenceUnits(`${sectionId}-${item.id}-desc`, item.description),
    ]),
  ];

  // Clip width draws from x=215 across 495px to x=710
  const clipWidth = Math.max(0, Math.min(500, animProgress * 500));
  const showDraftOutline = animProgress >= 0.3;
  const showAddHeader = animProgress >= 0.58;
  const showBugfix = animProgress >= 0.45;
  const showMerged = animProgress >= 0.96;

  return (
    <section
      id="branch-diagram"
      ref={sectionRef}
      data-translate-section="branch-diagram"
      data-section-title={headingTitle}
      className={`w-full py-8 sm:py-12 ${isTranslatingDiagram ? 'translate-section-shimmer' : ''}`}
      aria-labelledby="branch-diagram-heading"
    >
      <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/40 p-6 sm:p-8 lg:p-14 shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs tracking-[0.12em] text-primary font-semibold uppercase mb-2 block">
              {data.eyebrow}
            </span>
            <h2
              id="branch-diagram-heading"
              className="text-[26px] sm:text-[32px] lg:text-[36px] leading-[1.24] font-normal text-on-surface tracking-[-0.015em]"
            >
              <SpeakableHighlight sectionId={sectionId} unitId={`${sectionId}-title`}>
                {data.titlePrefix}
                <span className="font-medium">{data.titleHighlight}</span>
              </SpeakableHighlight>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-on-surface-variant font-mono text-xs shrink-0">
            {data.legend.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.tone === 'primary' ? 'bg-primary' : 'bg-on-surface'
                  }`}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </span>
            ))}

            <button
              type="button"
              onClick={runAnimation}
              aria-label="Replay branch animation"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-outline-variant/40 bg-surface-container-low/60 text-[11px] text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay</span>
            </button>

            <SectionTranslationPill sectionId="branch-diagram" className="font-sans" />

            <SectionListenButton
              sectionId={sectionId}
              sectionLabel={headingTitle}
              getUnits={buildDiagramUnits}
              className="font-sans"
            />

            <AskAboutButton
              sectionId={`${lessonId}-branch-diagram`}
              topic={headingTitle}
              sectionText={[
                headingTitle,
                ...data.takeaways.map((t) => `${t.title}: ${t.description}`),
              ].join('\n')}
              className="font-sans"
            />
          </div>
        </div>

        <div className="w-full py-4 sm:py-8 overflow-x-auto">
          <svg
            className="w-full min-w-[600px] h-auto select-none"
            fill="none"
            viewBox="0 0 860 260"
            role="img"
            aria-label="Animated diagram illustrating branching off main, making commits on a feature branch, and merging back into main"
          >
            <defs>
              <clipPath id="feature-branch-reveal">
                <rect x="215" y="20" width={clipWidth} height="180" />
              </clipPath>
            </defs>

            {/* Main timeline */}
            <line
              stroke="var(--color-on-surface)"
              strokeLinecap="round"
              strokeWidth="2"
              x1="60"
              x2="800"
              y1="180"
              y2="180"
              opacity={activePhase === 'committing' ? 0.35 : 1}
            />

            {/* Animated Feature branch curve */}
            <path
              d="M 220 180 C 260 180, 280 80, 340 80 L 580 80 C 640 80, 660 180, 700 180"
              stroke="var(--color-primary)"
              strokeDasharray="4 4"
              strokeLinecap="round"
              strokeWidth={activePhase ? 2.5 : 2}
              clipPath="url(#feature-branch-reveal)"
            />

            {/* Init node */}
            <g opacity={activePhase && activePhase !== 'branching' ? 0.45 : 1}>
              <circle
                cx="100"
                cy="180"
                fill="var(--color-surface-container-low)"
                r="8"
                stroke="var(--color-on-surface)"
                strokeWidth="2"
              />
              <text
                className="font-mono text-[11px]"
                fill="var(--color-on-surface-variant)"
                textAnchor="middle"
                x="100"
                y="215"
              >
                Init
              </text>
            </g>

            {/* c1 Branch point */}
            <g opacity={activePhase && activePhase !== 'branching' ? 0.45 : 1}>
              <circle
                cx="220"
                cy="180"
                fill={
                  activePhase === 'branching'
                    ? 'var(--color-primary-fixed)'
                    : 'var(--color-surface-container-low)'
                }
                r={activePhase === 'branching' ? 10 : 8}
                stroke={
                  activePhase === 'branching'
                    ? 'var(--color-primary)'
                    : 'var(--color-on-surface)'
                }
                strokeWidth="2"
              />
              <text
                className="font-mono text-[11px]"
                fill="var(--color-on-surface-variant)"
                textAnchor="middle"
                x="220"
                y="215"
              >
                c1
              </text>
              <g transform="translate(178, 225)">
                <rect fill="var(--color-surface-container-high)" height="22" rx="3" width="84" />
                <text
                  fill="var(--color-on-surface)"
                  fontSize="10"
                  fontWeight="500"
                  textAnchor="middle"
                  x="42"
                  y="15"
                >
                  Branch point
                </text>
              </g>
            </g>

            {/* Feature commit 1: Draft outline */}
            <g
              style={{ transition: 'opacity 300ms ease' }}
              opacity={
                !showDraftOutline
                  ? 0
                  : activePhase && activePhase !== 'committing'
                    ? 0.45
                    : 1
              }
            >
              <circle
                cx="380"
                cy="80"
                fill={
                  activePhase === 'committing'
                    ? 'var(--color-primary-fixed)'
                    : 'var(--color-surface-container-low)'
                }
                r={activePhase === 'committing' ? 10 : 8}
                stroke="var(--color-primary)"
                strokeWidth="2"
              />
              <text
                className="font-mono text-[11px]"
                fill="var(--color-primary)"
                textAnchor="middle"
                x="380"
                y="55"
              >
                Draft outline
              </text>
            </g>

            {/* Feature commit 2: Add header + Isolated work badge */}
            <g
              style={{ transition: 'opacity 300ms ease' }}
              opacity={
                !showAddHeader
                  ? 0
                  : activePhase && activePhase !== 'committing'
                    ? 0.45
                    : 1
              }
            >
              <circle
                cx="520"
                cy="80"
                fill={
                  activePhase === 'committing'
                    ? 'var(--color-primary-fixed)'
                    : 'var(--color-surface-container-low)'
                }
                r={activePhase === 'committing' ? 10 : 8}
                stroke="var(--color-primary)"
                strokeWidth="2"
              />
              <text
                className="font-mono text-[11px]"
                fill="var(--color-primary)"
                textAnchor="middle"
                x="520"
                y="55"
              >
                Add header
              </text>

              <g transform="translate(405, 105)">
                <rect fill="var(--color-primary-fixed)" height="22" rx="3" width="94" />
                <text
                  fill="var(--color-on-primary-fixed)"
                  fontSize="10"
                  fontWeight="500"
                  textAnchor="middle"
                  x="47"
                  y="15"
                >
                  Isolated work
                </text>
              </g>
            </g>

            {/* Bugfix on main */}
            <g
              style={{ transition: 'opacity 300ms ease' }}
              opacity={!showBugfix ? 0.25 : activePhase ? 0.55 : 1}
            >
              <circle
                cx="460"
                cy="180"
                fill="var(--color-surface-container-high)"
                r="7"
                stroke="var(--color-on-surface)"
                strokeWidth="2"
              />
              <text
                className="font-mono text-[11px]"
                fill="var(--color-on-surface-variant)"
                textAnchor="middle"
                x="460"
                y="215"
              >
                Bugfix
              </text>
            </g>

            {/* Merged node */}
            <g
              style={{ transition: 'opacity 350ms ease' }}
              opacity={
                !showMerged
                  ? 0.18
                  : activePhase && activePhase !== 'merging'
                    ? 0.45
                    : 1
              }
            >
              <circle
                cx="700"
                cy="180"
                fill={
                  showMerged
                    ? 'var(--color-secondary-container)'
                    : 'var(--color-surface-container-low)'
                }
                r={activePhase === 'merging' ? 11 : 9}
                stroke={showMerged ? 'var(--color-secondary)' : 'var(--color-outline)'}
                strokeWidth="2"
              />
              <text
                className="font-mono text-[11px] font-medium"
                fill={showMerged ? 'var(--color-secondary)' : 'var(--color-outline)'}
                textAnchor="middle"
                x="700"
                y="215"
              >
                Merged
              </text>
              <g transform="translate(648, 225)">
                <rect fill="var(--color-surface-container-high)" height="22" rx="3" width="105" />
                <text
                  fill="var(--color-on-surface)"
                  fontSize="10"
                  fontWeight="500"
                  textAnchor="middle"
                  x="52.5"
                  y="15"
                >
                  Merge to main
                </text>
              </g>
            </g>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-6 sm:pt-8 bg-surface-container-low/40 border-t border-outline-variant/30 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 lg:-mx-14 lg:-mb-14 p-6 sm:p-8 lg:p-10 rounded-b-xl">
          {data.takeaways.map((item) => {
            const isSelected = activePhase === item.phase;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActivePhase(item.phase)}
                onMouseLeave={() => setActivePhase(null)}
                className={`text-left rounded-lg p-3 -m-3 transition-colors ${
                  isSelected ? 'bg-surface-container-lowest/80' : 'hover:bg-surface-container-lowest/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => togglePhase(item.phase)}
                  aria-pressed={isSelected}
                  className="text-sm font-medium text-on-surface hover:text-primary block mb-1.5 text-left transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                >
                  <SpeakableHighlight
                    sectionId={sectionId}
                    unitId={`${sectionId}-${item.id}-title`}
                  >
                    {item.title}
                  </SpeakableHighlight>
                </button>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <SpeakableText
                    sectionId={sectionId}
                    unitPrefix={`${sectionId}-${item.id}-desc`}
                    text={item.description}
                  />
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <SectionFeedbackWidget
        lessonId={lessonId}
        lessonTitle={lessonTitle}
        sectionId="branch-diagram"
        sectionTitle={`${data.titlePrefix}${data.titleHighlight}`.trim()}
      />
    </section>
  );
}
