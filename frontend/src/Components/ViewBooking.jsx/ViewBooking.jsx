import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios";
import {ToastContainer,toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';



function ViewBooking() {

  const [bookings,setBookings]=useState(null);
  const navigate=useNavigate();
  
  //Fetch booking details
  const fetchBooking=async()=>{
    try {
        const res=await axios.get("http://localhost:8000/api/v1/tableBooking/list-booking",{withCredentials:true})
        setBookings(res.data.data)
        console.log(res)
    } catch (error) {
        toast.error("Error fetching the booking details")
    }
  }

  //Cancelling the booking
  const cancelBooking=async (id)=>{
    try {
        const res=await axios.post("http://localhost:8000/api/v1/tableBooking/cancel-booking",{withCredentials:true})
        if(res.data.success){
            toast.success("Booking cancelled sucessfully")
            setBookings(null);
            setTimeout(()=>{
                navigate("/BookTable")
            },2000)
        }
    } catch (error) {
        toast,error("Can't cancel booking !")
    }
  }
  useEffect(()=>{
    fetchBooking();
  },[])
  return (
    <div className='min-h-screen flex flex-col items-center p-4'>
        <h1 className='text-3xl md:text-4xl mb-8 font-bold text-orange-500 '>Your Bookings Details</h1>

        {bookings ? (
            bookings.map((booking)=>(
                <div>
                <p>
                    <strong>Date:</strong> {booking.date}
                </p>
                <p>
                    <strong>Time:</strong>{booking.time}
                </p>
                <strong>No. of guests:</strong>{booking.guests}
            </div>
            ))
        ):(
            <p>No Booking Found</p>
        )}
    </div>
  )
}

export default ViewBooking