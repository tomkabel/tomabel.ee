import { useTranslation } from '../i18n';

// Fixed review date (ISO), rendered identically for every visitor. Not
// `new Date()` — that would falsely claim the policy was updated on page load
// and vary by the reader's locale.
const LAST_UPDATED = '2026-08-10';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pb-section pt-section">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="font-display text-5xl text-foreground mb-8">{t.legal.privacyTitle}</h1>

        <div className="prose-measure text-muted">
          <section className="mb-12">
            <h2 className="font-display text-2xl text-foreground mb-4">{t.legal.privacy.intro.title}</h2>
            <p className="text-muted leading-relaxed">
              {t.legal.privacy.intro.text}
            </p>
            <p className="text-muted leading-relaxed mt-4">
              {t.legal.privacy.intro.text2}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl text-foreground mb-4">{t.legal.privacy.controller.title}</h2>
            <div className="text-muted space-y-1">
              <p><strong className="text-accent">{t.legal.privacy.controller.name}</strong></p>
              <p>{t.legal.privacy.controller.registryCode}</p>
              <p>{t.legal.privacy.controller.address}</p>
              <p>{t.legal.privacy.controller.email}</p>
              <p>{t.legal.privacy.controller.dpo}</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl text-foreground mb-4">{t.legal.privacy.dataCollected.title}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">{t.legal.privacy.dataCollected.automatic.title}</h3>
                <p className="text-muted leading-relaxed">{t.legal.privacy.dataCollected.automatic.text}</p>
                <ul className="list-disc pl-5 text-muted space-y-1 mt-2">
                  {t.legal.privacy.dataCollected.automatic.items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted leading-relaxed mt-2 italic">{t.legal.privacy.dataCollected.automatic.note}</p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">{t.legal.privacy.dataCollected.provided.title}</h3>
                <p className="text-muted leading-relaxed">{t.legal.privacy.dataCollected.provided.text}</p>
                <ul className="list-disc pl-5 text-muted space-y-1 mt-2">
                  {t.legal.privacy.dataCollected.provided.items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl text-foreground mb-4">{t.legal.privacy.legalBasis.title}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">{t.legal.privacy.legalBasis.consent.title}</h3>
                <p className="text-muted leading-relaxed">{t.legal.privacy.legalBasis.consent.text}</p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">{t.legal.privacy.legalBasis.legitimate.title}</h3>
                <p className="text-muted leading-relaxed">{t.legal.privacy.legalBasis.legitimate.text}</p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">{t.legal.privacy.legalBasis.legal.title}</h3>
                <p className="text-muted leading-relaxed">{t.legal.privacy.legalBasis.legal.text}</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl text-foreground mb-4">{t.legal.privacy.dataUsage.title}</h2>
            <p className="text-muted leading-relaxed">{t.legal.privacy.dataUsage.text}</p>
            <ul className="list-disc pl-5 text-muted space-y-1 mt-2">
              {t.legal.privacy.dataUsage.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl text-foreground mb-4">{t.legal.privacy.dataSharing.title}</h2>
            <p className="text-muted leading-relaxed">{t.legal.privacy.dataSharing.text}</p>
            <ul className="list-disc pl-5 text-muted space-y-1 mt-2">
              {t.legal.privacy.dataSharing.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-muted leading-relaxed mt-4">{t.legal.privacy.dataSharing.transfers}</p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl text-foreground mb-4">{t.legal.privacy.retention.title}</h2>
            <p className="text-muted leading-relaxed">{t.legal.privacy.retention.text}</p>
            <ul className="list-disc pl-5 text-muted space-y-1 mt-2">
              {t.legal.privacy.retention.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl text-foreground mb-4">{t.legal.privacy.security.title}</h2>
            <p className="text-muted leading-relaxed">{t.legal.privacy.security.text}</p>
            <ul className="list-disc pl-5 text-muted space-y-1 mt-2">
              {t.legal.privacy.security.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl text-foreground mb-4">{t.legal.privacy.yourRights.title}</h2>
            <p className="text-muted leading-relaxed mb-2">{t.legal.privacy.yourRights.intro}</p>
            <ul className="list-disc pl-5 text-muted space-y-1 mt-2">
              <li>{t.legal.privacy.yourRights.access}</li>
              <li>{t.legal.privacy.yourRights.rectification}</li>
              <li>{t.legal.privacy.yourRights.erasure}</li>
              <li>{t.legal.privacy.yourRights.restriction}</li>
              <li>{t.legal.privacy.yourRights.portability}</li>
              <li>{t.legal.privacy.yourRights.objection}</li>
              <li>{t.legal.privacy.yourRights.complaint}</li>
            </ul>
            <p className="text-muted leading-relaxed mt-4">{t.legal.privacy.yourRights.text}</p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl text-foreground mb-4">{t.legal.privacy.cookies.title}</h2>
            <p className="text-muted leading-relaxed">{t.legal.privacy.cookies.text}</p>
            <p className="text-muted leading-relaxed mt-2">{t.legal.privacy.cookies.text2}</p>
            <p className="text-muted leading-relaxed mt-2"><strong className="text-accent">{t.legal.privacy.cookies.essential}</strong></p>
            <p className="text-muted leading-relaxed mt-2"><strong className="text-red-400">{t.legal.privacy.cookies.noAnalytics}</strong></p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl text-foreground mb-4">{t.legal.privacy.changes.title}</h2>
            <p className="text-muted leading-relaxed">{t.legal.privacy.changes.text}</p>
            <p className="text-muted leading-relaxed mt-2">{t.legal.privacy.changes.text2}</p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl text-foreground mb-4">{t.legal.privacy.contact.title}</h2>
            <p className="text-muted leading-relaxed">{t.legal.privacy.contact.text}</p>
            <p className="text-accent mt-2">{t.legal.privacy.contact.email}</p>
            <p className="text-muted mt-2">{t.legal.privacy.contact.address}</p>
            <p className="text-muted mt-4">{t.legal.privacy.contact.aki}</p>
            <p className="text-muted">{t.legal.privacy.contact.akiAddress}</p>
            <p className="text-accent">{t.legal.privacy.contact.akiEmail}</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-subtle text-sm">
            {t.legal.lastUpdated}: {LAST_UPDATED}
          </p>
        </div>
      </div>
    </div>
  );
}
