import './ActorHero.css';

type ActorHeroProps = {
  actorId?: number;
};

type ActorStat = {
  label: string;
  value: string | number;
  description: string;
};

function ActorHero({ actorId = 1 }: ActorHeroProps) {
  const actor = {
    id: actorId,
    name: 'Leonardo DiCaprio',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8DsdGgtO1f7KAlJgo06x1nghe2ntGGIxzfLv5tkV0ZQ&s=10',
    backgroundImage:
      'https://www.cartacapital.com.br/wp-content/uploads/2014/01/o-lobo-de-wall-street.jpg',
    age: 50,
    birthDate: '11 de novembro de 1974',
    birthPlace: 'Los Angeles, Califórnia',
    nationality: 'Estados Unidos',
    careerStart: 1989,
    activeYears: 36,
    moviesCount: 37,
    seriesCount: 7,
    awards: 48,
    nominations: 105,
    wins: 365,
    imdbRating: 7.8,
    awardsWon: 3,
    awardsNomination: 14,
    description:
      'Leonardo Wilhelm DiCaprio é um ator e produtor norte-americano. Reconhecido por suas atuações em produções marcantes, construiu uma carreira sólida ao longo de décadas e se tornou um dos nomes mais influentes do cinema contemporâneo.',
  };

  const actorStats: ActorStat[] = [
    {
      label: 'Filmes',
      value: actor.moviesCount,
      description: 'Filmes realizados',
    },
    {
      label: 'Séries',
      value: actor.seriesCount,
      description: 'Séries realizadas',
    },
    {
      label: 'Prêmios',
      value: actor.awards,
      description: 'Prêmios e indicações',
    },
    {
      label: 'Vitórias',
      value: actor.wins,
      description: 'Reconhecimentos recebidos',
    },
  ];

  return (
    <section
      className="actor-hero"
      style={
        {
          '--actor-background-image': `url(${actor.backgroundImage})`,
        } as React.CSSProperties
      }
    >
      <div className="actor-hero__overlay" />

      <div className="actor-hero__container">
        <div className="actor-hero__content">
          <div className="actor-hero__main">
            <h1 className="actor-hero__name">{actor.name}</h1>

            <div className="actor-hero__awards">
              <div className="actor-hero__award">
                <div className="actor-hero__award-icon">🏆</div>

                <div className="actor-hero__award-content">
                  <span className="actor-hero__award-value">{actor.awardsWon}</span>

                  <span className="actor-hero__award-label">Prêmios conquistados</span>
                </div>
              </div>

              <div className="actor-hero__award">
                <div className="actor-hero__award-icon">🏆</div>

                <div className="actor-hero__award-content">
                  <span className="actor-hero__award-value">{actor.awardsNomination}</span>

                  <span className="actor-hero__award-label">Indicações importantes</span>
                </div>
              </div>

              <div className="actor-hero__award">
                <div className="actor-hero__award-icon">🏅</div>

                <div className="actor-hero__award-content">
                  <span className="actor-hero__award-value">{actor.nominations}</span>

                  <span className="actor-hero__award-label">Indicações na carreira</span>
                </div>
              </div>

              <div className="actor-hero__award">
                <div className="actor-hero__award-icon">⭐</div>

                <div className="actor-hero__award-content">
                  <span className="actor-hero__award-value">{actor.wins}</span>

                  <span className="actor-hero__award-label">Reconhecimentos</span>
                </div>
              </div>
            </div>

            <div className="actor-hero__details">
              <div className="actor-hero__detail">
                <span className="actor-hero__detail-label">Idade:</span>

                <span className="actor-hero__detail-value">{actor.age} anos</span>
              </div>

              <div className="actor-hero__detail">
                <span className="actor-hero__detail-label">Nascimento:</span>

                <span className="actor-hero__detail-value">{actor.birthDate}</span>
              </div>

              <div className="actor-hero__detail">
                <span className="actor-hero__detail-label">Local de nascimento:</span>

                <span className="actor-hero__detail-value">{actor.birthPlace}</span>
              </div>

              <div className="actor-hero__detail">
                <span className="actor-hero__detail-label">Nacionalidade:</span>

                <span className="actor-hero__detail-value">{actor.nationality}</span>
              </div>

              <div className="actor-hero__detail">
                <span className="actor-hero__detail-label">Início da carreira:</span>

                <span className="actor-hero__detail-value">{actor.careerStart}</span>
              </div>
            </div>

            <div className="actor-hero__stats">
              {actorStats.map((stat) => (
                <div className="actor-hero__stat" key={stat.label}>
                  <span className="actor-hero__stat-value">{stat.value}</span>

                  <div className="actor-hero__stat-content">
                    <span className="actor-hero__stat-label">{stat.label}</span>

                    <span className="actor-hero__stat-description">{stat.description}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="actor-hero__about">
              <h2 className="actor-hero__about-title">Sobre</h2>

              <p className="actor-hero__about-text">{actor.description}</p>
            </div>

            <div className="actor-hero__actions">
              <button className="actor-hero__action actor-hero__action--secondary" type="button">
                <span className="actor-hero__action-icon">👎</span>

                <span className="actor-hero__action-text">Não gosto deste ator</span>

                <span className="actor-hero__action-count">104</span>
              </button>

              <button className="actor-hero__action actor-hero__action--secondary" type="button">
                <span className="actor-hero__action-icon">👍</span>

                <span className="actor-hero__action-text">Gosto deste ator</span>

                <span className="actor-hero__action-count">981</span>
              </button>

              <div className="actor-hero__activity">
                <span className="actor-hero__activity-text">Status: ativo</span>
              </div>
            </div>
          </div>

          <div className="actor-hero__portrait-wrapper">
            <div className="actor-hero__portrait-border">
              <img
                className="actor-hero__portrait"
                src={actor.image}
                alt={`Foto de ${actor.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ActorHero;
