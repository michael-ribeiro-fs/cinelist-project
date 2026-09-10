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
import type { MovieTheme } from '../../constants/movieThemes';
import { CURATED_LISTS } from '../../data/curatedLists';

let genresCache: Map<number, string> | null = null;

async function getGenres(language?: string): Promise<Map<number, string>> {
  if (genresCache) return genresCache;

  const response = await apiClient.get<TMDBGenreResponse>(
    TMDB_ENDPOINTS.GENRES_MOVIE,
    { language }
  );
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
  limit?: number,
  language?: string
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

  const enrichedMovies = await enrichMoviesWithRuntime(movies, language);
  return enrichedMovies;
}

// ============================================
// FUNÇÕES PÚBLICAS (com limite e idioma opcionais)
// ============================================

export async function getPopularMovies(
  page = 1,
  limit?: number,
  language?: string
): Promise<Movie[]> {
  return fetchMoviesWithDetails(TMDB_ENDPOINTS.MOVIE_POPULAR, { page }, limit, language);
}

export async function getNowPlayingMovies(
  page = 1,
  limit?: number,
  language?: string
): Promise<Movie[]> {
  return fetchMoviesWithDetails(TMDB_ENDPOINTS.MOVIE_NOW_PLAYING, { page }, limit, language);
}

export async function getUpcomingMovies(
  page = 1,
  limit?: number,
  language?: string
): Promise<Movie[]> {
  return fetchMoviesWithDetails(TMDB_ENDPOINTS.MOVIE_UPCOMING, { page }, limit, language);
}

export async function getTrendingMovies(
  timeWindow: 'day' | 'week' = 'week',
  limit?: number,
  language?: string
): Promise<Movie[]> {
  return fetchMoviesWithDetails(
    TMDB_ENDPOINTS.TRENDING('movie', timeWindow),
    undefined,
    limit,
    language
  );
}

export async function getMoviesByGenre(
  genreId: number,
  page = 1,
  limit?: number,
  language?: string
): Promise<Movie[]> {
  return fetchMoviesWithDetails(
    TMDB_ENDPOINTS.DISCOVER_MOVIE,
    { with_genres: String(genreId), page },
    limit,
    language
  );
}

export async function searchMovies(
  query: string,
  page = 1,
  limit?: number,
  language?: string
): Promise<Movie[]> {
  const response = await apiClient.get<TMDBListResponse<TMDBMovieResponse>>(
    TMDB_ENDPOINTS.SEARCH_MOVIE,
    { query, page, language }
  );
  const genres = await getGenres(language);
  let movies = mapTMDBMovieListToMovies(response.results, genres);
  if (limit && limit > 0) {
    movies = movies.slice(0, limit);
  }
  const enrichedMovies = await enrichMoviesWithRuntime(movies, language);
  return enrichedMovies;
}

export async function getMovieDetails(
  movieId: number,
  language?: string
): Promise<Movie> {
  const response = await apiClient.get<TMDBMovieDetailsResponse>(
    TMDB_ENDPOINTS.MOVIE_DETAILS(movieId),
    { language }
  );
  return mapTMDBMovieToMovie(response);
}

export async function discoverMovies(
  params: TMDBDiscoverParams,
  limit?: number,
  language?: string
): Promise<Movie[]> {
  return fetchMoviesWithDetails(
    TMDB_ENDPOINTS.DISCOVER_MOVIE,
    { ...params, language } as Record<string, unknown>,
    limit,
    language
  );
}

export function clearGenresCache(): void {
  genresCache = null;
}

// ============================================
// FUNÇÃO GENÉRICA POR TEMA (OTIMIZADA)
// ============================================

/**
 * Busca filmes de acordo com o tema especificado.
 *
 * Estratégia de otimização:
 * 1. Para temas de gênero, usa `sort_by=vote_average.desc` e `vote_count.gte=100`
 *    para trazer os filmes mais bem avaliados diretamente da API.
 * 2. Para todos os temas, aplica uma ordenação final no cliente por rating
 *    decrescente, garantindo consistência.
 * 3. Aceita um parâmetro `language` que traduz títulos, sinopses e gêneros.
 *
 * @param theme    - O tema do filme (definido em `movieThemes.ts`)
 * @param page     - Página de resultados (padrão: 1)
 * @param limit    - Limite de filmes retornados (padrão: sem limite)
 * @param language - Código de idioma TMDB (ex: 'pt-BR', 'en-US')
 */
export async function getMoviesByTheme(
  theme: MovieTheme,
  page = 1,
  limit?: number,
  language?: string
): Promise<Movie[]> {
  const { source } = theme;

  let movies: Movie[];

  switch (source.kind) {
    case 'popular':
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.MOVIE_POPULAR,
        { page },
        limit,
        language
      );
      break;

    case 'upcoming':
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.MOVIE_UPCOMING,
        { page },
        limit,
        language
      );
      break;

    case 'nowPlaying':
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.MOVIE_NOW_PLAYING,
        { page },
        limit,
        language
      );
      break;

    case 'topRated':
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.MOVIE_TOP_RATED,
        { page },
        limit,
        language
      );
      break;

    case 'trending':
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.TRENDING('movie', source.timeWindow),
        undefined,
        limit,
        language
      );
      break;

    case 'genre':
      // 🔥 Ordenação via API: melhor avaliados com pelo menos 100 votos
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.DISCOVER_MOVIE,
        {
          with_genres: String(source.genreId),
          page,
          sort_by: 'vote_average.desc',
          'vote_count.gte': 100,
        },
        limit,
        language
      );
      break;

    case 'curated': {
      const list = CURATED_LISTS[source.listId];
      const genres = await getGenres(language);

      const moviePromises = list.movieIds.map((id) =>
        apiClient
          .get<TMDBMovieDetailsResponse>(TMDB_ENDPOINTS.MOVIE_DETAILS(id), { language })
          .then((details) => mapTMDBMovieToMovie(details, genres))
          .catch(() => null)
      );

      const results = await Promise.all(moviePromises);
      movies = results.filter((m): m is Movie => m !== null);
      break;
    }

    default:
      movies = await fetchMoviesWithDetails(
        TMDB_ENDPOINTS.MOVIE_POPULAR,
        { page },
        limit,
        language
      );
  }

  // 🔥 Ordenação final no cliente
  return [...movies].sort((a, b) => b.rating - a.rating);
}