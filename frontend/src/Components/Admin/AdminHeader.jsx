const AdminHeader = ({ }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">

        <h1 className="ml-4 text-lg font-medium text-gray-800">
          Restaurant Admin Panel
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative text-gray-600 hover:text-orange-500 focus:outline-none">
          🔔
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-orange-500"></span>
        </button>

        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
            A
          </div>
          <span className="ml-2 text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
