import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
const NavBar = () => {
  return (
    <>
    <div className='container md:px-12 px-3 py-4 bg-slate-800 text-white'>
      <nav className='flex justify-between items-center'>
        <ul className='md:flex gap-3 hidden'>
            <li>Home</li>
            <li>about</li>
            <li>contact</li>
        </ul>
        <div className='md:hidden'>
        <RxHamburgerMenu />
        </div>
        <ul className='flex gap-3 items-center md:flex'>
           <li><a href="#">Login</a></li>
           <li><a href="#">Sign Up</a></li>
           <div className='w-14 h-14 rounded-full bg-slate-400'>
                <img src="cool.jpg" className='h-[100%] w-[100%] rounded-full ' alt="" srcset="" />
           </div>
           
        </ul>
      </nav>
    </div>
    </>
  )
}

export default NavBar
