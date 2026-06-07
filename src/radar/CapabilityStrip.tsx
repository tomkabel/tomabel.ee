import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n';
import { capabilityAxes } from './capability-data';

const RING_R = 18;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;

export default function CapabilityStrip() {
  const { language } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const stripRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      setVisible(true);
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, []);

  const scrollToAxis = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAxisActivate = (id: string, index: number) => {
    setActiveIndex(index);
    setTimeout(() => scrollToAxis(id), 60);
  };

  const axes = capabilityAxes;
  const heading = language === 'et' ? 'Võimekused' : 'Capabilities';
  const subheading = language === 'et'
    ? 'Neli valdkonda. Vali, et sukelduda.'
    : 'Four domains. Select to dive deeper.';

  return (
    <section
      id="capability-strip"
      ref={stripRef}
      className="py-20 md:py-28 bg-radar-bg overflow-hidden"
    >
      <div className="container-custom">
        {/* Header — left aligned with accent line */}
        <div
          className="mb-12 md:mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: visible
              ? 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 100ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 100ms'
              : 'none',
          }}
        >
          <div className="w-16 h-px bg-radar-accent/50 mb-5" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-radar-text-primary tracking-tight mb-2">
            {heading}
          </h2>
          <p className="text-radar-text-muted text-sm md:text-base max-w-md">
            {subheading}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {axes.map((axis, i) => {
            const isActive = activeIndex === i;
            const staggerDelay = i * 80;
            const score = Math.round(axis.value * 100);
            const dashOffset = CIRCUMFERENCE * (1 - axis.value);

            return (
              <button
                key={axis.id}
                onClick={() => {
                  handleAxisActivate(axis.id, i);
                }}
                className={`
                  group relative flex flex-col text-center items-center gap-4 p-5
                  rounded-2xl border
                  transition-all duration-300
                  focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-2
                  active:scale-[0.98]
                  ${isActive
                    ? 'border-radar-signal/40 shadow-[inset_0_0_30px_rgba(0,212,255,0.03),0_0_20px_rgba(0,212,255,0.04)]'
                    : 'border-white/[0.06] hover:border-radar-signal/20 hover:-translate-y-[2px]'
                  }
                `}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(24px) scale(0.96)',
                  transition: visible
                    ? `opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}ms, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}ms, border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease`
                    : 'none',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(0,212,255,0.07) 0%, rgba(0,212,255,0.02) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.004) 100%)',
                  boxShadow: isActive
                    ? 'inset 0 1px 0 rgba(0,212,255,0.12)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              >
                {/* Ring gauge */}
                <div className="relative w-12 h-12 shrink-0">
                  <svg
                    viewBox="0 0 44 44"
                    className="w-full h-full -rotate-90"
                    aria-hidden="true"
                  >
                    <circle
                      cx="22" cy="22" r={RING_R}
                      fill="none"
                      stroke="rgba(26,26,46,0.5)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="22" cy="22" r={RING_R}
                      fill="none"
                      stroke="#00D4FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className={visible ? 'animate-ring-breathe' : ''}
                      style={{
                        strokeDasharray: CIRCUMFERENCE,
                        strokeDashoffset: visible ? dashOffset : CIRCUMFERENCE,
                        transition: visible
                          ? `stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay + 200}ms`
                          : 'none',
                        animationDelay: visible
                          ? `${staggerDelay + 1200}ms`
                          : '0ms',
                      }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-semibold text-radar-signal/70">
                    {score}
                  </span>
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <span className="font-display text-sm font-semibold text-radar-text-primary group-hover:text-radar-signal transition-colors leading-snug block">
                    {axis.label[language]}
                  </span>
                  <p className="text-[13px] text-radar-text-muted mt-1 leading-relaxed line-clamp-2">
                    {axis.description[language]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
