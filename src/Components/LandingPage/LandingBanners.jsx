// import FoodImg from '../../../src/assets/Food pic1.jpg'
// import FoodBg from '../../../src/assets/FoodBG.jpg'

// function LandingBanners() {
//   return (
//     <div className='px-[100px] py-[60px] flex justify-between gap-10 bg-orange-100 bg-cover bg-center' style={{ backgroundImage: `url(${FoodBg})`}}>
    
//         <div className='flex flex-col gap-8 items-start'>
//           <button className='bg-white px-3 py-2 rounded-3xl font-semibold'>Fast Delivery</button>
//           <h1 className='text-5xl font-bold'>Delicious Food Delivered</h1>
//           <h1 className='text-2xl font-semibold'>Find the best restaurants near you</h1>
//           <h1 className='text-xl font-semibold'>Order from your favorite local restaurants and get fresh, hot meals delivered to your doorstep in minutes.</h1>
//           <div className='flex gap-4'>
//             <button className='bg-white px-4 py-2 rounded-lg font-semibold'>Order Now</button>
//             <button className='px-3 py-2 rounded-lg font-semibold border-4 border-white'>View Menu</button>
//           </div>
//           <div>
//           <div className='flex gap-5'>
//             <div className='flex flex-col items-center gap-1'>
//               <h1 className='text-lg font-semibold'>500+</h1>
//               <h1>Restaurants</h1>
//             </div>
//             <div className='flex flex-col items-center gap-1'>
//               <h1 className='text-lg font-semibold'> 30Min</h1>
//               <h1>Average Delivery</h1>
//             </div>
//             <div className='flex flex-col items-center gap-1'>
//               <h1 className='text-lg font-semibold'>4.8 start</h1>
//               <h1>Rating</h1>
//             </div>
//             </div>
            
//           </div>
//           </div>
//         <div className='flex justify-center items-center'>
//           <img className='rounded-xl h-[350px] bg-transparent' src={FoodImg} alt="Food Image" />
//         </div>

//     </div>
//   )
// }

// export default LandingBanners


import FoodImg from '../../../src/assets/Food pic1.jpg';
import FoodBg from '../../../src/assets/FoodBG.jpg';

function LandingBanners() {
  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${FoodBg})` }}
    >
      <div className="px-6 sm:px-10 lg:px-24 py-12 flex flex-col-reverse lg:flex-row items-center gap-10 bg-orange-100/80 backdrop-blur-sm">
        {/* Left Content */}
        <div className="flex flex-col gap-6 items-start max-w-2xl">
          <button className="bg-white text-orange-600 px-5 py-2 rounded-full font-semibold shadow hover:bg-orange-100 transition">
            Fast Delivery
          </button>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-orange-900">
            Delicious Food Delivered
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-800">
            Find the best restaurants near you
          </h2>
          <p className="text-base sm:text-lg text-orange-700">
            Order from your favorite local restaurants and get fresh, hot meals delivered to your doorstep in minutes.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-white text-orange-500 font-semibold px-6 py-2 rounded-lg shadow hover:shadow-lg transition">
              Order Now
            </button>
            <button className="px-6 py-2 rounded-lg font-semibold border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition">
              View Menu
            </button>
          </div>
          <div className="flex gap-6 pt-4 text-orange-900">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-xl font-bold">500+</h1>
              <p className="text-sm">Restaurants</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-xl font-bold">30 Min</h1>
              <p className="text-sm">Avg Delivery</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-xl font-bold">4.8 ⭐</h1>
              <p className="text-sm">Rating</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center items-center">
          <img
            className="rounded-xl w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] object-cover shadow-lg"
            src={FoodImg}
            alt="Delicious Food"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingBanners;

