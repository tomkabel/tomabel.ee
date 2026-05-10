import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import type { CapabilityAxis } from './types';

interface Props {
  axis: CapabilityAxis;
  index: number;
}

export default function AxisSection({ axis, index }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={axis.id}
      ref={ref}
      className={`py-20 md:py-28 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${index % 2 === 0 ? 'bg-[#040408]' : 'bg-[#020203]'}`}
    >
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: label + description */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F1F5F9] mb-4">
              {axis.label.en}
            </h2>
            <p className="text-[#94A3B8] leading-relaxed">
              {axis.description.en}
            </p>
          </div>

          {/* Right: projects */}
          <div className="space-y-4">
            {axis.projects.map((project) => (
              <div
                key={project.id}
                className={`p-4 rounded-xl border ${
                  project.id === axis.accentProject
                    ? 'border-[#00D4FF]/30 bg-[#00D4FF]/5'
                    : 'border-[#1a1a2e] bg-[#020203]/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-base font-semibold text-[#F1F5F9]">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#64748B] hover:text-[#00D4FF] transition-colors"
                        aria-label={`${project.name} on GitHub`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        className="text-[#64748B] hover:text-[#00D4FF] transition-colors"
                        aria-label={`More about ${project.name}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed mb-3">
                  {project.description.en}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-[#64748B] bg-[#1a1a2e]/50 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
