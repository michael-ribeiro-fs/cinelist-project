// src/context/LanguageContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { LANGUAGES, type LanguageCode } from '../constants/languages';
import { header } from '../locales/header/header';
import { hero } from '../locales/hero/hero';
import { movieSearch } from '../locales/movieSearch/movieSearch';
// import { pages } from '../locales/pages/pages'; // quando criar

// Constrói o mapa de traduções dinamicamente a partir dos módulos
const translationsMap: Record<LanguageCode, any> = {} as any;
LANGUAGES.forEach((lang) => {
  const code = lang.code;
  translationsMap[code] = {
    header: header[code as keyof typeof header],
    hero: hero[code as keyof typeof hero],
    movieSearch: movieSearch[code as keyof typeof movieSearch],
    // pages: pages[code as keyof typeof pages], // quando criar
  };
});

// Define o tipo Translations inferido a partir do idioma padrão (pt)
type Translations = (typeof translationsMap)['pt'];

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem('language') as LanguageCode | null;
    // Verifica se o código armazenado é válido
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

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
