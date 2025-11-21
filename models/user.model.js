const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please provide a Username'],
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please provide an Email'],
            unique: [true, 'Email already exists'],
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Please provide a password']
        },
    },
    { timestamps: true}
)

module.exports = mongoose.model("User", userSchema);