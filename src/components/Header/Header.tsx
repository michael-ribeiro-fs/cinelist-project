import { useEffect, useState } from 'react';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const menuLinks = (
    <nav className="nav_bar">
      <a href="#" className="nav_links">
        Movies
      </a>
      <a href="#" className="nav_links">
        TV Shows
      </a>
      <a href="#" className="nav_links">
        Suggest me
      </a>
    </nav>
  );

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (!target.closest('.header')) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <>
      <header className="header">
        <img className="header_image" src="src/assets/icon.png" alt="icon" />
        <button
          className={`menu-button ${menuOpen ? 'menu-button--open' : ''}`}
          type="button"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span>—</span>
          <span>—</span>
          <span>—</span>
        </button>
        {isDesktop && menuLinks}
        {menuOpen && menuLinks}
      </header>
    </>
  );
}

export default Header;
