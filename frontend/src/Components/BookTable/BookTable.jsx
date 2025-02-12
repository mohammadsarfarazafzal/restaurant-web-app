import React, { useState } from "react";

function BookTable() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    date: "",
    time: "",
    guests: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you,${formData.name}! Your table is booked.`);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      date: "",
      time: "",
      guests: "",
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className=" text-3xl md:text-4xl font-bold mb-8 text-orange-500 ">
        Book a Table
      </h1>
      <form className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-orange-500 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-orange-500 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Mobile no.
          </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-orange-500 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-orange-500 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-orange-500 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Number of Guests
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-orange-500 rounded-lg"
          />
        </div>
        <button
          className={
            "w-1/2 bg-orange-500 text-white px-4 py-2  font-bold rounded-md transform transition duration-300 hover:scale-105 hover:bg-orange-600 text:sm md:text-base"
          }
        >
          Book Table
        </button>
      </form>
    </div>
  );
}

export default BookTable;
