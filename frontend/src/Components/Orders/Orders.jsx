import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/orders/user-orders",
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
      case "Pending": return "bg-orange-100 text-orange-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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
                  <p className="text-sm">Type: {order.orderType}</p>
                  {order.address && (
                    <p className="text-sm text-gray-600">Address: {order.address}</p>
                  )}
                  {order.tableNumber && (
                    <p className="text-sm text-gray-600">Table: {order.tableNumber}</p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
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