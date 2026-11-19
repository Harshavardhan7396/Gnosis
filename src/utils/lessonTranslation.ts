import type { CodeSegment, Lesson, QuizData } from '../types/lesson';
import preTeRaw from '../../translations/te.json';
import preHiRaw from '../../translations/hi.json';
import preTaRaw from '../../translations/ta.json';

export type SupportedLanguage = 'en' | 'te' | 'hi' | 'ta';
export type TranslatableLanguage = 'te' | 'hi' | 'ta';

export interface LanguageOption {
  id: SupportedLanguage;
  label: string;
  nativeLabel: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { id: 'en', label: 'English', nativeLabel: 'English' },
  { id: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { id: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { id: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
];

export interface TranslationEntry {
  key: string;
  text: string;
}

export interface LessonTranslationSection {
  sectionId: string;
  fullId: string;
  domId: string;
  title: string;
  entries: TranslationEntry[];
  version: string;
}

export interface PreTranslatedSectionRecord {
  version?: string;
  translations: Record<string, string>;
}

interface RawPreTranslationFile {
  language?: string;
  generatedAt?: string;
  sections?: Record<
    string,
    | { version?: string; translations?: Record<string, string> }
    | Record<string, string>
  >;
}

const LANGUAGE_STORAGE_KEY = 'gitstart-language-v1';
const SECTION_CACHE_PREFIX = 'gitstart-section-translation-v1';

function normalizePreTranslationFile(raw: unknown): Record<string, PreTranslatedSectionRecord> {
  const result: Record<string, PreTranslatedSectionRecord> = {};
  if (!raw || typeof raw !== 'object') return result;

  const file = raw as RawPreTranslationFile;
  const sectionsSource =
    file.sections && typeof file.sections === 'object' ? file.sections : (raw as Record<string, unknown>);

  for (const [fullId, value] of Object.entries(sectionsSource)) {
    if (fullId === 'language' || fullId === 'generatedAt' || !value || typeof value !== 'object') {
      continue;
    }

    const maybeWrapped = value as {
      version?: unknown;
      translations?: unknown;
    };

    if (
      maybeWrapped.translations &&
      typeof maybeWrapped.translations === 'object' &&
      !Array.isArray(maybeWrapped.translations)
    ) {
      const cleanMap: Record<string, string> = {};
      for (const [k, v] of Object.entries(maybeWrapped.translations as Record<string, unknown>)) {
        if (typeof v === 'string' && v.trim()) {
          cleanMap[k] = v;
        }
      }
      if (Object.keys(cleanMap).length > 0) {
        result[fullId] = {
          version: typeof maybeWrapped.version === 'string' ? maybeWrapped.version : undefined,
          translations: cleanMap,
        };
      }
    } else {
      const cleanMap: Record<string, string> = {};
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        if (typeof v === 'string' && v.trim()) {
          cleanMap[k] = v;
        }
      }
      if (Object.keys(cleanMap).length > 0) {
        result[fullId] = { translations: cleanMap };
      }
    }
  }

  return result;
}

const PRE_TRANSLATIONS: Record<TranslatableLanguage, Record<string, PreTranslatedSectionRecord>> = {
  te: normalizePreTranslationFile(preTeRaw),
  hi: normalizePreTranslationFile(preHiRaw),
  ta: normalizePreTranslationFile(preTaRaw),
};

export function isTranslatableLanguage(lang: SupportedLanguage): lang is TranslatableLanguage {
  return lang === 'te' || lang === 'hi' || lang === 'ta';
}

export function getLanguageLabel(lang: SupportedLanguage): string {
  return LANGUAGE_OPTIONS.find((opt) => opt.id === lang)?.label ?? 'English';
}

export function getSavedLanguage(): SupportedLanguage {
  try {
    const raw = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (raw === 'te' || raw === 'hi' || raw === 'ta' || raw === 'en') {
      return raw;
    }
  } catch {
    // Ignore storage read errors
  }
  return 'en';
}

export function saveLanguage(lang: SupportedLanguage) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // Ignore storage write errors
  }
}

