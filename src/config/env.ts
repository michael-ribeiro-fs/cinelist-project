// src/config/env.ts

interface EnvConfig {
  tmdbApiKey: string;
  tmdbAccessToken: string;
  tmdbBaseUrl: string;
  tmdbImageUrl: string;
  tmdbImageOriginal: string;
  isDevelopment: boolean;
  isProduction: boolean;
  useApi: boolean;
}

function getEnvVariable(key: string, required = true): string {
  const value = import.meta.env[key];
  if (required && !value) {
    console.warn(`⚠️ Environment variable ${key} is not defined`);
  }
  return value || '';
}

export const env: EnvConfig = {
  tmdbApiKey: getEnvVariable('VITE_TMDB_API_KEY'),
  tmdbAccessToken: getEnvVariable('VITE_TMDB_ACCESS_TOKEN'),
  tmdbBaseUrl: getEnvVariable('VITE_TMDB_BASE_URL'),
  tmdbImageUrl: getEnvVariable('VITE_TMDB_IMAGE_URL'),
  tmdbImageOriginal: getEnvVariable('VITE_TMDB_IMAGE_ORIGINAL'),
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  useApi: import.meta.env.VITE_USE_API === 'true',
} as const;