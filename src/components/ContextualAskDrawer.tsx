import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { X, Send, Loader2, AlertCircle, BookOpen } from 'lucide-react';
import { useAskContext } from '../context/AskContext';
import { findInstantTermMatch, normalizeQuestionKey } from '../data/instantAnswers';
import type { AskSectionContext } from '../types/lesson';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  showGlossaryLink?: boolean;
  glossaryTermKey?: string;
}

const SECTION_CHIPS = [
  'Explain this again, simpler',
  'Give me another example',
  'What mistakes do beginners make here?',
];

const SELECTION_CHIPS = [
  'Explain again, simpler',
  'Give me another example',
  'What mistakes do beginners make here?',
];

const CONTEXT_CACHE_STORAGE_KEY = 'gitstart-ctx-cache-v1';
const MAX_CLIENT_CACHE = 120;
const clientContextCache = new Map<string, string>();

function buildCacheKey(
  ctx: AskSectionContext,
  question: string,
  history: Array<{ role: 'user' | 'model'; text: string }>
): string {
  const historySig = history
    .slice(-8)
    .map((h) => `${h.role}:${normalizeQuestionKey(h.text)}`)
    .join('|');

  if (ctx.mode === 'selection') {
    const sel = ctx.selectedText ?? ctx.topic;
    const para = (ctx.paragraphText ?? ctx.sectionText).slice(0, 400);
    return `sel::${normalizeQuestionKey(sel)}::${normalizeQuestionKey(para)}::${normalizeQuestionKey(question)}::${historySig}`;
  }

  return `${normalizeQuestionKey(ctx.topic)}::${normalizeQuestionKey(question)}::${historySig}`;
}

