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
      <p className="label mb-4 text-muted-foreground">{label}</p>
      <h1 className="font-display text-5xl text-foreground">{title}</h1>
      {intro ? <p className="prose-measure mt-6 text-lg text-muted">{intro}</p> : null}
    </div>
  );
}
