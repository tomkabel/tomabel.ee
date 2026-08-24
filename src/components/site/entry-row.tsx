import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';

export type EntryRowProps = {
  title: { en: string; et: string };
  blurb?: { en: string; et: string } | undefined;
  type: { en: string; et: string };
  meta?: { en: string; et: string } | undefined;
  tags?: string[] | undefined;
  href?: string | undefined;
  // external → open in a new tab and render the ↗ affordance instead of →
  external?: boolean | undefined;
};

// One row for every editorial or systems index entry. No ticket-code gutter:
// the type + meta line carries the classification, the footer carries tags and
// the directional affordance. Internal links use →, external ↗.
export default function EntryRow({
  title,
  blurb,
  type,
  meta,
  tags,
  href,
  external,
}: EntryRowProps) {
  const { language } = useTranslation();

  const arrow = external ? '↗' : '→';

  const content = (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span className="text-accent transition-colors">{type[language]}</span>
        {meta ? (
          <>
            <span aria-hidden className="text-subtle">·</span>
            <span>{meta[language]}</span>
          </>
        ) : null}
      </div>

      <h3 className="mt-3 font-display text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
        {title[language]}
        {href ? (
          <span className="ml-2 inline-block font-mono text-base text-subtle opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            {arrow}
          </span>
        ) : null}
      </h3>

      {blurb ? <p className="prose-measure mt-3 text-muted">{blurb[language]}</p> : null}

      {tags && tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );

  const inner = href ? (
    external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    ) : (
      <Link to={href} className="block">
        {content}
      </Link>
    )
  ) : (
    <div>{content}</div>
  );

  return (
    <article className="group relative border-b border-border py-8 transition-colors hover:bg-white/[0.02]">
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
      />
      <div className="mx-auto max-w-6xl px-6">{inner}</div>
    </article>
  );
}
