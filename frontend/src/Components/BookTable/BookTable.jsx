import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";

function BookTable() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate=useNavigate();
  const notify = (cond, message) => {
      if(cond){
        toast.success(message)
      }
      else{
        toast.error(message)
      }
    }

  const bookTable=async ()=>{
    try {
      const res=await axios.post("http://localhost:8000/api/v1/tableBooking/add-booking",formData,{withCredentials:true});
      setFormData({
        time:"",
        date:"",
        guests:""
      })
      if(res.data.success){
        notify(true,"Your table is Booked");
        setTimeout(()=>{
          navigate("/BookedTable")
        },2000)
      }
    } catch (error) {
      notify(false,"Can't book table ! Try again.")
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className=" text-3xl md:text-4xl font-bold mb-8 text-orange-500 ">
        Book a Table
      </h1>
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
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
          onClick={()=>{
            bookTable();
          }}
        >
          Book Table
        </button>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default BookTable;
