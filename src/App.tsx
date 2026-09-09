// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { QueryProvider } from './providers/QueryProvider';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Actor from './pages/Actor';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <QueryProvider>
        <BrowserRouter>
          <div className="page">
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/series" element={<Series />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/about" element={<About />} />
                <Route path="/actor" element={<Actor />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </QueryProvider>
    </LanguageProvider>
  );
}

export default App;
