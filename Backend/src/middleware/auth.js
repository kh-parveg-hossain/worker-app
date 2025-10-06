import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authMiddleware = (req, res, next) => {
  // ✅ Read token from cookies
  const token = req.cookies?.token;  

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // ✅ Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

