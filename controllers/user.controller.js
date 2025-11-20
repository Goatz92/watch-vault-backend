const userService = require('../services/user.service');

// Get user by username
exports.getUserByUsernameController = async (req, res) => {
    try {
        const user = await userService.getUserByUsername(req.params.username);
        if(!user) return res.status(404).json({ error: "User not found"});
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get user by id
exports.getUserByIdController = async(req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if(!user) return res.status(404).json({ error: "User not found"});
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Get user by email
exports.getUserByEmailController = async(req, res) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update user
exports.updateUserController = async(req, res) => {
    try {
        const updated = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete user
exports.deleteUserController = async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.params.id);
        res.status(200).json({ message: "User deleted", deleted });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all users
exports.getAllUsersController = async (req, res) => {
    try {
        const users = await userService.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};