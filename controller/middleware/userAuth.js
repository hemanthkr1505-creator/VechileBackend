
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "website";

export const authuser = (req, res, next) => {
  const token = req.header("token") || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied. Token not found.",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded.id;
    req.email = decoded.email;
    return next();
  } catch (error) {
    console.error("Error In Token Verification:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


