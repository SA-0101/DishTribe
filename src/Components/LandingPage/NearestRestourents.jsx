import React from 'react'
 
function NearestRestourents() {
  return (
    <div className='flex flex-col gap-10 px-16 py-12'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-2xl font-semibold'>Nearby Restaurants</h1>
          <h1>Discover delicious food within 1km of your location</h1>
        </div>
        <div className='bg-blue-50 rounded-lg'>
          <div className='px-4 py-4 rounded-tr-lg rounded-tl-lg bg-yellow-100 w-full h-full'>
            <h1 className='font-semibold'>Map View</h1>
            <h1>Your location and nearby restaurants</h1>
          </div>
          <div>
            Reall MAP
          </div>
        </div>
        <div className='flex flex-col gap-4 bg-green-100'>
          <h1 className='text-xl font-semibold'>Nearest Restaurants</h1>
          <div className='flex gap-5 px-5 py-5'>
            <div className='w-[250px] h-[350px] rounded-xl bg-yellow-50'>
              <img src="" alt="pic" />
            
            <div className='flex flex-col gap-2 px-3 py-3'>

              <div className='flex justify-between'>
                <h1>Restaurant name</h1>
                <h1>Rating</h1>
              </div>
              <h1>Restaurant Detail</h1>
              <div className='flex justify-between'>
                <h1>Location</h1>
                <h1>Time take by order</h1>
              </div>
              <div className='flex justify-between'>
                <h1>Delivery Free</h1>
                <button className='px-2 py-1 rounded-lg text-white font-semibold bg-orange-500'>View Details</button>
              </div>
            </div>
            </div>
            <h1>Restaurant 2</h1>
          </div>
        </div>
        
    </div>
  )
}

export default NearestRestourents
