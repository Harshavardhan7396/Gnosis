import { useEffect, useRef, type ReactNode } from 'react';
import { Volume2, Play, Pause, Square } from 'lucide-react';
import { useSpeech } from '../context/SpeechContext';
import {
  buildSentenceUnits,
  splitCodeSegmentsIntoSentences,
  type SpeechRate,
  type SpeechUnit,
} from '../utils/speech';
import type { CodeSegment } from '../types/lesson';
import { ExplainText } from './ExplainText';

const SPEED_OPTIONS: SpeechRate[] = [0.75, 1, 1.25];

interface SectionListenButtonProps {
  sectionId: string;
  sectionLabel: string;
  getUnits: () => SpeechUnit[];
  className?: string;
}

export function SectionListenButton({
  sectionId,
  sectionLabel,
  getUnits,
  className = '',
}: SectionListenButtonProps) {
  const {
    supported,
    language,
    activeSectionId,
    status,
    rate,
    startSection,
    play,
    pause,
    stop,
    setRate,
  } = useSpeech();

  const isThisSectionActive = activeSectionId === sectionId && status !== 'idle';
  const isPlaying = isThisSectionActive && status === 'playing';
  const isPaused = isThisSectionActive && status === 'paused';

  if (!supported) {
    return null;
  }

  if (language !== 'en') {
    return (
      <div
        className={`no-print relative inline-flex group ${className}`}
        title="Listening is available in English only."
      >
        <button
          type="button"
          disabled
          aria-disabled="true"
          aria-label={`Listen to ${sectionLabel} (English only)`}
          title="Listening is available in English only."
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium whitespace-nowrap shrink-0 bg-surface-container-low/50 border-outline-variant/35 text-on-surface-variant/55 cursor-not-allowed opacity-75"
        >
          <Volume2 className="w-3.5 h-3.5 shrink-0" />
          <span>Listen</span>
        </button>
        <span
          role="tooltip"
          className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute bottom-full right-0 mb-1.5 px-2.5 py-1 rounded-md bg-on-surface text-surface text-[11px] font-normal whitespace-nowrap shadow-sm z-20"
        >
          Listening is available in English only.
        </span>
      </div>
    );
  }

  if (!isThisSectionActive) {
    return (
      <button
        type="button"
        onClick={() => startSection(sectionId, getUnits())}
        aria-label={`Listen to ${sectionLabel}`}
        className={`no-print inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer bg-surface-container-low/80 border-outline-variant/45 text-on-surface-variant hover:text-primary hover:border-primary/40 hover:bg-surface-container-lowest focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${className}`}
      >
        <Volume2 className="w-3.5 h-3.5 shrink-0" />
        <span>Listen</span>
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label={`Audio controls for ${sectionLabel}`}
      className={`no-print inline-flex flex-wrap items-center gap-1.5 px-2 py-1 rounded-lg border border-primary/40 bg-surface-container-lowest shadow-xs ${className}`}
    >
      <button
        type="button"
        onClick={play}
        disabled={isPlaying}
        aria-label={`Play ${sectionLabel}`}
        aria-pressed={isPlaying}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap ${
          isPlaying
            ? 'bg-primary-fixed/40 text-primary cursor-default'
            : 'bg-primary text-on-primary hover:bg-primary-container cursor-pointer'
        }`}
      >
        <Play className="w-3 h-3 shrink-0" />
        <span>Play</span>
      </button>

      <button
        type="button"
        onClick={pause}
        disabled={isPaused}
        aria-label={`Pause ${sectionLabel}`}
        aria-pressed={isPaused}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap ${
          isPaused
            ? 'bg-surface-container-high text-on-surface-variant cursor-default'
            : 'bg-surface-container-low text-on-surface hover:bg-surface-container cursor-pointer'
        }`}
      >
        <Pause className="w-3 h-3 shrink-0" />
        <span>Pause</span>
      </button>

      <div
        className="inline-flex items-center rounded bg-surface-container-low/80 border border-outline-variant/35 p-0.5"
        role="group"
        aria-label="Reading speed"
      >
        {SPEED_OPTIONS.map((option) => {
          const selected = rate === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setRate(option)}
              aria-pressed={selected}
              aria-label={`Speed ${option}x`}
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selected
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {option}x
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={stop}
        aria-label={`Stop reading ${sectionLabel}`}
        title="Stop"
        className="inline-flex items-center justify-center p-1 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
      >
        <Square className="w-3 h-3 shrink-0" />
      </button>
    </div>
  );
}

interface SpeakableTextProps {
  sectionId: string;
  unitPrefix: string;
  text: string;
  withExplain?: boolean;
}

export function SpeakableText({
  sectionId,
  unitPrefix,
  text,
  withExplain = true,
}: SpeakableTextProps) {
  const { activeSectionId, activeUnitId } = useSpeech();
  const activeRef = useRef<HTMLSpanElement>(null);
  const units = buildSentenceUnits(unitPrefix, text);
  const isSectionActive = activeSectionId === sectionId;

  useEffect(() => {
    if (isSectionActive && activeRef.current) {
      activeRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [isSectionActive, activeUnitId]);

  if (units.length === 0) {
    return withExplain ? <ExplainText text={text} /> : <>{text}</>;
  }

  return (
    <>
      {units.map((unit, idx) => {
        const isCurrent = isSectionActive && activeUnitId === unit.id;
        return (
          <span key={unit.id}>
            {idx > 0 && ' '}
            <span
              ref={isCurrent ? activeRef : undefined}
              data-speech-active={isCurrent ? 'true' : undefined}
              className={
                isCurrent
                  ? 'bg-primary-fixed/45 text-on-surface rounded-sm px-1 -mx-1 ring-1 ring-primary/25 [box-decoration-break:clone] transition-colors duration-200'
                  : 'transition-colors duration-200'
              }
            >
              {unit.isCodeBlock ? (
                <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/30">
                  {unit.text.replace(/^```[\w]*\n?|\n?```$/g, '')}
                </code>
              ) : withExplain ? (
                <ExplainText text={unit.text} />
              ) : (
                unit.text
              )}
            </span>
          </span>
        );
      })}
    </>
  );
}

interface SpeakableSegmentsProps {
  sectionId: string;
  unitPrefix: string;
  segments: CodeSegment[];
}

export function SpeakableSegments({ sectionId, unitPrefix, segments }: SpeakableSegmentsProps) {
  const { activeSectionId, activeUnitId } = useSpeech();
  const activeRef = useRef<HTMLSpanElement>(null);
  const sentences = splitCodeSegmentsIntoSentences(unitPrefix, segments);
  const isSectionActive = activeSectionId === sectionId;

  useEffect(() => {
    if (isSectionActive && activeRef.current) {
      activeRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [isSectionActive, activeUnitId]);

  return (
    <>
      {sentences.map((sentence) => {
        const isCurrent = isSectionActive && activeUnitId === sentence.id;
        return (
          <span
            key={sentence.id}
            ref={isCurrent ? activeRef : undefined}
            data-speech-active={isCurrent ? 'true' : undefined}
            className={
              isCurrent
                ? 'bg-primary-fixed/45 text-on-surface rounded-sm px-1 -mx-1 ring-1 ring-primary/25 [box-decoration-break:clone] transition-colors duration-200'
                : 'transition-colors duration-200'
            }
          >
            {sentence.segments.map((seg, idx) =>
              seg.type === 'code' ? (
                <code
                  key={idx}
                  className="font-mono text-[13.5px] font-medium px-2 py-0.5 rounded bg-surface-container-high text-on-surface border border-outline-variant/25 whitespace-nowrap"
                >
                  {seg.value}
                </code>
              ) : (
                <ExplainText key={idx} text={seg.value} />
              )
            )}
          </span>
        );
      })}
    </>
  );
}

interface SpeakableHighlightProps {
  sectionId: string;
  unitId: string;
  children: ReactNode;
  className?: string;
}

export function SpeakableHighlight({
  sectionId,
  unitId,
  children,
  className = '',
}: SpeakableHighlightProps) {
  const { activeSectionId, activeUnitId } = useSpeech();
  const activeRef = useRef<HTMLSpanElement>(null);
  const isCurrent = activeSectionId === sectionId && activeUnitId === unitId;

  useEffect(() => {
    if (isCurrent && activeRef.current) {
      activeRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [isCurrent]);

  return (
    <span
      ref={isCurrent ? activeRef : undefined}
      data-speech-active={isCurrent ? 'true' : undefined}
      className={`${
        isCurrent
          ? 'bg-primary-fixed/45 text-on-surface rounded-sm px-1 -mx-1 ring-1 ring-primary/25 [box-decoration-break:clone] transition-colors duration-200'
          : 'transition-colors duration-200'
      } ${className}`}
    >
      {children}
    </span>
  );
}
