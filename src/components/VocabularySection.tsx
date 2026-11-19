import { FolderGit2, GitBranch, CheckCircle2 } from 'lucide-react';
import type { VocabularyCard } from '../types/lesson';
import { AskAboutButton } from './AskAboutButton';
import { SectionFeedbackWidget } from './SectionFeedbackWidget';
import {
  SectionListenButton,
  SpeakableHighlight,
  SpeakableText,
} from './SectionListenButton';
import { SectionTranslationPill, useSectionShimmer } from './SectionTranslationPill';
import {
  buildSentenceUnits,
  sanitizeTextForSpeech,
  type SpeechUnit,
} from '../utils/speech';

interface VocabularySectionProps {
  lessonId?: string;
  lessonTitle?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: VocabularyCard[];
}

function CardIcon({ icon }: { icon: VocabularyCard['icon'] }) {
  if (icon === 'branch') {
    return <GitBranch className="w-5 h-5" />;
  }
  if (icon === 'check') {
    return <CheckCircle2 className="w-5 h-5" />;
  }
  return <FolderGit2 className="w-5 h-5" />;
}

function GlossaryCardItem({
  lessonId,
  sectionId,
  card,
}: {
  lessonId: string;
  sectionId: string;
  card: VocabularyCard;
}) {
  const cardTranslationId = `vocab-${card.id}`;
  const isTranslatingCard = useSectionShimmer(cardTranslationId);

  return (
    <div
      id={`vocab-card-${card.id}`}
      data-translate-section={cardTranslationId}
      className={`rounded-xl bg-surface-container-lowest border border-outline-variant/40 p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(28,25,23,0.04)] overflow-hidden ${
        isTranslatingCard ? 'translate-section-shimmer' : ''
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-5">
          <div
            className={`w-9 h-9 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-center shrink-0 ${
              card.accent === 'secondary' ? 'text-secondary' : 'text-primary'
            }`}
          >
            <CardIcon icon={card.icon} />
          </div>
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            <SectionTranslationPill sectionId={cardTranslationId} compact />
            <AskAboutButton
              sectionId={`${lessonId}-vocab-${card.id}`}
              topic={card.term}
              sectionText={`${card.term}: ${card.definition}\n${card.analogyLabel} ${card.analogy}`}
            />
          </div>
        </div>
        <h3 className="text-[18px] font-medium text-on-surface mb-2.5">
          <SpeakableHighlight
            sectionId={sectionId}
            unitId={`${sectionId}-${card.id}-term`}
          >
            {card.term}
          </SpeakableHighlight>
        </h3>
        <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
          <SpeakableText
            sectionId={sectionId}
            unitPrefix={`${sectionId}-${card.id}-def`}
            text={card.definition}
          />
        </p>
      </div>

      <div className="pt-4 bg-surface-container-low/40 border-t border-outline-variant/30 -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-5 sm:p-6 rounded-b-xl">
        <span className="text-[10px] font-semibold text-on-surface-variant/75 uppercase tracking-[0.12em] block mb-1.5">
          <SpeakableHighlight
            sectionId={sectionId}
            unitId={`${sectionId}-${card.id}-analogy-label`}
          >
            {card.analogyLabel}
          </SpeakableHighlight>
        </span>
        <p className="text-xs text-on-surface/90 italic leading-relaxed">
          <SpeakableText
            sectionId={sectionId}
            unitPrefix={`${sectionId}-${card.id}-analogy`}
            text={card.analogy}
            withExplain={false}
          />
        </p>
      </div>
    </div>
  );
}

export function VocabularySection({
  lessonId = 'lesson',
  lessonTitle = 'Lesson',
  eyebrow,
  title,
  subtitle,
  cards,
}: VocabularySectionProps) {
  const sectionId = `${lessonId}-vocabulary`;
  const isTranslatingHeader = useSectionShimmer('vocab-header');

  const buildVocabularyUnits = (): SpeechUnit[] => [
    {
      id: `${sectionId}-title`,
      text: title,
      speechText: sanitizeTextForSpeech(title),
    },
    ...buildSentenceUnits(`${sectionId}-sub`, subtitle),
    ...cards.flatMap((card) => [
      {
        id: `${sectionId}-${card.id}-term`,
        text: card.term,
        speechText: sanitizeTextForSpeech(card.term),
      },
      ...buildSentenceUnits(`${sectionId}-${card.id}-def`, card.definition),
      {
        id: `${sectionId}-${card.id}-analogy-label`,
        text: card.analogyLabel,
        speechText: sanitizeTextForSpeech(card.analogyLabel),
      },
      ...buildSentenceUnits(`${sectionId}-${card.id}-analogy`, card.analogy),
    ]),
  ];

  return (
    <section
      id="vocabulary"
      data-section-title={title}
      className="w-full py-16 sm:py-24 scroll-mt-24"
    >
      <div
        data-translate-section="vocab-header"
        className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14 ${
          isTranslatingHeader ? 'translate-section-shimmer' : ''
        }`}
      >
        <div className="max-w-2xl">
          <span className="text-xs tracking-[0.12em] text-primary font-semibold uppercase mb-3 block">
            {eyebrow}
          </span>
          <h2 className="text-[28px] sm:text-[34px] lg:text-[36px] leading-[1.22] font-normal text-on-surface tracking-[-0.015em] mb-3">
            <SpeakableHighlight sectionId={sectionId} unitId={`${sectionId}-title`}>
              {title}
            </SpeakableHighlight>
          </h2>
          <p className="text-[16px] sm:text-[17px] leading-[1.7] text-on-surface-variant">
            <SpeakableText
              sectionId={sectionId}
              unitPrefix={`${sectionId}-sub`}
              text={subtitle}
              withExplain={false}
            />
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-end">
          <SectionTranslationPill sectionId="vocab-header" />
          <SectionListenButton
            sectionId={sectionId}
            sectionLabel={title}
            getUnits={buildVocabularyUnits}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((card) => (
          <GlossaryCardItem
            key={card.id}
            lessonId={lessonId}
            sectionId={sectionId}
            card={card}
          />
        ))}
      </div>

      <SectionFeedbackWidget
        lessonId={lessonId}
        lessonTitle={lessonTitle}
        sectionId="vocabulary"
        sectionTitle={title}
      />
    </section>
  );
}
