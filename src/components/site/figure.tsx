import { useId, type ReactNode } from 'react';

/**
 * The figure system. Flat 2D schematics, hand-placed, static SVG — they render
 * in the prerendered HTML and read without JS. Colour carries meaning only:
 * amber = attacker / failing path, emerald = verified path, grey = neutral.
 */

export type Kind = 'neutral' | 'attack' | 'verified';

const stroke: Record<Kind, string> = {
  neutral: 'stroke-muted-foreground',
  attack: 'stroke-warning',
  verified: 'stroke-accent',
};
const fill: Record<Kind, string> = {
  neutral: 'fill-muted',
  attack: 'fill-warning',
  verified: 'fill-accent',
};
const KINDS: Kind[] = ['neutral', 'attack', 'verified'];

// One arrowhead marker per kind, ids scoped per SVG so many figures can share a page.
function Markers({ id }: { id: string }) {
  return (
    <defs>
      {KINDS.map((k) => (
        <marker key={k} id={`${id}-${k}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 8 4 0 8z" className={fill[k]} />
        </marker>
      ))}
    </defs>
  );
}

/** Card frame + numbered caption. `title` is the in-card mono label. */
export function Figure({
  title,
  caption,
  n,
  children,
  className = '',
}: {
  title?: ReactNode;
  caption?: ReactNode;
  n?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`my-10 ${className}`}>
      <div className="overflow-hidden rounded-card border border-border bg-surface">
        {title ? <p className="label border-b border-border px-5 py-3 text-muted-foreground">{title}</p> : null}
        <div className="p-4 sm:p-6">{children}</div>
      </div>
      {caption ? (
        <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
          {n ? <span className="text-foreground">Fig. {n}. </span> : null}
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

// ─── Sequence diagram ───────────────────────────────────────────────────────

export type Message = { from: number; to: number; label: string; kind?: Kind };

export function SequenceDiagram({ lanes, messages, desc, width = 640 }: { lanes: string[]; messages: Message[]; desc: string; width?: number }) {
  const id = useId().replace(/:/g, '');
  const W = width;
  const pad = W > 500 ? 70 : 50;
  const step = (W - pad * 2) / Math.max(lanes.length - 1, 1);
  const x = (i: number) => pad + i * step;
  const top = 44;
  const row = 40;
  const H = top + messages.length * row + 24;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${id}-d`} className="h-auto w-full" style={{ aspectRatio: `${W} / ${H}` }}>
      <desc id={`${id}-d`}>{desc}</desc>
      <Markers id={id} />
      {lanes.map((l, i) => (
        <g key={l}>
          <text x={x(i)} y={20} textAnchor="middle" className="fill-foreground font-mono text-[13px]">{l}</text>
          <line x1={x(i)} y1={30} x2={x(i)} y2={H - 8} className="stroke-border-strong" strokeWidth={1} />
        </g>
      ))}
      {messages.map((m, i) => {
        const k = m.kind ?? 'neutral';
        const y = top + i * row + 22;
        const x1 = x(m.from);
        const x2 = x(m.to);
        const dir = x2 > x1 ? 1 : -1;
        return (
          <g key={i}>
            <text x={(x1 + x2) / 2} y={y - 7} textAnchor="middle" className={`${fill[k]} font-mono text-[11px]`}>{m.label}</text>
            <line x1={x1 + dir * 4} y1={y} x2={x2 - dir * 4} y2={y} className={stroke[k]} strokeWidth={1.25} markerEnd={`url(#${id}-${k})`} />
          </g>
        );
      })}
    </svg>
  );
}

// ─── Flow graph ─────────────────────────────────────────────────────────────

export type Node = { id: string; x: number; y: number; label: string; w?: number; kind?: Kind };
export type Edge = { from: string; to: string; label?: string; kind?: Kind; dashed?: boolean };

const NODE_H = 30;

// Point where the segment from the box centre toward (tx, ty) leaves the box.
function exit(n: Node, tx: number, ty: number) {
  const w = (n.w ?? 110) / 2;
  const h = NODE_H / 2;
  const dx = tx - n.x;
  const dy = ty - n.y;
  const s = Math.min(dx ? w / Math.abs(dx) : Infinity, dy ? h / Math.abs(dy) : Infinity);
  return [n.x + dx * s, n.y + dy * s] as const;
}

/** Nodes are centre-positioned in viewBox units; layout is explicit, never automatic. */
export function FlowGraph({
  nodes,
  edges,
  width = 640,
  height,
  desc,
}: {
  nodes: Node[];
  edges: Edge[];
  width?: number;
  height: number;
  desc: string;
}) {
  const id = useId().replace(/:/g, '');
  const by = new Map(nodes.map((n) => [n.id, n]));
  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby={`${id}-d`} className="h-auto w-full" style={{ aspectRatio: `${width} / ${height}` }}>
      <desc id={`${id}-d`}>{desc}</desc>
      <Markers id={id} />
      {edges.map((e, i) => {
        const a = by.get(e.from);
        const b = by.get(e.to);
        if (!a || !b) return null;
        const k = e.kind ?? 'neutral';
        const [x1, y1] = exit(a, b.x, b.y);
        const [x2, y2] = exit(b, a.x, a.y);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} className={stroke[k]} strokeWidth={1.25} strokeDasharray={e.dashed ? '4 4' : undefined} markerEnd={`url(#${id}-${k})`} />
            {e.label ? (
              <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} textAnchor="middle" className={`${fill[k]} font-mono text-[11px]`}>{e.label}</text>
            ) : null}
          </g>
        );
      })}
      {nodes.map((n) => {
        const k = n.kind ?? 'neutral';
        const w = n.w ?? 110;
        return (
          <g key={n.id}>
            <rect x={n.x - w / 2} y={n.y - NODE_H / 2} width={w} height={NODE_H} rx={3} className={`fill-sunken ${stroke[k]}`} strokeWidth={1} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" className={`${k === 'neutral' ? 'fill-foreground' : fill[k]} font-mono text-[11px]`}>{n.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Split figure ───────────────────────────────────────────────────────────

/** Two stacked panes: what the system hopes (muted) over what it proves (emerald). */
export function SplitFigure({
  before,
  after,
  beforeLabel,
  afterLabel,
}: {
  before: ReactNode;
  after: ReactNode;
  beforeLabel: string;
  afterLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface">
      <div className="border-b border-border p-5 sm:p-6">
        <p className="label mb-4 text-muted-foreground">{beforeLabel}</p>
        {before}
      </div>
      <div className="p-5 ring-1 ring-inset ring-accent/40 sm:p-6">
        <p className="label mb-4 text-accent">{afterLabel}</p>
        {after}
      </div>
    </div>
  );
}
