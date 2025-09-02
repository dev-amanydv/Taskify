import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useLogin from "../hooks/useLogin";
import { signInWithPopup } from "firebase/auth";
import { auth, provider} from "../src/firebase/firebaseConfig";

function Login() {
  const [email, setEmail ] = useState("");
  const [password, setPassword] = useState("");
  const {loading, login} = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email,password)
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

        localStorage.setItem("taskify", JSON.stringify(user));

        setAuthUser(user);

        toast.success("Logged in successfully!");
        navigate("/dashboard");
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        toast.error(error.message || "Google sign-in failed. Please try again.");
    }
};

  return (
    <div>
      <div className="flex justify-center mt-20 ">
        <div className="bg-white rounded-2xl ">
          <div className="flex flex-col rounded-lg bg-blue-300/10 backdrop-blur-2xl w-80 p-5">
            <h1 className="text-center text-3xl font-[Roboto] font-semibold ">Login Here!</h1>
            <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <h2 className="">Email</h2>
              <input
                type="text" 
                value={email} 
                onChange={(e)=> {
                  setEmail(e.target.value)
                }}
                placeholder="Enter username"
                className="border-2 rounded-md p-1 w-full "
              />
            </div>
            <div>
              <h2 className="mt-5">Password</h2>
              <input
                type="text"
                value={password} 
                onChange={(e)=> {
                  setPassword(e.target.value)
                }}
                placeholder="Enter Password"
                className="border-2 rounded-md p-1 w-full"
              />
            </div>
            <NavLink to="/signup">
              <p className="text-sm mt-1 text-sky-800  hover:text-blue-600">
                Don't have an account?
              </p>
            </NavLink>
            <button type="submit" onClick={login}  disabled={loading} className="border-2 p-1 text-lg text-white rounded-lg bg-gray-800  w-full mt-3 scale-100 transition-transform duration-300 active:scale-95 hover:bg-black">
                {loading ? "Logging In..." : "Login"}
              </button>  
              </form>

              <hr className="mt-5" />
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

export default Login;
