import { useState, useEffect } from "react";
import RatingStars from '../RatingStars';

function Feedback() {
  const BASE_URL = "http://localhost:8000/app";
  const [feedbacks, setFeedbacks] = useState([]);
  console.log(feedbacks);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            What Our Customers Say
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Read authentic reviews from our valued customers and discover why they love our service
          </p>
        </div>

        {/* Feedback Cards Container */}
        <div className="relative">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-3xl"></div>
          
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            {feedbacks.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">💬</div>
                <div className="text-gray-500 text-2xl font-semibold mb-2">No feedbacks yet</div>
                <p className="text-gray-400">Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {feedbacks.map((feedback, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 min-h-[200px] relative overflow-hidden"
                  >
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-3xl"></div>
                    
                    {/* Quote icon */}
                    <div className="absolute top-4 right-4 text-blue-200 group-hover:text-blue-300 transition-colors">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                      </svg>
                    </div>

                    <div className="flex flex-col h-full">
                      {/* User info section */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <img 
                            className="w-14 h-14 rounded-full object-cover ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300" 
                            src={feedback.img} 
                            alt="User avatar" 
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                            {feedback.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {new Date(feedback.CreatedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Rating section */}
                      <div className="mb-4">
                        <RatingStars rating={feedback.rating} />
                      </div>

                      {/* Feedback text */}
                      <div className="flex-1 mb-4">
                        <p className="text-gray-700 leading-relaxed text-sm italic">
                          "{feedback.feedback}"
                        </p>
                      </div>

                      {/* Bottom accent */}
                      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Statistics Section */}
        {feedbacks.length > 0 && (
          <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {feedbacks.length}
                </div>
                <div className="text-gray-600 font-medium">Total Reviews</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  {feedbacks.length > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : '0.0'}
                </div>
                <div className="text-gray-600 font-medium">Average Rating</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  {feedbacks.filter(f => f.rating >= 4).length}
                </div>
                <div className="text-gray-600 font-medium">Happy Customers</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feedback;