function serializeCodeSegments(segments: CodeSegment[]): string {
  return segments
    .map((seg) => (seg.type === 'code' ? `\`${seg.value}\`` : seg.value))
    .join('');
}

function parseCodeSegments(text: string): CodeSegment[] {
  const result: CodeSegment[] = [];
  const regex = /`([^`]+)`/g;
  let lastIdx = 0;

  for (const match of text.matchAll(regex)) {
    const idx = match.index ?? 0;
    if (idx > lastIdx) {
      result.push({ type: 'text', value: text.slice(lastIdx, idx) });
    }
    result.push({ type: 'code', value: match[1] });
    lastIdx = idx + match[0].length;
  }

  if (lastIdx < text.length) {
    result.push({ type: 'text', value: text.slice(lastIdx) });
  }

  return result.length > 0 ? result : [{ type: 'text', value: text }];
}

function parseQuestionWithCode(
  translated: string,
  fallbackCode?: string
): { prefix: string; code?: string; suffix: string } {
  const match = translated.match(/`([^`]+)`/);
  if (match && match.index !== undefined) {
    return {
      prefix: translated.slice(0, match.index),
      code: match[1],
      suffix: translated.slice(match.index + match[0].length),
    };
  }
  if (fallbackCode && translated.includes(fallbackCode)) {
    const idx = translated.indexOf(fallbackCode);
    return {
      prefix: translated.slice(0, idx),
      code: fallbackCode,
      suffix: translated.slice(idx + fallbackCode.length),
    };
  }
  return { prefix: translated, code: undefined, suffix: '' };
}

