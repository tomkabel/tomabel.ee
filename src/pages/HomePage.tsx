import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import WorkCard from '../components/site/work-card';
import { featuredWork, site, disclosures } from '../content/site';

// The homepage essay teaser pulls from the same unified disclosures source,
// filtered to the essay kind — no parallel essays array to drift.
const essays = disclosures.filter((d) => d.kind === 'essay');

export default function HomePage() {
  const { language } = useTranslation();

  return (
    <>
      <header className="relative overflow-hidden border-b border-border px-6 pb-24 pt-24 md:pt-32">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_top_left,black,transparent_75%)]" />

        <div className="relative mx-auto max-w-6xl">
          <p className="rise-in mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <span aria-hidden className="h-px w-8 bg-accent/60" />
            <span>{site.hero.eyebrow[language]}</span>
          </p>
          <h1 className="rise-in max-w-4xl font-display text-5xl font-bold leading-[1.05] text-foreground md:text-7xl" style={{ animationDelay: '80ms' }}>
            {site.hero.line1[language]}{' '}
            <span className="text-accent">{site.hero.line2[language]}</span>
          </h1>
          <p className="rise-in mt-10 max-w-2xl text-xl leading-relaxed text-muted" style={{ animationDelay: '180ms' }}>
            {site.hero.intro[language]}
          </p>
          <div className="rise-in mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-xs uppercase tracking-widest" style={{ animationDelay: '260ms' }}>
            <Link
              to="/disclosures"
              className="group inline-flex items-center gap-2 text-accent hover:underline"
            >
              {language === 'en' ? 'Read the research' : 'Loe uuringuid'}{' '}
              <span className="arrow-shift">→</span>
            </Link>
            <Link
              to="/systems"
              className="group inline-flex items-center gap-2 text-foreground hover:text-accent"
            >
              {language === 'en' ? 'What I build' : 'Mida ma ehitan'}{' '}
              <span className="arrow-shift">→</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-border bg-surface/60 px-6 py-24" aria-label="Introduction">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-12">
            <p className="lg:col-span-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {language === 'en' ? 'The fault line' : 'Murdejoon'}
            </p>
            <blockquote className="lg:col-span-9 border-l-2 border-accent/50 pl-6 md:pl-8">
              <p className="prose-measure font-serif text-xl leading-relaxed text-foreground md:text-2xl md:leading-relaxed">
                {site.introStrip[language]}
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="border-b border-border px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                <span aria-hidden className="h-px w-8 bg-accent/60" />
                <span>{language === 'en' ? 'Featured Work' : 'Esiletõstetud tööd'}</span>
              </p>
              <h2 className="font-display text-2xl font-medium text-foreground">
                {language === 'en' ? 'Selected research and shipped systems' : 'Valitud uuringud ja tarnitud süsteemid'}
              </h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredWork.map((w) => (
              <WorkCard key={w.href + w.title.en} item={w} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="mb-6 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                <span aria-hidden className="h-px w-8 bg-accent/60" />
                <span>{language === 'en' ? 'Writing' : 'Kirjutised'}</span>
              </p>
              <h2 className="mb-6 font-display text-4xl font-bold text-foreground">
                {language === 'en' ? 'Essays and arguments' : 'Esseed ja argumendid'}
              </h2>
              <p className="mb-8 text-muted">
                {language === 'en'
                  ? "The through-lines that connect the research, and arguments I want to make in public."
                  : 'Läbivad jooned, mis seovad uuringuid, ja argumendid, mida tahan avalikult esitada.'}
              </p>
              <Link
                to="/disclosures"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-accent hover:underline"
              >
                {language === 'en' ? 'Browse disclosures' : 'Sirvi avalikustatut'} →
              </Link>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-1">
                {essays.slice(0, 3).map((e) => (
                  <li
                    key={e.title.en}
                    className="border-b border-border transition-colors hover:bg-white/5"
                  >
                    {e.href ? (
                      <Link to={e.href} className="group flex flex-col gap-1.5 p-6">
                        <HomeEssayRowContent essay={e} language={language} />
                      </Link>
                    ) : (
                      <div className="group flex flex-col gap-1.5 p-6">
                        <HomeEssayRowContent essay={e} language={language} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HomeEssayRowContent({
  essay,
  language,
}: {
  essay: (typeof essays)[number];
  language: 'en' | 'et';
}) {
  return (
    <>
      <h3 className="font-display text-lg font-medium text-foreground transition-colors group-hover:text-accent">
        {essay.title[language]}
        {essay.href ? (
          <span className="ml-2 inline-block font-mono text-sm text-subtle opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            →
          </span>
        ) : null}
      </h3>
      {/* Metadata sits directly under the title, not pinned across a void. */}
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {essay.meta?.[language]}
      </span>
    </>
  );
}
