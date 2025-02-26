import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Logout from './Logout';

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
            <div className="nav2 text-lg">
                
                
                {authUser ? (
                <div className="profile flex items-center gap-2">
                    <img className='w-10 h-10' src={`${authUser.profilePic}`} alt="" />
                    <span className='mr-3'> {authUser.fullName}</span>
                    <Logout/>
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
