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
                type:Number,
                default:0,
                required:true
            },   
        }
    ],
    
},{timestamps:true})

export const Cart=mongoose.model("Cart",cartSchema);