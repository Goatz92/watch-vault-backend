const authService = require('../services/auth.service');
const userService = require('../services/user.service');

/**
 * @desc Login user
 * @route Post /api/auth/login
 * @access Public
 */
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Authenticate user
        const { user, token } = await authService.loginUser(email, password);

        return res.status(200).json({
            message: "Login succesful",
            user,
            token
        });
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
};

/**
 * @desc    Register user + auto-login
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.registerController = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);

        // Auto login user after registration
        const token = authService.generateToken(user);

        return res.status(201).json({
            message: "User succesfully created",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

/**
 * @desc    Verify JWT
 * @route   POST /api/auth/verify
 * @access  Public
 */
exports.verifyTokenController = async (req, res) => {
    try {
        const { token } = req.body;

        if(!token) {
            return res.status(400).json({ error: "Token is required" });
        }

        const decoded = authService.verifyToken(token);

        return res.status(200).json({
            valid: true,
            decoded
        });
    } catch (err) {
        return res.status(401).json({ valid: false, error: err.message });
    }
};