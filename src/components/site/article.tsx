import type { ReactNode } from 'react';

/**
 * Editorial building blocks for long-form reader pages: callouts, pull quotes,
 * monospace code/telemetry blocks, and protocol tables. Dependency-free — the
 * "syntax highlighting" is a small comment-dimming pass, not a tokenizer.
 */

type Tone = 'accent' | 'warning';

const toneRing: Record<Tone, string> = {
  accent: 'border-l-accent/70',
  warning: 'border-l-warning/70',
};
const toneText: Record<Tone, string> = {
  accent: 'text-accent',
  warning: 'text-warning',
};

// A bordered aside for axioms, notes, and key takeaways.
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
    <aside className={`my-8 rounded-lg border border-l-2 border-border-strong ${toneRing[tone]} bg-surface/70 p-6`}>
      <p className={`mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] ${toneText[tone]}`}>
        {label}
      </p>
      <div className="space-y-3 text-base leading-relaxed text-muted">{children}</div>
    </aside>
  );
}

// A large editorial pull quote to break up dense prose.
export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className="my-12 border-l-2 border-accent/60 pl-6 md:pl-8">
      <blockquote className="font-serif text-2xl font-medium leading-snug text-foreground md:text-3xl">
        {children}
      </blockquote>
      {cite ? (
        <figcaption className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
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
    <figure className="my-8 overflow-hidden rounded-lg border border-border-strong bg-[#0b0d12]">
      {(title || lang) && (
        <figcaption className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>{title}</span>
          {lang ? <span className="text-accent">{lang}</span> : null}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
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
      <div className="overflow-x-auto rounded-lg border border-border-strong">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c}
                  className="border-b border-border-strong px-4 py-3 text-left font-mono text-[10px] font-bold uppercase tracking-widest text-accent"
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
        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
