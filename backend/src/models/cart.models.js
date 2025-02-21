import mongoose from "mongoose";
import { Menu } from "./menu.models";

const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.type.ObjectId,
        ref:"User",
        required:true,
    },
    items:[
        {
            menuItem:{
                type:mongoose.Schema.type.ObjectId,
                ref:Menu,
            },
            quantity:{
                type:Number,
                default:1,
                required:true
            }
        }
    ]
},{timestamps:true})

export const Cart=mongoose.model("Cart",cartSchema);