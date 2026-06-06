import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n';
import { capabilityAxes } from './capability-data';

export default function CapabilityStrip() {
  const { t, language } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const stripRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return () => {};
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px' },
    );
    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      setVisible(true);
      observer.disconnect();
    }

    return () => { observer.disconnect(); };
  }, []);

  const scrollToAxis = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="capability-strip"
      ref={stripRef}
      className="py-16 md:py-20 bg-radar-surface border-t border-radar-grid overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div
          className="mb-8 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: visible ? 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          }}
        >
          <h2 className="font-display text-xl md:text-2xl font-bold text-radar-text-primary mb-2">
            {language === 'et' ? 'Võimekused' : 'Capabilities'}
          </h2>
          <p className="text-radar-text-muted text-sm">
            {language === 'et' ? 'Kuus valdkonda. Kliki, et sukelduda.' : 'Six domains. Click to dive in.'}
          </p>
        </div>

        {/* Horizontal strip — wraps on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {capabilityAxes.map((axis, i) => {
            const isActive = activeIndex === i;
            const staggerDelay = i * 60;
            return (
              <button
                key={axis.id}
                onClick={() => { setActiveIndex(i); scrollToAxis(axis.id); }}
                className={`group relative flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all duration-300 min-h-[100px] focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-2 ${
                  isActive
                    ? 'border-radar-signal/40 bg-radar-signal/[0.06]'
                    : 'border-radar-grid/60 bg-radar-surface/50 hover:border-radar-signal/20 hover:bg-radar-signal/[0.03]'
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transition: visible
                    ? `opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}ms, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}ms, border-color 0.3s ease, background-color 0.3s ease`
                    : 'none',
                }}
              >
                {/* Score ring */}
                <div className="relative w-10 h-10 shrink-0">
                  <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90" aria-hidden="true">
                    <circle
                      cx="20" cy="20" r="16"
                      fill="none"
                      stroke="#1a1a2e"
                      strokeWidth="3"
                    />
                    <circle
                      cx="20" cy="20" r="16"
                      fill="none"
                      stroke="#00D4FF"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${axis.value * 100.5} 100.5`}
                      style={{
                        transition: visible
                          ? `stroke-dasharray 1s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay + 200}ms`
                          : 'none',
                      }}
                    />
                  </svg>
                </div>
                <span className="font-display text-xs font-semibold text-radar-text-primary group-hover:text-radar-signal transition-colors leading-tight">
                  {axis.label[language]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
