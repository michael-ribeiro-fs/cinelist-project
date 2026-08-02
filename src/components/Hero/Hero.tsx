import './Hero.css';

function Hero() {
  return (
    <>
      <div className="hero">
        <div className="hero_circle"></div>
        <img className="hero_image" src="./src/assets/family-cinema.png" alt=""></img>
        <h1 className="hero_title">CineList</h1>
        <p className="hero_description">
          Explore filmes e séries,
          <span> CineList</span> ajuda você a descobrir, organizar e acompanhar seus títulos
          favoritos. Encontre sua próxima história para assistir. 🎬
        </p>
      </div>
    </>
  );
}

export default Hero;
