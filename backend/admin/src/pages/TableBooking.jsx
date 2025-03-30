import React from 'react'
import axios from "axios"
import { useEffect,useState } from 'react';

function TableBooking() {
    const [bookings, setBookings] = useState([]);
    const [tableNumber, setTableNumber] = useState("");

    const fetchBooking = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8000/api/v1/tableBooking/list-booking-admin"
          );
          setBookings(res.data.data);
          
        } catch (error) {
          console.log("Error in fetching the booking.")
        }
      }
    const assignTableNumber = async (id, tableNumber) => {
        try {
          const res = await axios.post(
            "http://localhost:8000/api/v1/tableBooking/assign-table/",
            { tableId:id,
              tableNumber:parseInt(tableNumber) }
          );
          
          if(res.data.success){
            fetchBooking();
          }
        } catch (error) {
          console.log("Error in assigning table number.")
        }
      }
      const cancelBooking = async (id) =>{
        try {
          const res = await axios.post("http://localhost:8000/api/v1/tableBooking/cancel-booking",{bookingId:id})
          if(res.data.success){
            fetchBooking();
          }
        } catch (error) {
          console.log(error);
        }
      } 
      useEffect(() => {
        fetchBooking();
      }, []);
    
      return (
        <div className="min-h-screen bg-white p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8 border-b border-orange-200 pb-4">
              Table Reservations
            </h1>
    
            {bookings ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-white rounded-lg border border-orange-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Booking Status Badge */}
                    <div className="flex justify-between items-center mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.tableNumber 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                      }`}>
                        {booking.tableNumber ? 'Assigned' : 'Pending'}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(booking.date).toLocaleDateString()}
                      </span>
                    </div>
    
                    {/* Guest Information */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center">
                        <span className="text-gray-600 w-24">Guest</span>
                        <span className="font-medium text-gray-900">
                          {booking.user?.fullname || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 w-24">Phone</span>
                        <span className="text-gray-900">
                          {booking.user?.phoneNumber || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 w-24">Time</span>
                        <span className="text-gray-900">{booking.time}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 w-24">Guests</span>
                        <span className="text-gray-900">{booking.guests}</span>
                      </div>
                    </div>
    
                    {/* Table Assignment Section */}
                    {booking.tableNumber ? (
                      <div className="bg-orange-50 rounded-md p-3 mb-4">
                        <span className="text-orange-700 font-medium">
                          Table #{booking.tableNumber}
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <input 
                          type="number" 
                          name="tableNumber" 
                          placeholder="Enter table number"
                          onChange={(e) => setTableNumber(e.target.value)} 
                          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <button 
                          onClick={() => assignTableNumber(booking._id, tableNumber)}
                          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors duration-200"
                        >
                          Assign Table
                        </button>
                      </div>
                    )}
    
                    {/* Cancel Button */}
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="w-full mt-3 text-gray-600 hover:text-red-600 text-sm font-medium transition-colors duration-200"
                    >
                      Cancel Reservation
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No reservations found</p>
              </div>
            )}
          </div>
        </div>
      );
    }

export default TableBooking