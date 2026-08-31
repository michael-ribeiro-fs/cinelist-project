export interface Translations {
  // Header
  header: {
    brand: string;
    menu: {
      home: string;
      movies: string;
      series: string;
      favorites: string;
      about: string;
    };
    searchPlaceholder: string;
    login: string;
    signup: string;
  };
  // Hero
  hero: {
    eyebrow: string;
    synopsis: string;
    genre: string;
    watchNow: string;
    previous: string;
    next: string;
    goTo: string; // usado no aria-label dos indicadores
  };
  // MovieSearch
  movieSearch: {
    simpleTitle: string;
    simplePlaceholder: string;
    searchButton: string;
    advancedTitle: string;
    filters: {
      type: string;
      all: string;
      movies: string;
      series: string;
      country: string;
      allCountries: string;
      genre: string;
      allGenres: string;
      yearLabel: string;
      ratingLabel: string;
      to: string;
      yearFrom: string;
      yearTo: string;
      ratingFrom: string;
      ratingTo: string;
      ageRating: string;
      allAges: string;
      free: string;
      actor: string;
      actorPlaceholder: string;
      director: string;
      directorPlaceholder: string;
      sortBy: string;
      mostRelevant: string;
      highestRating: string;
      newest: string;
      name: string;
      dubbed: string;
      subtitled: string;
      applyFilters: string;
    };
  };
  // Páginas (About, Favorites, etc.)
  pages: {
    about: {
      title: string;
      description: string;
    };
    favorites: {
      title: string;
      description: string;
    };
    movies: {
      title: string;
      description: string;
    };
    series: {
      title: string;
      description: string;
    };
  };
}