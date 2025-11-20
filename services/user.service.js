const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Create a user
async function createUser(userData) {
    const { username, email, password } = userData;

    console.log('Creating user')
    
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already in use");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    return user;
}

// Find a user by username
async function getUserByUsername(username) {
    const result = await User.findOne({ username });
    return result;
}

// Find user by email
async function getUserByEmail(email) {
    const user = await User.findOne(email);
    return user;
}

// Validate user credentials
async function validateUserCredentials(email, password){
    const user = await User.findOne(email);
    if(!user){
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("Invalid email or password");
    }

    return user;
}

// Find a user by Id
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

async function deleteUser(userId){
    const user = await User.findByIdAndDelete(userId);
    if(!user){
        throw new Error("User not found");
    }

    return user;
}

// Find all users
async function findAll() {
    const result = await User.find();
    return result;
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    findAll
}