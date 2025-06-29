import { useState, useEffect } from 'react'

function OrdersManagement() {

  const BASE_URL = "http://localhost:8000/app"
  const token = localStorage.getItem('token')
  const [orderdata, setOrderdata] = useState([])
  console.log(orderdata)

  async function getOrderData() {
    try {
      const response = await fetch(`${BASE_URL}/getAllOrder`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responsedata = await response.json();

      if (response.ok) {
        setOrderdata(responsedata.orders);
      } else {
        console.log("No Order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <div className="w-full px-6 md:px-14 py-10 bg-gray-50 min-h-screen">
      <div className="w-full flex flex-col gap-6">

        {/* Header Section */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-start sm:items-center gap-4">
            <div className="text-blue-500 text-4xl">📦</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Order Management</h1>
              <p className="text-gray-500 text-sm md:text-base">Monitor and manage all customer orders</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mt-4 sm:mt-0">Total Orders: {orderdata.length}</h2>
        </div>

        {/* Orders Section */}
        {orderdata.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No Orders Placed Yet</div>
        ) : (
          orderdata.map((order, index) => (
            <div
              key={index}
              className="w-full flex flex-col md:flex-row justify-between gap-6 px-6 py-6 bg-white rounded-lg shadow-sm"
            >
              {/* Customer Info */}
              <div className="flex flex-col gap-2 md:w-1/3">
                <div className="flex items-center gap-3">
                  <div className="text-xl text-green-500">👤</div>
                  <div>
                    <p className="font-semibold text-gray-800">{order.name}</p>
                    <p className="text-sm text-gray-500">{order.phone}</p>
                  </div>
                </div>
                <p className="text-gray-600">{order.address}</p>
              </div>

              {/* Items */}
              <div className="md:w-1/3">
                <h3 className="font-medium text-gray-700 mb-2">Ordered Items</h3>
                <div className="flex flex-col gap-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-gray-600 text-sm">
                      <span>{item.foodName}</span>
                      <span>{item.qty} × ${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="md:w-1/4 flex flex-col gap-2 justify-between">
                <div>
                  <h3 className="font-medium text-gray-700">Total Amount</h3>
                  <p className="text-xl font-bold text-gray-800">${order.total}</p>
                </div>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium text-white ${
                    order.status === "Pending" ? "bg-yellow-500" : order.status === "Delivered" ? "bg-green-500" : "bg-gray-500"
                  }`}
                >
                  {order.status}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OrdersManagement
