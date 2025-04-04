import MovieCard from '../components/MovieCard.jsx'
import {useState, useEffect} from "react";
import {searchMovies, getPopularMovies} from '../services/api.js';

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // it is a common practice when we loan an api we use loading and error state
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                setError("Failed to Load Movies");
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            return;
        }
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError("Failed to search movies...");
        } catch (error) {
            console.log(error);
            setError("Failed to Load Movies");
        } finally {
            setLoading(false);
        }
        alert(searchQuery);
        // setSearchQuery("");
    }
    return (<div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="Search for movies..." className="search-input" value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="submit" className="search-button">Search</button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {loading ? <div className="loading">Loading...</div> : <div className="movie-grid">
            {movies.map((movie) => (
                movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id}/>
            ))}
        </div>}

    </div>);
}

// const movies = [
//         {id: 1, title: "John Wick", release_date: "2020"},
//         {id: 2, title: "Terminator", release_date: "1999"},
//         {id: 3, title: "Matrix", release_date: "1998"},
//     ]

export default Home;