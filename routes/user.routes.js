const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

/**
 * USER ROUTES
 * Base path: /api/users
 */

// Create a new user (Register)

router.post('/register', userController.createUserController);

/**
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
router.patch('/updateUser/:id', userController.updateUserController);

/**
 * Delete user
 */
router.delete('/deleteUser/:id', userController.deleteUserController);

module.exports = router;