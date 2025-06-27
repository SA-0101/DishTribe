import { useNavigate,NavLink } from 'react-router-dom'
import { useState } from 'react';
import { Mail, Lock, ChefHat, Utensils } from "lucide-react";

function Login() {
  
     const BASE_URL="http://localhost:8000/app"
    
     const navigate=useNavigate()
     const [role,setRole]=useState("")


    // const [studentbg,setStudentbg]=useState('bg-blue-100')
    // const [teacherbg,setTeacherbg]=useState("white")
    // const [adminbg,setAdminbg]=useState("white")

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    // const [studentapi,setStudentapi]=useState(true)
    // const [tutorapi,setTeacherapi]=useState(false)
    // const [adminapi,setAdminapi]=useState(false)
    
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
          localStorage.setItem('name',data.user.name)
          localStorage.setItem('email',data.user.email)
          localStorage.setItem('role', data.user.role)
          navigate('/')

          // localStorage.setItem('data',JSON.stringify(data))
          // localStorage.setItem('token',data.token)
          // localStorage.setItem('studentname',data.student.studentName)
          // localStorage.setItem('studentimg',data.student.img)
          // localStorage.setItem('studentemail',data.student.email)
          // localStorage.setItem('studentcontact',data.student.contact)
          // localStorage.setItem('address',data.student.address)
          // localStorage.setItem('studentId',data.student._id)
          // localStorage.setItem('type',"Student")
          // console.log(data)
          // navigate("/Student")

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


  //    const loginUser =async ()=> {


  //   if (studentapi === true) {

  //     try {
  //       const response = await fetch(`${BASE_URL}/studentLogin`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(loginData)
  //       });

  //       const data = await response.json();

  //       if (response.ok) {
  //         alert('✅ Student Login Successfully!');
  //         // localStorage.setItem('data',JSON.stringify(data))
  //         localStorage.setItem('token',data.token)
  //         localStorage.setItem('studentname',data.student.studentName)
  //         localStorage.setItem('studentimg',data.student.img)
  //         localStorage.setItem('studentemail',data.student.email)
  //         localStorage.setItem('studentcontact',data.student.contact)
  //         localStorage.setItem('address',data.student.address)
  //         localStorage.setItem('studentId',data.student._id)
  //         localStorage.setItem('type',"Student")
  //         console.log(data)
  //         navigate("/Student")

  //       } else {
  //         alert(data.message || 'Something went wrong');
  //       }

  //     } catch (error) {

  //       alert('Registration failed: ' + error.message);
  //     }

  //   }

  //   else if(tutorapi===true) {

  //     try {
  //       const response = await fetch(`${BASE_URL}/teacherLogin`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(loginData)
  //       });

  //       const data = await response.json();
        
  //       if (response.ok) {
  //         alert('✅ Tutor Login Successfully!');
  //         localStorage.setItem('token',data.token)
  //         localStorage.setItem('type',"Teacher")
  //         localStorage.setItem('receiverType',"Student")
  //         localStorage.setItem('teacherId',data.teacher._id)
  //         localStorage.setItem('teacherName',data.teacher.teacherName)
  //         localStorage.setItem('teacherEmail',data.teacher.email)
  //         localStorage.setItem('teacherimg',data.teacher.img)
  //         console.log(data)
  //         navigate("/Tutor")
  //       } else {
  //         alert(data.message || 'Something went wrong during registration.');
  //       }

  //     } catch (error) {

  //       alert('Registration failed: ' + error.message);
  //     }

  //   }
  //   else{

  //     try {
  //       const response = await fetch(`${BASE_URL}/adminLogin`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(loginData)
  //       });

  //       const data = await response.json();

  //       if (response.ok) {
  //         alert('✅ Admin Login Successfully!');
  //         localStorage.setItem('token',data.token)
  //         localStorage.setItem('adminId',data.admin._id)
  //         localStorage.setItem('adminImg',data.admin.img)
  //         console.log(localStorage.getItem('adminImg'))
  //         localStorage.setItem('adminName',data.admin.adminName)
  //         localStorage.setItem('adminEmail',data.admin.email)
  //         localStorage.setItem('adminAddress',data.admin.address)
  //         localStorage.setItem('adminContact',data.admin.contact)
  //         console.log(data)

  //         console.log(data)
  //         navigate("/Admin")
  //       } else {
  //         alert(data.message || 'Something went wrong during registration.');
  //       }

  //     } catch (error) {

  //       alert('Registration failed: ' + error.message);
  //     }

  //   }

  // }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   loginUser();
  // }



    return (
        <div className='flex flex-col justify-between gap-4 py-5 items-center overflow-y-hidden  max-w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>

            <div className='flex flex-col items-center gap-2'>
              <div className='flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16'>
                  <ChefHat className="w-8 h-8 text-white" />
              </div>
              
              <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>DishTribe</h1>
              <h1>Delicious food at your doorstep</h1>
            </div>

            <div className='flex flex-col w-[33%] h-auto justify-between rounded-lg px-6 py-7 bg-white items-center shadow-lg shadow-gray-200'>
               <div className='flex flex-col items-center'>
                   <h1 className='text-2xl font-bold py-1'>Welcome Back!</h1>
                   <h1 className='text-sm'>Sign in to order your favorite meals</h1>
             </div>
              {/* <div className='w-full flex flex-col gap-2 py-3'>
                <h1 className='flex flex-col font-semibold'>Sign in as:</h1>
                  <div className='w-full flex basis-1 gap-4 flex-wrap justify-center  items-center'>
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

              <form action="" onSubmit={handleSubmit} className='flex flex-col w-full py-3 gap-5 items-center'>
             
              <div className='w-full flex justify-between items-center px-2 rounded-lg border border-gray-300 bg-gray-100'>
                    <Mail className="h-5 w-5 text-gray-400" />
                    <input type="email" placeholder='Email Address' className='w-full outline-0 px-3 py-3' onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
                
               <div className='w-full flex justify-between items-center px-2 rounded-lg border border-gray-300 bg-gray-100'>
                     <Lock className="h-5 w-5 text-gray-400" />
                    <input autoComplete='on' type="password" placeholder='Password' className='w-full outline-0 px-3 py-3' onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>

                <button type='submit' className='bg-blue-600 w-full py-3 text-white font-semibold rounded-lg cursor-pointer hover:scale-[102%] hover:bg-blue-700'>Sign In & Order Now</button>
              </form>

              {/* <NavLink to="/ForgetPass">
                       <button className='py-3 text-red-500 font-semibold cursor-pointer'>Forgot your Password?</button>
              </NavLink> */}
             

                <hr className='border-s border-gray-300 w-full'/>
                <div className='py-3'>
                  <label htmlFor="" className='text-gray-600'>New to DishTribe? </label>
                
                 <NavLink to="/Register">
                      <button className='text-blue-600 font-semibold cursor-pointer'>Create Account</button>
                 </NavLink>

                </div>
            </div>
            
            <h1 className='text-gray-500 text-xs'>🍕 Over 1000+ restaurants • 🚚 30min delivery • ⭐ 4.8 rating</h1>

      
    </div>
      )
}

export default Login
