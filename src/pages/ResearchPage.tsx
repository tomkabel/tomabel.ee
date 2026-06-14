import { useTranslation } from '../i18n/LanguageContext';
import SectionHeader from '../components/site/section-header';
import EntryRow from '../components/site/entry-row';
import { researchEntries } from '../content/site';

export default function ResearchPage() {
  const { language } = useTranslation();

  return (
    <>
      <section className="border-b border-border px-6 pb-20 pt-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="01"
            label={language === 'en' ? 'Research' : 'Uuringud'}
            title={language === 'en' ? 'Long-form technical research.' : 'Pikem tehniline uurimistöö.'}
            intro={language === 'en'
              ? "Each piece follows the same arc: how the system is supposed to work, how it actually breaks, and what that means for the people relying on it. Where research touches live systems, it was disclosed responsibly before publication."
              : 'Iga tükk järgib sama kaart: kuidas süsteem peaks töötama, kuidas see tegelikult murdub ja mida see tähendab inimestele, kes sellele tuginevad. Seal, kus uuringud puudutavad elavaid süsteeme, on need enne avaldamist vastutustundlikult avalikustatud.'}
          />
        </div>
      </section>

      <section aria-labelledby="research-entries">
        <div className="mx-auto max-w-6xl px-6 pt-16">
          <h2
            id="research-entries"
            className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent"
          >
            {language === 'en' ? 'Entries' : 'Sissekanded'}
          </h2>
        </div>
        {researchEntries.map((entry) => (
          <EntryRow
            key={entry.code}
            code={entry.code}
            title={entry.title}
            blurb={entry.blurb}
            type={entry.type}
            meta={entry.keywords ? `Keywords: ${entry.keywords}` : undefined}
          />
        ))}
      </section>
    </>
  );
}
