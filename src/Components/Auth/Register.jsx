import { useNavigate,NavLink } from 'react-router-dom'
import {useState } from 'react';
import { Mail,Lock,ChefHat,Users,Gift} from "lucide-react";

function Register() {

    const BASE_URL="http://localhost:8000/app"

    const navigate=useNavigate()

    const [username,setUsename]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

     const registerData={
      name:username,
      email:email,
      password:password,
    }

    const registerUser =async ()=> {

      try {
        const response = await fetch(`${BASE_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registerData)
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          alert('Register Successfully!');
          navigate("/Login")

        } else {
          alert(data.message || 'Something went wrong during registration.');
        }

      } catch (error) {

        alert('Registration failed: ' + error.message);
      }

    }


  function handleSubmit(e) {
    e.preventDefault();
    registerUser();
  }


    return (
        <div className='flex flex-col justify-center gap-6 py-8 items-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4'>

            <div className='flex flex-col items-center gap-3 mb-6'>
              <div className='flex justify-center items-center bg-gradient-to-r from-pink-500 to-purple-600 rounded-full w-20 h-20 shadow-xl'>
                  <ChefHat className="w-10 h-10 text-white" />
              </div>

              <h1 className='text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent tracking-tight'>DishTribe</h1>
              <p className='text-lg text-gray-700 font-medium'>Join thousands of food lovers today!</p>
            </div>

            <div className='flex flex-col w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl shadow-gray-300 transform transition-all duration-300 hover:scale-[1.01]'>
               <div className='flex flex-col items-center mb-6'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>Create Account</h1>
                    <p className='text-md text-gray-600'>Sign up and get your first meal delivered</p>
              </div>

              <div className='w-full flex items-center gap-3 rounded-xl px-4 py-3 bg-green-100 border border-green-200 mb-5'>
                  <Gift className="w-6 h-6 text-green-600" />
                  <div className='flex flex-col'>
                    <h1 className='font-semibold text-green-800 text-lg'>Welcome Offer! 🎉</h1>
                    <p className='text-sm text-green-700'>Get 20% off on your first order</p>
                  </div>
              </div>

              <form action="" onSubmit={handleSubmit} className='flex flex-col w-full gap-5'>

              <div className='w-full flex items-center px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-pink-500 transition-colors duration-200'>
                    <Users className="h-5 w-5 text-gray-500 mr-3" />
                    <input
                        type="text"
                        placeholder='Full Name'
                        className='flex-grow outline-none bg-transparent text-gray-800 placeholder-gray-500 text-base'
                        onChange={(e)=>{setUsename(e.target.value)}}
                    />
              </div>

              <div className='w-full flex items-center px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-pink-500 transition-colors duration-200'>
                    <Mail className="h-5 w-5 text-gray-500 mr-3" />
                    <input
                        type="text"
                        placeholder='Email Address'
                        className='flex-grow outline-none bg-transparent text-gray-800 placeholder-gray-500 text-base'
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
              </div>

               <div className='w-full flex items-center px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-pink-500 transition-colors duration-200'>
                    <Lock className="h-5 w-5 text-gray-500 mr-3" />
                    <input
                        type="password" // Changed type to password for security
                        placeholder='Password'
                        className='flex-grow outline-none bg-transparent text-gray-800 placeholder-gray-500 text-base'
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
              </div>

                <button
                    type='submit'
                    className='bg-gradient-to-r from-pink-500 to-purple-600 w-full py-3 text-white font-bold rounded-xl cursor-pointer hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                >
                    Join DishTribe
                </button>
              </form>


                <hr className='border-t border-gray-200 w-full my-6'/>
                <div className='text-center'>
                  <p className='text-gray-600 inline'>Already have an account? </p>

                   <NavLink to="/Login">
                       <button className='text-pink-600 font-bold hover:text-pink-700 transition-colors duration-200 ml-1'>Sign In</button>
                   </NavLink>

                </div>
            </div>

            <p className='text-gray-600 text-sm mt-6 animate-pulse'>
                🎉 Join **50K+ happy customers** • 🍔 **1000+ restaurants** • 🚚 **Lightning fast delivery**
            </p>


        </div>
      )
}

export default Register