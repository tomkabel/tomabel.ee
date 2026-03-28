import React from 'react';
import { Key } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function Pgp() {
  const { t } = useTranslation();

  return (
    <footer id="pgp" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-slate-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <div className="h-48 w-full object-cover md:w-48 flex items-center justify-center bg-cyan-500">
                <Key className="h-24 w-24 text-white" aria-hidden="true" />
              </div>
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-cyan-400 font-semibold">
                {t.pgp.title}
              </div>
              <p className="mt-2 text-gray-300">
                {t.pgp.description}
              </p>
              <div className="mt-4">
                <a
                  href="/public-key.asc"
                  download="public-key.asc"
                  className="inline-block bg-cyan-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
                >
                  {t.pgp.download}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
