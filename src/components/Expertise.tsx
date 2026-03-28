import React from 'react';
import { Code, Shield, Eye } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function Expertise() {
  const { t } = useTranslation();

  return (
    <section id="expertise" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2">
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="/1772115798117.jpg"
                  alt="Tom Kristian Abel - Founder and Security Consultant at ProksiAbel OÜ"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-cyan-500 rounded-lg p-6 shadow-xl">
                <p className="text-white font-bold text-xl">{t.expertise.experience}</p>
              </div>
              <p className="mt-4 text-xs text-gray-500">photo by Maido Parv</p>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:w-1/2">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
              {t.expertise.title}
            </h2>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-cyan-500 mb-2">{t.expertise.name}</h3>
              <p className="text-xl text-gray-300">{t.expertise.role}</p>
            </div>
            <p className="text-gray-300 mb-6">
             {t.expertise.bio1}
            </p>
            <p className="text-gray-300 mb-8">
              {t.expertise.bio2}
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-slate-800 p-3 rounded-lg">
                  <Code className="h-6 w-6 text-cyan-500" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">{t.expertise.technical.title}</h4>
                  <p className="text-gray-300">{t.expertise.technical.description}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-slate-800 p-3 rounded-lg">
                  <Eye className="h-6 w-6 text-cyan-500" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">{t.expertise.offensive.title}</h4>
                  <p className="text-gray-300">{t.expertise.offensive.description}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-slate-800 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-cyan-500" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">{t.expertise.defensive.title}</h4>
                  <p className="text-gray-300">{t.expertise.defensive.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
