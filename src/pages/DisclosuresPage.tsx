import { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import SectionHeader from '../components/site/section-header';
import EntryRow from '../components/site/entry-row';
import CrossNav from '../components/site/cross-nav';
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
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6">
          <div role="tablist" aria-label={language === 'en' ? 'Filter disclosures' : 'Filtreeri avalikustatud'} className="flex flex-wrap gap-x-6 gap-y-2 py-4">
            {available.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
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
