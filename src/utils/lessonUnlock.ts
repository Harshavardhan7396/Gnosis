import type { Lesson, RoadmapLevel } from '../types/lesson';

export interface LessonUnlockProgress {
  lessonCompleted: boolean;
}

export function getLevelUnlockMap(
  levels: RoadmapLevel[],
  lessons: Lesson[],
  progressByLessonId: Record<string, LessonUnlockProgress>
): Record<string, { isLevelUnlocked: boolean; isLevelCompleted: boolean; prevLevelNumber: number | null }> {
  const map: Record<
    string,
    { isLevelUnlocked: boolean; isLevelCompleted: boolean; prevLevelNumber: number | null }
  > = {};

  let prevCompleted = true;
  let prevNumber: number | null = null;

  for (let idx = 0; idx < levels.length; idx++) {
    const level = levels[idx];
    const items = lessons.filter((l) => l.levelId === level.id);
    const totalInLevel = items.length;
    const completedInLevel = items.filter(
      (l) => !l.comingSoon && Boolean(progressByLessonId[l.id]?.lessonCompleted)
    ).length;
    const isLevelCompleted = totalInLevel > 0 && completedInLevel === totalInLevel;
    const isLevelUnlocked = idx === 0 ? true : prevCompleted;

    map[level.id] = {
      isLevelUnlocked,
      isLevelCompleted,
      prevLevelNumber: prevNumber,
    };

    prevCompleted = isLevelCompleted;
    prevNumber = level.number;
  }

  return map;
}

export function isLessonUnlocked(
  lesson: Lesson,
  globalIndex: number,
  lessons: Lesson[],
  progressByLessonId: Record<string, LessonUnlockProgress>,
  levelUnlockMap: Record<string, { isLevelUnlocked: boolean; prevLevelNumber: number | null }>
): boolean {
  if (lesson.comingSoon) return false;

  const levelState = levelUnlockMap[lesson.levelId];
  if (levelState && !levelState.isLevelUnlocked) return false;

  if (lesson.unlockWithLevel) return true;

  if (lesson.id === 'issues') {
    return Boolean(progressByLessonId['pull-requests']?.lessonCompleted);
  }

  for (let i = globalIndex - 1; i >= 0; i--) {
    const prev = lessons[i];
    if (prev.levelId !== lesson.levelId) {
      return true;
    }
    if (!prev.comingSoon && !prev.unlockWithLevel) {
      return Boolean(progressByLessonId[prev.id]?.lessonCompleted);
    }
  }

  return true;
}

export function getLessonLockReason(
  lesson: Lesson,
  lessonNumber: number,
  levelUnlockMap: Record<string, { isLevelUnlocked: boolean; prevLevelNumber: number | null }>
): string {
  const levelState = levelUnlockMap[lesson.levelId];
  if (levelState && !levelState.isLevelUnlocked && levelState.prevLevelNumber) {
    return `Complete Level ${levelState.prevLevelNumber} to unlock`;
  }
  if (lesson.id === 'issues') {
    return 'Complete Lesson 8 to unlock';
  }
  return `Complete Lesson ${lessonNumber - 1} to unlock`;
}
