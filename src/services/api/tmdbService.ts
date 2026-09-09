// src/services/api/tmdbService.ts
import { apiClient } from './apiClient';
import { TMDB_ENDPOINTS } from './endpoints';
import type {
  TMDBMovieResponse,
  TMDBMovieDetailsResponse,
  TMDBListResponse,
  TMDBGenreResponse,
  TMDBDiscoverParams,
} from './types/tmdb.types';
import {
  mapTMDBMovieListToMovies,
  mapTMDBMovieToMovie,
  enrichMoviesWithRuntime,
} from '../mappers/movieMapper';
import type { Movie } from '../../types/movie';

let genresCache: Map<number, string> | null = null;

async function getGenres(): Promise<Map<number, string>> {
  if (genresCache) return genresCache;

  const response = await apiClient.get<TMDBGenreResponse>(TMDB_ENDPOINTS.GENRES_MOVIE);
  const genresMap = new Map<number, string>();
  response.genres.forEach((genre) => genresMap.set(genre.id, genre.name));
  genresCache = genresMap;
  return genresMap;
}

// ============================================
// FUNÇÃO AUXILIAR PARA BUSCAR LISTA + ENRIQUECER COM RUNTIME
// ============================================

async function fetchMoviesWithDetails(
  endpoint: string,
  params?: Record<string, unknown>,
  limit?: number
): Promise<Movie[]> {
  // Busca a lista de filmes
  const response = await apiClient.get<TMDBListResponse<TMDBMovieResponse>>(endpoint, params);
  const genres = await getGenres();

  // Mapeia a lista para o formato Movie[]
  let movies = mapTMDBMovieListToMovies(response.results, genres);

  // Aplica o limite, se fornecido
  if (limit && limit > 0) {
    movies = movies.slice(0, limit);
  }

  // Busca detalhes (runtime) para cada filme
  const enrichedMovies = await enrichMoviesWithRuntime(movies);
  return enrichedMovies;
}

// ============================================
// FUNÇÕES PÚBLICAS (com limite opcional)
// ============================================

export async function getPopularMovies(page = 1, limit?: number): Promise<Movie[]> {
  return fetchMoviesWithDetails(
    TMDB_ENDPOINTS.MOVIE_POPULAR,
    { page },
    limit
  );
}

export async function getNowPlayingMovies(page = 1, limit?: number): Promise<Movie[]> {
  return fetchMoviesWithDetails(
    TMDB_ENDPOINTS.MOVIE_NOW_PLAYING,
    { page },
    limit
  );
}

export async function getUpcomingMovies(page = 1, limit?: number): Promise<Movie[]> {
  return fetchMoviesWithDetails(
    TMDB_ENDPOINTS.MOVIE_UPCOMING,
    { page },
    limit
  );
}

export async function getTrendingMovies(timeWindow: 'day' | 'week' = 'week', limit?: number): Promise<Movie[]> {
  return fetchMoviesWithDetails(
    TMDB_ENDPOINTS.TRENDING('movie', timeWindow),
    undefined,
    limit
  );
}

export async function getMoviesByGenre(genreId: number, page = 1, limit?: number): Promise<Movie[]> {
  return fetchMoviesWithDetails(
    TMDB_ENDPOINTS.DISCOVER_MOVIE,
    { with_genres: String(genreId), page },
    limit
  );
}

export async function searchMovies(query: string, page = 1, limit?: number): Promise<Movie[]> {
  const response = await apiClient.get<TMDBListResponse<TMDBMovieResponse>>(
    TMDB_ENDPOINTS.SEARCH_MOVIE,
    { query, page }
  );
  const genres = await getGenres();
  let movies = mapTMDBMovieListToMovies(response.results, genres);
  if (limit && limit > 0) {
    movies = movies.slice(0, limit);
  }
  const enrichedMovies = await enrichMoviesWithRuntime(movies);
  return enrichedMovies;
}

export async function getMovieDetails(movieId: number): Promise<Movie> {
  const response = await apiClient.get<TMDBMovieDetailsResponse>(
    TMDB_ENDPOINTS.MOVIE_DETAILS(movieId)
  );
  return mapTMDBMovieToMovie(response);
}

export async function discoverMovies(params: TMDBDiscoverParams, limit?: number): Promise<Movie[]> {
  return fetchMoviesWithDetails(
    TMDB_ENDPOINTS.DISCOVER_MOVIE,
    params as Record<string, unknown>,
    limit
  );
}

export function clearGenresCache(): void {
  genresCache = null;
}