function collectQuizEntries(entries: TranslationEntry[], prefix: string, q: QuizData) {
  entries.push({ key: `${prefix}.eyebrow`, text: q.eyebrow });
  const combinedQuestion = `${q.questionPrefix}${q.questionCode ? `\`${q.questionCode}\`` : ''}${q.questionSuffix}`;
  entries.push({ key: `${prefix}.question`, text: combinedQuestion });
  q.options.forEach((opt) => {
    entries.push({ key: `${prefix}.opt.${opt.id}.text`, text: opt.text });
    entries.push({ key: `${prefix}.opt.${opt.id}.feedback`, text: opt.feedback });
  });
}

function applyQuizTranslations(
  q: QuizData,
  prefix: string,
  t: Record<string, string>
): QuizData {
  const parsedQuestion = t[`${prefix}.question`]
    ? parseQuestionWithCode(t[`${prefix}.question`], q.questionCode)
    : null;

  return {
    ...q,
    eyebrow: t[`${prefix}.eyebrow`] ?? q.eyebrow,
    questionPrefix: parsedQuestion ? parsedQuestion.prefix : q.questionPrefix,
    questionCode: parsedQuestion ? parsedQuestion.code : q.questionCode,
    questionSuffix: parsedQuestion ? parsedQuestion.suffix : q.questionSuffix,
    options: q.options.map((opt) => ({
      ...opt,
      text: t[`${prefix}.opt.${opt.id}.text`] ?? opt.text,
      feedback: t[`${prefix}.opt.${opt.id}.feedback`] ?? opt.feedback,
    })),
  };
}

export function computeSourceHash(entries: TranslationEntry[]): string {
  let hash = 2166136261;
  const joined = entries.map((e) => `${e.key}=${e.text}`).join('|');
  for (let i = 0; i < joined.length; i++) {
    hash ^= joined.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

/**
 * Splits a lesson into granular, independently translatable sections
 * (overview, each concept section & callout, each step & callout, practice,
 * glossary header & each card, branch diagram, each quiz question, completion).
 */
export function extractLessonSections(lesson: Lesson): LessonTranslationSection[] {
  const sections: LessonTranslationSection[] = [];

  const addSection = (
    sectionId: string,
    domId: string,
    title: string,
    entries: TranslationEntry[]
  ) => {
    const cleanEntries = entries.filter((e) => typeof e.text === 'string' && e.text.trim().length > 0);
    if (cleanEntries.length === 0) return;
    sections.push({
      sectionId,
      fullId: `${lesson.id}:${sectionId}`,
      domId,
      title,
      entries: cleanEntries,
      version: computeSourceHash(cleanEntries),
    });
  };

  const pushIf = (list: TranslationEntry[], key: string, text?: string) => {
    if (typeof text === 'string' && text.trim().length > 0) {
      list.push({ key, text });
    }
  };

  // 1. Hero & Progress Overview
  const heroEntries: TranslationEntry[] = [];
  pushIf(heroEntries, 'meta', lesson.meta);
  pushIf(heroEntries, 'hero.title', `${lesson.titleStart}${lesson.titleHighlight}${lesson.titleEnd}`);
  pushIf(heroEntries, 'hero.description', serializeCodeSegments(lesson.descriptionSegments));
  pushIf(heroEntries, 'hero.primaryCtaLabel', lesson.primaryCtaLabel);
  pushIf(heroEntries, 'hero.secondaryCtaLabel', lesson.secondaryCtaLabel);
  pushIf(heroEntries, 'heroMockup.emptyTitle', lesson.heroMockup.emptyTitle);
  pushIf(heroEntries, 'heroMockup.emptyDescription', lesson.heroMockup.emptyDescription);
  lesson.progressSteps.forEach((ps) => {
    pushIf(heroEntries, `progress.${ps.id}`, ps.label);
  });
  addSection('hero', 'hero-overview', 'Lesson overview', heroEntries);

  // 2. Concept lesson sections
  if (lesson.concept) {
    const c = lesson.concept;

    const storyEntries: TranslationEntry[] = [];
    pushIf(storyEntries, 'concept.story.eyebrow', c.story.eyebrow);
    pushIf(storyEntries, 'concept.story.title', c.story.title);
    c.story.paragraphs.forEach((p, idx) => pushIf(storyEntries, `concept.story.p${idx}`, p));
    addSection('story', 'concept-story', c.story.title, storyEntries);

    const meaningEntries: TranslationEntry[] = [];
    pushIf(meaningEntries, 'concept.meaning.eyebrow', c.oneLineMeaning.eyebrow);
    pushIf(meaningEntries, 'concept.meaning.term', c.oneLineMeaning.term);
    pushIf(meaningEntries, 'concept.meaning.meaning', c.oneLineMeaning.meaning);
    pushIf(meaningEntries, 'concept.meaning.extraTerm', c.oneLineMeaning.extraTerm);
    pushIf(meaningEntries, 'concept.meaning.extraMeaning', c.oneLineMeaning.extraMeaning);
    addSection('meaning', 'concept-meaning', c.oneLineMeaning.term, meaningEntries);

    const diagramEntries: TranslationEntry[] = [];
    pushIf(diagramEntries, 'concept.diagram.eyebrow', c.diagram.eyebrow);
    pushIf(diagramEntries, 'concept.diagram.title', c.diagram.title);
    pushIf(diagramEntries, 'concept.diagram.subtitle', c.diagram.subtitle);
    c.diagram.nodes.forEach((node, idx) => {
      pushIf(diagramEntries, `concept.diagram.node${idx}.label`, node.label);
      pushIf(diagramEntries, `concept.diagram.node${idx}.sublabel`, node.sublabel);
    });
    pushIf(diagramEntries, 'concept.diagram.caption', c.diagram.caption);
    addSection('diagram', 'concept-diagram', c.diagram.title, diagramEntries);

    const whereEntries: TranslationEntry[] = [];
    pushIf(whereEntries, 'concept.where.eyebrow', c.whereToFind.eyebrow);
    pushIf(whereEntries, 'concept.where.title', c.whereToFind.title);
    pushIf(whereEntries, 'concept.where.subtitle', c.whereToFind.subtitle);
    c.whereToFind.markers.forEach((m) => {
      pushIf(whereEntries, `concept.where.m${m.number}.label`, m.label);
      pushIf(whereEntries, `concept.where.m${m.number}.desc`, m.description);
    });
    addSection('where', 'concept-where', c.whereToFind.title, whereEntries);

    if (c.afterMerging) {
      const afterMergingEntries: TranslationEntry[] = [];
      pushIf(afterMergingEntries, 'concept.afterMerging.eyebrow', c.afterMerging.eyebrow);
      pushIf(afterMergingEntries, 'concept.afterMerging.title', c.afterMerging.title);
      pushIf(afterMergingEntries, 'concept.afterMerging.text', c.afterMerging.text);
      addSection(
        'afterMerging',
        'concept-after-merging',
        c.afterMerging.title,
        afterMergingEntries
      );
    }

    const mistakeEntries: TranslationEntry[] = [];
    pushIf(mistakeEntries, 'concept.mistake.eyebrow', c.commonMistake.eyebrow);
    pushIf(mistakeEntries, 'concept.mistake.title', c.commonMistake.title);
    pushIf(mistakeEntries, 'concept.mistake.text', c.commonMistake.text);
    addSection('mistake', 'concept-mistake', c.commonMistake.title, mistakeEntries);
  }

  // 3. Tutorial steps & individual callouts
  if (lesson.steps) {
    lesson.steps.forEach((step) => {
      const combinedTitle = `${step.titlePrefix}${step.titleBold ?? ''}${step.titleSuffix ?? ''}${
        step.titleCodePill ? ` \`${step.titleCodePill}\`` : ''
      }`;
      const stepEntries: TranslationEntry[] = [];
      pushIf(stepEntries, `step.${step.id}.eyebrow`, step.eyebrow);
      pushIf(stepEntries, `step.${step.id}.title`, combinedTitle);
      pushIf(stepEntries, `step.${step.id}.description`, step.description);
      addSection(step.id, step.id, combinedTitle.replace(/`/g, ''), stepEntries);

      const calloutEntries: TranslationEntry[] = [];
      pushIf(calloutEntries, `step.${step.id}.callout.label`, step.callout.label);
      pushIf(calloutEntries, `step.${step.id}.callout.text`, step.callout.text);
      addSection(
        `${step.id}-callout`,
        `${step.id}-callout`,
        `${step.eyebrow} tip`,
        calloutEntries
      );
    });
  }

  // 4. Interactive Practice
  if (lesson.practice) {
    const p = lesson.practice;
    const practiceEntries: TranslationEntry[] = [];
    pushIf(practiceEntries, 'practice.eyebrow', p.eyebrow);
    pushIf(practiceEntries, 'practice.title', p.title);
    pushIf(practiceEntries, 'practice.subtitle', p.subtitle);
    p.stages.forEach((s) => {
      pushIf(practiceEntries, `practice.stage.${s.id}.label`, s.label);
      pushIf(practiceEntries, `practice.stage.${s.id}.instruction`, s.instruction);
      pushIf(practiceEntries, `practice.stage.${s.id}.success`, s.successMessage);
    });
    addSection('practice', 'practice', p.title, practiceEntries);
  }

  // 5. Vocabulary header + individual glossary cards
  if (lesson.vocabulary) {
    const v = lesson.vocabulary;
    const vocabHeaderEntries: TranslationEntry[] = [];
    pushIf(vocabHeaderEntries, 'vocab.eyebrow', v.eyebrow);
    pushIf(vocabHeaderEntries, 'vocab.title', v.title);
    pushIf(vocabHeaderEntries, 'vocab.subtitle', v.subtitle);
    addSection('vocab-header', 'vocabulary', v.title, vocabHeaderEntries);

    v.cards.forEach((card) => {
      const cardEntries: TranslationEntry[] = [];
      pushIf(cardEntries, `vocab.${card.id}.term`, card.term);
      pushIf(cardEntries, `vocab.${card.id}.definition`, card.definition);
      pushIf(cardEntries, `vocab.${card.id}.analogyLabel`, card.analogyLabel);
      pushIf(cardEntries, `vocab.${card.id}.analogy`, card.analogy);
      addSection(
        `vocab-${card.id}`,
        `vocab-card-${card.id}`,
        `Glossary: ${card.term}`,
        cardEntries
      );
    });
  }

  // 6. Branch Diagram
  if (lesson.diagram) {
    const d = lesson.diagram;
    const diagramEntries: TranslationEntry[] = [];
    pushIf(diagramEntries, 'branchDiagram.eyebrow', d.eyebrow);
    pushIf(diagramEntries, 'branchDiagram.title', `${d.titlePrefix}${d.titleHighlight}`);
    d.takeaways.forEach((item) => {
      pushIf(diagramEntries, `branchDiagram.${item.id}.title`, item.title);
      pushIf(diagramEntries, `branchDiagram.${item.id}.desc`, item.description);
    });
    addSection(
      'branch-diagram',
      'branch-diagram',
      `${d.titlePrefix}${d.titleHighlight}`,
      diagramEntries
    );
  }

  // 7. Quiz questions (each question as its own section)
  if (lesson.quizzes && lesson.quizzes.length > 0) {
    lesson.quizzes.forEach((q, idx) => {
      const qKey = q.id ?? `q-${idx}`;
      const qEntries: TranslationEntry[] = [];
      collectQuizEntries(qEntries, `quizzes.${idx}`, q);
      addSection(`quiz-${qKey}`, `quiz-card-${qKey}`, q.eyebrow, qEntries);
    });
  } else if (lesson.quiz) {
    const q = lesson.quiz;
    const qKey = q.id ?? 'q-0';
    const qEntries: TranslationEntry[] = [];
    collectQuizEntries(qEntries, 'quiz', q);
    addSection(`quiz-${qKey}`, `quiz-card-${qKey}`, q.eyebrow, qEntries);
  }

  // 8. Completion card
  const completionEntries: TranslationEntry[] = [];
  pushIf(completionEntries, 'completion.eyebrow', lesson.completion.eyebrow);
  pushIf(completionEntries, 'completion.title', lesson.completion.title);
  pushIf(completionEntries, 'completion.description', lesson.completion.description);
  pushIf(completionEntries, 'completion.ctaLabel', lesson.completion.ctaLabel);
  pushIf(completionEntries, 'completion.completedCtaLabel', lesson.completion.completedCtaLabel);
  pushIf(completionEntries, 'completion.nextUpPrefix', lesson.completion.nextUpPrefix);
  pushIf(completionEntries, 'completion.nextUpTitle', lesson.completion.nextUpTitle);
  pushIf(completionEntries, 'completion.nextUpDuration', lesson.completion.nextUpDuration);
  addSection('completion', 'quick-check-completion', 'Lesson completion', completionEntries);

  return sections;
}

