import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const role = localStorage.getItem('role');
  const name=localStorage.getItem('name')
  const navigate = useNavigate();

  if (role === "customer") {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md border-b border-purple-500/20 shadow-2xl'>
        <h1 className='text-4xl font-black bg-gradient-to-r from-orange-400 via-pink-500 to-orange-600 bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform duration-300 cursor-pointer'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-purple-300 italic font-medium bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm'>📍 Your Location</h1>
        <div className='flex items-center gap-3 mt-2 md:mt-0'>
          <h1 className='text-white font-bold text-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30 px-4 py-2 rounded-full backdrop-blur-sm border border-purple-400/30'>👋 {name}</h1>
          
          <NavLink to="/CustomerOrders">
                 <button className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transform border border-emerald-400/30'>✨ Orders</button>
          </NavLink>
         
          <NavLink to="/Cart">
                   <button className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-violet-500/25 hover:scale-105 transform border border-violet-400/30'>🛒 Cart</button>
          </NavLink>
         
          <button onClick={()=>{ localStorage.removeItem('name'),localStorage.removeItem('email'),localStorage.removeItem('role');navigate('/');}} className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 hover:from-red-600 hover:via-pink-600 hover:to-rose-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/25 hover:scale-105 transform border border-red-400/30'>🚪 Logout</button>
        </div>
      </div>
    );
  } else if (role === "owner") {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md border-b border-purple-500/20 shadow-2xl'>
        <h1 className='text-4xl font-black bg-gradient-to-r from-orange-400 via-pink-500 to-orange-600 bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform duration-300 cursor-pointer'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-purple-300 italic font-medium bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm'>📍 Your Location</h1>
        <div className='flex items-center gap-3 mt-2 md:mt-0'>
          <h1 className='text-white font-bold text-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30 px-4 py-2 rounded-full backdrop-blur-sm border border-purple-400/30'>👑 {name}</h1>
          <button onClick={()=>{navigate('/OwnerDashboard');}} className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/25 hover:scale-105 transform border border-amber-400/30'>🏪 Owner Dashboard</button>
          <button onClick={()=>{ localStorage.removeItem('name'),localStorage.removeItem('email'),localStorage.removeItem('role');navigate('/');}} className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 hover:from-red-600 hover:via-pink-600 hover:to-rose-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/25 hover:scale-105 transform border border-red-400/30'>🚪 Logout</button>
        </div>
      </div>
    );
  } else if (role === "admin") {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md border-b border-purple-500/20 shadow-2xl'>
        <h1 className='text-4xl font-black bg-gradient-to-r from-orange-400 via-pink-500 to-orange-600 bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform duration-300 cursor-pointer'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-purple-300 italic font-medium bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm'>📍 Your Location</h1>
        <div className='flex items-center gap-3 mt-2 md:mt-0'>
          <h1 className='text-white font-bold text-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30 px-4 py-2 rounded-full backdrop-blur-sm border border-purple-400/30'>⚡ {name}</h1>
          <button onClick={()=>{navigate('/AdminDashboard');}} className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 transform border border-blue-400/30'>🛡️ Admin Dashboard</button>
          <button onClick={()=>{ localStorage.removeItem('name'),localStorage.removeItem('email'),localStorage.removeItem('role');navigate('/');}} className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 hover:from-red-600 hover:via-pink-600 hover:to-rose-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/25 hover:scale-105 transform border border-red-400/30'>🚪 Logout</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md border-b border-purple-500/20 shadow-2xl'>
        <h1 className='text-4xl font-black bg-gradient-to-r from-orange-400 via-pink-500 to-orange-600 bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform duration-300 cursor-pointer'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-purple-300 italic font-medium bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm'>📍 Your Location</h1>
        <div className='flex items-center gap-3 mt-2 md:mt-0'>
          <button className='text-sm font-bold text-purple-300 hover:text-white transition-colors duration-300 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-purple-400/30 hover:border-purple-300'>👤 Guest</button>
          <NavLink to="/Login">
            <button className='px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 via-pink-500 to-orange-600 hover:from-orange-600 hover:via-pink-600 hover:to-orange-700 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/25 hover:scale-105 transform border border-orange-400/30'>🔐 Login</button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Navbar;