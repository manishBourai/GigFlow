import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token",
        success: false,
      });
    }

    req.user = user; // attach user to req
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Token expired or invalid",
      success: false,
    });
  }
};
