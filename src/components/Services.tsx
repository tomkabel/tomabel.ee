import React from 'react';
import { serviceIcons } from './data';
import { useTranslation } from '../i18n';

export default function Services() {
  const { t } = useTranslation();
  const services = [t.services.service1, t.services.service2, t.services.service3];

  return (
    <section id="services" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            {t.services.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {services.map((service, index) => {
            const Icon = serviceIcons[index].icon;
            return (
              <div key={service.title} className="bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-cyan-500/10 transition-all">
                <Icon className="h-12 w-12 text-cyan-500 mb-6" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-white mb-4 text-center">{service.title}</h3>
                <p className="text-gray-300 text-center">{service.description}</p>
                <ul className="mt-6 space-y-2 text-gray-300">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <span className="text-cyan-500 mr-2" aria-hidden="true">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
