import './FilterBar.css';

function FilterBar() {
  return (
    <>
      <div className="filter_bar_container">
        <div className="filter_options">
          <p className="filter_text">All</p>
        </div>
        <div className="filter_options">
          <p className="filter_text">Movies</p>
        </div>
        <div className="filter_options">
          <p className="filter_text">TV Shows</p>
        </div>
      </div>
    </>
  );
}

export default FilterBar;
