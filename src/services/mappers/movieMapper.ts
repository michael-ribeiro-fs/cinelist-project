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

function buildPosterUrl(posterPath: string | null): string {
  return posterPath ? `${env.tmdbImageUrl}${posterPath}` : PLACEHOLDER_IMAGE;
}

function buildBackdropUrl(backdropPath: string | null): string | null {
  return backdropPath ? `${env.tmdbImageUrl}${backdropPath}` : null;
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

  const duration = (tmdbMovie as TMDBMovieDetailsResponse).runtime
    ? `${(tmdbMovie as TMDBMovieDetailsResponse).runtime}min`
    : null;

  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    year,
    image: buildPosterUrl(tmdbMovie.poster_path),
    backdropImage: buildBackdropUrl(tmdbMovie.backdrop_path),
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
