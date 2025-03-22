import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState({});

  const showCart = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/cart/all", {
        withCredentials: true,
      });
      if (res.data.success) {
        setCartItems(res.data.data);
      }
      console.log(cartItems);
      
    } catch (error) {
      console.log(error?.message || "Error fetching cart items");
    }
  };

  useEffect(() => {
    showCart();
  }, []);

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-6">Your Cart</h1>
        <div className="grid gap-4">
        </div>
      </div>
    </div>
  );
}

export default Cart;
