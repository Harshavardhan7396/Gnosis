import type { CodeSegment } from '../types/lesson';

export type SpeechRate = 0.75 | 1 | 1.25;

export interface SpeechUnit {
  id: string;
  text: string;
  speechText: string;
  isCodeBlock?: boolean;
}

const ABBREVIATIONS_REGEX = /\b(?:e\.g|i\.e|vs|etc|Mr|Ms|Mrs|Dr)\.$/i;

/**
 * Replaces fenced code blocks and inline backtick code snippets with "code example"
 * for natural spoken output without reading raw code syntax aloud.
 */
export function sanitizeTextForSpeech(text: string): string {
  const withoutFenced = text.replace(/```[\s\S]*?```/g, ' code example ');
  const withoutInlineCode = withoutFenced.replace(/`[^`]+`/g, ' code example ');
  return withoutInlineCode.replace(/\s+/g, ' ').trim();
}

/**
 * Splits prose into readable sentences without breaking on filenames (README.md),
 * URLs (github.com), or common abbreviations (e.g., vs.).
 */
export function splitIntoSentences(text: string): string[] {
  const normalized = text.trim();
  if (!normalized) return [];

  const sentences: string[] = [];
  let start = 0;

  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    if (ch !== '.' && ch !== '!' && ch !== '?' && ch !== '।') continue;

    // Look past optional closing quote/bracket immediately after punctuation
    let endIdx = i + 1;
    while (endIdx < normalized.length && /["”’)\]]/.test(normalized[endIdx])) {
      endIdx++;
    }

    const nextChar = normalized[endIdx];
    const atEnd = endIdx >= normalized.length;
    const followedByWhitespace = Boolean(nextChar && /\s/.test(nextChar));

    if (!atEnd && !followedByWhitespace) {
      // Avoid splitting inside URLs or filenames like README.md or github.com
      continue;
    }

    const candidate = normalized.slice(start, endIdx);
    if (ch === '.' && ABBREVIATIONS_REGEX.test(candidate.replace(/["”’)\]]+$/, ''))) {
      continue;
    }

    const trimmed = candidate.trim();
    if (trimmed) {
      sentences.push(trimmed);
    }

    // Advance past whitespace to start of next sentence
    let nextStart = endIdx;
    while (nextStart < normalized.length && /\s/.test(normalized[nextStart])) {
      nextStart++;
    }
    start = nextStart;
    i = Math.max(i, nextStart - 1);
  }

  if (start < normalized.length) {
    const tail = normalized.slice(start).trim();
    if (tail) {
      sentences.push(tail);
    }
  }

  return sentences.length > 0 ? sentences : [normalized];
}

export interface TextOrCodeChunk {
  kind: 'text' | 'code-block';
  value: string;
}

export function splitFencedCodeBlocks(text: string): TextOrCodeChunk[] {
  const chunks: TextOrCodeChunk[] = [];
  const regex = /```[\s\S]*?```/g;
  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    const idx = match.index ?? 0;
    if (idx > lastIndex) {
      chunks.push({ kind: 'text', value: text.slice(lastIndex, idx) });
    }
    chunks.push({ kind: 'code-block', value: match[0] });
    lastIndex = idx + match[0].length;
  }

  if (lastIndex < text.length) {
    chunks.push({ kind: 'text', value: text.slice(lastIndex) });
  }

  return chunks;
}

/**
 * Builds sentence-level speech units from prose, skipping any fenced/inline code blocks
 * and speaking "code example" instead.
 */
export function buildSentenceUnits(prefixId: string, text: string): SpeechUnit[] {
  const chunks = splitFencedCodeBlocks(text);
  const units: SpeechUnit[] = [];
  let idx = 0;

  for (const chunk of chunks) {
    if (chunk.kind === 'code-block') {
      units.push({
        id: `${prefixId}-s${idx}`,
        text: chunk.value,
        speechText: 'Code example.',
        isCodeBlock: true,
      });
      idx++;
      continue;
    }

    const sentences = splitIntoSentences(chunk.value);
    for (const sentence of sentences) {
      const speechText = sanitizeTextForSpeech(sentence);
      if (speechText) {
        units.push({
          id: `${prefixId}-s${idx}`,
          text: sentence,
          speechText,
        });
        idx++;
      }
    }
  }

  return units;
}

export interface SegmentSentence {
  id: string;
  segments: CodeSegment[];
  speechText: string;
}

/**
 * Splits structured CodeSegment[] (such as HeroSection descriptions) into sentence groups
 * so each sentence renders its inline code pills cleanly while speaking "code example" for code.
 */
export function splitCodeSegmentsIntoSentences(
  prefixId: string,
  segments: CodeSegment[]
): SegmentSentence[] {
  const sentences: SegmentSentence[] = [];
  let currentSegments: CodeSegment[] = [];
  let currentSpeechParts: string[] = [];

  const flushSentence = () => {
    const trimmedSpeech = currentSpeechParts.join('').replace(/\s+/g, ' ').trim();
    if (currentSegments.length > 0 && trimmedSpeech) {
      sentences.push({
        id: `${prefixId}-s${sentences.length}`,
        segments: currentSegments,
        speechText: trimmedSpeech,
      });
    }
    currentSegments = [];
    currentSpeechParts = [];
  };

  for (const segment of segments) {
    if (segment.type === 'code') {
      currentSegments.push(segment);
      currentSpeechParts.push(' code example ');
      continue;
    }

    const parts = splitIntoSentences(segment.value);
    parts.forEach((part, partIdx) => {
      const hasLeadingSpace = partIdx === 0 && /^\s/.test(segment.value);
      const hasTrailingSpace =
        partIdx === parts.length - 1 ? /\s$/.test(segment.value) : true;

      currentSegments.push({
        type: 'text',
        value: `${hasLeadingSpace ? ' ' : ''}${part}${hasTrailingSpace ? ' ' : ''}`,
      });
      currentSpeechParts.push(
        `${hasLeadingSpace ? ' ' : ''}${sanitizeTextForSpeech(part)}${hasTrailingSpace ? ' ' : ''}`
      );

      if (/[.!?।]["”’)\]]?$/.test(part)) {
        flushSentence();
      }
    });
  }

  flushSentence();
  return sentences;
}
