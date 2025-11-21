const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlist.controller');

// Add movie
router.post("/:userId/add", watchlistController.addToWatchlistController);

// Remove movie
router.delete(":/userId/remove/imdbID", watchlistController.removeFromWatchlistController);

// Get all movies in watchlist
router.get(":/userId", watchlistController.getUserWatchlistController);

// Full watchlist clear
router.delete(":/userId/clear", watchlistController.clearWatchlistController);

module.exports = router;