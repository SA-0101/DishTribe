import { useNavigate,NavLink } from 'react-router-dom'
import {useState } from 'react';
import { GraduationCap,Mail,Lock,ChefHat,Users,Gift} from "lucide-react";

function Register() {

   const BASE_URL="http://localhost:8000/app"
  
    const navigate=useNavigate()

    // const [studentbg,setStudentbg]=useState('bg-blue-100')
    // const [teacherbg,setTeacherbg]=useState("white")

    const [username,setUsename]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    // const [confirmpass,setConfirmpass]=useState("")

    // const [studentapi,setStudentapi]=useState(true)
    // const [teacherapi,setTeacherapi]=useState(false)

     const registerData={
      name:username,
      email:email,
      password:password,
      // confirmPassword:confirmpass
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
        <div className='flex flex-col justify-between gap-4 py-5 items-center overflow-y-hidden  max-w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>

            <div className='flex flex-col items-center gap-2'>
              <div className='flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16'>
                  <ChefHat className="w-8 h-8 text-white" />
              </div>
              
              <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>DishTribe</h1>
              <h1>Join thousands of food lovers!</h1>
            </div>

            <div className='flex flex-col w-[33%] h-auto justify-between rounded-lg px-6 py-3 gap-4 bg-white items-center shadow-lg shadow-gray-200'>
             <div className='flex flex-col items-center'>
                   <h1 className='text-2xl font-bold py-1'>Create Account</h1>
                   <h1 className='text-sm'>Sign up and get your first meal delivered</h1>
             </div>
             
              {/* <div className='w-full flex flex-col gap-2 py-3'>
                <h1 className='flex flex-col font-semibold'>I am a:</h1>
                  <div className='w-full flex basis-1 gap-4 flex-wrap justify-center  items-center'>
                    <div className={`flex flex-col items-center rounded-lg ${studentbg} px-12 py-5 border-2 border-gray-200`} onClick={() => {setStudentbg('bg-blue-100');setTeacherbg('bg-white');setTeacherapi(false);setStudentapi(true)}}>
                      <BookOpen className="w-5 h-5" />
                      <h1>Student</h1>
                    </div>
                   <div className={`flex flex-col items-center rounded-lg ${teacherbg} px-12 py-5 border-2 border-gray-200`} onClick={() => {setTeacherbg('bg-blue-100');setStudentbg('bg-white');setTeacherapi(true);setStudentapi(false)}}>
                      <Users className="w-5 h-5" />
                      <h1>Teacher</h1>
                    </div>
                  </div>
              </div> */}

              <div className='w-full flex items-center gap-2 rounded-lg px-3 py-2 bg-green-200'>
                  <Gift className="w-5 h-5 text-green-600" />
                  <div className='flex flex-col'>
                    <h1>Welcome Offer!</h1>
                    <h1>Get 20% off on your first order</h1>
                  </div>
              </div>

              <form action="" onSubmit={handleSubmit} className='flex flex-col w-full py-3 gap-5 items-center'>
             
              <div className='w-full flex justify-between items-center px-2 rounded-lg border border-gray-300 bg-gray-100'>
                    <Users className="h-5 w-5 text-gray-400" />
                    <input type="text" placeholder='Full Name' className='w-full outline-0 px-3 py-3' onChange={(e)=>{setUsename(e.target.value)}}/>
              </div>

              <div className='w-full flex justify-between items-center px-2 rounded-lg border border-gray-300 bg-gray-100'>
                    <Mail className="h-5 w-5 text-gray-400" />
                    <input type="text" placeholder='Email Address' className='w-full outline-0 px-3 py-3' onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
                
               <div className='w-full flex justify-between items-center px-2 rounded-lg border border-gray-300 bg-gray-100'>
                     <Lock className="h-5 w-5 text-gray-400" />
                    <input type="text" placeholder='Password' className='w-full outline-0 px-3 py-3' onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>

              {/* <div className='w-full flex justify-between items-center px-2 rounded-lg border border-gray-300 bg-gray-100'>
                     <Lock className="h-5 w-5 text-gray-400" />
                    <input type="text" placeholder='Conform Password' className='w-full outline-0 px-3 py-3' onChange={(e)=>{setConfirmpass(e.target.value)}}/>
              </div> */}

                <button type='submit' className='bg-blue-600 w-full py-3 text-white font-semibold rounded-lg cursor-pointer hover:scale-[102%] hover:bg-blue-700'>Join DishTribe</button>
              </form>


                <hr className='border-s border-gray-300 w-full'/>
                <div className='py-3'>
                  <label htmlFor="" className='text-gray-600'>Already have an account? </label>
                
                 <NavLink to="/Login">
                      <button className='text-blue-600 font-semibold cursor-pointer'>Sign In</button>
                 </NavLink>

                </div>
            </div>
            
            <h1 className='text-gray-500 text-xs'>🎉 Join 50K+ happy customers • 🍔 1000+ restaurants • 🚚 Lightning fast delivery</h1>

      
    </div>
      )
}

export default Register
