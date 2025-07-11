import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FiCalendar, FiClock, FiUsers } from "react-icons/fi";

function BookTable() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const notify = (cond, message) => {
    if (cond) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await axios.post(
        "https://restaurant-backend-3jsp.onrender.com/api/v1/tableBooking/add-booking",
        formData,
        { withCredentials: true }
      );
      
      setFormData({
        time: "",
        date: "",
        guests: ""
      });
      
      if (res.data.success) {
        notify(true, "Your table has been booked successfully!");
        setTimeout(() => {
          navigate("/BookedTable");
        }, 2000);
      }
    } catch (error) {
      notify(false, error.response?.data?.message || "Failed to book table. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Reserve Your Table
          </h1>
          <p className="text-gray-600">
            Fill in the details below to book your dining experience
          </p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          <div className="p-6 sm:p-8">
            {/* Date Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <FiCalendar className="mr-2 text-orange-500" />
                  Date
                </div>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              />
            </div>

            {/* Time Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <FiClock className="mr-2 text-orange-500" />
                  Time
                </div>
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              />
            </div>

            {/* Guests Field */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <FiUsers className="mr-2 text-orange-500" />
                  Number of Guests
                </div>
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                min="1"
                max="20"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition duration-300 ${
                isSubmitting
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 transform hover:-translate-y-1"
              } shadow-md`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Book Table Now"
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default BookTable;