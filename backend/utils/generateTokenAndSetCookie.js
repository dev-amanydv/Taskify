import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config/config.js';
const generateTokenAndSetCookie = (userId, res ) => {
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: '5d'
    })
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
    })
}

export default generateTokenAndSetCookie;
