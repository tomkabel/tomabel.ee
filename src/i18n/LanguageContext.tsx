import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Remembering the choice is a convenience, not a requirement. localStorage
// throws under a blocking storage policy or a full quota, and a reader in
// private mode should still be able to switch language.
function readStoredLanguage(): Language | null {
  try {
    const saved = localStorage.getItem('language');
    return saved === 'en' || saved === 'et' ? saved : null;
  } catch {
    return null;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(
    () => (typeof window === 'undefined' ? null : readStoredLanguage()) ?? 'et',
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

// eslint-disable-next-line react-refresh/only-export-components
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
