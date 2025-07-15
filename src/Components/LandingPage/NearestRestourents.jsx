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
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Location Error</h2>
        <p className="text-gray-600 text-center">{error}</p>
      </div>
    </div>
  );

  if (!coords.latitude || !coords.longitude)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
          <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Finding Your Location</h2>
          <p className="text-gray-600 text-center">Please wait while we locate you...</p>
        </div>
      </div>
    );

return (
  <div className="flex flex-col gap-16 px-4 py-12 md:px-16 md:py-16 bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 min-h-screen">
    
    {/* Header */}
    <div className="text-center flex flex-col items-center gap-6">
      <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg border border-orange-200">
        <span className="text-2xl">📍</span>
        <span className="text-orange-600 font-bold">Location Based</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-orange-600 to-amber-600">
        Nearby Restaurants
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
        Discover delicious food within 1km of your location and satisfy your cravings
      </p>
    </div>

    {/* Map Section */}
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-200/50">
      <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 px-8 py-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🗺️</span>
          <h2 className="text-2xl font-bold text-white">Interactive Map</h2>
        </div>
        <p className="text-orange-100 font-medium">Explore your location and nearby restaurants</p>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xl">📍</span>
          <h3 className="text-xl font-bold text-slate-800">Your Current Location</h3>
        </div>
        <div className="relative">
          <iframe
            title="User Location"
            width="100%"
            height="500"
            src={mapUrl}
            className="rounded-2xl border-4 border-orange-200 shadow-lg"
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <span className="text-sm font-semibold text-slate-700">🔴 You are here</span>
          </div>
        </div>
      </div>
    </div>

    {/* Restaurant Cards */}
    <div className="bg-white rounded-3xl shadow-2xl px-8 py-12 border border-orange-200/50">
      <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-orange-200">
        <span className="text-3xl">🍽️</span>
        <h2 className="text-3xl font-black text-slate-800">Nearest Restaurants</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          nearestres.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 max-w-md mx-auto">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="text-xl font-bold text-slate-700 mb-2">No Restaurants Found</h3>
                <p className="text-slate-500">We couldn't find any restaurants in your area. Try expanding your search radius.</p>
              </div>
            </div>
          ) : (
            nearestres.map((res, index) => (
              <div key={index} className="group bg-gradient-to-br from-white to-orange-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-orange-200/50">
                <div className="relative overflow-hidden">
                  <img 
                    src={res.img} 
                    alt="Restaurant" 
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                    <RatingStars rating={res.rating} />
                  </div>
                </div>
                
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
                      {res.restaurantName}
                    </h3>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                    {res.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1 text-slate-500">
                      <span>📍</span>
                      <span className="font-medium">{res.address}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <span>⏱️</span>
                      <span className="italic font-medium">Quick Order</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-orange-200">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 text-xl">✅</span>
                      <span className="text-sm font-bold text-green-600">Free Delivery</span>
                    </div>
                 
                    <button 
                      onClick={()=>{VisitProfile(res)}}  
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-orange-400/20"
                    >
                      🍽️ View Details
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