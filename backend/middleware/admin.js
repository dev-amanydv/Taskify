import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'
import { User, Admin } from '../db.js'

async function adminMiddleware(req, res, next) {

  try {
    const token = req.cookies.jwt;

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
    const user = await Admin.findById(decoded.userId).select('-password');
    if (!user){
      return res.status(401).json({
        msg: "User not found"
      })
    }

    req.user = user;
    next();

    
  } catch (error) {
    console.log("Error in admin Middleware: ", error);
    res.status(500).json({
      msg: "Internal Server Error"
    })
  }
}

export default adminMiddleware