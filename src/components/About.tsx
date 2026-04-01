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
    <section id="about" className="section-padding bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh bg-grid opacity-30" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px]" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px]" aria-hidden="true" />

      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="accent-line mx-auto mb-6" />
          <h2 className="heading-2 mb-4">
            {contactInfo.company.name} {t.about.title}
          </h2>
          <p className="body-large text-slate-400 max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Company Info Card */}
          <div className="lg:col-span-2 animate-slide-up">
            <div className="glass-card p-8">
              <h3 className="heading-3 mb-6 flex items-center gap-3">
                <Building className="h-6 w-6 text-sky-400" />
                {t.about.companyInfo}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                      <Building className="h-5 w-5 text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">{t.about.businessName}</p>
                      <p className="text-white font-medium">{contactInfo.company.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sky-400 font-bold text-lg">#</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">{t.about.registrationCode}</p>
                      <p className="text-white font-medium">{contactInfo.company.registrationCode}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">{t.about.businessAddress}</p>
                      <p className="text-white font-medium">{contactInfo.address.full}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">{t.about.email}</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-sky-400 hover:text-sky-300 transition-colors font-medium">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">{t.about.phone}</p>
                      <a href={`tel:${contactInfo.phone}`} className="text-sky-400 hover:text-sky-300 transition-colors font-medium">
                        {contactInfo.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Card */}
          <div className="animate-slide-up stagger-2">
            <div className="glass-card p-8 h-full">
              <h3 className="heading-3 mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6 text-teal-400" />
                {t.about.productsTitle}
              </h3>
              <p className="text-slate-400 mb-6">
                {t.about.productsIntro}
              </p>
              
              <div className="space-y-4">
                {products.map((product) => (
                  <div 
                    key={product.title}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                      <product.icon className="h-4 w-4 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{product.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-3">{product.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Card - Full Width */}
          <div className="lg:col-span-3 animate-slide-up stagger-3">
            <div className="glass-card p-8 md:p-10">
              <h3 className="heading-3 mb-6 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-sky-400" />
                {t.about.mission}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 to-teal-500 rounded-full" />
                  <p className="text-slate-300 leading-relaxed">
                    {t.about.missionText1}
                  </p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 to-teal-500 rounded-full" />
                  <p className="text-slate-300 leading-relaxed">
                    {t.about.missionText2}
                  </p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 to-teal-500 rounded-full" />
                  <p className="text-slate-300 leading-relaxed">
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