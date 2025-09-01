import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../config/config.js';

const generateToken = (userId) => {
    console.log("signing token");
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '5d'
    });
    console.log("token created: ", token);
    return token;
}

export default generateToken;