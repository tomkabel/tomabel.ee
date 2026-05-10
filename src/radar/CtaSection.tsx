import { useState, useRef } from 'react';
import { ArrowRight, Shield, Key } from 'lucide-react';
import { useTranslation } from '../i18n';
import { contactInfo } from '../data/contact';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CtaSection() {
  const { t, language } = useTranslation();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [messageSent, setMessageSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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

    const subject = language === 'et' ? 'Kontaktvorm - proksiabel.ee' : 'Contact Form - proksiabel.ee';
    const nl = '%0A';
    const body = language === 'et'
      ? `Nimi: ${name || 'Pole märgitud'}${nl}E-post: ${email}${nl}${nl}Sõnum:${nl}${message}`
      : `Name: ${name || 'Not specified'}${nl}Email: ${email}${nl}${nl}Message:${nl}${message}`;
    const mailtoLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body).replace(/%0A/g, nl)}`;
    window.location.href = mailtoLink;
    setMessageSent(true);
    formRef.current?.reset();
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#020203] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020203] via-[#05050f] to-[#020203]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F59E0B]/5 blur-[100px]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F1F5F9] mb-3">
            {t.cta.title}
          </h2>
          <p className="text-[#94A3B8] max-w-lg mx-auto">
            {t.cta.description}
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          {/* Legal wrapper note */}
          <div className="flex items-center gap-3 px-4 py-3 mb-8 rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5">
            <Shield className="w-5 h-5 text-[#F59E0B] shrink-0" />
            <p className="text-xs text-[#F59E0B]/80 font-mono">
              {t.cta.legalNote}
            </p>
          </div>

          {/* Form */}
          <div className="bg-[#040408] border border-[#1a1a2e] rounded-xl p-6 lg:p-8">
            {messageSent && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <p className="text-emerald-300 text-sm">{t.cta.form.success}</p>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="cta-name" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  {t.cta.form.name}
                </label>
                <input
                  type="text" id="cta-name" name="name"
                  placeholder={t.cta.form.namePlaceholder}
                  autoComplete="name"
                  className="w-full px-4 py-3 bg-[#020203] border border-[#1a1a2e] rounded-xl text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]"
                />
              </div>
              <div>
                <label htmlFor="cta-email" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  {t.cta.form.email} *
                </label>
                <input
                  type="email" id="cta-email" name="email" required
                  autoComplete="email"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'cta-email-error' : undefined}
                  className={`w-full px-4 py-3 bg-[#020203] border rounded-xl text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] ${emailError ? 'border-red-500' : 'border-[#1a1a2e]'}`}
                />
                {emailError && <p id="cta-email-error" className="text-red-400 text-sm mt-2">{emailError}</p>}
              </div>
              <div>
                <label htmlFor="cta-message" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  {t.cta.form.message} *
                </label>
                <textarea
                  id="cta-message" name="message" rows={4} required
                  placeholder={t.cta.form.messagePlaceholder}
                  className="w-full px-4 py-3 bg-[#020203] border border-[#1a1a2e] rounded-xl text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-[#020203] font-semibold py-4 rounded-xl transition-colors min-h-[48px]"
              >
                {t.cta.form.send}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* PGP reference */}
          <div className="mt-6 text-center">
            <a
              href="/#pgp"
              className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#F59E0B] font-mono transition-colors"
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
