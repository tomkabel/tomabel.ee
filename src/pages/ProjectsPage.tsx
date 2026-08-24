import { useTranslation } from '../i18n/LanguageContext';
import SectionHeader from '../components/site/section-header';
import { projects, projectCategories, type Project } from '../content/site';

type ProjectLink = { label: string; url: string };

function projectLinks(p: Project, isEn: boolean): ProjectLink[] {
  const links: ProjectLink[] = [];
  if (p.repo) links.push({ label: isEn ? 'Source' : 'Kood', url: p.repo });
  if (p.live) links.push({ label: isEn ? 'Live' : 'Vaata', url: p.live });
  if (links.length === 0) {
    links.push({ label: isEn ? 'View on GitHub' : 'Vaata GitHubis', url: p.href });
  }
  return links;
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
            index="02"
            label={isEn ? 'Projects' : 'Projektid'}
            title={isEn ? "Things I've shipped." : 'Mida olen tarninud.'}
            intro={isEn
              ? "Research earns the credibility; these prove I can build the systems too — offensive tooling, applied security products, AI pipelines, and infrastructure, with observability, auth, and threat models that hold up in production."
              : 'Uuringud annavad usaldusväärsuse; need tõestavad, et oskan ka süsteeme ehitada — ründetööriistad, rakenduslikud turvatooted, AI-torujuhtmed ja taristu, koos jälgitavuse, autentimise ja ohumudelitega, mis tootmises vastu peavad.'}
          />
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {projects.length} {isEn ? 'projects · public repositories & live deployments' : 'projekti · avalikud repod ja live-juurutused'}
          </p>
        </div>
      </section>

      {grouped.map(({ cat, items }) => (
        <section key={cat.id} className="border-b border-border px-6 py-16" aria-labelledby={`cat-${cat.id}`}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-baseline justify-between gap-4">
              <h2
                id={`cat-${cat.id}`}
                className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent"
              >
                {cat.label[language]}
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {items.length.toString().padStart(2, '0')}
              </span>
            </div>
            <ul className="grid gap-6 md:grid-cols-2">
              {items.map((p) => (
                <ProjectCard key={p.name} project={p} isEn={isEn} language={language} />
              ))}
            </ul>
          </div>
        </section>
      ))}

      {uncategorized.length > 0 && (
        <section className="border-b border-border px-6 py-16" aria-labelledby="cat-other">
          <div className="mx-auto max-w-6xl">
            <h2
              id="cat-other"
              className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent"
            >
              {isEn ? 'More' : 'Veel'}
            </h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {uncategorized.map((p) => (
                <ProjectCard key={p.name} project={p} isEn={isEn} language={language} />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

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

  return (
    <li className="group flex flex-col border border-border-strong p-8 transition-colors hover:border-accent/50">
      <div className="mb-6 flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl font-bold text-foreground">{p.name}</h3>
        {p.stars ? (
          <span className="shrink-0 whitespace-nowrap border border-border-strong px-2 py-1 font-mono text-[10px] font-bold text-accent">
            ★ {p.stars}
          </span>
        ) : (
          <span className="size-2 shrink-0 translate-y-2 bg-subtle transition-colors group-hover:bg-accent" />
        )}
      </div>

      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-accent">{p.stack}</p>
      <p className="mb-6 text-muted">{p.blurb[language]}</p>

      {p.tags && p.tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-x-4 gap-y-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2">
        {links.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:text-accent"
          >
            {l.label} →
          </a>
        ))}
      </div>
    </li>
  );
}
