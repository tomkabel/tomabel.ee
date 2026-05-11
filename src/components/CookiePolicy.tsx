import { useTranslation } from '../i18n';

export default function CookiePolicy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#020203] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#F1F5F9] mb-8">{t.legal.cookiesTitle}</h1>
        
        <div className="max-w-none text-[#94A3B8]">
          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.legal.cookies.intro.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              {t.legal.cookies.intro.text}
            </p>
            <p className="text-[#94A3B8] leading-relaxed mt-4 p-4 rounded-xl border border-[#00D4FF]/20 bg-[#00D4FF]/5">
              {t.legal.cookies.intro.text2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.legal.cookies.whatAre.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              {t.legal.cookies.whatAre.text}
            </p>
            <p className="text-[#94A3B8] leading-relaxed mt-4">
              {t.legal.cookies.whatAre.text2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.legal.cookies.ourApproach.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              {t.legal.cookies.ourApproach.text}
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-[#040408] border border-[#1a1a2e] p-4 rounded-xl">
                <span className="text-[#00D4FF] font-semibold">✓</span>
                <span className="text-[#94A3B8] ml-2">{t.legal.cookies.ourApproach.noCookies}</span>
              </div>
              <div className="bg-[#040408] border border-[#1a1a2e] p-4 rounded-xl">
                <span className="text-[#00D4FF] font-semibold">✓</span>
                <span className="text-[#94A3B8] ml-2">{t.legal.cookies.ourApproach.noTracking}</span>
              </div>
              <div className="bg-[#040408] border border-[#1a1a2e] p-4 rounded-xl">
                <span className="text-[#00D4FF] font-semibold">✓</span>
                <span className="text-[#94A3B8] ml-2">{t.legal.cookies.ourApproach.noProfiling}</span>
              </div>
              <div className="bg-[#040408] border border-[#1a1a2e] p-4 rounded-xl">
                <span className="text-[#00D4FF] font-semibold">✓</span>
                <span className="text-[#94A3B8] ml-2">{t.legal.cookies.ourApproach.noThirdParty}</span>
              </div>
              <div className="bg-[#040408] border border-[#1a1a2e] p-4 rounded-xl md:col-span-2">
                <span className="text-[#00D4FF] font-semibold">✓</span>
                <span className="text-[#94A3B8] ml-2">{t.legal.cookies.ourApproach.securityOnly}</span>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.legal.cookies.cookiesUsed.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              {t.legal.cookies.cookiesUsed.text}
            </p>
            <div className="bg-[#040408] border border-[#1a1a2e] p-6 rounded-xl mt-4">
              <h3 className="text-lg text-[#00D4FF] font-semibold mb-3">{t.legal.cookies.cookiesUsed.cloudflare.name}</h3>
              <div className="space-y-2 text-[#94A3B8]">
                <p><strong>Provider:</strong> {t.legal.cookies.cookiesUsed.cloudflare.provider}</p>
                <p><strong>Purpose:</strong> {t.legal.cookies.cookiesUsed.cloudflare.purpose}</p>
                <p><strong>Duration:</strong> {t.legal.cookies.cookiesUsed.cloudflare.duration}</p>
                <p><strong>Type:</strong> {t.legal.cookies.cookiesUsed.cloudflare.type}</p>
                <p><strong>Legal Basis:</strong> {t.legal.cookies.cookiesUsed.cloudflare.legalBasis}</p>
              </div>
            </div>
            <p className="text-[#94A3B8] leading-relaxed mt-4 italic">
              {t.legal.cookies.cookiesUsed.note}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.legal.cookies.analytics.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              {t.legal.cookies.analytics.text}
            </p>
            <ul className="list-disc list-inside text-[#94A3B8] space-y-2 mt-4">
              {t.legal.cookies.analytics.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-[#94A3B8] leading-relaxed mt-4">
              {t.legal.cookies.analytics.summary}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.legal.cookies.consent.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              {t.legal.cookies.consent.text}
            </p>
            <p className="text-[#94A3B8] leading-relaxed mt-2">
              {t.legal.cookies.consent.text2}
            </p>
            <ul className="list-disc list-inside text-[#94A3B8] space-y-1 mt-2">
              {t.legal.cookies.consent.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-[#94A3B8] leading-relaxed mt-4">
              {t.legal.cookies.consent.text3}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.legal.cookies.browserSettings.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              {t.legal.cookies.browserSettings.text}
            </p>
            <ul className="list-disc list-inside text-[#94A3B8] space-y-1 mt-2">
              {t.legal.cookies.browserSettings.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-[#94A3B8] leading-relaxed mt-4">
              {t.legal.cookies.browserSettings.text2}
            </p>
            <ul className="list-disc list-inside text-[#94A3B8] space-y-1 mt-2">
              {t.legal.cookies.browserSettings.items2.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.legal.cookies.updates.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              {t.legal.cookies.updates.text}
            </p>
            <p className="text-[#94A3B8] leading-relaxed mt-2">
              {t.legal.cookies.updates.text2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.legal.cookies.contact.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              {t.legal.cookies.contact.text}
            </p>
            <p className="text-[#00D4FF] mt-2">
              {t.legal.cookies.contact.email}
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a1a2e]">
          <p className="text-[#64748B] text-sm">
            {t.legal.lastUpdated}: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
