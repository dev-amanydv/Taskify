import React from "react";
import { useState, useEffect } from "react";
import { createBrowserRouter } from "react";
import { NavLink } from "react-router-dom";


export default function Hero() {
  
  return (
    <div className="hero">
        <div className="intro">
            <div className="intro-content">
              <img src="../src/assets/Set-Reminders-unscreen.gif" alt="" />
              <div>
              <h1>Organize Your Day, <span>Achieve More!</span></h1>
              <p>Taskify helps you stay productive by managing your tasks efficiently. Simplify your life with our smart to-do app!</p>
              <NavLink to="/signup">
              <button className="scale-100 hove:scale-110">Get Started</button>
              </NavLink>
              </div>
              
            </div>
        </div>
    </div>
  );
}
