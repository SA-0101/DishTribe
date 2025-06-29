import { useState, useEffect } from "react";

function Analytics() {
  const BASE_URL = "http://localhost:8000/app";
  const [searchterm, setSearchterm] = useState("");
  const token = localStorage.getItem("token");
  const [resdata, setresdata] = useState([]);
  console.log(resdata);

  const filteredUsers = resdata.filter((res) => {
    const lowerSearch = searchterm.toLowerCase();
    return (
      res.restaurantName.toLowerCase().includes(lowerSearch) ||
      res.address.toLowerCase().includes(lowerSearch)
    );
  });

  const Approved = resdata.filter((res) => res.status === "Approved");
  const Pending = resdata.filter((res) => res.status === "Pending");
  const Rejected = resdata.filter((res) => res.status === "Rejected");
  const Banned = resdata.filter((res) => res.status === "Banned");

  const getOwnerRes = async () => {
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
    getOwnerRes();
  }, []);

  async function updateResstatus(res, newstatus) {
    try {
      const response = await fetch(`${BASE_URL}/updateRestaurantStatus/${res._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newstatus }),
      });

      const responsedata = await response.json();
      if (response.ok) {
        alert("u")
        getOwnerRes();
        console.log(responsedata)
      } else {
        console.log(responsedata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="w-full bg-blue-50 min-h-screen px-4 py-6">
      <div className="max-w-7xl mx-auto bg-gray-100 px-6 py-6 rounded-xl shadow-md space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white px-6 py-4 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="text-blue-500 text-4xl">📦</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Restaurant Management</h1>
              <p className="text-gray-500 text-sm md:text-base">Monitor and manage restaurant applications</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mt-4 sm:mt-0">Total Restaurants: {resdata.length}</h2>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { label: "Total", count: resdata.length, color: "bg-blue-200" },
            { label: "Approved", count: Approved.length, color: "bg-green-200" },
            { label: "Pending", count: Pending.length, color: "bg-yellow-200" },
            { label: "Rejected", count: Rejected.length, color: "bg-red-200" },
            { label: "Banned", count: Banned.length, color: "bg-gray-300" },
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg shadow-sm flex flex-col items-center ${item.color}`}>
              <h1 className="text-lg font-semibold">{item.label}</h1>
              <span className="text-xl font-bold">{item.count}</span>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white px-4 py-3 rounded-lg flex items-center gap-3 shadow-sm">
          <span className="text-blue-500 text-lg">🔎</span>
          <input
            onChange={(e) => setSearchterm(e.target.value)}
            className="w-full outline-none border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            placeholder="Search by name or address"
          />
        </div>

        {/* Restaurant Cards */}
        {filteredUsers.length === 0 ? (
          <div className="text-center text-gray-500">No Restaurants Found</div>
        ) : (
          filteredUsers.map((res, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition gap-6"
            >
              <div className="flex items-center gap-4 w-full md:w-1/2">
                <img className="w-20 h-20 object-cover rounded-md border" src={res.img} alt="img" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full w-fit">{res.status}</span>
                  <h1 className="text-lg font-semibold">{res.restaurantName}</h1>
                  <p className="text-sm text-gray-600">{res.address}</p>
                  <p className="text-xs text-gray-500">Owner: {res.ownerId}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <label className="font-medium text-gray-700">Change Status</label>
                <select
                  onChange={(e) => {
                    updateResstatus(res, e.target.value);
                  }}
                  className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">--- Select Status ---</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Banned">Banned</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Analytics;
