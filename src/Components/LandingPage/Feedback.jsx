import React from 'react'

function Feedback() {
  return (
    <div className='px-16 py-5'>
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl font-semibold'>What Our Customers Say</h1>
          <h1>Read reviews from our satisfied customers</h1>
        </div>
      <div className='flex gap-3 flex-wrap justify-center py-7 bg-blue-50'>
        <div className='min-w-[300px] min-h-[100px] basis-1 rounded-xl bg-red-100'>
          Feedback1
        </div>

         <div className='min-w-[300px] min-h-[100px] rounded-xl bg-red-100'>
          Feedback2
        </div>
      </div>
        
    </div>
  )
}

export default Feedback
