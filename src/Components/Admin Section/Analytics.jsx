import { useState, useEffect } from "react";

function Analytics() {

  const BASE_URL = "http://localhost:8000/app";
  const token = localStorage.getItem("token");
  const [resdata, setresdata] = useState([]);
  const [userdata,setuserdata]=useState([])
  const [orderdata,setorderdata]=useState([])
  

  {/* User Cards filters */}
   const customers = userdata.filter((user) => user.role === "customer");
  const owners = userdata.filter((user) => user.status === "owner");


  {/* Orders Cards filters */}

  const Delivered = orderdata.filter((order) => order.status === "Delivered");
  const Pending = orderdata.filter((order) => order.status === "Pending");
  
  {/* Calculating Revenue of Delivered Orders */}
  let Revenue=Delivered.reduce((acc,val)=> acc+val.total,0)


    {/* Users API Call */}
  const getAllusers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getAllUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responsedata = await response.json();
      if (response.ok) {
        setuserdata(responsedata.users);
      } else {
        alert(responsedata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  {/* Orders API Call */}
    const getAllorders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getAllOrder`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responsedata = await response.json();
      if (response.ok) {
        setorderdata(responsedata.orders);
      } else {
        alert(responsedata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  {/*Restaurent API Call */}
  const getAllRes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getAllRestaurants`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responsedata = await response.json();
      if (response.ok) {
        setresdata(responsedata.restaurants);
      } else {
        alert(responsedata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllusers();
    getAllorders();
    getAllRes();
  }, []);
  

  return (
    <div className="w-full bg-blue-50 min-h-screen px-4 py-6">
      <div className="max-w-7xl mx-auto bg-gray-100 px-6 py-6 rounded-xl shadow-md space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white px-6 py-4 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="text-blue-500 text-4xl">📦</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-500 text-sm md:text-base">Monitor your business performance and key metrics</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mt-4 sm:mt-0">Live Data</h2>
        </div>

        {/* Status Cards */}
        {/* User Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { label: "Total Users", count: userdata.length, color: "bg-blue-200" },
            { label: "Customers", count: customers.length, color: "bg-green-200" },
            { label: "Owners", count: owners.length, color: "bg-yellow-200" },
            { label: "Restaurents", count: resdata.length, color: "bg-red-200" },
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg shadow-sm flex flex-col items-center ${item.color}`}>
              <h1 className="text-lg font-semibold">{item.label}</h1>
              <span className="text-xl font-bold">{item.count}</span>
            </div>
          ))}
        </div>

          {/* Order Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { label: "Total Orders", count: orderdata.length, color: "bg-blue-200" },
            { label: "Delivered", count: Delivered.length, color: "bg-green-200" },
            { label: "Pending", count: Pending.length, color: "bg-yellow-200" },
           
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg shadow-sm flex flex-col items-center ${item.color}`}>
              <h1 className="text-lg font-semibold">{item.label}</h1>
              <span className="text-xl font-bold">{item.count}</span>
            </div>
          ))}
          {/* Revenue */}
          <div className={`p-4 rounded-lg shadow-sm flex flex-col items-center bg-red-200`}>
              <h1 className="text-lg font-semibold">Revenue (Delivered)</h1>
              <span className="text-xl font-bold">$ {Revenue}</span>
            </div>
        </div>

          {/* Monthly Trend Div */}
            <div className="bg-green-300 w-full h-28">Monthly Revenue Trends</div>

            {/* Order Status Div */}
            <div className="bg-indigo-300 w-full h-28">Order Status Distribution</div>

        </div>
    </div>
  );
}

export default Analytics;
