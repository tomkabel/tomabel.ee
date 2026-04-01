import { Download, Lock, Shield } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function Pgp() {
  const { t } = useTranslation();

  return (
    <section id="pgp" className="py-24 bg-[#030407] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030407] via-[#0a0a0f] to-[#030407]" />
      <div className="absolute top-0 left-[20%] w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />
      <div className="absolute bottom-0 right-[20%] w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="md:flex">
              {/* Icon Side */}
              <div className="md:w-48 flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 p-8">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-cyan-400" />
                </div>
              </div>

              {/* Text Side */}
              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="uppercase tracking-wide text-xs font-semibold text-cyan-400 mb-2">
                  {t.pgp.title}
                </div>
                
                <p className="text-slate-400 mb-5 text-sm">
                  {t.pgp.description}
                </p>

                <a
                  href="/public-key.asc"
                  download="public-key.asc"
                  className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm w-fit"
                >
                  <Download className="h-4 w-4" />
                  {t.pgp.download}
                </a>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-slate-500">
            <Shield className="h-4 w-4 text-cyan-400" />
            <span>PGP Key ID: 0xD7A3F8C9</span>
            <span className="text-slate-600">•</span>
            <span>RSA 4096-bit</span>
          </div>
        </div>
      </div>
    </section>
  );
}