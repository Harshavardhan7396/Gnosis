import type { Lesson, QuizData } from '../types/lesson';

export interface LessonReviewSchedule {
  lessonId: string;
  completedAt: number;
  nextReviewAt: number;
  intervalDays: number;
  lastReviewedAt?: number;
  reviewCount: number;
}

export type SpacedReviewMap = Record<string, LessonReviewSchedule>;

const SPACED_REVIEW_STORAGE_KEY = 'gitstart-spaced-review-v1';
export const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function getSpacedReviewMap(): SpacedReviewMap {
  try {
    const raw = localStorage.getItem(SPACED_REVIEW_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, Partial<LessonReviewSchedule>>;
    if (!parsed || typeof parsed !== 'object') return {};

    const clean: SpacedReviewMap = {};
    for (const [lessonId, entry] of Object.entries(parsed)) {
      if (!entry || typeof entry !== 'object') continue;
      if (typeof entry.nextReviewAt !== 'number') continue;
      clean[lessonId] = {
        lessonId,
        completedAt: typeof entry.completedAt === 'number' ? entry.completedAt : Date.now(),
        nextReviewAt: entry.nextReviewAt,
        intervalDays: typeof entry.intervalDays === 'number' ? entry.intervalDays : 1,
        lastReviewedAt: typeof entry.lastReviewedAt === 'number' ? entry.lastReviewedAt : undefined,
        reviewCount: typeof entry.reviewCount === 'number' ? entry.reviewCount : 0,
      };
    }
    return clean;
  } catch {
    return {};
  }
}

function writeSpacedReviewMap(map: SpacedReviewMap) {
  try {
    localStorage.setItem(SPACED_REVIEW_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Ignore storage write errors
  }
}

export function scheduleLessonCompletionReview(lessonId: string, now = Date.now()): SpacedReviewMap {
  const map = getSpacedReviewMap();
  if (!map[lessonId]) {
    map[lessonId] = {
      lessonId,
      completedAt: now,
      nextReviewAt: now + ONE_DAY_MS,
      intervalDays: 1,
      reviewCount: 0,
    };
    writeSpacedReviewMap(map);
  }
  return map;
}

export function syncCompletedLessonsReview(
  completedLessonIds: string[],
  now = Date.now()
): SpacedReviewMap {
  const map = getSpacedReviewMap();
  let changed = false;

  for (const lessonId of completedLessonIds) {
    if (!map[lessonId]) {
      map[lessonId] = {
        lessonId,
        completedAt: now,
        nextReviewAt: now + ONE_DAY_MS,
        intervalDays: 1,
        reviewCount: 0,
      };
      changed = true;
    }
  }

  if (changed) {
    writeSpacedReviewMap(map);
  }
  return map;
}

export function removeLessonReviewSchedule(lessonId: string): SpacedReviewMap {
  const map = getSpacedReviewMap();
  if (map[lessonId]) {
    delete map[lessonId];
    writeSpacedReviewMap(map);
  }
  return map;
}

export function getNextIntervalDays(currentIntervalDays: number, allCorrect: boolean): number {
  if (!allCorrect) return 1;
  if (currentIntervalDays <= 1) return 3;
  if (currentIntervalDays <= 3) return 7;
  return 14;
}

export function recordReviewOutcome(
  lessonId: string,
  allCorrect: boolean,
  now = Date.now()
): { map: SpacedReviewMap; nextIntervalDays: number } {
  const map = getSpacedReviewMap();
  const current = map[lessonId];
  const currentInterval = current?.intervalDays ?? 1;
  const nextIntervalDays = getNextIntervalDays(currentInterval, allCorrect);

  map[lessonId] = {
    lessonId,
    completedAt: current?.completedAt ?? now,
    nextReviewAt: now + nextIntervalDays * ONE_DAY_MS,
    intervalDays: nextIntervalDays,
    lastReviewedAt: now,
    reviewCount: (current?.reviewCount ?? 0) + 1,
  };

  writeSpacedReviewMap(map);
  return { map, nextIntervalDays };
}

export function snoozeLessonReview(lessonId: string, now = Date.now()): SpacedReviewMap {
  const map = getSpacedReviewMap();
  const current = map[lessonId];
  map[lessonId] = {
    lessonId,
    completedAt: current?.completedAt ?? now,
    nextReviewAt: now + ONE_DAY_MS,
    intervalDays: current?.intervalDays ?? 1,
    lastReviewedAt: current?.lastReviewedAt,
    reviewCount: current?.reviewCount ?? 0,
  };
  writeSpacedReviewMap(map);
  return map;
}

export interface DueLessonReview {
  lesson: Lesson;
  lessonIndex: number;
  schedule: LessonReviewSchedule;
}

export function getDueReviewLessons(
  lessons: Lesson[],
  completedLessonIds: string[],
  reviewMap: SpacedReviewMap,
  now = Date.now()
): DueLessonReview[] {
  const completedSet = new Set(completedLessonIds);
  const due: DueLessonReview[] = [];

  lessons.forEach((lesson, lessonIndex) => {
    if (lesson.comingSoon || !completedSet.has(lesson.id)) return;
    const schedule = reviewMap[lesson.id];
    if (!schedule) return;
    if (schedule.nextReviewAt <= now) {
      due.push({ lesson, lessonIndex, schedule });
    }
  });

  return due.sort((a, b) => a.schedule.nextReviewAt - b.schedule.nextReviewAt);
}

export function pickRandomReviewQuestions(lesson: Lesson, count = 2): QuizData[] {
  const pool: QuizData[] = [];
  if (lesson.quizzes && lesson.quizzes.length > 0) {
    pool.push(...lesson.quizzes);
  }
  if (lesson.quiz) {
    pool.push(lesson.quiz);
  }
  if (lesson.reviewQuestions && lesson.reviewQuestions.length > 0) {
    pool.push(...lesson.reviewQuestions);
  }

  const seen = new Set<string>();
  const unique = pool.filter((q, idx) => {
    const key = q.id ?? `${q.questionPrefix}-${idx}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const shuffled = [...unique];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getSectionLinkForQuestion(
  lesson: Lesson,
  question: QuizData
): { targetId: string; label: string } {
  if (question.sectionTargetId && question.sectionLabel) {
    return { targetId: question.sectionTargetId, label: question.sectionLabel };
  }

  const text = `${question.questionPrefix} ${question.questionCode ?? ''} ${question.questionSuffix}`.toLowerCase();

  if (lesson.kind === 'concept' && lesson.concept) {
    if (
      text.includes('where') ||
      text.includes('click') ||
      text.includes('button') ||
      text.includes('corner') ||
      text.includes('badge') ||
      text.includes('screen') ||
      text.includes('commits count') ||
      text.includes('box') ||
      text.includes('base') ||
      text.includes('compare') ||
      text.includes('green lines') ||
      text.includes('red lines')
    ) {
      return { targetId: 'concept-where', label: lesson.concept.whereToFind.title };
    }
    if (
      text.includes('essay') ||
      text.includes('story') ||
      text.includes('friends') ||
      text.includes('everyday')
    ) {
      return { targetId: 'concept-story', label: lesson.concept.story.title };
    }
    if (
      text.includes('step') ||
      text.includes('diagram') ||
      text.includes('actions') ||
      text.includes('four') ||
      text.includes('different')
    ) {
      return { targetId: 'concept-diagram', label: lesson.concept.diagram.title };
    }
    return { targetId: 'concept-meaning', label: lesson.concept.oneLineMeaning.term };
  }

  if (text.includes('readme') || text.includes('.md') || text.includes('markdown')) {
    return { targetId: 'step-02', label: 'Step 02: Naming your file' };
  }
  if (text.includes('branch') || text.includes('main')) {
    return { targetId: 'vocabulary', label: lesson.vocabulary?.title ?? 'Key vocabulary' };
  }
  return { targetId: 'step-01', label: 'Step 01' };
}
