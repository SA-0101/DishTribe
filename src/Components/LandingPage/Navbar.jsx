// import React from 'react'

import { Navigate, NavLink, useNavigate } from "react-router-dom";

// function Navbar() {
//   return (
//     <div className='flex justify-between items-center px-[80px] py-[15px]'>
        
//         <h1 className='text-2xl font-bold'>DishTribe</h1>
//         <h1>Location</h1>
//         <div className='flex gap-4'>
//           <button>Guest</button>
//           <button className='px-4 py-2 font-bold text-white bg-orange-300 rounded-lg'>Login</button>
//         </div>

//     </div>
//   )
// }

// export default Navbar


function Navbar() {

  const role=localStorage.getItem('role')
  const Navigate=useNavigate()
  console.log(role)

  if (role === "customer") {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-4 bg-white shadow'>
        <h1 className='text-2xl font-bold text-orange-500'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-gray-700'>Location</h1>
        <div className='flex gap-2 md:gap-4 mt-2 md:mt-0'>
          <h1>CustomerName</h1>
          <h1>Orders Component</h1>
          <h1>Cart</h1>
          <button onClick={()=>{localStorage.removeItem('role'),Navigate('/')}} className='px-4 py-2 font-bold text-white bg-orange-400 hover:bg-orange-500 rounded-lg transition'>
            Logout
          </button>
        </div>
      </div>
    );
  } else if (role === "owner") {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-4 bg-white shadow'>
        <h1 className='text-2xl font-bold text-orange-500'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-gray-700'>Location</h1>
        <div className='flex gap-2 md:gap-4 mt-2 md:mt-0'>
          <h1>Owner Name</h1>
          <h1>Owner dashboard</h1>
          <button onClick={()=>{localStorage.removeItem('role'),Navigate('/')}} className='px-4 py-2 font-bold text-white bg-orange-400 hover:bg-orange-500 rounded-lg transition'>
            Logout
          </button>
        </div>
      </div>
    );
  } else if (role === "admin") {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-4 bg-white shadow'>
        <h1 className='text-2xl font-bold text-orange-500'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-gray-700'>Location</h1>
        <div className='flex gap-2 md:gap-4 mt-2 md:mt-0'>
          <h1>Admin Name</h1>
          <h1>Admin dashboard</h1>
          <button onClick={()=>{localStorage.removeItem('role'),Navigate('/')}} className='px-4 py-2 font-bold text-white bg-orange-400 hover:bg-orange-500 rounded-lg transition'>
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-4 bg-white shadow'>
        <h1 className='text-2xl font-bold text-orange-500'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-gray-700'>Location</h1>
        <div className='flex gap-2 md:gap-4 mt-2 md:mt-0'>
          <button className='text-sm md:text-base font-medium text-gray-600'>Guest</button>
          <NavLink to="/Login">
            <button className='px-4 py-2 font-bold text-white bg-orange-400 hover:bg-orange-500 rounded-lg transition'>
              Login
            </button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Navbar;