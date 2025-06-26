import React from 'react'

function Feedback() {
  return (
    <div className='px-16 py-5'>
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl font-semibold'>What Our Customers Say</h1>
          <h1>Read reviews from our satisfied customers</h1>
        </div>
      <div className='flex gap-3 bg-blue-50'>
        <div className='w-[300px] h-[100px] rounded-xl bg-red-100'>
          Feedback1
        </div>

         <div className='w-[300px] h-[100px] rounded-xl bg-red-100'>
          Feedback2
        </div>
      </div>
        
    </div>
  )
}

export default Feedback
