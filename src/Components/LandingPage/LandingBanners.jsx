import FoodImg from '../../../src/assets/Food pic1.jpg'
import FoodBg from '../../../src/assets/FoodBG.jpg'

function LandingBanners() {
  return (
    <div className='relative px-8 md:px-16 lg:px-24 py-12 flex flex-col lg:flex-row justify-between items-center gap-8 bg-gray-50 overflow-hidden'>
      
      {/* Background with overlay */}
      <div className='absolute inset-0 bg-gray-900/10'></div>
      
      <div className='relative z-10 flex flex-col gap-6 items-start max-w-2xl'>
        
        {/* Fast Delivery Badge */}
        <div className='inline-flex'>
          <span className='bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-sm'>
            Fast Delivery
          </span>
        </div>

        {/* Main Headlines */}
        <div className='space-y-4'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
            <span className='text-blue-600'>Delicious Food</span>
            <br />
            <span className='text-gray-900'>Delivered</span>
          </h1>
          
          <h2 className='text-xl md:text-2xl font-semibold text-gray-700'>
            Find the best restaurants near you
          </h2>
          
          <p className='text-base md:text-lg text-gray-600 leading-relaxed max-w-xl'>
            Order from your favorite local restaurants and get fresh, hot meals delivered to your doorstep in minutes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
          <button className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-sm transition-colors duration-200'>
            Order Now
          </button>
          <button className='bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200'>
            View Menu
          </button>
        </div>

        {/* Stats Section */}
        <div className='bg-white rounded-xl p-6 border border-gray-200 shadow-sm w-full max-w-md'>
          <div className='flex justify-between text-center'>
            
            <div className='flex flex-col items-center gap-2'>
              <div className='bg-blue-100 rounded-full p-3'>
                <h1 className='text-2xl font-bold text-blue-600'>500+</h1>
              </div>
              <h2 className='text-gray-600 font-medium text-sm'>Restaurants</h2>
            </div>
            
            <div className='flex flex-col items-center gap-2'>
              <div className='bg-green-100 rounded-full p-3'>
                <h1 className='text-2xl font-bold text-green-600'>30Min</h1>
              </div>
              <h2 className='text-gray-600 font-medium text-sm'>Avg Delivery</h2>
            </div>
            
            <div className='flex flex-col items-center gap-2'>
              <div className='bg-yellow-100 rounded-full p-3'>
                <h1 className='text-2xl font-bold text-yellow-600'>4.8⭐</h1>
              </div>
              <h2 className='text-gray-600 font-medium text-sm'>Rating</h2>
            </div>
            
          </div>
        </div>
      </div>

      {/* Food Image Section */}
      <div className='relative z-10 flex justify-center items-center'>
        <div className='relative'>
          
          {/* Image container */}
          <div className='bg-white rounded-xl p-4 border border-gray-200 shadow-sm'>
            <img 
              className='rounded-xl h-64 md:h-80 lg:h-96 object-cover' 
              src={FoodImg} 
              alt="Food Image" 
            />
            
            {/* Quality badges */}
            <div className='absolute -top-3 -right-3 bg-red-500 text-white rounded-full px-3 py-1 shadow-sm'>
              <span className='text-sm font-medium'>Hot</span>
            </div>
            
            <div className='absolute -bottom-3 -left-3 bg-green-500 text-white rounded-full px-3 py-1 shadow-sm'>
              <span className='text-sm font-medium'>Fresh</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LandingBanners