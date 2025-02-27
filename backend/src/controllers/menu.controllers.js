import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Menu } from "../models/menu.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

//Add a new item
const addItem=asyncHandler(async(req,res)=>{
    const {name,price,category,isVeg}=req.body;

    if(!name || !price || !category || isVeg===undefined ){
        throw new ApiError(400,"All fields required")
    }

    const imageLocalPath=req.file?.path;
    if(!imageLocalPath){
        throw new ApiError(400,"Image field required")
    }

    const image=await uploadOnCloudinary(imageLocalPath);
    if(!image){
        throw new ApiError(400,"Avatar required");
    }

    const newMenuItem=await Menu.create({
        name,
        price,
        category,
        isVeg,
        image:image.url
    })

    if(!newMenuItem){
        throw new ApiError(500,"Failed to create menu");
    }

    return res
    .status(200)
    .json(new ApiResponse(200,newMenuItem,"Menu item is added successfully."))
})

//Remove menu item
const removeMenuItem=asyncHandler(async(req,res)=>{
    const {id}=req.body;
    
    const deletedItem= await Menu.findByIdAndDelete(id);

    if(!deletedItem){
        throw new ApiError(404,"Menu item not deleted")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,deletedItem,"Item removed successfully"))
})

//List all items
const listMenuItems=asyncHandler(async(req,res)=>{
    const menuItems=await Menu.find({});

    return res.status(200).json(new ApiResponse(200,menuItems,"Menu items listed successfully"))
})

export {addItem,removeMenuItem,listMenuItems}