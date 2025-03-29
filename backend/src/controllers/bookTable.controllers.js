import { TableBooking } from "../models/bookTable.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

//Book a table
const bookTable = asyncHandler(async (req, res) => {
  try {
    const { guests, date, time } = req.body;

    if (!guests || !date || !time) {
      throw new ApiError(400, "All fields are required.");
    }

    const newTableBooking = await TableBooking.create({
      user: req.user._id,
      guests,
      date,
      time,
    });
    if (!newTableBooking) {
      throw new ApiError(500, "Failed to book your table.");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, newTableBooking, "Table booked successfully"));
  } catch (error) {
    throw new ApiError(500, "Error while booking the table");
  }
});

//cancel the booked table
const cancelTableBooking = asyncHandler(async (req, res) => {
  const bookingId = req.body.bookingId;
  const find = await TableBooking.findById(bookingId);
  const cancelBooking = await TableBooking.findByIdAndDelete(bookingId);
  
  if (!cancelBooking) {
    throw new ApiError(404, "Error while cancelling the booking.");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, cancelBooking, "Booking of table is cancelled.")
    );
});

//List of all booking :Note it should be displayed in the user 
const listTableBooking = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const bookings = await TableBooking.find({
    user: new ObjectId(userId),
  }).populate("user");

  if (bookings.length === 0) {
    throw new ApiError(404, "Error while fetching the bookings");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, bookings, "Bookings listed successfully"));

});

//List of all booking for the admin
const listTableBookingForAdmin=asyncHandler(async(req,res)=>{
  const bookingsAdmin=await TableBooking.find({}).populate("user");
  console.log(bookingsAdmin);
  if(bookingsAdmin.length===0){
    throw new ApiError(404,"Error while fetching bookings");
  }
  return res
  .status(200)
  .json(new ApiResponse(200,bookingsAdmin,"Bookings listed successfully for admin"));
})

const assignTableNumber = asyncHandler(async(req,res)=>{
  try {
    const {tableId, tableNumber} = req.body;
    await TableBooking.findByIdAndUpdate(tableId, {tableNumber: tableNumber});
    return res.status(200).json(new ApiResponse(200, "Table number assigned successfully"));
  } catch (error) {
    throw new ApiError(500, "Error while assigning table number");
  }
})

export { bookTable, cancelTableBooking, listTableBooking, assignTableNumber, listTableBookingForAdmin}

