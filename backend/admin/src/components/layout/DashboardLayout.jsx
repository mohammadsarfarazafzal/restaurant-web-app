// components/layout/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
        <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 bg-orange-50/20 flex-1 overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
