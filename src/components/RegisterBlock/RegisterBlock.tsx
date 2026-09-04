import { useLanguage } from '../../context/LanguageContext';
import './RegisterBlock.css';

export default function RegisterBlock() {
  const { t, language } = useLanguage();

  // Define a direção do texto com base no idioma (RTL para árabe e persa)
  const isRTL = language === 'ar'; // se tiver persa, adicione
  const dir = isRTL ? 'rtl' : 'ltr';

  return (
    <section className="register-block" aria-labelledby="register-title" dir={dir}>
      <div className="register-block__form">
        <h2 id="register-title" className="register-block__title">
          {t.register.title}
        </h2>

        <form className="register-block__form-content">
          <div className="register-block__row">
            <div className="register-block__field">
              <label htmlFor="name">{t.register.name}</label>
              <div className="register-block__input-wrapper">
                <input
                  id="name"
                  type="text"
                  placeholder={t.register.namePlaceholder}
                  aria-label={t.register.name}
                  aria-required="true"
                />
                <span aria-hidden="true">♙</span>
              </div>
            </div>

            <div className="register-block__field">
              <label htmlFor="phone">{t.register.phone}</label>
              <div className="register-block__input-wrapper">
                <input
                  id="phone"
                  type="tel"
                  placeholder={t.register.phonePlaceholder}
                  aria-label={t.register.phone}
                  aria-required="true"
                />
                <span aria-hidden="true">⌕</span>
              </div>
            </div>
          </div>

          <div className="register-block__field">
            <label htmlFor="email">{t.register.email}</label>
            <div className="register-block__input-wrapper">
              <input
                id="email"
                type="email"
                placeholder={t.register.emailPlaceholder}
                aria-label={t.register.email}
                aria-required="true"
              />
              <span aria-hidden="true">@</span>
            </div>
          </div>

          <button type="submit" className="register-block__submit">
            {t.register.submit}
          </button>

          <div className="register-block__divider">
            <span>{t.register.or}</span>
          </div>

          <button type="button" className="register-block__google">
            <span>G</span>
            {t.register.google}
          </button>
        </form>
      </div>

      <div className="register-block__info">
        <h2 className="register-block__info-title">{t.register.infoTitle}</h2>
        <p className="register-block__info-text">{t.register.infoText}</p>
      </div>
    </section>
  );
}
