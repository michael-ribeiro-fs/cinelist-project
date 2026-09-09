// src/services/api/endpoints.ts

export const TMDB_ENDPOINTS = {
  // Filmes
  MOVIE_POPULAR: '/movie/popular',
  MOVIE_NOW_PLAYING: '/movie/now_playing',
  MOVIE_UPCOMING: '/movie/upcoming',
  MOVIE_TOP_RATED: '/movie/top_rated',
  MOVIE_DETAILS: (id: number) => `/movie/${id}`,
  MOVIE_CREDITS: (id: number) => `/movie/${id}/credits`,
  MOVIE_RECOMMENDATIONS: (id: number) => `/movie/${id}/recommendations`,

  // Descoberta
  DISCOVER_MOVIE: '/discover/movie',

  // Busca
  SEARCH_MOVIE: '/search/movie',
  SEARCH_TV: '/search/tv',

  // Tendências
  TRENDING: (mediaType: string, timeWindow: string) =>
    `/trending/${mediaType}/${timeWindow}`,

  // Gêneros
  GENRES_MOVIE: '/genre/movie/list',
  GENRES_TV: '/genre/tv/list',

  // Séries
  TV_POPULAR: '/tv/popular',
  TV_DETAILS: (id: number) => `/tv/${id}`,

  // Atores
  PERSON_POPULAR: '/person/popular',
  PERSON_DETAILS: (id: number) => `/person/${id}`,
} as const;