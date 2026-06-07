import { useEffect, useRef, useState } from 'react';
import { FileText } from 'lucide-react';
import { useTranslation } from '../i18n';
import { researchPapers } from './research-data';

export default function ResearchSection() {
  const { t, language } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      setRevealed(true);
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-radar-signal bg-radar-signal/10';
      case 'draft': return 'text-radar-accent bg-radar-accent/10';
      default: return 'text-radar-text-muted bg-radar-text-muted/10';
    }
  };

  return (
    <section id="research" ref={sectionRef} className="py-20 md:py-28 bg-radar-bg">
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(16px)',
            transition: revealed ? 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 50ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 50ms' : 'none',
          }}
        >
          <div className="w-12 h-px bg-radar-accent/60 mb-4" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-radar-text-primary mb-2">
            {t.research.title}
          </h2>
          <p className="text-radar-text-muted text-sm mb-10 max-w-xl">
            {t.research.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {researchPapers.map((paper, i) => {
            const staggerDelay = i * 80 + 100;
            return (
              <article
                key={paper.id}
                className={`rounded-xl border overflow-hidden transition-all duration-500 ${
                  paper.featured
                    ? 'border-radar-accent/30 bg-radar-accent/5'
                    : 'border-radar-grid bg-radar-surface'
                } hover:border-radar-signal/30`}
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
                  transition: revealed
                    ? `opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}ms, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}ms, border-color 0.5s ease`
                    : 'none',
                }}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      paper.featured ? 'bg-radar-accent/10' : 'bg-radar-grid/50'
                    }`}>
                      <FileText className={`w-5 h-5 ${
                        paper.featured ? 'text-radar-accent' : 'text-radar-text-muted'
                      }`} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-semibold text-radar-text-primary mb-1.5">
                        {paper.title}
                      </h3>
                      <p className="text-radar-text-muted text-sm leading-relaxed">
                        {paper.abstract[language]}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className={`px-2 py-0.5 rounded ${statusColor(paper.status)}`}>
                      {paper.status}
                    </span>
                    <span className="text-radar-text-muted">{paper.date}</span>
                    {paper.tags.map((tag) => (
                      <span key={tag} className="text-radar-text-muted">#{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
