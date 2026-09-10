import Hero from '../components/Hero/Hero';
import MovieSearch from '../components/MovieSearch/MovieSearch';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import FeaturedMovie from '../components/FeaturedMovie/FeaturedMovie';
import RegisterBlock from '../components/RegisterBlock/RegisterBlock';
import Footer from '../components/Footer/Footer';

function Home() {
  return (
    <>
      <Hero />
      <MovieSearch />

      {/* ============================================
          CARROSSEIS TEMÁTICOS
          Cada tema traz filmes de gêneros diferentes
      ============================================ */}

      <MovieCarousel theme="action" />
      <MovieCarousel theme="comedy" />

      <FeaturedMovie />

      <MovieCarousel theme="horror" />
      <MovieCarousel theme="animation" />

      <FeaturedMovie />

      <MovieCarousel theme="sciFi" />
      <MovieCarousel theme="fantasy" />
      <MovieCarousel theme="romance" />

      <MovieCarousel theme="cineTomato" />

      <RegisterBlock />
      <Footer />
    </>
  );
}

export default Home;
