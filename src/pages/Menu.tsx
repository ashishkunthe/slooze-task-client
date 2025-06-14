import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const URL = import.meta.env.VITE_BACKEND_URL;

interface Menu {
  name: string;
  price: number;
  restaurantId: string;
}

function Menu() {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("restaurantId");

  async function getMenuItems() {
    const response = await axios.get(`${URL}/${restaurantId}/menu`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    const { menuItems } = response.data;
    setMenu(menuItems);
  }

  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-8">
        Restaurant Menu 🍽️
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {menu.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-orange-600">
                {item.name}
              </h2>

              <p className="text-lg font-bold text-orange-500">{item.price}</p>
              <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white py-1 px-4 rounded-lg text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
