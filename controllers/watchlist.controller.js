const watchlistService = require('../services/watchlist.service');

exports.addToWatchlistController = async (req, res) => {
    try {
        const { imdbID } = req.body;
        const userId = req.params.userId;

        if (!imdbID) {
            res.status(400).json({ error: "IMDb ID is required"});
        }

        const item = await watchlistService.addToWatchlist(userId, imdbID);
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.removeFromWatchlistController = async (req, res) => {
    try {
        const { imdbID } = req.params;
        const userId = req.params.userId;

        const removed = await watchlistService.removeFromWatchlist(userId, imdbID);
        res.status(200).json({ message: "Removed from watchlist", removed });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

exports.getUserWatchlistController = async (req, res) => {
    try {
        const { userId } = req.params;

        const list = await watchlistService.getUserWatchlist(userId);
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.clearWatchlistController = async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await watchlistService.clearWatchlist(userId);

        res.status(200).json({
            message: "Watchlist cleared",
            deleteCount: result.deletedCount
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};