import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Login() {
  return (
    <div>
      <Navbar/>
        <div className='flex justify-center mt-20'>
          <div className=''>
          <div className='flex flex-col rounded-lg bg-blue-300/10 backdrop-blur-2xl w-80 p-5'>
          <h1 className='text-center text-3xl'>Login Here!</h1>
              <div className='mt-5'>
              <h2 className=''>Username</h2>
              <input  type="text" placeholder="Enter username" className="input input-neutral" />
              </div>
              <div>
              <h2 className='mt-5'>Password</h2>
              <input  type="text" placeholder="Enter Password" className="input input-neutral" />
              </div>
              <NavLink to='/signup'><p className='text-sm mt-1 text-blue-300  hover:text-blue-600'>Don't have an account?</p></NavLink>
              <NavLink><button className="btn btn-primary w-full mt-4">Login</button></NavLink>
          </div>
              
          </div>
        </div>
        <Footer/>
      
    </div>
  )
}

export default Login
