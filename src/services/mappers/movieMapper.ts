// src/services/mappers/movieMapper.ts
import type { Movie } from '../../types/movie';
import type { TMDBMovieResponse, TMDBMovieDetailsResponse } from '../api/types/tmdb.types';
import { env } from '../../config/env';
import { apiClient } from '../api/apiClient';
import { TMDB_ENDPOINTS } from '../api/endpoints';

// ============================================
// MAPEAMENTO DE UM ÚNICO FILME
// ============================================

export function mapTMDBMovieToMovie(
  tmdbMovie: TMDBMovieResponse | TMDBMovieDetailsResponse,
  genresMap?: Map<number, string>
): Movie {
  const genre = tmdbMovie.genre_ids
    ? tmdbMovie.genre_ids
        .map((id) => genresMap?.get(id) || '')
        .filter(Boolean)
        .join(' • ')
    : (tmdbMovie as TMDBMovieDetailsResponse).genres?.map((g) => g.name).join(' • ') || '';

  const year = tmdbMovie.release_date
    ? new Date(tmdbMovie.release_date).getFullYear()
    : new Date().getFullYear();

  const imageUrl = tmdbMovie.backdrop_path
    ? `${env.tmdbImageUrl}${tmdbMovie.backdrop_path}`
    : tmdbMovie.poster_path
    ? `${env.tmdbImageUrl}${tmdbMovie.poster_path}`
    : '/placeholder-image.jpg';

  // Se já tiver runtime (detalhes), usa; senão, deixa como string vazia
  const duration = (tmdbMovie as TMDBMovieDetailsResponse).runtime
    ? `${(tmdbMovie as TMDBMovieDetailsResponse).runtime}min`
    : '';

  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    year,
    image: imageUrl,
    description: tmdbMovie.overview || 'Sinopse não disponível',
    genre: genre || 'Gênero não disponível',
    rating: tmdbMovie.vote_average || 0,
    duration,
  };
}

// ============================================
// MAPEAMENTO DE LISTA DE FILMES
// ============================================

export function mapTMDBMovieListToMovies(
  tmdbMovies: TMDBMovieResponse[],
  genresMap?: Map<number, string>
): Movie[] {
  return tmdbMovies.map((movie) => mapTMDBMovieToMovie(movie, genresMap));
}

// ============================================
// ENRIQUECIMENTO COM RUNTIME
// ============================================

/**
 * Busca os detalhes (runtime) para uma lista de filmes.
 * Retorna a lista de filmes com a duração preenchida.
 */
export async function enrichMoviesWithRuntime(movies: Movie[]): Promise<Movie[]> {
  if (movies.length === 0) return movies;

  // Busca detalhes de todos os filmes em paralelo
  const detailsPromises = movies.map((movie) =>
    apiClient
      .get<TMDBMovieDetailsResponse>(TMDB_ENDPOINTS.MOVIE_DETAILS(movie.id))
      .then((details) => ({ movie, runtime: details.runtime }))
      .catch(() => ({ movie, runtime: null }))
  );

  const results = await Promise.all(detailsPromises);

  // Atualiza a duração de cada filme
  return results.map(({ movie, runtime }) => ({
    ...movie,
    duration: runtime ? `${runtime}min` : 'Duração não informada',
  }));
}