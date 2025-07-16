import { useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react';
import { Mail, Lock, ChefHat } from "lucide-react";

function Login() {

     const BASE_URL="http://localhost:8000/app"

     const navigate=useNavigate()
     const [role,setRole]=useState("")

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const loginData={

      email:email,
      password:password,

    }

    const loginUser =async ()=> {

      try {
        const response = await fetch(`${BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
          alert('✅ Login Successfully!');
          console.log(data)
          localStorage.setItem('token',data.token)
          localStorage.setItem('userId',data.user._id)
          localStorage.setItem('name',data.user.name)
          localStorage.setItem('email',data.user.email)
          localStorage.setItem('role', data.user.role)
          navigate('/')


        } else {
          alert(data.message || 'Something went wrong');
        }

      } catch (error) {

        alert('Registration failed: ' + error.message);
      }

    }


   function handleSubmit(e) {
    e.preventDefault();
    loginUser();
  }


    return (
        <div className='flex flex-col justify-center gap-6 py-8 items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4'>

            <div className='flex flex-col items-center gap-3 mb-6'>
              <div className='flex justify-center items-center bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full w-20 h-20 shadow-xl'>
                  <ChefHat className="w-10 h-10 text-white" />
              </div>

              <h1 className='text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-emerald-700 bg-clip-text text-transparent tracking-tight'>DishTribe</h1>
              <p className='text-lg text-gray-700 font-medium'>Delicious food, delivered fast.</p>
            </div>

            <div className='flex flex-col w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl shadow-gray-300 transform transition-all duration-300 hover:scale-[1.01]'>
               <div className='flex flex-col items-center mb-6'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome Back!</h1>
                    <p className='text-md text-gray-600'>Sign in to order your favorite meals</p>
              </div>
              {/* <div className='w-full flex flex-col gap-2 py-3'>
                <h1 className='flex flex-col font-semibold'>Sign in as:</h1>
                    <div className='w-full flex basis-1 gap-4 flex-wrap justify-center   items-center'>
                      <div className={`flex flex-col items-center cursor-pointer hover:scale-[103%] rounded-lg ${studentbg} px-8 py-2 border-2 border-gray-200`} onClick={() => {setStudentbg('bg-blue-100');setTeacherbg('bg-white');setAdminbg('bg-white');setTeacherapi(false);setStudentapi(true);setAdminapi(false)}}>
                        <BookOpen className="w-5 h-5" />
                        <h1>Student</h1>
                      </div>
                     <div className={`flex flex-col items-center cursor-pointer hover:scale-[103%] rounded-lg ${teacherbg} px-8 py-2 border-2 border-gray-200`} onClick={() => {setTeacherbg('bg-blue-100');setAdminbg('bg-white');setStudentbg('bg-white');setTeacherapi(true);setStudentapi(false);setAdminapi(false)}}>
                        <Users className="w-5 h-5" />
                        <h1>Teacher</h1>
                      </div>
                      <div className={`flex flex-col items-center cursor-pointer hover:scale-[103%] rounded-lg ${adminbg} px-8 py-2 border-2 border-gray-200`} onClick={() => {setAdminbg('bg-blue-100');setTeacherbg('bg-white');setStudentbg('bg-white');setTeacherapi(false);setStudentapi(false);setAdminapi(true)}}>
                        <Shield className="w-5 h-5" />
                        <h1>Admin</h1>
                      </div>
                    </div>
              </div> */}

              <form action="" onSubmit={handleSubmit} className='flex flex-col w-full gap-5'>

              <div className='w-full flex items-center px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-teal-500 transition-colors duration-200'>
                    <Mail className="h-5 w-5 text-gray-500 mr-3" />
                    <input
                        type="email"
                        placeholder='Email Address'
                        className='flex-grow outline-none bg-transparent text-gray-800 placeholder-gray-500 text-base'
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
              </div>

               <div className='w-full flex items-center px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-teal-500 transition-colors duration-200'>
                    <Lock className="h-5 w-5 text-gray-500 mr-3" />
                    <input
                        autoComplete='on'
                        type="password"
                        placeholder='Password'
                        className='flex-grow outline-none bg-transparent text-gray-800 placeholder-gray-500 text-base'
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
              </div>

                <button
                    type='submit'
                    className='bg-gradient-to-r from-teal-500 to-emerald-600 w-full py-3 text-white font-bold rounded-xl cursor-pointer hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                >
                    Sign In & Order Now
                </button>
              </form>


                <hr className='border-t border-gray-200 w-full my-6'/>
                <div className='text-center'>
                  <p className='text-gray-600 inline'>New to DishTribe? </p>

                   <NavLink to="/Register">
                       <button className='text-teal-600 font-bold hover:text-teal-700 transition-colors duration-200 ml-1'>Create Account</button>
                   </NavLink>

                </div>
            </div>

            <p className='text-gray-600 text-sm mt-6 animate-pulse'>
                🍕 Over **1000+ restaurants** • 🚚 **30min delivery** • ⭐ **4.8 rating**
            </p>


        </div>
      )
}

export default Login