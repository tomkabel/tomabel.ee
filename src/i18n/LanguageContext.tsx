import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language } from './translations';

interface LanguageContextType {
  // The language the enclosed content is written in. Equals the reader's
  // preference everywhere except inside a <LanguageScope>.
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const isLanguage = (value: unknown): value is Language => value === 'en' || value === 'et';

// Remembering the choice is a convenience, not a requirement. localStorage
// throws under a blocking storage policy or a full quota, and a reader in
// private mode should still be able to switch language.
function readStoredLanguage(): Language | null {
  try {
    const saved = localStorage.getItem('language');
    return isLanguage(saved) ? saved : null;
  } catch {
    return null;
  }
}

// First visit: honour the browser's ranked languages (et-EE → et, en-GB → en).
// With no match, fall back to English, the language of the static shell,
// its <meta> tags and structured data, so a crawler or a non-Estonian reader
// never gets Estonian body text under English metadata.
function preferredBrowserLanguage(): Language {
  for (const tag of navigator.languages ?? [navigator.language]) {
    const primary = tag.toLowerCase().split('-')[0];
    if (isLanguage(primary)) return primary;
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() =>
    typeof window === 'undefined' ? 'en' : (readStoredLanguage() ?? preferredBrowserLanguage()),
  );

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('language', lang);
    } catch {
      // Persistence is best-effort; the in-memory choice still applies.
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Marks a subtree as written in one language regardless of the reader's
 * preference — an article that exists only in English. Descendants calling
 * useTranslation() get that language (so shared chrome such as the reader
 * rail matches the text around it), and the DOM carries `lang` so assistive
 * tech pronounces it correctly (WCAG 3.1.2). setLanguage still changes the
 * reader's preference.
 */
export function LanguageScope({ lang, children }: { lang: Language; children: React.ReactNode }) {
  const parent = useTranslation();
  const value: LanguageContextType = { ...parent, language: lang, t: translations[lang] };
  return (
    <LanguageContext.Provider value={value}>
      <div lang={lang} className="contents">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
