// src/components/Header/Header.tsx
import { Link, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { logger } from '../../utils/logger';
import { LANGUAGES, type LanguageCode } from '../../constants/languages';
import './Header.css';

type HeaderProps = {
  onSearch?: (searchTerm: string) => void;
};

// REMOVA a definição local de LANGUAGES

function Header({ onSearch }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const languageWrapperRef = useRef<HTMLDivElement>(null);

  // Fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageWrapperRef.current &&
        !languageWrapperRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    if (isLanguageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageMenuOpen]);

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

  const handleLanguageToggle = () => {
    setIsLanguageMenuOpen((prev) => !prev);
  };

  const handleLanguageSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsLanguageMenuOpen(false);
    logger.log(`Idioma alterado para: ${code}`);
  };

  const handleMouseLeave = () => {
    setIsLanguageMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__brand" to="/" aria-label="MovieList - Página inicial">
          <span className="header__brand-mark" />
          <span className="header__brand-text">{t.header.brand}</span>
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
                {t.header.menu.home}
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
                {t.header.menu.movies}
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
                {t.header.menu.series}
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
                {t.header.menu.favorites}
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
                {t.header.menu.about}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <form className="header__search" onSubmit={handleSearchSubmit} role="search">
            <input
              className="header__search-input"
              type="search"
              placeholder={t.header.searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label={t.header.searchPlaceholder}
            />
            <button className="header__search-button" type="submit" aria-label="Pesquisar">
              <svg className="header__search-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6" />
                <path d="M16 16L21 21" />
              </svg>
            </button>
          </form>

          <a className="header__login-button" href="#login">
            {t.header.login}
          </a>
          <a className="header__signup-button" href="#signup">
            {t.header.signup}
          </a>

          <div
            className="header__language-wrapper"
            ref={languageWrapperRef}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="header__language-button"
              type="button"
              aria-label="Selecionar idioma"
              aria-expanded={isLanguageMenuOpen}
              onClick={handleLanguageToggle}
            >
              <span className="header__language-icon">🌐</span>
            </button>

            {isLanguageMenuOpen && (
              <div className="header__language-dropdown">
                <ul className="header__language-list">
                  {LANGUAGES.map((lang) => (
                    <li key={lang.code} className="header__language-item">
                      <button
                        className={`header__language-option ${
                          language === lang.code ? 'header__language-option--active' : ''
                        }`}
                        type="button"
                        onClick={() => handleLanguageSelect(lang.code)}
                      >
                        <span className="header__language-flag">{lang.flag}</span>
                        <span className="header__language-label">{lang.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
