import { useState } from 'react'
import Search from './components/Search'


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchSongs = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setSearchPerformed(true);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=song&limit=12`
      );
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error during search:', error);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchSongs();
    }
  };

  return (
  <main>
    <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="./hero-image.png" alt="Hero Banner" />
          <h1> Find <span className="text-gradient">Songs </span> You Love</h1>
        </header>


        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onKeyPress={handleKeyPress}
          onSearch={searchSongs}
        />

        {loading && <p>Loading...</p>}

        <div className="all-songs">
          <ul>
            {searchPerformed && results.length === 0 && !loading ? (
              <p style={{ color: 'white' }}>No results found.</p>
            ) : (
              results.map((song) => (
                <li key={song.trackId} className="song-card">
                  <img src={song.artworkUrl100.replace('100x100', '300x300')} alt={song.trackName} />
                  <h3>{song.trackName}</h3>
                  <div className="content">
                    <span>{song.artistName}</span>
                    <audio controls src={song.previewUrl} />
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        
     
  </div>
  </main>
  )
}

export default App