// src/context/languageContextBase.ts
import { createContext } from 'react';
import { LANGUAGES, type LanguageCode } from '../constants/languages';
import { header } from '../locales/header/header';
import { hero } from '../locales/hero/hero';
import { movieSearch } from '../locales/movieSearch/movieSearch';
import { movieCarousel } from '../locales/movieCarousel/movieCarousel';
import { featuredMovie } from '../locales/featuredMovie/featuredMovie';
import { register } from '../locales/register/register';
import { footer } from '../locales/footer/footer';

// ============================================
// TIPAGEM FORTE (sem any!)
// ============================================

export type Translations = {
  header: typeof header.pt;
  hero: typeof hero.pt;
  movieSearch: typeof movieSearch.pt;
  movieCarousel: typeof movieCarousel.pt;
  featuredMovie: typeof featuredMovie.pt;
  register: typeof register.pt;
  footer: typeof footer.pt;
};

// ============================================
// MAPA DE TRADUÇÕES
// ============================================

export const translationsMap = {} as Record<LanguageCode, Translations>;

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
  };
});

// ============================================
// CONTEXTO (só o objeto, sem componente)
// ============================================

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
