import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';
import { contactInfo } from '../data/contact.tsx';
import { useTranslation } from '../i18n';

export default function Contact() {
  const { t, locale } = useTranslation();
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const subject = locale === 'et' 
      ? 'Kontaktvorm - proksiabel.ee' 
      : 'Contact Form - proksiabel.ee';
    
    const nl = '%0A';
    const body = locale === 'et'
      ? 'Nimi: ' + (name || 'Pole märgitud') + nl + 'E-post: ' + email + nl + nl + 'Sõnum:' + nl + message
      : 'Name: ' + (name || 'Not specified') + nl + 'Email: ' + email + nl + nl + 'Message:' + nl + message;
    
    const mailtoLink = 'mailto:' + contactInfo.email + '?subject=' + encodeURIComponent(subject) + '&body=' + body;
    
    setFormState('sending');
    
    setTimeout(() => {
      window.location.href = mailtoLink;
      setFormState('success');
    }, 500);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            {t.contact.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-slate-800 rounded-xl p-8 text-center hover:shadow-cyan-500/10 transition-all">
            <Mail className="h-10 w-10 text-cyan-500 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-white mb-2">{t.contact.email}</h3>
            <a href={'mailto:' + contactInfo.email} className="text-cyan-400 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:rounded-md px-1 -mx-1 transition-colors">
              {contactInfo.email}
            </a>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-8 text-center hover:shadow-cyan-500/10 transition-all">
            <Phone className="h-10 w-10 text-cyan-500 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-white mb-2">{t.contact.call}</h3>
            <a href={'tel:' + contactInfo.phone} className="text-cyan-400 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:rounded-md px-1 -mx-1 transition-colors">
              {contactInfo.phoneDisplay}
            </a>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-8 text-center hover:shadow-cyan-500/10 transition-all">
            <MessageSquare className="h-10 w-10 text-cyan-500 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-white mb-2">{t.contact.address}</h3>
            <p className="text-gray-300">
              {contactInfo.address.display}
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Send className="h-5 w-5 text-cyan-500" />
              {t.contact.form.title}
            </h3>
            
            {formState === 'success' && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg text-green-400">
                {t.contact.form.success}
              </div>
            )}
            
            {formState === 'error' && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-400">
                {t.contact.form.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t.contact.form.namePlaceholder}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  {t.contact.form.email} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t.contact.form.emailPlaceholder}
                  required
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  {t.contact.form.message} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={t.contact.form.messagePlaceholder}
                  required
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={formState === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {formState === 'sending' ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    {t.contact.form.sending}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    {t.contact.form.send}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
