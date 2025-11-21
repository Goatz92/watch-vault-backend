const express = require('express');
const router = express.Router();

const movieController = require("../controllers/movie.controller");

// Search movies
router.get("/search", movieController.searchMoviesController);

// Get details by IMDd ID
router.get("/details/:imdbID", movieController.getMovieByIdController);

module.exports = router;