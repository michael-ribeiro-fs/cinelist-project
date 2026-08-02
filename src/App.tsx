import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import SearchBar from './components/SearchBar/SearchBar';
import FilterBar from './components/FilterBar/FilterBar';

import './App.css';
function App() {
  return (
    <>
      <div className="page">
        <Header />
        <Hero />
        <SearchBar />
        <FilterBar />
      </div>
    </>
  );
}

export default App;
