/**
 * Movie Controller
 * Handles incoming HTTP requests related to movie search and movie details.
 */

const movieService = require('../services/movie.service');

/**
 * @desc    Search movies by title
 * @route   GET /api/movies/search?title=Inception
 * @access  Public
 */
exports.searchMoviesController = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const movies = await movieService.searchMovies(title);
        res.status(200).json(movies);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

/**
 * @desc    Get detailed movie info by IMDb ID
 * @route   GET /api/movies/:imdbID
 * @access  Public
 */
exports.getMovieByIdController = async (req, res) => {
    try {
        const { imdbID } = req.params;

        if (!imdbID) {
            return res.status(400).json({ error: "Imdb ID is required" });
        }

        const movie = await movieService.getMovieById(imdbID);
        res.status(200).json(movie);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

