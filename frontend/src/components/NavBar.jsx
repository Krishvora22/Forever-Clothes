import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useState } from "react";
import { ShopContext } from '../context/ShopContext';



const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const {setShowSearch , getCartCount }=useContext(ShopContext);

    return (
        <div className='flex items-center justify-between py-5 font-medium' >

<Link to='/'><img src={assets.logo} className='w-36' alt='logo'></img></Link>

{/* Navbar */}
<ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
  <NavLink to='/' className='flex flex-col items-center gap-1'>
    <p>HOME</p>
    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' hidden/>
  </NavLink>
  <NavLink to='/collection' className='flex flex-col items-center gap-1'>
    <p>COLLECTION</p>
    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' hidden/>
  </NavLink> 
  <NavLink to='/about' className='flex flex-col items-center gap-1'>
    <p>ABOUT</p>
    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' hidden/>
  </NavLink>
  <NavLink to='/contact' className='flex flex-col items-center gap-1'>
    <p>CONTACT</p>
    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' hidden/>
  </NavLink>
</ul>

            <div className='flex items-center gap-6'>
                <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
                <div className="group relative">
                    {/* Profile Icon */}
                   <Link to='/login' ><img
                        src={assets.profile_icon}
                        className="w-6 h-6 cursor-pointer rounded-full border border-gray-300 hover:border-gray-500 transition"
                        alt="Profile"
                        onClick={() => setOpen(!open)}
                    /> </Link> 
                    {/* Dropdown Menu */}
                    {open && (
                        <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg border border-gray-200">
                            <ul className="flex flex-col py-2 text-gray-600">
                                <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-black rounded"> My Profile </li>
                                <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-black rounded"> Orders </li>
                                <li className="px-4 py-2 cursor-pointer hover:bg-red-100 hover:text-red-600 rounded">Log Out </li>
                            </ul>
                        </div>
                    )}
                </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer" alt="" />
            </div>
            {/* Sidebar menu for small screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="back"/>
            <p>Back</p>
          </div>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
        </div>
    )
}

export default NavBar
