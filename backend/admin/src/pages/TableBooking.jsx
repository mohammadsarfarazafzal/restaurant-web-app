import React from 'react'
import axios from "axios"
import { useEffect,useState } from 'react';

function TableBooking() {
    const [bookings, setBookings] = useState(null);

    const fetchBooking = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8000/api/v1/tableBooking/list-booking-admin"
          );
          setBookings(res.data.data);
        } catch (error) {
          console.log("Error in fetching the booking.")
        }
      };
      useEffect(() => {
        fetchBooking();
      }, []);
    
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl md:text-4xl mb-8 font-bold text-orange-500">
        Your Booking Details
      </h1>

      {bookings ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg"
            >
              <p className="text-lg font-semibold text-gray-700">
                <strong>Name:</strong> {booking.user?.fullname || "N/A"}
              </p>
              <p className="text-lg text-gray-600">
                <strong>Phone no.:</strong> {booking.user?.phoneNumber || "N/A"}
              </p>
              <p className="text-lg text-gray-600">
                <strong>Date:</strong>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="text-lg text-gray-600">
                <strong>Time:</strong> {booking.time}
              </p>
              <p className="text-lg text-gray-600">
                <strong>No. of guests:</strong> {booking.guests}
              </p>

              {/* Cancel button */}
              <button
                onClick={() => cancelBooking(booking._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-500">No Booking Found</p>
      )}
    </div>
  )
}

export default TableBooking