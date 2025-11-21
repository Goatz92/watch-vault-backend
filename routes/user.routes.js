const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/user.controller');

// Middleware
const authenticateToken = require('../middleware/auth.middleware');

/**
 * USER ROUTES
 * Base path: /api/users
 *
 * GET Routes
 * - Get user by username
 * - Get user by email
 * - Get user by ID
 * - Get all users
 */
router.get('/username/:username', userController.getUserByUsernameController);
router.get('/email/:email', userController.getUserByEmailController);
router.get('/:id', userController.getUserByIdController);
router.get('/', userController.getAllUsersController);

/**
 * Update user
 */
router.patch('/:id', authenticateToken, userController.updateUserController);

/**
 * Delete user
 */
router.delete('/:id', authenticateToken, userController.deleteUserController);

module.exports = router;