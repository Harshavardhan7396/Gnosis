import { useState, useRef, useEffect, useId } from 'react';
import { ArrowRight } from 'lucide-react';
import { glossaryTerms } from '../data/lessons.js';
import type { GlossaryTerm } from '../types/lesson';
import { AskAboutButton } from './AskAboutButton';
import { useAskContext } from '../context/AskContext';

interface ExplainTextProps {
  text: string;
}

const VARIANT_TO_GLOSSARY_KEY: Record<string, string> = {
  repository: 'repository',
  repositories: 'repository',
  'main branch': 'main branch',
  'main branches': 'main branch',
  branch: 'branch',
  branches: 'branch',
  'commit message': 'commit message',
  'commit messages': 'commit message',
  commit: 'commit',
  commits: 'commit',
  'readme.md': 'readme',
  readme: 'readme',
  markdown: 'markdown',
  'pull request': 'pull request',
  'pull requests': 'pull request',
  'base branch': 'base branch',
  'base branches': 'base branch',
  'compare branch': 'compare branch',
  'compare branches': 'compare branch',
  fork: 'fork',
  forks: 'fork',
  clone: 'clone',
  clones: 'clone',
  merge: 'merge',
  merges: 'merge',
  review: 'review',
  reviews: 'review',
  issue: 'issue',
  issues: 'issue',
};

const SORTED_PATTERNS = Object.keys(VARIANT_TO_GLOSSARY_KEY)
  .sort((a, b) => b.length - a.length)
  .map((pattern) => pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

const TERM_REGEX = new RegExp(`\\b(${SORTED_PATTERNS.join('|')})\\b`, 'gi');
const TOOLTIP_EVENT = 'gitstart:explain-open';

function TermTrigger({
  word,
  entry,
}: {
  word: string;
  entry: GlossaryTerm;
}) {
  const { openGlossary } = useAskContext();
  const [open, setOpen] = useState(false);
  const [align, setAlign] = useState<'center' | 'left' | 'right'>('center');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const openedByHoverRef = useRef(false);
  const instanceId = useId();

  const updateAlignment = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportW = window.innerWidth;
    if (rect.left < 150) {
      setAlign('left');
    } else if (viewportW - rect.right < 150) {
      setAlign('right');
    } else {
      setAlign('center');
    }
  };

  const openTooltip = (byHover: boolean) => {
    updateAlignment();
    openedByHoverRef.current = byHover;
    window.dispatchEvent(new CustomEvent(TOOLTIP_EVENT, { detail: instanceId }));
    setOpen(true);
  };

  useEffect(() => {
    const handleOtherOpen = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail !== instanceId) {
        setOpen(false);
      }
    };

    const handleOutside = (event: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener(TOOLTIP_EVENT, handleOtherOpen);
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener(TOOLTIP_EVENT, handleOtherOpen);
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
      window.removeEventListener('keydown', handleKey);
    };
  }, [instanceId]);

  const positionClasses =
    align === 'left'
      ? 'left-0'
      : align === 'right'
        ? 'right-0'
        : 'left-1/2 -translate-x-1/2';

  const handleGoToCard = () => {
    setOpen(false);
    openGlossary(entry.key);
  };

  return (
    <span
      ref={wrapperRef}
      className="relative inline-block"
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') {
          openTooltip(true);
        }
      }}
      onMouseLeave={() => {
        openedByHoverRef.current = false;
        setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (open && openedByHoverRef.current) {
            handleGoToCard();
          } else {
            open ? setOpen(false) : openTooltip(false);
          }
        }}
        onFocus={() => openTooltip(false)}
        aria-expanded={open}
        aria-describedby={open ? `${instanceId}-tip` : undefined}
        title={`Open "${entry.term}" in glossary`}
        className="inline text-inherit font-inherit underline decoration-dotted decoration-primary/70 decoration-[1.5px] underline-offset-4 hover:text-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm cursor-pointer transition-colors"
      >
        {word}
      </button>

      {open && (
        <span
          id={`${instanceId}-tip`}
          role="tooltip"
          className={`absolute bottom-full mb-2.5 z-40 w-64 sm:w-72 rounded-xl bg-surface-container-lowest border border-outline-variant/60 shadow-[0_12px_32px_-4px_rgba(28,25,23,0.12)] p-4 text-left block pointer-events-auto ${positionClasses}`}
        >
          <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-primary mb-1">
            {entry.term}
          </span>
          <span className="block text-xs text-on-surface leading-relaxed mb-2.5 font-normal">
            {entry.meaning}
          </span>
          <span className="block pt-2 border-t border-outline-variant/25 text-[11px] text-on-surface-variant leading-relaxed">
            <span className="font-semibold uppercase tracking-[0.08em] text-[10px] text-on-surface-variant/80 block mb-0.5">
              Think of it like...
            </span>
            <span className="italic">“{entry.analogy}”</span>
          </span>
          <span className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-outline-variant/25">
            <button
              type="button"
              onClick={handleGoToCard}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline cursor-pointer whitespace-nowrap"
            >
              <span>Open card</span>
              <ArrowRight className="w-3 h-3 shrink-0" />
            </button>
            <AskAboutButton
              sectionId={`glossary-term-${entry.key}`}
              topic={entry.term}
              sectionText={`${entry.term}: ${entry.meaning}\nThink of it like: ${entry.analogy}`}
              onBeforeOpen={() => setOpen(false)}
            />
          </span>
        </span>
      )}
    </span>
  );
}

export function ExplainText({ text }: ExplainTextProps) {
  const parts: Array<{ value: string; entry?: GlossaryTerm }> = [];
  let lastIndex = 0;
  const typedGlossary = glossaryTerms as Record<string, GlossaryTerm>;

  for (const match of text.matchAll(TERM_REGEX)) {
    const matchIndex = match.index ?? 0;
    if (matchIndex > lastIndex) {
      parts.push({ value: text.slice(lastIndex, matchIndex) });
    }
    const matchedWord = match[0];
    const mappedKey = VARIANT_TO_GLOSSARY_KEY[matchedWord.toLowerCase()];
    const entry = mappedKey ? typedGlossary[mappedKey] : undefined;
    parts.push({
      value: matchedWord,
      entry,
    });
    lastIndex = matchIndex + matchedWord.length;
  }

  if (lastIndex < text.length) {
    parts.push({ value: text.slice(lastIndex) });
  }

  return (
    <>
      {parts.map((part, idx) =>
        part.entry ? (
          <TermTrigger key={`${part.value}-${idx}`} word={part.value} entry={part.entry} />
        ) : (
          <span key={idx}>{part.value}</span>
        )
      )}
    </>
  );
}
