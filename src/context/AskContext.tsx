import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AskSectionContext } from '../types/lesson';

interface AskContextValue {
  activeContext: AskSectionContext | null;
  currentLessonTitle: string;
  openAskAbout: (ctx: AskSectionContext) => void;
  closeAskAbout: () => void;
  openGlossary: (termKey?: string) => void;
}

const AskContext = createContext<AskContextValue | null>(null);

export function AskContextProvider({
  currentLessonTitle,
  onOpenGlossary,
  children,
}: {
  currentLessonTitle: string;
  onOpenGlossary?: (termKey?: string) => void;
  children: ReactNode;
}) {
  const [activeContext, setActiveContext] = useState<AskSectionContext | null>(null);

  const openAskAbout = useCallback((ctx: AskSectionContext) => {
    setActiveContext(ctx);
  }, []);

  const closeAskAbout = useCallback(() => {
    setActiveContext(null);
  }, []);

  const openGlossary = useCallback(
    (termKey?: string) => {
      setActiveContext(null);
      onOpenGlossary?.(termKey);
    },
    [onOpenGlossary]
  );

  return (
    <AskContext.Provider
      value={{
        activeContext,
        currentLessonTitle,
        openAskAbout,
        closeAskAbout,
        openGlossary,
      }}
    >
      {children}
    </AskContext.Provider>
  );
}

export function useAskContext(): AskContextValue {
  const ctx = useContext(AskContext);
  if (!ctx) {
    throw new Error('useAskContext must be used within AskContextProvider');
  }
  return ctx;
}
