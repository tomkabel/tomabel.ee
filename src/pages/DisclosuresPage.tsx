import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import SectionHeader from '../components/site/section-header';
import EntryRow from '../components/site/entry-row';
import CrossNav from '../components/site/cross-nav';
import { Callout } from '../components/site/article';
import { disclosures, type DisclosureKind } from '../content/site';

type Filter = 'all' | DisclosureKind;

// Filter tabs, in display order. `all` first, then the four kinds.
const FILTERS: { id: Filter; label: { en: string; et: string } }[] = [
  { id: 'all', label: { en: 'All', et: 'Kõik' } },
  { id: 'disclosure', label: { en: 'Disclosures', et: 'Avalikustatud' } },
  { id: 'teardown', label: { en: 'Teardowns', et: 'Analüüsid' } },
  { id: 'essay', label: { en: 'Essays', et: 'Esseed' } },
  { id: 'framework', label: { en: 'Frameworks', et: 'Raamistikud' } },
];

export default function DisclosuresPage() {
  const { language } = useTranslation();
  const [filter, setFilter] = useState<Filter>('all');

  // Only offer tabs that actually have entries, so no tab lands on an empty list.
  const available = FILTERS.filter(
    (f) => f.id === 'all' || disclosures.some((d) => d.kind === f.id),
  );
  const shown = filter === 'all' ? disclosures : disclosures.filter((d) => d.kind === filter);

  return (
    <>
      <section className="border-b border-border px-6 pb-8 pt-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            label={language === 'en' ? 'Disclosures' : 'Avalikustatud'}
            title={language === 'en' ? 'Research, teardowns, and arguments.' : 'Uuringud, analüüsid ja argumendid.'}
            intro={language === 'en'
              ? 'One surface for the technical work and the writing that connects it: disclosed vulnerability research, opcode-level teardowns, architecture frameworks, and the shorter, more opinionated essays. Where research touches live systems, it was disclosed responsibly before publication.'
              : 'Üks pind tehnilisele tööle ja seda siduvale kirjutamisele: avalikustatud haavatavuste uuringud, opkooditasemel analüüsid, arhitektuuriraamistikud ja lühemad, arvamuslikumad esseed. Seal, kus uuringud puudutavad elavaid süsteeme, on need enne avaldamist vastutustundlikult avalikustatud.'}
          />
          <div className="mt-10 max-w-3xl">
            <Callout label={language === 'en' ? 'The thesis' : 'Tees'}>
              {language === 'en' ? (
                <p>
                  One thesis runs under three separate arguments here, though nothing on this site
                  said so directly until now. The{' '}
                  <Link to="/disclosures/smart-id-achilles-heel" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                    Smart-ID report
                  </Link>{' '}
                  says it about the phone: an approval not bound to what the user was shown is a
                  signal, not proof. The{' '}
                  <Link to="/disclosures/what-client-side-trust-is-actually-worth" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                    client-side-trust essay
                  </Link>{' '}
                  says it about the browser: a client attestation is a self-report that becomes a
                  portable ticket the moment it is stored.{' '}
                  <Link to="/systems" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                    Systems
                  </Link>
                  , and Proksimity specifically, is that sentence turned into a product: check the
                  session's context at the network edge, because the client's account of itself is
                  not enough. The academic version of the same claim, extended to AI agents driving
                  real browsers, is in the public SoK paper,{' '}
                  <a href="https://github.com/tomkabel/google-botguard-security-research" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                    "Client-Side Anti-Automation Under VLM-Based Attack"
                  </a>
                  .
                </p>
              ) : (
                <p>
                  Üks tees kannab siin kolme eraldi argumenti, kuigi miski sellel saidil ei ole seda
                  seni otse öelnud.{' '}
                  <Link to="/disclosures/smart-id-achilles-heel" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                    Smart-ID raport
                  </Link>{' '}
                  ütleb seda telefoni kohta: kinnitus, mis ei ole seotud sellega, mida kasutajale
                  näidati, on signaal, mitte tõend.{' '}
                  <Link to="/disclosures/what-client-side-trust-is-actually-worth" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                    Kliendipoolse usalduse essee
                  </Link>{' '}
                  ütleb seda brauseri kohta: kliendi atestatsioon on enesearuanne, mis muutub
                  teisaldatavaks piletiks hetkest, mil seda salvestatakse.{' '}
                  <Link to="/systems" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                    Süsteemid
                  </Link>
                  , ja täpsemalt Proksimity, on see lause tootena: kontrolli seansi konteksti
                  võrguserva peal, sest kliendi enda aruanne ei ole piisav. Sama väite akadeemiline
                  versioon, laiendatuna AI-agentidele, mis juhivad päris brausereid, on
                  avalikustatud SoK-uuringus{' '}
                  <a href="https://github.com/tomkabel/google-botguard-security-research" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                    "Client-Side Anti-Automation Under VLM-Based Attack"
                  </a>
                  .
                </p>
              )}
            </Callout>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6">
          <div role="group" aria-label={language === 'en' ? 'Filter disclosures' : 'Filtreeri avalikustatud'} className="flex flex-wrap gap-x-6 gap-y-2 py-4">
            {available.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={`font-mono text-xs font-medium uppercase tracking-widest transition-colors ${
                    active ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {f.label[language]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section aria-labelledby="disclosure-entries" className="pt-4">
        <h2 id="disclosure-entries" className="sr-only">
          {language === 'en' ? 'Entries' : 'Sissekanded'}
        </h2>
        {shown.map((d) => (
          <EntryRow
            key={d.title.en}
            title={d.title}
            blurb={d.blurb}
            type={d.type}
            meta={d.meta}
            tags={d.tags}
            href={d.href}
          />
        ))}
      </section>

      <CrossNav
        to="/systems"
        label={language === 'en' ? 'What I build' : 'Mida ma ehitan'}
        blurb={language === 'en'
          ? 'The disclosures are the research and the arguments. The systems are what I ship under the threat models they describe — tools, security products, and backend services running in production.'
          : 'Avalikustatud on uuringud ja argumendid. Süsteemid on see, mida tarnin nende kirjeldatud ohumudelite all — tööriistad, turvatooted ja tootmises töötavad backend-teenused.'}
        cta={language === 'en' ? 'Browse systems' : 'Sirvi süsteeme'}
      />
    </>
  );
}
