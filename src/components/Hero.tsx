import React from 'react';
import { serviceIcons } from './data';
import { images } from '../config/images';
import { useTranslation } from '../i18n';

export default function Hero() {
  const { t } = useTranslation();
  const services = [t.services.service1, t.services.service2, t.services.service3];

  return (
    <div className="relative bg-slate-900 pt-16">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url('${images.hero}')` }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">{t.hero.heading}</span>
            <span className="block text-cyan-500">{t.hero.subheading}</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {t.hero.description}
          </p>
          <blockquote className="mt-6 max-w-2xl mx-auto text-lg text-cyan-500 italic">
            {t.hero.quote}
          </blockquote>
          <div className="mt-10 flex justify-center gap-4">
            <a href="#contact" className="rounded-md px-8 py-3 bg-cyan-500 text-white font-medium hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors">
              {t.hero.bookConsultation}
            </a>
            <a href="#services" className="rounded-md px-8 py-3 border border-cyan-500 text-cyan-500 font-medium hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors">
              {t.hero.learnMore}
            </a>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {services.map((service, index) => {
            const Icon = serviceIcons[index].icon;
            return (
              <div key={service.title} className="flex flex-col items-center p-6 bg-slate-800/50 rounded-lg backdrop-blur-sm">
                <Icon className="h-12 w-12 text-cyan-500 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-white mb-2 text-center">{service.title}</h3>
                <p className="text-gray-300 text-center">{service.heroDescription}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
