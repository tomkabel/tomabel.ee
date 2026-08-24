import type { ReactNode } from 'react';

export default function SectionHeader({
  label,
  title,
  intro,
}: {
  // `index` is accepted for backward compatibility but no longer rendered —
  // numeric section IDs added clutter and broke down on sub-pages.
  index?: string;
  label: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
        <span aria-hidden className="h-px w-8 bg-accent/60" />
        <span>{label}</span>
      </p>
      <h1 className="font-display text-4xl font-bold leading-[1.1] text-foreground md:text-5xl">
        {title}
      </h1>
      {intro ? (
        <p className="prose-measure mt-6 text-lg text-muted">{intro}</p>
      ) : null}
    </div>
  );
}
