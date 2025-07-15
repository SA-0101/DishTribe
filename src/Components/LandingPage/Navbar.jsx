import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const role = localStorage.getItem('role');
  const name=localStorage.getItem('name')
  const navigate = useNavigate();

  if (role === "customer") {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-slate-700'>
        <h1 className='text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 tracking-tight drop-shadow-lg'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-slate-300 italic font-light tracking-wide'>📍 Your Location</h1>
        <div className='flex items-center gap-5 mt-2 md:mt-0'>
          <h1 className='text-slate-200 font-semibold text-lg tracking-wide'>Welcome, {name}</h1>
          
          <NavLink to="/CustomerOrders">
                 <button className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 border border-orange-400/20'>
                   📋 Orders
                 </button>
          </NavLink>
         
          <NavLink to="/Cart">
                   <button className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 border border-orange-400/20'>
                     🛒 Cart
                   </button>
          </NavLink>
         
          <button onClick={()=>{ localStorage.removeItem('name'),localStorage.removeItem('email'),localStorage.removeItem('role');navigate('/');}} className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:scale-105 border border-red-400/20'>
            🚪 Logout
          </button>
        </div>
      </div>
    );
  } else if (role === "owner") {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-slate-700'>
        <h1 className='text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 tracking-tight drop-shadow-lg'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-slate-300 italic font-light tracking-wide'>📍 Your Location</h1>
        <div className='flex items-center gap-5 mt-2 md:mt-0'>
          <h1 className='text-slate-200 font-semibold text-lg tracking-wide'>Welcome, {name}</h1>
          <button onClick={()=>{navigate('/OwnerDashboard');}} className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 border border-orange-400/20'>
            🏪 Owner Dashboard
          </button>
          <button onClick={()=>{ localStorage.removeItem('name'),localStorage.removeItem('email'),localStorage.removeItem('role');navigate('/');}} className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:scale-105 border border-red-400/20'>
            🚪 Logout
          </button>
        </div>
      </div>
    );
  } else if (role === "admin") {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-slate-700'>
        <h1 className='text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 tracking-tight drop-shadow-lg'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-slate-300 italic font-light tracking-wide'>📍 Your Location</h1>
        <div className='flex items-center gap-5 mt-2 md:mt-0'>
          <h1 className='text-slate-200 font-semibold text-lg tracking-wide'>Welcome, {name}</h1>
          <button onClick={()=>{navigate('/AdminDashboard');}} className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 border border-orange-400/20'>
            ⚙️ Admin Dashboard
          </button>
          <button onClick={()=>{ localStorage.removeItem('name'),localStorage.removeItem('email'),localStorage.removeItem('role');navigate('/');}} className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:scale-105 border border-red-400/20'>
            🚪 Logout
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-slate-700'>
        <h1 className='text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 tracking-tight drop-shadow-lg'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-slate-300 italic font-light tracking-wide'>📍 Your Location</h1>
        <div className='flex items-center gap-5 mt-2 md:mt-0'>
          <button className='text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-slate-800/50'>
            👤 Guest
          </button>
          <NavLink to="/Login">
            <button className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 border border-orange-400/20'>
              🔑 Login
            </button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Navbar;