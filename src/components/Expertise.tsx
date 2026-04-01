import { Code, Shield, Eye, MapPin } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function Expertise() {
  const { t } = useTranslation();

  const expertiseItems = [
    {
      icon: Code,
      title: t.expertise.technical.title,
      description: t.expertise.technical.description,
    },
    {
      icon: Eye,
      title: t.expertise.offensive.title,
      description: t.expertise.offensive.description,
    },
    {
      icon: Shield,
      title: t.expertise.defensive.title,
      description: t.expertise.defensive.description,
    },
  ];

  return (
    <section id="expertise" className="section-padding bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh bg-grid opacity-30" aria-hidden="true" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px]" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image & Credentials */}
          <div className="animate-fade-in">
            <div className="relative">
              {/* Image Container */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                <img
                  src="/expert.jpg"
                  alt="Tom Kristian Abel - Founder and Security Consultant at ProksiAbel OÜ"
                  className="object-cover w-full h-full"
                  loading="lazy"
                  decoding="async"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>
            </div>

            {/* Location & Photo Credit */}
            <div className="flex items-center justify-between mt-6 px-2">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4" />
                <span>{t.expertise.location}</span>
              </div>
              <p className="text-xs text-slate-600">{t.expertise.photoCredit}</p>
            </div>
          </div>

          {/* Right - Content */}
          <div className="animate-slide-up stagger-2">
            {/* Header */}
            <div className="mb-8">
              <div className="accent-line mb-4" />
              <h2 className="heading-2 mb-2">{t.expertise.title}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h3 className="text-2xl font-bold text-sky-400">{t.expertise.name}</h3>
                <span className="hidden sm:block w-px h-6 bg-slate-700" />
                <p className="text-lg text-slate-300">{t.expertise.role}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4 mb-10">
              <p className="text-slate-300 text-lg leading-relaxed">
                {t.expertise.bio1}
              </p>
              <p className="text-slate-400 leading-relaxed">
                {t.expertise.bio2}
              </p>
            </div>

            {/* Expertise Cards */}
            <div className="space-y-4">
              {expertiseItems.map((item) => (
                <div 
                  key={item.title}
                  className="group flex items-start gap-4 p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-sky-500/30 hover:bg-slate-800 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-teal-500/20 flex items-center justify-center group-hover:from-sky-500/30 group-hover:to-teal-500/30 transition-all duration-300">
                    <item.icon className="h-6 w-6 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}