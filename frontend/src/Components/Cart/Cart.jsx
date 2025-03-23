import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({});

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
      console.log(res);
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
      console.log(res);
    } catch (error) {
      console.log(error?.message || "Error removing from cart");
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
              <div>{item.name}</div>
              <div>
                ₹{item.price} x {cartData[item._id]} = ₹
                {item.price * cartData[item._id]}
              </div>
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
      {
        cartItems.length > 0 ? (<>
          <div className="px-4 py-1 flex justify-end">
              <div onClick={() => {
                    alert("Thank You!")
                  }} className="cursor-pointer bg-green-500 rounded-lg text-white font-semibold w-40 h-8 flex justify-center items-center transition-transform hover:bg-green-600 scale-105">
                  Continue
              </div>
            </div>
        </>):(<></>)
      }
    </div>
  );
}

export default Cart;
