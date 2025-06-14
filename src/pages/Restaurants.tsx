import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BACKEND_URL;

const token = localStorage.getItem("token");

type Restaurant = {
  _id: string;
  name: string;
  region: string;
};

function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();

  async function getRestaurants() {
    const response = await axios.get(`${URL}/restaurants`, {
      headers: { Authorization: token },
    });
    const restaurants = response.data;
    setRestaurants(restaurants);
  }

  useEffect(() => {
    getRestaurants();
  }, []);

  function handleViewMenu(id: any) {
    navigate(`/menu?restaurantId=${id}`);
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-10">
        Explore Restaurants
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate("/orders")}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm"
        >
          View Orders
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-orange-600">
                {restaurant.name}
              </h2>
              <p className="text-gray-600">{restaurant.region}</p>
              <button
                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded-lg text-sm"
                onClick={() => handleViewMenu(restaurant._id)}
              >
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
