import Router from 'express'
import userMiddleware from '../middleware/user.js'
import { JWT_SECRET } from '../config/config.js'
import jwt from 'jsonwebtoken'
const router = Router();
import { Admin, User, Todos} from '../db.js'
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js'



router.post('/signup',async (req, res) => {

    try {
        const {fullName, username, password,confirmPassword, gender, profilePic} = req.body;

        if (password !== confirmPassword){
            res.status(403).json({
                msg: "Passwords did not match"
            })

            return;
        }
        const userExists = await User.findOne({ username });
       
       
        if (userExists) {
            return res.status(400).json({
                   msg: "User already exists!",
               })
           }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password,
            gender,
            profilePic : gender == "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({
                msg: "Invalid user data"
            })
        }
    } catch (error) {
        console.log("Error in admin signup route: ", error);
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
    
})

router.post('/login', async (req,res) => {


    try {
    const {username, password} = req.body;

    const user =await User.findOne({
        username
    })
    if (user){
        generateTokenAndSetCookie(user._id, res);
        res.status(201).json({
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
    } else {
        res.status(411).json({
            msg: "Incorrect email and password"
        })
        
    } } catch (error) {
        console.log("Error in admin login route: ", error);
        res.status(500).json({
            msg: "Internal Server Error"
        })
        
    }
})
router.post('/logout', async (req,res) => {
    try {
        res.cookie("jwt", "", {
            maxAge:0
        });
        res.status(200).json({
            msg: "Logged out successfully!"
        })      
        
    } catch (error) {
        console.log("Error in admin logout route: ", error);
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
})
router.post('/todo',userMiddleware, async (req,res) => {
    try {
        const { title,description ,isCompleted } = req.body;
        const senderId = req.headers["user-id"];
        if (!senderId){
            return res.status(401).json({
                error: "User Id is required!"
            })
        }
        const newTodo = new Todos({
            title,
            description,
            senderId
        });
        if (newTodo){
            await newTodo.save();
            res.status(201).json({
                msg: "Todo added successfully!"
            })
        } else {
            res.status(400).json({
                msg: "Invalid Todo Data"
            })
        }

    } catch (error) {
        console.log("Error in todo route: ", error)
    }
})
export default router