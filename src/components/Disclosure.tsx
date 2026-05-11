import { useTranslation } from '../i18n';

export default function Disclosure() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#020203] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#040408] p-4 border border-[#1a1a2e] mb-6 text-sm text-slate-400">
          <strong>{t.disclosure.version}:</strong> 1.0 | <strong>{t.disclosure.published}:</strong> March 28, 2026
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#F1F5F9] mb-2">{t.disclosure.title}</h1>
        <p className="text-xl text-[#00D4FF] font-semibold mb-8">{t.disclosure.subtitle}</p>
        <p className="text-[#94A3B8] mb-8">
          {t.disclosure.intro}
        </p>

        <div className="max-w-none text-[#94A3B8]">
          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.disclosure.purpose.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              {t.disclosure.purpose.text}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.disclosure.whyExists.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed mb-4">
              {t.disclosure.whyExists.text}
            </p>
            <ul className="list-disc list-inside text-[#94A3B8] space-y-1">
              {t.disclosure.whyExists.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.disclosure.guidelines.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed mb-4">
              {t.disclosure.guidelines.text}
            </p>
            <ul className="list-disc list-inside text-[#94A3B8] space-y-3">
              <li>
                <strong>{t.disclosure.guidelines.rateLimit}:</strong> {t.disclosure.guidelines.rateLimitDesc}
              </li>
              <li>
                <strong>{t.disclosure.guidelines.userAgent}:</strong> {t.disclosure.guidelines.userAgentDesc}
                <br />
                <code className="text-sm bg-[#040408] px-2 py-1 rounded mt-1 inline-block">
                  Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 [Security Researcher: Tom Kristian Abel; +https://proksiabel.ee/disclosure]
                </code>
              </li>
              <li>
                <strong>{t.disclosure.guidelines.customHeaders}:</strong> {t.disclosure.guidelines.customHeadersDesc}
                <br />
                <code className="text-sm bg-[#040408] px-2 py-1 rounded mt-1 inline-block">X-Security-Scanner: ProksiAbel-SecurityResearch-2026</code>
                <br />
                <code className="text-sm bg-[#040408] px-2 py-1 rounded mt-1 inline-block">X-Contact: security@proksiabel.ee</code>
              </li>
              <li>
                <strong>{t.disclosure.guidelines.optOut}:</strong> {t.disclosure.guidelines.optOutDesc}
                <ul className="list-disc list-inside text-[#94A3B8] ml-6 mt-1">
                  <li>{t.disclosure.guidelines.optOutItems[0]}</li>
                  <li><code className="bg-[#040408] px-1 rounded">Disallow: /</code> to your <code className="bg-[#040408] px-1 rounded">robots.txt</code></li>
                </ul>
                {t.disclosure.guidelines.optOutRespect}
              </li>
              <li>
                <strong>{t.disclosure.guidelines.noExploit}:</strong> {t.disclosure.guidelines.noExploitDesc}
              </li>
              <li>
                <strong>{t.disclosure.guidelines.minimalImpact}:</strong> {t.disclosure.guidelines.minimalImpactDesc}
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.disclosure.ifAccessed.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              {t.disclosure.ifAccessed.text}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.disclosure.contact.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed mb-2">
              {t.disclosure.contact.text}
            </p>
            <ul className="text-[#94A3B8] space-y-1">
              <li><strong>{t.disclosure.contact.email}:</strong> <a href="mailto:security@proksiabel.ee" className="text-[#00D4FF] hover:underline">{t.disclosure.contact.emailLabel}</a></li>
              <li><strong>{t.disclosure.contact.phone}:</strong> +372 56666981</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.disclosure.company.title}</h2>
            <div className="bg-[#040408] p-4 border border-[#1a1a2e] text-[#94A3B8] space-y-1">
              <p><strong className="text-[#00D4FF]">{t.disclosure.company.businessName}:</strong> ProksiAbel OÜ</p>
              <p><strong className="text-[#00D4FF]">{t.disclosure.company.registrationCode}:</strong> 17017826</p>
              <p><strong className="text-[#00D4FF]">{t.disclosure.company.address}:</strong> Pargi tn 2 Sindi, Tori vald, Pärnumaa 86705, Estonia</p>
              <p><strong className="text-[#00D4FF]">{t.disclosure.company.contact}:</strong> Tom Kristian Abel</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.disclosure.pgp.title}</h2>
            <div className="bg-[#040408] p-4 border border-[#1a1a2e] text-[#94A3B8] space-y-2">
              <p>
                <a href="/public-key.asc" className="text-[#00D4FF] hover:underline">{t.disclosure.pgp.download}</a>
              </p>
              <p><strong className="text-[#00D4FF]">{t.disclosure.pgp.keyId}:</strong> 0x30A8306F110AAAC5</p>
              <p><strong className="text-[#00D4FF]">{t.disclosure.pgp.fingerprint}:</strong> 03D8E5A59306ECB7025A21090CA0C6F110AAAC500</p>
              <p><strong className="text-[#00D4FF]">{t.disclosure.pgp.sha256}:</strong> a63667ca9b1729e02b24c19cf2441953b76b934417a17b042fd1eeab68d8530a</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-[#00D4FF] font-semibold mb-4">{t.disclosure.acknowledgments.title}</h2>
            <p className="text-[#94A3B8] leading-relaxed">
              {t.disclosure.acknowledgments.text}
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a1a2e]">
          <p className="text-[#64748B] text-sm">
            {t.disclosure.generalInquiries}: <a href="mailto:info@proksiabel.ee" className="text-[#00D4FF] hover:underline">info@proksiabel.ee</a>
          </p>
        </div>
      </div>
    </div>
  );
}
