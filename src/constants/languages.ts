// src/constants/languages.ts
export const LANGUAGES = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
] as const;

// Extrai o tipo dos códigos válidos
export type LanguageCode = (typeof LANGUAGES)[number]['code'];

// Opcional: mapa para acesso rápido
export const LANGUAGE_MAP = LANGUAGES.reduce((acc, lang) => {
  acc[lang.code] = { label: lang.label, flag: lang.flag };
  return acc;
}, {} as Record<LanguageCode, { label: string; flag: string }>);