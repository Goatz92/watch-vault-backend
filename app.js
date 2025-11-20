require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
    res.send("API is running...");
});

module.exports = app;