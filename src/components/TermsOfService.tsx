import React from 'react';
import { useTranslation } from '../i18n';

export default function TermsOfService() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">{t.legal.termsTitle}</h1>
        
        <div className="prose prose-invert prose-cyan max-w-none">
          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">{t.legal.terms.intro.title}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t.legal.terms.intro.text}
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              {t.legal.terms.intro.text2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">{t.legal.terms.services.title}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t.legal.terms.services.text}
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
              {t.legal.terms.services.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              {t.legal.terms.services.text2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">{t.legal.terms.intellectual.title}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t.legal.terms.intellectual.text}
            </p>
            <p className="text-gray-300 leading-relaxed mt-2">
              {t.legal.terms.intellectual.text2}
            </p>
            <p className="text-gray-300 leading-relaxed mt-2">
              {t.legal.terms.intellectual.text3}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">{t.legal.terms.userObligations.title}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t.legal.terms.userObligations.text}
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
              {t.legal.terms.userObligations.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">{t.legal.terms.Disclaimer.title}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t.legal.terms.Disclaimer.text}
            </p>
            <p className="text-gray-300 leading-relaxed mt-2">
              {t.legal.terms.Disclaimer.text2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">{t.legal.terms.thirdParty.title}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t.legal.terms.thirdParty.text}
            </p>
            <p className="text-gray-300 leading-relaxed mt-2">
              {t.legal.terms.thirdParty.text2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">{t.legal.terms.limitation.title}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t.legal.terms.limitation.text}
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
              {t.legal.terms.limitation.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-gray-300 leading-relaxed mt-2">
              {t.legal.terms.limitation.text2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">{t.legal.terms.indemnification.title}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t.legal.terms.indemnification.text}
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
              {t.legal.terms.indemnification.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">{t.legal.terms.governingLaw.title}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t.legal.terms.governingLaw.text}
            </p>
            <p className="text-gray-300 leading-relaxed mt-2">
              {t.legal.terms.governingLaw.text2}
            </p>
            <p className="text-gray-300 leading-relaxed mt-2">
              {t.legal.terms.governingLaw.text3}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">{t.legal.terms.termination.title}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t.legal.terms.termination.text}
            </p>
            <p className="text-gray-300 leading-relaxed mt-2">
              {t.legal.terms.termination.text2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">{t.legal.terms.contact.title}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t.legal.terms.contact.text}
            </p>
            <p className="text-cyan-400 mt-2">
              {t.legal.terms.contact.email}
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-gray-500 text-sm">
            {t.legal.lastUpdated}: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
