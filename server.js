require('dotenv').config();
const mongoose = require("mongoose")

const app = require('./app')
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Connected')
})

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
})
.then(() => {
    console.log("Connected")
    const db = mongoose.connection;

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
})
.catch (err => {
    console.log(err)
    process.exit(1);
});