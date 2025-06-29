
import { User } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  Store,
  Users,
  ShoppingBag,
  Settings,
  Home,
  LogOut,
  UtensilsCrossed,
  Menu,
  X,
} from "lucide-react";

function AdminDashboard() {

  const navigate=useNavigate()

  return (
    <div className='flex'>
            <div className='flex flex-col max-h-lvh min-w-fit shadow-sm sticky top-0'>
  <div className='flex justify-center items-center gap-4 px-8 py-4 bg-green-100'>
    <User size={50} />
    <div className='flex flex-col items-center'>
      <h1 className='text-xl font-semibold'>Admin</h1>
      <h1>Dashboard Panel</h1>
    </div>
  </div>

  <hr className='border border-black px-4' />

  <div className='w-full flex flex-col gap-3 px-3 py-4 pb-16'>
    <h1 className='text-sm px-2'>MANAGEMENT</h1>

    <NavLink to="">
      <div className='w-full flex flex-row gap-4 px-4 py-2 rounded-lg font-semibold bg-gray-100'>
        <h1>📊</h1>
        <button>Analytics</button>
      </div>
    </NavLink>

    <NavLink to="RestaurantManagement">
      <div className='w-full flex flex-row gap-4 px-4 py-2 rounded-lg font-semibold bg-gray-100'>
        <h1>🍽️</h1>
        <button>Restaurants Management</button>
      </div>
    </NavLink>

    <NavLink to="UserManagement">
      <div className='w-full flex flex-row gap-4 px-4 py-2 rounded-lg font-semibold bg-gray-100'>
        <h1>👤</h1>
        <button>User Management</button>
      </div>
    </NavLink>

    <NavLink to="OrderManagement">
      <div className='w-full flex flex-row gap-4 px-4 py-2 rounded-lg font-semibold bg-gray-100'>
        <h1>🧾</h1>
        <button>Orders Management</button>
      </div>
    </NavLink>

    <NavLink>
      <div className='w-full flex flex-row gap-4 px-4 py-2 rounded-lg font-semibold bg-gray-100'>
        <h1>⚙️</h1>
        <button>Setting</button>
      </div>
    </NavLink>
  </div>

  <hr className='border border-black px-4' />

  <div className='w-full flex flex-col items-center gap-2 px-3 py-4'>
    <NavLink className="w-full" to="/">
            <button className='w-full bg-gray-100 rounded-lg py-2 cursor-pointer'>Home</button>
    </NavLink>
    
    <button onClick={()=>{localStorage.removeItem('name'),localStorage.removeItem('email'),localStorage.removeItem('role'),navigate("/")}} className='w-full bg-red-500 rounded-lg py-2 cursor-pointer'>Logout</button>
  </div>

  <hr className='w-full border border-black px-4' />

  <div className='flex flex-col items-center justify-center text-sm px-3 py-4'>
    <h1>© 2025 Restaurant Dashboard</h1>
    <h1>v1.0.0</h1>
  </div>
</div>

            <Outlet/>
    </div>
  )
}

export default AdminDashboard
