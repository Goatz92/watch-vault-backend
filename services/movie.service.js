const axios = require('axios');

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = process.env.OMDB_BASE_URL;

async function searchMovies(title){
    const response = await axios.get(OMDB_BASE_URL, {
        params: {
            s: title,
            apikey: OMDB_API_KEY
        }
    });

    if (response.data.Response === "False") {
        throw new Error (response.data.Error || "No movies found");
    }

    return response.data.Search;
}

async function getMovieById(imdbId) {
    const response = await axios.get(OMDB_BASE_URL, {
        params: {
            i: imdbId,
            plot: "full",
            apikey: OMDB_API_KEY
        }
    });

    if (response.data.Response === "False") {
        throw new Error ("Movie not found");
    }

    return response.data
}

module.exports = {
    searchMovies,
    getMovieById
}