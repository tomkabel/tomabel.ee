import type { ReactNode } from 'react';

export default function SectionHeader({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
        [{index}] {label}
      </p>
      <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-6 text-lg leading-relaxed text-muted">{intro}</p>
      ) : null}
    </div>
  );
}
