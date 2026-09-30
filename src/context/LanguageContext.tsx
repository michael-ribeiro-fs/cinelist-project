// src/context/LanguageContext.tsx
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { LANGUAGES, type LanguageCode } from '../constants/languages';
import { LanguageContext, translationsMap } from './languageContextBase';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem('language') as LanguageCode | null;
    if (stored && LANGUAGES.some((lang) => lang.code === stored)) {
      return stored;
    }
    return 'pt';
  });

  const t = translationsMap[language];

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
