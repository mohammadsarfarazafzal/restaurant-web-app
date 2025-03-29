import mongoose from "mongoose";

const TableBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guests: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    tableNumber: {type: Number}
  },
  { timestamps: true }
);

export const TableBooking = mongoose.model("TableBooking", TableBookingSchema);