/**
 * Rebuilds a translated Lesson object from a merged key->text map while keeping all IDs,
 * mockups, visual positions, and answer keys untouched.
 */
export function applyTranslatedEntries(
  lesson: Lesson,
  t: Record<string, string>
): Lesson {
  const translatedHeroTitle = t['hero.title'];
  const translatedHeroDesc = t['hero.description'];

  return {
    ...lesson,
    cardTitle: t.cardTitle ?? lesson.cardTitle,
    cardDescription: t.cardDescription ?? lesson.cardDescription,
    readTime: t.readTime ?? lesson.readTime,
    meta: t.meta ?? lesson.meta,
    titleStart: translatedHeroTitle ?? lesson.titleStart,
    titleHighlight: translatedHeroTitle ? '' : lesson.titleHighlight,
    titleEnd: translatedHeroTitle ? '' : lesson.titleEnd,
    descriptionSegments: translatedHeroDesc
      ? parseCodeSegments(translatedHeroDesc)
      : lesson.descriptionSegments,
    primaryCtaLabel: t['hero.primaryCtaLabel'] ?? lesson.primaryCtaLabel,
    secondaryCtaLabel: t['hero.secondaryCtaLabel'] ?? lesson.secondaryCtaLabel,
    heroMockup: {
      ...lesson.heroMockup,
      emptyTitle: t['heroMockup.emptyTitle'] ?? lesson.heroMockup.emptyTitle,
      emptyDescription: t['heroMockup.emptyDescription'] ?? lesson.heroMockup.emptyDescription,
    },
    progressSteps: lesson.progressSteps.map((ps) => ({
      ...ps,
      label: t[`progress.${ps.id}`] ?? ps.label,
    })),
    concept: lesson.concept
      ? {
          story: {
            eyebrow: t['concept.story.eyebrow'] ?? lesson.concept.story.eyebrow,
            title: t['concept.story.title'] ?? lesson.concept.story.title,
            paragraphs: lesson.concept.story.paragraphs.map(
              (p, idx) => t[`concept.story.p${idx}`] ?? p
            ),
          },
          oneLineMeaning: {
            eyebrow: t['concept.meaning.eyebrow'] ?? lesson.concept.oneLineMeaning.eyebrow,
            term: t['concept.meaning.term'] ?? lesson.concept.oneLineMeaning.term,
            meaning: t['concept.meaning.meaning'] ?? lesson.concept.oneLineMeaning.meaning,
            extraTerm:
              t['concept.meaning.extraTerm'] ?? lesson.concept.oneLineMeaning.extraTerm,
            extraMeaning:
              t['concept.meaning.extraMeaning'] ?? lesson.concept.oneLineMeaning.extraMeaning,
          },
          diagram: {
            ...lesson.concept.diagram,
            eyebrow: t['concept.diagram.eyebrow'] ?? lesson.concept.diagram.eyebrow,
            title: t['concept.diagram.title'] ?? lesson.concept.diagram.title,
            subtitle: t['concept.diagram.subtitle'] ?? lesson.concept.diagram.subtitle,
            nodes: lesson.concept.diagram.nodes.map((node, idx) => ({
              ...node,
              label: t[`concept.diagram.node${idx}.label`] ?? node.label,
              sublabel: t[`concept.diagram.node${idx}.sublabel`] ?? node.sublabel,
            })),
            caption: t['concept.diagram.caption'] ?? lesson.concept.diagram.caption,
          },
          whereToFind: {
            ...lesson.concept.whereToFind,
            eyebrow: t['concept.where.eyebrow'] ?? lesson.concept.whereToFind.eyebrow,
            title: t['concept.where.title'] ?? lesson.concept.whereToFind.title,
            subtitle: t['concept.where.subtitle'] ?? lesson.concept.whereToFind.subtitle,
            markers: lesson.concept.whereToFind.markers.map((m) => ({
              ...m,
              label: t[`concept.where.m${m.number}.label`] ?? m.label,
              description: t[`concept.where.m${m.number}.desc`] ?? m.description,
            })),
          },
          afterMerging: lesson.concept.afterMerging
            ? {
                eyebrow:
                  t['concept.afterMerging.eyebrow'] ?? lesson.concept.afterMerging.eyebrow,
                title: t['concept.afterMerging.title'] ?? lesson.concept.afterMerging.title,
                text: t['concept.afterMerging.text'] ?? lesson.concept.afterMerging.text,
              }
            : undefined,
          commonMistake: {
            eyebrow: t['concept.mistake.eyebrow'] ?? lesson.concept.commonMistake.eyebrow,
            title: t['concept.mistake.title'] ?? lesson.concept.commonMistake.title,
            text: t['concept.mistake.text'] ?? lesson.concept.commonMistake.text,
          },
        }
      : undefined,
    steps: lesson.steps?.map((step) => {
      const translatedTitle = t[`step.${step.id}.title`];
      const parsedStepTitle = translatedTitle
        ? parseQuestionWithCode(translatedTitle, step.titleCodePill)
        : null;

      return {
        ...step,
        eyebrow: t[`step.${step.id}.eyebrow`] ?? step.eyebrow,
        titlePrefix: parsedStepTitle ? parsedStepTitle.prefix : step.titlePrefix,
        titleBold: parsedStepTitle ? undefined : step.titleBold,
        titleCodePill: parsedStepTitle ? parsedStepTitle.code : step.titleCodePill,
        titleSuffix: parsedStepTitle ? parsedStepTitle.suffix : step.titleSuffix,
        description: t[`step.${step.id}.description`] ?? step.description,
        callout: {
          ...step.callout,
          label: t[`step.${step.id}.callout.label`] ?? step.callout.label,
          text: t[`step.${step.id}.callout.text`] ?? step.callout.text,
        },
      };
    }),
    practice: lesson.practice
      ? {
          ...lesson.practice,
          eyebrow: t['practice.eyebrow'] ?? lesson.practice.eyebrow,
          title: t['practice.title'] ?? lesson.practice.title,
          subtitle: t['practice.subtitle'] ?? lesson.practice.subtitle,
          stages: lesson.practice.stages.map((s) => ({
            ...s,
            label: t[`practice.stage.${s.id}.label`] ?? s.label,
            instruction: t[`practice.stage.${s.id}.instruction`] ?? s.instruction,
            successMessage: t[`practice.stage.${s.id}.success`] ?? s.successMessage,
          })),
        }
      : undefined,
    vocabulary: lesson.vocabulary
      ? {
          eyebrow: t['vocab.eyebrow'] ?? lesson.vocabulary.eyebrow,
          title: t['vocab.title'] ?? lesson.vocabulary.title,
          subtitle: t['vocab.subtitle'] ?? lesson.vocabulary.subtitle,
          cards: lesson.vocabulary.cards.map((card) => ({
            ...card,
            term: t[`vocab.${card.id}.term`] ?? card.term,
            definition: t[`vocab.${card.id}.definition`] ?? card.definition,
            analogyLabel: t[`vocab.${card.id}.analogyLabel`] ?? card.analogyLabel,
            analogy: t[`vocab.${card.id}.analogy`] ?? card.analogy,
          })),
        }
      : undefined,
    diagram: lesson.diagram
      ? {
          ...lesson.diagram,
          eyebrow: t['branchDiagram.eyebrow'] ?? lesson.diagram.eyebrow,
          titlePrefix: t['branchDiagram.title'] ?? lesson.diagram.titlePrefix,
          titleHighlight: t['branchDiagram.title'] ? '' : lesson.diagram.titleHighlight,
          takeaways: lesson.diagram.takeaways.map((item) => ({
            ...item,
            title: t[`branchDiagram.${item.id}.title`] ?? item.title,
            description: t[`branchDiagram.${item.id}.desc`] ?? item.description,
          })),
        }
      : undefined,
    quiz: lesson.quiz ? applyQuizTranslations(lesson.quiz, 'quiz', t) : undefined,
    quizzes: lesson.quizzes?.map((q, idx) =>
      applyQuizTranslations(q, `quizzes.${idx}`, t)
    ),
    completion: {
      eyebrow: t['completion.eyebrow'] ?? lesson.completion.eyebrow,
      title: t['completion.title'] ?? lesson.completion.title,
      description: t['completion.description'] ?? lesson.completion.description,
      ctaLabel: t['completion.ctaLabel'] ?? lesson.completion.ctaLabel,
      completedCtaLabel:
        t['completion.completedCtaLabel'] ?? lesson.completion.completedCtaLabel,
      nextUpPrefix: t['completion.nextUpPrefix'] ?? lesson.completion.nextUpPrefix,
      nextUpTitle: t['completion.nextUpTitle'] ?? lesson.completion.nextUpTitle,
      nextUpDuration: t['completion.nextUpDuration'] ?? lesson.completion.nextUpDuration,
    },
  };
}

