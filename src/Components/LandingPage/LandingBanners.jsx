import FoodImg from '../../../src/assets/Food pic1.jpg'
import FoodBg from '../../../src/assets/FoodBG.jpg'

function LandingBanners() {
  return (
    <div className='px-6 md:px-20 lg:px-[100px] py-[80px] flex flex-col lg:flex-row justify-between items-center gap-16 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 bg-cover bg-center relative overflow-hidden' style={{ backgroundImage: `url(${FoodBg})`}}>
      
      {/* Overlay for better text readability */}
      <div className='absolute inset-0 bg-black/20 backdrop-blur-[1px]'></div>
      
      {/* Content Section */}
      <div className='flex flex-col gap-10 items-start max-w-2xl z-10'>
        <button className='bg-gradient-to-r from-white to-orange-50 px-6 py-3 rounded-full font-bold text-orange-600 shadow-lg border border-orange-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
          ⚡ Fast Delivery
        </button>
        
        <h1 className='text-5xl md:text-6xl lg:text-7xl font-black text-slate-800 leading-tight tracking-tight'>
          Delicious Food 
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500'> Delivered</span>
        </h1>
        
        <h2 className='text-2xl md:text-3xl font-bold text-slate-700 leading-relaxed'>
          Find the best restaurants near you
        </h2>
        
        <p className='text-xl font-medium text-slate-600 leading-relaxed max-w-xl'>
          Order from your favorite local restaurants and get fresh, hot meals delivered to your doorstep in minutes.
        </p>
        
        <div className='flex flex-col sm:flex-row gap-6 w-full sm:w-auto'>
          <button className='bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-orange-400/20'>
            🍽️ Order Now
          </button>
          <button className='bg-white/90 backdrop-blur-sm hover:bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg border-2 border-orange-500 hover:border-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
            📋 View Menu
          </button>
        </div>
        
        {/* Stats Section */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-200/50'>
          <div className='flex flex-col sm:flex-row gap-8 sm:gap-12'>
            <div className='flex flex-col items-center gap-2'>
              <h3 className='text-2xl font-black text-orange-600'>500+</h3>
              <p className='text-slate-600 font-semibold'>Restaurants</p>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <h3 className='text-2xl font-black text-orange-600'>30 Min</h3>
              <p className='text-slate-600 font-semibold'>Average Delivery</p>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <h3 className='text-2xl font-black text-orange-600'>4.8 ⭐</h3>
              <p className='text-slate-600 font-semibold'>Rating</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Section */}
      <div className='flex justify-center items-center z-10'>
        <div className='relative'>
          <div className='absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-3xl blur-xl opacity-30 scale-110 animate-pulse'></div>
          <img 
            className='relative rounded-3xl h-[400px] w-auto shadow-2xl border-4 border-white/50 hover:scale-105 transition-transform duration-500' 
            src={FoodImg} 
            alt="Delicious Food" 
          />
          <div className='absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg'>
            🔥 Hot & Fresh
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingBanners