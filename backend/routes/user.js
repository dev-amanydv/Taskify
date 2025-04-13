import Router from 'express'
import userMiddleware from '../middleware/user.js'
import { JWT_SECRET } from '../config/config.js'
import jwt from 'jsonwebtoken'
const router = Router();
import { Admin, User, Todos} from '../db.js'
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js'



router.post('/signup',async (req, res) => {

    try {
        const {fullName, email, password,confirmPassword, gender, profilePic} = req.body;

        if (password !== confirmPassword){
            res.status(403).json({
                msg: "Passwords did not match"
            })

            return;
        }
        const userExists = await User.findOne({ email });
       
       
        if (userExists) {
            return res.status(400).json({
                   msg: "User already exists!",
               })
           }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${email}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${email}`;

        const newUser = new User({
            fullName,
            email,
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
                email: newUser.email,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({
                msg: "Invalid user data"
            })
        }
    } catch (error) {
        console.log("Error in user signup route: ", error);
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
    
})

router.post('/login', async (req,res) => {

    try {
    const {email, password} = req.body;

    const user =await User.findOne({
        email
    })
    if (user){
        console.log("setting cookies...")
        const token = generateTokenAndSetCookie(user._id, res);
        res.status(201).json({
            jwt: token,
            id: user._id,
            fullName: user.fullName,
            email: user.email,
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
        const { title } = req.body;
        console.log("title to create: ", title)
        const senderId = req.headers["user-id"];
        if (!senderId){
            return res.status(401).json({
                error: "User Id is required!"
            })
        }
        const newTodo = new Todos({
            title,
            senderId
        });
        
        if (newTodo){
            await newTodo.save();
            res.status(201).json({
                msg: "Todo added successfully!"
            })
            console.log("Todo created successfully")
        } else {
            res.status(400).json({
                msg: "Invalid Todo Data"
            })
        }

    } catch (error) {
        console.log("Error in todo route: ", error);
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
})
router.put('/todo/:id', userMiddleware, async (req, res) => {
    try {
        const todoId = req.params.id;
        const { title, isCompleted } = req.body;
        console.log("title: ", title , " isCompleted: ", isCompleted)
        const updatedTodo = await Todos.findByIdAndUpdate(
            todoId,
            { title, isCompleted },
            { new: true }
        );
        console.log("UpdatedTodo: ", updatedTodo)

        if (!updatedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.status(200).json({ msg: "Todo updated", todo: updatedTodo });

    } catch (error) {
        console.log("Error in updating todo: ", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
router.delete('/todo/:id', userMiddleware, async (req, res) => {
    try {
        const todoId = req.params.id;
        const deletedTodo = await Todos.findByIdAndDelete(
            todoId,
        );

        if (!deletedTodo) {
            return res.status(404).json({ msg: "Todo not deleted" });
        }

        res.status(200).json({ msg: "Todo deleted" });
        console.log("deleted successfully");

    } catch (error) {
        console.log("Error in deleteing todo: ", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

router.get('/todos',userMiddleware, async (req,res) =>{
    try {
        const senderId = req.headers["user-id"]
        console.log(senderId);
        if(!senderId){
            return res.status(400).json({
                error: "You are not authenticated"
            })
        }
        console.log("Getting todos...")
        const todos = await Todos.find({senderId})
        console.log("Todos:",todos)
        res.status(200).json({
            todos
        })
        
    } catch (error) {
        console.log("Error in todos route: ", error);
        res.status(500).json({
            msg: "Internal Server Error"
        })
        
    }
})
export default router