import { useEffect,useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';

function InfoInvoice() {

  //Component of Placing Order

    const BASE_URL= "http://localhost:8000/app"

            const token=localStorage.getItem('token')
            const userId=localStorage.getItem('userId')
            const location = useLocation();
            const delcharges = location.state?.delcharges;
            const navigate=useNavigate()
            console.log(userId)

            const [cartdata,setCartdata]=useState([]);
            const [delmethod,setDelmethod]=useState("Cash On Delivery")
            const [text,setText]=useState("Pay orders at doorstep")
            const [cname,setCname]=useState("Customer Name")
            const [cphone,setCphone]=useState("Phone Number")
            const [deladdress,setDeladdress]=useState("Delivery Address")
            const [subtotal,setSubtotal]=useState(0)
            const [tax,setTax]=useState(0)
            const [grandtotal,setGrandtotal]=useState(0)

            const today = new Date();
            const date = today.getDate();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();

            const postOrderObj={
              userId:userId,
              fullName:cname,
              phone:cphone,
              address:deladdress,
              paymentMethod:delmethod,
              total:grandtotal,
            }



  const getCartdata=async () =>{

              try {
                const response = await fetch(`${BASE_URL}/getCartItems`,{
                  method:"GET",
                  headers:{
            'Authorization': `Bearer ${token}`
          }
                });

                const responsedata = await response.json();
                setCartdata(responsedata.items);   // Store the fetched data in state

                if (response.ok) {
                  console.log("Card data fetched Successfully!!")
                }
              } catch (error) {
                console.error('Error:', error);
              }

            }


            useEffect(()=>{
                  getCartdata()

            },[])


//UseEffect for calculating subtotal whenever cartdata changes
useEffect(() => {
  if (cartdata.length > 0) {
    const Subtotal = cartdata.reduce((acc, item) => acc + item.newPrice * item.qty, 0);
    setSubtotal(Subtotal);
    setTax((2/100)*Subtotal) // Recalculate tax based on the new subtotal
  } else {
    setSubtotal(0);
    setTax(0);
  }
}, [cartdata]);


//useeffect for Calculate tax as 2% of subtotal whenever subtotal changes
useEffect(() => {
  setTax((2 / 100) * subtotal);
}, [subtotal]);

//UseEffect for calculating GrandTotal whenever tax,subtotal or delcharges changes
useEffect(()=>{
  setGrandtotal(Number(subtotal)+Number(delcharges)+Number(tax))
},[tax,subtotal,delcharges])


    const PlaceOrder = async () => {

        try {
    const response = await fetch(`${BASE_URL}/placeOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postOrderObj)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Data posted successfully:', data);
    } else {
      alert('❌ Error from server:', data.message || 'Unknown error')
    }
  } catch (error) {
    alert("🚫 Network or server error:", error.message)
  }
};



  return (
    <form className='flex flex-col lg:flex-row justify-center items-start gap-8 py-10 px-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-inter'>
        {/* Customer Information Card */}
        <div className='w-full lg:w-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden'>
            <h1 className='bg-gradient-to-r from-blue-600 to-indigo-700 h-[60px] flex items-center px-6 text-white text-2xl font-bold rounded-t-2xl'>Customer Information</h1>

           <div className='flex flex-col gap-6 p-6'>

           <div className='flex flex-col gap-2'>
              <label htmlFor="" className='text-lg font-semibold text-gray-700'>Full Name</label>
              <input type="text" placeholder='Enter Name' className='outline-none border border-gray-300 rounded-lg h-12 px-4 text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200' onChange={(e)=>setCname(e.target.value)}/>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="" className='text-lg font-semibold text-gray-700'>Phone Number</label>
              <input type="text" placeholder='+92-00000000000' className='outline-none border border-gray-300 rounded-lg h-12 px-4 text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200' onChange={(e)=>setCphone(e.target.value)} />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="" className='text-lg font-semibold text-gray-700'>Delivery Address</label>
              <input type="text" placeholder='House# Street# City' className='outline-none border border-gray-300 rounded-lg h-12 px-4 text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200' onChange={(e)=>setDeladdress(e.target.value)}/>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="" className='text-lg font-semibold text-gray-700'>Payment Method</label>
              <select className='outline-none border border-gray-300 rounded-lg h-12 px-4 text-lg bg-white appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200' name="Delivery Method" id="" onChange={(e)=> {setDelmethod(e.target.value); setText(e.target.value === "Cash On Delivery" ? "Pay orders at doorstep" : "Payment will be processed securely online");}}>
                <option value="Cash On Delivery">Cash On Delivery</option>
                <option value="Credit/ Debit Card">Credit/ Debit Card</option>
              </select>
            </div>

            <div className='flex items-center gap-2 font-semibold text-lg'>
              <label htmlFor="" className='text-gray-700'>Selected:</label>
              <h1 className='text-blue-700 font-bold'>{delmethod}</h1>
            </div>

            <div className='bg-green-100 border border-green-200 text-green-800 py-3 px-4 rounded-lg text-md font-medium'>
              <h1>{text}</h1>
            </div>

            </div>
        </div>

        {/* Invoice Card */}
        <div className='w-full lg:w-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden'>

            <div className='flex justify-between items-center bg-green-500 h-[60px] py-4 px-6 text-white text-2xl font-bold rounded-t-2xl'>
              <h1>Invoice</h1>
              <h1>DishTribe</h1>
            </div>

            <div className='flex flex-col px-6 py-5 bg-white text-gray-700'>
              <h1 className='font-bold text-xl mb-1'>{cname}</h1>
              <p className='text-md'>{cphone}</p>
              <p className='text-md'>{deladdress}</p>
              <p className='text-md mt-2'>{`${date}/${month}/${year}`}</p>
            </div>
            <hr className='border-gray-200' />
            <div className='flex flex-col py-5 px-6 bg-white'>
              <div className='grid grid-cols-4 gap-4 font-bold text-gray-800 pb-3 border-b border-gray-200'>
                <h1>S.NO</h1>
                <h1 className='col-span-2'>PRODUCT NAME</h1>
                <h1 className='text-right'>PRICE</h1>
              </div>

              {
              cartdata.length > 0 ? (
                cartdata.map((e,index)=>
                  <div key={index} className='grid grid-cols-4 gap-4 py-4 border-b border-gray-100 text-gray-700'>
                    <h1 className='font-medium'>{index+1}</h1>
                    <span
                      className="col-span-2 font-medium truncate"
                      title={e.foodName}
                    >
                      {e.foodName} (x{e.qty})
                    </span>
                    <h1 className='text-right font-semibold'>${(e.qty * e.newPrice).toFixed(2)}</h1>
                  </div>
                )
              ) : (
                <div className='py-4 text-center text-gray-500'>No items in cart to display.</div>
              )
              }

              <div className='flex flex-col gap-3 pt-5'>
                <div className='flex justify-between text-lg text-gray-700'>
                  <h1>Subtotal</h1>
                  <h1 className='font-semibold'>${subtotal.toFixed(2)}</h1>
                </div>
                <div className='flex justify-between text-lg text-gray-700'>
                  <h1>Delivery Charges</h1>
                  <h1 className='font-semibold'>${Number(delcharges).toFixed(2)}</h1>
                </div>
                <div className='flex justify-between text-lg text-gray-700'>
                  <h1>Tax (2%)</h1>
                  <h1 className='font-semibold'>${tax.toFixed(2)}</h1>
                </div>
                <hr className='border-gray-200 my-2' />
                <div className='flex justify-between text-xl font-bold text-gray-800'>
                  <h1>Grand Total</h1>
                  <h1 className='text-green-700'>${grandtotal.toFixed(2)}</h1>
                </div>
              </div>


            </div>
            <div className='py-4 px-6 bg-gray-50 border-t border-gray-200 text-gray-600 text-sm rounded-b-2xl'>
              <h1 className='text-blue-700 font-bold mb-1'>DishTribe</h1>
              <h1>All rights reserved &copy; {year}</h1>
            </div>

            {/* Place Order Button */}
            <button
                type='submit'
                className='w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl font-bold rounded-b-2xl cursor-pointer hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                onClick={()=>{ PlaceOrder(); navigate('/'); }}
            >
                Place Order
            </button>

        </div>
    </form>
  )
}

export default InfoInvoice