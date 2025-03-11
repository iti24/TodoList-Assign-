const jwt = require("jsonwebtoken");
const config = require("../config");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from request headers
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token.replace("Bearer ", ""), config.jwtSecret);
    req.user = decoded; // Attach user data to request

    next(); // Proceed to next middleware or route
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
