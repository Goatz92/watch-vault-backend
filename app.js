require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Routes
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const movieRoutes = require('./routes/movie.routes');
const watchlistRoutes = require('./routes/watchlist.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Default route
app.get('/', (req, res) => {
    res.send("API is running...");
});

module.exports = app;