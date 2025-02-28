import { useEffect, useState } from 'react';
import axios from 'axios';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/menu/list');
        if (res.data.success) {
          setMenuItems(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    fetchMenu();
  }, []);

  const handleDelete = async (id) => {
    try {
        await axios.post(`http://localhost:8000/api/v1/menu/remove`, {
            id: id
          });
      setMenuItems(menuItems.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  };

  // Function to format category names
  const formatCategory = (category) => {
    return category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Menu List</h1>
      <div className="grid gap-4">
        {menuItems.map((item) => (
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
                  {formatCategory(item.category)}
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
        ))}
      </div>
    </div>
  );
};

export default MenuList;