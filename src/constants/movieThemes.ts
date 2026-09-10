// src/constants/movieThemes.ts

import type { CuratedListKey } from '../data/curatedLists';



// ============================================
// TIPOS DE FONTE DE DADOS
// ============================================

export type MovieThemeSource =
  | { kind: 'popular' }
  | { kind: 'upcoming' }
  | { kind: 'nowPlaying' }
  | { kind: 'topRated' }
  | { kind: 'trending'; timeWindow: 'day' | 'week' }
  | { kind: 'genre'; genreId: number }
  | { kind: 'curated'; listId: CuratedListKey };

export interface MovieTheme {
  key: string;
  source: MovieThemeSource;
}

// ============================================
// REGISTRO CENTRAL DE TEMAS
// ============================================

export const MOVIE_THEMES = {
  // ========================================
  // LISTAS GERAIS
  // ========================================
  popular: { key: 'popular', source: { kind: 'popular' } },
  upcoming: { key: 'upcoming', source: { kind: 'upcoming' } },
  nowPlaying: { key: 'nowPlaying', source: { kind: 'nowPlaying' } },
  topRated: { key: 'topRated', source: { kind: 'topRated' } },
  trending: { key: 'trending', source: { kind: 'trending', timeWindow: 'week' } },
  trendingToday: { key: 'trendingToday', source: { kind: 'trending', timeWindow: 'day' } },

  // ========================================
  // GÊNEROS (TMDB Genre IDs)
  // ========================================
  action: { key: 'action', source: { kind: 'genre', genreId: 28 } },
  adventure: { key: 'adventure', source: { kind: 'genre', genreId: 12 } },
  animation: { key: 'animation', source: { kind: 'genre', genreId: 16 } },
  comedy: { key: 'comedy', source: { kind: 'genre', genreId: 35 } },
  crime: { key: 'crime', source: { kind: 'genre', genreId: 80 } },
  documentary: { key: 'documentary', source: { kind: 'genre', genreId: 99 } },
  drama: { key: 'drama', source: { kind: 'genre', genreId: 18 } },
  family: { key: 'family', source: { kind: 'genre', genreId: 10751 } },
  fantasy: { key: 'fantasy', source: { kind: 'genre', genreId: 14 } },
  history: { key: 'history', source: { kind: 'genre', genreId: 36 } },
  horror: { key: 'horror', source: { kind: 'genre', genreId: 27 } },
  music: { key: 'music', source: { kind: 'genre', genreId: 10402 } },
  mystery: { key: 'mystery', source: { kind: 'genre', genreId: 9648 } },
  romance: { key: 'romance', source: { kind: 'genre', genreId: 10749 } },
  sciFi: { key: 'sciFi', source: { kind: 'genre', genreId: 878 } },
  thriller: { key: 'thriller', source: { kind: 'genre', genreId: 53 } },
  war: { key: 'war', source: { kind: 'genre', genreId: 10752 } },
  western: { key: 'western', source: { kind: 'genre', genreId: 37 } },

  // ========================================
// 🍅 LISTAS CURADAS (sugestões manuais)
// ========================================
cineTomato: {
  key: 'cineTomato',
  source: { kind: 'curated', listId: 'cineTomato' },
},
} as const satisfies Record<string, MovieTheme>;

export type MovieThemeKey = keyof typeof MOVIE_THEMES;