import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

type HeaderProps = {
  onSearch?: (searchTerm: string) => void;
};

function Header({ onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedSearch = searchTerm.trim();
    if (!normalizedSearch) return;
    onSearch?.(normalizedSearch);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Substituído <a> por <Link> */}
        <Link className="header__brand" to="/" aria-label="MovieList - Página inicial">
          <span className="header__brand-mark" />
          <span className="header__brand-text">MovieList</span>
        </Link>

        <button
          className="header__menu-button"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
          onClick={handleMenuToggle}
        >
          <span className="header__menu-line" />
          <span className="header__menu-line" />
          <span className="header__menu-line" />
        </button>

        <nav
          className={`header__navigation ${isMenuOpen ? 'header__navigation--open' : ''}`}
          aria-label="Navegação principal"
        >
          <ul className="header__menu">
            <li className="header__menu-item">
              <NavLink
                className={({ isActive }) =>
                  `header__menu-link ${isActive ? 'header__menu-link--active' : ''}`
                }
                to="/"
                onClick={handleMenuClose}
                end
              >
                Home
              </NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink
                className={({ isActive }) =>
                  `header__menu-link ${isActive ? 'header__menu-link--active' : ''}`
                }
                to="/movies"
                onClick={handleMenuClose}
              >
                Filmes
              </NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink
                className={({ isActive }) =>
                  `header__menu-link ${isActive ? 'header__menu-link--active' : ''}`
                }
                to="/series"
                onClick={handleMenuClose}
              >
                Séries
              </NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink
                className={({ isActive }) =>
                  `header__menu-link ${isActive ? 'header__menu-link--active' : ''}`
                }
                to="/favorites"
                onClick={handleMenuClose}
              >
                Favoritos
              </NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink
                className={({ isActive }) =>
                  `header__menu-link ${isActive ? 'header__menu-link--active' : ''}`
                }
                to="/about"
                onClick={handleMenuClose}
              >
                Sobre
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <form className="header__search" onSubmit={handleSearchSubmit} role="search">
            <input
              className="header__search-input"
              type="search"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Pesquisar filmes"
            />
            <button className="header__search-button" type="submit" aria-label="Pesquisar">
              <svg className="header__search-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6" />
                <path d="M16 16L21 21" />
              </svg>
            </button>
          </form>

          {/* Botões de login/signup podem continuar como <a> se não tiverem rotas próprias */}
          <a className="header__login-button" href="#login">
            Entrar
          </a>
          <a className="header__signup-button" href="#signup">
            Criar conta
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
