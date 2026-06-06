import { useEffect, useRef } from 'react';
import { FileText } from 'lucide-react';
import { useTranslation } from '../i18n';
import { researchPapers } from './research-data';
import { onScrollFrame } from '../lib/scroll';

export default function ResearchSection() {
  const { t, language } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let rafId: number;
    function update() {
      const rect = el!.getBoundingClientRect();
      const wh = window.innerHeight;
      const scrollTop = window.scrollY;
      const progress = Math.max(0, Math.min(1, (scrollTop + wh - rect.top) / (rect.height + wh)));

      if (fillRef.current) {
        fillRef.current.style.height = `${progress * 100}%`;
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const threshold = i / (researchPapers.length + 1);
        const dotThreshold = (i + 0.5) / (researchPapers.length + 1);
        card.style.opacity = progress > threshold ? '1' : '0.4';
        card.style.transform = progress > threshold ? 'translateX(0)' : 'translateX(-8px)';
        const dot = card.querySelector<HTMLElement>('[data-timeline-dot]');
        if (dot) {
          const active = progress > dotThreshold;
          dot.style.borderColor = active ? '#00D4FF' : '#1a1a2e';
          dot.style.background = active ? '#00D4FF' : '#020203';
          dot.style.boxShadow = active ? '0 0 8px rgba(0, 212, 255, 0.4)' : 'none';
        }
      });
    }

    update();

    return onScrollFrame(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    });
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
        <h2 className="font-display text-2xl md:text-3xl font-bold text-radar-text-primary mb-2">
          {t.research.title}
        </h2>
        <p className="text-radar-text-muted text-sm mb-10 max-w-xl">
          {t.research.description}
        </p>

        <div className="relative">
          {/* Timeline track */}
          <div className="absolute left-[13px] top-2 bottom-2 w-[2px] bg-radar-grid" aria-hidden="true" />

          {/* Timeline progress fill */}
          <div
            ref={fillRef}
            className="absolute left-[13px] top-2 w-[2px] bg-gradient-to-b from-radar-signal to-radar-accent"
            aria-hidden="true"
          />

          <div className="space-y-4">
            {researchPapers.map((paper, i) => (
              <article
                key={paper.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`relative pl-10 p-6 rounded-xl border ${
                  paper.featured
                    ? 'border-radar-accent/30 bg-radar-accent/5'
                    : 'border-radar-grid bg-radar-surface'}
                }`}
                style={{ opacity: 0.4, transform: 'translateX(-8px)', transition: 'opacity 0.3s ease-out, transform 0.3s ease-out' }}
              >
                {/* Timeline dot */}
                <div
                  data-timeline-dot
                  className="absolute left-[7px] top-[28px] w-[14px] h-[14px] rounded-full border-2"
                  aria-hidden="true"
                />

                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg shrink-0 ${
                    paper.featured ? 'bg-radar-accent/10' : 'bg-radar-grid/50'
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      paper.featured ? 'text-radar-accent' : 'text-radar-text-muted'
                    }`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold text-radar-text-primary mb-1">
                      {paper.title}
                    </h3>
                    <p className="text-radar-text-muted text-sm mb-3 leading-relaxed">
                      {paper.abstract[language]}
                    </p>
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
