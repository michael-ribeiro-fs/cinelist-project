import { useLanguage } from '../../context/LanguageContext';
import leftRetangle from '../../assets/images/left-retangle.png';
import rightRetangle from '../../assets/images/right-retangle.png';
import './Footer.css';

function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <img
        className="footer__decorative-image footer__decorative-image--top"
        src={rightRetangle}
        alt=""
        aria-hidden="true"
      />

      <img
        className="footer__decorative-image footer__decorative-image--bottom"
        src={leftRetangle}
        alt=""
        aria-hidden="true"
      />

      <div className="footer__container">
        <div className="footer__content">
          <nav className="footer__navigation" aria-label="Navegação do rodapé">
            <div className="footer__navigation-column">
              <h3 className="footer__navigation-title">{t.footer.navigation.cinema}</h3>
              <ul className="footer__navigation-list">
                <li>
                  <a className="footer__navigation-link" href="#home">
                    {t.footer.navigation.home}
                  </a>
                </li>
                <li>
                  <a className="footer__navigation-link" href="#movies">
                    {t.footer.navigation.movies}
                  </a>
                </li>
                <li>
                  <a className="footer__navigation-link" href="#series">
                    {t.footer.navigation.series}
                  </a>
                </li>
                <li>
                  <a className="footer__navigation-link" href="#categories">
                    {t.footer.navigation.categories}
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__navigation-column">
              <h3 className="footer__navigation-title">{t.footer.navigation.discover}</h3>
              <ul className="footer__navigation-list">
                <li>
                  <a className="footer__navigation-link" href="#popular">
                    {t.footer.navigation.popular}
                  </a>
                </li>
                <li>
                  <a className="footer__navigation-link" href="#releases">
                    {t.footer.navigation.releases}
                  </a>
                </li>
                <li>
                  <a className="footer__navigation-link" href="#ratings">
                    {t.footer.navigation.ratings}
                  </a>
                </li>
                <li>
                  <a className="footer__navigation-link" href="#search">
                    {t.footer.navigation.search}
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__navigation-column">
              <h3 className="footer__navigation-title">{t.footer.navigation.support}</h3>
              <ul className="footer__navigation-list">
                <li>
                  <a className="footer__navigation-link" href="#about">
                    {t.footer.navigation.about}
                  </a>
                </li>
                <li>
                  <a className="footer__navigation-link" href="#contact">
                    {t.footer.navigation.contact}
                  </a>
                </li>
                <li>
                  <a className="footer__navigation-link" href="#help">
                    {t.footer.navigation.help}
                  </a>
                </li>
                <li>
                  <a className="footer__navigation-link" href="#faq">
                    {t.footer.navigation.faq}
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__navigation-column">
              <h3 className="footer__navigation-title">{t.footer.navigation.info}</h3>
              <ul className="footer__navigation-list">
                <li>
                  <a className="footer__navigation-link" href="#privacy">
                    {t.footer.navigation.privacy}
                  </a>
                </li>
                <li>
                  <a className="footer__navigation-link" href="#terms">
                    {t.footer.navigation.terms}
                  </a>
                </li>
                <li>
                  <a className="footer__navigation-link" href="#cookies">
                    {t.footer.navigation.cookies}
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <section className="footer__brand">
            <p className="footer__description">{t.footer.description}</p>
            <p className="footer__support">{t.footer.support}</p>

            <div className="footer__social-links">
              <a className="footer__social-link" href="#facebook" aria-label="Facebook">
                <svg className="footer__social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    className="footer__social-icon-path"
                    d="M14 8H17V4H14C10.5 4 8.5 6 8.5 9.7V12H5V16H8.5V22H12.5V16H16L17 12H12.5V10C12.5 8.7 12.9 8 14 8Z"
                  />
                </svg>
              </a>

              <a className="footer__social-link" href="#instagram" aria-label="Instagram">
                <svg className="footer__social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    className="footer__social-icon-shape"
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />
                  <circle className="footer__social-icon-shape" cx="12" cy="12" r="4" />
                  <circle className="footer__social-icon-fill" cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>

              <a className="footer__social-link" href="#twitter" aria-label="Twitter">
                <svg className="footer__social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    className="footer__social-icon-path"
                    d="M21 6.5C20.2 6.9 19.3 7.2 18.4 7.3C19.4 6.7 20.1 5.9 20.4 4.8C19.5 5.4 18.5 5.8 17.4 6C16.5 5 15.2 4.4 13.8 4.4C11.1 4.4 9 6.6 9 9.3C9 9.7 9 10.1 9.1 10.5C5.2 10.3 1.7 8.4 -0.6 5.4C-1 6.1 -1.2 6.9 -1.2 7.8C-1.2 9.4 -0.4 10.9 1 11.7C0.3 11.7 -0.4 11.5 -1 11.2C-1 13.5 0.6 15.5 2.9 16C2.5 16.1 2 16.2 1.5 16.2C1.2 16.2 0.9 16.2 0.5 16.1C1.1 18.2 3.1 19.7 5.5 19.7C3.6 21.2 1.3 22 -1.2 22C-1.6 22 -2 22 -2.4 21.9C0.1 23.5 2.9 24.4 5.9 24.4C13.8 24.4 18.1 17.8 18.1 12.1C18.1 11.9 18.1 11.7 18.1 11.5C19.1 10.9 20 10.1 20.8 9.1L21 6.5Z"
                  />
                </svg>
              </a>

              <a className="footer__social-link" href="#telegram" aria-label="Telegram">
                <svg className="footer__social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    className="footer__social-icon-path"
                    d="M21.5 3.8L18.4 20.2C18.2 21.3 17.5 21.6 16.6 21L11.3 17.1L8.8 19.6C8.5 19.9 8.2 20.1 7.6 20.1L8 14.8L17.7 6.1C18.1 5.7 17.6 5.5 17.1 5.9L5.1 13.4L0 11.8C-1 11.5 -1.1 10.8 0.2 10.3L20.3 2.5C21.3 2.1 21.9 2.7 21.5 3.8Z"
                  />
                </svg>
              </a>
            </div>
          </section>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {t.footer.brand}. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
