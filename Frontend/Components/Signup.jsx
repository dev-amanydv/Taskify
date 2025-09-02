import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup.js";
import { auth, provider, signInWithPopup } from "../src/firebase/firebaseConfig.js";
import { useAuthContext } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const CheckCircle = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const GenderSelector = ({ selectedGender, onCheckboxChange }) => {
    return (
        <div>
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <div className="mt-2 grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition ${selectedGender === 'male' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-300'}`}>
                    <input type="radio" name="gender" value="male" className="sr-only" checked={selectedGender === "male"} onChange={() => onCheckboxChange("male")} />
                    <span className="text-sm font-semibold">Male</span>
                </label>
                <label className={`flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition ${selectedGender === 'female' ? 'bg-pink-500 text-white border-pink-500' : 'bg-white border-gray-300'}`}>
                    <input type="radio" name="gender" value="female" className="sr-only" checked={selectedGender === "female"} onChange={() => onCheckboxChange("female")} />
                    <span className="text-sm font-semibold">Female</span>
                </label>
            </div>
        </div>
    )
}

function Signup() {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        if (!result || !result.user) {
         throw new Error("Google sign-in failed. No user data received.");
        }
        const { displayName, email, photoURL } = result.user;

        const res = await fetch("http://localhost:3000/user/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName: displayName, email, profilePic: photoURL })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Backend login with Google failed");
        
        localStorage.setItem("taskify", JSON.stringify(data));
        setAuthUser(data);
        toast.success("Signed up successfully!");
        navigate("/dashboard");

    } catch (error) {
        console.error("Google Sign-In Error:", error);
        toast.error(error.message || "Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
           <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full opacity-30 -translate-x-1/3 -translate-y-1/3 filter blur-3xl"></div>
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-200 rounded-full opacity-30 translate-x-1/3 translate-y-1/3 filter blur-3xl"></div>
      </div>
      
      <div className="text-center mb-8 z-10">
          <Link to="/" className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-10 h-10 text-blue-600" />
              <span className="text-4xl font-bold text-gray-900">Taskify</span>
          </Link>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
          <p className="mt-2 text-gray-600">Start organizing your tasks today.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} placeholder="Aman Yadav"
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} placeholder="Minimum 6 characters"
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} placeholder="Re-enter your password"
              className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required />
          </div>
          
          <GenderSelector onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <button type="submit" disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition-all duration-300 transform hover:scale-105">
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button onClick={signInWithGoogle}
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105">
            <GoogleIcon />
            <span className="ml-3">Continue with Google</span>
        </button>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

