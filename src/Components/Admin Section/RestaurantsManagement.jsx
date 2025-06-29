import { useState,useEffect } from "react"

function RestaurantsManagement() {

  const BASE_URL = "http://localhost:8000/app";
  const [searchterm,setSearchterm]=useState("")
  const token = localStorage.getItem('token');
  const [resdata, setresdata] = useState([]);

   const filteredUsers = resdata.filter((res) => {
    const lowerSearch = searchterm.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerSearch) ||
      user.email.toLowerCase().includes(lowerSearch)
    );
  });


   const getOwnerRes = async () => {
  
      try {
        const response = await fetch(`${BASE_URL}/getAllRestaurants`, {
          method: "GET",
          headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
        },
        });
  
  
        const responsedata = await response.json();
  
        if (response.ok) {
          setresdata(responsedata);
        } else {
          alert(responsedata.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    useEffect(()=>{
      getOwnerRes()
    },[])


  return (
    <div className='w-full  bg-blue-50 px-10 py-10'>
        <div className='w-full flex flex-col bg-gray-100 px-8 py-8 gap-5'>
         
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-start sm:items-center gap-4">
            <div className="text-blue-500 text-4xl">📦</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Restaurant Management</h1>
              <p className="text-gray-500 text-sm md:text-base">Monitor and manage restaurant applications</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mt-4 sm:mt-0">Total Orders:</h2>
        </div>

         <div className="bg-fuchsia-100 flex gap-3 px-6 py-6">
                <div className="flex gap-5 items-center bg-amber-200">
                  <div className="flex flex-col gap-2">
                    <h1>Total</h1>
                    <h1>1</h1>
                  </div>
                  <h1>icon</h1>
                </div>

                <div className="flex gap-5 items-center bg-amber-600">
                  <div className="flex flex-col gap-2">
                    <h1>Total</h1>
                    <h1>1</h1>
                  </div>
                  <h1>icon</h1>
                </div>
         
          </div>
        
          <div className='w-full flex flex-col md:flex-row justify-between items-stretch md:items-center px-3 py-3 gap-4 rounded-lg bg-gray-100'>
          <div className='w-full flex items-center gap-3'>
            <span className='text-blue-500 text-lg'>🔎</span>
            <input
              onChange={(e) => setSearchterm(e.target.value)}
              className='w-full outline-none border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 transition'
              type="text"
              placeholder='Search by name or email'
            />
          </div>
          </div>

          {
            resdata.length==0? <div>No Restaurents</div>:
            resdata.map((res,index)=>{
              return <div className='w-full flex md:flex-row items-stretch md:items-center justify-between px-3 py-3 gap-4 rounded-lg bg-red-100'>
          
            <div className="flex items-center gap-3">
              <img src={null} alt="img" />
              <div className="flex flex-col gap-3">
                <h1>Name</h1>
                <h1>Location</h1>
                <h1>Owner Id</h1>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h1>Change Status</h1>
              <select name="" id="">
                <option value="">1</option>
                <option value="">2</option>
              </select>
              <button>Update Status</button>
            </div>

          </div>
            })
          }

        </div>
    </div>
  )
}

export default RestaurantsManagement
