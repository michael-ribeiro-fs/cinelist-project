import { useCarousel } from '../../hooks/useCarousel';
import { useLanguage } from '../../context/LanguageContext';
import { useTrendingMovies } from '../../hooks/queries/useMovies';
import './FeaturedMovie.css';

const AUTOPLAY_INTERVAL = 7000;

function FeaturedMovie() {
  const { t } = useLanguage();
  const { data: movies, isLoading, error } = useTrendingMovies('week', 7);

  // 🔥 IMPORTANTE: useCarousel SEMPRE deve ser chamado, mesmo se não tiver dados
  const total = movies?.length || 0;
  const { currentIndex, goTo, next, prev, setIsPaused } = useCarousel({
    total,
    interval: AUTOPLAY_INTERVAL,
    autoPlay: total > 0,
  });

  // Agora os early returns vêm DEPOIS de todos os hooks
  if (isLoading) {
    return (
      <div className="featured-movie">
        <div className="featured-movie__container">
          <p style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
            Carregando filmes em destaque...
          </p>
        </div>
      </div>
    );
  }

  if (error || !movies || movies.length === 0) {
    return (
      <div className="featured-movie">
        <div className="featured-movie__container">
          <p style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
            Erro ao carregar filmes. Tente novamente.
          </p>
        </div>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  return (
    <section
      className="featured-movie"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocus={handlePause}
      onBlur={handleResume}
    >
      <div className="featured-movie__container">
        <div className="featured-movie__background">
          <img
            className="featured-movie__background-image"
            src={currentMovie.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <div className="featured-movie__background-overlay" />
        </div>

        <div className="featured-movie__content">
          <div className="featured-movie__information">
            <h2 className="featured-movie__title">
              {currentMovie.title} {currentMovie.year}
            </h2>

            <div className="featured-movie__category">
              <span className="featured-movie__category-label">
                {t.featuredMovie?.genre || 'Gênero'}
              </span>
              <p className="featured-movie__category-value">{currentMovie.genre}</p>
            </div>

            <div className="featured-movie__summary">
              <span className="featured-movie__summary-label">
                {t.featuredMovie?.synopsis || 'Sinopse'}
              </span>
              <p className="featured-movie__description">{currentMovie.description}</p>
            </div>

            <div className="featured-movie__metadata">
              <div className="featured-movie__metadata-item">
                <span className="featured-movie__metadata-label">
                  {t.featuredMovie?.duration || 'Duração'}
                </span>
                <span className="featured-movie__duration">{currentMovie.duration}</span>
              </div>

              <div className="featured-movie__metadata-item">
                <span className="featured-movie__metadata-label">
                  {t.featuredMovie?.rating || 'Avaliação'}
                </span>
                <div className="featured-movie__rating">
                  <span className="featured-movie__rating-icon">★</span>
                  <span className="featured-movie__rating-value">
                    {currentMovie.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <button className="featured-movie__watch-button" type="button">
              {t.featuredMovie?.watchNow || 'Assistir agora'}
            </button>
          </div>
        </div>

        <div className="featured-movie__navigation">
          <button
            className="featured-movie__navigation-button"
            type="button"
            onClick={prev}
            aria-label={t.featuredMovie?.previous || 'Filme anterior'}
          >
            <svg className="featured-movie__navigation-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path className="featured-movie__navigation-path" d="M15 18L9 12L15 6" />
            </svg>
          </button>

          <div className="featured-movie__indicators">
            {movies.map((movie, index) => (
              <button
                key={movie.id}
                className={`featured-movie__indicator ${
                  index === currentIndex ? 'featured-movie__indicator--active' : ''
                }`}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`${t.featuredMovie?.goTo || 'Mostrar'} ${movie.title}`}
              />
            ))}
          </div>

          <button
            className="featured-movie__navigation-button"
            type="button"
            onClick={next}
            aria-label={t.featuredMovie?.next || 'Próximo filme'}
          >
            <svg className="featured-movie__navigation-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path className="featured-movie__navigation-path" d="M9 18L15 12L9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedMovie;
