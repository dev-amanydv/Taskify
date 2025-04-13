import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config/config.js';
const generateTokenAndSetCookie = (userId, res ) => {
    console.log("signing token");
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: '5d'
    })
    console.log("token created: ", token, ".Now setting up cookies ");

    res.setHeader("Authorization", token);
    return token
}

export default generateTokenAndSetCookie;
