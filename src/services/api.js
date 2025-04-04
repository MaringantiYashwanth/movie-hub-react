const API_KEY = "22a7e82bc0a3fc762e92c4a622d24209";
const BASE_URL = "http://api.themoviedb.org/3"; // Note the "/3" in the URL

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch popular movies');
    }
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error('Failed to search movies');
    }
    const data = await response.json();
    return data.results;
};

