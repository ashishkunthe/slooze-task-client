import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BACKEND_URL;

interface Order {
  _id: string;
  userId: string;
  items: { menuItemId: string; quantity: number }[];
  status: "created" | "placed" | "cancelled";
  paymentMethod: string;
  region: string;
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newPayments, setNewPayments] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const [accessDenied, setAccessDenied] = useState(false);

  async function fetchOrders() {
    try {
      const res = await axios.get(`${URL}/orders`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      if (res.data?.message) {
        setAccessDenied(true);
        return;
      }

      setOrders(res.data);
    } catch (err) {
      alert("Failed to fetch orders");
    }
  }

  async function checkoutOrder(id: string) {
    try {
      await axios.patch(
        `${URL}/orders/${id}/checkout`,
        {},
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      fetchOrders();
    } catch {
      alert("Checkout failed");
    }
  }

  async function cancelOrder(id: string) {
    try {
      await axios.delete(`${URL}/orders/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      fetchOrders();
    } catch {
      alert("Cancellation failed");
    }
  }

  async function updatePayment(id: string) {
    try {
      await axios.patch(
        `${URL}/orders/${id}/payment-method`,
        {
          paymentMethod: newPayments[id],
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      fetchOrders();
    } catch {
      alert("Payment update failed");
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-600">Access Denied 🚫</h1>
          <p className="text-gray-700 mt-2">
            Only admins and managers can access this page.
          </p>
          <button
            onClick={() => navigate("/restaurants")}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
          >
            Back to Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-orange-50">
      <div className="mb-4">
        <button
          onClick={() => navigate("/restaurants")}
          className="flex items-center text-orange-600 hover:text-orange-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </button>
      </div>

      <h1 className="text-3xl font-bold text-orange-600 text-center mb-8">
        All Orders
      </h1>

      <div className="max-w-5xl mx-auto space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded-lg shadow space-y-2"
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Region:</strong> {order.region}
            </p>
            <p>
              <strong>Payment:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Items:</strong>
              <ul className="list-disc ml-5">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.menuItemId} - {item.quantity}
                  </li>
                ))}
              </ul>
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {order.status === "created" && (
                <button
                  onClick={() => checkoutOrder(order._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Checkout
                </button>
              )}

              {order.status !== "cancelled" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              )}

              <select
                value={newPayments[order._id] || ""}
                onChange={(e) =>
                  setNewPayments((prev) => ({
                    ...prev,
                    [order._id]: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded text-gray-700"
              >
                <option value="">Select method</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
              </select>

              <button
                onClick={() => updatePayment(order._id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                Update Payment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
