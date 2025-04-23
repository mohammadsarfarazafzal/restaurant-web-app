// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";

// function Menu() {
//   const [searchedItems, setSearchedItems] = useState("");
//   const [dropDown, setDropDown] = useState("all");
//   const [checkOutButton, setcheckOutButton] = useState(false);
//   const [dishes, setDishes] = useState([]);
//   const notify = (message) => {toast.success(message)}
//   const navigate = useNavigate();

//   const handleAddToCart = async (item) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/v1/cart/add",
//         {
//           itemId: item,
//         },
//         { withCredentials: true }
//       );
//       notify("Item Added to Cart. Go to Cart.")
//       setcheckOutButton(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchMenu = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/v1/menu/list");
//       if (res.data.success) {
//         setDishes(res.data.data);
//       }
//     } catch (error) {
//       alert("Error while fetching menu.");
//     }
//   };

//   const filterDishes = dishes.filter((dish) => {
//     const searchMatches = dish.name
//       .toLowerCase()
//       .includes(searchedItems.toLowerCase());
//     function checkVeg() {
//       return dropDown === "veg" ? true : false;
//     }
//     const filterMatches = dropDown === "all" || dish.isVeg === checkVeg();

//     return searchMatches && filterMatches;
//   });

//   const handleSearch = () => {
//     console.log(dishes);
//   };

//   useEffect(() => {
//     fetchMenu();
//   }, []);
//   return (
//     <div className="bg-gray-100">
//       {/* Header */}
//       <header
//         className="relative bg-cover bg-center h-64 flex items-center justify-center text-white"
//         style={{ backgroundImage: "url('/Images/menu_bg.jpg')" }}
//       >
//         <div className="bg-black bg-opacity-50 p-4 rounded-md text-center">
//           <h1 className="text-3xl md:text-4xl font-bold">Our items</h1>
//         </div>
//       </header>

//       <section className="mx-auto px-4 sm:px-8 py-8">
//         {/* Search Box */}
//         <div className="mb-4 flex items-center border border-orange-500 rounded-md overflow-hidden">
//           <input
//             type="text"
//             placeholder="Search for a dish.."
//             value={searchedItems}
//             onChange={(e) => setSearchedItems(e.target.value)}
//             className="w-full p-3  outline-none"
//           />
//           {/* search icon */}
//           <button onClick={handleSearch} className=" p-1 text-white">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               x="0px"
//               y="0px"
//               width="25"
//               height="40"
//               viewBox="0 0 50 50"
//             >
//               <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
//             </svg>
//           </button>
//         </div>
//         {/* Filter selection */}
//         <div className="mb-4 flex justify-between items-center">
//           <div>
//           <span className="font-medium text-gray-700">Filter By:</span>
//           <select
//             className="border border-gray-300 rounded-md p-2"
//             value={dropDown}
//             onChange={(e) => setDropDown(e.target.value)}
//           >
//             <option value="all">All</option>
//             <option value="veg">Veg</option>
//             <option value="non-veg">Non-veg</option>
//           </select>
//           </div>
//           {/* show checkout */}
//           {checkOutButton && (
//             <div className="flex items-center justify-end">
//               <div onClick={() => {
//                     navigate("/Cart");
//                   }} className="cursor-pointer p-2 mr-4 bg-green-500 mb-2 rounded-lg text-white font-semibold w-40 text-center transition-transform hover:bg-green-600 scale-105">
//                   Check Out
//               </div>
//             </div>
//           )}
//         </div>
//         {/* Menu's Section */}
//         <div className="space-y-4 md:grid  md:grid-cols-2 lg:grid-cols-3 gap-6 md:space-y-0">
//           {filterDishes.map((dish) => (
//             <div
//               key={dish._id}
//               className=" flex flex-row md:flex-col  bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
//             >
//               <img
//                 src={dish.image}
//                 alt={dish.name}
//                 className=" w-32 md:w-full md:h-60 h-45 object-cover"
//               />

//               <div className="p-4 flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-sm md:text-base font-semibold text-gray-800">
//                     {dish.name}
//                   </h3>
//                   <p className="text-sm text-gray-500 mb-2">
//                     {dish.isVeg ? "Veg 🌱" : "Non-Veg 🍗"}
//                   </p>
//                   <p className="text-sm md:text-lg font-semibold text-orange-500">
//                     {"\u20B9"}
//                     {dish.price}.00
//                   </p>
//                 </div>
//                 <button
//                   className="mt-4 w-fit p-2 bg-orange-500 text-white text-xs md:text-[1rem] rounded hover:bg-orange-600"
//                   onClick={() => handleAddToCart(dish._id)}
//                 >
//                   Add to Cart
//                 </button>

