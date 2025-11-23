/**
 * Authentication Middleware
 *
 * Verifies JWT tokens sent by the client.
 * Used to protect private routes that require authentication.
 */

const jwt = require("jsonwebtoken");

/**
 * @desc    Middleware to authenticate JWT tokens
 * @route   Protected routes only
 * @access  Private
 */
function authenticateToken(req, res, next) {
    // Extract token from "Authorization: Bearer <token>" header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Verify token validity
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    // Attach decoded user data to request
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}

module.exports = authenticateToken;