import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout';

function Navbar() {

  const { authUser } = useAuthContext();
  const {loading, logout} = useLogout();
  const navigate = useNavigate();
  return (
    <div className=''>
       <div className="fixed w-full  backdrop-blur-lg flex justify-center shadow-md bg-[#f7f7f7]/70">
          <div className="nav p-2 flex  max-w-3xl w-full justify-between  border-b-sky-800">
            <div className="nav1 flex gap-1 items-center">
              <div className="logo text-2xl"><i className="fa-regular fa-square-check"></i></div>
              <div className="logo-name flex flex-col">
                <div className="name font-[Outfit] font-bold text-lg md:text-2xl">Taskify</div>
                <div className="slogan text-[6px] md:text-[10px]">Get Things Done, Stress-Free.</div>
              </div>
            </div>
            <div>
            {authUser ? (
              <div className="profile flex items-center gap-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={`${authUser.profilePic || "https://avatar.iran.liara.run/public/boy?username=${username}"}`}
                  alt=""
                />
                <span className="mr-3"> {authUser.fullName}</span>
                <div className=''>
                <i class="fa-solid fa-arrow-right-from-bracket" onClick={() => {logout(); navigate('/login')}}></i>
               </div>
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

export default Navbar;
