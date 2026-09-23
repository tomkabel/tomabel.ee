import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="px-6 py-section">
      <div className="mx-auto grid max-w-6xl gap-y-6 lg:grid-cols-12">
        <p className="label text-warning lg:col-span-12">404</p>
        <h1 className="font-display text-5xl text-foreground lg:col-span-8">{t.notFound.title}</h1>
        <p className="prose-measure text-lg text-muted lg:col-span-7">{t.notFound.description}</p>
        <div className="mt-4 lg:col-span-12">
          <Link to="/" className="btn-primary">
            {t.notFound.returnHome}
          </Link>
        </div>
      </div>
    </section>
  );
}
