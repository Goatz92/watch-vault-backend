/**
 * Server Entry Point
 *
 * Connects to MongoDB and starts the Express server.
 * Handles connection errors gracefully.
 */

require('dotenv').config();
const mongoose = require("mongoose")

const app = require('./app')
const port = process.env.PORT || 5000

// -----------------------------
// Default route check
// -----------------------------
app.get('/', (req, res) => {
    res.send('Connected')
})

// -----------------------------
// MongoDB Connection
// -----------------------------
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
})
.then(() => {
    console.log("Connected")
    const db = mongoose.connection;

    // Start Express server after successful DB connection
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
})
.catch (err => {
    console.log(err)
    process.exit(1);
});