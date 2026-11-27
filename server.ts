import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

interface AskGitStartResponse {
  meaning: string;
  comparison: string;
  whereToFind: string;
}

const MAX_CACHE_ENTRIES = 250;
const responseCache = new Map<string, AskGitStartResponse>();
const contextCache = new Map<string, string>();
const translationCache = new Map<string, Record<string, string>>();

function saveTranslationCache(key: string, value: Record<string, string>) {
  if (translationCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = translationCache.keys().next().value;
    if (oldestKey !== undefined) {
      translationCache.delete(oldestKey);
    }
  }
  translationCache.set(key, value);
}

function normalizeCacheKey(question: string): string {
  return question
    .trim()
    .toLowerCase()
    .replace(/[?!.,'"]+$/g, '')
    .replace(/\s+/g, ' ');
}

function saveToCache(key: string, value: AskGitStartResponse) {
  if (responseCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = responseCache.keys().next().value;
    if (oldestKey !== undefined) {
      responseCache.delete(oldestKey);
    }
  }
  responseCache.set(key, value);
}

function saveContextCache(key: string, value: string) {
  if (contextCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = contextCache.keys().next().value;
    if (oldestKey !== undefined) {
      contextCache.delete(oldestKey);
    }
  }
  contextCache.set(key, value);
}

function mapGeminiError(err: unknown): { httpStatus: number; friendlyError: string } {
  const status =
    typeof (err as { status?: unknown })?.status === 'number'
      ? (err as { status: number }).status
      : undefined;
  const message = err instanceof Error ? err.message : String(err);
  console.error('Ask GitStart Gemini error:', status, message);

  if (
    status === 403 ||
    status === 400 ||
    message.includes('PERMISSION_DENIED') ||
    message.includes('API_KEY_INVALID') ||
    message.includes('API key')
  ) {
    return {
      httpStatus: 502,
      friendlyError:
        'Could not authenticate with Gemini. Please check your API key in Settings > Secrets.',
    };
  }
  if (status === 429 || message.includes('RESOURCE_EXHAUSTED')) {
    return {
      httpStatus: 429,
      friendlyError: 'Too many questions right now. Please wait a moment and try again.',
    };
  }
  if (status === 503 || message.includes('UNAVAILABLE')) {
    return {
      httpStatus: 503,
      friendlyError: 'The AI tutor is temporarily busy. Please try again in a few seconds.',
    };
  }
  if (status === 404 || message.includes('NOT_FOUND')) {
    return {
      httpStatus: 502,
      friendlyError: 'The AI model could not be reached right now. Please try again shortly.',
    };
  }
  return {
    httpStatus: 500,
    friendlyError: 'Something went wrong getting an explanation. Please try again.',
  };
}

function getGeminiClient(): GoogleGenAI {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function parseLabeledResponse(raw: string): AskGitStartResponse {
  const cleaned = raw.replace(/\*\*/g, '').trim();
  const meaningMatch = cleaned.match(
    /(?:^|\n)\s*(?:\d+\.\s*)?MEANING:\s*([\s\S]*?)(?=(?:\n\s*(?:\d+\.\s*)?(?:COMPARISON|WHERE):)|$)/i
  );
  const comparisonMatch = cleaned.match(
    /(?:^|\n)\s*(?:\d+\.\s*)?COMPARISON:\s*([\s\S]*?)(?=(?:\n\s*(?:\d+\.\s*)?WHERE:)|$)/i
  );
  const whereMatch = cleaned.match(/(?:^|\n)\s*(?:\d+\.\s*)?WHERE:\s*([\s\S]*?)$/i);

  return {
    meaning: (meaningMatch?.[1] ?? '').trim(),
    comparison: (comparisonMatch?.[1] ?? '').trim(),
    whereToFind: (whereMatch?.[1] ?? '').trim(),
  };
}

function sendSseEvent(res: express.Response, event: string, data: unknown) {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.post('/api/ask-gitstart', async (req, res) => {
    const rawQuestion = req.body?.question;
    const question = typeof rawQuestion === 'string' ? rawQuestion.trim() : '';

    if (!question) {
      res.status(400).json({ error: 'Please type a GitHub word or question first.' });
      return;
    }

    if (question.length > 300) {
      res.status(400).json({ error: 'Please keep your question under 300 characters.' });
      return;
    }

    const cacheKey = normalizeCacheKey(question);
    const cached = responseCache.get(cacheKey);
    if (cached) {
      res.json({ ...cached, cached: true });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      res.status(503).json({
        error: 'Gemini API key is not configured. Please check the Settings > Secrets panel.',
      });
      return;
    }

    let sseStarted = false;

    try {
      const ai = getGeminiClient();
      const maxAttempts = 2;
      let stream: Awaited<ReturnType<typeof ai.models.generateContentStream>> | undefined;
      let lastErr: unknown;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          stream = await ai.models.generateContentStream({
            model: 'gemini-3.1-flash-lite',
            contents: `Explain this GitHub term or question for a complete beginner: "${question}"`,
            config: {
              systemInstruction:
                'You are GitStart, a friendly tutor teaching GitHub to complete beginners who have never coded before. ' +
                'Reply in plain text using EXACTLY these 3 lines and no markdown, no bullets, and no extra text:\n' +
                'MEANING: <one simple sentence explaining what it means>\n' +
                'COMPARISON: <one short real-life comparison>\n' +
                'WHERE: <one short sentence on where to find or click it in GitHub>\n' +
                'Use very simple everyday words and keep the total across all 3 lines strictly under 80 words.',
              maxOutputTokens: 150,
              thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
            },
          });
          break;
        } catch (attemptErr: unknown) {
          lastErr = attemptErr;
          const attemptStatus =
            typeof (attemptErr as { status?: unknown })?.status === 'number'
              ? (attemptErr as { status: number }).status
              : undefined;
          const isTransient = attemptStatus === 503 || attemptStatus === 500 || attemptStatus === 429;
          if (!isTransient || attempt === maxAttempts) {
            throw attemptErr;
          }
          const delayMs = 350 * Math.pow(2, attempt - 1);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }

      if (!stream) {
        throw lastErr ?? new Error('No stream returned from Gemini');
      }

      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders?.();
      sseStarted = true;

      let fullText = '';

      for await (const chunk of stream) {
        const delta = chunk.text ?? '';
        if (delta) {
          fullText += delta;
          sendSseEvent(res, 'chunk', { delta });
        }
      }

      const trimmed = fullText.trim();
      if (!trimmed) {
        sendSseEvent(res, 'error', {
          error: 'Received an empty response. Please try asking again.',
        });
        res.end();
        return;
      }

      const parsed = parseLabeledResponse(trimmed);
      if (!parsed.meaning) {
        parsed.meaning = trimmed.split('\n')[0]?.trim() || trimmed;
      }
      if (!parsed.comparison) {
        parsed.comparison = 'Like a helpful label or shortcut inside your project workspace.';
      }
      if (!parsed.whereToFind) {
        parsed.whereToFind = 'Open your repository page on GitHub and look at the top tabs.';
      }

      saveToCache(cacheKey, parsed);
      sendSseEvent(res, 'done', parsed);
      res.end();
    } catch (err: unknown) {
      const { httpStatus, friendlyError } = mapGeminiError(err);
      if (sseStarted) {
        sendSseEvent(res, 'error', { error: friendlyError });
        res.end();
      } else {
        res.status(httpStatus).json({ error: friendlyError });
      }
    }
  });

  app.post('/api/ask-context', async (req, res) => {
    const rawQuestion = req.body?.question;
    const rawTopic = req.body?.topic;
    const rawLessonTitle = req.body?.lessonTitle;
    const rawSectionText = req.body?.sectionText;
    const rawMode = req.body?.mode;
    const rawSelectedText = req.body?.selectedText;
    const rawParagraphText = req.body?.paragraphText;
    const rawSectionTitle = req.body?.sectionTitle;
    const rawHistory = Array.isArray(req.body?.history) ? req.body.history : [];

    const question = typeof rawQuestion === 'string' ? rawQuestion.trim() : '';
    const topic = typeof rawTopic === 'string' && rawTopic.trim() ? rawTopic.trim() : 'GitHub';
    const lessonTitle =
      typeof rawLessonTitle === 'string' && rawLessonTitle.trim()
        ? rawLessonTitle.trim()
        : 'GitStart Lesson';
    const sectionText = typeof rawSectionText === 'string' ? rawSectionText.trim() : '';
    const isSelectionMode = rawMode === 'selection';
    const selectedText =
      typeof rawSelectedText === 'string' && rawSelectedText.trim()
        ? rawSelectedText.trim()
        : topic;
    const paragraphText =
      typeof rawParagraphText === 'string' && rawParagraphText.trim()
        ? rawParagraphText.trim()
        : sectionText;
    const sectionTitle =
      typeof rawSectionTitle === 'string' && rawSectionTitle.trim() ? rawSectionTitle.trim() : '';

    if (!question) {
      res.status(400).json({ error: 'Please type a question first.' });
      return;
    }

    if (question.length > 400) {
      res.status(400).json({ error: 'Please keep your question under 400 characters.' });
      return;
    }

    const typedHistory: unknown[] = Array.isArray(rawHistory) ? rawHistory : [];
    const sanitizedHistory: Array<{ role: 'user' | 'model'; text: string }> = typedHistory
      .filter(
        (item: unknown): item is { role: 'user' | 'model'; text: string } =>
          Boolean(item) &&
          typeof item === 'object' &&
          ((item as { role?: unknown }).role === 'user' ||
            (item as { role?: unknown }).role === 'model') &&
          typeof (item as { text?: unknown }).text === 'string' &&
          Boolean((item as { text: string }).text.trim())
      )
      .slice(-8)
      .map((item: { role: 'user' | 'model'; text: string }) => ({
        role: item.role,
        text: item.text.trim().slice(0, 800),
      }));

    const historySignature = sanitizedHistory
      .map((h) => `${h.role}:${normalizeCacheKey(h.text)}`)
      .join('|');

    const ctxCacheKey = isSelectionMode
      ? `sel::${normalizeCacheKey(selectedText)}::${normalizeCacheKey(paragraphText.slice(0, 400))}::${normalizeCacheKey(question)}::${historySignature}`
      : `${normalizeCacheKey(topic)}::${normalizeCacheKey(question)}::${historySignature}`;

    const cachedText = contextCache.get(ctxCacheKey);
    if (cachedText) {
      res.json({ text: cachedText, cached: true });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      res.status(503).json({
        error: 'Gemini API key is not configured. Please check the Settings > Secrets panel.',
      });
      return;
    }

    const lessonAndSection = sectionTitle ? `${lessonTitle} — ${sectionTitle}` : lessonTitle;
    const systemInstruction = isSelectionMode
      ? `You are a patient teacher helping a complete beginner on GitStart. The learner selected '${selectedText}' from this text: '${paragraphText.slice(0, 1500)}' in the lesson '${lessonAndSection}'. Explain what it means in this context, using very simple words. Give a one-line meaning, a real-life comparison, and where they will see it in GitHub. If it is a technical term, mention how it connects to the lesson topic. Keep the answer under 100 words.`
      : `You are a patient teacher helping a complete beginner who is currently learning the topic ${topic} on GitStart. ` +
        `Use the provided section text as your base. If the question is unclear or very short, assume it is about this topic and explain the whole topic simply: one-line meaning, a real-life comparison, where to find it in GitHub, and one common mistake. ` +
        `Use very simple words, short sentences, and keep answers under 120 words. ` +
        `If the question is about something outside this topic, answer briefly and mention which lesson covers it.\n\n` +
        `Lesson Title: ${lessonTitle}\n` +
        `Section Text:\n${sectionText.slice(0, 3500)}\n\n` +
        `GitStart Lessons:\n` +
        `Lesson 1: What is GitHub?\n` +
        `Lesson 2: Create your free account\n` +
        `Lesson 3: A tour of GitHub\n` +
        `Lesson 4: What is a repository?\n` +
        `Lesson 5: Add your first file to GitHub\n` +
        `Lesson 6: What is a commit?\n` +
        `Lesson 7: What is a branch?`;

    const contents = [
      ...sanitizedHistory.map((turn) => ({
        role: turn.role,
        parts: [{ text: turn.text }],
      })),
      {
        role: 'user',
        parts: [{ text: question }],
      },
    ];

    let sseStarted = false;

    try {
      const ai = getGeminiClient();
      const maxAttempts = 2;
      let stream: Awaited<ReturnType<typeof ai.models.generateContentStream>> | undefined;
      let lastErr: unknown;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          stream = await ai.models.generateContentStream({
            model: 'gemini-3.1-flash-lite',
            contents,
            config: {
              systemInstruction,
              maxOutputTokens: isSelectionMode ? 190 : 220,
              thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
            },
          });
          break;
        } catch (attemptErr: unknown) {
          lastErr = attemptErr;
          const attemptStatus =
            typeof (attemptErr as { status?: unknown })?.status === 'number'
              ? (attemptErr as { status: number }).status
              : undefined;
          const isTransient = attemptStatus === 503 || attemptStatus === 500 || attemptStatus === 429;
          if (!isTransient || attempt === maxAttempts) {
            throw attemptErr;
          }
          const delayMs = 350 * Math.pow(2, attempt - 1);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }

      if (!stream) {
        throw lastErr ?? new Error('No stream returned from Gemini');
      }

      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders?.();
      sseStarted = true;

      let fullText = '';
      for await (const chunk of stream) {
        const delta = chunk.text ?? '';
        if (delta) {
          fullText += delta;
          sendSseEvent(res, 'chunk', { delta });
        }
      }

      const trimmed = fullText.trim();
      if (!trimmed) {
        sendSseEvent(res, 'error', {
          error: 'Received an empty response. Please try asking again.',
        });
        res.end();
        return;
      }

      saveContextCache(ctxCacheKey, trimmed);
      sendSseEvent(res, 'done', { text: trimmed });
      res.end();
    } catch (err: unknown) {
      const { httpStatus, friendlyError } = mapGeminiError(err);
      if (sseStarted) {
        sendSseEvent(res, 'error', { error: friendlyError });
        res.end();
      } else {
        res.status(httpStatus).json({ error: friendlyError });
      }
    }
  });

  function parseSectionBlockOutput(
    rawText: string,
    entries: Array<{ key: string; text: string }>,
    isStreaming: boolean
  ): Record<string, string> {
    const cleanTrailingMarker = (value: string) =>
      isStreaming ? value.replace(/\[\[?\d*\]?$/, '') : value;

    if (entries.length === 1) {
      const cleaned = cleanTrailingMarker(rawText)
        .replace(/^\s*\[\[1\]\]\s*/, '')
        .trim();
      return cleaned ? { [entries[0].key]: cleaned } : {};
    }

    const matches = Array.from(rawText.matchAll(/\[\[(\d+)\]\]\s*/g));
    const map: Record<string, string> = {};

    if (matches.length === 0) {
      return map;
    }

    for (let i = 0; i < matches.length; i++) {
      const m = matches[i];
      const num = Number(m[1]);
      if (!Number.isInteger(num) || num < 1 || num > entries.length) continue;

      const startIdx = (m.index ?? 0) + m[0].length;
      const endIdx = i + 1 < matches.length ? (matches[i + 1].index ?? rawText.length) : rawText.length;
      let slice = rawText.slice(startIdx, endIdx);
      if (i === matches.length - 1) {
        slice = cleanTrailingMarker(slice);
      }
      const trimmed = slice.trim();
      if (trimmed) {
        map[entries[num - 1].key] = trimmed;
      }
    }

    return map;
  }

  function getTargetLanguageName(code: 'te' | 'hi' | 'ta'): string {
    if (code === 'te') return 'Telugu';
    if (code === 'hi') return 'Hindi';
    return 'Tamil';
  }

  app.post('/api/translate-section', async (req, res) => {
    const rawFullSectionId = req.body?.fullSectionId;
    const rawLanguage = req.body?.targetLanguage;
    const rawVersion = req.body?.cacheVersion;
    const rawEntries = req.body?.entries;

    const fullSectionId =
      typeof rawFullSectionId === 'string' ? rawFullSectionId.trim() : '';
    const targetLanguage =
      rawLanguage === 'te' || rawLanguage === 'hi' || rawLanguage === 'ta'
        ? rawLanguage
        : null;
    const cacheVersion = typeof rawVersion === 'string' ? rawVersion.trim() : '';

    if (
      !fullSectionId ||
      !targetLanguage ||
      !Array.isArray(rawEntries) ||
      rawEntries.length === 0
    ) {
      res.status(400).json({ error: 'Invalid section translation request.' });
      return;
    }

    if (rawEntries.length > 40) {
      res.status(400).json({ error: 'Section payload is too large.' });
      return;
    }

    const entries: Array<{ key: string; text: string }> = rawEntries
      .filter(
        (item: unknown): item is { key: string; text: string } =>
          Boolean(item) &&
          typeof item === 'object' &&
          typeof (item as { key?: unknown }).key === 'string' &&
          typeof (item as { text?: unknown }).text === 'string'
      )
      .map((item: { key: string; text: string }) => ({
        key: item.key.trim(),
        text: item.text,
      }));

    if (entries.length === 0) {
      res.status(400).json({ error: 'No translatable entries in section.' });
      return;
    }

    const cacheKey = `${fullSectionId}:${targetLanguage}:${cacheVersion}`;
    const cached = translationCache.get(cacheKey);
    if (cached) {
      res.json({ translations: cached, cached: true });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      res.status(503).json({
        error: 'Gemini API key is not configured. Please check the Settings > Secrets panel.',
      });
      return;
    }

    const languageName = getTargetLanguageName(targetLanguage);
    const systemInstruction =
      `Translate this beginner GitHub lesson text into ${languageName}. ` +
      `Use simple, spoken, everyday words, not formal or literary ones. ` +
      `Keep technical terms like commit, branch, repository, README, and GitHub in English, ` +
      `with a short explanation in ${languageName} the first time each appears. ` +
      `Keep the markup, numbering, and code unchanged. Return only the translation.`;

    const userPrompt =
      entries.length === 1
        ? entries[0].text
        : 'Keep each [[n]] tag on its own line in order and translate every block:\n\n' +
          entries.map((entry, idx) => `[[${idx + 1}]]\n${entry.text}`).join('\n\n');

    let sseStarted = false;

    try {
      const ai = getGeminiClient();
      const maxAttempts = 2;
      let stream: Awaited<ReturnType<typeof ai.models.generateContentStream>> | undefined;
      let lastErr: unknown;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          stream = await ai.models.generateContentStream({
            model: 'gemini-3.1-flash-lite',
            contents: userPrompt,
            config: {
              systemInstruction,
              thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
              maxOutputTokens: 2048,
            },
          });
          break;
        } catch (attemptErr: unknown) {
          lastErr = attemptErr;
          const attemptStatus =
            typeof (attemptErr as { status?: unknown })?.status === 'number'
              ? (attemptErr as { status: number }).status
              : undefined;
          const isTransient =
            attemptStatus === 503 || attemptStatus === 500 || attemptStatus === 429;
          if (!isTransient || attempt === maxAttempts) {
            throw attemptErr;
          }
          const delayMs = 300 * Math.pow(2, attempt - 1);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }

      if (!stream) {
        throw lastErr ?? new Error('No translation stream returned from Gemini');
      }

      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders?.();
      sseStarted = true;

      let fullText = '';
      let lastSerialized = '';

      for await (const chunk of stream) {
        const delta = chunk.text ?? '';
        if (!delta) continue;
        fullText += delta;
        const partialMap = parseSectionBlockOutput(fullText, entries, true);
        const serialized = JSON.stringify(partialMap);
        if (Object.keys(partialMap).length > 0 && serialized !== lastSerialized) {
          lastSerialized = serialized;
          sendSseEvent(res, 'partial', { translations: partialMap });
        }
      }

      const finalMap = parseSectionBlockOutput(fullText.trim(), entries, false);
      if (Object.keys(finalMap).length === 0) {
        sendSseEvent(res, 'error', {
          error: 'Received an empty translation. Please try again.',
        });
        res.end();
        return;
      }

      saveTranslationCache(cacheKey, finalMap);
      sendSseEvent(res, 'done', { translations: finalMap, cached: false });
      res.end();
    } catch (err: unknown) {
      const { httpStatus, friendlyError } = mapGeminiError(err);
      if (sseStarted) {
        sendSseEvent(res, 'error', { error: friendlyError });
        res.end();
      } else {
        res.status(httpStatus).json({ error: friendlyError });
      }
    }
  });

  app.post('/api/translate-lesson', async (req, res) => {
    const rawLessonId = req.body?.lessonId;
    const rawLanguage = req.body?.targetLanguage;
    const rawVersion = req.body?.cacheVersion;
    const rawEntries = req.body?.entries;

    const lessonId = typeof rawLessonId === 'string' ? rawLessonId.trim() : '';
    const targetLanguage =
      rawLanguage === 'te' || rawLanguage === 'hi' || rawLanguage === 'ta'
        ? rawLanguage
        : null;
    const cacheVersion = typeof rawVersion === 'string' ? rawVersion.trim() : '';

    if (!lessonId || !targetLanguage || !Array.isArray(rawEntries) || rawEntries.length === 0) {
      res.status(400).json({ error: 'Invalid translation request.' });
      return;
    }

    if (rawEntries.length > 200) {
      res.status(400).json({ error: 'Lesson payload is too large to translate at once.' });
      return;
    }

    const entries: Array<{ key: string; text: string }> = rawEntries
      .filter(
        (item: unknown): item is { key: string; text: string } =>
          Boolean(item) &&
          typeof item === 'object' &&
          typeof (item as { key?: unknown }).key === 'string' &&
          typeof (item as { text?: unknown }).text === 'string'
      )
      .map((item: { key: string; text: string }) => ({
        key: item.key.trim(),
        text: item.text,
      }));

    if (entries.length === 0) {
      res.status(400).json({ error: 'No translatable entries found.' });
      return;
    }

    const cacheKey = `${lessonId}:${targetLanguage}:${cacheVersion}`;
    const cached = translationCache.get(cacheKey);
    if (cached) {
      res.json({ translations: cached, cached: true });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      res.status(503).json({
        error: 'Gemini API key is not configured. Please check the Settings > Secrets panel.',
      });
      return;
    }

    const languageName = getTargetLanguageName(targetLanguage);
    const systemInstruction =
      `Translate this beginner GitHub lesson text into ${languageName}. ` +
      `Use simple, spoken, everyday words, not formal or literary ones. ` +
      `Keep technical terms like commit, branch, repository, README, and GitHub in English, ` +
      `with a short explanation in ${languageName} the first time each appears. ` +
      `Keep the markup, numbering, and code unchanged. Return only the translation.`;

    try {
      const ai = getGeminiClient();
      const maxAttempts = 2;
      let response: Awaited<ReturnType<typeof ai.models.generateContent>> | undefined;
      let lastErr: unknown;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: JSON.stringify({ entries }),
            config: {
              systemInstruction,
              thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
              maxOutputTokens: 8192,
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  translations: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        key: { type: Type.STRING },
                        text: { type: Type.STRING },
                      },
                      required: ['key', 'text'],
                    },
                  },
                },
                required: ['translations'],
              },
            },
          });
          break;
        } catch (attemptErr: unknown) {
          lastErr = attemptErr;
          const attemptStatus =
            typeof (attemptErr as { status?: unknown })?.status === 'number'
              ? (attemptErr as { status: number }).status
              : undefined;
          const isTransient = attemptStatus === 503 || attemptStatus === 500 || attemptStatus === 429;
          if (!isTransient || attempt === maxAttempts) {
            throw attemptErr;
          }
          const delayMs = 350 * Math.pow(2, attempt - 1);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }

      if (!response) {
        throw lastErr ?? new Error('No translation returned from Gemini');
      }

      const rawText = (response.text ?? '').trim();
      if (!rawText) {
        res.status(502).json({ error: 'Received an empty translation. Please try again.' });
        return;
      }

      const parsed = JSON.parse(rawText) as {
        translations?: Array<{ key?: unknown; text?: unknown }>;
      };

      const translatedMap: Record<string, string> = {};
      if (Array.isArray(parsed.translations)) {
        for (const item of parsed.translations) {
          if (typeof item.key === 'string' && typeof item.text === 'string' && item.text.trim()) {
            translatedMap[item.key] = item.text.trim();
          }
        }
      }

      if (Object.keys(translatedMap).length === 0) {
        res.status(502).json({ error: 'Could not parse translated lesson content. Please try again.' });
        return;
      }

      saveTranslationCache(cacheKey, translatedMap);
      res.json({ translations: translatedMap, cached: false });
    } catch (err: unknown) {
      const { httpStatus, friendlyError } = mapGeminiError(err);
      res.status(httpStatus).json({ error: friendlyError });
    }
  });

  const httpServer = createServer(app);

  if (isProduction) {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: {
          server: httpServer,
        },
        allowedHosts: true,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`GitStart server listening on http://localhost:${PORT}`);
  });
}

startServer();
