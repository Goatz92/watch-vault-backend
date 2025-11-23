/**
 * Watchlist Service
 *
 * Handles all operations for managing a user's movie watchlist.
 * Uses the Watchlist model and fetches movie details from movieService.
 */

const Watchlist = require('../models/watchlist.model');
const movieService = require('../services/movie.service');


async function createWatchlist(userId, movieId = null) {
    const watchlist = await Watchlist.create({
        userId,
        movies: movieId ? [movieId] : []
    });

    return watchlist;
};

/**
 * @desc    Add a movie to a user's watchlist
 * @param   {string} userId - ID of the user
 * @param   {string} imdbID - IMDb ID of the movie
 * @returns {Promise<Object>} The created watchlist item
 * @throws  Error if movie data cannot be fetched
 */
async function addToWatchlist(userId, imdbID, watchlistId = null) {
    const movie = await movieService.getOrCreateMovie(imdbID);

    let watchlist;

    if (watchlistId) {
        watchlist = await Watchlist.findOne({ _id: watchlistId, userId });
    } else {
        watchlist = createWatchlist(userId, movie._id);

        return watchlist;
    };

    // Prevent movie duplicates
    if (watchlist.movies.includes(movie._id)) {
        throw new Error("Movie already in watchlist");
    }

    // Add movie to watchlist
    watchlist.movies.push(movie._id);
    await watchlist.save();

    return watchlist;   
}

/**
 * @desc    Remove a movie from a user's watchlist
 * @param   {string} userId - ID of the user
 * @param   {string} imdbID - IMDb ID of the movie
 * @returns {Promise<Object>} The removed watchlist item
 * @throws  Error if the movie is not found in the user's watchlist
 */
async function removeFromWatchlist(userId, imdbID) {
    const removed = await Watchlist.findOneAndDelete({ userId, imdbID });

    if(!removed) {
        throw new Error("Movie not found in watchlist");
    }

    return removed;
}

/**
 * @desc    Retrieve all movies in a user's watchlist
 * @param   {string} userId - ID of the user
 * @returns {Promise<Array>} List of watchlist items, sorted by newest first
 */
async function getUserWatchlist(userId) {
    return await Watchlist.find({ userId }).sort({ addedAt: -1 });
}

/**
 * @desc    Clear all movies from a user's watchlist
 * @param   {string} userId - ID of the user
 * @returns {Promise<Object>} Result object containing number of deleted items
 */
async function clearWatchlist(userId) {
    return await Watchlist.deleteMany({ userId });
}

module.exports = {
    addToWatchlist,
    removeFromWatchlist,
    getUserWatchlist,
    clearWatchlist
}