import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Shield, Key, X, Loader2 } from 'lucide-react';
import { useTranslation } from '../i18n';
import { contactInfo } from '../data/contact';
import { onScrollFrame } from '../lib/scroll';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CtaSection() {
  const { t, language } = useTranslation();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [messageSent, setMessageSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    let rafId: number;
    function update() {
      const rect = el!.getBoundingClientRect();
      const wh = window.innerHeight;
      let intensity = 0;
      if (rect.top < wh && rect.bottom > 0) {
        intensity = Math.min(1, Math.max(0, 1 - rect.top / wh));
      }
      glow!.style.opacity = String(intensity);
      glow!.style.background = intensity > 0
        ? `radial-gradient(circle at center, rgba(245, 158, 11, ${0.08 * intensity}), transparent)`
        : 'transparent';
      glow!.style.filter = `blur(${60 + (1 - intensity) * 40}px)`;
    }

    update();

    return onScrollFrame(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(null);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!EMAIL_REGEX.test(email)) {
      setEmailError(language === 'et' ? 'Palun sisesta kehtiv e-posti aadress' : 'Please enter a valid email address');
      return;
    }
    if (!message.trim()) return;

    setIsSending(true);

    const subject = language === 'et' ? 'Kontaktvorm - proksiabel.ee' : 'Contact Form - proksiabel.ee';
    const nl = '%0A';
    const body = language === 'et'
      ? `Nimi: ${name || 'Pole märgitud'}${nl}E-post: ${email}${nl}${nl}Sõnum:${nl}${message}`
      : `Name: ${name || 'Not specified'}${nl}Email: ${email}${nl}${nl}Message:${nl}${message}`;
    const mailtoLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body).replace(/%0A/g, nl)}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setMessageSent(true);
      setIsSending(false);
      formRef.current?.reset();
    }, 300);
  };

  const clearForm = () => {
    setMessageSent(false);
    setEmailError(null);
    formRef.current?.reset();
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-28 bg-radar-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-radar-bg via-radar-surface-overlay to-radar-bg" />

      {/* Dynamic amber glow */}
      <div
        ref={glowRef}
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-radar-text-primary mb-3">
            {t.cta.title}
          </h2>
          <p className="text-radar-text-secondary text-sm max-w-lg mx-auto">
            {t.cta.description}
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          {/* Legal wrapper note */}
          <div className="flex items-center gap-3 px-4 py-3 mb-8 rounded-xl border border-radar-accent/20 bg-radar-accent/5">
            <Shield className="w-5 h-5 text-radar-accent shrink-0" />
            <p className="text-xs text-radar-accent/80 font-mono">
              {t.cta.legalNote}
            </p>
          </div>

          {/* Form */}
          <div className="bg-radar-surface border border-radar-grid rounded-xl p-6 lg:p-8">
            {messageSent && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 entrance-success" role="status">
                <div className="flex-1">
                  <p className="text-emerald-300 text-sm font-medium">{t.cta.form.success}</p>
                  <p className="text-emerald-400/60 text-xs mt-1">
                    {language === 'et'
                      ? 'Sinu meilikliendi avanemise korral kontrolli, et kõik väljad on õiged.'
                      : 'If your mail client opens, verify all fields are correct.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearForm}
                  className="text-emerald-400/60 hover:text-emerald-300 active:scale-95 transition-all p-1 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-emerald-400 focus-visible:outline-offset-1 rounded"
                  aria-label={language === 'et' ? 'Tühista' : 'Dismiss'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="cta-name" className="block text-sm font-medium text-radar-text-secondary mb-2">
                  {t.cta.form.name}
                </label>
                <input
                  type="text" id="cta-name" name="name"
                  placeholder={t.cta.form.namePlaceholder}
                  autoComplete="name"
                  disabled={isSending}
                  className="w-full px-4 py-3 bg-radar-bg border border-radar-grid rounded-xl text-radar-text-primary placeholder-radar-text-muted focus:outline-none focus:border-radar-signal focus:ring-1 focus:ring-radar-signal disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                />
              </div>
              <div>
                <label htmlFor="cta-email" className="block text-sm font-medium text-radar-text-secondary mb-2">
                  {t.cta.form.email} *
                </label>
                <input
                  type="email" id="cta-email" name="email" required
                  autoComplete="email"
                  disabled={isSending}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'cta-email-error' : undefined}
                  className={`w-full px-4 py-3 bg-radar-bg border rounded-xl text-radar-text-primary placeholder-radar-text-muted focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    emailError
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                      : 'border-radar-grid focus:border-radar-signal focus:ring-radar-signal'
                  }`}
                />
                {emailError && (
                  <p id="cta-email-error" className="text-red-400 text-sm mt-2" role="alert">
                    {emailError}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="cta-message" className="block text-sm font-medium text-radar-text-secondary mb-2">
                  {t.cta.form.message} *
                </label>
                <textarea
                  id="cta-message" name="message" rows={4} required
                  disabled={isSending}
                  placeholder={t.cta.form.messagePlaceholder}
                  className="w-full px-4 py-3 bg-radar-bg border border-radar-grid rounded-xl text-radar-text-primary placeholder-radar-text-muted focus:outline-none focus:border-radar-signal focus:ring-1 focus:ring-radar-signal resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full inline-flex items-center justify-center gap-2 bg-radar-signal hover:bg-radar-signal/90 active:bg-radar-signal/80 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 text-radar-bg font-semibold py-4 rounded-xl transition-all min-h-[48px] focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-2"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.cta.form.sending}
                  </>
                ) : (
                  <>
                    {t.cta.form.send}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* PGP reference */}
          <div className="mt-6 text-center">
            <a
              href="/#pgp"
              className="inline-flex items-center gap-2 text-sm text-radar-text-muted hover:text-radar-accent font-mono transition-colors min-h-[44px] px-2 focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-1 rounded"
            >
              <Key className="w-4 h-4" />
              {t.cta.pgpLink}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
