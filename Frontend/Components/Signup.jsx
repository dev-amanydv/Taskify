import React, { useState } from "react";
import Navbar from "./Navbar";
import Gender from "./Gender";
import { useNavigate, NavLink } from "react-router-dom";
import Footer from "./Footer";
import useSignup from "../hooks/useSignup";

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
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted")
    try {
      await signup(inputs);
      navigate("/dashboard");
  } catch (error) {
      console.error("Signup failed:", error);
  }
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
            

            </form>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
