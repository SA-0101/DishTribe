import React from 'react'

function LandingBanners() {
  return (
    <div className='px-[100px] py-[60px] flex justify-between bg-orange-100'>
    
        <div className='flex flex-col gap-8 items-start'>
          <button className='bg-white px-3 py-2 rounded-3xl font-semibold'>Fast Delivery</button>
          <h1 className='text-5xl font-bold'>Delicious Food Delivered</h1>
          <h1 className='text-2xl font-semibold'>Find the best restaurants near you</h1>
          <h1 className='text-xl font-semibold'>Order from your favorite local restaurants and get fresh, hot meals delivered to your doorstep in minutes.</h1>
          <div className='flex gap-4'>
            <button className='bg-white px-4 py-2 rounded-lg font-semibold'>Order Now</button>
            <button className='px-3 py-2 rounded-lg font-semibold border-4 border-white'>View Menu</button>
          </div>
          <div>
          <div className='flex gap-5'>
            <div className='flex flex-col items-center gap-1'>
              <h1 className='text-lg font-semibold'>500+</h1>
              <h1>Restaurants</h1>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <h1 className='text-lg font-semibold'> 30Min</h1>
              <h1>Average Delivery</h1>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <h1 className='text-lg font-semibold'>4.8 start</h1>
              <h1>Rating</h1>
            </div>
            </div>
            
          </div>
          </div>
        <div className='flex justify-center items-center'>Image</div>

    </div>
  )
}

export default LandingBanners
