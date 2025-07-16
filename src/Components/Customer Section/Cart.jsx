import { useEffect, useState } from 'react'
import decrement from '../../assets/Decrement.png'
import increment from '../../assets/Increment.png'
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Cart() {

    const BASE_URL="http://localhost:8000/app"
    const navigate=useNavigate()

    const [cartdata,setCartdata]=useState([]);
    console.log(cartdata)

    const token=localStorage.getItem('token')

    const [delcharges,setDelcharges]=useState("3")
    const [itemsprice,setItemsprice]=useState([]);

    // Api Call for Get Cart Data
  async function getCartdata() {

      try {
        const response = await fetch(`${BASE_URL}/getCartItems`,{
          method:"GET",
          headers:{
            'Authorization': `Bearer ${token}`,
          }
        });

        const responsedata = await response.json();
        setCartdata(responsedata.items);   // Store the fetched data in state
        if (response.ok) {
          console.log("data fetched")
        }
        else{
            setCartdata([])
        }
      } catch (error) {
        console.error('Error:', error);
        setCartdata([])
      }

  }

useEffect(()=>{
      getCartdata();
},[])

  //Api Call for Delete Cart Data
  function deleteItem(product) {
    fetch(`${BASE_URL}/removeCartItem/${product._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) alert("Product Deleted"); else("Failed to delete")
      return response.json();
    })
    .then(data => {
      console.log(`Item ${product._id} deleted successfully`, data);

      getCartdata();
    })
    .catch(error => console.error('Error:', error));
  }

    const ItemsPrice=(cartdata)=>{
    const priceArray=cartdata.map((e)=> e.newPrice * e.qty)
    setItemsprice(priceArray)
   }

useEffect(()=>{
  ItemsPrice(cartdata);
},[cartdata])

const incrementquantityApi = async (product) => {
  try {
    const response = await fetch(`${BASE_URL}/increment/${product._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const responsedata = await response.json();

    if (response.ok) {
      getCartdata()
    } else {
      alert("Failed");
    }
  } catch (error) {
    console.log("Error in server:", error.message);
  }
};


const decrementquantityApi = async (product) => {
  try {
    const response = await fetch(`${BASE_URL}/decrement/${product._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const responsedata = await response.json();

    if (response.ok) {

      getCartdata()

    } else {
      alert("Failed");
    }
  } catch (error) {
    console.log("Error in server:", error.message);
  }
};

// Sum function for Adding Prices of ItemsPrice state
const sum = (arr) => {
  return arr.reduce((total, num) => total + num, 0);
};

  return (
    <div className='w-full min-h-screen bg-gray-50 flex flex-col lg:flex-row font-inter'>

        {/* Cart Items Section */}
       <div className='w-full lg:w-2/3 flex flex-col items-center gap-6 p-6 lg:p-8'>
          <h1 className='text-4xl font-extrabold text-gray-800 mb-4 self-start'>Your Cart</h1>
          {cartdata.length > 0 ? (
            cartdata.map((product, index) => (
              <div key={index} className='w-full flex flex-col sm:flex-row justify-between items-center p-5 border border-gray-200 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                <div className='flex items-center gap-4 mb-4 sm:mb-0'>
                  <img className='w-28 h-28 object-cover rounded-xl shadow-sm' src={product.img} alt={product.foodName} onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/112x112/E0E0E0/6C6C6C?text=No+Image`; }} />
                  <h3 className='text-xl font-semibold text-gray-800'>{product.foodName}</h3>
                </div>
                <div className='flex items-center gap-4 bg-gray-100 rounded-full px-4 py-2 shadow-inner'>
                  <button onClick={() => decrementquantityApi(product)} className='p-2 rounded-full hover:bg-gray-200 transition-colors duration-200'>
                    <img className='w-5 h-5 cursor-pointer' src={decrement} alt="Decrement" />
                  </button>
                  <h1 className='text-lg font-bold text-gray-800'>{product.qty}</h1>
                  <button onClick={() => incrementquantityApi(product)} className='p-2 rounded-full hover:bg-gray-200 transition-colors duration-200'>
                    <img className='w-5 h-5 cursor-pointer' src={increment} alt="Increment" />
                  </button>
                </div>
                <div className='font-bold text-2xl text-green-600 mt-4 sm:mt-0'>${product.newPrice.toFixed(2)}</div>
                <button onClick={() => deleteItem(product)} className='p-3 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200 mt-4 sm:mt-0'>
                  <FaTrash className='cursor-pointer text-red-600' size={20} />
                </button>
              </div>
            ))
          ) : (
            <div className='flex flex-col items-center justify-center h-96 w-full bg-white rounded-2xl shadow-lg'>
                <p className='text-3xl font-bold text-gray-500 mb-4'>Your Cart is Empty!</p>
                <p className='text-lg text-gray-600'>Start adding some delicious food to your cart.</p>
                <button
                    onClick={() => navigate('/')}
                    className='mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
                >
                    Browse Menu
                </button>
            </div>
          )}
        </div>

        {/* Order Summary Section */}
       <div className='w-full lg:w-1/3 p-6 lg:p-8 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 shadow-xl rounded-t-2xl lg:rounded-l-2xl flex flex-col gap-8'>

         <h1 className='text-3xl font-bold text-gray-800 border-b pb-4 mb-4'>Order Summary</h1>

         <div className='flex justify-between items-center text-xl'>
           <h1 className='text-gray-600'>Items ({cartdata.length})</h1>
           <h1 className='text-gray-700 font-bold'>${sum(itemsprice).toFixed(2)}</h1>
         </div>

         <div className='flex flex-col gap-3'>
           <h1 className='text-gray-600 text-xl'>Shipping</h1>
           <div className='relative'>
             <select
               className='bg-gray-100 w-full font-normal h-12 px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none pr-10 transition-colors duration-200 text-gray-800'
               onChange={(e)=>{setDelcharges(e.target.value)}}
               value={delcharges} // Ensure the select reflects the state
             >
               <option value="3">Normal Delivery - $3.00 (3-5 days)</option>
               <option value="5">Standard Delivery - $5.00 (1-2 days)</option>
               <option value="10">Urgent Delivery - $10.00 (Same day)</option>
             </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
               <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
             </div>
           </div>
         </div>

         <div className='flex flex-col gap-3'>
           <h1 className='text-gray-600 text-xl'>Promo Code</h1>
           <input
             className='bg-gray-100 w-full font-normal h-12 px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 text-gray-800'
             placeholder='Enter Your Code'
             type="text" // Changed type to text for promo codes
           />
         </div>

         <div className='flex flex-col gap-6 pt-4 border-t border-gray-200'>

           <div className='flex justify-between items-center text-2xl font-bold'>
             <h1 className='text-gray-800'>Total Price</h1>
             <h1 className='text-green-700'>{cartdata.length > 0 ? "$" + (sum(itemsprice) + Number(delcharges)).toFixed(2) : "$0.00"}</h1>
           </div>

           <button
             className='w-full py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-xl cursor-pointer hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl'
             onClick={()=> navigate("/InfoInvoice", {state:{delcharges: delcharges}})}
           >
             Proceed To Checkout
           </button>

         </div>

       </div>
    </div>
  )
}

export default Cart