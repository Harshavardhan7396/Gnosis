import { MessageCircleQuestion } from 'lucide-react';
import { useAskContext } from '../context/AskContext';
import type { AskSectionContext } from '../types/lesson';

interface AskAboutButtonProps {
  topic: string;
  sectionId: string;
  sectionText: string;
  lessonTitle?: string;
  label?: string;
  className?: string;
  onBeforeOpen?: () => void;
}

export function AskAboutButton({
  topic,
  sectionId,
  sectionText,
  lessonTitle,
  label = 'Ask about this',
  className = '',
  onBeforeOpen,
}: AskAboutButtonProps) {
  const { openAskAbout, currentLessonTitle, activeContext } = useAskContext();
  const isActive = activeContext?.id === sectionId;

  const handleClick = () => {
    onBeforeOpen?.();
    const ctx: AskSectionContext = {
      id: sectionId,
      topic,
      lessonTitle: lessonTitle ?? currentLessonTitle,
      sectionText,
    };
    openAskAbout(ctx);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`${label}: ${topic}`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
        isActive
          ? 'bg-primary-fixed/35 border-primary/50 text-primary'
          : 'bg-surface-container-low/80 border-outline-variant/45 text-on-surface-variant hover:text-primary hover:border-primary/40 hover:bg-surface-container-lowest'
      } ${className}`}
    >
      <MessageCircleQuestion className="w-3.5 h-3.5 shrink-0" />
      <span>{label}</span>
    </button>
  );
}
