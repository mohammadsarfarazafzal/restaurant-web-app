import mongoose from "mongoose";
import { User } from "./user.models.js";
import { Menu } from "./menu.models.js";

const odrerSchema = new mongoose.Schema(
  {
    user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: User,
          required: true,
    },
    totalPrice: {
      type: Number,
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
    paymentId:{
      type:String
    },
    razorpayOrderId:{
      type:String
    },
    signature:{
      type:String
    },
    items:[
            {
                menuItem:{
                    type:Object,
                    ref:Menu,
                },
                quantity:{
                    type: Number,
                    default: 0,
                    required:true
                },   
            }
        ],
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", odrerSchema);