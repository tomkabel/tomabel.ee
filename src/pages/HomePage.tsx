import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import WorkCard from '../components/site/work-card';
import { featuredWork, site, essays } from '../content/site';

export default function HomePage() {
  const { language } = useTranslation();

  return (
    <>
      <header className="relative overflow-hidden border-b border-border px-6 pb-24 pt-24 md:pt-32">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div aria-hidden className="pointer-events-none absolute left-4 top-4 size-3 border-l border-t border-accent/40" />
        <div aria-hidden className="pointer-events-none absolute right-4 top-4 size-3 border-r border-t border-accent/40" />

        <div className="relative mx-auto max-w-6xl">
          <p className="rise-in mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="text-accent">$</span>
            <span>whoami</span>
            <span className="text-subtle">—</span>
            <span>{site.hero.eyebrow[language]}</span>
          </p>
          <h1 className="rise-in max-w-4xl font-display text-5xl font-bold leading-[1.05] text-foreground md:text-7xl" style={{ animationDelay: '80ms' }}>
            {site.hero.line1[language]}{' '}
            <span className="accent-glow text-accent">{site.hero.line2[language]}</span>
            <span aria-hidden className="caret" />
          </h1>
          <p className="rise-in mt-10 max-w-2xl text-xl leading-relaxed text-muted" style={{ animationDelay: '180ms' }}>
            {site.hero.intro[language]}
          </p>
          <div className="rise-in mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-xs uppercase tracking-widest" style={{ animationDelay: '260ms' }}>
            <Link
              to="/research"
              className="group inline-flex items-center gap-2 text-accent hover:underline"
            >
              {language === 'en' ? 'Read the research' : 'Loe uuringuid'}{' '}
              <span className="arrow-shift">→</span>
            </Link>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-foreground hover:text-accent"
            >
              {language === 'en' ? 'What I build' : 'Mida ma ehitan'}{' '}
              <span className="arrow-shift">→</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-border bg-white/[0.02] px-6 py-20" aria-label="Introduction">
        <div className="mx-auto max-w-3xl">
          <p className="font-display text-xl leading-relaxed text-foreground md:text-2xl">
            {site.introStrip[language]}
          </p>
        </div>
      </section>

      <section className="border-b border-border px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                [01] {language === 'en' ? 'Featured Work' : 'Esiletõstetud Tööd'}
              </p>
              <h2 className="font-display text-2xl font-medium text-foreground">
                {language === 'en' ? 'Selected research and shipped systems' : 'Valitud uuringud ja tarnitud süsteemid'}
              </h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredWork.map((w) => (
              <WorkCard key={w.code} item={w} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                [02] {language === 'en' ? 'Writing' : 'Kirjutised'}
              </p>
              <h2 className="mb-6 font-display text-4xl font-bold text-foreground">
                {language === 'en' ? 'Essays in progress' : 'Esseed töös'}
              </h2>
              <p className="mb-8 text-muted">
                {language === 'en'
                  ? "Shorter pieces — the through-lines that connect the research, and arguments I want to make in public."
                  : 'Lühemad palad — läbivad jooned, mis seovad uuringuid, ja argumendid, mida tahan avalikult esitada.'}
              </p>
              <Link
                to="/writing"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-accent hover:underline"
              >
                {language === 'en' ? 'Browse writing' : 'Sirvi kirjutisi'} →
              </Link>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-1">
                {essays.slice(0, 3).map((e) => (
                  <li
                    key={e.title.en}
                    className="group flex flex-col justify-between border-b border-border p-6 transition-colors hover:bg-white/5 md:flex-row md:items-center"
                  >
                    <h3 className="font-display text-lg font-medium text-foreground transition-colors group-hover:text-accent">
                      {e.title[language]}
                    </h3>
                    <span className="mt-2 text-xs uppercase tracking-widest text-muted-foreground md:mt-0">
                      {language === 'en' ? 'Essay' : 'Essee'}
                    </span>
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
