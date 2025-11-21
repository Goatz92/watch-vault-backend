const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User Id is required']
    },
    imdbID: { 
        type: String, 
        required: [true, 'imdbID is required']
    },
    title: String,
    poster: String,
    addedAt: { 
        type: Date, 
        default: Date.now}
});

// Ensure no duplicates for the same movie/user
watchlistSchema.index(
    { userId: 1, imdbID: 1 }, 
    { unique: true }
);


module.exports = mongoose.model("Watchlist", watchlistSchema);