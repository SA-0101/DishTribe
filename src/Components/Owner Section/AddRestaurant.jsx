import { useState } from "react";
import { MdPerson } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { HiLightningBolt } from "react-icons/hi";
import { MapContainer, TileLayer,Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function AddRestaurant() {

    const BASE_URL="http://localhost:8000/app"

    const token=localStorage.getItem('token')
    const [img,setImg]=useState("")
    const [name,setname]=useState("")
    const [description,setdescription]=useState("")
    const [address,setaddress]=useState("")
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const coordinates=[longitude,latitude]
    console.log(coordinates)

    // ✅ Custom red icon (you can change icon here)
    const locationIcon = new L.Icon({
         iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
          iconSize: [30, 30],
            });

    // Component to capture click and update states
   function LocationHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLatitude(lat);
        setLongitude(lng);
        console.log("Latitude:", lat, "Longitude:", lng);
      },
    });

    return null;
  }

  const [form, setForm] = useState({
    restaurantName: "",
    description: "",
    address: "",
    img: null,
  });

const handleSubmit = async (e) => {
    e.preventDefault();

  const formData = new FormData();

            formData.append("img", img);
            formData.append("restaurantName", name);
            formData.append("description", description);
            formData.append("address", address);
            formData.append(
  "coordinates",
  JSON.stringify({ type: "Point", coordinates })
);


    try {
      const response = await fetch(`${BASE_URL}/addRestaurant`, {
        method: "POST",
        headers: {
    Authorization: `Bearer ${token}`,
      },
        body: formData,
      });

      const data = await response.json();
      
      if(response.ok){
        alert("Restaurent Added successfully")
        setForm({ restaurantName: "", description: "", address: "", img: null });
        console.log(data);
      }
      else{
        alert(data.error)
      }
     
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className='w-full flex flex-col gap-4 px-[100px] py-[20px] justify-center items-center'>

            <div className='w-full flex flex-col rounded-lg'>
              
              <div className="bg-blue-500 px-5 py-3 rounded-tr-lg rounded-tl-lg">
                <h1 className='text-2xl font-semibold'>Add Restaurant</h1>
                <h1>Update your profile information and preferences</h1>
              </div>

              <form action="" onSubmit={handleSubmit} className="w-full flex flex-col px-5 py-5 gap-10 bg-white">
                <div className="w-full flex flex-col gap-8 py-2">
                  <div className="flex flex-col justify-center items-center">
                    <input type="file" name="" id="" onChange={(e) => setImg(e.target.files[0])}/>
                    <label htmlFor="">Select Image From here</label>
                  </div>
             {/* Div for input fields only */}     
             <div className="w-full flex flex-col gap-3">


                <div className="w-full flex gap-5">

                  <div className="w-full flex flex-col gap-1">
                    <label htmlFor="name" className="font-semibold">Restaurent Name</label>
                    <input className="outline-0 border border-black bg-blue-50 rounded-sm px-2 py-2" id="name" type="text" placeholder="Enter Name" onChange={(e)=>{setname(e.target.value)}}/>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <label htmlFor="name" className="font-semibold">Restaurent Description</label>
                    <input className="outline-0 border border-black bg-blue-50 rounded-sm px-2 py-2" id="name" type="text" placeholder="Enter Description" onChange={(e)=>{setdescription(e.target.value)}}/>
                  </div>

                </div>

                {/* <div className="w-full flex gap-5">

                  <div className="w-full flex flex-col gap-1">
                    <label htmlFor="name" className="font-semibold">Contact Number</label>
                    <input className="outline-0 border border-black bg-blue-50 rounded-sm px-2 py-2" id="name" type="number" placeholder="Enter Your Contact Number" onChange={(e)=>{setTeachercontact(e.target.value)}}/>
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <label htmlFor="name" className="font-semibold">Experiance (Years)</label>
                    <input className="outline-0 border border-black bg-blue-50 rounded-sm px-2 py-2" id="name" type="number" placeholder="Enter Your Experiance" onChange={(e)=>{setTeacherexperiance(e.target.value)}}/>
                  </div>

                </div> */}

                {/* <div className="w-full flex gap-5">

                  <div className="w-full flex flex-col gap-1">
                    <label htmlFor="name" className="font-semibold">Degree/Qualification</label>
                    <input className="outline-0 border border-black bg-blue-50 rounded-sm px-2 py-2" id="name" type="text" placeholder="Enter Your Last Degree" onChange={(e)=>{setLastdegree(e.target.value)}}/>
                  </div>

                </div> */}

            <div className="w-full flex gap-5">

                  <div className="w-full flex flex-col gap-1">
                    <label htmlFor="name" className="font-semibold">Restaurent Address</label>
                    <input className="outline-0 border border-black bg-blue-50 rounded-sm px-2 py-2" id="name" type="text" placeholder="Enter full address" onChange={(e)=>{setaddress(e.target.value)}}/>
            </div>

                </div>

                  </div>
                </div>

                <div className="flex flex-col gap-4">
                      <div className="flex gap-2">
                        <MdLocationOn size={24} color="red" />
                        <h1>Pin Your Restaurent Location</h1>
                      </div>

                      <div className="outline-0 border bg-blue-50 rounded-sm px-2 py-2">
                        <h1>📍  Click on the map to set your precise location. This helps students find you easily.</h1>
                      </div>

                      {/* Map for Storing coordinates of Teachers */}

                      <div>
                    <h2>Click on map to save your location</h2>

                    <MapContainer
                      center={[ 33.52235, 71.44720]}
                      zoom={15}
                      style={{ height: "400px", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationHandler />

                      {latitude && longitude && (
                        <Marker
                          position={[latitude, longitude]}
                          icon={locationIcon}
                        />
                      )}
                    </MapContainer>

                    {latitude && longitude && (
                      <div className="mt-4">
                        <p><strong>Latitude:</strong> {latitude}</p>
                        <p><strong>Longitude:</strong> {longitude}</p>
                      </div>
                    )}
                  </div>

                      
                </div>

                <button className="bg-blue-500 py-2 rounded-lg text-white font-semibold" >Add Restaurent</button>
              </form>

            </div>
    </div>
  )
}

export default AddRestaurant
