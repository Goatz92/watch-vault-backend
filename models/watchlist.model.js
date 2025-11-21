const mongoose = require('mongoose');
const { watch } = require('./user.model');

const watchlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User Id is required']
    },
    imdbId: { type: String, required: [true, 'imdbId is required']},
    title: String,
    poster: String,
    addedAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model("Watchlist", watchlistSchema);