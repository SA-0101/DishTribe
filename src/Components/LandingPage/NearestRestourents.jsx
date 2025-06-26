
import { useState,useEffect } from "react";

 
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
}

export default NearestRestourents
