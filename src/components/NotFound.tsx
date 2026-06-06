import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-radar-bg pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl font-bold text-radar-signal mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-radar-text-primary mb-4">{t.notFound.title}</h2>
        <p className="text-radar-text-secondary mb-8">{t.notFound.description}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-radar-signal text-radar-bg font-semibold rounded-xl hover:bg-radar-signal/90 transition-colors"
        >
          {t.notFound.returnHome}
        </Link>
      </div>
    </div>
  );
}
