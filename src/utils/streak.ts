const STREAK_STORAGE_KEY = 'gitstart-streak-v1';

export interface StreakState {
  streakDays: number;
  practicedToday: boolean;
  totalActiveDays: number;
}

export function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getPreviousDateKey(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1);
  dt.setDate(dt.getDate() - 1);
  return getLocalDateKey(dt);
}

function readStoredDates(): string[] {
  try {
    const raw = localStorage.getItem(STREAK_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const valid = parsed.filter(
      (item): item is string => typeof item === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item)
    );
    return Array.from(new Set(valid)).sort();
  } catch {
    return [];
  }
}

export function computeStreakState(dates: string[]): StreakState {
  if (dates.length === 0) {
    return { streakDays: 0, practicedToday: false, totalActiveDays: 0 };
  }

  const dateSet = new Set(dates);
  const todayKey = getLocalDateKey();
  const yesterdayKey = getPreviousDateKey(todayKey);
  const practicedToday = dateSet.has(todayKey);

  // Count consecutive days ending today, or ending yesterday if learner hasn't checked in today yet
  let cursor = practicedToday ? todayKey : dateSet.has(yesterdayKey) ? yesterdayKey : '';
  let streakDays = 0;

  while (cursor && dateSet.has(cursor)) {
    streakDays += 1;
    cursor = getPreviousDateKey(cursor);
  }

  return {
    streakDays,
    practicedToday,
    totalActiveDays: dateSet.size,
  };
}

export function getStreakState(): StreakState {
  return computeStreakState(readStoredDates());
}

export function recordActivityToday(): StreakState {
  const todayKey = getLocalDateKey();
  const existing = readStoredDates();
  if (!existing.includes(todayKey)) {
    const updated = [...existing, todayKey].sort();
    try {
      localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage write errors
    }
    return computeStreakState(updated);
  }
  return computeStreakState(existing);
}
