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
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
    <div className="flex flex-col gap-10 px-4 md:px-16 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
          Food Categories
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
          Choose from our delicious vegetarian and non-vegetarian dishes
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex justify-center gap-6">
        <button
          onClick={() => setCategory("veg")}
          className={`px-10 py-4 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${
            category === "veg"
              ? "bg-green-500 text-white shadow-green-200"
              : "bg-white text-gray-700 hover:bg-green-50 border-2 border-green-200"
          }`}
        >
          🥗 Vegetarian
        </button>
        <button
          onClick={() => setCategory("non-veg")}
          className={`px-10 py-4 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${
            category === "non-veg"
              ? "bg-red-500 text-white shadow-red-200"
              : "bg-white text-gray-700 hover:bg-red-50 border-2 border-red-200"
          }`}
        >
          🍖 Non-Vegetarian
        </button>
      </div>

      {/* Category Section */}
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-3xl font-bold text-gray-800">
            {category === "veg" ? "🌱 Vegetarian Dishes" : "🍗 Non Vegetarian Dishes"}
          </h2>
          <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-sm font-semibold rounded-full px-6 py-3 shadow-lg">
            {Foodcategory.length} items found
          </div>
        </div>

        {/* Food Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Foodcategory.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🍽️</div>
              <div className="text-gray-500 text-xl">No Dishes found</div>
            </div>
          ) : (
            Foodcategory.map((Fooditm, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={Fooditm.img}
                    alt="pic"
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      Fooditm.category === "veg" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {Fooditm.category === "veg" ? "🌱 Veg" : "🍖 Non-Veg"}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1">
                    {Fooditm.foodName}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {Fooditm.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <del className="text-gray-400 text-sm">
                        ${Fooditm.oldPrice}
                      </del>
                      <span className="text-2xl font-bold text-orange-600">
                        ${Fooditm.newPrice}
                      </span>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {Math.round(((Fooditm.oldPrice - Fooditm.newPrice) / Fooditm.oldPrice) * 100)}% OFF
                    </div>
                  </div>
                  
                  {role == "customer" ? (
                    <button 
                      onClick={() => {addtocart(Fooditm)}} 
                      className="w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      🛒 Add To Cart
                    </button>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default FoodCategory