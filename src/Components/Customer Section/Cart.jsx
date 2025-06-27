
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

    // let storedUser = localStorage.getItem('user');
    // const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
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
        setCartdata(responsedata.items);  // Store the fetched data in state
        console.log(responsedata)
        if (response.ok) {
          console.log("Card data fetched Successfully!!")
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
      
      // setCartdata(prevCart => prevCart.filter(item => item._id !== product._id));
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
      alert("Incremented");
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
      alert("decremented");
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
    <div className='w-full bg-gray-100 flex'>

       <div className='w-2/3 flex flex-col items-center gap-4 p-8'>

       {cartdata.length > 0 ? (
  cartdata.map((product, index) => (
    <div key={index} className='w-full text-base font-medium flex justify-between items-center px-6 py-4 border rounded-xl bg-white shadow-md'>
      <div className='flex items-center gap-4'>
        <img className='w-24 h-28 object-cover rounded' src={product.img} alt="" />
        <h3>{product.foodName}</h3>
      </div>
      <div className='flex items-center gap-3'>
        <img className='w-6 h-6 cursor-pointer' src={decrement} alt="" onClick={()=>decrementquantityApi(product)}/>
        <h1>{product.qty}</h1>
        <img className='w-6 h-6 cursor-pointer' src={increment} alt="" onClick={()=>incrementquantityApi(product)} />
      </div>
      <div className='font-semibold text-blue-600'>${product.newPrice}</div>
      <button  onClick={()=>deleteItem(product)}><FaTrash className='cursor-pointer' size={20} color="red" /></button>
    </div>
  ))
) : (
  <h1 className='text-xl font-semibold text-center text-gray-500'>No Product Found, Add product in Cart</h1>
)}
</div>
      

       <div className='w-1/3 min-h-screen p-8 bg-white border-l shadow-md text-lg font-semibold flex flex-col gap-8'>

        <h1 className='text-3xl font-bold text-gray-800'>Summary</h1>

        <div className='flex justify-between'>
          <h1 className='text-gray-600'>ITEMS</h1>
          <h1 className='text-gray-700'>${sum(itemsprice).toFixed(2)}</h1>
        </div> 

        <div className='flex flex-col gap-2'>
          <h1 className='text-gray-600'>SHIPPING</h1>
          <select className='bg-gray-100 w-full font-normal h-10 px-3 py-2 rounded-lg border' 
           onChange={(e)=>{setDelcharges(e.target.value)}} name="" id="">
            <option value="3">Normal-Delivery-$3.00</option>
            <option value="5">Standard-Delivery-$5.00</option>
            <option value="10">Urgent-Delivery-$10.00</option>
          </select>
        </div>

            <div className='flex flex-col gap-2'>
              <h1 className='text-gray-600'>GIVEN CODE</h1>
              <input className='bg-gray-100 w-full font-normal h-10 px-3 py-2 rounded-lg border' placeholder='Enter Your Code' type="number" />
            </div>

            <div className='flex flex-col gap-4'>

              <div className='flex justify-between'>
                <h1 className='text-gray-800'>Total Price</h1>
                <h1 className='text-gray-800'>{cartdata.length > 0 ? "$" + (sum(itemsprice) + Number(delcharges)).toFixed(2) : "$0"}</h1>
               </div>

             <button className='text-white w-full h-10 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200' onClick={()=> navigate("/InfoInvoice", {state:{delcharges: delcharges}})}>Proceed To Checkout</button>
               
              
            </div>

       </div>
    </div>
  )
}

export default Cart

