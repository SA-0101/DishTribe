import React from 'react'

function FoodCategory() {
  return (
    <div className='flex flex-col gap-10 px-16 py-3'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-3xl font-semibold'>Food Categories</h1>
          <h1>Choose from our delicious vegetarian and non-vegetarian dishes</h1>
        </div>
        <div className='flex justify-center items-center'>
          <button className='px-10 py-3 font-semibold bg-gray-200 rounded-3xl cursor-pointer'>Vegetarian</button>
          <button className='px-8 py-3 font-semibold bg-red-500 rounded-3xl ml-[-20px] cursor-pointer'>Non-Vegetarian</button>
          </div>
        <div className='flex flex-col gap-5'>
              <div className='flex justify-between'>
                <h1 className='text-xl font-semibold'>Vegetarian Dishes</h1>
                <button className='bg-gray-100 rounded-3xl px-4 py-1'>1 items Found</button>
              </div>
              <div className='py-5'>
                Items
              </div>
        </div>
    </div>
  )
}

export default FoodCategory
