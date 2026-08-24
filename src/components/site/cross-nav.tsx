import { Link } from 'react-router-dom';

// A bottom-of-index pointer to the sibling editorial surface, stating the
// distinction (rigorous research vs. opinionated essays) so a visitor never has
// to guess which section a piece belongs in.
export default function CrossNav({
  to,
  label,
  blurb,
  cta,
}: {
  to: string;
  label: string;
  blurb: string;
  cta: string;
}) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to={to}
          className="group flex flex-col gap-4 rounded-lg border border-border-strong bg-surface p-8 shadow-elevated transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-2 hover:shadow-elevated-accent md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="mb-2 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-accent/60" />
              {label}
            </p>
            <p className="text-muted">{blurb}</p>
          </div>
          <span className="shrink-0 font-mono text-xs font-bold uppercase tracking-widest text-accent">
            {cta} <span className="arrow-shift inline-block">→</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
