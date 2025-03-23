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

    console.log(res);

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
  console.log(bookingId);

  const find = await TableBooking.findById(bookingId);
  console.log("user milaaaaaaa..", find);

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

//List of all booking :Note it should be displayed in the admin's website
const listTableBooking = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  // console.log(userId)
  const bookings = await TableBooking.find({
    user: new ObjectId(userId),
  }).populate("user");

  if (bookings.length === 0) {
    throw new ApiError(404, "Error while fetching the bookings");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, bookings, "Bookings listed successfully"));

  // try {
  //     const userId=req.user.id;
  //     const role=req.user.role;

  //     let bookings;
  //     if(role==="admin"){
  //         bookings=await TableBooking.find({})."populate(user");
  //     }
  //     else{
  //         bookings=await TableBooking.find({user:userId});
  //     }
  //     return res.status(200).json(new ApiResponse(200,bookings,"Bookings listed successfully"))

  // } catch (error) {
  //     res
  //     .status(500)
  //     .json({
  //         success:false,
  //         message:"Error fetching booking"
  //     })
  // }
});

export { bookTable, cancelTableBooking, listTableBooking };
