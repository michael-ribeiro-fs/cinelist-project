// src/components/MovieSearch/AdvancedFilters.tsx
import { useLanguage } from '../../context/LanguageContext';
import type { SearchFilters } from './MovieSearch';
import './MovieSearch.css';

interface AdvancedFiltersProps {
  isOpen: boolean;
  filters: SearchFilters;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onToggle: () => void;
  // onSubmit removido
}

function AdvancedFilters({ isOpen, filters, onFilterChange, onToggle }: AdvancedFiltersProps) {
  const { t } = useLanguage();

  return (
    <div className="movie-search__advanced">
      <button
        className="movie-search__advanced-toggle"
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="advanced-search-panel"
      >
        <span className="movie-search__advanced-toggle-icon">
          <svg
            className={`movie-search__chevron ${isOpen ? 'movie-search__chevron--open' : ''}`}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path className="movie-search__chevron-path" d="M6 15L12 9L18 15" />
          </svg>
        </span>
        <span className="movie-search__advanced-title">{t.movieSearch.advancedTitle}</span>
      </button>

      <div
        id="advanced-search-panel"
        className={`movie-search__advanced-panel ${isOpen ? 'movie-search__advanced-panel--open' : ''}`}
      >
        <div className="movie-search__filters">
          {/* todos os filtros permanecem inalterados */}
          <div className="movie-search__field">
            <label className="movie-search__label" htmlFor="type">
              {t.movieSearch.filters.type}
            </label>
            <select
              className="movie-search__select"
              id="type"
              name="type"
              value={filters.type}
              onChange={onFilterChange}
            >
              <option value="">{t.movieSearch.filters.all}</option>
              <option value="movie">{t.movieSearch.filters.movies}</option>
              <option value="series">{t.movieSearch.filters.series}</option>
            </select>
          </div>

          <div className="movie-search__field">
            <label className="movie-search__label" htmlFor="country">
              {t.movieSearch.filters.country}
            </label>
            <select
              className="movie-search__select"
              id="country"
              name="country"
              value={filters.country}
              onChange={onFilterChange}
            >
              <option value="">{t.movieSearch.filters.allCountries}</option>
              <option value="br">Brasil</option>
              <option value="us">Estados Unidos</option>
              <option value="uk">Reino Unido</option>
              <option value="jp">Japão</option>
              <option value="kr">Coreia do Sul</option>
            </select>
          </div>

          <div className="movie-search__field">
            <label className="movie-search__label" htmlFor="genre">
              {t.movieSearch.filters.genre}
            </label>
            <select
              className="movie-search__select"
              id="genre"
              name="genre"
              value={filters.genre}
              onChange={onFilterChange}
            >
              <option value="">{t.movieSearch.filters.allGenres}</option>
              <option value="action">Ação</option>
              <option value="comedy">Comédia</option>
              <option value="drama">Drama</option>
              <option value="horror">Terror</option>
              <option value="sci-fi">Ficção científica</option>
              <option value="thriller">Suspense</option>
            </select>
          </div>

          <div className="movie-search__field">
            <label className="movie-search__label" htmlFor="yearFrom">
              {t.movieSearch.filters.yearLabel}
            </label>
            <div className="movie-search__range">
              <input
                className="movie-search__range-input"
                id="yearFrom"
                name="yearFrom"
                type="number"
                min="1900"
                max="2100"
                placeholder={t.movieSearch.filters.yearFrom}
                value={filters.yearFrom}
                onChange={onFilterChange}
              />
              <span className="movie-search__range-divider">{t.movieSearch.filters.to}</span>
              <input
                className="movie-search__range-input"
                name="yearTo"
                type="number"
                min="1900"
                max="2100"
                placeholder={t.movieSearch.filters.yearTo}
                value={filters.yearTo}
                onChange={onFilterChange}
              />
            </div>
          </div>

          <div className="movie-search__field">
            <label className="movie-search__label" htmlFor="ratingFrom">
              {t.movieSearch.filters.ratingLabel}
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
                placeholder={t.movieSearch.filters.ratingFrom}
                value={filters.ratingFrom}
                onChange={onFilterChange}
              />
              <span className="movie-search__range-divider">{t.movieSearch.filters.to}</span>
              <input
                className="movie-search__range-input"
                name="ratingTo"
                type="number"
                min="0"
                max="10"
                step="0.1"
                placeholder={t.movieSearch.filters.ratingTo}
                value={filters.ratingTo}
                onChange={onFilterChange}
              />
            </div>
          </div>

          <div className="movie-search__field">
            <label className="movie-search__label" htmlFor="ageRating">
              {t.movieSearch.filters.ageRating}
            </label>
            <select
              className="movie-search__select"
              id="ageRating"
              name="ageRating"
              value={filters.ageRating}
              onChange={onFilterChange}
            >
              <option value="">{t.movieSearch.filters.allAges}</option>
              <option value="l">{t.movieSearch.filters.free}</option>
              <option value="10">10 anos</option>
              <option value="12">12 anos</option>
              <option value="14">14 anos</option>
              <option value="16">16 anos</option>
              <option value="18">18 anos</option>
            </select>
          </div>

          <div className="movie-search__field">
            <label className="movie-search__label" htmlFor="actor">
              {t.movieSearch.filters.actor}
            </label>
            <input
              className="movie-search__input"
              id="actor"
              name="actor"
              type="text"
              placeholder={t.movieSearch.filters.actorPlaceholder}
              value={filters.actor}
              onChange={onFilterChange}
            />
          </div>

          <div className="movie-search__field">
            <label className="movie-search__label" htmlFor="director">
              {t.movieSearch.filters.director}
            </label>
            <input
              className="movie-search__input"
              id="director"
              name="director"
              type="text"
              placeholder={t.movieSearch.filters.directorPlaceholder}
              value={filters.director}
              onChange={onFilterChange}
            />
          </div>

          <div className="movie-search__field">
            <label className="movie-search__label" htmlFor="sortBy">
              {t.movieSearch.filters.sortBy}
            </label>
            <select
              className="movie-search__select"
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={onFilterChange}
            >
              <option value="">{t.movieSearch.filters.mostRelevant}</option>
              <option value="rating">{t.movieSearch.filters.highestRating}</option>
              <option value="year">{t.movieSearch.filters.newest}</option>
              <option value="title">{t.movieSearch.filters.name}</option>
            </select>
          </div>
        </div>

        <div className="movie-search__options">
          <label className="movie-search__checkbox">
            <input
              className="movie-search__checkbox-input"
              name="dubbed"
              type="checkbox"
              checked={filters.dubbed}
              onChange={onFilterChange}
            />
            <span className="movie-search__checkbox-control" />
            <span className="movie-search__checkbox-text">{t.movieSearch.filters.dubbed}</span>
          </label>

          <label className="movie-search__checkbox">
            <input
              className="movie-search__checkbox-input"
              name="subtitled"
              type="checkbox"
              checked={filters.subtitled}
              onChange={onFilterChange}
            />
            <span className="movie-search__checkbox-control" />
            <span className="movie-search__checkbox-text">{t.movieSearch.filters.subtitled}</span>
          </label>

          <button className="movie-search__filter-button" type="submit">
            {t.movieSearch.filters.applyFilters}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedFilters;
