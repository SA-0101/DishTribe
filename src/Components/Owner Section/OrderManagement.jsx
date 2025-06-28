import { useState, useEffect } from "react";

function OrderManagement() {
  const BASE_URL = "http://localhost:8000/app";
  const token = localStorage.getItem("token");
  const [orderdata, setOrderdata] = useState([]);
  const [status, setStatus] = useState("");

  async function getOrderData() {
    try {
      const response = await fetch(`${BASE_URL}/getOwnerOrders`, {
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

  async function updateStatus(order) {
    if (status === "") {
      alert("Select status for change");
    } else {
      try {
        const response = await fetch(`${BASE_URL}/updateOrderStatus/${order._id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        });

        if (response.ok) {
          alert("Status Updated");
          getOrderData();
        } else {
          console.log("Failed to update status");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <div className='w-full flex flex-col gap-8 py-8 items-center bg-gradient-to-b from-indigo-50 to-white min-h-screen'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className="text-3xl font-bold text-blue-500">My Orders</h1>
        <h1>Track and manage your restaurant orders</h1>
      </div>

      {orderdata.length > 0 ? (
        orderdata.map((order, index) => (
          <div
            key={index}
            className='flex flex-col justify-center items-center w-[90%] max-w-4xl px-8 py-6 rounded-xl shadow-lg bg-white border border-indigo-100'
          >
            {/* Order Header */}
            <div className='w-full flex flex-col rounded-t-lg gap-1 px-4 py-4 bg-indigo-50 border-b border-indigo-200'>
              <div className='flex justify-between'>
                <h1 className='font-semibold text-indigo-600'>Order#</h1>
                <h1
                  className={`font-semibold ${
                    order.status === "Pending"
                      ? "text-yellow-600"
                      : order.status === "Cancel"
                      ? "text-red-600"
                      : order.status === "Delivered"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {order.status}
                </h1>
              </div>
              <h1 className='text-gray-500'>
                {new Date(order.createdAt).toISOString().split("T")[0]}
              </h1>

              {/* ✅ Moved Status Dropdown and Button Here */}
              <div className="flex gap-4 mt-2">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="">--- Update Status ---</option>
                  <option value="Not Available">Not Available</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button
                  onClick={() => updateStatus(order)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                >
                  Update Status
                </button>
              </div>
            </div>

            {/* Order Content */}
            <div className='w-full flex bg-white px-6 py-6'>
              <div className='w-1/2 pr-8 border-r border-indigo-100'>
                <h2 className='font-semibold text-indigo-700 mb-3'>Shipping Details</h2>
                <strong className='text-gray-700'>{order.name}</strong>
                <p className='text-gray-700'>{order.phone}</p>
                <p className='text-gray-700'>{order.address}</p>
                <p className='text-gray-700'>{order.paymentMethod}</p>
              </div>

              <div className='w-1/2 pl-8'>
                <h2 className='font-semibold text-indigo-700 mb-3'>Order Summary</h2>
                <div className='flex flex-col bg-indigo-50 p-4 rounded-lg'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-indigo-600 font-medium'>
                      Items ({order.items.length})
                    </span>
                  </div>
                  <hr className='border-indigo-300 mb-3' />
                  <div className='flex justify-between items-center font-bold text-indigo-900'>
                    <span>Total Amount</span>
                    <span>${order.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className='w-full'>
              <div className='flex flex-col rounded-b-lg px-6 py-6 bg-white gap-4'>
                <h2 className='text-indigo-700 font-semibold'>Order Items</h2>
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className='flex justify-between items-center py-3 border-b border-indigo-100'
                  >
                    <div className='flex gap-4 items-center'>
                      <img
                        className='w-[50px] h-[60px] rounded-md object-cover'
                        src={item.img}
                        alt="product"
                      />
                      <div className='flex flex-col'>
                        <h3 className='font-medium text-indigo-800'>{item.productName}</h3>
                        <p className='text-indigo-600'>
                          ${item.price} × {item.qty}
                        </p>
                      </div>
                    </div>
                    <h3 className='font-semibold text-indigo-900'>
                      ${item.price * item.qty}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='text-center text-gray-500 text-xl mt-12'>
          No Order Placed Yet, Place the Order
        </div>
      )}
    </div>
  );
}

export default OrderManagement;
