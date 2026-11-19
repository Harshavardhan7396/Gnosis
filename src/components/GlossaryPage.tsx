import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Lock,
} from 'lucide-react';
import { glossaryTerms } from '../data/lessons.js';
import type { GlossaryTerm, Lesson } from '../types/lesson';
import { AskAboutButton } from './AskAboutButton';

interface GlossaryPageProps {
  lessons: Lesson[];
  unlockedMaxIndex: number;
  focusedTermKey: string | null;
  onSelectLesson: (lessonIndex: number) => void;
  onBackToLessons: () => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function GlossaryPage({
  lessons,
  unlockedMaxIndex,
  focusedTermKey,
  onSelectLesson,
  onBackToLessons,
}: GlossaryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>(() =>
    focusedTermKey ? { [focusedTermKey]: true } : {}
  );

  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const sortedTerms = useMemo(() => {
    const entries = Object.values(glossaryTerms) as GlossaryTerm[];
    return [...entries].sort((a, b) =>
      a.term.localeCompare(b.term, 'en', { sensitivity: 'base' })
    );
  }, []);

  const lessonById = useMemo(() => {
    const map = new Map<string, { lesson: Lesson; index: number }>();
    lessons.forEach((lesson, index) => {
      map.set(lesson.id, { lesson, index });
    });
    return map;
  }, [lessons]);

  const lettersWithTerms = useMemo(() => {
    const set = new Set<string>();
    for (const entry of sortedTerms) {
      const firstChar = entry.term.trim().charAt(0).toUpperCase();
      if (firstChar) set.add(firstChar);
    }
    return set;
  }, [sortedTerms]);

  const filteredTerms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return sortedTerms.filter((entry) => {
      if (selectedLetter) {
        const firstChar = entry.term.trim().charAt(0).toUpperCase();
        if (firstChar !== selectedLetter) return false;
      }
      if (!q) return true;
      return (
        entry.term.toLowerCase().includes(q) ||
        entry.meaning.toLowerCase().includes(q) ||
        entry.analogy.toLowerCase().includes(q) ||
        entry.whereToFind.toLowerCase().includes(q)
      );
    });
  }, [sortedTerms, searchQuery, selectedLetter]);

  // Open & scroll smoothly when navigated from a lesson term link or drawer
  useEffect(() => {
    if (!focusedTermKey) return;
    setSearchQuery('');
    setSelectedLetter(null);
    setOpenKeys((prev) => ({ ...prev, [focusedTermKey]: true }));

    const timer = window.setTimeout(() => {
      const el = cardRefs.current[focusedTermKey];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 80);
    return () => window.clearTimeout(timer);
  }, [focusedTermKey]);

  const toggleCard = (key: string) => {
    setOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allOpen =
    filteredTerms.length > 0 && filteredTerms.every((entry) => Boolean(openKeys[entry.key]));

  const handleToggleAll = () => {
    if (allOpen) {
      setOpenKeys({});
    } else {
      const next: Record<string, boolean> = {};
      for (const entry of filteredTerms) {
        next[entry.key] = true;
      }
      setOpenKeys(next);
    }
  };

  return (
    <div className="w-full py-6 sm:py-12" data-ask-selectable="true">
      {/* Back link */}
      <div className="mb-6 flex items-center gap-3 text-xs text-on-surface-variant">
        <button
          type="button"
          onClick={onBackToLessons}
          className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to lessons</span>
        </button>
        <span aria-hidden="true">·</span>
        <span className="tabular-nums">{sortedTerms.length} beginner terms</span>
      </div>

      {/* Header */}
      <section className="w-full pb-8 sm:pb-10 border-b border-outline-variant/30">
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold tracking-[0.12em] text-primary uppercase mb-3">
            GitStart · Plain-English Glossary
          </div>
          <h1 className="text-[34px] leading-[1.15] sm:text-[44px] font-normal text-on-surface tracking-[-0.02em] mb-4 [text-wrap:balance]">
            Words you will meet on <span className="font-medium text-primary">GitHub</span>
          </h1>
          <p className="text-[16px] leading-[1.7] text-on-surface-variant max-w-[60ch]">
            Browse every term alphabetically, filter by letter, or search as you type. Click any
            word to open its meaning, real-life comparison, and where to spot it in GitHub.
          </p>
        </div>

        {/* Search + A-Z Letter Bar */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-on-surface-variant/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search terms (e.g. branch, commit, fork)..."
                aria-label="Search glossary terms"
                className="w-full pl-10 pr-9 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 text-xs text-on-surface-variant">
              <span className="tabular-nums">
                Showing {filteredTerms.length} of {sortedTerms.length} terms
              </span>
              {filteredTerms.length > 0 && (
                <button
                  type="button"
                  onClick={handleToggleAll}
                  className="font-medium text-primary hover:underline cursor-pointer whitespace-nowrap"
                >
                  {allOpen ? 'Collapse all' : 'Open all cards'}
                </button>
              )}
            </div>
          </div>

          {/* A-Z Letter Bar */}
          <nav
            aria-label="Glossary alphabetical filter"
            className="flex flex-wrap items-center gap-1 pt-1"
          >
            <button
              type="button"
              onClick={() => setSelectedLetter(null)}
              aria-pressed={selectedLetter === null}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedLetter === null
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface-container-lowest border border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:border-outline-variant'
              }`}
            >
              All
            </button>
            {ALPHABET.map((letter) => {
              const hasTerms = lettersWithTerms.has(letter);
              const isSelected = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  disabled={!hasTerms}
                  onClick={() => setSelectedLetter(isSelected ? null : letter)}
                  aria-pressed={isSelected}
                  className={`w-7 h-7 rounded-md text-xs font-mono transition-colors flex items-center justify-center ${
                    isSelected
                      ? 'bg-primary-container text-on-primary font-semibold cursor-pointer'
                      : hasTerms
                        ? 'bg-surface-container-lowest border border-outline-variant/40 text-on-surface hover:border-primary/50 hover:text-primary cursor-pointer'
                        : 'bg-surface-container-low/40 border border-outline-variant/20 text-on-surface-variant/35 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Glossary List */}
      <section
        className="pt-8 sm:pt-10"
        data-section-title="GitHub Glossary Terms"
      >
        {filteredTerms.length === 0 ? (
          <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/40 p-8 text-center">
            <p className="text-base font-medium text-on-surface mb-2">
              No matching terms found
            </p>
            <p className="text-sm text-on-surface-variant mb-4">
              Try a shorter word or reset the letter filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedLetter(null);
              }}
              className="px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/45 text-xs font-medium text-on-surface hover:border-primary/40 transition-colors cursor-pointer"
            >
              Show all {sortedTerms.length} terms
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredTerms.map((entry) => {
              const isOpen = Boolean(openKeys[entry.key]) || Boolean(searchQuery.trim());
              const isFocused = focusedTermKey === entry.key;
              const lessonMatch = lessonById.get(entry.lessonId);
              const isLessonUnlocked = lessonMatch
                ? !lessonMatch.lesson.comingSoon && lessonMatch.index <= unlockedMaxIndex
                : false;

              return (
                <article
                  key={entry.key}
                  id={`glossary-card-${entry.key}`}
                  ref={(el) => {
                    cardRefs.current[entry.key] = el;
                  }}
                  className={`rounded-xl border bg-surface-container-lowest transition-colors overflow-hidden ${
                    isFocused
                      ? 'border-primary/60 shadow-[0_4px_24px_-2px_rgba(144,7,8,0.08)]'
                      : 'border-outline-variant/40 shadow-[0_2px_12px_-2px_rgba(28,25,23,0.03)]'
                  }`}
                >
                  {/* Term Trigger Header (kept separate from inner buttons) */}
                  <button
                    type="button"
                    onClick={() => toggleCard(entry.key)}
                    aria-expanded={isOpen}
                    className="w-full px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 text-left hover:bg-surface-container-low/35 transition-colors cursor-pointer"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h2 className="text-[19px] sm:text-[21px] font-medium text-on-surface leading-snug">
                          {entry.term}
                        </h2>
                        {lessonMatch && (
                          <span className="font-mono text-[11px] text-on-surface-variant/80 whitespace-nowrap">
                            Lesson {String(lessonMatch.index + 1).padStart(2, '0')}
                          </span>
                        )}
                      </div>
                      {!isOpen && (
                        <p className="text-xs sm:text-sm text-on-surface-variant truncate mt-1">
                          {entry.meaning}
                        </p>
                      )}
                    </div>

                    <span className="w-8 h-8 rounded-lg border border-outline-variant/35 bg-surface-container-low/50 flex items-center justify-center text-on-surface-variant shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {/* Opened Card Body */}
                  {isOpen && (
                    <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-1 border-t border-outline-variant/25 space-y-4">
                      {/* One-line meaning */}
                      <div className="pt-3">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-primary mb-1">
                          Plain-English Meaning
                        </span>
                        <p className="text-sm sm:text-[15px] text-on-surface leading-relaxed">
                          {entry.meaning}
                        </p>
                      </div>

                      {/* Think of it like... & Where to find it */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        <div className="rounded-lg bg-surface-container-low/55 border border-outline-variant/30 p-4">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-secondary mb-1">
                            Think of it like...
                          </span>
                          <p className="text-xs sm:text-sm text-on-surface/90 italic leading-relaxed">
                            “{entry.analogy}”
                          </p>
                        </div>

                        <div className="rounded-lg bg-surface-container-low/55 border border-outline-variant/30 p-4">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant/80 mb-1">
                            <MapPin className="w-3 h-3 text-primary" />
                            <span>Where to find it in GitHub</span>
                          </span>
                          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                            {entry.whereToFind}
                          </p>
                        </div>
                      </div>

                      {/* Footer row: Lesson link + Ask about this */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/20">
                        {lessonMatch ? (
                          isLessonUnlocked ? (
                            <button
                              type="button"
                              onClick={() => onSelectLesson(lessonMatch.index)}
                              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-primary hover:underline cursor-pointer"
                            >
                              <span>
                                Taught in Lesson {lessonMatch.index + 1}:{' '}
                                {lessonMatch.lesson.cardTitle}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant">
                              <Lock className="w-3.5 h-3.5 shrink-0 text-on-surface-variant/70" />
                              <span>
                                Taught in Lesson {lessonMatch.index + 1}:{' '}
                                {lessonMatch.lesson.cardTitle} (complete Lesson{' '}
                                {lessonMatch.index} to unlock)
                              </span>
                            </span>
                          )
                        ) : (
                          <span />
                        )}

                        <AskAboutButton
                          sectionId={`glossary-term-${entry.key}`}
                          topic={entry.term}
                          lessonTitle="Plain-English GitHub Glossary"
                          sectionText={`${entry.term}: ${entry.meaning}\nThink of it like: ${entry.analogy}\nWhere to find it in GitHub: ${entry.whereToFind}`}
                        />
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
