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
  <div className="flex flex-col gap-10 px-4 md:px-16 py-6">
    {/* Header */}
    <div className="flex flex-col items-center gap-3 text-center">
      <h1 className="text-3xl font-semibold">Food Categories</h1>
      <p className="text-gray-600">
        Choose from our delicious vegetarian and non-vegetarian dishes
      </p>
    </div>

    {/* Category Buttons */}
    <div className="flex justify-center gap-4">
      <button
        onClick={() => setCategory("veg")}
        className="px-8 py-3 font-semibold bg-gray-200 rounded-3xl cursor-pointer hover:bg-gray-300"
      >
        Vegetarian
      </button>
      <button
        onClick={() => setCategory("non-veg")}
        className="px-8 py-3 font-semibold bg-red-500 text-white rounded-3xl cursor-pointer hover:bg-red-600"
      >
        Non-Vegetarian
      </button>
    </div>

    {/* Category Section */}
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h2 className="text-2xl font-bold text-gray-800">
          {category === "veg" ? "Vegetarian Dishes" : "Non Vegetarian Dishes"}
        </h2>
        <button className="bg-gray-100 text-sm text-gray-700 rounded-full px-4 py-2 shadow-sm">
          {Foodcategory.length} items found
        </button>
      </div>

      {/* Food Cards */}
      <div className="flex flex-wrap gap-6 justify-start">
        {Foodcategory.length === 0 ? (
          <div className="text-gray-500">No Dishes found</div>
        ) : (
          Foodcategory.map((Fooditm, index) => (
            <div
              key={index}
              className="w-full sm:w-[240px] md:w-[260px] bg-yellow-50 rounded-xl overflow-hidden shadow hover:shadow-md transition"
            >
              <img
                src={Fooditm.img}
                alt="pic"
                className="w-full h-40 object-cover"
              />
              <div className="flex flex-col gap-2 px-4 py-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {Fooditm.foodName}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {Fooditm.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <del className="text-sm text-gray-500">
                    ${Fooditm.oldPrice}
                  </del>
                  <span className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-md">
                    ${Fooditm.newPrice}
                  </span>
                </div>
                {
                  role=="customer"? <button onClick={()=>{addtocart(Fooditm)}} className="bg-orange-400 py-1 rounded-lg text-white font-semibold cursor-pointer">Add To Cart</button>: 
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
