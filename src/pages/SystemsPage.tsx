import { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import SectionHeader from '../components/site/section-header';
import { projects, type Project, type ProjectCategory } from '../content/site';

type ProjectLink = { label: string; url: string };
type Filter = 'all' | ProjectCategory;

// A fallback link is only useful when href points at the project itself —
// not an internal route or the bare GitHub profile (github.com/<user>).
function isProjectUrl(href: string): boolean {
  if (!/^https?:\/\//.test(href)) return false;
  return !/^https?:\/\/github\.com\/[^/]+\/?$/.test(href);
}

function projectLinks(p: Project, isEn: boolean): ProjectLink[] {
  const links: ProjectLink[] = [];
  if (p.repo) links.push({ label: isEn ? 'Source' : 'Kood', url: p.repo });
  if (p.live) links.push({ label: isEn ? 'Live' : 'Vaata', url: p.live });
  if (links.length === 0 && isProjectUrl(p.href)) {
    links.push({ label: isEn ? 'View on GitHub' : 'Vaata GitHubis', url: p.href });
  }
  return links;
}

// Short type label per category — the fixed top-left slot of every card, and
// the filter-tab labels.
const TYPE_LABEL: Record<ProjectCategory, { en: string; et: string }> = {
  offensive: { en: 'Offensive', et: 'Rünne' },
  products: { en: 'Products', et: 'Tooted' },
  'ai-ml': { en: 'AI & Retrieval', et: 'AI ja haive' },
  systems: { en: 'Systems', et: 'Süsteemid' },
  research: { en: 'Frameworks', et: 'Raamistikud' },
  foundations: { en: 'Foundations', et: 'Alused' },
};

// Filter tabs, in display order: All, then each category that has projects.
const FILTER_ORDER: ProjectCategory[] = [
  'offensive',
  'products',
  'ai-ml',
  'systems',
  'research',
  'foundations',
];

// Derived deployment status — the fixed top-right slot of every card.
function statusOf(p: Project, isEn: boolean): { label: string; tone: string; live?: boolean } {
  const s = p.stack.toLowerCase();
  if (s.includes('live')) return { label: isEn ? 'Live' : 'Töös', tone: 'text-accent', live: true };
  if (s.includes('disclosed')) return { label: isEn ? 'Disclosed' : 'Avalikustatud', tone: 'text-warning' };
  if (p.repo) return { label: isEn ? 'Open source' : 'Avatud lähtekood', tone: 'text-muted-foreground' };
  return { label: isEn ? 'Reference' : 'Viide', tone: 'text-muted-foreground' };
}

export default function SystemsPage() {
  const { language } = useTranslation();
  const isEn = language === 'en';
  const [filter, setFilter] = useState<Filter>('all');

  const available = FILTER_ORDER.filter((c) => projects.some((p) => p.category === c));
  const shown = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section className="border-b border-border px-6 pb-8 pt-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            label={isEn ? 'Systems' : 'Süsteemid'}
            title={isEn ? "Things I've shipped." : 'Mida olen tarninud.'}
            intro={isEn
              ? "Research is one thing; getting it to hold up under real traffic is another. These are the tools, security prototypes, and backend services I've built and deployed."
              : 'Uuring on üks asi; selle vastupidavus päris liikluse all on teine. Need on tööriistad, turvaprototüübid ja backend-teenused, mille olen ehitanud ja juurutanud.'}
          />
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {projects.length} {isEn ? 'projects · public repositories & live deployments' : 'projekti · avalikud repod ja live-juurutused'}
          </p>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6">
          <div role="tablist" aria-label={isEn ? 'Filter systems' : 'Filtreeri süsteeme'} className="flex flex-wrap gap-x-6 gap-y-2 py-4">
            <FilterTab active={filter === 'all'} onClick={() => setFilter('all')}>
              {isEn ? 'All' : 'Kõik'}
            </FilterTab>
            {available.map((c) => (
              <FilterTab key={c} active={filter === c} onClick={() => setFilter(c)}>
                {TYPE_LABEL[c][language]}
              </FilterTab>
            ))}
          </div>
        </div>
      </div>

      <section className="px-6 py-16" aria-label={isEn ? 'Systems' : 'Süsteemid'}>
        <div className="mx-auto max-w-6xl">
          {/* One universal card, one uniform grid — no competing archetypes. */}
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((p) => (
              <ProjectCard key={p.name} project={p} isEn={isEn} language={language} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function FilterTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`font-mono text-xs font-medium uppercase tracking-widest transition-colors ${
        active ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
    </button>
  );
}

function StarMetric({ stars }: { stars: number }) {
  return (
    <span className="inline-flex shrink-0 items-baseline gap-1 rounded border border-border-strong bg-white/[0.04] px-2 py-0.5 font-mono text-xs font-bold text-foreground">
      <span className="text-accent" aria-hidden="true">★</span>
      {stars}
    </span>
  );
}

function TechTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-2">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded border border-border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {links.map((l) => (
        <a
          key={`${l.label}-${l.url}`}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:text-accent"
        >
          {l.label} <span aria-hidden>↗</span>
        </a>
      ))}
    </div>
  );
}

// The single universal project card. Every project — flagship, product, or
// utility script — renders in this exact shape with fixed metadata slots:
// TYPE + STATUS bar, title (+ stars), blurb, tag bar, action row. Flagship work
// gets an accent left rail for weight, never a different footprint.
function ProjectCard({
  project: p,
  isEn,
  language,
}: {
  project: Project;
  isEn: boolean;
  language: 'en' | 'et';
}) {
  const links = projectLinks(p, isEn);
  const type = p.category ? TYPE_LABEL[p.category][language] : isEn ? 'Project' : 'Projekt';
  const status = statusOf(p, isEn);

  return (
    <li
      className={`group flex flex-col rounded-lg border bg-surface p-6 shadow-elevated transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-2 hover:shadow-elevated-accent ${
        p.featured
          ? 'border-border-strong border-l-2 border-l-accent/60 hover:border-l-accent'
          : 'border-border-strong hover:border-accent/50'
      }`}
    >
      <div className="mb-5 flex items-center justify-between gap-3 font-mono text-[10px] font-medium uppercase tracking-widest">
        <span className="text-muted-foreground">{type}</span>
        <span className="flex items-center gap-3">
          {p.featured ? <span className="text-accent">{isEn ? 'Flagship' : 'Lipulaev'}</span> : null}
          <span className={`inline-flex items-center gap-1.5 ${status.tone}`}>
            {status.live ? <span aria-hidden className="size-1.5 rounded-full bg-accent" /> : null}
            {status.label}
          </span>
        </span>
      </div>

      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="break-words font-display text-xl font-bold leading-tight text-foreground">{p.name}</h3>
        {p.stars ? <StarMetric stars={p.stars} /> : null}
      </div>

      <p className="mb-6 text-sm leading-relaxed text-muted">{p.blurb[language]}</p>

      {p.tags && p.tags.length > 0 ? <div className="mb-6">{<TechTags tags={p.tags} />}</div> : null}

      {links.length > 0 ? (
        <div className="mt-auto border-t border-border pt-4">
          <ProjectLinks links={links} />
        </div>
      ) : null}
    </li>
  );
}
