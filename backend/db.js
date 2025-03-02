import mongoose from 'mongoose'

// Connect to MongoDB with error handling
mongoose
  .connect("mongodb+srv://admin:%40Aman_81@cluster0.yx2l0.mongodb.net/Taskify")
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Admin schema
const adminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6  },

  gender:{
      type: String,
      required: true,
      enum: ["male", "female"]

  },
  profilePic:{
      type: String,
      default: ""
  }
},{timestamps: true});

// User schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6  },

  gender:{
      type: String,
      required: true,
      enum: ["male", "female"]

  },
  profilePic:{
      type: String,
      default: ""
  }
}, {timestamps:true});

// Todo schema
const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  isCompleted: {
    type: Boolean,
    default: false, 
  },
  senderId: String
},{timestamps: true});


// Models
const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);
const Todos = mongoose.model("Todos", todoSchema);


export { Admin, User, Todos };