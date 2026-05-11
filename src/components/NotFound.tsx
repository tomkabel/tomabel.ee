import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#020203] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl font-bold text-[#00D4FF] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#F1F5F9] mb-4">{t.notFound.title}</h2>
        <p className="text-[#94A3B8] mb-8">{t.notFound.description}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#00D4FF] text-[#020203] font-semibold rounded-xl hover:bg-[#00D4FF]/90 transition-colors"
        >
          {t.notFound.returnHome}
        </Link>
      </div>
    </div>
  );
}
