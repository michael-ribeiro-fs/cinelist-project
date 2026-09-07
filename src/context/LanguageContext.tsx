// src/context/LanguageContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { LANGUAGES, type LanguageCode } from '../constants/languages';
import { header } from '../locales/header/header';
import { hero } from '../locales/hero/hero';
import { movieSearch } from '../locales/movieSearch/movieSearch';
import { movieCarousel } from '../locales/movieCarousel/movieCarousel';
import { featuredMovie } from '../locales/featuredMovie/featuredMovie';
import { register } from '../locales/register/register';
import { footer } from '../locales/footer/footer';
// import { pages } from '../locales/pages/pages'; // quando criar

// ============================================
// TIPAGEM FORTE (sem any!)
// ============================================

type Translations = {
  header: typeof header.pt;
  hero: typeof hero.pt;
  movieSearch: typeof movieSearch.pt;
  movieCarousel: typeof movieCarousel.pt;
  featuredMovie: typeof featuredMovie.pt;
  register: typeof register.pt;
  footer: typeof footer.pt;
  // pages: typeof pages.pt; // quando criar
};

// ============================================
// CONSTRUÇÃO DO MAPA DE TRADUÇÕES
// ============================================

const translationsMap = {} as Record<LanguageCode, Translations>;

LANGUAGES.forEach((lang) => {
  const code = lang.code;
  translationsMap[code] = {
    header: header[code as keyof typeof header],
    hero: hero[code as keyof typeof hero],
    movieSearch: movieSearch[code as keyof typeof movieSearch],
    movieCarousel: movieCarousel[code as keyof typeof movieCarousel],
    featuredMovie: featuredMovie[code as keyof typeof featuredMovie],
    register: register[code as keyof typeof register],
    footer: footer[code as keyof typeof footer],
    // pages: pages[code as keyof typeof pages], // quando criar
  };
});

// ============================================
// CONTEXTO
// ============================================

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
