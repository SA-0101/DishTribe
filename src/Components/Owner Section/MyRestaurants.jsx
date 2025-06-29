import { useEffect, useState } from 'react'
import RatingStars from '../RatingStars'
import { useNavigate } from 'react-router-dom'

function MyRestaurants() {

      const BASE_URL="http://localhost:8000/app"

      const token=localStorage.getItem('token')
      const [resdata,setResdata]=useState([])

      const navigate=useNavigate()

  const getOwnerRes = async () => {

    try {
      const response = await fetch(`${BASE_URL}/getRestaurant`, {
        method: "GET",
        headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
      },
      });


      const responsedata = await response.json();

      if (response.ok) {
        setResdata(responsedata.restaurants);
      } else {
        alert(responsedata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(()=>{
    getOwnerRes()
  },[])

  return (
    <div className='w-full flex flex-col'>

      <div className='w-full flex flex-col items-center py-8 gap-2 shadow-sm'>
        <h1 className='text-4xl font-bold'>Restaurant Management</h1>
        <h1 className='text-lg'>Manage your restaurants and add new locations</h1>
      </div>

      <div>
        <div className='flex flex-col gap-5'>
          <div className='flex justify-between items-center px-10 py-10'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-3xl font-semibold'>🍽️ Your Restaurants</h1>
            <h1>Manage and view all your restaurant locations</h1>
          </div>
          <button className='bg-yellow-200 rounded-lg px-3 py-1'>2 Restaurant</button>
          </div>
          
        </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-8">
  {
    resdata.length === 0 ? (
      <div className="text-gray-500 col-span-full text-center">No Restaurants Found</div>
    ) : (
      resdata.map((res, index) => (
        <div 
          key={index}
          className="bg-white rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        >
          <img
            src={res.img}
            alt={res.restaurantName}
            className="w-full h-36 object-cover rounded-t-lg"
          />
          <div className="p-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-semibold text-gray-800 truncate">{res.restaurantName}</h3>
              <RatingStars rating={res.rating} />
            </div>

            <p className="text-gray-600 line-clamp-2">{res.description}</p>

            <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
              <span className="truncate">{res.address}</span>
              <span className="italic">Order Time</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-medium text-gray-700">Delivery Free</span>
              <button
                onClick={() => navigate('/RestaurantProfile', { state: { res } })}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs font-medium transition-all"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))
    )
  }
</div>

      </div>
    </div>
  )
}

export default MyRestaurants
