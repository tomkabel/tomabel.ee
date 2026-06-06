import { useState } from 'react';
import { Download, Lock, Shield, Loader2, Check } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function Pgp() {
  const { t } = useTranslation();
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'done'>('idle');

  const handleDownload = () => {
    setDownloadState('downloading');
    setTimeout(() => {
      setDownloadState('done');
      setTimeout(() => setDownloadState('idle'), 2000);
    }, 600);
  };

  return (
    <section id="pgp" className="py-24 bg-radar-bg relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-radar-bg via-[#0a0a0f] to-radar-bg" />
      <div className="absolute top-0 left-[20%] w-[300px] h-[300px] rounded-full bg-radar-signal/5 blur-[80px]" />
      <div className="absolute bottom-0 right-[20%] w-[300px] h-[300px] rounded-full bg-radar-signal/5 blur-[80px]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <div className="bg-radar-surface border border-radar-grid rounded-2xl overflow-hidden">
            <div className="md:flex">
              {/* Icon Side */}
              <div className="md:w-48 flex items-center justify-center bg-gradient-to-br from-radar-signal/10 to-radar-signal/5 p-8">
                <div className="w-16 h-16 rounded-2xl bg-radar-signal/20 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-radar-signal" />
                </div>
              </div>

              {/* Text Side */}
              <div className="p-6 flex-1 flex flex-col justify-center">
                <h2 className="uppercase tracking-wide text-xs font-semibold text-radar-signal mb-2">
                  {t.pgp.title}
                </h2>

                <p className="text-radar-text-secondary mb-5 text-sm">
                  {t.pgp.description}
                </p>

                <a
                  href="/public-key.asc"
                  download="public-key.asc"
                  onClick={(e) => {
                    if (downloadState === 'downloading') {
                      e.preventDefault();
                      return;
                    }
                    handleDownload();
                  }}
                  className={`inline-flex items-center gap-2 bg-radar-signal hover:bg-radar-signal/90 active:bg-radar-signal/80 active:scale-[0.98] text-radar-bg font-semibold px-5 py-2.5 rounded-xl transition-all text-sm min-h-[44px] focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-1 ${
                    downloadState === 'downloading' ? 'opacity-70 cursor-wait' : ''
                  } ${downloadState === 'done' ? 'bg-emerald-500 hover:bg-emerald-500/90' : ''}`}
                >
                  {downloadState === 'downloading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : downloadState === 'done' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {downloadState === 'done' ? 'Downloaded' : t.pgp.download}
                </a>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-radar-text-muted">
            <Shield className="h-4 w-4 text-radar-signal" />
            <span>PGP Key ID: 0x30A8306F110AAAC5</span>
            <span className="text-radar-text-muted">•</span>
            <span>{t.pgp.keyType}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
