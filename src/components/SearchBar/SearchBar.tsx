import './SearchBar.css';

function SearchBar() {
  return (
    <>
      <div className="container">
        <input
          className="search_Input"
          type="text"
          placeholder="     🔎 Busque filmes e séries..."
        ></input>
      </div>
    </>
  );
}

export default SearchBar;