function readCachedReply(key: string): string | null {
  const mem = clientContextCache.get(key);
  if (mem) return mem;

  try {
    const raw = localStorage.getItem(CONTEXT_CACHE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, string>;
    const hit = parsed[key];
    if (typeof hit === 'string' && hit.trim()) {
      clientContextCache.set(key, hit);
      return hit;
    }
  } catch {
    // Ignore storage read errors
  }
  return null;
}

function writeCachedReply(key: string, text: string) {
  clientContextCache.set(key, text);
  try {
    const raw = localStorage.getItem(CONTEXT_CACHE_STORAGE_KEY);
    const existing = raw ? (JSON.parse(raw) as Record<string, string>) : {};
    const keys = Object.keys(existing);
    if (keys.length >= MAX_CLIENT_CACHE && !existing[key]) {
      delete existing[keys[0]];
    }
    existing[key] = text;
    localStorage.setItem(CONTEXT_CACHE_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Ignore storage write errors
  }
}

export function ContextualAskDrawer() {
  const { activeContext, closeAskAbout, openGlossary } = useAskContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  messagesRef.current = messages;

  const sendQuestion = useCallback(
    async (
      rawQuery: string,
      ctxOverride?: AskSectionContext,
      historyOverride?: Array<{ role: 'user' | 'model'; text: string }>
    ) => {
      const ctx = ctxOverride ?? activeContext;
      if (!ctx) return;
      const trimmed = rawQuery.trim();
      if (!trimmed) return;

      const priorHistory =
        historyOverride ?? messagesRef.current.map((m) => ({ role: m.role, text: m.text }));
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        role: 'user',
        text: trimmed,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setError(null);
      setStreamingText('');

      // Check stored glossary for instant match on highlighted term selection
      if (ctx.mode === 'selection' && priorHistory.length === 0) {
        const instantMatch = findInstantTermMatch(ctx.selectedText ?? ctx.topic);
        if (instantMatch) {
          const formatted = [
            instantMatch.answer.meaning,
            `Think of it like: ${instantMatch.answer.comparison}`,
            `Where in GitHub: ${instantMatch.answer.whereToFind}`,
          ].join('\n\n');

          setMessages((prev) => [
            ...prev,
            {
              id: `model-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              role: 'model',
              text: formatted,
              showGlossaryLink: true,
              glossaryTermKey: instantMatch.key,
            },
          ]);
          return;
        }
      }

      const cacheKey = buildCacheKey(ctx, trimmed, priorHistory);
      const cached = readCachedReply(cacheKey);
      if (cached) {
        setMessages((prev) => [
          ...prev,
          {
            id: `model-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            role: 'model',
            text: cached,
          },
        ]);
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);

      try {
        const response = await fetch('/api/ask-context', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: ctx.mode ?? 'section',
            topic: ctx.topic,
            lessonTitle: ctx.lessonTitle,
            sectionText: ctx.sectionText,
            selectedText: ctx.selectedText,
            paragraphText: ctx.paragraphText,
            sectionTitle: ctx.sectionTitle,
            question: trimmed,
            history: priorHistory,
          }),
          signal: controller.signal,
        });

        const contentType = response.headers.get('content-type') ?? '';

        if (!contentType.includes('text/event-stream')) {
          const data = (await response.json()) as { text?: string; error?: string };
          if (!response.ok || !data.text) {
            setError(data.error ?? 'Could not get an answer right now. Please try again.');
            return;
          }
          const replyText = data.text.trim();
          writeCachedReply(cacheKey, replyText);
          setMessages((prev) => [
            ...prev,
            {
              id: `model-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              role: 'model',
              text: replyText,
            },
          ]);
          return;
        }

        if (!response.body) {
          setError('Streaming is not supported in this browser. Please try again.');
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let sseBuffer = '';
        let accumulated = '';
        let completed = false;

        const processEventBlock = (block: string) => {
          const lines = block.split('\n');
          let eventName = 'message';
          const dataLines: string[] = [];

          for (const line of lines) {
            if (line.startsWith('event:')) {
              eventName = line.slice(6).trim();
            } else if (line.startsWith('data:')) {
              dataLines.push(line.slice(5).trim());
            }
          }

          if (dataLines.length === 0) return;
          let payload: Record<string, unknown>;
          try {
            payload = JSON.parse(dataLines.join('\n')) as Record<string, unknown>;
          } catch {
            return;
          }

          if (eventName === 'chunk' && typeof payload.delta === 'string') {
            accumulated += payload.delta;
            setStreamingText(accumulated);
          } else if (eventName === 'done' && typeof payload.text === 'string') {
            completed = true;
            const finalText = payload.text.trim();
            if (finalText) {
              writeCachedReply(cacheKey, finalText);
              setMessages((prev) => [
                ...prev,
                {
                  id: `model-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                  role: 'model',
                  text: finalText,
                },
              ]);
            }
            setStreamingText('');
          } else if (eventName === 'error') {
            completed = true;
            setError(
              typeof payload.error === 'string'
                ? payload.error
                : 'Something went wrong. Please try again.'
            );
            setStreamingText('');
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          sseBuffer += decoder.decode(value, { stream: true });

          let boundary = sseBuffer.indexOf('\n\n');
          while (boundary !== -1) {
            const block = sseBuffer.slice(0, boundary).trim();
            sseBuffer = sseBuffer.slice(boundary + 2);
            if (block) processEventBlock(block);
            boundary = sseBuffer.indexOf('\n\n');
          }
        }

        if (sseBuffer.trim()) {
          processEventBlock(sseBuffer.trim());
        }

        if (!completed && accumulated.trim()) {
          const finalText = accumulated.trim();
          writeCachedReply(cacheKey, finalText);
          setMessages((prev) => [
            ...prev,
            {
              id: `model-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              role: 'model',
              text: finalText,
            },
          ]);
          setStreamingText('');
        }
      } catch (err: unknown) {
        if ((err as { name?: string })?.name === 'AbortError') return;
        setError('Network error reaching the server. Please try again.');
        setStreamingText('');
      } finally {
        if (abortRef.current === controller) {
          setLoading(false);
        }
      }
    },
    [activeContext]
  );

  // Reset conversation history whenever the user moves to a different section or selection,
  // and auto-send the initial question if one is provided (for text selection).
  useEffect(() => {
    abortRef.current?.abort();
    setMessages([]);
    setInput('');
    setStreamingText('');
    setError(null);
    setLoading(false);

    if (!activeContext) return;

    if (activeContext.autoQuestion) {
      void sendQuestion(activeContext.autoQuestion, activeContext, []);
      return;
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 60);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeContext?.id]);

  // Close on Escape
  useEffect(() => {
    if (!activeContext) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAskAbout();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeContext, closeAskAbout]);

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, streamingText, loading]);

  if (!activeContext) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!loading) {
      void sendQuestion(input);
    }
  };

  const quickChips = activeContext.mode === 'selection' ? SELECTION_CHIPS : SECTION_CHIPS;

  return (
    <>
      {/* Mobile backdrop for bottom sheet */}
      <div
        className="fixed inset-0 z-50 bg-on-surface/35 backdrop-blur-[1px] md:hidden"
        onClick={closeAskAbout}
        aria-hidden="true"
      />

      {/* Responsive panel: Bottom sheet on mobile, Side drawer on desktop */}
      <aside
        role="dialog"
        data-ask-panel="true"
        aria-label={`Asking about ${activeContext.topic}`}
        className="fixed z-[60] inset-x-0 bottom-0 max-h-[82vh] rounded-t-2xl md:inset-x-auto md:top-20 md:right-6 md:bottom-6 md:w-[400px] md:max-h-none md:rounded-xl bg-surface-container-lowest border border-outline-variant/60 shadow-[0_12px_36px_-4px_rgba(28,25,23,0.18)] flex flex-col overflow-hidden"
      >
        {/* Mobile bottom-sheet handle */}
        <div className="md:hidden pt-2.5 pb-1 flex justify-center bg-surface-container-low/80">
          <span className="w-10 h-1 rounded-full bg-outline-variant/60" aria-hidden="true" />
        </div>

        {/* Header */}
        <div className="bg-surface-container-low/80 border-b border-outline-variant/35 px-4 sm:px-5 py-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary block mb-0.5">
              {activeContext.mode === 'selection' ? 'Selected Phrase' : 'Section Tutor'}
            </span>
            <h2 className="text-sm font-semibold text-on-surface leading-snug truncate">
              Asking about: {activeContext.topic}
            </h2>
            <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
              {activeContext.sectionTitle
                ? `${activeContext.lessonTitle} · ${activeContext.sectionTitle}`
                : activeContext.lessonTitle}
            </p>
          </div>
          <button
            type="button"
            onClick={closeAskAbout}
            aria-label="Close contextual tutor"
            className="w-8 h-8 rounded-lg border border-outline-variant/40 bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick-question chips */}
        <div className="px-4 sm:px-5 py-3 border-b border-outline-variant/25 bg-surface-container-low/30">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant/75 mb-2">
            Quick questions
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickChips.map((chip) => (
              <button
                key={chip}
                type="button"
                disabled={loading}
                onClick={() => void sendQuestion(chip)}
                className="px-2.5 py-1 rounded-md bg-surface-container-lowest border border-outline-variant/45 text-[11px] text-on-surface-variant hover:text-primary hover:border-primary/40 disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed text-left"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation history */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {messages.length === 0 && !loading && !error && (
            <div className="rounded-lg bg-surface-container-low/45 border border-outline-variant/30 p-3.5 text-xs text-on-surface-variant leading-relaxed">
              Ask anything about <span className="font-medium text-on-surface">{activeContext.topic}</span>,
              or tap one of the quick questions above. You can also ask follow-up questions here.
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-primary-fixed/35 border border-primary/25 text-on-surface'
                    : 'bg-surface-container-low/65 border border-outline-variant/35 text-on-surface'
                }`}
              >
                <div>{msg.text}</div>
                {msg.showGlossaryLink && (
                  <div className="mt-2.5 pt-2 border-t border-outline-variant/30">
                    <button
                      type="button"
                      onClick={() => openGlossary(msg.glossaryTermKey)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary hover:underline cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span>Open in glossary</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && !streamingText && (
            <div className="flex justify-start">
              <div className="rounded-xl bg-surface-container-low/65 border border-outline-variant/35 px-3.5 py-2.5 flex items-center gap-2 text-xs text-on-surface-variant">
                <Loader2 className="w-3.5 h-3.5 text-primary animate-spin shrink-0" />
                <span>Thinking...</span>
              </div>
            </div>
          )}

          {streamingText && (
            <div className="flex justify-start">
              <div className="max-w-[88%] rounded-xl bg-surface-container-low/65 border border-outline-variant/35 px-3.5 py-2.5 text-xs text-on-surface leading-relaxed whitespace-pre-line">
                {streamingText}
                {loading && (
                  <span
                    className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-primary/70 animate-pulse"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="rounded-lg bg-primary-fixed/30 border border-primary/35 p-3 flex items-start gap-2 text-xs text-on-surface"
            >
              <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="leading-relaxed">{error}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input footer */}
        <form
          onSubmit={handleSubmit}
          className="p-3.5 sm:p-4 border-t border-outline-variant/35 bg-surface-container-low/40 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask a follow-up about ${activeContext.topic}...`}
            maxLength={300}
            aria-label={`Ask a question about ${activeContext.topic}`}
            className="flex-1 min-w-0 text-xs px-3 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/45 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-primary-container text-on-primary text-xs font-medium hover:bg-primary disabled:opacity-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Ask</span>
          </button>
        </form>
      </aside>
    </>
  );
}
