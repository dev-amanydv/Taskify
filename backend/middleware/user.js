import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { JWT_SECRET } from '../config/config.js'
import { User, Admin } from '../db.js'

async function userMiddleware(req, res, next) {

  try {
    const token = req.cookies.jwt;
    console.log("Cookies Received Type:", typeof req.cookies);  // ✅ Check type of req.cookies
    console.log("Cookies Received:", JSON.stringify(req.cookies, null, 2));  // ✅ Print cookies clearly

    if (!token){
      return res.status(401).json({
        msg: "Unauthorized - No token provided"
      })
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded){
      return res.status(401).json({
        msg: "Unauthorized - Invalid token"
      })
    }
    const user = await User.findById(decoded.userId).select('-password');
    if (!user){
      return res.status(401).json({
        msg: "User not found"
      })
    }

    req.user = user;
    req.headers["user-id"] = user._id.toString();
    next();

    
  } catch (error) {
    console.log("Error in User Middleware: ", error);
    res.status(500).json({
      msg: "Internal Server Error"
    })
  }
}

export default userMiddleware