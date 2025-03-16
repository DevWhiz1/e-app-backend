// authMiddleware.js

const jwt = require("jsonwebtoken");

require("dotenv").config();

const authenticateUser = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  if (bearerToken.startsWith("Bearer")) {
    let token = bearerToken.split(" ");
    jwt.verify(token[1], process.env.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      req.user = decoded;
      req.userRole = decoded.role;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }
};

const checkRole = (role) => {
  return (req, res, next) => {
    // Check if the user has the specified role
    if (role.includes(req.userRole) || req.userRole.includes(role)) {
      next();
    } else {
      // If the user doesn't have the required role, return a 403 Forbidden response
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }
  };
};

module.exports = {
  authenticateUser,
  checkRole,
};
