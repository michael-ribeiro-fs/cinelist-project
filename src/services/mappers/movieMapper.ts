// src/services/mappers/movieMapper.ts
import type { Movie } from '../../types/movie';
import type { TMDBMovieResponse, TMDBMovieDetailsResponse } from '../api/types/tmdb.types';
import { env } from '../../config/env';

// ============================================
// CONSTANTES
// ============================================

const PLACEHOLDER_IMAGE = '/placeholder-image.jpg';

// ============================================
// HELPERS
// ============================================

/**
 * Resolve a URL de imagem a partir dos paths da TMDB.
 * Prefere backdrop (16:9) sobre poster (2:3). Fallback para placeholder local.
 */
function resolveImageUrl(backdropPath: string | null, posterPath: string | null): string {
  if (backdropPath) {
    return `${env.tmdbImageUrl}${backdropPath}`;
  }
  if (posterPath) {
    return `${env.tmdbImageUrl}${posterPath}`;
  }
  return PLACEHOLDER_IMAGE;
}

// ============================================
// MAPEAMENTO DE UM ÚNICO FILME
// ============================================

export function mapTMDBMovieToMovie(
  tmdbMovie: TMDBMovieResponse | TMDBMovieDetailsResponse,
  genresMap?: Map<number, string>,
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

  const imageUrl = resolveImageUrl(tmdbMovie.backdrop_path, tmdbMovie.poster_path);

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
  genresMap?: Map<number, string>,
): Movie[] {
  return tmdbMovies.map((movie) => mapTMDBMovieToMovie(movie, genresMap));
}
