// src/services/api/types/tmdb.types.ts

export interface TMDBMovieResponse {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  video: boolean;
}

export interface TMDBMovieDetailsResponse extends TMDBMovieResponse {
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  imdb_id: string;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  revenue: number;
  runtime: number | null;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
}

export interface TMDBListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBGenreResponse {
  genres: Array<{ id: number; name: string }>;
}

export interface TMDBDiscoverParams {
  page?: number;
  language?: string;
  sort_by?: string;
  with_genres?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
}

export interface TMDBMovieSearchParams {
  query: string;
  page?: number;
  language?: string;
  include_adult?: boolean;
  year?: number;
  primary_release_year?: number;
}