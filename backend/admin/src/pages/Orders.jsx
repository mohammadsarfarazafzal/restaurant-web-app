// pages/Orders.jsx
import { useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  
  // Temporary data until backend is ready
  const tempOrders = [
    { id: 1, items: 'Pizza, Coke', total: 500, status: 'pending' },
  ];

  const updateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Orders</h1>
      <div className="grid gap-4">
        {tempOrders.map((order) => (
          <div key={order.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Order #{order.id}</h3>
              <span className={`px-2 py-1 rounded ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'outForDelivery' ? 'bg-blue-100 text-blue-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {order.status}
              </span>
            </div>
            <p className="text-gray-600">{order.items}</p>
            <p className="text-orange-600 font-bold mt-2">Total: ₹{order.total}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => updateStatus(order.id, 'underProcess')}
                className="bg-orange-100 text-orange-600 px-3 py-1 rounded"
              >
                Under Process
              </button>
              <button
                onClick={() => updateStatus(order.id, 'outForDelivery')}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded"
              >
                Out for Delivery
              </button>
              <button
                onClick={() => updateStatus(order.id, 'delivered')}
                className="bg-green-100 text-green-600 px-3 py-1 rounded"
              >
                Delivered
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;