import { useState,useEffect } from "react";
import RatingStars from "../RatingStars";
import { useNavigate } from "react-router-dom";

 
function NearestRestourents() {

     const BASE_URL = "http://localhost:8000/app";
     const role=localStorage.getItem('role')
     console.log("the role is: "+role)

    const navigate=useNavigate()
  const [nearestres, setNearestres] = useState([])
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
      const response = await fetch(`${BASE_URL}/nearby?latitude=${33.5743}&longitude=${71.4659}`, {
        method: "GET",
        headers: {
      "Content-Type": "application/json",
      },
      });


      const responsedata = await response.json();

      if (response.ok) {
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

  const VisitProfile = async (res) => {
  if (role === "customer" || role === "owner" || role === "admin") {
    navigate('/RestaurantProfile', { state: { res } });
  } else {
    navigate('/Login');
  }
};


  // Render loading or error state
  if (error) return <div className="flex items-center justify-center min-h-screen bg-gray-50 text-red-600 text-lg font-medium">Error: {error}</div>;
  if (!coords.latitude || !coords.longitude)
    return <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-600 text-lg">Loading your location...</div>;

return (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Nearby Restaurants
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover great restaurants within 1km of your location
        </p>
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-12 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Location</h2>
          <p className="text-sm text-gray-600 mt-1">Map showing your current position</p>
        </div>
        <div className="p-6">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <iframe
              title="User Location"
              width="100%"
              height="400"
              src={mapUrl}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Available Restaurants</h2>
          <p className="text-sm text-gray-600 mt-1">Choose from restaurants near you</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              nearestres.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="text-gray-400 text-6xl mb-4">🏪</div>
                  <div className="text-gray-500 text-lg font-medium">No restaurants found nearby</div>
                  <p className="text-gray-400 text-sm mt-2">Try expanding your search area</p>
                </div>
              ) : (
                nearestres.map((res, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                    
                    <div className="relative">
                      <img src={res.img} alt={res.restaurantName} className="w-full h-48 object-cover" />
                    </div>
                    
                    <div className="p-5">
                      
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{res.restaurantName}</h3>
                        <div className="flex items-center gap-1">
                          <RatingStars rating={res.rating} />
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{res.description}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="line-clamp-1">{res.address}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          Free Delivery
                        </span>
                        
                        <button 
                          onClick={()=>{VisitProfile(res)}}  
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
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
    </div>
  </div>
)


}

export default NearestRestourents