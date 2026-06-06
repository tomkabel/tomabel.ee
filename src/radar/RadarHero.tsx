import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { useTranslation } from '../i18n';
import RadarChart from './RadarChart';
import { capabilityAxes } from './capability-data';

const noMotion = { opacity: 1, transform: 'none', transition: 'none' } as const;

export default function RadarHero() {
  const { t, language } = useTranslation();
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), reduced ? 0 : 80);
    return () => clearTimeout(timer);
  }, [reduced]);

  const handleAxisFocus = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContent = () => {
    const el = document.getElementById('capability-strip');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const r = reduced || entered;
  const e = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const s = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
  const d = 'none';

  return (
    <section className="relative min-h-[90vh] flex items-center bg-radar-bg overflow-hidden">
      {/* Background atmosphere — subtle chart aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-radar-bg via-radar-surface-overlay to-radar-bg" />
      <div
        className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/4 rounded-full pointer-events-none"
        style={{
          opacity: r ? 0.06 : 0,
          background: 'radial-gradient(circle at center, rgba(0,212,255,0.3), transparent 70%)',
          filter: 'blur(60px)',
          transition: r ? 'opacity 1200ms ease-out 500ms' : d,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 items-center">
          {/* Left: Identity — the focal point */}
          <div>
            <p
              className="font-mono text-xs tracking-[0.12em] uppercase text-radar-signal mb-4"
              style={reduced ? noMotion : {
                opacity: r ? 1 : 0,
                transform: r ? 'translateY(0)' : 'translateY(12px)',
                transition: r ? `opacity 700ms ${e} 50ms, transform 700ms ${e} 50ms` : d,
              }}
            >
              ProksiAbel OÜ
            </p>
            <h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-radar-text-primary leading-[0.95] tracking-tight mb-8"
              style={reduced ? noMotion : {
                opacity: r ? 1 : 0,
                transform: r ? 'translateY(0)' : 'translateY(16px)',
                transition: r ? `opacity 700ms ${e} 150ms, transform 700ms ${e} 150ms` : d,
              }}
            >
              TOM KRISTIAN<br />ABEL
            </h1>
            <p
              className="text-radar-text-secondary text-base md:text-lg max-w-lg leading-relaxed mb-8"
              style={reduced ? noMotion : {
                opacity: r ? 1 : 0,
                transform: r ? 'translateY(0)' : 'translateY(12px)',
                transition: r ? `opacity 700ms ${e} 250ms, transform 700ms ${e} 250ms` : d,
              }}
            >
              {t.radarHero.subtitle}
            </p>
            <div
              className="flex items-center gap-4"
              style={reduced ? noMotion : {
                opacity: r ? 1 : 0,
                transform: r ? 'translateY(0)' : 'translateY(8px)',
                transition: r ? `opacity 700ms ${e} 350ms, transform 700ms ${e} 350ms` : d,
              }}
            >
              <span className="text-radar-text-muted text-xs font-mono">B2B Partnership</span>
              <span className="w-1 h-1 rounded-full bg-radar-text-muted/40" aria-hidden="true" />
              <span className="text-radar-text-muted text-xs font-mono">{t.radarHero.location || 'Tallinn, Estonia'}</span>
            </div>
          </div>

          {/* Right: Proof object — the radar chart, intentionally secondary */}
          <div
            className="relative flex items-center justify-center"
            style={reduced ? noMotion : {
              opacity: r ? 1 : 0,
              transform: r ? 'scale(1)' : 'scale(0.92)',
              transition: r ? `opacity 700ms ${s} 200ms, transform 700ms ${s} 200ms` : d,
            }}
          >
            <div className="w-full max-w-[360px] border border-radar-grid/40 rounded-2xl bg-radar-surface/30 backdrop-blur-sm p-4">
              <RadarChart
                axes={capabilityAxes}
                size={360}
                className="w-full h-auto"
                onAxisFocus={handleAxisFocus}
                language={language}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={reduced ? noMotion : {
          opacity: r ? 1 : 0,
          transition: r ? 'opacity 1000ms ease-out 1200ms' : d,
        }}
      >
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center gap-2 text-radar-text-muted hover:text-radar-signal transition-colors focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-2 rounded"
          aria-label={language === 'et' ? 'Keri sisuni' : 'Scroll to content'}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">{t.radarHero.scrollHint}</span>
          <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-radar-bg to-transparent pointer-events-none" />
    </section>
  );
}
