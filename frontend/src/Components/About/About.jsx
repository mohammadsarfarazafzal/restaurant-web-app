import React from "react";

function About() {
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold">About Spicy Touch</h1>
        <p className="mt-4 text-lg md:text-xl">
          Where flavors meet tradition to create unforgettable dining experiences.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-orange-500 text-center">Our Story</h2>
        <p className="mt-6 text-gray-800 text-lg text-justify leading-relaxed">
          Welcome to <span className="text-orange-500 font-semibold">Spicy Touch</span>, your ultimate
          destination for delectable flavors and heartwarming hospitality. Founded in
          2022, our journey began with a passion for serving food that speaks to the
          soul. Inspired by traditional recipes and modern culinary techniques, we
          bring to your plate a fusion of authentic spices, fresh ingredients, and love
          for food.
        </p>
        <p className="mt-4 text-gray-800 text-lg text-justify leading-relaxed">
          At Spicy Touch, we believe that every meal tells a story. Our mission is to
          provide a cozy ambiance where families and friends can come together to enjoy
          food that is not just delicious but also crafted with care. Whether you're
          here for a quick bite or a grand celebration, we strive to make every moment
          memorable.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-orange-400  py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mt-6 text-lg">
            To serve fresh, flavorful, and quality food while ensuring exceptional customer
            service and a welcoming environment. We aim to inspire joy and create memories
            with every dish.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-orange-500 text-center">Our Values</h2>
        <ul className="mt-6 space-y-4 text-lg text-gray-800">
          <li className="flex items-center gap-4">
            <span className="text-orange-500 text-2xl">🍽️</span>
            <span>Freshness in every ingredient we use.</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-orange-500 text-2xl">🤝</span>
            <span>Building meaningful relationships with our customers.</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-orange-500 text-2xl">🌟</span>
            <span>Delivering excellence in taste and service.</span>
          </li>
        </ul>
      </div>

      {/* Team Section */}
      <div className="bg-gray-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Meet Our Team</h2>
          <p className="mt-6 text-lg leading-relaxed">
            Our chefs and staff are passionate about food and dedicated to ensuring you
            have a delightful dining experience. With years of expertise and a love for
            what we do, we’re here to make your visit unforgettable.
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-orange-500">Come Dine With Us!</h2>
        <p className="mt-4 text-lg text-gray-800">
          Discover a world of flavors and hospitality at Spicy Touch. Book a table or
          visit us today!
        </p>
        <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-orange-600 transition-transform transform hover:scale-105">
          Book a Table
        </button>
      </div>
    </div>
  );
}

export default About;
