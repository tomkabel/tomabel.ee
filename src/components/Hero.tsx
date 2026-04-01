import { serviceIcons } from './data';
import { useTranslation } from '../i18n';
import { ArrowRight, Shield, ChevronDown, Lock } from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation();
  const services = [t.services.service1, t.services.service2, t.services.service3];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-[#030407]">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030407] via-[#0a0a0f] to-[#030407]" />
      
      {/* Static accent orbs */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-sm font-medium text-cyan-400">{t.hero.badge}</span>
            </div>

            {/* Main Heading */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {t.hero.heading}
                <span className="block text-cyan-400 mt-2">{t.hero.subheading}</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-400 mb-8 max-w-lg">
              {t.hero.description}
            </p>

            {/* Quote */}
            <div className="relative pl-6 mb-10">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full" />
              <p className="text-lg text-slate-300 italic max-w-lg">
                "{t.hero.quote}"
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                <Lock className="h-5 w-5" />
                {t.hero.bookConsultation}
                <ArrowRight className="h-5 w-5" />
              </a>
              <a 
                href="#services" 
                onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                className="inline-flex items-center justify-center gap-2 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                {t.hero.learnMore}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Services Panel */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5 text-cyan-400" />
                {t.hero.coreServices}
              </h3>

              <div className="space-y-3">
                {services.map((service, index) => {
                  const Icon = serviceIcons[index].icon;
                  return (
                    <div 
                      key={service.title}
                      onClick={() => scrollToSection('contact')}
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/30 hover:bg-slate-800/60 cursor-pointer transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white">{service.title}</h4>
                        <p className="text-sm text-slate-400 line-clamp-1">
                          {service.heroDescription}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-500 flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <button 
            onClick={() => scrollToSection('services')}
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
          >
            <span className="text-sm font-medium">{t.hero.exploreServices}</span>
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030407] to-transparent pointer-events-none" />
    </div>
  );
}