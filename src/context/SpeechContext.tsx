import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { SpeechRate, SpeechUnit } from '../utils/speech';

export type SpeechStatus = 'idle' | 'playing' | 'paused';

const SPEECH_RATE_STORAGE_KEY = 'gitstart-speech-rate-v1';

function readSavedRate(): SpeechRate {
  try {
    const raw = localStorage.getItem(SPEECH_RATE_STORAGE_KEY);
    if (raw === '0.75') return 0.75;
    if (raw === '1.25') return 1.25;
  } catch {
    // Ignore storage read errors
  }
  return 1;
}

function saveSpeechRate(rate: SpeechRate) {
  try {
    localStorage.setItem(SPEECH_RATE_STORAGE_KEY, String(rate));
  } catch {
    // Ignore storage write errors
  }
}

interface SpeechContextValue {
  supported: boolean;
  language: 'en' | 'te' | 'hi' | 'ta';
  activeSectionId: string | null;
  activeUnitId: string | null;
  activeUnitIndex: number;
  status: SpeechStatus;
  rate: SpeechRate;
  startSection: (sectionId: string, units: SpeechUnit[]) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setRate: (rate: SpeechRate) => void;
}

const SpeechContext = createContext<SpeechContextValue | null>(null);

const SPEECH_LANG_MAP = {
  en: 'en-US',
  te: 'te-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
} as const;

export function SpeechProvider({
  children,
  language = 'en',
}: {
  children: ReactNode;
  language?: 'en' | 'te' | 'hi' | 'ta';
}) {
  const supported =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof SpeechSynthesisUtterance !== 'undefined';

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [units, setUnits] = useState<SpeechUnit[]>([]);
  const [activeUnitIndex, setActiveUnitIndex] = useState<number>(-1);
  const [status, setStatus] = useState<SpeechStatus>('idle');
  const [rate, setRateState] = useState<SpeechRate>(() => readSavedRate());

  const unitsRef = useRef<SpeechUnit[]>([]);
  const activeIndexRef = useRef<number>(-1);
  const rateRef = useRef<SpeechRate>(rate);
  const statusRef = useRef<SpeechStatus>('idle');
  const languageRef = useRef<'en' | 'te' | 'hi' | 'ta'>(language);
  const playbackTokenRef = useRef<number>(0);

  unitsRef.current = units;
  activeIndexRef.current = activeUnitIndex;
  rateRef.current = rate;
  statusRef.current = status;
  languageRef.current = language;

  const cancelBrowserSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const stop = useCallback(() => {
    playbackTokenRef.current += 1;
    cancelBrowserSpeech();
    setStatus('idle');
    setActiveSectionId(null);
    setUnits([]);
    setActiveUnitIndex(-1);
  }, [cancelBrowserSpeech]);

  const speakAtIndex = useCallback(
    (index: number, overrideRate?: SpeechRate) => {
      if (!supported) return;
      const list = unitsRef.current;
      if (index < 0 || index >= list.length) {
        stop();
        return;
      }

      const unit = list[index];
      const token = ++playbackTokenRef.current;
      cancelBrowserSpeech();

      setActiveUnitIndex(index);
      setStatus('playing');

      const utterance = new SpeechSynthesisUtterance(unit.speechText);
      utterance.rate = overrideRate ?? rateRef.current;
      utterance.lang = SPEECH_LANG_MAP[languageRef.current] ?? 'en-US';

      utterance.onend = () => {
        if (playbackTokenRef.current !== token) return;
        const nextIndex = index + 1;
        if (nextIndex < unitsRef.current.length) {
          speakAtIndex(nextIndex);
        } else {
          stop();
        }
      };

      utterance.onerror = (event) => {
        if (playbackTokenRef.current !== token) return;
        if (event.error === 'interrupted' || event.error === 'canceled') return;
        const nextIndex = index + 1;
        if (nextIndex < unitsRef.current.length) {
          speakAtIndex(nextIndex);
        } else {
          stop();
        }
      };

      window.speechSynthesis.speak(utterance);
    },
    [cancelBrowserSpeech, stop, supported]
  );

  const startSection = useCallback(
    (sectionId: string, nextUnits: SpeechUnit[]) => {
      if (!supported || languageRef.current !== 'en') return;
      const cleanUnits = nextUnits.filter((u) => u.speechText.trim().length > 0);
      if (cleanUnits.length === 0) return;

      unitsRef.current = cleanUnits;
      setUnits(cleanUnits);
      setActiveSectionId(sectionId);
      speakAtIndex(0);
    },
    [speakAtIndex, supported]
  );

  const pause = useCallback(() => {
    if (!supported || statusRef.current !== 'playing') return;
    // Cancel current utterance while preserving activeUnitIndex so resume works reliably
    // across all browsers (avoiding Chrome's speechSynthesis.pause/rate stall bugs).
    playbackTokenRef.current += 1;
    cancelBrowserSpeech();
    setStatus('paused');
  }, [cancelBrowserSpeech, supported]);

  const play = useCallback(() => {
    if (!supported || languageRef.current !== 'en') return;
    if (statusRef.current === 'paused' && unitsRef.current.length > 0) {
      const idx = Math.max(0, activeIndexRef.current);
      speakAtIndex(idx);
    }
  }, [speakAtIndex, supported]);

  const setRate = useCallback(
    (nextRate: SpeechRate) => {
      rateRef.current = nextRate;
      setRateState(nextRate);
      saveSpeechRate(nextRate);

      if (statusRef.current === 'playing' && unitsRef.current.length > 0) {
        const idx = Math.max(0, activeIndexRef.current);
        speakAtIndex(idx, nextRate);
      }
    },
    [speakAtIndex]
  );

  useEffect(() => {
    const handleBeforeUnload = () => {
      cancelBrowserSpeech();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      cancelBrowserSpeech();
    };
  }, [cancelBrowserSpeech]);

  const activeUnitId =
    activeSectionId && activeUnitIndex >= 0 && activeUnitIndex < units.length
      ? units[activeUnitIndex].id
      : null;

  const value = useMemo<SpeechContextValue>(
    () => ({
      supported,
      language,
      activeSectionId,
      activeUnitId,
      activeUnitIndex,
      status,
      rate,
      startSection,
      play,
      pause,
      stop,
      setRate,
    }),
    [
      supported,
      language,
      activeSectionId,
      activeUnitId,
      activeUnitIndex,
      status,
      rate,
      startSection,
      play,
      pause,
      stop,
      setRate,
    ]
  );

  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>;
}

export function useSpeech() {
  const ctx = useContext(SpeechContext);
  if (!ctx) {
    throw new Error('useSpeech must be used inside a SpeechProvider');
  }
  return ctx;
}
