import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function AddRestaurant() {
  const BASE_URL = "http://localhost:8000/app";
  const token = localStorage.getItem("token");

  const [img, setImg] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [address, setaddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const coordinates = [longitude, latitude];

  const locationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
    iconSize: [30, 30],
  });

  function LocationHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLatitude(lat);
        setLongitude(lng);
      },
    });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("img", img);
    formData.append("restaurantName", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("coordinates", JSON.stringify({ type: "Point", coordinates }));

    try {
      const response = await fetch(`${BASE_URL}/addRestaurant`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Restaurant Added successfully");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center py-10 px-6 md:px-20">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-5">
          <h1 className="text-2xl font-bold">Add Restaurant</h1>
          <p className="text-sm">Enter your restaurant details below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="space-y-2">
            <label className="block font-semibold">Upload Image</label>
            <input
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Restaurant Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setname(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Description</label>
              <input
                type="text"
                placeholder="Enter Description"
                onChange={(e) => setdescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Address</label>
            <input
              type="text"
              placeholder="Enter full address"
              onChange={(e) => setaddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-700 font-medium">
              <MdLocationOn size={24} />
              <p>Pin Your Restaurant Location</p>
            </div>
            <p className="bg-blue-100 p-3 rounded-md text-sm">
              📍 Click on the map to set your precise location.
            </p>

            <MapContainer
              center={[33.52235, 71.4472]}
              zoom={15}
              style={{ height: "400px", width: "100%" }}
              className="rounded-md overflow-hidden shadow"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationHandler />
              {latitude && longitude && (
                <Marker position={[latitude, longitude]} icon={locationIcon} />
              )}
            </MapContainer>

            {latitude && longitude && (
              <div className="mt-2 text-sm text-gray-600">
                <p><strong>Latitude:</strong> {latitude}</p>
                <p><strong>Longitude:</strong> {longitude}</p>
              </div>
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition duration-200"
            >
              Add Restaurant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRestaurant;
