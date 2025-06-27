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
                setCartdata(responsedata.items);  // Store the fetched data in state
          
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
    setTax((2/100)*subtotal)
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
    <form className='flex justify-center gap-8 py-6 bg-[#F5F5F5]'>
        <div className='w-[550px] h-[600px]  rounded-2xl bg-white shadow-2xl'>
            <h1 className='bg-blue-500 h-[55px] py-4 px-4 text-white font-bold rounded-tr-2xl rounded-tl-2xl'>Customer Information</h1>
          
           <div className='flex flex-col gap-5'>


          <div className='flex flex-col py-3'>

            <div className='flex flex-col px-6 py-2.5 gap-1'>
              <label htmlFor="">Full Name</label>
              <input type="text" placeholder='Enter Name' className='outline-1 rounded-sm h-10 px-3'  onChange={(e)=>setCname(e.target.value)}/>
            </div>

            <div className='flex flex-col px-6 py-2.5 gap-1'>
              <label htmlFor="">Phone Number</label>
              <input type="text" placeholder='+92-00000000000' className='outline-1 rounded-sm h-10 px-3' onChange={(e)=>setCphone(e.target.value)} />
            </div>

            <div className='flex flex-col px-6 py-2.5 gap-1'>
              <label htmlFor="">Delivery Address</label>
              <input type="text" placeholder='House# Street# City' className='outline-1 rounded-sm h-10 px-3' onChange={(e)=>setDeladdress(e.target.value)}/>
            </div>

            <div className='flex flex-col px-6 py-2.5 gap-1'>
              <label htmlFor="">Delivery Method</label>
              <select className='outline-1 rounded-sm h-10 px-3' name="Delivery Method" id="" onChange={(e)=> setDelmethod(e.target.value)}>
              <option value="COD">Cash On Delivery</option>
              <option value="Credit/ Debit Card">Credit/ Debit Card</option>
            </select>
            </div>

            </div>

            <div className='flex px-6 py-2 gap-1 font-semibold'>
              <label htmlFor="">Selected:</label>
              <h1 className='text-blue-700 font-bold'>{delmethod}</h1>
            </div>

            <div className='px-6'>
            <h1 className='py-2 px-3 bg-green-200'>{text}</h1>
            </div>
              

            </div>
            

          </div>

          <div className='w-[550px] rounded-2xl'>
              
                <div className='flex justify-between bg-green-400 h-[55px] py-4 px-5 text-white font-bold rounded-tr-2xl rounded-tl-2xl'>
                  <h1>Invoice</h1>
                  <h1>Bazar.pk</h1>
                </div>

                <div className='flex flex-col px-5 py-4 bg-white'>
                  <h1 className='font-semibold'>{cname}</h1>
                  <h1>{cphone}</h1>
                  <h1>{deladdress}</h1>
                  <h1>{`${date}/${month}/${year}`}</h1>
                </div>
                <hr />
                <div className='flex flex-col py-4 px-5 bg-white'>
                  <div className='flex justify-between'>
                    <h1>S.NO</h1>
                    <h1>PRODUCT NAME</h1>
                    <h1>QTY</h1>
                    <h1>PRICE</h1>
                  </div>
                  <hr />

                  {
                  cartdata.map((e,index)=>
                    <div key={index} className='flex justify-between px-5 py-4 '>
                    <h1>{index+1}</h1>
                    <span 
                      className="max-w-[180px] truncate block" 
                      title={e.foodName}
                    >
                      {e.foodName}
                    </span>
                    <h1>{e.qty} * {e.newPrice}</h1>
                    <h1>${e.qty * e.newPrice}</h1>
                  </div>
                  
                  )
                  
                  }
                  <hr />
                 <div className='flex flex-col'>

                  <div className='flex gap-5'>
                    <h1>Subtotal</h1>
                    <h1>${subtotal}</h1>
                  </div>
                  <div className='flex gap-5'>
                    <h1>Delivery Charges</h1>
                    <h1>${delcharges}</h1>
                  </div>
                  <div className='flex gap-5'>
                    <h1>Tax(2%)</h1>
                    <h1>${tax}</h1>
                  </div>
                  <hr />
                  <div className='flex gap-5'>
                    <h1>Grand Total</h1>
                    <h1>${grandtotal}</h1>
                  </div>
                    </div> 


                </div>
                <div className='py-4 px-5 shadow-[0_20px_30px_-10px_rgba(0,0,0,0.3)] bg-[#FFF]'>
                  <h1 className='text-red-500 font-bold shadow-2xl'>Bazar.pk</h1>
                  <h1>All rights reserved &copy; 2025</h1>
                </div>
                <div className='h-[50px] bg-[#F5F5F5]'></div>
                <div className='flex justify-center items-center rounded-sm py-2 font-semibold bg-blue-500 cursor-pointer' onClick={()=>{ PlaceOrder(),navigate('/')}}>Place Order</div>

          </div>
    </form>
  )
}

export default InfoInvoice