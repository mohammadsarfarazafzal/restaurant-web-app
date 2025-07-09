// pages/Orders.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('https://restaurant-backend-3jsp.onrender.com/api/v1/orders/all');
      setOrders(res.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.post('https://restaurant-backend-3jsp.onrender.com/api/v1/orders/update-status', {
        orderId,
        orderStatus: newStatus
      });
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow sm:p-6 max-w-4xl mx-auto mt-4">
      <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center">Orders</h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                <div>
                  <h3 className="font-bold break-all">Order #{order._id}</h3>
                  <p className="text-sm text-gray-600">
                    Customer: {order.user?.fullname} ({order.user?.phoneNumber})
                  </p>
                  <p className="text-xs text-gray-400">
                    Placed: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs sm:text-sm ${
                  order.orderStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                  order.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {order.orderStatus}
                </span>
              </div>
              <div className="mb-2 space-y-1">
                <p className="text-gray-600">Type: {order.orderType}</p>
                {order.address && <p className="text-gray-600 break-words">Address: {order.address}</p>}
                {order.tableNumber && <p className="text-gray-600">Table: {order.tableNumber}</p>}
                <p className="text-gray-600">
                  Payment: <span className={`font-semibold ${order.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}`}>{order.paymentStatus}</span>
                </p>
                {order.paymentId && (
                  <p className="text-gray-500 text-xs break-all">Payment ID: {order.paymentId}</p>
                )}
                {order.razorpayOrderId && (
                  <p className="text-gray-500 text-xs break-all">Razorpay Order: {order.razorpayOrderId}</p>
                )}
              </div>
              <p className="text-orange-600 font-bold mt-2">Total: ₹{order.totalPrice}</p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                disabled={ order.orderStatus === 'Processing' ||
                  order.orderStatus === 'Completed'}
                onClick={() => updateStatus(order._id, 'Processing')}
                className="bg-orange-100 disabled:opacity-60 disabled:cursor-not-allowed text-orange-600 px-3 py-1 rounded"
              >
                Mark Processing
              </button>
              <button
                disabled={order.orderStatus === 'Completed'}
                onClick={() => updateStatus(order._id, 'Completed')}
                className="bg-green-100 disabled:opacity-60 disabled:cursor-not-allowed text-green-600 px-3 py-1 rounded"
              >
                Mark Completed
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;