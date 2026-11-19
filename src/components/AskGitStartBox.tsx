import { useState, useRef, useEffect, FormEvent } from 'react';
import { HelpCircle, X, Send, AlertCircle, Loader2 } from 'lucide-react';
import {
  findInstantAnswer,
  normalizeQuestionKey,
  type AskResult,
} from '../data/instantAnswers';
import { useAskContext } from '../context/AskContext';

const STARTER_TERMS = ['README', 'pull request', 'fork', 'merge'];
const ASK_CACHE_STORAGE_KEY = 'gitstart-ask-cache-v1';
const MAX_CLIENT_CACHE = 100;

const memoryCache = new Map<string, AskResult>();

function readCachedAnswer(key: string): AskResult | null {
  const inMemory = memoryCache.get(key);
  if (inMemory) return inMemory;

  try {
    const raw = localStorage.getItem(ASK_CACHE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, AskResult>;
    const hit = parsed[key];
    if (hit && hit.meaning && hit.comparison && hit.whereToFind) {
      memoryCache.set(key, hit);
      return hit;
    }
  } catch {
    // Ignore storage read errors
  }
  return null;
}

function writeCachedAnswer(key: string, value: AskResult) {
  memoryCache.set(key, value);
  try {
    const raw = localStorage.getItem(ASK_CACHE_STORAGE_KEY);
    const existing = raw ? (JSON.parse(raw) as Record<string, AskResult>) : {};
    const keys = Object.keys(existing);
    if (keys.length >= MAX_CLIENT_CACHE && !existing[key]) {
      delete existing[keys[0]];
    }
    existing[key] = value;
    localStorage.setItem(ASK_CACHE_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Ignore storage write errors
  }
}

function parsePartialLabeledAnswer(raw: string): AskResult {
  const cleaned = raw.replace(/\*\*/g, '');
  const meaningMatch = cleaned.match(
    /(?:^|\n)\s*(?:\d+\.\s*)?MEANING:\s*([\s\S]*?)(?=(?:\n\s*(?:\d+\.\s*)?(?:COMPARISON|WHERE):)|$)/i
  );
  const comparisonMatch = cleaned.match(
    /(?:^|\n)\s*(?:\d+\.\s*)?COMPARISON:\s*([\s\S]*?)(?=(?:\n\s*(?:\d+\.\s*)?WHERE:)|$)/i
  );
  const whereMatch = cleaned.match(/(?:^|\n)\s*(?:\d+\.\s*)?WHERE:\s*([\s\S]*?)$/i);

  return {
    meaning: (meaningMatch?.[1] ?? '').trimStart(),
    comparison: (comparisonMatch?.[1] ?? '').trimStart(),
    whereToFind: (whereMatch?.[1] ?? '').trimStart(),
  };
}

export function AskGitStartBox() {
  const { activeContext } = useAskContext();
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<AskResult | null>(null);
  const [lastAsked, setLastAsked] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const askQuestion = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed || loading) return;

    const instant = findInstantAnswer(trimmed);
    if (instant) {
      setError(null);
      setLastAsked(trimmed);
      setAnswer(instant);
      setLoading(false);
      return;
    }

    const cacheKey = normalizeQuestionKey(trimmed);
    const cached = readCachedAnswer(cacheKey);
    if (cached) {
      setError(null);
      setLastAsked(trimmed);
      setAnswer(cached);
      setLoading(false);
      return;
    }

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setAnswer(null);
    setLastAsked(trimmed);

    try {
      const response = await fetch('/api/ask-gitstart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
        signal: controller.signal,
      });

      const contentType = response.headers.get('content-type') ?? '';

      if (!contentType.includes('text/event-stream')) {
        const data = (await response.json()) as Partial<AskResult> & { error?: string };
        if (!response.ok || !data.meaning || !data.comparison || !data.whereToFind) {
          setError(data.error ?? 'Could not explain that right now. Please try again.');
          setAnswer(null);
          return;
        }
        const finalResult: AskResult = {
          meaning: data.meaning,
          comparison: data.comparison,
          whereToFind: data.whereToFind,
        };
        writeCachedAnswer(cacheKey, finalResult);
        setAnswer(finalResult);
        return;
      }

      if (!response.body) {
        setError('Streaming is not supported in this browser. Please try again.');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let sseBuffer = '';
      let accumulatedText = '';
      let streamFinished = false;

      const handleEventBlock = (block: string) => {
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
        const payloadStr = dataLines.join('\n');

        let payload: Record<string, unknown>;
        try {
          payload = JSON.parse(payloadStr) as Record<string, unknown>;
        } catch {
          return;
        }

        if (eventName === 'chunk' && typeof payload.delta === 'string') {
          accumulatedText += payload.delta;
          const partial = parsePartialLabeledAnswer(accumulatedText);
          if (partial.meaning || partial.comparison || partial.whereToFind) {
            setAnswer(partial);
          }
        } else if (eventName === 'done') {
          streamFinished = true;
          const finalResult: AskResult = {
            meaning: String(payload.meaning ?? '').trim(),
            comparison: String(payload.comparison ?? '').trim(),
            whereToFind: String(payload.whereToFind ?? '').trim(),
          };
          if (finalResult.meaning && finalResult.comparison && finalResult.whereToFind) {
            writeCachedAnswer(cacheKey, finalResult);
            setAnswer(finalResult);
          }
        } else if (eventName === 'error') {
          streamFinished = true;
          setError(
            typeof payload.error === 'string'
              ? payload.error
              : 'Something went wrong getting an explanation. Please try again.'
          );
          setAnswer(null);
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
          if (block) {
            handleEventBlock(block);
          }
          boundary = sseBuffer.indexOf('\n\n');
        }
      }

      if (sseBuffer.trim()) {
        handleEventBlock(sseBuffer.trim());
      }

      if (!streamFinished && accumulatedText.trim()) {
        const fallback = parsePartialLabeledAnswer(accumulatedText);
        if (fallback.meaning && fallback.comparison && fallback.whereToFind) {
          writeCachedAnswer(cacheKey, fallback);
          setAnswer(fallback);
        }
      }
    } catch (err: unknown) {
      if ((err as { name?: string })?.name === 'AbortError') return;
      setError('Network error reaching the server. Please try again.');
      setAnswer(null);
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    askQuestion(question);
  };

  const hasPartialAnswer = Boolean(
    answer && (answer.meaning || answer.comparison || answer.whereToFind)
  );

  if (activeContext) return null;

  return (
    <div
      data-ask-panel="true"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
    >
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-medium shadow-[0_8px_24px_-4px_rgba(28,25,23,0.18)] hover:bg-primary-container transition-colors whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>Ask GitStart</span>
        </button>
      ) : (
        <section
          aria-label="Ask GitStart beginner helper"
          className="w-[calc(100vw-2rem)] sm:w-[360px] rounded-xl bg-surface-container-lowest border border-outline-variant/60 shadow-[0_12px_32px_-4px_rgba(28,25,23,0.14)] overflow-hidden flex flex-col max-h-[78vh]"
        >
          {/* Header */}
          <div className="bg-surface-container-low/80 border-b border-outline-variant/35 px-4 py-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-on-surface leading-tight">
                Ask GitStart
              </h2>
              <p className="text-[11px] text-on-surface-variant truncate">
                Plain-English GitHub helper
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Ask GitStart"
              className="w-8 h-8 rounded-lg border border-outline-variant/40 bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3.5 overflow-y-auto">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type a word (e.g. pull request)"
                maxLength={200}
                aria-label="Confusing GitHub word or question"
                className="flex-1 min-w-0 text-xs px-3 py-2.5 rounded-lg bg-surface-container-low/50 border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={loading || !question.trim()}
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

            {!answer && !loading && !error && (
              <div className="pt-0.5">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant/75 mb-2">
                  Try asking about
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {STARTER_TERMS.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setQuestion(term);
                        askQuestion(term);
                      }}
                      className="px-2.5 py-1 rounded-md bg-surface-container-low border border-outline-variant/35 text-xs text-on-surface-variant hover:text-on-surface hover:border-outline-variant/70 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && !hasPartialAnswer && (
              <div className="rounded-lg bg-surface-container-low/50 border border-outline-variant/30 p-3.5 flex items-center gap-2.5 text-xs text-on-surface-variant">
                <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />
                <span>Thinking...</span>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-lg bg-primary-fixed/30 border border-primary/35 p-3.5 flex items-start gap-2.5 text-xs text-on-surface"
              >
                <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="leading-relaxed">{error}</p>
              </div>
            )}

            {hasPartialAnswer && answer && (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-on-surface-variant">
                  <span className="truncate">
                    About <span className="text-on-surface font-semibold">“{lastAsked}”</span>
                  </span>
                  {loading && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-primary shrink-0">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Thinking...</span>
                    </span>
                  )}
                </div>

                {answer.meaning && (
                  <div className="rounded-lg bg-surface-container-low/50 border border-outline-variant/30 p-3">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-primary mb-1">
                      One-line meaning
                    </span>
                    <p className="text-xs text-on-surface leading-relaxed">{answer.meaning}</p>
                  </div>
                )}

                {answer.comparison && (
                  <div className="rounded-lg bg-surface-container-low/50 border border-outline-variant/30 p-3">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-secondary mb-1">
                      Real-life comparison
                    </span>
                    <p className="text-xs text-on-surface leading-relaxed italic">
                      “{answer.comparison}”
                    </p>
                  </div>
                )}

                {answer.whereToFind && (
                  <div className="rounded-lg bg-surface-container-low/50 border border-outline-variant/30 p-3">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant mb-1">
                      Where in GitHub
                    </span>
                    <p className="text-xs text-on-surface leading-relaxed">{answer.whereToFind}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
