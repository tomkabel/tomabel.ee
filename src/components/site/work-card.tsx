import { Link } from 'react-router-dom';
import type { FeaturedWork } from '../../content/site';
import { englishOnlyArticles } from '../../content/site';
import { useTranslation } from '../../i18n/LanguageContext';

export default function WorkCard({ item, className = '' }: { item: FeaturedWork; className?: string }) {
  const { language, t } = useTranslation();
  const title = item.title[language];
  const blurb = item.blurb[language];
  const cta = item.cta[language];

  // The entire card is the interactive target (Fitts's Law). Hover answers with
  // a tonal step up, a signal-tinted top edge, a drawn title underline and the
  // arrow moving; nothing jumps or scales.
  return (
    <Link
      to={item.href}
      className={`group grid grid-rows-[auto_auto_1fr_auto] gap-y-4 rounded-card border border-border-strong bg-surface p-8 shadow-elevated transition-[background-color,border-color,box-shadow] duration-base hover:border-accent/40 hover:bg-surface-2 hover:shadow-elevated-accent ${className}`}
    >
      <p className="label mb-6 text-accent">
        {item.impact[language]}
        {language !== 'en' && englishOnlyArticles.has(item.href) ? (
          <span className="text-warning"> · {t.app.englishOnly}</span>
        ) : null}
      </p>
      <h3 className="font-display text-3xl leading-tight text-foreground">
        <span className="link-draw">{title}</span>
      </h3>
      <p className="prose-measure text-muted">{blurb}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-6">
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {item.tags.map((t) => (
            <li key={t} className="label text-muted-foreground">
              {t}
            </li>
          ))}
        </ul>
        <span className="label font-medium text-accent">
          {cta} <span className="arrow-shift">→</span>
        </span>
      </div>
    </Link>
  );
}
