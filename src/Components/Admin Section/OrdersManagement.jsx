import React from 'react'

function OrdersManagement() {
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

              <div className='w-full flex justify-between gap-10 px-4 py-4 bg-white rounded-sm'>
                  
                  <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-4'>
                      icon
                      <div className='flex flex-col gap-1'>
                        <h1>Name</h1>
                        <h1>Phone</h1>
                      </div>
                    </div>
                    <h1>Address</h1>
                  </div>
                  <div>
                    <h1>Orders Items</h1>

                  <div className='flex flex-col gap-2'>
                  
                    {/* map */}
                    <div className='flex gap-10'>
                        <h1>name</h1>
                        <h1>qty*price</h1>
                    </div>
                    <div className='flex gap-10'>
                        <h1>name</h1>
                        <h1>qty*price</h1>
                    </div>

                  </div>

                  </div>

                  <div>
                    <h1>Total Amount</h1>
                    {/*map */}
                    <h1>Price</h1>
                    <button>Status</button>
                  </div>

              </div>

          
            </div>
    </div>
  )
}

export default OrdersManagement
