// src/data/curatedLists.ts

export interface CuratedList {
  id: string;
  movieIds: number[];
}

export const CURATED_LISTS = {
  // ============================================================
  // 🍅 SUGERIDOS PELO CINETÔMATO
  // ============================================================
  cineTomato: {
    id: 'cineTomato',
    movieIds: [
      70,       // Menina de Ouro (2004)
      940721,   // Godzilla Minus One (2023)
      12477,    // Túmulo dos Vagalumes (1988)
      129,      // A Viagem de Chihiro (2001)
      8392,     // Meu Amigo Totoro (1988)
      546554,   // Entre Facas e Segredos (2019)
      24,       // Kill Bill Vol. 1 (2003)
      447332,   // Um Lugar Silencioso (2018)
      1151031,  // Faça Ela Voltar (2025)
      1083381,  // Entrevista com o Demônio (2023)
      14160,    // Up: Altas Aventuras (2009)
      155,      // Batman: O Cavaleiro das Trevas (2008)
      424,      // A Lista de Schindler (1993)
      274,      // O Silêncio dos Inocentes (1991)
      299536,   // Vingadores: Guerra Infinita (2018)
      299534,   // Vingadores: Ultimato (2019)
      106646,   // O Lobo de Wall Street (2013)
    ],
  },
} as const satisfies Record<string, CuratedList>;

export type CuratedListKey = keyof typeof CURATED_LISTS;