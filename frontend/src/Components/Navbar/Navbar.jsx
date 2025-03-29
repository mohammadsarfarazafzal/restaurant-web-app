import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../StateManagement/Cart_Management/Features/authSlice.js";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  TableCellsIcon,
  LifebuoyIcon,
  PowerIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";



// profile menu component
const profileMenuItems = [
  {
    label: "Cart",
    icon: ShoppingCartIcon,
    path: "/cart"
  },
  {
    label: "Orders",
    icon: ShoppingBagIcon,
    path: "/orders"
  },
  {
    label: "Tables",
    icon: TableCellsIcon,
    path: "/BookedTable"
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    path: "/help"
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function Navbar() {
  const dispatch = useDispatch();
  const token = useSelector((state)=>state.auth.token)

  const [isMenuClicked, setMenuClicked] = useState(false);
  const navigate=useNavigate();

  const handleMenuClicked = () => {
    setMenuClicked(!isMenuClicked);
  };
  const handleMenuItemsClicked=()=>{
    setMenuClicked(!isMenuClicked);
  }
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  //const closeMenu = () => setIsMenuOpen(false);

  // const [cartItems, setCartItems] = useState([]);
  // const fetchCart = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8000/api/v1/cart/all", {
  //       withCredentials: true,
  //     });
  //     if (res.data.success) {
  //       setCartItems(res.data.data.cartItems);
  //     }
  //   } catch (error) {
  //     console.log(error?.message || "Error fetching cart items");
  //   }
  // };

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
    // fetchCart();
  },[]);

  return (
    <nav className="bg-gray-900 text-white flex justify-between items-center px-8 py-4 shadow-lg">
      {/* Logo */}
      <div className="flex flex-col items-center relative">
        <h1
          className=" text-2xl md:text-3xl font-bold flex items-center bg-gradient-to-t to-orange-500 from-yellow-500 
          bg-clip-text text-transparent"
        >
          <span className="text-white">🍽️</span> Spicy Touch
        </h1>
      </div>
      {/* Menu Links */}

      <div className="flex justify-between items-center gap-8 ">
        <ul className="hidden md:flex space-x-6 font-medium">
          <Link to="/">
            <li className="hover:text-orange-500 cursor-pointer py-2">Home</li>
          </Link>
          <Link to="/about">
            <li className="hover:text-orange-500 cursor-pointer py-2">About</li>
          </Link>
          <Link to="/services">
            <li className="hover:text-orange-500 cursor-pointer py-2">
              Services
            </li>
          </Link>
          <Link to="/menu">
            <li className="hover:text-orange-500 cursor-pointer py-2">Menu</li>
          </Link>
          <Link to="/contact">
            <li className="hover:text-orange-500 cursor-pointer py-2">
              Contact us
            </li>
          </Link>
        </ul>

        {/* Table booking button */}
        <Link to="/booktable">
        <button
          className={
            "hidden md:block bg-orange-500 text-white px-4 py-2 rounded-md transform transition duration-300 hover:scale-105 hover:bg-orange-600 text:sm md:text-base"
          }
        >
          Book Table
        </button></Link>

          {
            token?(
              <>
              <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="orange"
          className="flex items-center rounded-full p-0"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="U"
            withBorder={true}
            color="orange"
            className=" p-0.5"
            src="https://res.cloudinary.com/dfyvwp2dx/image/upload/v1742738713/pfp_qzlpbm.jpg"
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={()=>{isLastItem?logOutUser():navigate(path)}}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : "hover:bg-orange-500 focus:bg-orange-100 active:bg-orange-100"
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : "text-orange-500"}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "orange"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
              </>
            ):(
              <div><Link to="/signup">
              <button
                className={
                  "none md:block bg-orange-500 text-white px-4 py-2 rounded-md transform transition duration-300 hover:scale-105 hover:bg-orange-600 text:sm md:text-base"
                }
              >
                Sign Up
              </button></Link></div>
            )
          }

      </div>

      {/*MENU BUTTON FOR MOBILE */}
      <div className="md:hidden">
        <button
          onClick={handleMenuClicked}
          className={`rounded-md p-2 ${
            isMenuClicked ? "bg-white" : "bg-orange-500"
          }`}
        >
          <svg
            className="h-1/2 w-8"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 50 50"
          >
            <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
          </svg>
        </button>
      </div>
      {/* Dropdown menu for mobile view */}
      <div
        className={`md:hidden ${
          isMenuClicked
            ? "block opacity-100 translate-y-0"
            : "hidden opacity-0 translate-y-4"
        } absolute top-16 right-0 w-1/2 bg-gray-300 text-gray-800 p-4 rounded-sm mt-4 font-medium
            z-50 transition-all duration-300 ease-in-out `}
      >
        <ul>
          <Link to="/" onClick={handleMenuClicked}>
            <li className="hover:text-orange-500 cursor-pointer py-2">Home</li>
          </Link>
          <Link to="/about" onClick={handleMenuClicked}>
            <li className="hover:text-orange-500 cursor-pointer py-2">About</li>
          </Link>
          <Link to="/services" onClick={handleMenuClicked}>
            <li className="hover:text-orange-500 cursor-pointer py-2">
              Service
            </li>
          </Link>
          <Link to="/menu" onClick={handleMenuClicked}>
            <li className="hover:text-orange-500 cursor-pointer py-2">Menu</li>
          </Link>
          <Link to="/contact" onClick={handleMenuClicked}>
            <li className="hover:text-orange-500 cursor-pointer py-2">
              Contact us
            </li>
          </Link>
        </ul>
        {/*Table booking button*/}
        <Link to='/booktable' onClick={handleMenuItemsClicked}>
        <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md transform transition duration-300 hover:scale-105 hover:bg-orange-600">
          Book Table
        </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
