import React, { useState } from "react";
import Navbar from "./Navbar";
import Gender from "./Gender";
import toast from "react-hot-toast";
import {  NavLink } from "react-router-dom";
import Footer from "./Footer";
import useSignup from "../hooks/useSignup";
import { useAuthContext } from "../context/AuthContext";
import { auth, provider} from "../src/firebase/firebaseConfig";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const facebookProvider = new FacebookAuthProvider();
function Signup() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const {loading, signup} = useSignup();
  const navigate = useNavigate();
  const { setAuthUser, authUser } = useAuthContext();


  const handleCheckboxChange = (gender)=> {
    setInputs({...inputs,gender})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);

  }


  const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);

        if (!result || !result.user) {
            throw new Error("Google sign-in failed. No user data received.");
        }

        const user = {
            uid: result.user.uid,
            fullName: result.user.displayName,
            email: result.user.email,
            profilePic: result.user.photoURL,
        };

        // Store user in local storage
        localStorage.setItem("taskify", JSON.stringify(user));

        // Update AuthContext
        setAuthUser(user);

        toast.success("Logged in successfully!");
        navigate("/dashboard");
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        toast.error(error.message || "Google sign-in failed. Please try again.");
    }
};
const handleFacebookLogin = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    console.log("User Info:", result.user);
  } catch (error) {
    console.error("Facebook Login Error:", error);
  }
};


  return (
    <div className="">
      <Navbar />
      <div className="flex justify-center mt-20">
        <div className="bg-white rounded-2xl">
          <div className="flex flex-col rounded-lg bg-blue-300/10 backdrop-blur-2xl w-80 p-5">
            <h1 className="text-center text-3xl">Sign Up Here!</h1>
            <form onSubmit={handleSubmit}>
              <div className="mt-5">
              <h2>Full Name</h2>
              <input
                type="text"
                value={inputs.fullName}
                onChange={(e) => {
                  setInputs({...inputs, fullName: e.target.value})
                }}
                placeholder="Enter Full Name"
                className="border-2 rounded-md p-1 w-full "
              />
            </div>
            <div>
              <h2 className="mt-5">Username</h2>
              <input
                type="text"
                value={inputs.username}
                onChange={(e) => {
                  setInputs({...inputs, username: e.target.value})
                }}
                placeholder="Enter username"
                className="border-2 rounded-md p-1 w-full "
              />
            </div>
            <div>
              <h2 className="mt-5">Password</h2>
              <input
                type="text"
                value={inputs.password}
                onChange={(e) => {
                  setInputs({...inputs, password: e.target.value})
                }}
                placeholder="Enter Password"
                className="border-2 rounded-md p-1 w-full "
              />
            </div>
            <div>
              <h2 className="mt-5">Confirm Password</h2>
              <input
                type="text"
                value={inputs.confirmPassword}
                onChange={(e) => {
                  setInputs({...inputs, confirmPassword: e.target.value})
                }}
                placeholder="Confirm Password"
                className="border-2 rounded-md p-1 w-full "
              />
            </div>
            <Gender onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
            <NavLink to="/login">
              <p className="text-sm mt-1 text-sky-800  hover:text-blue-600">
                Already have an account?
              </p>
            </NavLink>
           
              <button type="submit"  disabled={loading} className="border-2 p-1 text-lg text-white rounded-lg bg-gray-800 w-full mt-3 scale-100 transition-transform duration-300 active:scale-95 hover:bg-black">
                {loading ? "Signing up..." : "Sign Up"}
              </button>
              </form>
              <div className="flex items-center w-full mt-2">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-2 text-gray-400">or</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <div className="login-with-email w-70 mt-5 flex justify-center items-center gap-2 border-2 rounded-md p-1 ">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <button className="" onClick={signInWithGoogle}>Login with Google</button>
          </div>
             
            

            
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