interface StoredSectionPayload {
  version: string;
  translations: Record<string, string>;
}

export function getPreTranslatedSection(
  fullSectionId: string,
  expectedVersion: string,
  language: TranslatableLanguage
): Record<string, string> | null {
  const rec = PRE_TRANSLATIONS[language]?.[fullSectionId];
  if (!rec) return null;
  if (rec.version && rec.version !== expectedVersion) return null;
  return rec.translations;
}

export function getCachedSectionTranslation(
  fullSectionId: string,
  expectedVersion: string,
  language: TranslatableLanguage
): Record<string, string> | null {
  const storageKey = `${SECTION_CACHE_PREFIX}:${language}:${fullSectionId}`;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSectionPayload;
    if (parsed.version !== expectedVersion || !parsed.translations) {
      return null;
    }
    return parsed.translations;
  } catch {
    return null;
  }
}

export function saveCachedSectionTranslation(
  fullSectionId: string,
  version: string,
  language: TranslatableLanguage,
  translations: Record<string, string>
) {
  const storageKey = `${SECTION_CACHE_PREFIX}:${language}:${fullSectionId}`;
  try {
    const payload: StoredSectionPayload = { version, translations };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  } catch {
    // Ignore storage quota errors
  }
}

export function getInstantSectionTranslation(
  section: LessonTranslationSection,
  language: TranslatableLanguage
): { source: 'pretranslated' | 'cached'; translations: Record<string, string> } | null {
  const pre = getPreTranslatedSection(section.fullId, section.version, language);
  if (pre) {
    return { source: 'pretranslated', translations: pre };
  }
  const cached = getCachedSectionTranslation(section.fullId, section.version, language);
  if (cached) {
    return { source: 'cached', translations: cached };
  }
  return null;
}

