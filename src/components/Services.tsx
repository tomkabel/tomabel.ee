import { serviceIcons } from './data';
import { useTranslation } from '../i18n';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Services() {
  const { t } = useTranslation();
  const services = [t.services.service1, t.services.service2, t.services.service3];

  return (
    <section id="services" className="section-padding bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mesh bg-grid opacity-50" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="accent-line mx-auto mb-6" />
          <h2 className="heading-2 mb-4">{t.services.title}</h2>
          <p className="body-large text-slate-400 max-w-3xl mx-auto">
            {t.services.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = serviceIcons[index].icon;
            return (
              <div 
                key={service.title}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card Background Glow */}
                <div className="absolute -inset-px bg-gradient-to-br from-sky-500/20 to-teal-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                <div className="relative glass-card-hover h-full p-8">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-shadow duration-300">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <a 
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors group/link"
                  >
                    {t.services.learnMore}
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}