import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

function Dashboard() {
    const {authUser} = useAuthContext();
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
                
                {authUser ? (
                <div className="profile flex items-center gap-2">
                    <img className='w-10 h-10' src={`${authUser.profilePic}`} alt="" />
                    <span> {authUser.fullName}</span>
                </div>
            ) : (
                <NavLink to="/login">Login</NavLink>
            )}
            </div>
          </div>
         
        </div>
      
    </div>
  )
}

export default Dashboard
