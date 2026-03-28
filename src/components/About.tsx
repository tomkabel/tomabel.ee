import React from 'react';
import { Building, Mail, Phone, MapPin } from 'lucide-react';
import { contactInfo } from '../data/contact.tsx';
import { useTranslation } from '../i18n';

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {contactInfo.company.name} {t.about.title}
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Professionaalsed küberturbe nõustamise teenused, mis spetsialiseeruvad MITM rünnete ennetamisele
          </p>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">{t.about.companyInfo}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Building className="h-6 w-6 text-cyan-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">{t.about.businessName}</p>
                    <p className="text-gray-300">{contactInfo.company.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 text-cyan-500 mt-1 mr-3 flex-shrink-0 flex items-center justify-center">
                    <span className="text-cyan-500 font-bold">#</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{t.about.registrationCode}</p>
                    <p className="text-gray-300">{contactInfo.company.registrationCode}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-cyan-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">{t.about.businessAddress}</p>
                    <p className="text-gray-300">{contactInfo.address.full}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-cyan-500 mt-1 mr-3 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-white font-medium">{t.about.email}</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-cyan-400 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:rounded-md px-1 -mx-1 transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-cyan-500 mt-1 mr-3 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-white font-medium">{t.about.phone}</p>
                    <a href={`tel:${contactInfo.phone}`} className="text-cyan-400 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:rounded-md px-1 -mx-1 transition-colors">
                      {contactInfo.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">{t.about.mission}</h3>
              <p className="text-gray-300 mb-4">
                {t.about.missionText1}
              </p>
              <p className="text-gray-300 mb-4">
                {t.about.missionText2}
              </p>
              <p className="text-gray-300">
                {t.about.missionText3}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
