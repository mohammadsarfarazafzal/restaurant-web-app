import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiClock, FiUsers, FiPhone, FiUser, FiX } from "react-icons/fi";
import { BsTable } from "react-icons/bs";

function ViewBooking() {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch booking details
  const fetchBooking = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://restaurant-backend-3jsp.onrender.com/api/v1/tableBooking/list-booking",
        { withCredentials: true }
      );
      setBookings(res.data.data);
    } catch (error) {
      toast.error("Error fetching the booking details");
    } finally {
      setLoading(false);
    }
  };

  // Cancelling the booking
  const cancelBooking = async (id) => {
    try {
      const res = await axios.post(
        "https://restaurant-backend-3jsp.onrender.com/api/v1/tableBooking/cancel-booking",
        { bookingId: id },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Booking cancelled successfully");
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== id)
        );
      }
    } catch (error) {
      toast.error("Can't cancel booking!");
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your Reservations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your upcoming dining experiences. Booked tables will be automatically cancelled after 24 hours if not confirmed.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : bookings && bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">
                      {booking.tableNumber ? `Table #${booking.tableNumber}` : "Pending Assignment"}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.tableNumber ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {booking.tableNumber ? "Confirmed" : "Processing"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-orange-100 p-2 rounded-full mr-4">
                        <FiUser className="text-orange-500 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium text-gray-900">
                          {booking.user?.fullname || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-orange-100 p-2 rounded-full mr-4">
                        <FiPhone className="text-orange-500 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">
                          {booking.user?.phoneNumber || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-orange-100 p-2 rounded-full mr-4">
                        <FiCalendar className="text-orange-500 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(booking.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-orange-100 p-2 rounded-full mr-4">
                        <FiClock className="text-orange-500 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium text-gray-900">
                          {booking.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-orange-100 p-2 rounded-full mr-4">
                        <FiUsers className="text-orange-500 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Guests</p>
                        <p className="font-medium text-gray-900">
                          {booking.guests} {booking.guests > 1 ? "people" : "person"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-orange-100 p-2 rounded-full mr-4">
                        <BsTable className="text-orange-500 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium text-gray-900">
                          {booking.tableNumber ? "Table assigned" : "Waiting for table assignment"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to cancel this booking?")) {
                          cancelBooking(booking._id);
                        }
                      }}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                      <FiX className="mr-2" />
                      Cancel Reservation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
              <FiCalendar className="text-gray-500 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Reservations Found</h3>
            <p className="text-gray-500 mb-6">
              You don't have any upcoming reservations. Book a table to enjoy our delicious food!
            </p>
            <button
              onClick={() => navigate("/BookTable")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Book a Table Now
            </button>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default ViewBooking;