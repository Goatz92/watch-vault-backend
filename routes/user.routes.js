const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// User handling routes
// Post routes
router.post('/register', userController.createUserController);

// Get routes
router.get('/findUser/:username', userController.getUserByUsernameController);
router.get('/findEmail/:email', userController.getUserByEmailController);
router.get('/findId/:id', userController.getUserByIdController);
router.get('/findAll', userController.getAllUsersController);

// Patch routes
router.patch('/updateUser/:id', userController.updateUserController);

// Delete routes
router.delete('/deleteUser/:id', userController.deleteUserController);

module.exports = router;