import { User } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

function OwnerDashboard() {
  return (
    <div className='flex'>
            <div className='bg-blue-100 min-h-lvh w-[28%] '>

              <div className='flex justify-center items-center gap-4 px-8 py-4 bg-green-100'>
               <User size={50}/>
                <div className='flex flex-col items-center'>
                  <h1 className='text-xl font-semibold'>Restaurant Owner</h1>
                  <h1>Dashboard</h1>
                </div>
              </div>
              <hr className='border border-black'/>

              <div className='w-full flex flex-col gap-4 px-3 py-4 pb-16'>

                <h1 className='text-sm px-2'>MANAGEMENT</h1>
                
                    <NavLink to="">
                      <div className='w-full flex flex-row gap-4 px-4 py-3 rounded-lg font-semibold bg-gray-100'>
                             <h1>🍽️</h1>
                        <button className=''>My Restaurants</button>
                      </div>
                         
                    </NavLink>

                     <NavLink to="AddRestaurant">
                      <div className='w-full flex flex-row gap-4 px-4 py-3 rounded-lg font-semibold bg-gray-100'>
                             <h1>➕</h1>
                        <button className=''>Add New Restaurant</button>
                      </div>
                         
                    </NavLink>

                     <NavLink to="AddFood">
                      <div className='w-full flex flex-row gap-4 px-4 py-3 rounded-lg font-semibold bg-gray-100'>
                             <h1>➕</h1>
                        <button className=''>Add New Food</button>
                      </div>
                         
                    </NavLink>

                    <NavLink to="OrderManagement">
                      <div className='w-full flex flex-row gap-4 px-4 py-3 rounded-lg font-semibold bg-gray-100'>
                             <h1>🧾</h1>
                        <button className=''>Order Management</button>
                      </div>
                         
                    </NavLink>

                     <NavLink >
                      <div className='w-full flex flex-row gap-4 px-4 py-3 rounded-lg font-semibold bg-gray-100'>
                             <h1>⚙️</h1>
                        <button className=''>Setting</button>
                      </div>
                         
                    </NavLink>

              </div>

              <hr className='border border-black'/>

              <div className='w-full flex flex-col items-center gap-3 px-3 py-4'>
                    <button className='w-full bg-gray-100 rounded-lg py-2'>Home</button>
                    <button className='w-full bg-red-500 rounded-lg py-2'>Logout</button>
                    
              </div>
              
              <hr className='border border-black'/>

              <div className='flex flex-col items-center justify-center text-sm px-3 py-4'>
                <h1>© 2025 Restaurant Dashboard</h1>
                <h1>v1.0.0</h1>
              </div>
            </div>
            <Outlet/>
    </div>
  )
}

export default OwnerDashboard
