import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { sectionSlug } from './section-slug';

type RailSection = { heading: string };

/**
 * A sticky reading rail: reading-progress meter, a live table of contents that
 * highlights the section in view, and a persistent back link. Replaces the old
 * static "thesis" box that left the left column as dead space past the fold.
 */
export default function ReaderRail({
  sections,
  backHref,
  backLabel,
}: {
  sections: RailSection[];
  backHref: string;
  backLabel: string;
}) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>('');
  const rafRef = useRef<number | null>(null);

  // Reading progress across the document (each reader route is one article).
  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
    };
    const onScroll = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Highlight the section currently in the reading band.
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(sectionSlug(s.heading)))
      .filter((el): el is HTMLElement => el != null);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActiveId(top.target.id);
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const pct = Math.round(progress * 100);

  return (
    <nav aria-label="Article contents" className="space-y-8 text-sm">
      <Link
        to={backHref}
        className="hidden min-h-11 items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-accent lg:inline-flex"
      >
        <span aria-hidden>←</span> {backLabel}
      </Link>

      {/* Below lg the rail stacks above the article, where a scroll meter and a
          second back link are dead weight. */}
      <div className="hidden lg:block">
        <div className="mb-2 flex items-baseline justify-between label text-muted-foreground">
          <span>Progress</span>
          <span className="text-accent">{pct}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-border-strong" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-accent transition-[width] duration-fast ease-out" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div>
        <p className="mb-4 label font-bold text-muted-foreground">
          Contents
        </p>
        <ol className="space-y-1">
          {sections.map((s, i) => {
            const id = sectionSlug(s.heading);
            const active = id === activeId;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active ? 'location' : undefined}
                  className={`group flex min-h-11 items-center gap-3 border-l-2 py-1.5 pl-3 leading-snug transition-colors ${
                    active
                      ? 'border-accent text-foreground'
                      : 'border-transparent text-muted-foreground hover:border-border-strong hover:text-foreground'
                  }`}
                >
                  <span className={`font-mono text-xs ${active ? 'text-accent' : 'text-subtle'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{s.heading}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
