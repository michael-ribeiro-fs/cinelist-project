// src/components/MovieSearch/BasicSearch.tsx
import { useLanguage } from '../../context/LanguageContext';
import './MovieSearch.css';

interface BasicSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  // onSubmit removido pois não é usado
}

function BasicSearch({ searchTerm, onSearchChange }: BasicSearchProps) {
  const { t } = useLanguage();

  return (
    <div className="movie-search__basic">
      <div className="movie-search__basic-content">
        <h2 className="movie-search__basic-title">{t.movieSearch.simpleTitle}</h2>

        <div className="movie-search__basic-input-wrapper">
          <input
            className="movie-search__basic-input"
            type="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.movieSearch.simplePlaceholder}
            aria-label={t.movieSearch.simplePlaceholder}
          />

          <button
            className="movie-search__basic-icon-button"
            type="submit"
            aria-label={t.movieSearch.searchButton}
          >
            <svg className="movie-search__search-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="movie-search__search-icon-circle" cx="11" cy="11" r="6" />
              <path className="movie-search__search-icon-line" d="M16 16L21 21" />
            </svg>
          </button>
        </div>

        <button className="movie-search__basic-button" type="submit">
          {t.movieSearch.searchButton}
        </button>
      </div>
    </div>
  );
}

export default BasicSearch;
