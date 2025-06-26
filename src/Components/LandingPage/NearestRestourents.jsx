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
          <h1>Nearest Restaurants</h1>
          <div className='flex gap-5'>
            <h1>Restaurant 1</h1>
            <h1>Restaurant 2</h1>
          </div>
        </div>
    </div>
  )
}

export default NearestRestourents
