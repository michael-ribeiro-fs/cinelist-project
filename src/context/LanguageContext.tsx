import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { header } from '../locales/header/header';
import { hero } from '../locales/hero/hero';
import { movieSearch } from '../locales/movieSearch/movieSearch';

type LanguageCode = 'pt' | 'en' | 'es' | 'fr' | 'zh' | 'ar' | 'ru' | 'hi';

// Infere os tipos de cada bloco a partir do idioma padrão (pt)
type HeaderTranslations = typeof header.pt;
type HeroTranslations = typeof hero.pt;
type MovieSearchTranslations = typeof movieSearch.pt;

export interface Translations {
  header: HeaderTranslations;
  hero: HeroTranslations;
  movieSearch: MovieSearchTranslations;
}

// Função que monta o objeto de traduções completo para um idioma
function getTranslations(lang: LanguageCode): Translations {
  return {
    header: header[lang as keyof typeof header] as Translations['header'],
    hero: hero[lang as keyof typeof hero] as Translations['hero'],
    movieSearch: movieSearch[lang as keyof typeof movieSearch] as Translations['movieSearch'],
  };
}

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem('language') as LanguageCode;
    const validLanguages: LanguageCode[] = ['pt', 'en', 'es', 'fr', 'zh', 'ar', 'ru', 'hi'];
    return stored && validLanguages.includes(stored) ? stored : 'pt';
  });

  const t = getTranslations(language);

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
