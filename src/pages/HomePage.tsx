import Link from '../components/site/link';
import { useTranslation } from '../i18n/LanguageContext';
import WorkCard from '../components/site/work-card';
import PgpCard from '../components/site/pgp-card';
import { ConnectionStrip } from '../components/site/telemetry';
import { SplitFigure } from '../components/site/figure';
import { HeroAfter, HeroBefore } from '../content/schematics';
import { featuredWork, site, disclosures, englishOnlyArticles } from '../content/site';

const featured = new Set(featuredWork.map((w) => w.href));
// Archive: everything published that isn't already a featured card.
const archive = disclosures.filter((d) => d.href && !featured.has(d.href));
const kratt = disclosures.find((d) => d.href === '/disclosures/the-kratt-problem');

export default function HomePage() {
  const { language, t } = useTranslation();
  const en = language === 'en';

  return (
    <>
      <header className="px-6 pb-section-tight pt-section">
        <div className="mx-auto max-w-5xl">
          <p className="label animate-rise-in text-muted-foreground">{site.hero.eyebrow[language]}</p>
          <h1 className="mt-6 animate-rise-in font-display text-7xl text-foreground" style={{ animationDelay: '80ms' }}>
            {site.hero.headline[language]}
          </h1>
          <p className="prose-measure mt-8 animate-rise-in text-xl leading-relaxed text-muted" style={{ animationDelay: '160ms' }}>
            {site.introStrip.quote[language]}
          </p>
          <figure className="mx-auto mt-14 max-w-2xl animate-rise-in" style={{ animationDelay: '240ms' }}>
            <SplitFigure
              beforeLabel="SECURE-BY-HOPE"
              afterLabel="SECURE-BY-DESIGN"
              before={<HeroBefore l={language} />}
              after={<HeroAfter l={language} />}
            />
            <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
              {en
                ? 'The same login twice. Above, the server hopes the person typing is the account holder. Below, it verifies a signature from a key that never leaves the device and is bound to this origin.'
                : 'Sama sisselogimine kaks korda. Üleval loodab server, et trükkija on konto omanik. All kontrollib ta allkirja võtmest, mis ei lahku seadmest ja on seotud selle päritoluga.'}
            </figcaption>
          </figure>
          <div className="mx-auto mt-10 max-w-2xl">
            <ConnectionStrip />
          </div>
        </div>
      </header>

      <section className="px-6 py-section-tight" aria-labelledby="featured">
        <div className="mx-auto max-w-5xl">
          <h2 id="featured" className="mb-8 font-display text-4xl text-foreground">
            {en ? 'Recent analysis' : 'Värsked analüüsid'}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredWork.map((w) => (
              <WorkCard key={w.href} item={w} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-section-tight" aria-labelledby="archive">
        <div className="mx-auto max-w-5xl">
          <h2 id="archive" className="mb-6 font-display text-3xl text-foreground">
            {en ? 'Editorial index' : 'Toimetuse register'}
          </h2>
          <ul className="border-t border-border">
            {archive.map((d) => (
              <li key={d.href} className="border-b border-border">
                <Link to={d.href!} className="group grid gap-1 py-5 transition-colors duration-fast hover:bg-surface sm:px-3">
                  <span className="font-display text-xl text-foreground">
                    <span className="link-draw">{d.title[language]}</span>
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    <span className="text-accent">{d.type[language]}</span>
                    {d.meta ? ` · ${d.meta[language]}` : null}
                    {!en && englishOnlyArticles.has(d.href!) ? <span className="text-warning"> · {t.app.englishOnly}</span> : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/disclosures" className="group mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-sm text-accent">
            <span className="link-draw">{en ? 'Filter the full index' : 'Filtreeri kogu registrit'}</span>
            <span aria-hidden className="arrow-shift">→</span>
          </Link>
        </div>
      </section>

      <section className="px-6 pb-section" aria-label={en ? 'Ethics and keys' : 'Eetika ja võtmed'}>
        <div className="mx-auto grid max-w-5xl gap-6">
          {kratt?.href ? (
            <Link to={kratt.href} className="group block rounded-card border border-warning/70 bg-surface p-6 transition-colors duration-fast hover:bg-surface-2">
              <p className="label mb-3 text-warning">KRATT</p>
              <p className="prose-measure text-muted">{kratt.blurb[language]}</p>
              <span className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-warning">
                <span className="link-draw">{kratt.title[language]}</span>
                <span aria-hidden className="arrow-shift">→</span>
              </span>
            </Link>
          ) : null}
          <div className="rounded-card border border-accent/60 p-1">
            <p className="label px-5 pt-4 text-accent">PGP</p>
            <PgpCard />
          </div>
        </div>
      </section>
    </>
  );
}
