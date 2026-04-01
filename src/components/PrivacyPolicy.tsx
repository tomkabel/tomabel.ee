import { useTranslation } from '../i18n';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">{t.legal.privacyTitle}</h1>
        
        <div className="max-w-none text-slate-300">
          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.privacy.intro.title}</h2>
            <p className="text-slate-300 leading-relaxed">
              {t.legal.privacy.intro.text}
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              {t.legal.privacy.intro.text2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.privacy.controller.title}</h2>
            <div className="text-slate-300 space-y-1">
              <p><strong className="text-sky-400">{t.legal.privacy.controller.name}</strong></p>
              <p>{t.legal.privacy.controller.registryCode}</p>
              <p>{t.legal.privacy.controller.address}</p>
              <p>{t.legal.privacy.controller.email}</p>
              <p>{t.legal.privacy.controller.dpo}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.privacy.dataCollected.title}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg text-sky-400 font-medium mb-2">{t.legal.privacy.dataCollected.automatic.title}</h3>
                <p className="text-slate-300 leading-relaxed">{t.legal.privacy.dataCollected.automatic.text}</p>
                <ul className="list-disc list-inside text-slate-300 space-y-1 mt-2">
                  {t.legal.privacy.dataCollected.automatic.items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-slate-300 leading-relaxed mt-2 italic">{t.legal.privacy.dataCollected.automatic.note}</p>
              </div>
              <div>
                <h3 className="text-lg text-sky-400 font-medium mb-2">{t.legal.privacy.dataCollected.provided.title}</h3>
                <p className="text-slate-300 leading-relaxed">{t.legal.privacy.dataCollected.provided.text}</p>
                <ul className="list-disc list-inside text-slate-300 space-y-1 mt-2">
                  {t.legal.privacy.dataCollected.provided.items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.privacy.legalBasis.title}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg text-sky-400 font-medium mb-2">{t.legal.privacy.legalBasis.consent.title}</h3>
                <p className="text-slate-300 leading-relaxed">{t.legal.privacy.legalBasis.consent.text}</p>
              </div>
              <div>
                <h3 className="text-lg text-sky-400 font-medium mb-2">{t.legal.privacy.legalBasis.legitimate.title}</h3>
                <p className="text-slate-300 leading-relaxed">{t.legal.privacy.legalBasis.legitimate.text}</p>
              </div>
              <div>
                <h3 className="text-lg text-sky-400 font-medium mb-2">{t.legal.privacy.legalBasis.legal.title}</h3>
                <p className="text-slate-300 leading-relaxed">{t.legal.privacy.legalBasis.legal.text}</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.privacy.dataUsage.title}</h2>
            <p className="text-slate-300 leading-relaxed">{t.legal.privacy.dataUsage.text}</p>
            <ul className="list-disc list-inside text-slate-300 space-y-1 mt-2">
              {t.legal.privacy.dataUsage.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.privacy.dataSharing.title}</h2>
            <p className="text-slate-300 leading-relaxed">{t.legal.privacy.dataSharing.text}</p>
            <ul className="list-disc list-inside text-slate-300 space-y-1 mt-2">
              {t.legal.privacy.dataSharing.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">{t.legal.privacy.dataSharing.transfers}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.privacy.retention.title}</h2>
            <p className="text-slate-300 leading-relaxed">{t.legal.privacy.retention.text}</p>
            <ul className="list-disc list-inside text-slate-300 space-y-1 mt-2">
              {t.legal.privacy.retention.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.privacy.security.title}</h2>
            <p className="text-slate-300 leading-relaxed">{t.legal.privacy.security.text}</p>
            <ul className="list-disc list-inside text-slate-300 space-y-1 mt-2">
              {t.legal.privacy.security.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.privacy.yourRights.title}</h2>
            <p className="text-slate-300 leading-relaxed mb-2">{t.legal.privacy.yourRights.intro}</p>
            <ul className="list-disc list-inside text-slate-300 space-y-1 mt-2">
              <li>{t.legal.privacy.yourRights.access}</li>
              <li>{t.legal.privacy.yourRights.rectification}</li>
              <li>{t.legal.privacy.yourRights.erasure}</li>
              <li>{t.legal.privacy.yourRights.restriction}</li>
              <li>{t.legal.privacy.yourRights.portability}</li>
              <li>{t.legal.privacy.yourRights.objection}</li>
              <li>{t.legal.privacy.yourRights.complaint}</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">{t.legal.privacy.yourRights.text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.privacy.cookies.title}</h2>
            <p className="text-slate-300 leading-relaxed">{t.legal.privacy.cookies.text}</p>
            <p className="text-slate-300 leading-relaxed mt-2">{t.legal.privacy.cookies.text2}</p>
            <p className="text-slate-300 leading-relaxed mt-2"><strong className="text-sky-400">{t.legal.privacy.cookies.essential}</strong></p>
            <p className="text-slate-300 leading-relaxed mt-2"><strong className="text-red-400">{t.legal.privacy.cookies.noAnalytics}</strong></p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.privacy.changes.title}</h2>
            <p className="text-slate-300 leading-relaxed">{t.legal.privacy.changes.text}</p>
            <p className="text-slate-300 leading-relaxed mt-2">{t.legal.privacy.changes.text2}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.privacy.contact.title}</h2>
            <p className="text-slate-300 leading-relaxed">{t.legal.privacy.contact.text}</p>
            <p className="text-sky-400 mt-2">{t.legal.privacy.contact.email}</p>
            <p className="text-slate-300 mt-2">{t.legal.privacy.contact.address}</p>
            <p className="text-slate-300 mt-4">{t.legal.privacy.contact.aki}</p>
            <p className="text-slate-300">{t.legal.privacy.contact.akiAddress}</p>
            <p className="text-sky-400">{t.legal.privacy.contact.akiEmail}</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm">
            {t.legal.lastUpdated}: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
