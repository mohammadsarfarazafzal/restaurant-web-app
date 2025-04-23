import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigateTo = useNavigate();
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    const today = new Date().getDay();
    setDiscount(today === 0 || today === 6 ? "30% off this weekend!" : "10% off this week!");
  }, []);

  const dishes = [
    { name: "Paneer Tikka 🧀", img: "/Images/PaneerTikka.jpg" },
    { name: "Haka Noodles 🍜", img: "/Images/Noodles.jpg" },
    { name: "Italian Pizza 🍕", img: "/Images/Pizza.jpg" },
    { name: "Chinese Momo 🥟", img: "/Images/Momo.jpg" },
    { name: "Kolkata Biryani 🍚", img: "/Images/Biryani.jpg" },
    { name: "Burger 🍔", img: "/Images/Burger.jpg" },
    { name: "Dosa 🥞", img: "/Images/Dosa.jpg" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative w-full h-screen text-white py-20 px-4 flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/Back2.jpg')" }}
      >
        <div className="text-center z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to Spice Touch
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl font-light tracking-wide drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Bringing flavours to life with diverse cuisines & authentic taste.
          </motion.p>
          <motion.button
            onClick={() => navigateTo("/menu")}
            className="mt-8 bg-white text-orange-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-orange-600 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Explore Menu
          </motion.button>
        </div>
        <motion.div
          className="text-center mt-12 p-6 bg-orange-600/90 rounded-xl shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="text-xl md:text-3xl font-bold mb-2 text-white">{discount}</h2>
          <p className="text-white font-medium">
            Enjoy our exclusive offer and taste the best at amazing prices!
          </p>
          <motion.button
            onClick={() => navigateTo("/menu")}
            className="mt-4 py-2 px-5 bg-white text-orange-600 font-bold rounded-lg shadow transition-transform duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Order Now
          </motion.button>
        </motion.div>
      </section>

      {/* Most Selling Dishes - Modified Section */}
      <section className="text-center pt-10 md:pt-16 bg-white px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-10 text-orange-600">Most Selling Dishes</h2>
        <div className="max-w-6xl mx-auto pb-12">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={false}
            slidesPerView={3}
            spaceBetween={30}
            initialSlide={1}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 30,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
                centeredSlides: false,
              },
            }}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
          >
            {dishes.map((dish, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full select-none">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/Images/placeholder-food.jpg";
                    }}
                  />
                  <div className="dish-name">{dish.name}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {[
            { title: "Fresh Ingredients", icon: "🥗", desc: "We use only the freshest ingredients sourced locally." },
            { title: "Authentic Recipes", icon: "🍲", desc: "Traditional recipes prepared with modern techniques." },
            { title: "Fast Delivery", icon: "🚀", desc: "Hot and fresh food delivered to your doorstep in minutes." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-5 md:p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="text-4xl md:text-5xl mb-3">{feature.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold mt-2 text-gray-800">{feature.title}</h3>
              <p className="mt-2 text-gray-600 text-sm md:text-base">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-10 md:py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-orange-600">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Amit S.", text: "Best Paneer Tikka I've ever had! The spices are perfectly balanced.", rating: 5 },
              { name: "Priya M.", text: "Their delivery is always on time and the food arrives hot and fresh.", rating: 4 },
              { name: "John D.", text: "The Kolkata Biryani reminds me of authentic Bengali cuisine. Absolutely delicious!", rating: 5 },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 p-6 rounded-xl shadow text-left"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">
                      {i < testimonial.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="text-gray-200 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-white">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-orange-600 py-10 md:py-16 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="mb-6 text-lg">Experience the authentic flavors of Spice Touch today!</p>
          <motion.button
            onClick={() => navigateTo("/menu")}
            className="py-3 px-8 bg-white text-orange-600 font-bold rounded-lg shadow-lg hover:bg-orange-700 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Order Now
          </motion.button>
        </div>
      </section>
    </div>
  );
}

export default Home;