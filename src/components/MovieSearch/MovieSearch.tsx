import { useState } from 'react';
import './MovieSearch.css';

type SearchFilters = {
  type: string;
  country: string;
  genre: string;
  yearFrom: string;
  yearTo: string;
  ratingFrom: string;
  ratingTo: string;
  ageRating: string;
  actor: string;
  director: string;
  dubbed: boolean;
  subtitled: boolean;
  sortBy: string;
};

type MovieSearchProps = {
  onSearch?: (searchTerm: string, filters: SearchFilters) => void;
};

const initialFilters: SearchFilters = {
  type: '',
  country: '',
  genre: '',
  yearFrom: '',
  yearTo: '',
  ratingFrom: '',
  ratingTo: '',
  ageRating: '',
  actor: '',
  director: '',
  dubbed: false,
  subtitled: false,
  sortBy: '',
};

function MovieSearch({ onSearch }: MovieSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;

    const checked = type === 'checkbox' ? (event.target as HTMLInputElement).checked : false;

    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSearch = () => {
    onSearch?.(searchTerm.trim(), filters);

    console.log({
      searchTerm: searchTerm.trim(),
      filters,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  const handleAdvancedToggle = () => {
    setIsAdvancedOpen((previousState) => !previousState);
  };

  return (
    <section className="movie-search" id="movies">
      <div className="movie-search__container">
        <form className="movie-search__form" onSubmit={handleSubmit}>
          {/* SIMPLE SEARCH */}

          <div className="movie-search__basic">
            <div className="movie-search__basic-content">
              <h2 className="movie-search__basic-title">Busca simples de filmes e séries</h2>

              <div className="movie-search__basic-input-wrapper">
                <input
                  className="movie-search__basic-input"
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  placeholder="Pesquise por nome de filme ou série"
                  aria-label="Pesquisar filmes e séries"
                />

                <button
                  className="movie-search__basic-icon-button"
                  type="submit"
                  aria-label="Pesquisar"
                >
                  <svg className="movie-search__search-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="movie-search__search-icon-circle" cx="11" cy="11" r="6" />

                    <path className="movie-search__search-icon-line" d="M16 16L21 21" />
                  </svg>
                </button>
              </div>

              <button className="movie-search__basic-button" type="submit">
                Buscar
              </button>
            </div>
          </div>

          {/* ADVANCED SEARCH HEADER */}

          <div className="movie-search__advanced">
            <button
              className="movie-search__advanced-toggle"
              type="button"
              onClick={handleAdvancedToggle}
              aria-expanded={isAdvancedOpen}
              aria-controls="advanced-search-panel"
            >
              <span className="movie-search__advanced-toggle-icon">
                <svg
                  className={`movie-search__chevron ${
                    isAdvancedOpen ? 'movie-search__chevron--open' : ''
                  }`}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path className="movie-search__chevron-path" d="M6 15L12 9L18 15" />
                </svg>
              </span>

              <span className="movie-search__advanced-title">
                Busca avançada de filmes e séries
              </span>
            </button>

            {/* ADVANCED FILTERS */}

            <div
              id="advanced-search-panel"
              className={`movie-search__advanced-panel ${
                isAdvancedOpen ? 'movie-search__advanced-panel--open' : ''
              }`}
            >
              <div className="movie-search__filters">
                {/* TYPE */}

                <div className="movie-search__field">
                  <label className="movie-search__label" htmlFor="type">
                    Tipo
                  </label>

                  <select
                    className="movie-search__select"
                    id="type"
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todos</option>
                    <option value="movie">Filmes</option>
                    <option value="series">Séries</option>
                  </select>
                </div>

                {/* COUNTRY */}

                <div className="movie-search__field">
                  <label className="movie-search__label" htmlFor="country">
                    País
                  </label>

                  <select
                    className="movie-search__select"
                    id="country"
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todos</option>
                    <option value="br">Brasil</option>
                    <option value="us">Estados Unidos</option>
                    <option value="uk">Reino Unido</option>
                    <option value="jp">Japão</option>
                    <option value="kr">Coreia do Sul</option>
                  </select>
                </div>

                {/* GENRE */}

                <div className="movie-search__field">
                  <label className="movie-search__label" htmlFor="genre">
                    Gênero
                  </label>

                  <select
                    className="movie-search__select"
                    id="genre"
                    name="genre"
                    value={filters.genre}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todos</option>
                    <option value="action">Ação</option>
                    <option value="comedy">Comédia</option>
                    <option value="drama">Drama</option>
                    <option value="horror">Terror</option>
                    <option value="sci-fi">Ficção científica</option>
                    <option value="thriller">Suspense</option>
                  </select>
                </div>

                {/* YEAR */}

                <div className="movie-search__field">
                  <label className="movie-search__label" htmlFor="yearFrom">
                    Ano de lançamento
                  </label>

                  <div className="movie-search__range">
                    <input
                      className="movie-search__range-input"
                      id="yearFrom"
                      name="yearFrom"
                      type="number"
                      min="1900"
                      max="2100"
                      placeholder="De"
                      value={filters.yearFrom}
                      onChange={handleFilterChange}
                    />

                    <span className="movie-search__range-divider">até</span>

                    <input
                      className="movie-search__range-input"
                      name="yearTo"
                      type="number"
                      min="1900"
                      max="2100"
                      placeholder="Até"
                      value={filters.yearTo}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>

                {/* RATING */}

                <div className="movie-search__field">
                  <label className="movie-search__label" htmlFor="ratingFrom">
                    Nota IMDb
                  </label>

                  <div className="movie-search__range">
                    <input
                      className="movie-search__range-input"
                      id="ratingFrom"
                      name="ratingFrom"
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="De"
                      value={filters.ratingFrom}
                      onChange={handleFilterChange}
                    />

                    <span className="movie-search__range-divider">até</span>

                    <input
                      className="movie-search__range-input"
                      name="ratingTo"
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      placeholder="Até"
                      value={filters.ratingTo}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>

                {/* AGE RATING */}

                <div className="movie-search__field">
                  <label className="movie-search__label" htmlFor="ageRating">
                    Classificação
                  </label>

                  <select
                    className="movie-search__select"
                    id="ageRating"
                    name="ageRating"
                    value={filters.ageRating}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todas</option>
                    <option value="l">Livre</option>
                    <option value="10">10 anos</option>
                    <option value="12">12 anos</option>
                    <option value="14">14 anos</option>
                    <option value="16">16 anos</option>
                    <option value="18">18 anos</option>
                  </select>
                </div>

                {/* ACTOR */}

                <div className="movie-search__field">
                  <label className="movie-search__label" htmlFor="actor">
                    Ator ou atriz
                  </label>

                  <input
                    className="movie-search__input"
                    id="actor"
                    name="actor"
                    type="text"
                    placeholder="Ex.: Brad Pitt"
                    value={filters.actor}
                    onChange={handleFilterChange}
                  />
                </div>

                {/* DIRECTOR */}

                <div className="movie-search__field">
                  <label className="movie-search__label" htmlFor="director">
                    Diretor(a)
                  </label>

                  <input
                    className="movie-search__input"
                    id="director"
                    name="director"
                    type="text"
                    placeholder="Ex.: Christopher Nolan"
                    value={filters.director}
                    onChange={handleFilterChange}
                  />
                </div>

                {/* SORT */}

                <div className="movie-search__field">
                  <label className="movie-search__label" htmlFor="sortBy">
                    Ordenar por
                  </label>

                  <select
                    className="movie-search__select"
                    id="sortBy"
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                  >
                    <option value="">Mais relevantes</option>
                    <option value="rating">Maior nota IMDb</option>
                    <option value="year">Mais recentes</option>
                    <option value="title">Nome</option>
                  </select>
                </div>
              </div>

              {/* FILTER OPTIONS */}

              <div className="movie-search__options">
                <label className="movie-search__checkbox">
                  <input
                    className="movie-search__checkbox-input"
                    name="dubbed"
                    type="checkbox"
                    checked={filters.dubbed}
                    onChange={handleFilterChange}
                  />

                  <span className="movie-search__checkbox-control" />

                  <span className="movie-search__checkbox-text">Dublado</span>
                </label>

                <label className="movie-search__checkbox">
                  <input
                    className="movie-search__checkbox-input"
                    name="subtitled"
                    type="checkbox"
                    checked={filters.subtitled}
                    onChange={handleFilterChange}
                  />

                  <span className="movie-search__checkbox-control" />

                  <span className="movie-search__checkbox-text">Legendado</span>
                </label>

                <button className="movie-search__filter-button" type="submit">
                  Aplicar filtros e buscar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default MovieSearch;
