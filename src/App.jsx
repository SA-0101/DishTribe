// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from '../src/Components/LandingPage/Landing'
import Register from '../src/Components/Auth/Register'
import Login from '../src/Components/Auth/Login'

import Cart from '../src/Components/Customer Section/Cart'
import MyOrders from '../src/Components/Customer Section/MyOrders'

import OwnerDashboard from './Components/Owner Section/OwnerDashboard';
import MyRestaurants from './Components/Owner Section/MyRestaurants';
import AddRestaurant from './Components/Owner Section/AddRestaurant';
import AddFood from './Components/Owner Section/AddFood';
import OrderManagement from './Components/Owner Section/OrderManagement';

import AdminDashboard from './Components/Admin Section/AdminDashboard';
import Analytics from './Components/Admin Section/Analysis';
import RestaurantsManagement from './Components/Admin Section/RestaurantsManagement';
import UserManagement from './Components/Admin Section/UserManagement';
import OrdersManagement from './Components/Admin Section/OrdersManagement';
import Main from './Components/LandingPage/Main';
import ResProfile from '../src/Components/Restaurant Profile/ResProfile/'


function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} >
        <Route index element={<Landing/>}/>
        <Route path='/CustomerFav' element={<Cart/>}/>
        <Route path='/CustomerOrders' element={<MyOrders/>}/>
        <Route path='/RestaurantProfile' element={<ResProfile/>}/>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        </Route>
        

        {/* Owner Routing */}
        <Route path='/OwnerDashboard' element={<OwnerDashboard/>}>

        <Route index element={<MyRestaurants/>}/>
        <Route path='AddRestaurant' element={<AddRestaurant/>}/>
        <Route path='AddFood' element={<AddFood/>}/>
        <Route path='OrderManagement' element={<OrderManagement/>}/>
        
        </Route>

        {/* Admin Routing */}
        <Route path='/AdminDashboard' element={<AdminDashboard/>}>
        
        <Route index element={<Analytics/>}/>
        <Route path='RestaurantManagement' element={<RestaurantsManagement/>}/>
        <Route path='UserManagement' element={<UserManagement/>}/>
        <Route path='OrderManagement' element={<OrdersManagement/>}/>
        
        </Route>

        {/* Catch-all route for 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}

      </Routes>
    </BrowserRouter>
    
  )
}

export default App
