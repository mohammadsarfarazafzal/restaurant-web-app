import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useNavigate} from 'react-router-dom'

function Home() {
  const navigateTo=useNavigate();
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    const handleSlides = () => {
      setSlidesToShow(window.innerWidth <= 768 ? 2 : 4);
    };
    handleSlides();
    window.addEventListener("resize", handleSlides);
    return () => {
      window.removeEventListener("resize", handleSlides);
    };
  }, []);

  //Discounts as the day changes
  useEffect(() => {
    const today = new Date().getDay();
    if (today === 0 || today === 6) {
      setDiscount("30% off this weekend!");
    } else {
      setDiscount("10% off this week!");
    }
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true, // Enables auto slide
    autoplaySpeed: 3000, // Sets the auto slide speed (in ms)
  };

  const dishes = [
    {
      name: "Paneer Tikka 🧀",
      img: "/Images/PaneerTikka.jpg",
    },
    {
      name: "Haka Noodles 🍜",
      img: "Images/Noodels.jpg",
    },
    {
      name: "Italian Pizza 🍕",
      img: "Images/Pizza.jpg",
    },
    {
      name: "Chinese Momo 🥟",
      img: "Images/Momo.jpg",
    },
    {
      name: "Kolkata Biryani",
      img: "Images/Biryani.jpg",
    },
    {
      name: "Burger",
      img: "Images/Burger.jpg",
    },
    {
      name: "Dosa",
      img: "Images/Dosa.jpg",
    },
  ];

  return (
    <div className=" bg-gray-100">
      <section
        className="w-full h-auto  text-white py-20 px-4 flex flex-col  items-center justify-between bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/Images/Back2.jpg')",
        }}
      >
        <div className="text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white shadow-lg">
            Welcome to Spice Touch
          </h1>
          <p className="mt-4 text-lg font-serif font-medium md:text-xl text-white shadow-md">
            Bringing flavours to life,multiple cousins & taste.
          </p>
          <motion.button
            onClick={()=>navigateTo("/menu")}
            className="inline-block mt-8 bg-white text-orange-500 font-semibold py-3 px-2 rounded-lg shadow-md hover:bg-orange-700 hover:text-white transition"
            whileHover={{ scale: 1.1 }}
          >
            Explore Menu
          </motion.button>
        </div>
        <div className="text-center py-12 flex flex-col items-center justify-center  shadow-2xl transform transition-all duration-500">
          <motion.h2
            className="text-2xl md:text-4xl font-bold mb-2 text-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {discount}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-white mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Have a wonderful time foodies with our special discounts offer and
            enjoy the best dishes at great prices!
          </motion.p>
          <motion.button
          onClick={()=>navigateTo("/menu")}
            className="inline-block mt-4 py-3 px-6 bg-white text-orange-500 font-semibold rounded-lg shadow-md hover:bg-orange-700 hover:text-white transition duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
          >
            Order Now
          </motion.button>
        </div>
      </section>

      {/* Most selling */}
      <div className="text-center py-4  bg-gray-100 p-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-5xl text- font-bold mb-8 text-orange-600">
          Most Selling Dishes
        </h1>
        <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
          <Slider {...settings} className="">
            {dishes.map((dish) => (
              <motion.div
                key={dish.name}
                className=" rounded-xl p-3 shadow-lg bg-white hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  className=" rounded-md h-40 sm:h-48 lg:h-72 w-full  object-cover"
                  src={dish.img}
                  alt={dish.name}
                />
                <h3 className=" text-sm md:text-lg font-semibold mt-4 text-gray-800">
                  {dish.name}
                </h3>
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Feature Section */}
      <section className=" py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Fresh Ingredients", icon: "🥗" },
            { title: "Authentic Recipes", icon: "🍲" },
            { title: "Fast Delivery", icon: "🚀" },
          ].map((feature, index) => (
            <div
              key={index}
              className=" bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: index * 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
              <p className="mt-2 text-gray-600">
                Experience the best of quality and taste.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
