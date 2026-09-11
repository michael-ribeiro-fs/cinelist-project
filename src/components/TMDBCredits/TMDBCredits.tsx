import './TMDBCredits.css';

function TMDBCredits() {
  return (
    <section className="tmdb-credits" aria-label="Créditos da TMDB">
      <div className="tmdb-credits__container">
        <div className="tmdb-credits__content">
          <div className="tmdb-credits__brand">
            <span className="tmdb-credits__brand-name">TMDB</span>
          </div>

          <div className="tmdb-credits__information">
            <h2 className="tmdb-credits__title">Dados fornecidos pela TMDB</h2>

            <p className="tmdb-credits__description">
              Este produto utiliza a API do TMDB para fornecer informações sobre filmes, séries,
              atores e outros conteúdos relacionados ao universo cinematográfico.
            </p>

            <p className="tmdb-credits__notice">
              Este produto usa a TMDB API, mas não é endossado ou certificado pela TMDB.
            </p>

            <a
              className="tmdb-credits__link"
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
            >
              Conheça a The Movie Database
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TMDBCredits;
