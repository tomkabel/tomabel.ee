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
    <section id="expertise" className="py-24 bg-[#030407] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030407] via-[#0a0a0f] to-[#030407]" />
      <div className="absolute top-0 left-[20%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      <div className="absolute bottom-0 right-[10%] w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left - Image */}
          <div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5" />
              <img
                src="/expert.jpg"
                alt="Tom Kristian Abel - Founder and Security Consultant at ProksiAbel OÜ"
                className="object-cover w-full h-full"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030407] via-transparent to-transparent" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />
              <span>{t.expertise.location}</span>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.expertise.title}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h3 className="text-xl font-bold text-cyan-400">{t.expertise.name}</h3>
                <span className="hidden sm:block w-px h-6 bg-slate-700" />
                <p className="text-slate-300">{t.expertise.role}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4 mb-10 max-w-xl">
              <p className="text-slate-300 text-base leading-relaxed">
                {t.expertise.bio1}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.expertise.bio2}
              </p>
            </div>

            {/* Expertise Cards */}
            <div className="space-y-4">
              {expertiseItems.map((item) => (
                <div 
                  key={item.title}
                  className="flex items-start gap-5 p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-cyan-400" />
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