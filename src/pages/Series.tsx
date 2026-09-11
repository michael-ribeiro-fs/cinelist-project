// src/pages/Series.tsx
import PageContainer from '../components/PageContainer/PageContainer';
import Header from '../components/Header/Header';
import MovieSearch from '../components/MovieSearch/MovieSearch';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import Footer from '../components/Footer/Footer';
function Series() {
  return (
    <PageContainer>
      <Header />
      <MovieSearch />
      <MovieGrid />
      <Footer />
    </PageContainer>
  );
}

export default Series;
