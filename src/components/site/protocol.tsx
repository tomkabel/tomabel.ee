import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent as ReactPointerEvent } from 'react';
import { useObservedConnection } from './telemetry';

// Homepage instrumentation: the ambient telemetry layer behind the hero, the
// fault-line divider, and the line schematics on the featured cards. All of it
// is decorative (aria-hidden, no pointer targets) and none of it fabricates
// visitor data: client values are read from this browser and never leave it,
// and the JA4 appears only after the visitor opts in through the inspector.

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

type Claims = { ua: string; renderer: string; locale: string; hardware: string; webdriver: string };

// What the browser says about itself. Read once, and only at xl+ where the
// layer is shown, so smaller screens never pay for the WebGL probe.
let claims: Claims | undefined;
function readClaims(): Claims | undefined {
  if (claims || !matchMedia('(min-width: 1280px)').matches) return claims;
  const gl = document.createElement('canvas').getContext('webgl');
  const debug = gl?.getExtension('WEBGL_debug_renderer_info');
  const renderer = gl ? String(gl.getParameter(debug ? debug.UNMASKED_RENDERER_WEBGL : gl.RENDERER)) : 'UNAVAILABLE';
  gl?.getExtension('WEBGL_lose_context')?.loseContext();
  claims = {
    ua: navigator.userAgent,
    renderer,
    locale: `${navigator.language} · ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
    hardware: `${navigator.hardwareConcurrency || '?'} cores · dpr ${devicePixelRatio}`,
    webdriver: String(navigator.webdriver),
  };
  return claims;
}
const noSubscribe = () => () => {};

export function TelemetryLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const connection = useObservedConnection();
  // undefined on the server and during hydration, so the prerendered HTML
  // never depends on the browser.
  const client = useSyncExternalStore(noSubscribe, readClaims, () => undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.offsetParent === null || reducedMotion()) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--px', ((e.clientX / innerWidth) * 2 - 1).toFixed(3));
        el.style.setProperty('--py', ((e.clientY / innerHeight) * 2 - 1).toFixed(3));
      });
    };
    addEventListener('pointermove', onMove, { passive: true });
    return () => {
      removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const pending = 'PENDING';
  const rows: [string, string][] = [
    ['TLS_JA4_FINGERPRINT', connection?.ja4 ?? 'UNOBSERVED // INSPECT'],
    ...(connection?.tls?.version ? [['TLS_VERSION', `${connection.tls.version} · ${connection.tls.alpn ?? '?'}`] as [string, string]] : []),
    ['UA_CLAIM', client?.ua ?? pending],
    ['WEBGL_RENDERER', client?.renderer ?? pending],
    ['CLIENT_ENTROPY_STATE', 'UNVERIFIED_CLAIM // WEBGL_VENDOR_MASK'],
    ['LOCALE_CLAIM', client?.locale ?? pending],
    ['HARDWARE_CLAIM', client?.hardware ?? pending],
    ['NAVIGATOR_WEBDRIVER', client?.webdriver ?? pending],
    // Nothing here tests token binding, so no result is claimed.
    ['SESSION_BINDING', 'UNOBSERVED // NOT TESTED'],
  ];

  return (
    <div ref={ref} aria-hidden className="telemetry-layer -z-10 hidden content-start gap-8 pr-6 pt-28 xl:grid 2xl:pr-12">
      <Handshake />
      <dl className="grid gap-1.5">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[13rem_1fr] gap-3">
            <dt className="label">{k}</dt>
            <dd className="truncate font-mono text-xs">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// An intercepted handshake: one ClientHello, split at the interception point
// into what the client claims and what the wire shows.
function Handshake() {
  return (
    <svg width="448" height="196" viewBox="0 0 448 196" fill="none" stroke="currentColor" strokeWidth="0.5">
      <rect x="0" y="94" width="8" height="8" />
      <path d="M8 98H150" />
      {[40, 72, 104, 136].map((x) => (
        <path key={x} d={`M${x} 94V102`} />
      ))}
      <circle cx="160" cy="98" r="10" strokeDasharray="2 3" />
      <circle cx="160" cy="98" r="3" className="fill-accent" stroke="none" />
      <path d="M168 93C220 66 260 34 448 34" />
      <path d="M168 103C220 130 260 162 448 162" strokeDasharray="1 2" />
      <path d="M440 44V152" strokeDasharray="2 4" />
      <g fill="currentColor" stroke="none" className="font-mono" fontSize="12" letterSpacing="0.08em">
        <text x="0" y="84">CLIENT_HELLO</text>
        <text x="160" y="127" textAnchor="middle">INTERCEPT</text>
        <text x="448" y="22" textAnchor="end">CLAIMED IDENTITY · L7 / UA / COOKIE</text>
        <text x="448" y="182" textAnchor="end">OBSERVED TELEMETRY · TLS / JA4 / TCP</text>
        <text x="430" y="102" textAnchor="end">Δ</text>
      </g>
    </svg>
  );
}

export function FaultLine() {
  const ref = useRef<HTMLDivElement>(null);
  const track = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    el.style.setProperty('--fx', Math.min(0.9, Math.max(0.1, (e.clientX - left) / width)).toFixed(3));
  };
  return (
    <div ref={ref} aria-hidden className="fault-line select-none" onPointerMove={track} onPointerLeave={() => ref.current?.style.removeProperty('--fx')}>
      <span className="label tag tag-claimed text-subtle">[ LAYER 7: CLAIMED ]</span>
      <span className="seg seg-claimed" />
      <span className="node" />
      <span className="seg seg-verified" />
      <span className="label tag tag-verified text-subtle">[ OPCODE / TLS: VERIFIED ]</span>
    </div>
  );
}

// ─── Featured-card schematics ───────────────────────────────────────────────
// Drawn 1:1 (width = viewBox) so their 12px labels really are 12px, and at
// most 72px tall so they fit the band above each card title.

const svgProps = { fill: 'none', stroke: 'currentColor', strokeWidth: 0.75 } as const;
const textProps = { fill: 'currentColor', stroke: 'none', fontSize: 12, className: 'font-mono' } as const;

// BotGuard: a VM dispatch control-flow graph with a crossing edge.
export function BytecodeGraph() {
  const nodes = [
    [24, 36, 'VM.0'],
    [86, 13, 'LOAD'],
    [86, 59, 'XOR'],
    [148, 13, 'JMP'],
    [148, 59, 'CALL'],
    [210, 36, 'RET'],
  ] as const;
  const edges = ['M46 32L64 17', 'M46 40L64 55', 'M108 13H126', 'M108 59H126', 'M108 55L126 17', 'M170 17L188 32', 'M170 55L188 40'];
  return (
    <svg width="234" height="72" viewBox="0 0 234 72" {...svgProps}>
      {edges.map((d) => (
        <path key={d} d={d} />
      ))}
      {nodes.map(([x, y, op]) => (
        <g key={op}>
          <rect x={x - 22} y={y - 9} width="44" height="18" />
          <text x={x} y={y + 4} textAnchor="middle" {...textProps}>
            {op}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Smart-ID: RP / SK / app lifelines and the approval step on the app, with
// an escalation path that reaches SK without going through it.
export function ApprovalSequence() {
  const lanes = [
    [16, 'RP'],
    [64, 'SK'],
    [110, 'APP'],
  ] as const;
  return (
    <svg width="132" height="72" viewBox="0 0 132 72" {...svgProps}>
      {lanes.map(([x, name]) => (
        <g key={name}>
          <text x={x} y="11" textAnchor="middle" {...textProps}>
            {name}
          </text>
          <path d={`M${x} 17V72`} strokeDasharray="1 3" />
        </g>
      ))}
      <path d="M16 25H62M58 22L62 25L58 28" />
      <path d="M64 33H108M104 30L108 33L104 36" />
      <rect x="104" y="39" width="12" height="12" />
      <path d="M110 59H66M70 56L66 59L70 62" />
      <path d="M16 44C36 44 50 56 62 66" strokeDasharray="3 2" className="stroke-accent" />
    </svg>
  );
}

// Sample strings in the public JA4 format (a_b_c), split into their three
// parts. Decorative: these are not the visitor's.
const ja4Stream = [
  't13d1516h2_8daaf6152771_e5627efa2ab1',
  't13d1715h2_5b57614c22b0_3d5424432f57',
  't13d1516h2_8daaf6152771_02713d6af862',
  'q13d0312h3_55b375c5d22e_06cda9e17597',
];

// fingerprintproxy: client → proxy → origin, over a cycling JA4 stream.
export function HashStream() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reducedMotion()) return;
    const id = setInterval(() => setI((n) => (n + 1) % ja4Stream.length), 1800);
    return () => clearInterval(id);
  }, []);
  const parts = ja4Stream[i]!.split('_');
  return (
    <svg width="232" height="72" viewBox="0 0 232 72" {...svgProps}>
      <circle cx="6" cy="12" r="5" />
      <path d="M11 12H84" />
      <rect x="84" y="2" width="64" height="20" />
      <path d="M148 12H220" />
      <rect x="220" y="6" width="12" height="12" />
      <text x="116" y="16" textAnchor="middle" {...textProps}>
        PROXY
      </text>
      <text x="0" y="40" {...textProps}>
        JA4
      </text>
      {parts.map((p, n) => (
        <text key={n} x="232" y={40 + n * 14} textAnchor="end" {...textProps} fillOpacity={1 - n * 0.25}>
          {p}
        </text>
      ))}
    </svg>
  );
}

// Zero-Trust Octagon: the eight axioms as vertices of an isometric octagon,
// an inner ring turning in its plane.
export function Octagon() {
  const cx = 72;
  const cy = 36;
  const angle = (k: number) => ((k * 45 - 67.5) * Math.PI) / 180;
  const ring = (r: number) =>
    Array.from({ length: 8 }, (_, k) => `${(r * Math.cos(angle(k))).toFixed(1)},${(r * Math.sin(angle(k))).toFixed(1)}`).join(' ');
  return (
    <svg width="144" height="72" viewBox="0 0 144 72" {...svgProps} strokeWidth={0.5}>
      <g transform={`translate(${cx} ${cy}) scale(1 0.5)`}>
        <polygon points={ring(46)} vectorEffect="non-scaling-stroke" />
        <polygon points={ring(26)} vectorEffect="non-scaling-stroke" style={{ animation: 'octagon-turn 60s linear infinite' }} />
        {Array.from({ length: 8 }, (_, k) => (
          <path
            key={k}
            d={`M0 0L${(46 * Math.cos(angle(k))).toFixed(1)} ${(46 * Math.sin(angle(k))).toFixed(1)}`}
            strokeDasharray="1 3"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      {Array.from({ length: 8 }, (_, k) => {
        const [x, y] = [cx + 46 * Math.cos(angle(k)), cy + 23 * Math.sin(angle(k))];
        const [lx, ly] = [cx + 60 * Math.cos(angle(k)), cy + 31 * Math.sin(angle(k))];
        return (
          <g key={k}>
            <circle cx={x} cy={y} r="1.5" fill="currentColor" />
            <text x={lx} y={ly + 4} textAnchor="middle" {...textProps}>
              A{k + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
