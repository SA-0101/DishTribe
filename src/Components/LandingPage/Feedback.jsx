// import { useState,useEffect } from "react";
// import RatingStars from '../RatingStars'

// function Feedback() {


//    const BASE_URL = "http://localhost:8000/app";
//    const [feedbacks,setFeedbacks]=useState([])
//    console.log(feedbacks)

//    const getFeedbacks = async () => {
  
//       try {
//         const response = await fetch(`${BASE_URL}/getAllFeedbacks`, {
//           method: "GET",
//           headers: {
//         "Content-Type": "application/json",
//         },
//         });
  
  
//         const responsedata = await response.json();
  
//         if (response.ok) {
//           setFeedbacks(responsedata.feedbacks);
//         } else {
//           alert(responsedata.message);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//   useEffect(()=>{
//     getFeedbacks()
//   },[])

//   return (
//     <div className='px-16 py-5'>
//         <div className='flex flex-col items-center'>
//           <h1 className='text-2xl font-semibold'>What Our Customers Say</h1>
//           <h1>Read reviews from our satisfied customers</h1>
//         </div>
//       <div className='flex gap-3 flex-wrap justify-center py-7 bg-blue-50'>
        
//         {
//           feedbacks.length==0? <div>No feedbacks</div> :
//           feedbacks.map((feedback,index)=>{
//             return <div key={index} className=' flex justify-between px-3 py-2 min-w-[400px] min-h-[100px] basis-1 rounded-xl bg-red-100'>
//                     <div className='flex gap-4 items-center'>
//             <img className='rounded-[100%] w-12 h-12' src={feedback.img} alt="img" />
//             <div className='flex flex-col'>
//               <h1>{feedback.name}</h1>
//               <h1>{feedback.feedback}</h1>
//               <h1>{feedback.CreatedAt}</h1>
//             </div>
//           </div>
//           <RatingStars rating={feedback.rating} />

//         </div>
        
//           })
//         }
//           </div>
//     </div>
//   )
// }

// export default Feedback


import { useState, useEffect } from "react";
import RatingStars from "../RatingStars";

function Feedback() {
  const BASE_URL = "http://localhost:8000/app";
  const [feedbacks, setFeedbacks] = useState([]);

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

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <div className="px-16 py-14 bg-gradient-to-br from-orange-100 to-yellow-50 ">
      <div className="flex flex-col items-center gap-3 mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-orange-600 drop-shadow-sm">
          What Our Customers Say
        </h1>
        <p className="text-gray-700 text-lg">
          Read reviews from our satisfied customers
        </p>
        <div className="w-24 h-1 bg-orange-400 rounded-full mt-1"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {feedbacks.length === 0 ? (
          <div className="text-gray-500 text-lg font-medium">No feedbacks available</div>
        ) : (
          feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="flex justify-between items-start px-6 py-5 w-full sm:w-[420px] bg-white shadow-xl rounded-xl border border-orange-200 hover:shadow-orange-300 transition duration-300"
            >
              <div className="flex gap-4">
                <img
                  className="rounded-full w-14 h-14 object-cover border-2 border-orange-300"
                  src={feedback.img}
                  alt={feedback.name}
                />
                <div className="flex flex-col gap-1">
                  <h1 className="text-lg font-semibold text-gray-800">{feedback.name}</h1>
                  <p className="text-sm text-gray-700">{feedback.feedback}</p>
                  <p className="text-xs text-gray-500 italic">
                    {new Date(feedback.CreatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="ml-4 mt-1">
                <RatingStars rating={feedback.rating} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feedback;
