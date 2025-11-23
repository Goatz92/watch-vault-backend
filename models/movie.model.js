const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        imdbID: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            String,
            required: true
        },
        year: String,
        rated: String,
        released: String,
        runtime: String,
        genre: String,
        director: String,
        writer: String,
        actors: String,
        plot: String,
        language: String,
        country: String,
        awards: String,
        poster: String,
        metascore: String,
        imdbRating: String,
        imdbVotes: String,
        type: String,
        dvd: String,
        boxOffice: String,
        production: String,
        website: String,
        // References to watchlists that include this movie
        watchlists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Watchlist',
            },
        ],
    },
    {timestamps: true}
);

module.exports = mongoose.model('Movie', movieSchema);