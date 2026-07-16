import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const authMiddleware = async (req, res, next) =>  {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
  return res.status(401).json({
    success: false,
    message: "Invalid authorization format",
  });
}

const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    const user = await prisma.user.findUnique({
  where: {
    id: decoded.id,
  },
});

if (!user) {
  return res.status(401).json({
    success: false,
    message: "User not found",
  });
}

req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authMiddleware;