import { serviceIcons } from './data';
import { useTranslation } from '../i18n';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Services() {
  const { t } = useTranslation();
  const services = [t.services.service1, t.services.service2, t.services.service3];

  return (
    <section id="services" className="py-24 bg-[#030407] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030407] via-[#0a0a0f] to-[#030407]" />
      <div className="absolute top-0 right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      <div className="absolute bottom-0 left-[5%] w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.services.title}
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            {t.services.description}
          </p>
        </div>

        {/* Services Grid - Reduced gap */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = serviceIcons[index].icon;
            return (
              <div 
                key={service.title}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/30 transition-colors flex flex-col"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-cyan-400" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 mb-6 flex-grow text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More */}
                <a 
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors mt-auto"
                >
                  {t.services.learnMore}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}