import { useState,useEffect } from "react";

function FoodCategory() {

  const BASE_URL= "http://localhost:8000/app"
  const role=localStorage.getItem('role')
  const token=localStorage.getItem('token')
  const userId=localStorage.getItem('userId')
  console.log("userid "+userId)
  const [food,setFood]=useState([])
  const [category,setCategory]=useState("veg")
  console.log(category)
  console.log(food)
  
  const Foodcategory= food.filter((food)=>{
     return food.category===category
  })
  console.log(Foodcategory)

  const getFood= async () => {
  
      try {
        const response = await fetch(`${BASE_URL}/getAllFoods`, {
          method: "GET",
          headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
        },
        });
  
  
        const responsedata = await response.json();
  
        if (response.ok) {
          setFood(responsedata.foods);
        } else {
          console.log(responsedata.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    useEffect(()=>{
      getFood()
    },[])

     const addtocart = async (Fooditem) => {
        
          const cartItem = {

            userId:userId,
            _id: Fooditem._id,
            foodName: Fooditem.foodName,
            restaurantId:Fooditem.restaurantId,
            category:Fooditem.category,
            img:Fooditem.img,
            description: Fooditem.description,
            oldPrice: Fooditem.oldPrice,
            newPrice: Fooditem.newPrice,
          };

          try {
      const response = await fetch(`${BASE_URL}/addToOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(cartItem),
      });
      console.log("Sending data:", JSON.stringify(Fooditem));

      const responsedata = await response.json();
      
      if (response.ok) { 
        alert("Product Add to Cart")
      }
      else{
        alert(responsedata.message)
      }

      // console.log("your added item is", responsedata.data);
    } catch (error) {
      console.error("Error:", error);
    }

      }

  return (
  <div className="flex flex-col gap-12 px-4 md:px-16 py-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
    {/* Header */}
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Food Categories</h1>
      <p className="text-slate-600 text-lg max-w-md">
        Choose from our delicious vegetarian and non-vegetarian dishes
      </p>
    </div>

    {/* Category Buttons */}
    <div className="flex justify-center gap-6">
      <button
        onClick={() => setCategory("veg")}
        className={`px-10 py-4 font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 ${
          category === "veg" 
            ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-200" 
            : "bg-white text-emerald-600 border-2 border-emerald-300 hover:bg-emerald-50"
        }`}
      >
        🥬 Vegetarian
      </button>
      <button
        onClick={() => setCategory("non-veg")}
        className={`px-10 py-4 font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 ${
          category === "non-veg" 
            ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-200" 
            : "bg-white text-red-600 border-2 border-red-300 hover:bg-red-50"
        }`}
      >
        🍖 Non-Vegetarian
      </button>
    </div>

    {/* Category Section */}
    <div className="flex flex-col gap-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-slate-800">
          {category === "veg" ? "🌱 Vegetarian Dishes" : "🍗 Non Vegetarian Dishes"}
        </h2>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm rounded-full px-6 py-3 shadow-lg">
          {Foodcategory.length} items found
        </div>
      </div>

      {/* Food Cards */}
      <div className="flex flex-wrap gap-8 justify-start">
        {Foodcategory.length === 0 ? (
          <div className="text-slate-500 text-xl font-medium bg-white p-8 rounded-xl shadow-sm">No Dishes found</div>
        ) : (
          Foodcategory.map((Fooditm, index) => (
            <div
              key={index}
              className="w-full sm:w-[280px] md:w-[300px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
            >
              <div className="relative">
                <img
                  src={Fooditm.img}
                  alt="pic"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {Fooditm.category}
                </div>
              </div>
              <div className="flex flex-col gap-3 px-6 py-5">
                <h2 className="text-xl font-bold text-slate-800">
                  {Fooditm.foodName}
                </h2>
                <p className="text-slate-600 line-clamp-2 leading-relaxed">
                  {Fooditm.description}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <del className="text-slate-400 text-lg font-medium">
                    ${Fooditm.oldPrice}
                  </del>
                  <span className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-lg font-bold rounded-xl shadow-md">
                    ${Fooditm.newPrice}
                  </span>
                </div>
                {
                  role=="customer"? <button onClick={()=>{addtocart(Fooditm)}} className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3 rounded-xl text-white font-bold cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg">🛒 Add To Cart</button>: 
                        null }
               
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);
}

export default FoodCategory