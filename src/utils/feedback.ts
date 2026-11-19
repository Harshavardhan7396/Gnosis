export interface FeedbackNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface SectionFeedbackRecord {
  lessonId: string;
  lessonTitle: string;
  sectionId: string;
  sectionTitle: string;
  thumbsUp: number;
  thumbsDown: number;
  userVote?: 'up' | 'down';
  notes: FeedbackNote[];
  updatedAt: string;
}

export type FeedbackStore = Record<string, SectionFeedbackRecord>;

const FEEDBACK_STORAGE_KEY = 'gitstart-section-feedback-v1';
export const FEEDBACK_UPDATED_EVENT = 'gitstart-feedback-updated';

export function makeSectionFeedbackKey(lessonId: string, sectionId: string): string {
  return `${lessonId}::${sectionId}`;
}

export function getFeedbackStore(): FeedbackStore {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, Partial<SectionFeedbackRecord>>;
    if (!parsed || typeof parsed !== 'object') return {};

    const normalized: FeedbackStore = {};
    for (const [key, entry] of Object.entries(parsed)) {
      if (!entry || typeof entry !== 'object' || !entry.lessonId || !entry.sectionId) continue;
      normalized[key] = {
        lessonId: entry.lessonId,
        lessonTitle: entry.lessonTitle ?? entry.lessonId,
        sectionId: entry.sectionId,
        sectionTitle: entry.sectionTitle ?? entry.sectionId,
        thumbsUp: typeof entry.thumbsUp === 'number' ? Math.max(0, entry.thumbsUp) : 0,
        thumbsDown: typeof entry.thumbsDown === 'number' ? Math.max(0, entry.thumbsDown) : 0,
        userVote: entry.userVote === 'up' || entry.userVote === 'down' ? entry.userVote : undefined,
        notes: Array.isArray(entry.notes)
          ? entry.notes.filter(
              (n): n is FeedbackNote =>
                Boolean(n) && typeof n.text === 'string' && n.text.trim().length > 0
            )
          : [],
        updatedAt: entry.updatedAt ?? new Date().toISOString(),
      };
    }
    return normalized;
  } catch {
    return {};
  }
}

function writeFeedbackStore(store: FeedbackStore) {
  try {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(store));
    window.dispatchEvent(new CustomEvent(FEEDBACK_UPDATED_EVENT));
  } catch {
    // Ignore storage write errors
  }
}

export function getSectionFeedback(
  lessonId: string,
  sectionId: string
): SectionFeedbackRecord | null {
  const store = getFeedbackStore();
  return store[makeSectionFeedbackKey(lessonId, sectionId)] ?? null;
}

export function recordSectionVote(params: {
  lessonId: string;
  lessonTitle: string;
  sectionId: string;
  sectionTitle: string;
  vote: 'up' | 'down';
}): SectionFeedbackRecord {
  const store = getFeedbackStore();
  const key = makeSectionFeedbackKey(params.lessonId, params.sectionId);
  const existing = store[key];

  let thumbsUp = existing?.thumbsUp ?? 0;
  let thumbsDown = existing?.thumbsDown ?? 0;
  const previousVote = existing?.userVote;

  if (previousVote !== params.vote) {
    if (previousVote === 'up') {
      thumbsUp = Math.max(0, thumbsUp - 1);
    } else if (previousVote === 'down') {
      thumbsDown = Math.max(0, thumbsDown - 1);
    }

    if (params.vote === 'up') {
      thumbsUp += 1;
    } else {
      thumbsDown += 1;
    }
  }

  const nextRecord: SectionFeedbackRecord = {
    lessonId: params.lessonId,
    lessonTitle: params.lessonTitle,
    sectionId: params.sectionId,
    sectionTitle: params.sectionTitle,
    thumbsUp,
    thumbsDown,
    userVote: params.vote,
    notes: existing?.notes ?? [],
    updatedAt: new Date().toISOString(),
  };

  store[key] = nextRecord;
  writeFeedbackStore(store);
  return nextRecord;
}

export function saveConfusingNote(params: {
  lessonId: string;
  lessonTitle: string;
  sectionId: string;
  sectionTitle: string;
  noteText: string;
}): SectionFeedbackRecord {
  const trimmed = params.noteText.trim();
  const store = getFeedbackStore();
  const key = makeSectionFeedbackKey(params.lessonId, params.sectionId);
  const existing = store[key];

  const baseRecord: SectionFeedbackRecord = existing ?? {
    lessonId: params.lessonId,
    lessonTitle: params.lessonTitle,
    sectionId: params.sectionId,
    sectionTitle: params.sectionTitle,
    thumbsUp: 0,
    thumbsDown: 1,
    userVote: 'down',
    notes: [],
    updatedAt: new Date().toISOString(),
  };

  const nextNotes = trimmed
    ? [
        ...baseRecord.notes,
        {
          id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          text: trimmed,
          createdAt: new Date().toISOString(),
        },
      ]
    : baseRecord.notes;

  const nextRecord: SectionFeedbackRecord = {
    ...baseRecord,
    lessonTitle: params.lessonTitle,
    sectionTitle: params.sectionTitle,
    notes: nextNotes,
    updatedAt: new Date().toISOString(),
  };

  store[key] = nextRecord;
  writeFeedbackStore(store);
  return nextRecord;
}

export function clearAllFeedback() {
  try {
    localStorage.removeItem(FEEDBACK_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(FEEDBACK_UPDATED_EVENT));
  } catch {
    // Ignore storage removal errors
  }
}
