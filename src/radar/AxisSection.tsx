import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import GitHubIcon from '../components/GitHubIcon';
import { useTranslation } from '../i18n';
import { onScrollFrame } from '../lib/scroll';
import type { CapabilityAxis } from './types';

interface Props {
  axis: CapabilityAxis;
  index: number;
  variant?: 'grid' | 'featured';
}

export default function AxisSection({ axis, index, variant = 'grid' }: Props) {
  const { language } = useTranslation();
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReduced = mq.matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(section);

    function updateParallax() {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const raw = 1 - rect.top / windowHeight;
      const progress = Math.max(0, Math.min(1, raw));
      const opacity = Math.min(1, progress / 0.4);
      const ty = Math.max(0, 30 - (progress / 0.4) * 30);
      section.style.opacity = String(opacity);
      section.style.transform = `translateY(${ty}px)`;
    }

    if (isReduced) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    } else {
      updateParallax();
    }

    return onScrollFrame(() => {
      if (isReduced) return;
      updateParallax();
    });
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      id={axis.id}
      ref={sectionRef}
      className={`py-20 md:py-28 ${isEven ? 'bg-radar-surface' : 'bg-radar-bg'}`}
      style={{
        opacity: 0,
        transform: 'translateY(30px)',
        transition: revealed ? 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(16px)',
            transition: revealed ? 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 50ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 50ms' : 'none',
          }}
        >
          <div className="mb-8">
            <div className="w-12 h-px bg-radar-accent/60 mb-4" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-radar-text-primary mb-3">
              {axis.label[language]}
            </h2>
            <p className="text-radar-text-secondary text-sm leading-relaxed max-w-2xl">
              {axis.description[language]}
            </p>
          </div>
        </div>

        {/* Variant: Featured project first, then supporting card grid */}
        {variant === 'featured' ? (() => {
          const accentProject = axis.projects.find(p => p.id === axis.accentProject) || axis.projects[0];
          const otherProjects = axis.projects.filter(p => p.id !== accentProject.id);
          const hasImage = accentProject.featured && accentProject.image;

          return (
            <div className="space-y-6">
              {/* Featured project — full-width asymmetric composition */}
              <div
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0)' : 'translateY(16px)',
                  transition: revealed ? 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 80ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 80ms' : 'none',
                }}
              >
                <div className={`rounded-xl border overflow-hidden ${
                  'border-radar-signal/40 bg-radar-signal/[0.04]'
                }`}>
                  <div className={`grid ${hasImage ? 'lg:grid-cols-[1fr_1.4fr]' : ''} gap-0`}>
                    {hasImage && (
                      <div className="relative bg-gradient-to-br from-radar-signal/20 to-radar-grid overflow-hidden min-h-[240px]">
                        <img
                          src={accentProject.image!.src}
                          alt={accentProject.image!.alt[language]}
                          width={accentProject.image!.width}
                          height={accentProject.image!.height}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 lg:p-8 flex flex-col justify-center">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="font-display text-lg font-bold text-radar-text-primary">
                          {accentProject.name}
                        </h3>
                        <div className="flex items-center gap-2 shrink-0">
                          {accentProject.github && (
                            <a
                              href={accentProject.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-radar-text-muted hover:text-radar-signal transition-colors duration-200"
                              aria-label={`${accentProject.name} on GitHub`}
                            >
                              <GitHubIcon className="w-4 h-4" />
                            </a>
                          )}
                          {accentProject.url && (
                            <a
                              href={accentProject.url}
                              className="text-radar-text-muted hover:text-radar-signal transition-colors duration-200"
                              aria-label={`More about ${accentProject.name}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-radar-text-secondary text-sm leading-relaxed mb-4 max-w-prose">
                        {accentProject.description[language]}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {accentProject.techTags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-mono text-radar-signal bg-radar-signal/[0.08] px-2.5 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supporting projects — 2-col card grid */}
              {otherProjects.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {otherProjects.map((project, i) => {
                    const staggerDelay = i * 80 + 150;
                    return (
                      <div
                        key={project.id}
                        className="rounded-xl border border-radar-grid bg-radar-bg/60 hover:border-radar-signal/20 p-4 transition-all duration-300"
                        style={{
                          opacity: revealed ? 1 : 0,
                          transform: revealed ? 'translateY(0)' : 'translateY(12px)',
                          transition: revealed
                            ? `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, border-color 0.3s ease`
                            : 'none',
                        }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-display text-sm font-semibold text-radar-text-primary">
                            {project.name}
                          </h3>
                          <div className="flex items-center gap-2 shrink-0">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-radar-text-muted hover:text-radar-signal transition-colors duration-200"
                                aria-label={`${project.name} on GitHub`}
                              >
                                <GitHubIcon className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {project.url && (
                              <a
                                href={project.url}
                                className="text-radar-text-muted hover:text-radar-signal transition-colors duration-200"
                                aria-label={`More about ${project.name}`}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-radar-text-muted text-[13px] leading-relaxed mb-3">
                          {project.description[language]}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.techTags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono text-radar-signal/70 bg-radar-signal/[0.05] px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })() : (
          /* Default: card grid — 1-col mobile, 2-col tablet, 3-col desktop */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {axis.projects.map((project, i) => {
              const hasImage = project.featured && project.image;
              const staggerDelay = i * 80;
              return (
                <div
                  key={project.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={`rounded-xl border overflow-hidden transition-all duration-500 ${
                    project.id === axis.accentProject
                      ? 'border-radar-signal/30 bg-radar-signal/5'
                      : 'border-radar-grid bg-radar-bg/60'
                  } hover:border-radar-signal/30`}
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
                    transition: revealed
                      ? `opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}ms, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}ms, border-color 0.5s ease`
                      : 'none',
                  }}
                >
                  {hasImage && (
                    <div className="relative aspect-video bg-gradient-to-br from-radar-signal/20 to-radar-grid overflow-hidden group">
                      <img
                        src={project.image!.src}
                        alt={project.image!.alt[language]}
                        width={project.image!.width}
                        height={project.image!.height}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out"
                        style={{
                          transform: revealed ? 'scale(1)' : 'scale(1.05)',
                        }}
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display text-base font-semibold text-radar-text-primary">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-radar-text-muted hover:text-radar-signal transition-colors duration-200"
                            aria-label={`${project.name} on GitHub`}
                          >
                            <GitHubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.url && (
                          <a
                            href={project.url}
                            className="text-radar-text-muted hover:text-radar-signal transition-colors duration-200"
                            aria-label={`More about ${project.name}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-radar-text-muted text-sm leading-relaxed mb-3">
                      {project.description[language]}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono text-radar-signal bg-radar-signal/[0.08] px-2.5 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
