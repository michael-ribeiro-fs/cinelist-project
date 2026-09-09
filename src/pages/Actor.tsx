import Header from '../components/Header/Header';
import ActorHero from '../components/ActorHero/ActorHero';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import Footer from '../components/Footer/Footer';

function Actor() {
  return (
    <>
      <Header />
      <ActorHero />
      <MovieCarousel />
      <MovieCarousel />
      <MovieCarousel />
      <Footer />
    </>
  );
}

export default Actor;
