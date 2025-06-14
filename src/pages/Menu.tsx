import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const URL = import.meta.env.VITE_BACKEND_URL;

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  restaurantId: string;
}

interface OrderItem {
  menuItemId: string;
  quantity: number;
}

function Menu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("restaurantId");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  async function getMenuItems() {
    const response = await axios.get(
      `${URL}/restaurants/${restaurantId}/menu`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    const { menuItems } = response.data;
    setMenu(menuItems);
  }

  useEffect(() => {
    getMenuItems();
  }, []);

  function handleAddToCart(menuItemId: string) {
    const quantity = quantities[menuItemId] || 1;

    setOrderItems((prev) => {
      const existing = prev.find((item) => item.menuItemId === menuItemId);
      if (existing) {
        return prev.map((item) =>
          item.menuItemId === menuItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { menuItemId, quantity }];
    });

    setQuantities((prev) => ({ ...prev, [menuItemId]: 1 })); // reset
  }

  async function handlePlaceOrder() {
    try {
      const response = await axios.post(
        `${URL}/orders`,
        {
          paymentMethod: paymentMethod,
          items: orderItems,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      alert("Order placed!");
      setOrderItems([]);
    } catch (err) {
      console.error("Order failed", err);
      alert("Order failed");
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-8">
        Restaurant Menu 🍽️
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {menu.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-orange-600">
                {item.name}
              </h2>
              <p className="text-lg font-bold text-orange-500">₹{item.price}</p>

              <input
                type="number"
                min="1"
                value={quantities[item._id] || 1}
                onChange={(e) =>
                  setQuantities((prev) => ({
                    ...prev,
                    [item._id]: parseInt(e.target.value),
                  }))
                }
                className="w-16 border rounded px-2 py-1"
              />

              <button
                className="ml-2 bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded-lg text-sm"
                onClick={() => handleAddToCart(item._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {orderItems.length > 0 && (
        <div className="text-center mt-10">
          <div className="text-center mt-10 space-y-4">
            <label className="block text-lg font-medium text-orange-700">
              Select Payment Method:
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border px-4 py-2 rounded-md text-gray-700"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;
