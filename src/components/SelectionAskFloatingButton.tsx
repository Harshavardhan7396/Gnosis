import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircleQuestion } from 'lucide-react';
import { useAskContext } from '../context/AskContext';

interface SelectionSnapshot {
  selectedText: string;
  paragraphText: string;
  sectionTitle: string;
  top: number;
  left: number;
  initialScrollY: number;
}

const MAX_WORDS = 8;
const MAX_CHARS = 90;
const SCROLL_HIDE_DISTANCE = 90;

function getElementFromNode(node: Node | null): Element | null {
  if (!node) return null;
  if (node.nodeType === Node.ELEMENT_NODE) return node as Element;
  return node.parentElement;
}

function isExcludedElement(el: Element | null): boolean {
  if (!el) return true;
  if (
    el.closest(
      '[data-ask-panel="true"], [data-selection-ask-trigger="true"], input, textarea, select, [contenteditable="true"]'
    )
  ) {
    return true;
  }
  const active = document.activeElement;
  if (
    active &&
    (active.tagName === 'INPUT' ||
      active.tagName === 'TEXTAREA' ||
      (active as HTMLElement).isContentEditable)
  ) {
    return true;
  }
  return false;
}

function extractParagraphContext(el: Element): string {
  const block = el.closest(
    'p, li, h1, h2, h3, h4, h5, h6, blockquote, label, dd, [data-ask-paragraph="true"]'
  );
  const target = block ?? el.parentElement ?? el;
  return (target.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 1200);
}

export function SelectionAskFloatingButton() {
  const { openAskAbout, currentLessonTitle } = useAskContext();
  const [snapshot, setSnapshot] = useState<SelectionSnapshot | null>(null);
  const debounceTimerRef = useRef<number | null>(null);

  const evaluateSelection = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      setSnapshot(null);
      return;
    }

    const rawText = sel.toString().trim().replace(/\s+/g, ' ');
    if (!rawText || rawText.length > MAX_CHARS || !/[a-zA-Z0-9]/.test(rawText)) {
      setSnapshot(null);
      return;
    }

    const wordCount = rawText.split(/\s+/).filter(Boolean).length;
    if (wordCount === 0 || wordCount > MAX_WORDS) {
      setSnapshot(null);
      return;
    }

    const range = sel.getRangeAt(0);
    const anchorEl = getElementFromNode(range.commonAncestorContainer);
    if (!anchorEl || isExcludedElement(anchorEl)) {
      setSnapshot(null);
      return;
    }

    if (!anchorEl.closest('[data-ask-selectable="true"]')) {
      setSnapshot(null);
      return;
    }

    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      setSnapshot(null);
      return;
    }

    const paragraphText = extractParagraphContext(anchorEl);
    const sectionTitle =
      anchorEl.closest('[data-section-title]')?.getAttribute('data-section-title') ?? '';

    const top = rect.top >= 112 ? rect.top - 48 : rect.bottom + 10;
    const halfBtnWidth = 82;
    const left = Math.min(
      window.innerWidth - halfBtnWidth - 12,
      Math.max(halfBtnWidth + 12, rect.left + rect.width / 2)
    );

    setSnapshot({
      selectedText: rawText,
      paragraphText: paragraphText || rawText,
      sectionTitle,
      top,
      left,
      initialScrollY: window.scrollY,
    });
  }, []);

  useEffect(() => {
    const scheduleEvaluate = (delay = 120) => {
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = window.setTimeout(() => {
        evaluateSelection();
      }, delay);
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest('[data-selection-ask-trigger="true"]')) {
        return;
      }
      setSnapshot(null);
    };

    const handlePointerUp = () => {
      scheduleEvaluate(30);
    };

    const handleKeyUp = () => {
      scheduleEvaluate(40);
    };

    const handleSelectionChange = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        if (debounceTimerRef.current !== null) {
          window.clearTimeout(debounceTimerRef.current);
        }
        setSnapshot(null);
        return;
      }
      // Supports mobile long-press handle adjustments smoothly
      scheduleEvaluate(150);
    };

    const handleScroll = () => {
      setSnapshot((prev) => {
        if (!prev) return null;
        if (Math.abs(window.scrollY - prev.initialScrollY) > SCROLL_HIDE_DISTANCE) {
          return null;
        }
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || sel.rangeCount === 0) return null;
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return null;
        const nextTop = rect.top >= 112 ? rect.top - 48 : rect.bottom + 10;
        return { ...prev, top: nextTop };
      });
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('touchend', handlePointerUp, { passive: true });
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('selectionchange', handleSelectionChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
      }
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('touchend', handlePointerUp);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [evaluateSelection]);

  if (!snapshot) return null;

  const handleOpenAsk = () => {
    const { selectedText, paragraphText, sectionTitle } = snapshot;
    openAskAbout({
      id: `sel-${Date.now()}-${selectedText.toLowerCase().slice(0, 32)}`,
      mode: 'selection',
      topic: selectedText,
      selectedText,
      paragraphText,
      sectionTitle,
      lessonTitle: currentLessonTitle,
      sectionText: paragraphText,
      autoQuestion: `What does '${selectedText}' mean here?`,
    });
    setSnapshot(null);
    try {
      window.getSelection()?.removeAllRanges();
    } catch {
      // Ignore selection clear errors
    }
  };

  return (
    <div
      data-selection-ask-trigger="true"
      style={{
        top: `${snapshot.top}px`,
        left: `${snapshot.left}px`,
        transform: 'translateX(-50%)',
      }}
      className="fixed z-[55]"
    >
      <button
        type="button"
        onPointerDown={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleOpenAsk}
        aria-label={`Ask about ${snapshot.selectedText}`}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-lg bg-surface border border-primary/45 text-primary text-xs font-medium shadow-[0_8px_24px_-4px_rgba(28,25,23,0.16)] hover:bg-surface-container-lowest hover:border-primary transition-colors whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <MessageCircleQuestion className="w-3.5 h-3.5 shrink-0" />
        <span>Ask about this</span>
      </button>
    </div>
  );
}
