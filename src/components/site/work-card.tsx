import type { ReactNode } from 'react';
import Link from './link';
import type { FeaturedWork } from '../../content/site';
import { englishOnlyArticles } from '../../content/site';
import { useTranslation } from '../../i18n/LanguageContext';

export default function WorkCard({
  item,
  className = '',
  schematic,
}: {
  item: FeaturedWork;
  className?: string;
  // Decorative line drawing in the top-right corner, above the title (xl+
  // only, where that band is clear). 12% at rest, 35% on hover.
  schematic?: ReactNode;
}) {
  const { language, t } = useTranslation();
  const title = item.title[language];
  const blurb = item.blurb[language];
  const cta = item.cta[language];

  // The entire card is the interactive target (Fitts's Law). Border and fill
  // define the region; hover answers with a tonal step up, a signal-tinted
  // border, a drawn title underline and the arrow moving. Signal colour is kept
  // for the action alone, so the label stays neutral.
  return (
    <Link
      to={item.href}
      className={`group relative isolate grid grid-rows-[auto_auto_1fr_auto] gap-y-4 overflow-hidden rounded-card border border-border bg-surface p-8 transition-[background-color,border-color] duration-base hover:border-accent/35 hover:bg-surface-2 ${className}`}
    >
      {schematic ? (
        <div
          aria-hidden
          className="pointer-events-none absolute right-6 top-4 -z-10 hidden select-none text-foreground opacity-[.12] transition-opacity duration-slow group-hover:opacity-[.35] xl:block"
        >
          {schematic}
        </div>
      ) : null}
      <p className="label mb-6 text-muted-foreground">
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
        <ul className="flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <li key={t} className="rounded-hair border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
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
