import React, { useEffect, useState } from 'react'

function MyOrders() {

  const BASE_URL = "http://localhost:8000/app"

  const token = localStorage.getItem('token')
  const [orderdata, setOrderdata] = useState([])


  async function getOrderData() {

    try {
      const response = await fetch(`${BASE_URL}/getCustomerOrders`, {
        method: "GET",
        headers: {

          'Authorization': `Bearer ${token}`
        }
      });

      const responsedata = await response.json();

      if (response.ok) {
        setOrderdata(responsedata.orders);  // Store the fetched data in state
      }
      else {
        console.log("No Order")
      }

    } catch (error) {
      console.error('Error:', error);
    }

  }

  useEffect(() => {
    getOrderData();
  }, [])


  return (

    <div className='flex flex-col gap-8 py-8 items-center bg-gradient-to-b from-indigo-50 to-white min-h-screen'>

      <h1 className='text-center text-4xl font-extrabold text-indigo-700 mb-8'>My Orders</h1>

      {
        orderdata.length > 0 ? (
          orderdata.map((order, index) =>

            <div key={index} className='flex flex-col justify-center items-center w-[90%] max-w-4xl px-8 py-6 rounded-xl shadow-lg bg-white border border-indigo-100'>

              <div className='w-full flex flex-col rounded-t-lg gap-1 px-4 py-4 bg-indigo-50 border-b border-indigo-200'>

                <div className='flex justify-between'>
                  <h1 className='font-semibold text-indigo-600'>Order#</h1>
                  <h1 className={`font-semibold ${
                    order.status === 'Pending' ? 'text-yellow-600' :
                    order.status === 'Cancel' ? 'text-red-600' :
                    order.status === 'Delivered' ? 'text-green-600' : 'text-gray-600'
                  }`}>{order.status}</h1>
                </div>
                <h1 className='text-gray-500'>{new Date(order.createdAt).toISOString().split('T')[0]}</h1>

              </div>
              <hr className='border-indigo-200 w-full' />
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
                      <span className='text-indigo-600 font-medium'>Items ({order.items.length})</span>
                    </div>

                    <div className='flex justify-between items-center mb-2'>
                    </div>
                    <hr className='border-indigo-300 mb-3' />
                    <div className='flex justify-between items-center font-bold text-indigo-900'>
                      <span>Total Amount</span>
                      <span>${order.total}</span>
                    </div>

                  </div>
                </div>
              </div>
              <hr className='border-indigo-200 w-full' />
              <div className='w-full'>

                <div className='flex flex-col rounded-b-lg px-6 py-6 bg-white gap-4'>

                  <h2 className='text-indigo-700 font-semibold'>Order Items</h2>
                  {
                    order.items.map((item, idx) =>

                      <div key={idx} className='flex justify-between items-center py-3 border-b border-indigo-100'>

                        <div className='flex gap-4 items-center'>
                          <img className='w-[50px] h-[60px] rounded-md object-cover' src={item.img} alt="product" />
                          <div className='flex flex-col'>
                            <h3 className='font-medium text-indigo-800'>{item.productName}</h3>
                            <p className='text-indigo-600'>${item.price} × {item.qty}</p>
                          </div>
                        </div>

                        <h3 className='font-semibold text-indigo-900'>${item.price * item.qty}</h3>
                      </div>
                    )
                  }
                
                </div>

              </div>
            </div>
          )) : // Else No Order Placed yet
          (
            <div className='text-center text-gray-500 text-xl mt-12'>
              No Order Placed Yet, Place the Order
            </div>
          )
      }
    </div>
  )
}

export default MyOrders