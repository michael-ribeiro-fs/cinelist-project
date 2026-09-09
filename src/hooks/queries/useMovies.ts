// src/hooks/queries/useMovies.ts
import { useQuery } from '@tanstack/react-query';
import {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTrendingMovies,
  getMoviesByGenre,
  searchMovies,
} from '../../services/api/tmdbService';

export const movieKeys = {
  all: ['movies'] as const,
  popular: (page: number, limit?: number) => [...movieKeys.all, 'popular', page, limit] as const,
  nowPlaying: (page: number, limit?: number) => [...movieKeys.all, 'nowPlaying', page, limit] as const,
  upcoming: (page: number, limit?: number) => [...movieKeys.all, 'upcoming', page, limit] as const,
  trending: (timeWindow: string, limit?: number) => [...movieKeys.all, 'trending', timeWindow, limit] as const,
  byGenre: (genreId: number, page: number, limit?: number) => [...movieKeys.all, 'genre', genreId, page, limit] as const,
  search: (query: string, page: number, limit?: number) => [...movieKeys.all, 'search', query, page, limit] as const,
};

export function usePopularMovies(page = 1, limit?: number) {
  return useQuery({
    queryKey: movieKeys.popular(page, limit),
    queryFn: () => getPopularMovies(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useNowPlayingMovies(page = 1, limit?: number) {
  return useQuery({
    queryKey: movieKeys.nowPlaying(page, limit),
    queryFn: () => getNowPlayingMovies(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpcomingMovies(page = 1, limit?: number) {
  return useQuery({
    queryKey: movieKeys.upcoming(page, limit),
    queryFn: () => getUpcomingMovies(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTrendingMovies(timeWindow: 'day' | 'week' = 'week', limit?: number) {
  return useQuery({
    queryKey: movieKeys.trending(timeWindow, limit),
    queryFn: () => getTrendingMovies(timeWindow, limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useMoviesByGenre(genreId: number, page = 1, limit?: number) {
  return useQuery({
    queryKey: movieKeys.byGenre(genreId, page, limit),
    queryFn: () => getMoviesByGenre(genreId, page, limit),
    enabled: !!genreId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMovieSearch(query: string, page = 1, limit?: number) {
  return useQuery({
    queryKey: movieKeys.search(query, page, limit),
    queryFn: () => searchMovies(query, page, limit),
    enabled: !!query && query.length > 0,
    staleTime: 2 * 60 * 1000,
  });
}