import jwt from "jsonwebtoken";

// User authentication middleware
const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer Token

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized. Login Again" });
    }

    // Verify token using JWT_SECRET
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;

    next(); // Proceed to next middleware or route
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or Expired Token" });
  }
};

export default authUser;
