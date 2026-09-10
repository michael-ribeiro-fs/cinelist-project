// src/constants/tmdbLanguage.ts
import type { LanguageCode } from './languages';

/**
 * Mapeamento do código de idioma do projeto para o locale aceito pela TMDB.
 * Referência: https://developer.themoviedb.org/docs/languages
 */
export const TMDB_LOCALE: Record<LanguageCode, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  zh: 'zh-CN',
  ar: 'ar-SA',
  ru: 'ru-RU',
  hi: 'hi-IN',
};