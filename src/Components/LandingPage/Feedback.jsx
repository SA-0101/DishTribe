import React from 'react'

function Feedback() {
  return (
    <div className='px-16 py-5'>
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl font-semibold'>What Our Customers Say</h1>
          <h1>Read reviews from our satisfied customers</h1>
        </div>
      <div className='flex gap-3 flex-wrap justify-center py-7 bg-blue-50'>
        <div className=' flex justify-between px-3 py-2 min-w-[400px] min-h-[100px] basis-1 rounded-xl bg-red-100'>
          <div className='flex gap-4 items-center'>
            <img className='rounded-[100%]' src="" alt="img" />
            <div className='flex flex-col'>
              <h1>Name</h1>
              <h1>Msg</h1>
              <h1>Time</h1>
            </div>
          </div>
          <h1>Rating</h1>
        </div>

      </div>
        
    </div>
  )
}

export default Feedback
