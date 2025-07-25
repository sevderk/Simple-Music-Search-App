import React from "react";

const Search = ({searchTerm, setSearchTerm, onKeyPress, }) => {
  return (
    <div className="search">
      <div>
      <img src="search.svg" alt="Search Icon" />

      <input
        type="text"
        placeholder="Search a song, artist, or album title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={onKeyPress}
      />
      </div>
    </div>
  )
}

export default Search;