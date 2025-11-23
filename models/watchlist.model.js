const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User Id is required']
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: [true, 'Movie reference is required']
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure no duplicates for the same movie/user
watchlistSchema.index(
    { userId: 1, movieId: 1 },
    { unique: true }
);

module.exports = mongoose.model("Watchlist", watchlistSchema);