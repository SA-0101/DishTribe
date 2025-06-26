import Navbar from './Navbar'
import LandingBanners from '../LandingPage/LandingBanners'
import NearestRestourents from './NearestRestourents'
import FoodCategory from '../LandingPage/FoodCategory'

function Landing() {
  return (
    <div>
      <Navbar/>
      <LandingBanners/>
      <NearestRestourents/>
      <FoodCategory/>
    </div>
  )
}

export default Landing
