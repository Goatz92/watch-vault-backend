const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Register
router.post("/register", authController.registerController);

// Login
router.post("/login", authController.loginController);

// Verify token
router.post("/verify", authController.verifyTokenController);

module.exports = router;