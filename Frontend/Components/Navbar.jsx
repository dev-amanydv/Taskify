import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import Logout from './Logout';

function Navbar() {

  const { authUser } = useAuthContext();
  const [options, setOptions] = useState(false);
  

  const navigate = useNavigate();
  return (
    <div className=''>
       <div className="">
          <div className="nav p-2 flex bg-blue-100 shadow-md fixed w-full justify-between  border-b-sky-800">
            <div className="nav1 flex gap-1 items-center">
              <div className="logo text-2xl"><i className="fa-regular fa-square-check"></i></div>
              <div className="logo-name flex flex-col">
                <div className="name font-[Outfit] font-bold text-2xl">Taskify</div>
                <div className="slogan text-[10px]">Get Things Done, Stress-Free.</div>
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
                <i class="fa-solid fa-bars font-bold text-2xl" onClick={()=>{ if (options == true){
                setOptions(false);
              } else {setOptions(true)}}}></i>
                </div>
              </div>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
            </div>
             
          </div>
          <div className={`${options == true? "block": "hidden" } pt-15`}>
            <div className='flex items-center gap-3 mt-2 p-1 hover:bg-white hover:text-sky-500 rounded-md pl-2' onClick={()=> {navigate('/dashboard')}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard h-5 w-5" data-lov-id="src/components/AppLayout.tsx:33:52" data-lov-name="LayoutDashboard" data-component-path="src/components/AppLayout.tsx" data-component-line="33" data-component-file="AppLayout.tsx" data-component-name="LayoutDashboard" data-component-content="%7B%22className%22%3A%22h-5%20w-5%22%7D"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg><div> Dashboard</div></div>
            <div className='flex items-center gap-3 mt-2 p-1 hover:bg-white hover:text-sky-500 rounded-md pl-2' onClick={()=> {navigate('/tasks')}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big h-5 w-5" data-lov-id="src/components/AppLayout.tsx:34:39" data-lov-name="CheckCircle" data-component-path="src/components/AppLayout.tsx" data-component-line="34" data-component-file="AppLayout.tsx" data-component-name="CheckCircle" data-component-content="%7B%22className%22%3A%22h-5%20w-5%22%7D"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg><div>Tasks</div></div>
            <div className='flex items-center gap-3 mt-2 p-1 hover:bg-white hover:text-sky-500 rounded-md pl-2' onClick={()=> {navigate('/profile')}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user h-5 w-5" data-lov-id="src/components/AppLayout.tsx:35:48" data-lov-name="User" data-component-path="src/components/AppLayout.tsx" data-component-line="35" data-component-file="AppLayout.tsx" data-component-name="User" data-component-content="%7B%22className%22%3A%22h-5%20w-5%22%7D"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><div>Profile</div></div>
            <div className='flex items-center gap-3 mt-2 p-1 hover:bg-white hover:text-sky-500 rounded-md pl-2' onClick={()=> {navigate('/logout')}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out h-5 w-5" data-lov-id="src/components/AppLayout.tsx:115:16" data-lov-name="LogOut" data-component-path="src/components/AppLayout.tsx" data-component-line="115" data-component-file="AppLayout.tsx" data-component-name="LogOut" data-component-content="%7B%22className%22%3A%22h-5%20w-5%22%7D"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg><div>Logout</div></div>
          </div>
         
        </div>
    </div>
  )
}

export default Navbar;
