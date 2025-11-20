const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Generate JWT
function generateToken(user) {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
}

// Hash password
async function hashPassword (password) {
    return await bcrypt.hash(password, 10);
}

async function comparePasswords (rawPassword, hashedPassword) {
    return await bcrypt.compare(rawPassword, hashedPassword);
}

// Login with email + password
async function loginUser(email, password) {
    // Find user by email
    const user = await User.findOne({ email });
    if(!user) {
        throw new Error("Invalid email or password");
    }

    // Compare passwords
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    // Generate token
    const token = generateToken(user);
    
    // Return safe user object
    const safeUser = {
        id: user._id,
        username: user.username,
        email: user.email,
    };

    return { user: safeUser, token };
}

// Verify JWT 
function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new Error("Invalid or expired token");
    }
}

module.exports = {
    loginUser,
    hashPassword,
    comparePasswords,
    generateToken,
    verifyToken
};