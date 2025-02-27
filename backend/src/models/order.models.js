import mongoose from "mongoose";
import { User } from "./user.models";

const odrerSchema = new mongoose.Schema(
  {
    items: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    orderType: {
      type: String,
      enum: ["Dine-in", "Delivery"],
      required: true,
    },
    tableNumber: {
      type: String,
      required: function () {
        return this.orderType === "Dine-in";
      },
    },
    address: {
      type: String,
      required: function () {
        return this.orderType === "Delivery";
      },
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", odrerSchema);
