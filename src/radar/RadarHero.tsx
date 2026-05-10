import { useTranslation } from '../i18n';
import RadarChart from './RadarChart';
import { capabilityAxes } from './capability-data';

export default function RadarHero() {
  const { t } = useTranslation();

  const handleAxisFocus = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#020203] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020203] via-[#05050f] to-[#020203]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F1F5F9] mb-3 tracking-tight">
          TOM KRISTIAN ABEL
        </h1>
        <p className="text-[#94A3B8] text-base md:text-lg max-w-xl mb-8">
          {t.radarHero.subtitle}
        </p>

        <div className="w-full max-w-[400px] mx-auto mb-6">
          <RadarChart
            axes={capabilityAxes}
            size={400}
            className="w-full h-auto"
            onAxisFocus={handleAxisFocus}
          />
        </div>

        <p className="text-[#64748B] text-xs font-mono">
          ProksiAbel O&mdash; B2B Partnership
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020203] to-transparent pointer-events-none" />
    </section>
  );
}
