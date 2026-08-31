import type { Movie } from '../../types/movie';
import type { Translations } from '../../types/language';
import './HeroControls.css';

interface HeroControlsProps {
  movies: Movie[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
  t: Translations; // <-- recebe as traduções via prop
}

function HeroControls({ movies, currentIndex, onNext, onPrev, onGoTo, t }: HeroControlsProps) {
  return (
    <div className="hero__controls">
      <button
        className="hero__arrow hero__arrow--previous"
        type="button"
        onClick={onPrev}
        aria-label={t.hero.previous}
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
            aria-label={`${t.hero.goTo} ${movie.title}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          />
        ))}
      </div>

      <button
        className="hero__arrow hero__arrow--next"
        type="button"
        onClick={onNext}
        aria-label={t.hero.next}
      >
        →
      </button>
    </div>
  );
}

export default HeroControls;
