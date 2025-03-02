import React, { useState } from "react";
import Navbar from "./Navbar";
import Gender from "./Gender";
import {  NavLink } from "react-router-dom";
import Footer from "./Footer";
import useSignup from "../hooks/useSignup";
import { useAuthContext } from "../context/AuthContext";

function Signup() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const {loading, signup} = useSignup();
  const handleCheckboxChange = (gender)=> {
    setInputs({...inputs,gender})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);

  }


  return (
    <div className="">
      <Navbar />
      <div className="flex justify-center mt-20">
        <div className="">
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
                className="input input-neutral"
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
                className="input input-neutral"
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
                className="input input-neutral"
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
                className="input input-neutral"
              />
            </div>
            <Gender onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
            <NavLink to="/login">
              <p className="text-sm mt-1 text-blue-300  hover:text-blue-600">
                Already have an account?
              </p>
            </NavLink>
           
              <button type="submit"  disabled={loading} className="btn btn-primary w-full mt-3 scale-100 transition-transform duration-300 active:scale-95 hover:bg-blue-600">
                {loading ? "Signing up..." : "Sign Up"}
              </button>
              <div className="flex items-center w-full mt-2">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-2 text-gray-400">or</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <div className="login-with-email w-70 mt-5">
              <button className="btn w-full bg-white text-black border-[#e5e5e5]">
              <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
              Login with Google
              </button>
              </div>
              <div className="login-with-email w-70 mt-2">
              <button className="btn w-full bg-black text-white border-black">
              <svg aria-label="Apple logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1195 1195"><path fill="white" d="M1006.933 812.8c-32 153.6-115.2 211.2-147.2 249.6-32 25.6-121.6 25.6-153.6 6.4-38.4-25.6-134.4-25.6-166.4 0-44.8 32-115.2 19.2-128 12.8-256-179.2-352-716.8 12.8-774.4 64-12.8 134.4 32 134.4 32 51.2 25.6 70.4 12.8 115.2-6.4 96-44.8 243.2-44.8 313.6 76.8-147.2 96-153.6 294.4 19.2 403.2zM802.133 64c12.8 70.4-64 224-204.8 230.4-12.8-38.4 32-217.6 204.8-230.4z"></path></svg>
              Login with Apple
              </button>
              </div>
              <div className="login-with-email w-70 mt-2">
              <button className="btn w-full bg-[#1A77F2] text-white border-[#005fd8]">
              <svg aria-label="Facebook logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="white" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path></svg>
              Login with Facebook
              </button>
              </div>
            

            </form>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
