import { Link } from 'react-router-dom';
import type { FeaturedWork } from '../../content/site';
import { useTranslation } from '../../i18n/LanguageContext';

export default function WorkCard({ item }: { item: FeaturedWork }) {
  const { language } = useTranslation();
  const title = item.title[language];
  const blurb = item.blurb[language];
  const cta = item.cta[language];

  return (
    <Link
      to={item.href}
      className="group relative flex flex-col border border-border-strong p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-white/[0.015]"
    >
      <span aria-hidden className="pointer-events-none absolute left-0 top-0 size-3 border-l border-t border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span aria-hidden className="pointer-events-none absolute right-0 bottom-0 size-3 border-r border-b border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-12 flex items-start justify-between">
        <span className="bg-white/5 px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors group-hover:text-accent">
          {item.code}
        </span>
        <span className="size-2 bg-subtle transition-colors group-hover:bg-accent" />
      </div>
      <h3 className="mb-4 font-display text-2xl font-bold text-foreground transition-colors group-hover:text-accent">
        {title}
      </h3>
      <p className="mb-8 text-muted">{blurb}</p>
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
        <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground transition-colors group-hover:text-accent">
          {cta} <span className="arrow-shift inline-block">→</span>
        </span>
      </div>
    </Link>
  );
}
