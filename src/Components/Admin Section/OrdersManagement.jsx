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
    <div className='w-full px-14 py-10'>
      <div className='w-full flex flex-col px-5 py-5 gap-4 bg-gray-100'>

        <div className='w-full flex justify-between items-center px-4 py-4 bg-white rounded-sm'>
          <div className='flex items-center gap-6'>
            icon
            <div className='flex flex-col gap-1'>
              <h1 className='text-3xl font-bold'>Order Management</h1>
              <h1>Monitor and manage all customer orders</h1>
            </div>
          </div>
          <h1>Total Orders</h1>
        </div>

        {
          orderdata.length===0? <div>No Orders Place yet</div>:
          orderdata.map((order,index)=>{
            return <div key={index} className='w-full flex justify-between gap-10 px-4 py-4 bg-white rounded-sm'>

            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-4'>
                icon
                <div className='flex flex-col gap-1'>
                  <h1>{order.name}</h1>
                  <h1>{order.phone}</h1>
                </div>
              </div>
              <h1>{order.address}</h1>
            </div>

            <div>
              <h1>Orders Items</h1>
              {
                order.items.map((item,index)=>{
                  return  <div key={index} className='flex flex-col gap-2'>
                              <div className='flex gap-10'>
                                <h1>{item.foodName}</h1>
                                <h1>{item.qty}* ${item.price}</h1>
                              </div>
                              
                           </div>
                })
              }
             
            </div>

            <div>
              <h1>Total Amount</h1>
              <h1>${order.total}</h1>
              <button>{order.status}</button>
            </div>

          </div>
       
          })
        }


      </div>
    </div>
  )
}

export default OrdersManagement
