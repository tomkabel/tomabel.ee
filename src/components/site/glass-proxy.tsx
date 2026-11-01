import { useTranslation } from '../../i18n/LanguageContext';
import { home } from '../../content/site';

// Hero schematic: chaotic request vectors (left) hit a glass proxy membrane;
// three are dropped there, the rest leave as an ordered grid of verified
// sessions (right). Geometry is generated once at module load from a fixed
// seed, so the prerendered SVG and the hydrated one are byte-identical.

const PANE_X = 280; // membrane's ingress face
const EXIT_X = 324; // membrane's egress face
const LANES = [100, 140, 180, 220, 260, 300];
const GRID_X = [380, 440, 500, 560];
const DROPPED = new Set([2, 7, 11]);

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = rng(17017826);
const between = (a: number, b: number) => Math.round(a + rand() * (b - a));

const vectors = Array.from({ length: 14 }, (_, i) => {
  const hit = 84 + i * 18; // contact point on the membrane, evenly spread
  const lane = LANES[Math.min(LANES.length - 1, Math.floor((i / 14) * LANES.length))]!;
  const d = `M${between(0, 24)} ${between(12, 388)} L${between(70, 110)} ${between(20, 380)} L${between(170, 220)} ${between(50, 350)} L${PANE_X} ${hit}`;
  return { d, hit, lane, dropped: DROPPED.has(i), delay: (i * 0.73) % 6 };
});

export default function GlassProxy() {
  const { language } = useTranslation();
  const s = home.schematic;

  return (
    <figure className="glass rounded-card p-5 sm:p-6">
      {/* Side labels need the width; below sm only the membrane is named. */}
      <div className="label grid grid-cols-1 gap-2 text-subtle sm:grid-cols-3">
        <span className="hidden sm:block">{s.ingress[language]}</span>
        <span className="text-center text-silver">{s.membrane[language]}</span>
        <span className="hidden text-right sm:block">{s.egress[language]}</span>
      </div>

      <svg viewBox="0 0 600 400" role="img" aria-label={s.label[language]} className="mt-4 block h-auto w-full">
        <defs>
          <linearGradient id="gp-pane" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0.14" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.04" />
            <stop offset="1" stopColor="white" stopOpacity="0.09" />
          </linearGradient>
        </defs>

        {/* Egress grid: the ordered side. */}
        {GRID_X.map((x) => (
          <line key={x} x1={x} y1={LANES[0]} x2={x} y2={LANES[LANES.length - 1]} className="stroke-foreground/10" strokeWidth="1" />
        ))}
        {LANES.map((y, i) => (
          <g key={y}>
            <line x1={EXIT_X} y1={y} x2="600" y2={y} className="stroke-accent/35" strokeWidth="1" />
            <line x1={EXIT_X} y1={y} x2="600" y2={y} pathLength={100} className="beam stroke-accent" strokeWidth="1.5" style={{ animationDelay: `${i * 0.9}s` }} />
            {GRID_X.map((x, j) => (
              <rect key={x} x={x - 2.5} y={y - 2.5} width="5" height="5" className={(i + j) % 3 === 0 ? 'fill-accent' : 'fill-overlay'} />
            ))}
          </g>
        ))}

        {/* Ingress: unstructured vectors. */}
        {vectors.map((v, i) => (
          <g key={i}>
            <path d={v.d} fill="none" className={v.dropped ? 'stroke-muted-foreground/25' : 'stroke-muted-foreground/40'} strokeWidth="1" strokeLinejoin="round" />
            {!v.dropped && (
              <path d={v.d} fill="none" pathLength={100} className="beam stroke-silver" strokeWidth="1.25" style={{ animationDelay: `${v.delay}s` }} />
            )}
          </g>
        ))}

        {/* The membrane. Passing vectors refract onto a lane inside the glass. */}
        <polygon points={`${PANE_X},52 ${EXIT_X - 8},32 ${EXIT_X - 8},352 ${PANE_X},372`} fill="url(#gp-pane)" className="stroke-foreground/20" strokeWidth="1" />
        <polygon points={`${EXIT_X - 8},32 ${EXIT_X},36 ${EXIT_X},356 ${EXIT_X - 8},352`} className="fill-foreground/5 stroke-foreground/10" strokeWidth="1" />
        <line x1={PANE_X} y1="52" x2={PANE_X} y2="372" className="stroke-accent/60" strokeWidth="1" />
        {vectors.map((v, i) =>
          v.dropped ? (
            <path key={i} d={`M${PANE_X - 9} ${v.hit - 4} l8 8 m0 -8 l-8 8`} className="stroke-muted-foreground" strokeWidth="1.25" />
          ) : (
            <line key={i} x1={PANE_X} y1={v.hit} x2={EXIT_X} y2={v.lane} className="stroke-accent/50" strokeWidth="1" />
          ),
        )}
      </svg>

      <ul className="mt-5 grid gap-3 border-t border-border pt-4 sm:grid-cols-3">
        {s.checks.map((c) => (
          <li key={c.k} className="grid gap-1">
            <span className="label text-accent">{c.k}</span>
            <span className="text-sm text-muted-foreground">{c.v[language]}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
