import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * Editorial building blocks for long-form reader pages: the masthead, callouts,
 * pull quotes, monospace code/telemetry blocks, and protocol tables.
 * Dependency-free — the "syntax highlighting" is a small comment-dimming pass,
 * not a tokenizer.
 */

// The masthead every disclosure opens with: a sunken band one step below the
// canvas, the title in the display serif, and a ruled dateline instead of chips.
export function ArticleHeader({
  backTo,
  back,
  kicker,
  title,
  standfirst,
  meta,
}: {
  backTo: string;
  back: ReactNode;
  kicker: ReactNode;
  title: ReactNode;
  standfirst: ReactNode;
  meta: ReactNode[];
}) {
  return (
    <header className="border-b border-border bg-sunken px-6 pb-section-tight pt-section-tight">
      <div className="mx-auto max-w-4xl">
        <Link to={backTo} className="group mb-10 inline-flex min-h-11 font-mono text-sm items-center gap-2 text-muted-foreground transition-colors hover:text-accent">
          <span className="link-draw">{back}</span>
        </Link>
        <p className="label mb-5 font-bold text-accent">{kicker}</p>
        <h1 className="font-display text-5xl text-foreground">{title}</h1>
        <p className="prose-measure mt-8 text-lg text-muted">{standfirst}</p>
        <ul className="label mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-5 text-muted-foreground">
          {meta.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
    </header>
  );
}

type Tone = 'accent' | 'warning';

const toneText: Record<Tone, string> = {
  accent: 'text-accent',
  warning: 'text-warning',
};

// A tonal aside for axioms, notes, and key takeaways. It sits one step up the
// surface ladder; only the label carries the tone colour, no side stripe.
export function Callout({
  label,
  tone = 'accent',
  children,
}: {
  label: string;
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <aside className="my-8 rounded-figure bg-surface-2 p-6 ring-1 ring-inset ring-border">
      <p className={`label mb-3 font-bold ${toneText[tone]}`}>
        {label}
      </p>
      <div className="space-y-3 text-base leading-relaxed text-muted">{children}</div>
    </aside>
  );
}

// A large editorial pull quote to break up dense prose.
export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className="my-12 border-t border-border-strong pt-8">
      <blockquote className="font-serif text-3xl font-medium leading-snug text-foreground">
        {children}
      </blockquote>
      {cite ? (
        <figcaption className="label mt-4 text-muted-foreground">
          {cite}
        </figcaption>
      ) : null}
    </figure>
  );
}

// Split a line into a code part and a trailing comment part (; // #).
function splitComment(line: string): [string, string | null] {
  const m = line.match(/(\s*(?:;|\/\/|#).*)$/);
  if (!m || m.index == null) return [line, null];
  return [line.slice(0, m.index), line.slice(m.index)];
}

// A monospace code / telemetry block with a header and dimmed comments.
export function CodeBlock({
  title,
  lang,
  lines,
}: {
  title?: string;
  lang?: string;
  lines: string[];
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-figure border border-border-strong bg-sunken">
      {(title || lang) && (
        <figcaption className="flex items-center justify-between border-b border-border px-4 py-2 label text-muted-foreground">
          <span>{title}</span>
          {lang ? <span className="text-accent">{lang}</span> : null}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono">
          {lines.map((line, i) => {
            const [code, comment] = splitComment(line);
            return (
              <span key={i} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="select-none text-right text-subtle">{i + 1}</span>
                <span className="whitespace-pre text-foreground/85">
                  {code}
                  {comment ? <span className="text-subtle">{comment}</span> : null}
                </span>
              </span>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}

// A structured protocol / sequence table.
export function ProtocolTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: ReactNode[][];
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-figure border border-border-strong">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c}
                  className="border-b border-border-strong px-4 py-3 text-left label font-bold text-accent"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 align-top leading-relaxed text-muted">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? (
        <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
