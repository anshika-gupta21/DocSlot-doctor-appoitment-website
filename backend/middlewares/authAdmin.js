import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    // const { atoken } = req.headers.authorization?.split(" ")[1];
    const atoken = req.headers.atoken;
    console.log("Received token:", atoken);
    if (!atoken) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized Login Again" });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    console.log("Decoded token:", token_decode);
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized Login Again" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authAdmin;
