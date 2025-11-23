/**
 * Watchlist Routes
 *
 * Base Path: /api/watchlist
 *
 * Handles all user watchlist operations such as:
 * - Adding movies
 * - Removing movies
 * - Fetching a user's full watchlist
 * - Clearing a watchlist
 *
 * All routes require authentication via JWT.
 */

const express = require('express');
const router = express.Router();

// Controllers
const watchlistController = require('../controllers/watchlist.controller');

// Middleware
const authenticateToken = require('../middleware/auth.middleware');

// Add movie
router.post("/:userId/add", authenticateToken, watchlistController.addToWatchlistController);

// Remove movie
router.delete("/:userId/remove/:imdbID", authenticateToken, watchlistController.removeFromWatchlistController);

// Get all movies in watchlist
router.get("/:userId", authenticateToken, watchlistController.getUserWatchlistController);

// Full watchlist clear
router.delete("/:userId/clear", authenticateToken, watchlistController.clearWatchlistController);

module.exports = router;