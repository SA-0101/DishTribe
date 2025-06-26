import Navbar from './Navbar'
import LandingBanners from '../LandingPage/LandingBanners'
import NearestRestourents from './NearestRestourents'
import FoodCategory from '../LandingPage/FoodCategory'
import Feedback from './Feedback'

function Landing() {
  return (
    <div>
      <Navbar/>
      <LandingBanners/>
      <NearestRestourents/>
      <FoodCategory/>
      <Feedback/>
    </div>
  )
}

export default Landing
