import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({});
  const [orderType, setOrderType] = useState("Delivery");
  const [address, setAddress] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const notify = (cond, message) => {
    if (cond) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/cart/all", {
        withCredentials: true,
      });
      if (res.data.success) {
        setCartItems(res.data.data.cartItems);
        setCartData(res.data.data.cartData);
      }
    } catch (error) {
      console.log(error?.message || "Error fetching cart items");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/cart/delete",
        { itemId: id },
        { withCredentials: true }
      );
      fetchCart();
    } catch (error) {
      console.log(error?.message || "Error deleting cart item");
    }
  };

  const addToCart = async (id) => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/cart/add",
        { itemId: id },
        { withCredentials: true }
      );
      fetchCart();
    } catch (error) {
      console.log(error?.message || "Error adding to cart");
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/cart/remove",
        { itemId: id },
        { withCredentials: true }
      );
      fetchCart();
    } catch (error) {
      console.log(error?.message || "Error removing from cart");
    }
  };

  const validateOrder = () => {
    if (orderType === "Delivery") {
      if (!address || address.trim().length < 10) {
        notify(
          false,
          "Please enter a valid delivery address (at least 10 characters)."
        );
        return false;
      }
    } else if (orderType === "Dine-in") {
      if (!tableNumber || isNaN(tableNumber) || Number(tableNumber) < 1) {
        notify(
          false,
          "Please enter a valid table number (must be a positive number)."
        );
        return false;
      }
    }
    return true;
  };

  const handleOrder = async () => {
    if (!validateOrder()) return;
    setLoading(true);
    try {
      const total = cartItems.reduce(
        (acc, item) => acc + item.price * (cartData[item._id] || 0),
        0
      );

      const razorpayRes = await axios.post(
        "http://localhost:8000/api/v1/orders/razorpay-order",
        { amount: total },
        { withCredentials: true }
      );

      const razorpayOrder = razorpayRes.data.data;

      const options = {
        key: "rzp_test_qDAV8sCeGjU7AR",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Spicy Touch",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          const orderData = {
            totalPrice: total,
            orderType: orderType,
            items: cartItems.map((item) => ({
              item: item._id,
              quantity: cartData[item._id],
            })),
            ...(orderType === "Delivery" ? { address } : { tableNumber }),
            paymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          };

          const res = await axios.post(
            "http://localhost:8000/api/v1/orders/create",
            orderData,
            { withCredentials: true }
          );

          if (res.data.success) {
            notify(true, "Order placed successfully!");
            setTimeout(() => {
              navigate("/orders");
            }, 3000);
          }
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("Error placing order");
      notify(false, "Error Placing Order");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="rounded-lg shadow-xl p-8 min-h-80 max-w-3xl mx-auto my-8">
      <h1 className="text-3xl font-extrabold text-orange-700 mb-8 text-center tracking-tight">
        Your Cart
      </h1>
      <div className="grid gap-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="border border-orange-200 bg-white p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg border border-orange-100"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg text-orange-700">{item.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-orange-600 font-semibold">
                    ₹{item.price}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      item.isVeg
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.isVeg ? "Veg" : "Non-Veg"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="text-sm text-gray-700 font-semibold">
                    {cartData[item._id]}
                  </span>
                  <button
                    onClick={() => addToCart(item._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 mt-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg py-8">
            Your Cart is Empty
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <>
          <div className="mt-6 bg-white rounded-lg p-4 shadow flex flex-col gap-2">
            {cartItems.map((item) =>
              cartData[item._id] > 0 ? (
                <div key={item._id} className="flex justify-between">
                  <div>{item.name}</div>
                  <div>
                    ₹{item.price} x {cartData[item._id]} = ₹
                    {item.price * cartData[item._id]}
                  </div>
                </div>
              ) : null
            )}
            <div className="flex justify-between font-bold border-t pt-2 mt-2">
              <div>Total</div>
              <div>
                ₹
                {cartItems.reduce(
                  (acc, item) => acc + item.price * (cartData[item._id] || 0),
                  0
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-4 bg-white rounded-lg p-4 shadow">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Order Type
              </label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="Delivery">Delivery</option>
                <option value="Dine-in">Dine-in</option>
              </select>
            </div>
            {orderType === "Delivery" ? (
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Delivery Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  rows="3"
                  required
                  placeholder="Enter your full delivery address"
                />
              </div>
            ) : (
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Table Number
                </label>
                <input
                  type="number"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                  min={1}
                  placeholder="Enter your table number"
                />
              </div>
            )}
            <button
              onClick={handleOrder}
              className={`w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-bold text-lg shadow flex items-center justify-center ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : (
                "Place Order"
              )}
            </button>
            <ToastContainer />
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
