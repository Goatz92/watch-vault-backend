/**
 * User Controller
 * 
 * Handles user retrieval, updating, and deletion.
 * All business logic is delegated to userService.
 */

const userService = require('../services/user.service');

/**
 * @desc    Get user by username
 * @route   GET /api/users/username/:username
 * @access  Public
 */
exports.getUserByUsernameController = async (req, res) => {
    try {
        const user = await userService.getUserByUsername(req.params.username);
        if(!user) return res.status(404).json({ error: "User not found"});
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * @desc    Get user by ID
 * @route   GET /api/users/id/:id
 * @access  Private
 */
exports.getUserByIdController = async(req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if(!user) return res.status(404).json({ error: "User not found"});
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

/**
 * @desc    Get user by Email
 * @route   GET /api/users/email/:email
 * @access  Private/Admin
 */
exports.getUserByEmailController = async(req, res) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * @desc    Update user by ID
 * @route   PATCH /api/users/:id
 * @access  Private (same user only)
 */
exports.updateUserController = async(req, res) => {
    try {
        const updated = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * @desc    Delete user by ID
 * @route   DELETE /api/users/:id
 * @access  Private (same user only)
 */
exports.deleteUserController = async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.params.id);
        res.status(200).json({ message: "User deleted", deleted });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Admin
 */
exports.getAllUsersController = async (req, res) => {
    try {
        const users = await userService.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};