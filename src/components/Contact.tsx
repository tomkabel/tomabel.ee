import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { contactInfo } from '../data/contact';
import { useTranslation } from '../i18n';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { t, locale } = useTranslation();
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
      setEmailError(locale === 'et' ? 'Palun sisesta kehtiv e-posti aadress' : 'Please enter a valid email address');
      return;
    }

    if (!message.trim()) {
      return;
    }

    const subject = locale === 'et'
      ? 'Kontaktvorm - proksiabel.ee'
      : 'Contact Form - proksiabel.ee';

    const nl = '%0A';
    const body = locale === 'et'
      ? 'Nimi: ' + (name || 'Pole märgitud') + nl + 'E-post: ' + email + nl + nl + 'Sõnum:' + nl + message
      : 'Name: ' + (name || 'Not specified') + nl + 'Email: ' + email + nl + nl + 'Message:' + nl + message;

    const mailtoLink = 'mailto:' + contactInfo.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body).replace(/%0A/g, nl);

    window.location.href = mailtoLink;
    setMessageSent(true);
    formRef.current?.reset();
  };

  const contactMethods = [
    {
      icon: Mail,
      title: t.contact.email,
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: Phone,
      title: t.contact.call,
      value: contactInfo.phoneDisplay,
      href: `tel:${contactInfo.phone}`,
    },
    {
      icon: MapPin,
      title: t.contact.address,
      value: contactInfo.address.display,
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-24 bg-[#030407] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030407] via-[#0a0a0f] to-[#030407]" />
      <div className="absolute top-0 left-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {t.contact.description}
          </p>
        </div>

        {/* Contact Methods - Cards */}
        <div className="grid lg:grid-cols-3 gap-5 mb-12">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.href || undefined}
              className="block bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 rounded-2xl p-6 text-center transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                <method.icon className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">{method.title}</h3>
              <p className={`text-sm ${method.href ? 'text-cyan-400' : 'text-slate-400'}`}>
                {method.value}
              </p>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-xl mx-auto">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center">
                <Send className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">{t.contact.form.title}</h3>
            </div>

            {/* Success Message */}
            {messageSent && (
              <div className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                <p className="text-cyan-300">{t.contact.form.success}</p>
              </div>
            )}

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t.contact.form.namePlaceholder}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  {t.contact.form.email} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t.contact.form.emailPlaceholder}
                  required
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 ${emailError ? 'border-red-500' : 'border-slate-700'}`}
                  autoComplete="email"
                />
                {emailError && (
                  <p id="email-error" className="text-red-400 text-sm mt-2">{emailError}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  {t.contact.form.message} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={t.contact.form.messagePlaceholder}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-3 rounded-xl transition-colors"
              >
                {t.contact.form.send}
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="h-4 w-4" />
                <span>{t.contact.responseTime}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                <span>{t.contact.secureConfidential}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}