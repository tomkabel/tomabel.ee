import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import WorkCard from '../components/site/work-card';
import { featuredWork, site, disclosures, englishOnlyArticles } from '../content/site';

// The homepage essay teaser pulls from the same unified disclosures source,
// filtered to the essay kind — no parallel essays array to drift.
const essays = disclosures.filter((d) => d.kind === 'essay');

// Featured cards alternate wide/narrow (7/5, then 5/7) so the grid has a
// reading rhythm instead of four identical tiles.
const featuredSpan = (i: number) => (i % 4 === 0 || i % 4 === 3 ? 'lg:col-span-7' : 'lg:col-span-5');

export default function HomePage() {
  const { language } = useTranslation();

  return (
    <>
      <header className="px-6 pb-section pt-section">
        <div className="mx-auto grid max-w-6xl gap-y-10 lg:grid-cols-12">
          <p className="label animate-rise-in text-muted-foreground lg:col-span-12">
            {site.hero.eyebrow[language]}
          </p>
          {/* Past tense recedes, present tense carries full ink: the tonal
              step is the argument, not decoration. */}
          <h1 className="animate-rise-in font-display text-7xl text-foreground lg:col-span-10" style={{ animationDelay: '80ms' }}>
            <span className="block text-muted-foreground">{site.hero.line1[language]}</span>
            <span className="block">{site.hero.line2[language]}</span>
          </h1>
          {/* Column 4 is the page's one interior reading edge: the intro, the
              fault-line quote and the essay list all start on it. */}
          <div className="animate-rise-in lg:col-span-7 lg:col-start-4" style={{ animationDelay: '180ms' }}>
            <p className="text-xl leading-relaxed text-muted">{site.hero.intro[language]}</p>
            {/* One filled primary, one text secondary: the weight difference is
                the hierarchy. */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link to="/disclosures" className="btn-primary group">
                {language === 'en' ? 'Read the research' : 'Loe uuringuid'}
                <span aria-hidden className="arrow-shift">→</span>
              </Link>
              <Link to="/systems" className="group inline-flex min-h-11 items-center gap-2 font-mono text-sm text-foreground transition-colors hover:text-accent">
                <span className="link-draw">{language === 'en' ? 'View systems' : 'Vaata süsteeme'}</span>
                <span aria-hidden className="arrow-shift">→</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-sunken px-6 py-section" aria-label={language === 'en' ? 'Introduction' : 'Sissejuhatus'}>
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-12">
          <p className="label text-muted-foreground lg:col-span-3 lg:pt-2">
            {language === 'en' ? 'The fault line' : 'Murdejoon'}
          </p>
          <blockquote className="lg:col-span-9">
            <p className="max-w-measure font-serif text-2xl leading-normal text-foreground">
              {site.introStrip[language]}
            </p>
          </blockquote>
        </div>
      </section>

      <section className="px-6 py-section">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="label mb-3 text-muted-foreground">
              {language === 'en' ? 'Featured work' : 'Esiletõstetud tööd'}
            </p>
            <h2 className="font-display text-4xl text-foreground">
              {language === 'en' ? 'Selected research and shipped systems' : 'Valitud uuringud ja tarnitud süsteemid'}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
            {featuredWork.map((w, i) => (
              <WorkCard key={w.href + w.title.en} item={w} className={featuredSpan(i)} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-section">
        <div className="mx-auto grid max-w-6xl gap-x-6 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="label mb-6 text-muted-foreground">
              {language === 'en' ? 'Writing' : 'Kirjutised'}
            </p>
            <h2 className="mb-6 font-display text-4xl text-foreground">
              {language === 'en' ? 'Essays and arguments' : 'Esseed ja argumendid'}
            </h2>
            <p className="text-muted">
              {language === 'en'
                ? "The through-lines that connect the research, and arguments I want to make in public."
                : 'Läbivad jooned, mis seovad uuringuid, ja argumendid, mida tahan avalikult esitada.'}
            </p>
          </div>
          <div className="lg:col-span-9">
            <ul className="border-t border-border">
              {essays.slice(0, 3).map((e) => (
                <li key={e.title.en} className="border-b border-border transition-colors duration-fast hover:bg-surface">
                  {e.href ? (
                    <Link to={e.href} className="group grid gap-1.5 p-6">
                      <HomeEssayRowContent essay={e} language={language} />
                    </Link>
                  ) : (
                    <div className="grid gap-1.5 p-6">
                      <HomeEssayRowContent essay={e} language={language} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {/* The way out sits where the eye ends: directly under the list. */}
            <Link to="/disclosures?kind=essay" className="group mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-sm text-accent">
              <span className="link-draw">
                {language === 'en' ? `All ${essays.length} essays` : `Kõik ${essays.length} esseed`}
              </span>
              <span aria-hidden className="arrow-shift">→</span>
            </Link>
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
  const { t } = useTranslation();
  return (
    <>
      <h3 className="font-display text-2xl text-foreground">
        <span className="link-draw">{essay.title[language]}</span>
        {essay.href ? (
          <span className="ml-2 inline-block font-mono text-sm text-subtle opacity-0 transition-[opacity,transform] duration-base group-hover:translate-x-1 group-hover:opacity-100">
            →
          </span>
        ) : null}
      </h3>
      {/* Metadata sits directly under the title, not pinned across a void. */}
      <span className="label text-muted-foreground">
        {essay.meta?.[language]}
        {language !== 'en' && essay.href && englishOnlyArticles.has(essay.href) ? (
          <span className="text-warning"> · {t.app.englishOnly}</span>
        ) : null}
      </span>
    </>
  );
}
