import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { Movie } from '../../types/movie';
import { moviesData } from '../../data/movies';
import './MovieCarousel.css';

type MovieCarouselProps = {
  title?: string;
  movies?: Movie[];
  category?: 'recommended' | 'action' | 'comedy' | 'drama' | 'sciFi'; // para futuras categorias
};

function MovieCarousel({ title, movies = moviesData.movies }: MovieCarouselProps) {
  const { t } = useLanguage();
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  // Se não for passado título, usa a tradução padrão
  const carouselTitle = title || t.movieCarousel?.defaultTitle || 'Filmes recomendados';

  // Calcula a largura de 1 card + gap dinamicamente
  useEffect(() => {
    const calculateScrollAmount = () => {
      if (!carouselTrackRef.current) return;

      const track = carouselTrackRef.current;
      const firstCard = track.querySelector('.movie-carousel__card') as HTMLElement;

      if (!firstCard) return;

      // Pega a largura total do card (incluindo margens/gaps)
      const cardWidth = firstCard.offsetWidth;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;

      setScrollAmount(cardWidth + gap);
    };

    calculateScrollAmount();

    // Recalcula em resize da tela
    const handleResize = () => {
      calculateScrollAmount();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePreviousClick = () => {
    carouselTrackRef.current?.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleNextClick = () => {
    carouselTrackRef.current?.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="movie-carousel">
      <div className="movie-carousel__container">
        <div className="movie-carousel__header">
          <div className="movie-carousel__navigation">
            <button
              className="movie-carousel__navigation-button"
              type="button"
              onClick={handlePreviousClick}
              aria-label={t.movieCarousel?.previousAria || 'Ver filmes anteriores'}
            >
              <svg
                className="movie-carousel__navigation-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path className="movie-carousel__navigation-icon-path" d="M15 18L9 12L15 6" />
              </svg>
            </button>

            <button
              className="movie-carousel__navigation-button"
              type="button"
              onClick={handleNextClick}
              aria-label={t.movieCarousel?.nextAria || 'Ver próximos filmes'}
            >
              <svg
                className="movie-carousel__navigation-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path className="movie-carousel__navigation-icon-path" d="M9 18L15 12L9 6" />
              </svg>
            </button>
          </div>

          <h2 className="movie-carousel__title">{carouselTitle}</h2>
        </div>

        <div ref={carouselTrackRef} className="movie-carousel__track">
          {movies.map((movie) => (
            <article className="movie-carousel__card" key={movie.id}>
              <div className="movie-carousel__poster">
                <img
                  className="movie-carousel__image"
                  src={movie.image}
                  alt={`Pôster do filme ${movie.title}`}
                  loading="lazy"
                />

                <div className="movie-carousel__overlay">
                  <div className="movie-carousel__overlay-content">
                    <h3 className="movie-carousel__overlay-title">{movie.title}</h3>

                    <p className="movie-carousel__description">{movie.description}</p>

                    <button className="movie-carousel__watch-button" type="button">
                      {t.movieCarousel?.watchButton || 'Assistir'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="movie-carousel__content">
                <div className="movie-carousel__metadata">
                  <div className="movie-carousel__rating">
                    <span className="movie-carousel__rating-icon">★</span>
                    <span className="movie-carousel__metadata-value">
                      {movie.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="movie-carousel__duration">
                    <svg
                      className="movie-carousel__duration-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="movie-carousel__duration-icon-circle"
                        cx="12"
                        cy="12"
                        r="8"
                      />
                      <path className="movie-carousel__duration-icon-path" d="M12 7V12L15 15" />
                    </svg>
                    <span className="movie-carousel__metadata-value">{movie.duration}</span>
                  </div>
                </div>

                <h3 className="movie-carousel__movie-title">{movie.title}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="movie-carousel__footer">
          <button className="movie-carousel__more-button" type="button">
            <span className="movie-carousel__more-button-text">
              {t.movieCarousel?.showMore || 'Mostrar mais'}
            </span>
            <svg
              className="movie-carousel__more-button-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path className="movie-carousel__more-button-icon-path" d="M10 6L16 12L10 18" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default MovieCarousel;
