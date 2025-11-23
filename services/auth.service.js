/**
 * Auth Service
 *
 * Handles user authentication, password hashing, JWT generation, and verification.
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/**
 * @desc    Generate a JWT token for a user
 * @param   {Object} user - The user object
 * @returns {string} JWT token
 * @access  Private (used internally during login/registration)
 */
function generateToken(user) {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

/**
 * @desc    Hash a plain text password
 * @param   {string} password - The raw password
 * @returns {Promise<string>} The hashed password
 */
async function hashPassword (password) {
    return await bcrypt.hash(password, 10);
};

/**
 * @desc    Compare raw password with hashed password
 * @param   {string} rawPassword - The plain password
 * @param   {string} hashedPassword - The hashed password stored in DB
 * @returns {Promise<boolean>} True if passwords match
 */
async function comparePasswords (rawPassword, hashedPassword) {
    return await bcrypt.compare(rawPassword, hashedPassword);
};

/**
 * @desc    Login user with email and password
 * @param   {string} email - User email
 * @param   {string} password - User password
 * @returns {Promise<Object>} Returns safe user object and JWT token
 * @throws  Error if email or password is invalid
 */
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
};

/**
 * @desc    Verify a JWT token
 * @param   {string} token - JWT token
 * @returns {Object} Decoded token payload
 * @throws  Error if token is invalid or expired
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new Error("Invalid or expired token");
    }
};

module.exports = {
    loginUser,
    hashPassword,
    comparePasswords,
    generateToken,
    verifyToken
};