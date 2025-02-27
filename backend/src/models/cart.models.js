import mongoose from "mongoose";
import { Menu } from "./menu.models";

const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    items:[
        {
            menuItem:{
                type:mongoose.Schema.Types.ObjectId,
                ref:Menu,
            },
            quantity:{
                type: Number,
                default: 0,
                required:true
            },   
        }
    ],
    
},{timestamps:true})

cartSchema.methods.getTotalCartPrice = async function (items) {
    let totalCartPrice = 0;
    this.items.forEach(element => {
        totalCartPrice += element.menuItem.price * element.quantity;
    });
    return totalCartPrice;
}

export const Cart=mongoose.model("Cart",cartSchema);