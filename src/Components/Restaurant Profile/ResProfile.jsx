import { useLocation, useNavigate } from "react-router-dom"
import RatingStars from "../RatingStars";
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
    getMenu(resid),
    getFeedback(resid)
  },[])

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
      console.log("Restaurent deleted successfully");
      navigate('/')
    } else {
      console.log(responsedata.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};



  return (

    <div className="flex flex-col bg-gray-200 min-h-screen">
  {/* Header */}
  <div className="flex flex-col items-center justify-center px-4 md:px-14 py-12 bg-[#e0f7fa] text-center">
    <h1 className="text-3xl md:text-5xl font-bold text-sky-800">
      {res.restaurantName}
    </h1>
    <div className="text-xl md:text-2xl mt-3">
      <RatingStars rating={res.rating} />
    </div>
  </div>

  {/* Restaurant Info Cards */}
  <div>
    <div className="flex flex-wrap gap-6 px-4 md:px-14 py-8 justify-center">
      <div className="flex flex-col w-full sm:w-[300px] px-6 py-6 gap-3 bg-white shadow-md rounded-xl hover:shadow-lg transition">
        <h2 className="text-xl font-semibold text-gray-700">Description</h2>
        <p className="text-base text-gray-600">{res.description}</p>
      </div>
      <div className="flex flex-col w-full sm:w-[300px] px-6 py-6 gap-3 bg-white shadow-md rounded-xl hover:shadow-lg transition">
        <h2 className="text-xl font-semibold text-gray-700">Location</h2>
        <p className="text-base text-gray-600">{res.address}</p>
      </div>
      <div className="flex flex-col w-full sm:w-[300px] px-6 py-6 gap-3 bg-white shadow-md rounded-xl hover:shadow-lg transition">
        <h2 className="text-xl font-semibold text-gray-700">Status</h2>
        <p className="text-base text-gray-600">{res.status}</p>
      </div>
    </div>
    {
          role=="owner"? 
          <div className="flex items-end justify-end gap-5 px-5">
            <button onClick={()=>{ navigate('/OwnerDashboard/UpdateRestaurent', {state :{res}})}} className="px-3 py-2 bg-orange-400 rounded-lg cursor-pointer">Update Restaurent</button>
            <button onClick={()=>{deleteRes(res)}} className="px-3 py-2 bg-red-500 rounded-lg cursor-pointer">Delete Restaurent</button>
          </div> 
          :
          null
    }
  </div>

  {/* Menu Section */}
  <div>
    <div className="flex flex-col items-center gap-3 py-10 px-4 md:px-14">
      <h1 className="text-2xl md:text-3xl font-semibold py-2 text-pink-800">
        Our Menu
      </h1>
      <div className="bg-white w-full flex flex-wrap gap-5 px-4 md:px-14 py-6 rounded-lg shadow-inner">
        {menu.length === 0 ? (
          <div className="text-gray-500">Sorry, no items in the menu right now.</div>
        ) : (
          menu.map((menuItem, index) => (
            <div
              key={index}
              className="w-[240px] px-4 py-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
            >
              <img
                src={menuItem.img}
                alt="img"
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="mt-3 font-semibold text-lg text-gray-800">
                {menuItem.foodName}
              </h2>
              <div className="flex gap-2 text-sm mt-2 items-center">
                <del className="text-gray-500">${menuItem.oldPrice}</del>
                <span className="text-green-600 font-bold">${menuItem.newPrice}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>

  {/* Feedback Section */}
  <div>
    <div className="flex flex-col items-center gap-3 py-10 px-4 md:px-14">
      <h1 className="text-2xl md:text-3xl font-semibold py-2 text-blue-800">
        Feedback
      </h1>
      <div className="bg-white w-full flex flex-col gap-5 px-4 md:px-14 py-6 rounded-lg shadow-inner">
        {feedback.length === 0 ? (
          <div className="text-gray-500">Sorry, no feedbacks till now.</div>
        ) : (
          feedback.map((feedbackItem, index) => (
            <div
              key={index}
              className="w-full flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-5 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-5">
                <img
                  className="w-12 h-12 rounded-full"
                  src={feedbackItem.img}
                  alt="img"
                />
                <div className="flex flex-col text-sm">
                  <span className="font-semibold text-gray-700">
                    {feedbackItem.name}
                  </span>
                  <span className="text-gray-600">{feedbackItem.feedback}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-3 md:mt-0">
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
</div>


  )
}

export default ResProfile
