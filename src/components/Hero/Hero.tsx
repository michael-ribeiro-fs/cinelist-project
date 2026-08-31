import { moviesData } from '../../data/movies';
import { useCarousel } from '../../hooks/useCarousel';
import { useLanguage } from '../../context/LanguageContext';
import HeroControls from '../HeroControls/HeroControls';
import './Hero.css';

const AUTOPLAY_INTERVAL = 60000;

function Hero() {
  const { t } = useLanguage(); // <-- contexto de tradução
  const movies = moviesData.movies;
  const total = movies.length;

  const { currentIndex, goTo, next, prev, setIsPaused } = useCarousel({
    total,
    interval: AUTOPLAY_INTERVAL,
    autoPlay: true,
  });

  const activeMovie = movies[currentIndex];

  // Pausar autoplay no hover/foco
  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  // Suporte a teclado (setas)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    }
  };

  return (
    <section
      className="hero"
      id="home"
      aria-roledescription="carousel"
      aria-label="Filmes em destaque"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocus={handlePause}
      onBlur={handleResume}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="hero__background">
        <img className="hero__background-image" src={activeMovie.image} alt="" />
      </div>

      <div className="hero__overlay" />

      <div className="hero__container">
        <div className="hero__content" aria-live="polite" aria-atomic="true">
          <p className="hero__eyebrow">{t.hero.eyebrow}</p>

          <h1 className="hero__title">
            {activeMovie.title} <span className="hero__year">{activeMovie.year}</span>
          </h1>

          <div className="hero__separator" />

          <h2 className="hero__subtitle">{t.hero.synopsis}</h2>

          <p className="hero__description">{activeMovie.description}</p>

          <div className="hero__genre">
            <span className="hero__genre-label">{t.hero.genre}</span>
            <span className="hero__genre-value">{activeMovie.genre}</span>
          </div>

          <div className="hero__meta">
            <div className="hero__rating">
              <span className="hero__rating-value">★ {activeMovie.rating.toFixed(1)}/10</span>
            </div>
            <span className="hero__meta-divider" />
            <div className="hero__duration">
              <span className="hero__duration-value">⏱ {activeMovie.duration}</span>
            </div>
          </div>

          <button className="hero__cta" type="button">
            {t.hero.watchNow}
          </button>
        </div>
      </div>

      <HeroControls
        movies={movies}
        currentIndex={currentIndex}
        onNext={next}
        onPrev={prev}
        onGoTo={goTo}
        t={t} // <-- passa as traduções para os controles
      />

      <div className="hero__progress">
        <span key={activeMovie.id} className="hero__progress-bar" />
      </div>
    </section>
  );
}

export default Hero;
