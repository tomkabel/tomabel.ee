import React from 'react';
import { translations } from '../i18n/translations';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override render() {
    if (this.state.hasError) {
      // This boundary wraps the LanguageProvider (main.tsx), so the context is
      // gone by the time we render. The provider mirrors the active language
      // onto <html lang>, which survives the crash.
      const t = translations[document.documentElement.lang === 'et' ? 'et' : 'en'].app.error;
      return this.props.fallback || (
        <div className="grid min-h-screen place-items-center bg-background px-6">
          <div className="grid max-w-md gap-y-4">
            <p className="label text-danger">{t.label}</p>
            <h1 className="font-display text-4xl text-foreground">{t.title}</h1>
            <p className="mb-4 text-muted">{t.body}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary w-fit"
            >
              {t.refresh}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
