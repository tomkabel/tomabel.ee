import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t.notFound.title}</h2>
        <p className="text-muted mb-8">{t.notFound.description}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 transition-colors"
        >
          {t.notFound.returnHome}
        </Link>
      </div>
    </div>
  );
}
