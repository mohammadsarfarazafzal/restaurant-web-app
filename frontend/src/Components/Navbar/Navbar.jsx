import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../StateManagement/Cart_Management/Features/authSlice.js";
import {
  ShoppingBagIcon,
  TableCellsIcon,
  LifebuoyIcon,
  PowerIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const profileMenuItems = [
  { label: "Cart", icon: ShoppingCartIcon, path: "/cart" },
  { label: "Orders", icon: ShoppingBagIcon, path: "/orders" },
  { label: "Tables", icon: TableCellsIcon, path: "/BookedTable" },
  { label: "Help", icon: LifebuoyIcon, path: "/help" },
  { label: "Sign Out", icon: PowerIcon },
];

function Navbar() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Menu", path: "/menu" },
    { name: "Contact", path: "/contact" },
  ];

  const authentication = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/auth",{},{withCredentials:true});
      
      if(res.data.success){
        dispatch(setToken(true));
      }
    } catch (error) {
      console.log(error.message || error);
      dispatch(setToken(false));
    }
  }

  const logOutUser = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/logout",{},{withCredentials:true})
      if(res.data.success){
            dispatch(setToken(false));
            navigate("/SignUp");
            }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    authentication();
  },[]);

  return (
    <nav className="bg-gray-900 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              <span className="text-white">🍽️</span> Spicy Touch
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/booktable"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Book Table
            </Link>
          </div>
          {/* Auth Section */}
          <div className="flex gap-3">
          <div className="flex items-center space-x-4">
            {token ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <UserCircleIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                </button>

                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {profileMenuItems.map(({ label, icon: Icon, path }, index) => (
                        <button
                          key={label}
                          onClick={() => {
                            if (index === profileMenuItems.length - 1) {
                              logOutUser();
                            } else {
                              navigate(path);
                            }
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                        >
                          <Icon className="h-5 w-5 mr-2 text-orange-600" />
                          <span className={index === profileMenuItems.length - 1 ? "text-red-600" : ""}>
                            {label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signup"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-orange-600"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 text-gray-700 hover:bg-orange-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/booktable"
              className="block px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Table
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;