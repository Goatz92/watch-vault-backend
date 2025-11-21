const Watchlist = require('../models/watchlist.model');
const movieService = require('../services/movie.service');

async function addToWatchlist(userId, imdbID) {
    // Fetch movie data
    const movieData = await movieService.getMovieById(imdbID);

    const watchlistItem = await Watchlist.create({ 
        userId,
        imdbId,
        title: movieData.Title,
        poster: movieData.Poster
    });

    return watchlistItem;
}

async function removeFromWatchlist(userId, imdbID) {
    const removed = await Watchlist.findOneAndDelete({ userId, imdbId });

    if(!removed) {
        throw new Error("Movie not found in watchlist");
    }

    return removed;
}

async function getUserWatchlist(userId) {
    return await Watchlist.find({ userId }).sort({ addedAt: -1 });
}

async function clearWatchlist(userId) {
    return await Watchlist.deleteMany({ userId });
}

module.exports = {
    addToWatchlist,
    removeFromWatchlist,
    getUserWatchlist,
    clearWatchlist
}