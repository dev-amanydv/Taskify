import React from 'react'
import Navbar from './Navbar'
import Gender from './Gender'
import { NavLink } from 'react-router-dom'
import Footer from './Footer'



function Signup() {
  return (
    <div className=''>
        <Navbar/>
        <div className='flex justify-center mt-20'>
          <div className=''>
          <div className='flex flex-col rounded-lg bg-blue-300/10 backdrop-blur-2xl w-80 p-5'>
          <h1 className='text-center text-3xl'>Sign Up Here!</h1>
              <div className='mt-5'>
              <h2>Full Name</h2>
              <input  type="text" placeholder="Enter Full Name" className="input input-neutral" />
              </div>
              <div>
              <h2 className='mt-5'>Username</h2>
              <input  type="text" placeholder="Enter username" className="input input-neutral" />
              </div>
              <div>
              <h2 className='mt-5'>Password</h2>
              <input  type="text" placeholder="Enter Password" className="input input-neutral" />
              </div>
              <div>
              <h2 className='mt-5'>Confirm Password</h2>
              <input  type="text" placeholder="Confirm Password" className="input input-neutral" />
              </div>
              <Gender/>
              <NavLink to='/login'><p className='text-sm mt-1 text-blue-300  hover:text-blue-600'>Already have an account?</p></NavLink>
              <NavLink><button className="btn btn-primary w-full mt-3 scale-100 transition-transform duration-300 active:scale-95 hover:bg-blue-600">Sign Up</button></NavLink>
          </div>
              
          </div>
        </div>
        <Footer/>
      
    </div>
  )
}

export default Signup
