import { useTranslation } from '../i18n';

export default function CookiePolicy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">{t.legal.cookiesTitle}</h1>
        
        <div className="max-w-none text-slate-300">
          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.cookies.intro.title}</h2>
            <p className="text-slate-300 leading-relaxed">
              {t.legal.cookies.intro.text}
            </p>
            <p className="text-slate-300 leading-relaxed mt-4 bg-slate-800 p-4 rounded-lg border-l-4 border-sky-500">
              {t.legal.cookies.intro.text2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.cookies.whatAre.title}</h2>
            <p className="text-slate-300 leading-relaxed">
              {t.legal.cookies.whatAre.text}
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              {t.legal.cookies.whatAre.text2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.cookies.ourApproach.title}</h2>
            <p className="text-slate-300 leading-relaxed">
              {t.legal.cookies.ourApproach.text}
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <span className="text-green-400 font-semibold">✓</span>
                <span className="text-slate-300 ml-2">{t.legal.cookies.ourApproach.noCookies}</span>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <span className="text-green-400 font-semibold">✓</span>
                <span className="text-slate-300 ml-2">{t.legal.cookies.ourApproach.noTracking}</span>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <span className="text-green-400 font-semibold">✓</span>
                <span className="text-slate-300 ml-2">{t.legal.cookies.ourApproach.noProfiling}</span>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <span className="text-green-400 font-semibold">✓</span>
                <span className="text-slate-300 ml-2">{t.legal.cookies.ourApproach.noThirdParty}</span>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg md:col-span-2">
                <span className="text-green-400 font-semibold">✓</span>
                <span className="text-slate-300 ml-2">{t.legal.cookies.ourApproach.securityOnly}</span>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.cookies.cookiesUsed.title}</h2>
            <p className="text-slate-300 leading-relaxed">
              {t.legal.cookies.cookiesUsed.text}
            </p>
            <div className="bg-slate-800 p-6 rounded-lg mt-4">
              <h3 className="text-lg text-sky-400 font-semibold mb-3">{t.legal.cookies.cookiesUsed.cloudflare.name}</h3>
              <div className="space-y-2 text-slate-300">
                <p><strong>Provider:</strong> {t.legal.cookies.cookiesUsed.cloudflare.provider}</p>
                <p><strong>Purpose:</strong> {t.legal.cookies.cookiesUsed.cloudflare.purpose}</p>
                <p><strong>Duration:</strong> {t.legal.cookies.cookiesUsed.cloudflare.duration}</p>
                <p><strong>Type:</strong> {t.legal.cookies.cookiesUsed.cloudflare.type}</p>
                <p><strong>Legal Basis:</strong> {t.legal.cookies.cookiesUsed.cloudflare.legalBasis}</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mt-4 italic">
              {t.legal.cookies.cookiesUsed.note}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.cookies.analytics.title}</h2>
            <p className="text-slate-300 leading-relaxed">
              {t.legal.cookies.analytics.text}
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mt-4">
              {t.legal.cookies.analytics.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              {t.legal.cookies.analytics.summary}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.cookies.consent.title}</h2>
            <p className="text-slate-300 leading-relaxed">
              {t.legal.cookies.consent.text}
            </p>
            <p className="text-slate-300 leading-relaxed mt-2">
              {t.legal.cookies.consent.text2}
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-1 mt-2">
              {t.legal.cookies.consent.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              {t.legal.cookies.consent.text3}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.cookies.browserSettings.title}</h2>
            <p className="text-slate-300 leading-relaxed">
              {t.legal.cookies.browserSettings.text}
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-1 mt-2">
              {t.legal.cookies.browserSettings.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              {t.legal.cookies.browserSettings.text2}
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-1 mt-2">
              {t.legal.cookies.browserSettings.items2.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.cookies.updates.title}</h2>
            <p className="text-slate-300 leading-relaxed">
              {t.legal.cookies.updates.text}
            </p>
            <p className="text-slate-300 leading-relaxed mt-2">
              {t.legal.cookies.updates.text2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-sky-500 font-semibold mb-4">{t.legal.cookies.contact.title}</h2>
            <p className="text-slate-300 leading-relaxed">
              {t.legal.cookies.contact.text}
            </p>
            <p className="text-sky-400 mt-2">
              {t.legal.cookies.contact.email}
            </p>
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
