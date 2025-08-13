import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://restaurant-backend-3jsp.onrender.com/api/v1/orders/user-orders",
        { withCredentials: true }
      );
      setOrders(res.data.data);
    } catch (error) {
      toast.error("Error fetching orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                  <p className="font-medium">Total: ₹{order.totalPrice}</p>
                  <div className="mt-2">
                    <p className="text-sm">
                      <span className="font-medium">Type:</span> {order.orderType}
                    </p>
                    {order.orderType === "Delivery" && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Address:</span> {order.address}
                      </p>
                    )}
                    {order.orderType === "Dine-in" && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Table:</span> {order.tableNumber}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.paymentStatus === "Paid" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-700">Ordered Items:</h4>
                <div className="space-y-1">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item) => (
                      <div key={item._id} className="flex justify-between text-sm border-b pb-1">
                        <span className="text-gray-800">
                          {item.menuItem?.name || "Item not available"}
                        </span>
                        <div className="flex gap-4">
                          <span className="text-gray-600">x{item.quantity}</span>
                          <span className="text-gray-800">
                            ₹{(item.menuItem?.price || 0) * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No items details available</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <p className="text-center text-gray-500">No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;