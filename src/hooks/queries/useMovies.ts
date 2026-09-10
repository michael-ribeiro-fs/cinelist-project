// src/hooks/queries/useMovies.ts
import { useQuery } from '@tanstack/react-query';
import {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTrendingMovies,
  getMoviesByGenre,
  getMoviesByTheme,
  searchMovies,
} from '../../services/api/tmdbService';
import { MOVIE_THEMES, type MovieThemeKey } from '../../constants/movieThemes';
import { TMDB_LOCALE } from '../../constants/tmdbLanguage';
import { useLanguage } from '../../context/LanguageContext';

// ============================================
// QUERY KEYS (incluem locale para cache por idioma)
// ============================================

export const movieKeys = {
  all: ['movies'] as const,
  popular: (page: number, limit: number | undefined, locale: string) =>
    [...movieKeys.all, 'popular', page, limit, locale] as const,
  nowPlaying: (page: number, limit: number | undefined, locale: string) =>
    [...movieKeys.all, 'nowPlaying', page, limit, locale] as const,
  upcoming: (page: number, limit: number | undefined, locale: string) =>
    [...movieKeys.all, 'upcoming', page, limit, locale] as const,
  trending: (timeWindow: string, limit: number | undefined, locale: string) =>
    [...movieKeys.all, 'trending', timeWindow, limit, locale] as const,
  byGenre: (genreId: number, page: number, limit: number | undefined, locale: string) =>
    [...movieKeys.all, 'genre', genreId, page, limit, locale] as const,
  byTheme: (themeKey: string, page: number, limit: number | undefined, locale: string) =>
    [...movieKeys.all, 'theme', themeKey, page, limit, locale] as const,
  search: (query: string, page: number, limit: number | undefined, locale: string) =>
    [...movieKeys.all, 'search', query, page, limit, locale] as const,
};

// ============================================
// HOOKS LEGADOS
// ============================================

export function usePopularMovies(page = 1, limit?: number) {
  const { language } = useLanguage();
  const locale = TMDB_LOCALE[language];

  return useQuery({
    queryKey: movieKeys.popular(page, limit, locale),
    queryFn: () => getPopularMovies(page, limit, locale),
    staleTime: 5 * 60 * 1000,
  });
}

export function useNowPlayingMovies(page = 1, limit?: number) {
  const { language } = useLanguage();
  const locale = TMDB_LOCALE[language];

  return useQuery({
    queryKey: movieKeys.nowPlaying(page, limit, locale),
    queryFn: () => getNowPlayingMovies(page, limit, locale),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpcomingMovies(page = 1, limit?: number) {
  const { language } = useLanguage();
  const locale = TMDB_LOCALE[language];

  return useQuery({
    queryKey: movieKeys.upcoming(page, limit, locale),
    queryFn: () => getUpcomingMovies(page, limit, locale),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTrendingMovies(timeWindow: 'day' | 'week' = 'week', limit?: number) {
  const { language } = useLanguage();
  const locale = TMDB_LOCALE[language];

  return useQuery({
    queryKey: movieKeys.trending(timeWindow, limit, locale),
    queryFn: () => getTrendingMovies(timeWindow, limit, locale),
    staleTime: 5 * 60 * 1000,
  });
}

export function useMoviesByGenre(genreId: number, page = 1, limit?: number) {
  const { language } = useLanguage();
  const locale = TMDB_LOCALE[language];

  return useQuery({
    queryKey: movieKeys.byGenre(genreId, page, limit, locale),
    queryFn: () => getMoviesByGenre(genreId, page, limit, locale),
    enabled: !!genreId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMovieSearch(query: string, page = 1, limit?: number) {
  const { language } = useLanguage();
  const locale = TMDB_LOCALE[language];

  return useQuery({
    queryKey: movieKeys.search(query, page, limit, locale),
    queryFn: () => searchMovies(query, page, limit, locale),
    enabled: !!query && query.length > 0,
    staleTime: 2 * 60 * 1000,
  });
}

// ============================================
// HOOK GENÉRICO POR TEMA
// ============================================

export function useMoviesByTheme(
  themeKey: MovieThemeKey,
  page = 1,
  limit?: number
) {
  const { language } = useLanguage();
  const locale = TMDB_LOCALE[language];
  const theme = MOVIE_THEMES[themeKey];

  return useQuery({
    queryKey: movieKeys.byTheme(themeKey, page, limit, locale),
    queryFn: () => getMoviesByTheme(theme, page, limit, locale),
    staleTime: 5 * 60 * 1000,
  });
}