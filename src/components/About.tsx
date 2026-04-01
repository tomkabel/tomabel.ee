import { Building, Mail, Phone, MapPin, Shield, Wrench, Code, CheckCircle2 } from 'lucide-react';
import { contactInfo } from '../data/contact';
import { useTranslation } from '../i18n';

export default function About() {
  const { t } = useTranslation();

  const products = [
    { icon: Shield, title: t.about.product1Title, desc: t.about.product1Desc },
    { icon: Wrench, title: t.about.product2Title, desc: t.about.product2Desc },
    { icon: Code, title: t.about.product3Title, desc: t.about.product3Desc },
  ];

  return (
    <section id="about" className="py-24 bg-[#030407] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030407] via-[#0a0a0f] to-[#030407]" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {contactInfo.company.name} {t.about.title}
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Company Info Card */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                <Building className="h-5 w-5 text-cyan-400" />
                {t.about.companyInfo}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <Building className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t.about.businessName}</p>
                      <p className="text-white font-medium text-sm">{contactInfo.company.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-400 font-bold text-sm">#</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t.about.registrationCode}</p>
                      <p className="text-white font-medium text-sm font-mono">{contactInfo.company.registrationCode}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t.about.businessAddress}</p>
                      <p className="text-white font-medium text-sm">{contactInfo.address.full}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t.about.email}</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-sm">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t.about.phone}</p>
                      <a href={`tel:${contactInfo.phone}`} className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-sm">
                        {contactInfo.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Card */}
          <div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 lg:p-8 h-full">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                <Shield className="h-5 w-5 text-cyan-400" />
                {t.about.productsTitle}
              </h3>
              <p className="text-slate-400 mb-6 text-sm">
                {t.about.productsIntro}
              </p>
              
              <div className="space-y-3">
                {products.map((product) => (
                  <div 
                    key={product.title}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50"
                  >
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <product.icon className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{product.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-2">{product.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Card - Full Width */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                {t.about.mission}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="relative pl-5">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full" />
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {t.about.missionText1}
                  </p>
                </div>
                <div className="relative pl-5">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full" />
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {t.about.missionText2}
                  </p>
                </div>
                <div className="relative pl-5">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full" />
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {t.about.missionText3}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}