/**
 * Authentication Routes
 *
 * Handles user registration, login, and token verification.
 * These routes connect to authentication controllers.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", authController.registerController);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return JWT token
 * @access  Public
 */
router.post("/login", authController.loginController);

/**
 * @route   POST /api/auth/verify
 * @desc    Verify if a provided JWT token is valid
 * @access  Public (used for token checking on frontend)
 */
router.post("/verify", authController.verifyTokenController);

module.exports = router;