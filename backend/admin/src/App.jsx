// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import AddMenu from './pages/AddMenu';
import MenuList from './pages/MenuList';
import Orders from './pages/Orders';
import TableBooking from './pages/TableBooking';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<MenuList />} />
          <Route path="add-menu" element={<AddMenu />} />
          <Route path="menu-list" element={<MenuList />} />
          <Route path="orders" element={<Orders />} />
          <Route path='table-bookings' element={<TableBooking/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;