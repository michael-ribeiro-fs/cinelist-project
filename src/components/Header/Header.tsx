import "./Header.css";

function Header() {
  return <>
  <header className="header">
    <img className="header_image" src="src/assets/icon.svg" alt="icon"/>
    <ul className="nav_bar">
        <li className="nav_links">Movies</li>
        <li className="nav_links">TV Shows</li>
        <li className="nav_links">Suggest me →</li>
    </ul>
  </header>
  </>;
}

export default Header;