interface StreamSectionOptions {
  lessonId: string;
  section: LessonTranslationSection;
  language: TranslatableLanguage;
  signal?: AbortSignal;
  onPartial?: (partialTranslations: Record<string, string>) => void;
}

export async function streamSectionTranslation({
  lessonId,
  section,
  language,
  signal,
  onPartial,
}: StreamSectionOptions): Promise<Record<string, string>> {
  const response = await fetch('/api/translate-section', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal,
    body: JSON.stringify({
      lessonId,
      sectionId: section.sectionId,
      fullSectionId: section.fullId,
      targetLanguage: language,
      cacheVersion: section.version,
      entries: section.entries,
    }),
  });

  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json') || !response.body) {
    const data = (await response.json()) as {
      translations?: Record<string, string>;
      error?: string;
    };
    if (!response.ok || !data.translations) {
      throw new Error(data.error || 'Could not translate this section right now.');
    }
    saveCachedSectionTranslation(section.fullId, section.version, language, data.translations);
    return data.translations;
  }

  if (!response.ok) {
    throw new Error('Could not translate this section right now.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let finalTranslations: Record<string, string> | null = null;

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
    const payloadStr = dataLines.join('\n');

    let parsed: { translations?: Record<string, string>; error?: string };
    try {
      parsed = JSON.parse(payloadStr) as {
        translations?: Record<string, string>;
        error?: string;
      };
    } catch {
      return;
    }

    if (eventName === 'error') {
      throw new Error(parsed.error || 'Translation failed for this section.');
    }
    if (eventName === 'partial' && parsed.translations) {
      onPartial?.(parsed.translations);
    }
    if (eventName === 'done' && parsed.translations) {
      finalTranslations = parsed.translations;
    }
  };

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let sepIdx = buffer.indexOf('\n\n');
    while (sepIdx !== -1) {
      const eventBlock = buffer.slice(0, sepIdx).trim();
      buffer = buffer.slice(sepIdx + 2);
      if (eventBlock) {
        processEventBlock(eventBlock);
      }
      sepIdx = buffer.indexOf('\n\n');
    }
  }

  const trailing = buffer.trim();
  if (trailing) {
    processEventBlock(trailing);
  }

  if (!finalTranslations) {
    throw new Error('Translation stream ended early. Please try again.');
  }

  saveCachedSectionTranslation(section.fullId, section.version, language, finalTranslations);
  return finalTranslations;
}

export function buildPreTranslationExportJson(
  language: TranslatableLanguage,
  sectionsMap: Record<string, { version: string; translations: Record<string, string> }>
): string {
  return JSON.stringify(
    {
      language,
      generatedAt: new Date().toISOString(),
      sections: sectionsMap,
    },
    null,
    2
  );
}
