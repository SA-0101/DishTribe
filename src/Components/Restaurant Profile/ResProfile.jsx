import { useLocation, useNavigate } from "react-router-dom"
import RatingStars from "../RatingStars"; // Assuming RatingStars component exists and is styled separately
import { useEffect, useState } from "react";

function ResProfile() {

  const BASE_URL="http://localhost:8000/app"
  const location = useLocation();
  const res=location.state.res || {}
  const resid=res._id
  const token=localStorage.getItem('token')
  const role=localStorage.getItem('role')
  const [menu,setMenu]=useState([])
  const [feedback,setFeedback]=useState([])
  const navigate=useNavigate()

  const getMenu = async (resid) => {

    try {
      const response = await fetch(`${BASE_URL}/getFoods/${resid}`, {
        method: "GET",
        headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
      },
      });


      const responsedata = await response.json();

      if (response.ok) {

        setMenu(responsedata.foods);
        console.log(responsedata)
      } else {
        console.log(responsedata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getFeedback = async (resid) => {

    try {
      const response = await fetch(`${BASE_URL}/getFeedbacks/${resid}`, {
        method: "GET",
        headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
      },
      });


      const responsedata = await response.json();

      if (response.ok) {

        setFeedback(responsedata.feedbacks);
        console.log(responsedata)
      } else {
        console.log(responsedata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(()=>{
    getMenu(resid);
    getFeedback(resid);
  },[resid]); // Added resid to dependency array as it's used in the effect

  const deleteRes = async (res) => {
  try {
    const response = await fetch(`${BASE_URL}/deleteRestaurant/${res._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const responsedata = await response.json();

    if (response.ok) {
      console.log("Restaurant deleted successfully");
      navigate('/')
    } else {
      console.log(responsedata.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};



  return (

    <div className="flex flex-col bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <div className="relative w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${res.bannerImage || 'https://images.unsplash.com/photo-1517248135467-4c7ed45e55fe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-2xl tracking-tight">
            {res.restaurantName || "Restaurant Name"}
          </h1>
          <div className="flex items-center mt-4 space-x-2">
            <RatingStars rating={res.rating || 0} className="text-yellow-400 text-3xl" />
            <span className="text-white text-xl font-semibold">({res.rating?.toFixed(1) || 'N/A'})</span>
          </div>
          <p className="text-white text-lg md:text-xl mt-2 text-opacity-80">📍 {res.address || "No address provided"}</p>
        </div>
      </div>

      {/* Restaurant Info Cards */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              📝 Description
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{res.description || "No description available."}</p>
          </div>
          <div className="flex flex-col p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              📍 Location
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{res.address || "No address provided."}</p>
          </div>
          <div className="flex flex-col p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              ✅ Status
            </h2>
            <p className={`text-lg font-bold ${res.status === 'Open' ? 'text-green-600' : 'text-red-600'}`}>
              {res.status || "N/A"}
            </p>
          </div>
        </div>
        {
          role === "owner" && (
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => { navigate('/OwnerDashboard/UpdateRestaurent', { state: { res } }) }}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Update Restaurant ✏️
              </button>
              <button
                onClick={() => { deleteRes(res) }}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Delete Restaurant 🗑️
              </button>
            </div>
          )
        }
      </div>

      {/* Menu Section */}
      <hr className="border-t-2 border-gray-200 my-8" />
      <div className="container mx-auto px-4 md:px-8 py-12">
        <h2 className="text-4xl font-extrabold text-purple-800 text-center mb-10">
          🍽️ Our Delicious Menu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {menu.length === 0 ? (
            <div className="text-2xl font-medium text-gray-500 text-center col-span-full py-10">
              Sorry, no items in the menu right now. Check back later!
            </div>
          ) : (
            menu.map((menuItem, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200"
              >
                <img
                  src={menuItem.img}
                  alt={menuItem.foodName}
                  className="w-full h-52 object-cover rounded-t-xl"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x208/E0E0E0/6C6C6C?text=No+Image`; }}
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">
                    {menuItem.foodName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 flex-grow">{menuItem.description || "A delightful dish to satisfy your cravings."}</p>
                  <div className="flex items-center justify-end mt-auto"> {/* Changed justify-between to justify-end */}
                    <div className="flex items-baseline space-x-2">
                      {menuItem.oldPrice && menuItem.oldPrice > 0 && (
                        <del className="text-gray-500 text-base">${menuItem.oldPrice.toFixed(2)}</del>
                      )}
                      <span className="text-green-700 font-extrabold text-2xl">${menuItem.newPrice.toFixed(2)}</span>
                    </div>
                    {/* The Add to Cart button has been removed from here */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Feedback Section */}
      <hr className="border-t-2 border-gray-200 my-8" />
      <div className="container mx-auto px-4 md:px-8 py-12">
        <h2 className="text-4xl font-extrabold text-teal-800 text-center mb-10">
          💬 What Our Customers Say
        </h2>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {feedback.length === 0 ? (
            <div className="text-2xl font-medium text-gray-500 text-center py-10">
              No feedback available yet. Be the first to share your experience!
            </div>
          ) : (
            feedback.map((feedbackItem, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <img
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-400 shadow-sm"
                    src={feedbackItem.img || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(feedbackItem.name || 'User')}`}
                    alt={feedbackItem.name || 'User'}
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=FallbackUser`; }}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-xl text-gray-800">
                      {feedbackItem.name || 'Anonymous User'}
                    </span>
                    <span className="text-gray-700 text-lg mt-1">{feedbackItem.feedback}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500 font-medium whitespace-nowrap mt-3 sm:mt-0">
                  {new Date(feedbackItem.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ResProfile