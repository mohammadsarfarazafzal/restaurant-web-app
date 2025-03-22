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

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-6">Your Cart</h1>
        <div className="grid gap-4">
        {
            cartItems.map((item) => (
              <div key={item._id} className="border p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                    <span className="text-orange-600 font-semibold">₹{item.price}</span>
                    <span className="text-sm text-gray-500">
                      {cartData[item._id]}
                    </span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>
                </div>
    
                {/* Right Section - Delete Button */}
                <button
                  onClick={() => {
                    console.log(item._id)
                    handleDelete(item._id)
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 self-end sm:self-auto"
                >
                  Delete
                </button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Cart;
