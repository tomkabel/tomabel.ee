import Link from './link';
import type { FeaturedWork } from '../../content/site';
import { englishOnlyArticles } from '../../content/site';
import { cardSchematics } from '../../content/schematics';
import { useTranslation } from '../../i18n/LanguageContext';

// Featured card: the schematic is the thumbnail, then mono impact line, serif
// title, one-line blurb and amber topic tags. The whole card is the target.
export default function WorkCard({ item, className = '' }: { item: FeaturedWork; className?: string }) {
  const { language, t } = useTranslation();
  const schematic = cardSchematics[item.href];

  return (
    <Link
      to={item.href}
      className={`group grid grid-rows-[auto_auto_auto_1fr_auto] gap-y-3 rounded-card border border-border bg-surface p-5 transition-[background-color,border-color] duration-base hover:border-accent/40 hover:bg-surface-2 ${className}`}
    >
      {schematic ? (
        <div className="mb-2 rounded-figure border border-border bg-sunken px-3 py-2">{schematic(language)}</div>
      ) : null}
      <p className="font-mono text-xs text-accent">
        {item.impact[language]}
        {language !== 'en' && englishOnlyArticles.has(item.href) ? (
          <span className="text-warning"> · {t.app.englishOnly}</span>
        ) : null}
      </p>
      <h3 className="font-display text-2xl leading-tight text-foreground">
        <span className="link-draw">{item.title[language]}</span>
      </h3>
      <p className="text-muted">{item.blurb[language]}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <li key={tag} className="rounded-hair bg-warning px-2 py-0.5 font-mono text-xs uppercase text-accent-foreground">
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
}
