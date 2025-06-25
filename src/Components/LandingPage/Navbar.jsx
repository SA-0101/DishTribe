import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-between items-center px-[80px] py-[15px]'>
        
        <h1 className='text-2xl font-bold'>DishTribe</h1>
        <h1>Location</h1>
        <div className='flex gap-4'>
          <button>Guest</button>
          <button className='px-4 py-2 font-bold text-white bg-orange-300 rounded-lg'>Login</button>
        </div>

    </div>
  )
}

export default Navbar
