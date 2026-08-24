import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

// Tom's own passive-fingerprinting collector. Same operator as tomabel.ee.
const ENDPOINT = 'https://proksimity.proksiabel.ee/connection.json';

type Connection = {
  live?: boolean;
  ja4?: string;
  geo?: { city?: string; country?: string; cc?: string; isp?: string };
  tls?: { version?: string; alpn?: string; negotiated?: string };
};

// The endpoint is Tom's own, but the response is still untrusted input: never
// hand a non-object (or null) to Fields, which reads nested keys off it.
function isConnection(v: unknown): v is Connection {
  return typeof v === 'object' && v !== null;
}

type State =
  | { kind: 'loading' }
  | { kind: 'live'; data: Connection }
  | { kind: 'unavailable' };

// Opt-in slide-over. Fetches ONLY on open (never on page load), renders only
// real fields, and degrades to an honest "unreachable" line — never fake values.
export default function Telemetry({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const [state, setState] = useState<State>({ kind: 'loading' });
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    (async () => {
      setState({ kind: 'loading' });
      try {
        const res = await fetch(ENDPOINT, { signal: controller.signal, cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: unknown = await res.json();
        if (!isConnection(data)) throw new Error('malformed payload');
        setState({ kind: 'live', data });
      } catch {
        if (!controller.signal.aborted) setState({ kind: 'unavailable' });
      }
    })();
    return () => controller.abort();
  }, [open]);

  // Focus management: on open, remember what was focused (the nav trigger),
  // move focus into the panel, trap Tab/Shift+Tab within it, and restore focus
  // to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      trigger?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={t.telemetry.title}>
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-border-strong bg-surface shadow-elevated outline-none"
      >
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">{t.telemetry.title}</h2>
            <p className="mt-1 text-xs text-muted">{t.telemetry.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label={t.telemetry.close}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {state.kind === 'loading' ? (
            <p className="font-mono text-sm text-muted-foreground">{t.telemetry.loading}</p>
          ) : state.kind === 'unavailable' ? (
            <p className="font-mono text-sm text-muted-foreground">{t.telemetry.unavailable}</p>
          ) : (
            <Fields t={t} data={state.data} />
          )}
        </div>

        <p className="border-t border-border px-6 py-4 text-[11px] leading-relaxed text-subtle">
          {t.telemetry.footer}
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | undefined }) {
  if (!value) return null;
  return (
    <div className="border-b border-border py-3">
      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-all font-mono text-sm text-foreground">{value}</dd>
    </div>
  );
}

function Fields({ t, data }: { t: ReturnType<typeof useTranslation>['t']; data: Connection }) {
  const geo = data.geo
    ? [data.geo.city, data.geo.cc, data.geo.isp].filter(Boolean).join(' · ')
    : undefined;
  return (
    <dl>
      <Row label={t.telemetry.ja4} value={data.ja4} />
      <Row label={t.telemetry.tlsVersion} value={data.tls?.version} />
      <Row label={t.telemetry.alpn} value={data.tls?.alpn} />
      <Row label={t.telemetry.cipher} value={data.tls?.negotiated} />
      <Row label={t.telemetry.geo} value={geo} />
    </dl>
  );
}
