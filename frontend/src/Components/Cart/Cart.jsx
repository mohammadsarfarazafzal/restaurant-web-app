import React, { useEffect, useState } from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify"
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({});
  const [orderType, setOrderType] = useState("Delivery");
  const [address, setAddress] = useState("");
  const [tableNumber, setTableNumber] = useState("");


  const navigate = useNavigate();
  const notify = (cond, message) => {
      if(cond){
        toast.success(message)
      }
      else{
        toast.error(message)
      }
    }

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
      const res = await axios.post(
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
      const res = await axios.post(
        "http://localhost:8000/api/v1/cart/add",
        {
          itemId: id,
        },
        { withCredentials: true }
      );
      fetchCart();
    } catch (error) {
      console.log(error?.message || "Error adding to cart");
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/cart/remove",
        {
          itemId: id,
        },
        { withCredentials: true }
      );
      fetchCart();
    } catch (error) {
      console.log(error?.message || "Error removing from cart");
    }
  };

  const handleOrder = async () => {
    try {
      const total = cartItems.reduce(
        (acc, item) => acc + item.price * (cartData[item._id] || 0),
        0
      );

      const orderData = {
        totalPrice: total,
        orderType: orderType,
        items: cartItems.map((item) => ({
          item: item._id,
          quantity: cartData[item._id],
        })),
        ...(orderType === "Delivery" ? { address } : { tableNumber }),
      };

      const res = await axios.post(
        "http://localhost:8000/api/v1/orders/create",
        orderData,
        { withCredentials: true }
      );

      if (res.data.success) {
        notify(true,"Order placed successfully!");
        setTimeout(()=>{navigate("/orders")},3000)
      }
    } catch (error) {
      console.log("Error placing order");
      notify(false, "Error Placing Order")
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 min-h-80">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Your Cart</h1>
      <div className="grid gap-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              {/* Left Section - Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              {/* Middle Section - Details */}
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
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

              {/* Right Section - Delete Button */}
              <button
                onClick={() => {
                  removeFromCart(item._id);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 self-end sm:self-auto"
              >
                -
              </button>
              <span className="text-sm text-gray-500">
                Count: {cartData[item._id]}
              </span>
              <button
                onClick={() => {
                  addToCart(item._id);
                }}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-red-600 self-end sm:self-auto"
              >
                +
              </button>
              <button
                onClick={() => {
                  handleDelete(item._id);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 self-end sm:self-auto"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div>Your Cart is Empty</div>
        )}
      </div>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item, index) => (
            <div key={item._id} className="px-4 py-1 flex justify-between">
              {cartData[item._id] > 0 ? (
                <>
                  <div>{item.name}</div>
                  <div>
                    ₹{item.price} x {cartData[item._id]} = ₹
                    {item.price * cartData[item._id]}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}

          {/* Display the total */}
          <div className="px-4 py-1 flex justify-between font-bold">
            <div>Total</div>
            <div>
              ₹
              {cartItems.reduce(
                (acc, item) => acc + item.price * (cartData[item._id] || 0),
                0
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {cartItems.length > 0 && (
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Order Type
            </label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full p-2 border rounded"
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
                className="w-full p-2 border rounded"
                rows="3"
                required
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
                className="w-full p-2 border rounded"
                required
              />
            </div>
          )}

          <button
            onClick={handleOrder}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Place Order (Cash on Delivery)
          </button>
          <ToastContainer/>
        </div>
      )}
    </div>
  );
}

export default Cart;
