// src/components/MovieSearch/MovieSearch.tsx
import { useState } from 'react';
import BasicSearch from './BasicSearch';
import AdvancedFilters from './AdvancedFilters';
import { logger } from '../../utils/logger';
import './MovieSearch.css';

export type SearchFilters = {
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

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const checked = type === 'checkbox' ? (event.target as HTMLInputElement).checked : false;

    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSearch = () => {
    onSearch?.(searchTerm.trim(), filters);
    logger.log({
      searchTerm: searchTerm.trim(),
      filters,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  const toggleAdvanced = () => {
    setIsAdvancedOpen((prev) => !prev);
  };

  return (
    <section className="movie-search" id="movies">
      <div className="movie-search__container">
        <form className="movie-search__form" onSubmit={handleSubmit}>
          <BasicSearch searchTerm={searchTerm} onSearchChange={handleSearchTermChange} />

          <AdvancedFilters
            isOpen={isAdvancedOpen}
            filters={filters}
            onFilterChange={handleFilterChange}
            onToggle={toggleAdvanced}
          />
        </form>
      </div>
    </section>
  );
}

export default MovieSearch;
