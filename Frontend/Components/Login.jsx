import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useLogin from "../hooks/useLogin";

function Login() {
  const [username, setUsername ] = useState("");
  const [password, setPassword] = useState("");
  const {loading, login} = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username,password)
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-20">
        <div className="">
          <div className="flex flex-col rounded-lg bg-blue-300/10 backdrop-blur-2xl w-80 p-5">
            <h1 className="text-center text-3xl">Login Here!</h1>
            <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <h2 className="">Username</h2>
              <input
                type="text" 
                value={username} 
                onChange={(e)=> {
                  setUsername(e.target.value)
                }}
                placeholder="Enter username"
                className="input input-neutral"
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
                className="input input-neutral"
              />
            </div>
            <NavLink to="/signup">
              <p className="text-sm mt-1 text-blue-300  hover:text-blue-600">
                Don't have an account?
              </p>
            </NavLink>
            <button type="submit"  disabled={loading} className="btn btn-primary w-full mt-3 scale-100 transition-transform duration-300 active:scale-95 hover:bg-blue-600">
                {loading ? "Logging In..." : "Login"}
              </button>            
            </form>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
