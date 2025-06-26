
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
                <h2>Your Current Location on Map</h2>
                <iframe
                  title="User Location"
                  width="100%"
                  height="400"
                  src={mapUrl}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
          
        </div>
        <div className='flex flex-col gap-4 bg-green-100'>
          <h1 className='text-xl font-semibold'>Nearest Restaurants</h1>
          
          <div className='flex gap-5 px-5 py-5'>
            {
              nearestres.length==0? <div>No Near Restourant found</div> :
              nearestres.map((res,index)=>{
                return <div key={index} className='rounded-xl bg-yellow-50'>
              <img src={res.img} alt="pic" />
            
            
            <div className='flex flex-col gap-2 px-3 py-5'>

              <div className='flex justify-between'>
                <h1>{res.restaurantName}</h1>
                <h1>{res.rating}</h1>
              </div>
              <h1>{res.description}</h1>
              <div className='flex justify-between'>
                <h1>{res.address}</h1>
                <h1>Time take by order</h1>
              </div>
              <div className='flex justify-between'>
                <h1>Delivery Free</h1>
                <button className='px-2 py-1 rounded-lg text-white font-semibold bg-orange-500'>View Details</button>
              </div>
            </div>
             </div>
              })
            }

          </div>
        </div>
        
    </div>
  )


//   return (
//    <div className="flex flex-col gap-10 px-6 sm:px-10 md:px-16 py-12">
//   <div className="flex flex-col items-center gap-2 text-center">
//     <h1 className="text-2xl md:text-3xl font-semibold text-orange-700">Nearby Restaurants</h1>
//     <p className="text-gray-600">Discover delicious food within 1km of your location</p>
//   </div>

//   <div className="bg-blue-50 rounded-lg overflow-hidden shadow-md">
//     <div className="px-4 py-4 bg-yellow-100">
//       <h1 className="font-semibold text-gray-800">Map View</h1>
//       <p className="text-sm text-gray-600">Your location and nearby restaurants</p>
//     </div>
//     <div className="w-full">
//       <iframe
//         title="User Location"
//         className="w-full h-[300px] sm:h-[400px]"
//         src={mapUrl}
//         style={{ border: 0 }}
//         allowFullScreen
//         loading="lazy"
//       ></iframe>
//     </div>
//   </div>

//   <div className="flex flex-col gap-6 bg-green-100 p-4 rounded-lg">
//     <h1 className="text-xl font-semibold text-green-900">Nearest Restaurants</h1>
//     <div className="flex flex-wrap justify-start gap-5">
//       {nearestres.length === 0 ? (
//         <div>No Near Restaurant found</div>
//       ) : (
//         nearestres.map((res, index) => (
//           <div key={index} className="w-full sm:w-[260px] rounded-xl bg-yellow-50 shadow hover:shadow-md">
//             <img src={res.img} alt="pic" className="rounded-t-xl w-full h-[160px] object-cover" />
//             <div className="flex flex-col gap-2 px-4 py-5">
//               <div className="flex justify-between items-center">
//                 <h1 className="font-bold text-gray-800">{res.restaurantName}</h1>
//                 <h1 className="text-yellow-500">{res.rating}</h1>
//               </div>
//               <p className="text-sm text-gray-700 line-clamp-3">{res.description}</p>
//               <div className="flex justify-between text-sm">
//                 <p className="text-gray-600">{res.address}</p>
//                 <p className="text-gray-500">Time taken</p>
//               </div>
//               <div className="flex justify-between items-center">
//                 <p className="text-gray-600">Delivery Free</p>
//                 <button className="px-2 py-1 text-xs font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition">
//                   View Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   </div>
// </div>

//   );

}

export default NearestRestourents
