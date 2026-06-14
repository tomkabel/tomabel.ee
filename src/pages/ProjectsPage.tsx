import { useTranslation } from '../i18n/LanguageContext';
import SectionHeader from '../components/site/section-header';
import { projects } from '../content/site';

export default function ProjectsPage() {
  const { language } = useTranslation();

  return (
    <>
      <section className="border-b border-border px-6 pb-20 pt-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="02"
            label={language === 'en' ? 'Projects' : 'Projektid'}
            title={language === 'en' ? "Things I've shipped." : 'Mida olen tarninud.'}
            intro={language === 'en'
              ? "Research earns the credibility; these prove I can build the systems too — with observability, auth, and threat models that hold up in production."
              : 'Uuringud annavad usaldusväärsuse; need tõestavad, et oskan ka süsteeme ehitada — koos jälgitavuse, autentimise ja ohumudelitega, mis tootmises vastu peavad.'}
          />
        </div>
      </section>

      <section className="px-6 py-16" aria-labelledby="shipped-projects">
        <div className="mx-auto max-w-6xl">
          <h2
            id="shipped-projects"
            className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent"
          >
            {language === 'en' ? 'Shipped' : 'Tarnitud'}
          </h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <li
                key={p.name}
                className="group flex flex-col border border-border-strong p-8 transition-colors hover:border-accent/50"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {p.name}
                  </h3>
                  <span className="size-2 shrink-0 translate-y-2 bg-subtle transition-colors group-hover:bg-accent" />
                </div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                  {p.stack}
                </p>
                <p className="mb-8 text-muted">{p.blurb[language]}</p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:text-accent"
                >
                  {language === 'en' ? 'View on GitHub' : 'Vaata GitHubis'} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
