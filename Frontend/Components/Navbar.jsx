import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div>
       <div className="header">
          <div className="nav">
            <div className="nav1">
              <div className="logo"><i className="fa-regular fa-square-check"></i></div>
              <div className="logo-name">
                <div className="name">Taskify</div>
                <div className="slogan">Get Things Done, Stress-Free.</div>
              </div>
            </div>
            <div className="nav2">
                <ul>
                  <li><NavLink className="nav-items" to="/" >Home</NavLink></li>
                  <li><NavLink className="nav-items" to="/about">About</NavLink></li>
                  <li><NavLink className="nav-items" to="/tasks">Tasks</NavLink></li>
                </ul>
                
                <div className="access">
                <NavLink to="/login"><button id="login">Login</button></NavLink>
                <NavLink to="/signup"><button id="signup">Sign Up</button></NavLink>
                </div>
            </div>
          </div>
         
        </div>
    </div>
  )
}

export default Navbar;
