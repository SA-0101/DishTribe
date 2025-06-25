import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div>
        Routing Here
        <Outlet/>
    </div>
  )
}

export default AdminDashboard
