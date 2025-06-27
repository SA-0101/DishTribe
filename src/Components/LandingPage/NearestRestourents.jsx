
import { useState,useEffect } from "react";
import RatingStars from "../RatingStars";

 
function NearestRestourents() {

     const BASE_URL = "http://localhost:8000/app";

  const [nearestres, setNearestres] = useState([]);
  console.log(nearestres)

  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  // Fetch current location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => setError(err.message)
    );
  }, []);


   // Google Maps embed URL
  const mapUrl =
    coords.latitude && coords.longitude
      ? `https://maps.google.com/maps?q=${coords.latitude},${coords.longitude}&z=15&output=embed`
      : "";


const getNearestres = async (latitude, longitude) => {

    try {
      const response = await fetch(`${BASE_URL}/nearby?latitude=${latitude}&longitude=${longitude}`, {
        method: "GET",
        headers: {
      "Content-Type": "application/json",
      },
      });


      const responsedata = await response.json();

      if (response.ok) {
        alert("API Fetched")
        setNearestres(responsedata.restaurants);
      } else {
        alert(responsedata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  // Fetch nearby restaurants when coordinates are set
  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      getNearestres(coords.latitude, coords.longitude);
    }
  }, [coords.latitude, coords.longitude]);


  // Render loading or error state
  if (error) return <div>Error: {error}</div>;
  if (!coords.latitude || !coords.longitude)
    return <div>Fetching your location...</div>;

  // return (
  //   <div className='flex flex-col gap-10 px-16 py-12'>
  //       <div className='flex flex-col items-center gap-4'>
  //         <h1 className='text-2xl font-semibold'>Nearby Restaurants</h1>
  //         <h1>Discover delicious food within 1km of your location</h1>
  //       </div>
  //       <div className='bg-blue-50 rounded-lg'>
  //         <div className='px-4 py-4 rounded-tr-lg rounded-tl-lg bg-yellow-100 w-full h-full'>
  //           <h1 className='font-semibold'>Map View</h1>
  //           <h1>Your location and nearby restaurants</h1>
  //         </div>
      
  //            <div>
  //               <h2>Your Current Location on Map</h2>
  //               <iframe
  //                 title="User Location"
  //                 width="100%"
  //                 height="400"
  //                 src={mapUrl}
  //                 style={{ border: 0 }}
  //                 allowFullScreen
  //                 loading="lazy"
  //               ></iframe>
  //             </div>
          
  //       </div>
  //       <div className='flex flex-col gap-4 bg-green-100'>
  //         <h1 className='text-xl font-semibold'>Nearest Restaurants</h1>
          
  //         <div className='flex gap-5 px-5 py-5'>
  //           {
  //             nearestres.length==0? <div>No Near Restourant found</div> :
  //             nearestres.map((res,index)=>{
  //               return <div key={index} className='rounded-xl bg-yellow-50'>
  //             <img src={res.img} alt="pic" />
            
            
  //           <div className='flex flex-col gap-2 px-3 py-5'>

  //             <div className='flex justify-between'>
  //               <h1>{res.restaurantName}</h1>
  //               <RatingStars rating={res.rating}/>
  //             </div>
  //             <h1>{res.description}</h1>
  //             <div className='flex justify-between'>
  //               <h1>{res.address}</h1>
  //               <h1>Time take by order</h1>
  //             </div>
  //             <div className='flex justify-between'>
  //               <h1>Delivery Free</h1>
  //               <button className='px-2 py-1 rounded-lg text-white font-semibold bg-orange-500'>View Details</button>
  //             </div>
  //           </div>
  //            </div>
  //             })
  //           }

  //         </div>
  //       </div>
        
  //   </div>
  // )

return (
  <div className="flex flex-col gap-12 px-4 py-8 md:px-16 md:py-12 bg-gray-50 min-h-screen">
    
    {/* Header */}
    <div className="text-center flex flex-col items-center gap-2">
      <h1 className="text-4xl font-extrabold text-gray-800">Nearby Restaurants</h1>
      <p className="text-lg text-gray-500">Discover delicious food within 1km of your location</p>
    </div>

    {/* Map Section */}
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-200 to-yellow-100 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">Map View</h2>
        <p className="text-sm text-gray-600">Your location and nearby restaurants</p>
      </div>
      <div className="p-5">
        <h2 className="text-lg font-medium text-gray-700 mb-3">Your Current Location on Map</h2>
        <iframe
          title="User Location"
          width="100%"
          height="400"
          src={mapUrl}
          className="rounded-xl border border-gray-300 shadow-sm"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>

    {/* Restaurant Cards */}
    <div className="bg-white rounded-2xl shadow-lg px-6 py-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Nearest Restaurants</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          nearestres.length === 0 ? (
            <div className="text-gray-500 col-span-full text-center">No Nearby Restaurants Found</div>
          ) : (
            nearestres.map((res, index) => (
              <div key={index} className="bg-yellow-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300">
                <img src={res.img} alt="Restaurant" className="w-full h-48 object-cover" />
                <div className="p-5 flex flex-col gap-3">
                  
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">{res.restaurantName}</h3>
                    <RatingStars rating={res.rating} />
                  </div>
                  
                  <p className="text-gray-600 text-sm">{res.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{res.address}</span>
                    <span className="italic">Order Time</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3">
                    <span className="text-sm font-medium text-gray-700">Delivery Free</span>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">
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

export default NearestRestourents
