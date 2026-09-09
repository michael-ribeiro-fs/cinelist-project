import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  usePopularMovies,
  useUpcomingMovies,
  useTrendingMovies,
  useNowPlayingMovies,
  useMoviesByGenre,
} from '../../hooks/queries/useMovies';
import type { Movie } from '../../types/movie';
import './MovieCarousel.css';

type MovieCarouselProps = {
  title?: string;
  movies?: Movie[];
  category?: 'popular' | 'upcoming' | 'trending' | 'nowPlaying' | 'action' | 'sciFi' | 'comedy';
  limit?: number;
};

function MovieCarousel({
  title,
  movies: externalMovies,
  category = 'popular',
  limit,
}: MovieCarouselProps) {
  const { t } = useLanguage();
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  // Determina qual hook usar e os argumentos
  let result;
  if (category === 'popular' || (!category && !externalMovies)) {
    result = usePopularMovies(1, limit);
  } else if (category === 'upcoming') {
    result = useUpcomingMovies(1, limit);
  } else if (category === 'trending') {
    result = useTrendingMovies('week', limit);
  } else if (category === 'nowPlaying') {
    result = useNowPlayingMovies(1, limit);
  } else if (category === 'action') {
    result = useMoviesByGenre(28, 1, limit);
  } else if (category === 'sciFi') {
    result = useMoviesByGenre(878, 1, limit);
  } else if (category === 'comedy') {
    result = useMoviesByGenre(35, 1, limit);
  } else {
    result = usePopularMovies(1, limit);
  }

  const { data: apiMovies, isLoading, error } = result;
  const movies = externalMovies ?? apiMovies ?? [];

  // Título
  const defaultTitle = t.movieCarousel?.defaultTitle || 'Filmes recomendados';
  const carouselTitle = title || defaultTitle;

  // Scroll dinâmico – RECALCULADO SEMPRE QUE OS FILMES MUDAREM
  useEffect(() => {
    // Função que calcula a largura de 1 card + gap
    const calculateScrollAmount = () => {
      if (!carouselTrackRef.current) return;
      const track = carouselTrackRef.current;
      const firstCard = track.querySelector('.movie-carousel__card') as HTMLElement;
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      setScrollAmount(cardWidth + gap);
    };

    // Executa o cálculo após o DOM ser atualizado
    requestAnimationFrame(() => {
      calculateScrollAmount();
    });

    // Recalcula em resize da tela
    const handleResize = () => {
      requestAnimationFrame(calculateScrollAmount);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [movies]); // <-- DEPENDÊNCIA: executa sempre que a lista de filmes mudar

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

  // Early returns após todos os hooks
  if (!externalMovies && isLoading) {
    return (
      <div className="movie-carousel">
        <div className="movie-carousel__container">
          <p style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
            Carregando filmes...
          </p>
        </div>
      </div>
    );
  }

  if (!externalMovies && error) {
    return (
      <div className="movie-carousel">
        <div className="movie-carousel__container">
          <p style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
            Erro ao carregar filmes. Tente novamente.
          </p>
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="movie-carousel">
        <div className="movie-carousel__container">
          <p style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
            Nenhum filme disponível.
          </p>
        </div>
      </div>
    );
  }

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
