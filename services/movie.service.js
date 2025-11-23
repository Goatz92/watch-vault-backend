/**
 * Movie Service
 *
 * Handles communication with the OMDb API to fetch movie data.
 */

const axios = require('axios');

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = process.env.OMDB_BASE_URL;

/**
 * @desc    Search movies by title
 * @param   {string} title - The movie title to search for
 * @returns {Promise<Array>} List of movies matching the title
 * @throws  Error if no movies are found
 * @access  Public
 */
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

/**
 * @desc    Get detailed movie information by IMDb ID
 * @param   {string} imdbID - IMDb ID of the movie
 * @returns {Promise<Object>} Full movie details
 * @throws  Error if movie is not found
 * @access  Public
 */
async function getMovieById(imdbID) {
    const response = await axios.get(OMDB_BASE_URL, {
        params: {
            i: imdbID,
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