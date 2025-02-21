import mongoose from "mongoose";
import { User } from "./user.models";

const odrerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],

  totalPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  paymentStatus: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
  orderType:{
    type:String,
    enum:["Dine-in","Delivery"],required:true
  },
  tableNumber:{
    type:String,
    required:function(){
        return this.orderType==="Dine-in"
    }
  },
  address:{
    type:String,
    required:function(){
        return this.orderType==="Delivery"
    }
  }
},{timestamps:true});

export const Order=mongoose.model("Order",odrerSchema)