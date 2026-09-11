import type { Movie } from '../../types/movie';
import { moviesData } from '../../data/movies';
import './MovieGrid.css';

type MovieGridProps = {
  movies?: Movie[];
  title?: string;
};

function MovieGrid({ movies = moviesData.movies, title = 'Filmes' }: MovieGridProps) {
  return (
    <section className="movie-grid" aria-labelledby="movie-grid-title">
      <div className="movie-grid__container">
        <div className="movie-grid__header">
          <h1 className="movie-grid__title" id="movie-grid-title">
            {title}
          </h1>

          <span className="movie-grid__count">{movies.length} filmes encontrados</span>
        </div>

        {movies.length > 0 ? (
          <div className="movie-grid__list">
            {movies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <div className="movie-card__image-wrapper">
                  <img
                    className="movie-card__image"
                    src={movie.image}
                    alt={`Pôster do filme ${movie.title}`}
                    loading="lazy"
                  />

                  <div className="movie-card__overlay">
                    <button
                      className="movie-card__favorite"
                      type="button"
                      aria-label={`Adicionar ${movie.title} aos favoritos`}
                    >
                      <span className="movie-card__favorite-icon" aria-hidden="true">
                        ♡
                      </span>
                    </button>

                    <button className="movie-card__details" type="button">
                      Ver detalhes
                    </button>
                  </div>
                </div>

                <div className="movie-card__body">
                  <div className="movie-card__metadata">
                    <span className="movie-card__rating">
                      <span className="movie-card__rating-icon" aria-hidden="true">
                        ★
                      </span>

                      <span className="movie-card__rating-value">{movie.rating}</span>
                    </span>

                    <span className="movie-card__duration">
                      <span className="movie-card__duration-icon" aria-hidden="true">
                        ◷
                      </span>

                      <span className="movie-card__duration-value">{movie.duration}</span>
                    </span>
                  </div>

                  <h2 className="movie-card__title" title={movie.title}>
                    {movie.title}
                  </h2>

                  <span className="movie-card__year">{movie.year}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="movie-grid__empty">
            <span className="movie-grid__empty-icon" aria-hidden="true">
              🎬
            </span>

            <h2 className="movie-grid__empty-title">Nenhum filme encontrado</h2>

            <p className="movie-grid__empty-text">
              Tente alterar os filtros ou realizar uma nova busca.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default MovieGrid;
