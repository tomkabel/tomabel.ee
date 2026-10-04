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
          className="group grid gap-4 rounded-card border border-border-strong bg-surface p-8 shadow-elevated transition-[background-color,border-color,box-shadow] duration-base hover:border-accent/40 hover:bg-surface-2 hover:shadow-elevated-accent md:grid-cols-[1fr_auto] md:items-center md:gap-10"
        >
          <div className="max-w-2xl">
            <p className="label mb-2 text-muted-foreground">
              {label}
            </p>
            <p className="text-muted">{blurb}</p>
          </div>
          <span className="label font-bold text-accent">
            {cta} <span className="arrow-shift">→</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
