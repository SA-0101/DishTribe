import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const role = localStorage.getItem('role');
  const name=localStorage.getItem('name')
  const navigate = useNavigate();

  if (role === "customer") {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-4 bg-white shadow-md'>
        <h1 className='text-3xl font-extrabold text-orange-500 tracking-tight'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-gray-600 italic'>Your Location</h1>
        <div className='flex items-center gap-4 mt-2 md:mt-0'>
          <h1 className='text-gray-700 font-semibold'>{name}</h1>
          
          <NavLink to="/CustomerOrders">
                 <button className='px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 rounded-md transition duration-300 shadow'>Orders</button>
          </NavLink>
         
          <NavLink to="/Cart">
                   <button className='px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 rounded-md transition duration-300 shadow'>Cart</button>
          </NavLink>
         
          <button onClick={()=>{ localStorage.removeItem('name'),localStorage.removeItem('email'),localStorage.removeItem('role');navigate('/');}} className='px-4 py-2 text-sm font-semibold text-white bg-red-400 hover:bg-red-500 rounded-md transition duration-300 shadow'>Logout</button>
        </div>
      </div>
    );
  } else if (role === "owner") {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-4 bg-white shadow-md'>
        <h1 className='text-3xl font-extrabold text-orange-500 tracking-tight'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-gray-600 italic'>Your Location</h1>
        <div className='flex items-center gap-4 mt-2 md:mt-0'>
          <h1 className='text-gray-700 font-semibold'>{name}</h1>
          <button onClick={()=>{navigate('/OwnerDashboard');}} className='px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 rounded-md transition duration-300 shadow'>Owner Dashboard</button>
          <button onClick={()=>{ localStorage.removeItem('name'),localStorage.removeItem('email'),localStorage.removeItem('role');navigate('/');}} className='px-4 py-2 text-sm font-semibold text-white bg-red-400 hover:bg-red-500 rounded-md transition duration-300 shadow'>Logout</button>
        </div>
      </div>
    );
  } else if (role === "admin") {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-4 bg-white shadow-md'>
        <h1 className='text-3xl font-extrabold text-orange-500 tracking-tight'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-gray-600 italic'>Your Location</h1>
        <div className='flex items-center gap-4 mt-2 md:mt-0'>
          <h1 className='text-gray-700 font-semibold'>{name}</h1>
          <button onClick={()=>{navigate('/AdminDashboard');}} className='px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 rounded-md transition duration-300 shadow'>Admin Dashboard</button>
          <button onClick={()=>{ localStorage.removeItem('name'),localStorage.removeItem('email'),localStorage.removeItem('role');navigate('/');}} className='px-4 py-2 text-sm font-semibold text-white bg-red-400 hover:bg-red-500 rounded-md transition duration-300 shadow'>Logout</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-wrap justify-between items-center px-6 md:px-10 lg:px-20 py-4 bg-white shadow-md'>
        <h1 className='text-3xl font-extrabold text-orange-500 tracking-tight'>DishTribe</h1>
        <h1 className='text-sm md:text-base text-gray-600 italic'>Your Location</h1>
        <div className='flex items-center gap-4 mt-2 md:mt-0'>
          <button className='text-sm font-medium text-gray-600 hover:text-orange-500 transition'>Guest</button>
          <NavLink to="/Login">
            <button className='px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 rounded-md transition duration-300 shadow'>Login</button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Navbar;
