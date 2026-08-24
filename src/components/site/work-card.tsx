import { Link } from 'react-router-dom';
import type { FeaturedWork } from '../../content/site';
import { useTranslation } from '../../i18n/LanguageContext';

export default function WorkCard({ item }: { item: FeaturedWork }) {
  const { language } = useTranslation();
  const title = item.title[language];
  const blurb = item.blurb[language];
  const cta = item.cta[language];

  // The entire card is the interactive target (Fitts's Law), with tangible
  // elevation: a resting surface that lifts and gains a specular edge on hover.
  return (
    <Link
      to={item.href}
      className="group relative flex flex-col rounded-lg border border-border-strong bg-surface p-8 shadow-elevated transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface-2 hover:shadow-elevated-accent"
    >
      <span className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-accent">
        {item.impact[language]}
      </span>
      <h3 className="mb-4 font-display text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
        {title}
      </h3>
      <p className="prose-measure mb-8 text-muted">{blurb}</p>
      <div className="mt-auto flex items-end justify-between gap-6">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
          {cta} <span className="arrow-shift inline-block">→</span>
        </span>
      </div>
    </Link>
  );
}
