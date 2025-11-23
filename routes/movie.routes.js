/**
 * Movie Routes
 *
 * Handles movie searching and fetching details by IMDb ID.
 * These routes communicate with the OMDb API via the movie service.
 */

const express = require('express');
const router = express.Router();

const movieController = require("../controllers/movie.controller");

// Search movies
router.get("/search", movieController.searchMoviesController);

// Get details by IMDd ID
router.get("/details/:imdbID", movieController.getMovieByIdController);

module.exports = router;