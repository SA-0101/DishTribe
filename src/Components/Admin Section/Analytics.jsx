import { useState, useEffect } from "react";
import OrderStatusPieChart from "./OrderStatusPieChart";

function Analytics() {

  const BASE_URL = "http://localhost:8000/app";
  const token = localStorage.getItem("token");
  const [analyticsdata,setAnalyticsdata]=useState([])
  console.log(analyticsdata)
  
  
  // {/* Calculating Revenue of Delivered Orders */}
  // let Revenue=Delivered.reduce((acc,val)=> acc+val.total,0)

  {/*Analytics API Call */}
  const getAnalyticsdata = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/analytics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responsedata = await response.json();
      if (response.ok) {
        setAnalyticsdata(responsedata);
        
      } else {
        alert(responsedata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAnalyticsdata();
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
            {/* Card 1 */}
            <div className={`p-4 rounded-lg shadow-sm flex flex-col items-center `}>
              <h1 className="text-lg font-semibold">Total Users</h1>
              <span className="text-xl font-bold">{analyticsdata.totalUsers}</span>
            </div>

             {/* Card 2 */}
            <div className={`p-4 rounded-lg shadow-sm flex flex-col items-center `}>
              <h1 className="text-lg font-semibold">Customers</h1>
              <span className="text-xl font-bold">{analyticsdata.totalCustomers}</span>
            </div>

             {/* Card 3 */}
            <div className={`p-4 rounded-lg shadow-sm flex flex-col items-center `}>
              <h1 className="text-lg font-semibold">Owners</h1>
              <span className="text-xl font-bold">{analyticsdata.totalOwners}</span>
            </div>

             {/* Card 4 */}
            <div className={`p-4 rounded-lg shadow-sm flex flex-col items-center `}>
              <h1 className="text-lg font-semibold">Restaurents</h1>
              <span className="text-xl font-bold">{analyticsdata.totalRestaurants}</span>
            </div>
          
        </div>

          {/* Order Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          
            <div className={`p-4 rounded-lg shadow-sm flex flex-col items-center`}>
              <h1 className="text-lg font-semibold">Total Orders</h1>
              <span className="text-xl font-bold">{analyticsdata.totalOrders}</span>
            </div>

             <div className={`p-4 rounded-lg shadow-sm flex flex-col items-center`}>
              <h1 className="text-lg font-semibold">Delivered Orders</h1>
              <span className="text-xl font-bold">{analyticsdata.deliveredOrders}</span>
            </div>

             <div className={`p-4 rounded-lg shadow-sm flex flex-col items-center`}>
              <h1 className="text-lg font-semibold">Pending Orders</h1>
              <span className="text-xl font-bold">{analyticsdata.pendingOrders}</span>
            </div>

             <div className={`p-4 rounded-lg shadow-sm flex flex-col items-center`}>
              <h1 className="text-lg font-semibold">Revenue(Delivered)</h1>
              <span className="text-xl font-bold">${analyticsdata.totalRevenue}</span>
            </div>
          
        </div>

          {/* Monthly Trend Div */}
            <div className="bg-green-300 w-full h-28">Monthly Revenue Trends</div>

            {/* Order Status Div */}
            <div className="w-full flex flex-col items-center justify-center py-2 gap-5">
              <div className="bg-green-50 w-full flex items-center px-3 gap-3">

                  <div>Icon</div>
                  <div className="flex flex-col gap-1">
                    <h1>Order Status Distribution</h1>
                    <h1>Analyze order completion rates</h1>
                  </div>

              </div>
                  <h1 className="text-xl font-semibold">Order Status Distribution</h1>
                <div>
                    {/* You can have inputs here to change values if you want */}
                    <OrderStatusPieChart
                      total={analyticsdata.totalOrders}
                      delivered={analyticsdata.deliveredOrders}
                      pending={analyticsdata.pendingOrders}
                    />
                </div>

            </div>

        </div>
    </div>
  );
}

export default Analytics;
