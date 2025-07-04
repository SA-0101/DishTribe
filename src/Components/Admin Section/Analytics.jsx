import { useState, useEffect } from "react";
import OrderStatusPieChart from "./OrderStatusPieChart";
import RevenueBar from "./RevenueBar";

function Analytics() {
  const BASE_URL = "http://localhost:8000/app";
  const token = localStorage.getItem("token");
  const [analyticsdata, setAnalyticsdata] = useState([]);

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
      <div className="max-w-7xl mx-auto bg-gray-100 px-6 py-6 rounded-xl shadow space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white px-6 py-5 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="text-blue-500 text-4xl">📦</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-500 text-sm md:text-base">Monitor your business performance and key metrics</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mt-4 sm:mt-0">Live Data</h2>
        </div>

        {/* User Cards (Flex) */}
        <div className="flex flex-wrap justify-between gap-4">
          {[
            { label: "Total Users", value: analyticsdata.totalUsers },
            { label: "Customers", value: analyticsdata.totalCustomers },
            { label: "Owners", value: analyticsdata.totalOwners },
            { label: "Restaurants", value: analyticsdata.totalRestaurants },
          ].map((item, i) => (
            <div key={i} className="flex-1 min-w-[150px] bg-white p-4 rounded-lg shadow text-center">
              <h1 className="text-lg font-semibold text-gray-700">{item.label}</h1>
              <span className="text-2xl font-bold text-blue-600">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Order Cards (Flex) */}
        <div className="flex flex-wrap justify-between gap-4">
          {[
            { label: "Total Orders", value: analyticsdata.totalOrders },
            { label: "Delivered Orders", value: analyticsdata.deliveredOrders },
            { label: "Pending Orders", value: analyticsdata.pendingOrders },
            { label: "Revenue (Delivered)", value: `$${analyticsdata.totalRevenue}` },
          ].map((item, i) => (
            <div key={i} className="flex-1 min-w-[150px] bg-white p-4 rounded-lg shadow text-center">
              <h1 className="text-lg font-semibold text-gray-700">{item.label}</h1>
              <span className="text-2xl font-bold text-green-600">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Monthly Revenue Trends */}
        <div className="flex flex-col bg-green-100 rounded-lg overflow-hidden">
          <div className="flex items-center gap-4 bg-green-200 px-5 py-4">
            <div>📊</div>
            <div>
              <h1 className="text-xl font-semibold">Monthly Revenue Trends</h1>
              <p className="text-sm text-gray-600">Track your revenue performance over time</p>
            </div>
          </div>

          <div className="bg-white px-4 py-6">
            <RevenueBar data={analyticsdata.monthlyRevenue} />
          </div>
        </div>

        {/* Order Status Pie Chart */}
        <div className="flex flex-col bg-white rounded-md shadow-lg p-5">
          <div className="flex items-center gap-4 bg-green-50 px-4 py-3 rounded-md mb-4">
            <div>📈</div>
            <div>
              <h1 className="text-xl font-semibold">Order Status Distribution</h1>
              <p className="text-sm text-gray-600">Analyze order completion rates</p>
            </div>
          </div>

          <div className="bg-blue-100 w-full px-4 py-5 rounded-md">
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
