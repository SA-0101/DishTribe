import { useState, useEffect } from "react";
import RatingStars from '../RatingStars'

function Feedback() {
  const BASE_URL = "http://localhost:8000/app";
  const [feedbacks, setFeedbacks] = useState([])
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

  useEffect(() => {
    getFeedbacks()
  }, [])

  return (
    <div className='bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 md:px-16 py-20'>
        {/* Header */}
        <div className='text-center mb-20'>
          <div className='inline-block mb-6'>
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase'>
              Testimonials
            </div>
          </div>
          <h1 className='text-5xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6'>
            What Our Customers Say
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Discover why thousands of customers trust us with their needs. Read authentic reviews from our satisfied community.
          </p>
        </div>

        {/* Feedback Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {
            feedbacks.length == 0 ?
              <div className='col-span-full text-center py-24'>
                <div className='relative mb-8'>
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-20 animate-pulse'></div>
                  <div className='relative text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-8xl'>
                    💬
                  </div>
                </div>
                <div className='text-gray-500 text-2xl font-medium mb-4'>No Feedbacks Yet</div>
                <div className='text-gray-400 text-lg'>Be the first to share your experience!</div>
              </div> :
              feedbacks.map((feedback, index) => {
                return (
                  <div key={index} className='group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden hover:-translate-y-2 hover:scale-[1.02] relative'>
                    {/* Gradient overlay */}
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    
                    {/* Decorative elements */}
                    <div className='absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300'></div>
                    <div className='absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300'></div>

                    {/* User Info */}
                    <div className='relative p-5 border-b border-gray-100/50'>
                      <div className='flex items-center gap-3'>
                        <div className='relative'>
                          <img
                            className='rounded-full w-14 h-14 object-cover border-3 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300'
                            src={feedback.img}
                            alt="user avatar"
                          />
                          <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white flex items-center justify-center'>
                            <div className='w-1.5 h-1.5 bg-white rounded-full'></div>
                          </div>
                        </div>
                        <div>
                          <h3 className='text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-900 transition-colors duration-300'>
                            {feedback.name}
                          </h3>
                          <p className='text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-full'>
                            {feedback.CreatedAt}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className='relative p-5'>
                      <div className='mb-4'>
                        <RatingStars rating={feedback.rating} />
                      </div>

                      <div className='relative'>
                        <div className='absolute -top-1 -left-1 text-4xl text-blue-200 font-serif opacity-30'>"</div>
                        <p className='text-gray-700 leading-relaxed text-sm relative z-10 font-medium'>
                          {feedback.feedback}
                        </p>
                        <div className='absolute -bottom-4 -right-1 text-4xl text-purple-200 font-serif opacity-30 rotate-180'>"</div>
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
                  </div>
                )
              })
          }
        </div>
      </div>
    </div>
  )
}

export default Feedback