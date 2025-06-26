import { useState,useEffect } from "react";
import RatingStars from '../RatingStars'

function Feedback() {


   const BASE_URL = "http://localhost:8000/app";
   const [feedbacks,setFeedbacks]=useState([])
   console.log(feedbacks)

   const getFeedbacks = async () => {
  
      try {
        const response = await fetch(`${BASE_URL}/getAllFeedbacks`, {
          method: "GET",
          headers: {
        "Content-Type": "application/json",
        },
        });
  
  
        const responsedata = await response.json();
  
        if (response.ok) {
          setFeedbacks(responsedata.feedbacks);
        } else {
          alert(responsedata.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

  useEffect(()=>{
    getFeedbacks()
  },[])

  return (
    <div className='px-16 py-5'>
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl font-semibold'>What Our Customers Say</h1>
          <h1>Read reviews from our satisfied customers</h1>
        </div>
      <div className='flex gap-3 flex-wrap justify-center py-7 bg-blue-50'>
        
        {
          feedbacks.length==0? <div>No feedbacks</div> :
          feedbacks.map((feedback,index)=>{
            return <div key={index} className=' flex justify-between px-3 py-2 min-w-[400px] min-h-[100px] basis-1 rounded-xl bg-red-100'>
                    <div className='flex gap-4 items-center'>
            <img className='rounded-[100%] w-12 h-12' src={feedback.img} alt="img" />
            <div className='flex flex-col'>
              <h1>{feedback.name}</h1>
              <h1>{feedback.feedback}</h1>
              <h1>{feedback.CreatedAt}</h1>
            </div>
          </div>
          <RatingStars rating={feedback.rating} />

        </div>
        
          })
        }
          </div>
    </div>
  )
}

export default Feedback
