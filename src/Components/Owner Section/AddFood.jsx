import { useState,useEffect } from "react"

function AddFood() {
  const BASE_URL = "http://localhost:8000/app";
  
        const token=localStorage.getItem('token')
        const [resdata,setResdata]=useState([])
    console.log(resdata)
        // const navigate=useNavigate()
  
        const getOwnerRes = async () => {
  
      try {
        const response = await fetch(`${BASE_URL}/getRestaurant`, {
          method: "GET",
          headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
        },
        });
  
  
        const responsedata = await response.json();
  
        if (response.ok) {
          setResdata(responsedata.restaurants);
        } else {
          alert(responsedata.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    useEffect(()=>{
      getOwnerRes()
    },[])

  const [img, setImg] = useState(null);
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [restaurantId, setRestaurantId] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!img) {
      alert("Please upload an image.");
      return;
    }
    if (!restaurantId) {
      alert("Please select a restaurant.");
      return;
    }

    const formData = new FormData();
    formData.append("img", img);
    formData.append("foodName", foodName);
    formData.append("description", description);
    formData.append("oldPrice", oldPrice);
    formData.append("newPrice", newPrice);
    formData.append("restaurantId", restaurantId);

    try {
      const response = await fetch(`${BASE_URL}/addFood`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Food item added successfully!");
        // Reset form fields
        setImg(null);
        setFoodName("");
        setDescription("");
        setOldPrice("");
        setNewPrice("");
        setRestaurantId("");
      } else {
        alert(data.error || "Failed to add food item.");
      }
    } catch (error) {
      console.error("Error uploading food item:", error);
      alert("Error uploading food item.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-5">
          <h1 className="text-2xl font-bold">Add Food Item</h1>
          <p className="text-sm">Enter your food item details below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block font-semibold">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Food Name</label>
            <input
              type="text"
              placeholder="Enter Food Name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Select Restaurant</label>
            <select
              value={restaurantId}
              onChange={(e) => setRestaurantId(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select Restaurant --</option>
              {resdata.map((rest,index) => (
                <option key={index} value={rest._id}>
                  {rest.restaurantName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Old Price</label>
              <input
                type="number"
                placeholder="Enter Old Price"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">New Price</label>
              <input
                type="number"
                placeholder="Enter New Price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition duration-200"
            >
              Add Food Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFood;

