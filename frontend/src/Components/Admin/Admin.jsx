import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const Admin = () => {
  return (
    <div className="flex h-screen bg-gray-50">
        <AdminSidebar/>
      <div className="flex flex-col flex-1">
        {/* <AdminHeader/> */}
        <main className="p-6 bg-orange-50/20 flex-1 overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
