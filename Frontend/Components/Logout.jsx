import React from 'react'
import useLogout from '../hooks/useLogout'
import { TbLogout } from "react-icons/tb";

function Logout() {
    const {loading, logout} = useLogout();


  return (
    <div>
        {!loading ? (<button onClick={logout} className='flex items-center gap-1 border rounded p-1 transition-transform duration-200 font-light hover:bg-white hover:text-black '><TbLogout /> Logout</button>): (<span className="loading loading-spinner loading-sm"></span>)}
    </div>
  )
}

export default Logout
