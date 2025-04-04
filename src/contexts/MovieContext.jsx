import {createContext, useEffect, useState, useContext} from "react";

const MovieContext = createContext();
export const useMovieContext = () => {
    return useContext(MovieContext);
};

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {// look inside localStorage and see if we already have any favorite movies
        const storedFavs = localStorage.getItem("favorites");

        if (storedFavs) {
            setFavorites(JSON.parse(storedFavs)); // JSON.parse -> '[1,2,3]' -> [1, 2, 3]
            // converts string array to array
        }
    }, []);

    useEffect(() => {// any time this favorites state changes we are going to update whatever we store
        // in local storage. anytime we add or remove a favorite this useEffect runs we store favorites key
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {

        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
};