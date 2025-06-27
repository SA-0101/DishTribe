import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../LandingPage/Footer'

function Main() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
      
    </div>
  )
}

export default Main
