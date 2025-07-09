import { useState } from 'react';
import axios from 'axios';

const AddMenu = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isVeg: false,
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post('http://localhost:8000/api/v1/menu/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Menu added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        isVeg: false,
        image: null,
      });
    } catch (error) {
      alert('Error adding menu');
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Add New Menu</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4">
          {/* Menu Name */}
          <div>
            <label className="block text-gray-700 mb-2">Menu Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Menu Description */}
          <div>
            <label className="block text-gray-700 mb-2">Menu Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded h-24 resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              
            />
          </div>

          {/* Menu Price */}
          <div>
            <label className="block text-gray-700 mb-2">Menu Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Menu Category */}
          <div>
            <label className="block text-gray-700 mb-2">Menu Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
                <option value="">Select</option>
              <option value="starter">Starter</option>
              <option value="mainCourse">Main Course</option>
              <option value="desert">Desert</option>
              <option value="dinner">Dinner</option>
              <option value="lunch">Lunch</option>
            </select>
          </div>

          {/* Veg/Non-Veg */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isVeg}
              onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
              className="w-4 h-4 text-orange-600 border rounded focus:ring-orange-500"
              id="isVeg"
            />
            <label htmlFor="isVeg" className="text-gray-700">
              Vegetarian
            </label>
          </div>

          {/* Menu Image */}
          <div>
            <label className="block text-gray-700 mb-2">Menu Image</label>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              accept="image/*"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors w-full font-semibold"
        >
          Add Menu
        </button>
      </form>
    </div>
  );
};

export default AddMenu;