//               </div>
//             </div>
//           ))}
//           <ToastContainer onClick={() => {
//                     navigate("/Cart");
//                   }} className="cursor-pointer" />
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Menu;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { GiChickenOven, GiCorn } from "react-icons/gi";
import { FaFire, FaStar, FaRegStar, FaLeaf } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function Menu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  // Fetch menu items
  const fetchMenu = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:8000/api/v1/menu/list");
      if (res.data.success) {
        setDishes(res.data.data);
      }
    } catch (error) {
      toast.error("Error loading menu. Please refresh.");
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const handleAddToCart = async (itemId) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/cart/add",
        { itemId },
        { withCredentials: true }
      );
      if (res.data.success) {
        setCartCount((prev) => prev + 1);
        toast.success(
          <div>
            Item added to cart!{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/Cart")}
            >
              View Cart
            </span>
          </div>
        );
      }
    } catch (error) {
      toast.error("Failed to add item. Please try again.");
    }
  };

  // Filter dishes based on search and category
  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "all" ||
      (category === "veg" && dish.isVeg) ||
      (category === "non-veg" && !dish.isVeg);

    return matchesSearch && matchesCategory;
  });

  // Get cart count on load
  useEffect(() => {
    fetchMenu();
    const fetchCartCount = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/cart/count", {
          withCredentials: true,
        });
        if (res.data.success) {
          setCartCount(res.data.count);
        }
      } catch (error) {
        console.log("Couldn't fetch cart count");
      }
    };
    fetchCartCount();
  }, []);

  // text-xl text-white mb-6
  // Hero section with mouth-watering food video
  const HeroSection = () => {
    const [hover, setHover] = useState(false);
  
    return (
      <div 
      className="relative h-[450px] overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <video
        autoPlay
        loop
        muted
        className="absolute z-0 w-full h-full object-cover left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <source
          src="https://res.cloudinary.com/dx6t8sawo/video/upload/v1744282217/WhatsApp_Video_2025-04-10_at_4.18.30_PM_puyafl.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className={`text-center overflow-hidden transition-all duration-500 ease-in-out ${hover ? "max-h-44" : "max-h-0"}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Delicious Menu
          </h1>
          <div className="">
            <p className="text-xl text-white mb-6">
              Handcrafted with love and premium ingredients
            </p>
          </div>
          <button
            onClick={() =>
              document
                .getElementById("menu-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          >
            Explore Menu
          </button>
        </div>
      </div>
    </div>
    );
  };

  // Rating stars component
  const RatingStars = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400 inline" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400 inline" />
        )
      );
    }
    return <div>{stars}</div>;
  };

  // Special tags for dishes
  const SpecialTag = ({ label }) => (
    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
      <FaFire className="mr-1" /> {label}
    </span>
  );

  return (
    <div className="bg-gray-50">
      <HeroSection />

      <section id="menu-section" className="container mx-auto px-4 py-12">
        {/* Search and filter section */}
        <div className="mb-12 p-6 bg-white rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for your favorite dish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              />
            </div>

            <div className="flex items-center space-x-4 w-full md:w-auto">
              <button
                onClick={() => setCategory("all")}
                className={`px-4 py-2 rounded-full font-medium ${
                  category === "all"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setCategory("veg")}
                className={`px-4 py-2 rounded-full font-medium flex items-center ${
                  category === "veg"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <FaLeaf className="mr-2" /> Veg
              </button>
              <button
                onClick={() => setCategory("non-veg")}
                className={`px-4 py-2 rounded-full font-medium flex items-center ${
                  category === "non-veg"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <GiChickenOven className="mr-2" /> Non-Veg
              </button>
            </div>

            <button
              onClick={() => navigate("/Cart")}
              className="relative bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full flex items-center transition-colors"
            >
              <FiShoppingCart className="mr-2" />
              My Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Menu items grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDishes.map((dish) => (
              <div
                key={dish._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl relative"
              >
                {dish.isSpecial && <SpecialTag label="Chef's Special" />}
                {dish.isSpicy && <SpecialTag label="Spicy" />}

                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <RatingStars rating={dish.rating || 4} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {dish.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        dish.isVeg
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {dish.isVeg ? "VEG" : "NON-VEG"}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {dish.description ||
                      "Delicious dish made with premium ingredients"}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-500">
                      ₹{dish.price}
                      {dish.originalPrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ₹{dish.originalPrice}
                        </span>
                      )}
                    </span>
                    <button
                      onClick={() => handleAddToCart(dish._id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center"
                    >
                      <FiShoppingCart className="mr-2" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <GiCorn className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No dishes found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setCategory("all");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full"
            >
              Show All Items
            </button>
          </div>
        )}
      </section>

      {/* Floating order button for mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => navigate("/Cart")}
          className="bg-orange-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center animate-bounce"
        >
          <FiShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Menu;
