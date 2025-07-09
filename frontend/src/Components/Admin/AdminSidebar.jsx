// components/layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const { pathname } = useLocation();
  
  const menuItems = [
    { name: 'Add Menu', path: '/admin/add-menu' },
    { name: 'Menu List', path: '/admin/menu-list' },
    { name: 'Orders', path: '/admin/orders' },
    {name:'Table Bookings',path:'/admin/table-bookings'}
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-orange-600">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-6 py-3 ${
              pathname === item.path
                ? 'bg-orange-100 text-orange-600'
                : 'text-gray-600 hover:bg-orange-50'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;