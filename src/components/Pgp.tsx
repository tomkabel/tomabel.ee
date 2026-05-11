import { Download, Lock, Shield } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function Pgp() {
  const { t } = useTranslation();

  return (
    <section id="pgp" className="py-24 bg-[#020203] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020203] via-[#0a0a0f] to-[#020203]" />
      <div className="absolute top-0 left-[20%] w-[300px] h-[300px] rounded-full bg-[#00D4FF]/5 blur-[80px]" />
      <div className="absolute bottom-0 right-[20%] w-[300px] h-[300px] rounded-full bg-[#00D4FF]/5 blur-[80px]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <div className="bg-[#040408] border border-[#1a1a2e] rounded-2xl overflow-hidden">
            <div className="md:flex">
              {/* Icon Side */}
              <div className="md:w-48 flex items-center justify-center bg-gradient-to-br from-[#00D4FF]/10 to-[#00D4FF]/5 p-8">
                <div className="w-16 h-16 rounded-2xl bg-[#00D4FF]/20 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-[#00D4FF]" />
                </div>
              </div>

              {/* Text Side */}
              <div className="p-6 flex-1 flex flex-col justify-center">
                <h2 className="uppercase tracking-wide text-xs font-semibold text-[#00D4FF] mb-2">
                  {t.pgp.title}
                </h2>
                
                <p className="text-[#94A3B8] mb-5 text-sm">
                  {t.pgp.description}
                </p>

                <a
                  href="/public-key.asc"
                  download="public-key.asc"
                  className="inline-flex items-center gap-2 bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-[#020203] font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm w-fit"
                >
                  <Download className="h-4 w-4" />
                  {t.pgp.download}
                </a>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-[#64748B]">
            <Shield className="h-4 w-4 text-[#00D4FF]" />
            <span>PGP Key ID: 0x30A8306F110AAAC5</span>
            <span className="text-[#64748B]">•</span>
            <span>RSA 4096-bit</span>
          </div>
        </div>
      </div>
    </section>
  );
}