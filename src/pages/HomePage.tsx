import type { ReactNode } from 'react';
import { ArrowRight, Crosshair, Fingerprint, Network, ShieldCheck } from 'lucide-react';
import Link from '../components/site/link';
import GlassProxy from '../components/site/glass-proxy';
import { useTranslation } from '../i18n/LanguageContext';
import { assessmentHref, featuredWork, home, projects } from '../content/site';

const fingerprintRepo = projects.find((p) => p.name === 'fingerprintproxy')!.repo!;
// fingerprintproxy already has its own bento cell; the rest is the record.
const publishedWork = featuredWork.filter((w) => w.href !== '/systems#fingerprintproxy');

type Lang = 'en' | 'et';

export default function HomePage() {
  const { language } = useTranslation();
  const h = home.hero;

  return (
    <>
      <header className="px-6 pb-section pt-section-tight">
        <div className="mx-auto grid max-w-6xl items-center gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="animate-rise-in lg:col-span-6">
            <p className="label text-accent">
              <span aria-hidden>[ </span>
              {h.kicker[language]}
              <span aria-hidden> ]</span>
            </p>
            <h1 className="mt-6 font-display text-5xl text-foreground">{h.title[language]}</h1>
            <p className="mt-6 max-w-measure text-lg leading-relaxed text-muted">{h.intro[language]}</p>
            {/* One filled primary, one text secondary: the weight difference is
                the hierarchy. */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={assessmentHref} className="btn-primary group">
                {h.primary[language]}
                <span aria-hidden className="arrow-shift">→</span>
              </a>
              <a href={fingerprintRepo} className="group inline-flex min-h-11 items-center gap-2 font-mono text-sm text-silver transition-colors hover:text-accent">
                <span className="link-draw">{h.secondary[language]}</span>
                <span aria-hidden className="arrow-shift">→</span>
              </a>
            </div>
          </div>
          <div className="animate-rise-in lg:col-span-6" style={{ animationDelay: '120ms' }}>
            <GlassProxy />
          </div>
        </div>
      </header>

      <Anatomy language={language} />
      <Capabilities language={language} />
      <Principal language={language} />
    </>
  );
}

function SectionIntro({ kicker, title, icon }: { kicker: string; title: string; icon?: ReactNode }) {
  return (
    <>
      <p className="label flex items-center gap-2 text-muted-foreground">
        {icon}
        {kicker}
      </p>
      <h2 className="mt-4 font-display text-4xl text-foreground">{title}</h2>
    </>
  );
}

function Anatomy({ language }: { language: Lang }) {
  const a = home.anatomy;
  return (
    <section id="aitm" className="bg-sunken px-6 py-section">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIntro kicker={a.kicker[language]} title={a.title[language]} />
          </div>
          <div className="grid gap-5 text-muted lg:col-span-7">
            {a.body.map((p) => (
              <p key={p.en} className="prose-measure">{p[language]}</p>
            ))}
          </div>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {a.pairs.map((p) => (
            <li key={p.to.en} className="glass glass-edge grid grid-rows-[1fr_auto_1fr] rounded-card">
              <div className="p-6">
                <p className="label text-subtle">{p.from[language]}</p>
                <p className="mt-3 text-muted-foreground">{p.fromBody[language]}</p>
              </div>
              <div aria-hidden className="flex items-center gap-3 px-6">
                <span className="h-px flex-1 bg-border-strong" />
                <ArrowRight className="size-4 text-accent" />
              </div>
              <div className="p-6">
                <p className="label text-accent">{p.to[language]}</p>
                <p className="mt-3 text-foreground">{p.toBody[language]}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Cell({ id, className = '', icon, title, children }: { id?: string; className?: string; icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <article id={id} className={`glass glass-edge flex min-w-0 flex-col rounded-card p-6 sm:p-8 ${className}`}>
      <h3 className="flex items-center gap-3 font-display text-2xl text-foreground">
        <span aria-hidden className="text-accent">{icon}</span>
        {title}
      </h3>
      {children}
    </article>
  );
}

function Capabilities({ language }: { language: Lang }) {
  const c = home.capabilities;
  return (
    <section id="architecture" className="px-6 py-section">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-measure">
          <SectionIntro kicker={c.kicker[language]} title={c.title[language]} />
        </div>
        {/* Bento rhythm 7/5 then 5/7, the same alternation as before. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Cell className="lg:col-span-7" icon={<ShieldCheck className="size-5" />} title={c.aitm.title[language]}>
            <p className="mt-4 max-w-measure text-muted">{c.aitm.body[language]}</p>
            <ul className="mt-auto flex flex-wrap gap-2 pt-8">
              {c.aitm.tags.map((t) => (
                <li key={t} className="rounded-hair border border-border px-2 py-1 font-mono text-xs text-muted-foreground">{t}</li>
              ))}
            </ul>
          </Cell>

          <Cell id="fingerprintproxy" className="lg:col-span-5" icon={<Fingerprint className="size-5" />} title={c.fingerprint.title[language]}>
            <p className="mt-4 text-muted">{c.fingerprint.body[language]}</p>
            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-figure border border-border bg-border">
              {c.fingerprint.specs.map((s) => (
                <div key={s.v} className="bg-sunken p-3">
                  <dt className="label text-subtle">{s.k[language]}</dt>
                  <dd className="mt-1 font-mono text-sm text-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
            <a href={fingerprintRepo} className="group mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-sm text-accent">
              <span className="link-draw break-all">github.com/tomkabel/fingerprintproxy</span>
              <span aria-hidden className="arrow-shift">→</span>
            </a>
          </Cell>

          <Cell className="lg:col-span-5" icon={<Crosshair className="size-5" />} title={c.redteam.title[language]}>
            <p className="mt-4 text-muted">{c.redteam.body[language]}</p>
          </Cell>

          <Cell className="lg:col-span-7" icon={<Network className="size-5" />} title={c.zerotrust.title[language]}>
            <p className="mt-4 max-w-measure text-muted">{c.zerotrust.body[language]}</p>
            <Link to="/disclosures/zero-trust-octagon" className="group mt-auto inline-flex min-h-11 items-center gap-2 pt-6 font-mono text-sm text-accent">
              <span className="link-draw">{c.zerotrust.cta[language]}</span>
              <span aria-hidden className="arrow-shift">→</span>
            </Link>
          </Cell>
        </div>
      </div>
    </section>
  );
}

function Principal({ language }: { language: Lang }) {
  const p = home.principal;
  return (
    <section id="principal" className="bg-sunken px-6 py-section">
      <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionIntro kicker={p.kicker[language]} title={p.title[language]} />
          <dl className="mt-10 grid gap-4 border-t border-border pt-6">
            {p.facts.map((f) => (
              <div key={f.k.en} className="grid grid-cols-[7rem_1fr] gap-4">
                <dt className="label pt-0.5 text-subtle">{f.k[language]}</dt>
                <dd className="text-sm text-foreground">{f.v[language]}</dd>
              </div>
            ))}
          </dl>
          <Link to="/my-story" className="group mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-sm text-accent">
            <span className="link-draw">{p.story[language]}</span>
            <span aria-hidden className="arrow-shift">→</span>
          </Link>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-6 text-lg leading-relaxed text-muted">
            {p.body.map((b) => (
              <p key={b.en} className="prose-measure">{b[language]}</p>
            ))}
          </div>

          <p className="label mt-12 text-muted-foreground">{p.work[language]}</p>
          <ul className="mt-4 border-t border-border">
            {publishedWork.map((w) => (
              <li key={w.href} className="border-b border-border">
                <Link to={w.href} className="group grid gap-1 py-4 transition-colors hover:text-accent">
                  <span className="label text-subtle">{w.impact[language]}</span>
                  <span className="flex items-center justify-between gap-4 text-foreground">
                    <span className="link-draw">{w.title[language]}</span>
                    <span aria-hidden className="arrow-shift text-accent">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
