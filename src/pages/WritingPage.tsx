import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import SectionHeader from '../components/site/section-header';
import CrossNav from '../components/site/cross-nav';
import { essays } from '../content/site';

export default function WritingPage() {
  const { language } = useTranslation();

  return (
    <>
      <section className="border-b border-border px-6 pb-20 pt-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="03"
            label={language === 'en' ? 'Writing' : 'Kirjutised'}
            title={language === 'en' ? 'Essays and arguments.' : 'Esseed ja argumendid.'}
            intro={language === 'en'
              ? "The through-lines that connect the research, and arguments I want to make in public. Less formal than the research, more opinionated."
              : 'Läbivad jooned, mis seovad uuringuid, ja argumendid, mida tahan avalikult esitada. Vähem formaalsed kui uuringud, rohkem arvamuslikud.'}
          />
        </div>
      </section>

      <section className="px-6 py-12" aria-labelledby="planned-essays">
        <div className="mx-auto max-w-6xl">
          <h2
            id="planned-essays"
            className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent"
          >
            {language === 'en' ? 'Published / Seed Pieces' : 'Avaldatud / Alustatud Palad'}
          </h2>
          <ul className="divide-y divide-border border-y border-border">
            {essays.map((e, i) => (
              <li
                key={e.title.en}
                className="transition-colors hover:bg-white/[0.02]"
              >
                {e.href ? (
                  <Link to={e.href} className="group block py-8">
                    <EssayRowContent essay={e} index={i + 1} language={language} />
                  </Link>
                ) : (
                  <div className="group block py-8">
                    <EssayRowContent essay={e} index={i + 1} language={language} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CrossNav
        to="/research"
        label={language === 'en' ? 'Long-form research' : 'Pikk uurimistöö'}
        blurb={language === 'en'
          ? 'These essays argue positions. The research does the rigorous, disclosed technical work behind them — teardowns, protocol analysis, frameworks.'
          : 'Need esseed esitavad seisukohti. Uuringud teevad nende taga range, avalikustatud tehnilise töö — lahtivõtmised, protokollianalüüs, raamistikud.'}
        cta={language === 'en' ? 'Read the research' : 'Loe uuringuid'}
      />
    </>
  );
}

function EssayRowContent({
  essay,
  index,
  language,
}: {
  essay: (typeof essays)[number];
  index: number;
  language: 'en' | 'et';
}) {
  return (
    <>
      {/* Metadata rides directly above the title — no wide left gutter to cross. */}
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span className="text-accent">
          {language === 'en' ? 'Essay' : 'Essee'} · {String(index).padStart(2, '0')}
        </span>
        <span aria-hidden className="text-subtle">·</span>
        <span>{essay.meta[language]}</span>
      </div>
      <h3 className="font-display text-2xl font-bold leading-snug text-foreground decoration-accent/50 underline-offset-4 transition-colors group-hover:text-accent group-hover:underline">
        {essay.title[language]}
        {essay.href ? (
          <span className="ml-2 inline-block font-mono text-base text-subtle opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            →
          </span>
        ) : null}
      </h3>
      <p className="prose-measure mt-3 text-muted">{essay.blurb[language]}</p>
    </>
  );
}
