/**
 * Movie Database Service
 *
 * Handles saving and retrieving movie documents stored in MongoDB.
 * Uses movieAPI.service to fetch fresh data when needed.
 */

const Movie = require('../models/movie.model');
const omdbApi = require('./omdbApi.service');

/**
 * @desc    Find movie in DB or fetch from OMDb and store it
 * @param   {string} imdbID - IMDb ID of the movie
 * @returns {Promise<Movie>} MongoDB movie document
 */
async function getOrCreateMovie(imdbID) {
    // Check if movie already exists in db
    let movie = await Movie.findOne({ imdbID });

    if (movie) {
        return movie;
    };
    
    // Else fetch data from external API
    const movieData = await omdbApi.getMovieById(imdbID);

    // Save to db
    movie = await Movie.create({
        imdbID: movieData.imdbID,
        title: movieData.Title,
        year: movieData.Year,
        rated: movieData.Rated,
        released: movieData.Released,
        runtime: movieData.Runtime,
        genre: movieData.Genre,
        director: movieData.Director,
        writer: movieData.Writer,
        actors: movieData.Actors,
        plot: movieData.Plot,
        language: movieData.Language,
        country: movieData.Country,
        awards: movieData.Awards,
        poster: movieData.Poster,
        ratings: movieData.Ratings,
        metascore: movieData.Metascore,
        imdbRating: movieData.imdbRating,
        imdbVotes: movieData.imdbVotes,
        type: movieData.Type,
        dvd: movieData.DVD,
        boxOffice: movieData.BoxOffice,
        production: movieData.Production,
        website: movieData.Website
    });

    return movie;
}

/**
 * @desc    Find a movie in DB by Mongo ID
 */
async function getMovieById(id) {
    return await Movie.findById(id);
};

module.exports = {
    getOrCreateMovie,
    getMovieById
};