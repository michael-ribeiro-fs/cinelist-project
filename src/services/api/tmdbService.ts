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
import { mapTMDBMovieListToMovies, mapTMDBMovieToMovie } from '../mappers/movieMapper';
import type { Movie } from '../../types/movie';
import type { MovieTheme } from '../../constants/movieThemes';
import { CURATED_LISTS } from '../../data/curatedLists';

let genresCache: Map<number, string> | null = null;

async function getGenres(language?: string): Promise<Map<number, string>> {
  if (genresCache) return genresCache;

  const response = await apiClient.get<TMDBGenreResponse>(TMDB_ENDPOINTS.GENRES_MOVIE, {
    language,
  });
  const genresMap = new Map<number, string>();
  response.genres.forEach((genre) => genresMap.set(genre.id, genre.name));
  genresCache = genresMap;
  return genresMap;
}

// ============================================
// HELPER: CONCORRÊNCIA LIMITADA
// ============================================

/**
 * Executa promises em chunks de `limit`, evitando saturar a API
 * em listas grandes (ex: curated lists com 20+ IDs).
 */
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  mapper: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += limit) {
    const chunk = items.slice(i, i + limit);
    const chunkResults = await Promise.all(chunk.map(mapper));
    results.push(...chunkResults);
  }
  return results;
}

// ============================================
// FUNÇÃO AUXILIAR PARA BUSCAR LISTA
// (runtime é enriquecido APENAS em getMovieDetails)
// ============================================

async function fetchMoviesWithDetails(
  endpoint: string,
  params?: Record<string, unknown>,
  limit?: number,
  language?: string,
): Promise<Movie[]> {
  const response = await apiClient.get<TMDBListResponse<TMDBMovieResponse>>(endpoint, {
    ...params,
    language,
  });
  const genres = await getGenres(language);

  let movies = mapTMDBMovieListToMovies(response.results, genres);

  if (limit && limit > 0) {
    movies = movies.slice(0, limit);
  }

  return movies;
}

// ============================================
// FUNÇÕES PÚBLICAS
// ============================================

export async function getPopularMovies(
  page = 1,
  limit?: number,
  language?: string,
): Promise<Movie[]> {
  return fetchMoviesWithDetails(TMDB_ENDPOINTS.MOVIE_POPULAR, { page }, limit, language);
}

export async function getNowPlayingMovies(
  page = 1,
  limit?: number,
  language?: string,
): Promise<Movie[]> {
  return fetchMoviesWithDetails(TMDB_ENDPOINTS.MOVIE_NOW_PLAYING, { page }, limit, language);
}

export async function getUpcomingMovies(
  page = 1,
  limit?: number,
  language?: string,
): Promise<Movie[]> {
  return fetchMoviesWithDetails(TMDB_ENDPOINTS.MOVIE_UPCOMING, { page }, limit, language);
}

export async function getTrendingMovies(
  timeWindow: 'day' | 'week' = 'week',
  limit?: number,
  language?: string,
): Promise<Movie[]> {
  return fetchMoviesWithDetails(
    TMDB_ENDPOINTS.TRENDING('movie', timeWindow),
    undefined,
    limit,
    language,
  );
}

export async function getMoviesByGenre(
  genreId: number,
  page = 1,
  limit?: number,
  language?: string,
): Promise<Movie[]> {
  return fetchMoviesWithDetails(
    TMDB_ENDPOINTS.DISCOVER_MOVIE,
    { with_genres: String(genreId), page },
    limit,
    language,
  );
}

export async function searchMovies(
  query: string,
  page = 1,
  limit?: number,
  language?: string,
): Promise<Movie[]> {
  const response = await apiClient.get<TMDBListResponse<TMDBMovieResponse>>(
    TMDB_ENDPOINTS.SEARCH_MOVIE,
    { query, page, language },
  );
  const genres = await getGenres(language);
  let movies = mapTMDBMovieListToMovies(response.results, genres);
  if (limit && limit > 0) {
    movies = movies.slice(0, limit);
  }
  return movies;
}

export async function getMovieDetails(movieId: number, language?: string): Promise<Movie> {
  const response = await apiClient.get<TMDBMovieDetailsResponse>(
    TMDB_ENDPOINTS.MOVIE_DETAILS(movieId),
    { language },
  );
  return mapTMDBMovieToMovie(response);
}

export async function discoverMovies(
  params: TMDBDiscoverParams,
  limit?: number,
  language?: string,
): Promise<Movie[]> {
  return fetchMoviesWithDetails(
    TMDB_ENDPOINTS.DISCOVER_MOVIE,
    { ...params, language } as Record<string, unknown>,
    limit,
    language,
  );
}

export function clearGenresCache(): void {
  genresCache = null;
}

// ============================================
// FUNÇÃO GENÉRICA POR TEMA
// ============================================

export async function getMoviesByTheme(
  theme: MovieTheme,
  page = 1,
  limit?: number,
  language?: string,
): Promise<Movie[]> {
  const { source } = theme;

  let movies: Movie[];

  switch (source.kind) {
    case 'popular':
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.MOVIE_POPULAR,
        { page },
        limit,
        language,
      );
      break;

    case 'upcoming':
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.MOVIE_UPCOMING,
        { page },
        limit,
        language,
      );
      break;

    case 'nowPlaying':
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.MOVIE_NOW_PLAYING,
        { page },
        limit,
        language,
      );
      break;

    case 'topRated':
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.MOVIE_TOP_RATED,
        { page },
        limit,
        language,
      );
      break;

    case 'trending':
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.TRENDING('movie', source.timeWindow),
        undefined,
        limit,
        language,
      );
      break;

    case 'genre':
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.DISCOVER_MOVIE,
        {
          with_genres: String(source.genreId),
          page,
          sort_by: 'vote_average.desc',
          'vote_count.gte': 100,
        },
        limit,
        language,
      );
      break;

    case 'curated': {
      const list = CURATED_LISTS[source.listId];
      const genres = await getGenres(language);

      const results = await mapWithConcurrency(list.movieIds, 5, (id) =>
        apiClient
          .get<TMDBMovieDetailsResponse>(TMDB_ENDPOINTS.MOVIE_DETAILS(id), { language })
          .then((details) => mapTMDBMovieToMovie(details, genres))
          .catch(() => null),
      );

      movies = results.filter((m): m is Movie => m !== null);
      break;
    }

    default:
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.MOVIE_POPULAR,
        { page },
        limit,
        language,
      );
  }

  return [...movies].sort((a, b) => b.rating - a.rating);
}
