import { useState,useEffect } from 'react'

function UserManagement() {

  const BASE_URL= "http://localhost:8000/app"

    const token=localStorage.getItem('token')
    const [role,setRole]=useState("All")
    const [changerole,setchangerole]=useState("customer")
    const [usersdata,serusersdata]=useState([])
    console.log(usersdata)

 async function getAllusers() {
        try {
          const response = await fetch(`${BASE_URL}/getAllUsers`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const responsedata = await response.json();
    
          if (response.ok) {
            serusersdata(responsedata.users);
          } else {
            console.log("No Order");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    
      useEffect(() => {
        getAllusers();
      }, []);

  async function deleteUser(user) {
        try {
          const response = await fetch(`${BASE_URL}/deleteUser/${user._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const responsedata = await response.json();
    
          if (response.ok) {
            getAllusers()
          } else {
            console.log(responsedata.message);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    
      useEffect(() => {
        getAllusers();
      }, []);

    



  return (
    <div className='w-full bg-green-100 px-10 py-10'>
        <div className='bg-gray-100 w-full flex flex-col px-5 py-5 gap-5'>


                <div className='w-full flex justify-between items-center px-3 py-2 rounded-lg bg-white'>

                      <div className='flex gap-4 items-center'>
                        icon
                        <div className='flex flex-col gap-2'>
                                <h1 className='text-2xl font-bold'>User Management</h1>
                                <h1>Manage user roles and permissions</h1>
                        </div>
                      </div>
                      <h1>Total Users: {usersdata.length}</h1>
                </div>


                 <div className='w-full flex justify-between items-center px-3 py-2 gap-4 rounded-lg bg-white'>

                     <div className='w-full flex items-center gap-2'>
                      <h1>Icon</h1>
                      <input className='w-full outline-0 border border-black px-2 py-2 rounded-lg' type="text" placeholder='Search by name or email'/>
                     </div>

                     <select name="" id="" value={role} onChange={(e)=>{setRole(e.target.value)}}>
                      <option value="All">All Roles</option>
                      <option value="customer">Customer</option>
                      <option value="owner">Owner</option>
                      <option value="admin">Admin</option>
                     </select>

                </div>  

                {
                  usersdata.length==0? <div>No Users</div> :
                  usersdata.map((user,index)=>{
                    return  <div key={index} className='w-full flex justify-between items-center px-3 py-2 rounded-lg bg-white'>

                      <div className='flex gap-5 items-center'>
                        icon
                        <div className='flex flex-col gap-2'>
                                <h1>{user.name}</h1>
                                <h1>{user.email}</h1>
                        </div>
                      </div>
                      
                      <div className='flex gap-3'>
                        <button>{user.role}</button>
                         <select name="" id="" value={changerole} onChange={(e)=>{setchangerole(e.target.value)}}>
                              <option value="customer">customer</option>
                              <option value="owner">owner</option>
                              <option value="admin">admin</option>
                         </select>
                         <button onClick={()=>{deleteUser(user)}}>Delete Icon</button>

                      </div>
                </div>
                  })
                }         

        </div>
    </div>
  )
}

export default UserManagement
