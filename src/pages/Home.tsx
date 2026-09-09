import { useLanguage } from '../context/LanguageContext';
import Hero from '../components/Hero/Hero';
import MovieSearch from '../components/MovieSearch/MovieSearch';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import FeaturedMovie from '../components/FeaturedMovie/FeaturedMovie';
import RegisterBlock from '../components/RegisterBlock/RegisterBlock';
import Footer from '../components/Footer/Footer';

function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Hero />
      <MovieSearch />

      {/* 1º Carrossel: Recomendados (popular) */}
      <MovieCarousel category="popular" />

      {/* 2º Carrossel: Lançamentos (upcoming) */}
      <MovieCarousel category="upcoming" title={t.movieCarousel.categories.releases} />

      {/* 1º Featured */}
      <FeaturedMovie />

      {/* 3º Carrossel: Em alta (trending) */}
      <MovieCarousel category="trending" title={t.movieCarousel.categories.trending} />

      {/* 4º Carrossel: Mais assistidos (nowPlaying) */}
      <MovieCarousel category="nowPlaying" title={t.movieCarousel.categories.popular} />

      {/* 2º Featured */}
      <FeaturedMovie />

      {/* 5º Carrossel: Ação e aventura */}
      <MovieCarousel category="action" title={t.movieCarousel.categories.action} />

      {/* 6º Carrossel: Ficção científica */}
      <MovieCarousel category="sciFi" title={t.movieCarousel.categories.sciFi} />

      {/* 7º Carrossel: Comédias */}
      <MovieCarousel category="comedy" title={t.movieCarousel.categories.comedy} />

      <RegisterBlock />
      <Footer />
    </>
  );
}

export default Home;
