// src/context/useLanguage.ts
import { useContext } from 'react';
import { LanguageContext } from './languageContextBase';

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
