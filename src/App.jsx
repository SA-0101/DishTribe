// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from '../src/Components/LandingPage/Landing'
import Register from '../src/Components/Auth/Register'
import Login from '../src/Components/Auth/Login'

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        
        <Route path='/Customer'>

        </Route>


        {/* Catch-all route for 404
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
