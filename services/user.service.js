const User = require('../models/user.model');
const bcrypt = require('bcrypt');

/**
 * Create a new user
 * @param {Object} userData - The new user data
 * @param {string} userData.username - The user's username
 * @param {string} userData.email - The user's email
 * @param {string} userData.password - The user's password (plain text)
 * @returns {Promise<Object>} The created user
 */
async function createUser(userData) {
    const { username, email, password } = userData;

    console.log('Creating user...')

    // Check if data exists
    if (!username || !email || !password) {
        throw new Error("Username, email, and password are required");
    }
    
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already in use");
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase();

    // Hash the password
    const hashedPassword = await bcrypt.hash(
        password, 
        parseInt(process.env.SALT_ROUNDS)
    );

    // Create the user
    const user = await User.create({
        username,
        email: normalizedEmail,
        password: hashedPassword
    });

    return {
        id: user._id,
        username: user.username,
        email: user.email
    };
}

/**
 * Find a user by username
 * @param {string} username
 * @returns {Promise<Object|null>}
 */
async function getUserByUsername(username) {
    const result = await User.findOne({ username });
    return result;
}

/**
 * Find a user by email
 * @param {string} email
 * @returns {Promise<Object|null>}
 */
async function getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
}

/**
 * Validate email & password login credentials
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} Validated user object
 */
async function validateUserCredentials(email, password){
    const user = await User.findOne({ email });
    if(!user){
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("Invalid email or password");
    }

    return user;
}

/**
 * Get a user by ID (password excluded)
 * @param {string} userId
 * @returns {Promise<Object>}
 */
async function getUserById(userId){
    const user = await User.findById(userId).select("-password");
    if(!user) {
        throw new Error("User not found");
    }

    return user;
}

async function updateUser(userId, updateData){
    const user = await User.findbyIdAndUpdate(userId, updateData, {
        new: true,
    }).select("-password");

    if(!user){
        throw new Error("User not found");
    }

    return user;
}

/**
 * Delete a user by ID
 * @param {string} userId
 * @returns {Promise<Object>}
 */
async function deleteUser(userId){
    const user = await User.findByIdAndDelete(userId);
    if(!user){
        throw new Error("User not found");
    }

    return user;
}

/**
 * Get all users
 * @returns {Promise<Array>}
 */
async function findAll() {
    const result = await User.find();
    return result;
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    validateUserCredentials,
    getUserByEmail,
    updateUser,
    deleteUser,
    findAll
}