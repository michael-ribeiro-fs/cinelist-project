import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { pt } from '../locales/pt';
import { en } from '../locales/en';
import { es } from '../locales/es';
import { fr } from '../locales/fr';
import { zh } from '../locales/zh';
import { ar } from '../locales/ar';
import { ru } from '../locales/ru';
import { hi } from '../locales/hi';
import type { Translations } from '../types/language';

type LanguageCode = 'pt' | 'en' | 'es' | 'fr' | 'zh' | 'ar' | 'ru' | 'hi';

const translationsMap: Record<LanguageCode, Translations> = {
  pt,
  en,
  es,
  fr,
  zh,
  ar,
  ru,
  hi,
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem('language') as LanguageCode;
    return stored && stored in translationsMap ? stored : 'pt';
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
