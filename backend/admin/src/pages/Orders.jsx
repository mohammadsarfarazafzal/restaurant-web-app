// pages/Orders.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/orders/all');
      setOrders(res.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.post('http://localhost:8000/api/v1/orders/update-status', {
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
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Orders</h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-bold">Order #{order._id}</h3>
                <p className="text-sm text-gray-600">
                  Customer: {order.user?.fullname} ({order.user?.phoneNumber})
                </p>
              </div>
              <span className={`px-2 py-1 rounded ${
                order.orderStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                order.orderStatus === 'Processing' ? 'bg-blue-100 text-blue-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {order.orderStatus}
              </span>
            </div>
            <div className="mb-2">
              <p className="text-gray-600">Type: {order.orderType}</p>
              {order.address && <p className="text-gray-600">Address: {order.address}</p>}
              {order.tableNumber && <p className="text-gray-600">Table: {order.tableNumber}</p>}
            </div>
            <p className="text-orange-600 font-bold mt-2">Total: ₹{order.totalPrice}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => updateStatus(order._id, 'Processing')}
                className="bg-orange-100 text-orange-600 px-3 py-1 rounded"
              >
                Mark Processing
              </button>
              <button
                onClick={() => updateStatus(order._id, 'Completed')}
                className="bg-green-100 text-green-600 px-3 py-1 rounded"
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

export default Orders;