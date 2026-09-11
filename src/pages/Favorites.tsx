// src/pages/Favorites.tsx
import PageContainer from '../components/PageContainer/PageContainer';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import Footer from '../components/Footer/Footer';

function Favorites() {
  return (
    <PageContainer>
      <MovieGrid />
      <Footer />
    </PageContainer>
  );
}

export default Favorites;
