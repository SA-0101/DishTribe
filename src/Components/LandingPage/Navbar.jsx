// import React from 'react'

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
  return (
    <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-4 bg-white shadow'>
  <h1 className='text-2xl font-bold text-orange-500'>DishTribe</h1>
  <h1 className='text-sm md:text-base text-gray-700'>Location</h1>
  <div className='flex gap-2 md:gap-4 mt-2 md:mt-0'>
    <button className='text-sm md:text-base font-medium text-gray-600'>Guest</button>
    <button className='px-4 py-2 font-bold text-white bg-orange-400 hover:bg-orange-500 rounded-lg transition'>
      Login
    </button>
  </div>
</div>

  );
}

export default Navbar;
