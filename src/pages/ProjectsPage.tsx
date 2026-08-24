import { useTranslation } from '../i18n/LanguageContext';
import SectionHeader from '../components/site/section-header';
import { projects, projectCategories, type Project, type ProjectCategory } from '../content/site';

type ProjectLink = { label: string; url: string };

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

// Short type label per category — the fixed top-left slot of every card.
const TYPE_LABEL: Record<ProjectCategory, { en: string; et: string }> = {
  offensive: { en: 'Offensive', et: 'Rünne' },
  products: { en: 'Product', et: 'Toode' },
  'ai-ml': { en: 'AI / Retrieval', et: 'AI / Haive' },
  systems: { en: 'Systems', et: 'Süsteemid' },
  research: { en: 'Framework', et: 'Raamistik' },
  foundations: { en: 'Foundations', et: 'Alused' },
};

// Derived deployment status — the fixed top-right slot of every card.
function statusOf(p: Project, isEn: boolean): { label: string; tone: string; live?: boolean } {
  const s = p.stack.toLowerCase();
  if (s.includes('live')) return { label: isEn ? 'Live' : 'Töös', tone: 'text-accent', live: true };
  if (s.includes('disclosed')) return { label: isEn ? 'Disclosed' : 'Avalikustatud', tone: 'text-warning' };
  if (p.repo) return { label: isEn ? 'Open source' : 'Avatud lähtekood', tone: 'text-muted-foreground' };
  return { label: isEn ? 'Reference' : 'Viide', tone: 'text-muted-foreground' };
}

export default function ProjectsPage() {
  const { language } = useTranslation();
  const isEn = language === 'en';

  const grouped = projectCategories
    .map((cat) => ({ cat, items: projects.filter((p) => p.category === cat.id) }))
    .filter((g) => g.items.length > 0);

  // Any projects without a recognized category still render in a trailing group.
  const uncategorized = projects.filter(
    (p) => !p.category || !projectCategories.some((c) => c.id === p.category),
  );

  return (
    <>
      <section className="border-b border-border px-6 pb-20 pt-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            label={isEn ? 'Projects' : 'Projektid'}
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

      {grouped.map(({ cat, items }) => (
        <ProjectGroup key={cat.id} id={`cat-${cat.id}`} label={cat.label[language]} items={items} isEn={isEn} language={language} />
      ))}

      {uncategorized.length > 0 && (
        <ProjectGroup id="cat-other" label={isEn ? 'More' : 'Veel'} items={uncategorized} isEn={isEn} language={language} />
      )}
    </>
  );
}

function ProjectGroup({
  id,
  label,
  items,
  isEn,
  language,
}: {
  id: string;
  label: string;
  items: Project[];
  isEn: boolean;
  language: 'en' | 'et';
}) {
  return (
    <section className="border-b border-border px-6 py-16" aria-labelledby={id}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 id={id} className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {label}
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {items.length.toString().padStart(2, '0')}
          </span>
        </div>
        {/* One universal card, one uniform grid — no competing archetypes. */}
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((p) => (
            <ProjectCard key={p.name} project={p} isEn={isEn} language={language} />
          ))}
        </ul>
      </div>
    </section>
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
