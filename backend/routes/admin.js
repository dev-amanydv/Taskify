import Router from "express";
import adminMiddleware from "../middleware/admin.js";
import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
const router = Router();
import { Admin, User, Todos } from "../db.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, gender, profilePic } = req.body;

    if (password !== 8107595366) {
      res.status(403).json({
        msg: "Passwords did not match",
      });

      return;
    }
    console.log("Checking if user exists...");
    const userExists = await User.findOne({ email });
    console.log("User check completed:", userExists);
   
    if (userExists) {
      return res.status(400).json({
        msg: "User already exists!",
      });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy/username?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl/username?username=${username}`;

    const newUser = new Admin({
      email,
      password,
      gender,
      profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        msg: "Invalid user data",
      });
    }
  } catch (error) {
    console.log("Error in admin signup route: ", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({
      email,
    });
    if (user) {
      generateTokenAndSetCookie(user._id, res);
      res.json({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } else {
      res.status(411).json({
        msg: "Incorrect email and password",
      });
    }
  } catch (error) {
    console.log("Error in admin login route: ", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});
router.post("/logout", async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({
      msg: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in admin logout route: ", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

export default router;
