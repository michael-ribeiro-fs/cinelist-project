import { useLanguage } from '../context/LanguageContext';
import Hero from '../components/Hero/Hero';
import MovieSearch from '../components/MovieSearch/MovieSearch';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import FeaturedMovie from '../components/FeaturedMovie/FeaturedMovie';
import RegisterBlock from '../components/RegisterBlock/RegisterBlock';

function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Hero />
      <MovieSearch />

      {/* 1º Carrossel: Recomendados (título padrão) */}
      <MovieCarousel />

      {/* 2º Carrossel: Lançamentos */}
      <MovieCarousel title={t.movieCarousel.categories.releases} />

      {/* 1º Featured */}
      <FeaturedMovie />

      {/* 3º Carrossel: Em alta */}
      <MovieCarousel title={t.movieCarousel.categories.trending} />

      {/* 4º Carrossel: Mais assistidos */}
      <MovieCarousel title={t.movieCarousel.categories.popular} />

      {/* 2º Featured */}
      <FeaturedMovie />

      {/* 5º Carrossel: Ação e aventura */}
      <MovieCarousel title={t.movieCarousel.categories.action} />

      {/* 6º Carrossel: Ficção científica */}
      <MovieCarousel title={t.movieCarousel.categories.sciFi} />

      {/* 7º Carrossel: Comédias */}
      <MovieCarousel title={t.movieCarousel.categories.comedy} />
      <RegisterBlock />
    </>
  );
}

export default Home;
