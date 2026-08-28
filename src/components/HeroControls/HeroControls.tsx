import type { Movie } from '../../types/movie';

interface HeroControlsProps {
  movies: Movie[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
}

function HeroControls({ movies, currentIndex, onNext, onPrev, onGoTo }: HeroControlsProps) {
  return (
    <div className="hero__controls">
      <button
        className="hero__arrow hero__arrow--previous"
        type="button"
        onClick={onPrev}
        aria-label="Filme anterior"
      >
        ←
      </button>

      <div className="hero__indicators">
        {movies.map((movie, index) => (
          <button
            key={movie.id}
            className={`hero__indicator ${index === currentIndex ? 'hero__indicator--active' : ''}`}
            type="button"
            onClick={() => onGoTo(index)}
            aria-label={`Ir para ${movie.title}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          />
        ))}
      </div>

      <button
        className="hero__arrow hero__arrow--next"
        type="button"
        onClick={onNext}
        aria-label="Próximo filme"
      >
        →
      </button>
    </div>
  );
}

export default HeroControls;
