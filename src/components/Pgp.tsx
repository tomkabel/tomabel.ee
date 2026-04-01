import { Key } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function Pgp() {
  const { t } = useTranslation();

  return (
    <section id="pgp" className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh bg-grid opacity-30" aria-hidden="true" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" aria-hidden="true" />
      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <div className="h-48 w-full md:w-48 flex items-center justify-center bg-sky-500">
                <Key className="h-24 w-24 text-white" aria-hidden="true" />
              </div>
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-sky-400 font-semibold">
                {t.pgp.title}
              </div>
              <p className="mt-2 text-slate-300">
                {t.pgp.description}
              </p>
              <div className="mt-4">
                <a
                  href="/public-key.asc"
                  download="public-key.asc"
                  className="inline-block bg-sky-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
                >
                  {t.pgp.download}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
