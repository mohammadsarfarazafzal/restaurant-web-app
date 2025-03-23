import { Menu } from "../models/menu.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// add to cart
const addToCart = asyncHandler(async (req, res) => {
    try {
        const cartData = await req.user?.cartData;
        const itemId = req.body.itemId;
        if(!cartData){
            throw new ApiError("Cart Not Found", 401);
        }

        if(!cartData[itemId]){
            cartData[itemId]=1;
        }else{
            cartData[itemId]+=1;
        }

        await User.findByIdAndUpdate(req.user._id, {cartData});

        res
        .status(200)
        .json(new ApiResponse(200, "Item added to cart"))
    } catch (error) {
        throw new ApiError(401, "Error in Adding To Cart");
    }
})

// delete from cart

const deleteFromCart = asyncHandler(async (req, res) => {
    try {
        const cartData = await req.user?.cartData;
        const itemId = req.body.itemId;
        if(!cartData){
            throw new ApiError("Cart Not Found", 401);
        }

        if(cartData[itemId]>0){
            delete cartData[itemId];
        }

        await User.findByIdAndUpdate(req.user._id, {cartData});

        res.
        status(200).
        json(new ApiResponse(200,"Item deleted from cart"));

    } catch (error) {
        throw new ApiError(401, "Error in Removing From Cart");
    }
})

// remove from cart
const removeFromCart = asyncHandler(async (req, res) => {
    try {
        const cartData = await req.user?.cartData;
        const itemId = req.body.itemId;
        if(!cartData){
            throw new ApiError("Cart Not Found", 401);
        }

        if(cartData[itemId]>0){
            cartData[itemId]-=1;
        }

        await User.findByIdAndUpdate(req.user._id, {cartData});

        res.
        status(200).
        json(new ApiResponse(200,"Item removed from cart"));

    } catch (error) {
        throw new ApiError(401, "Error in Removing From Cart");
    }
})

// fetch cart
const getCartData = asyncHandler(async(req, res)=>{
    try {

        const cartData = await req.user?.cartData;
        if(!cartData){
            throw new ApiError("Cart Data not Found", 401);
        }
        const cartItems = await Promise.all(Object.keys(cartData).map(
            async (key, index)=>{
                return await Menu.findById(key);
            }
        ))

        res.status(200).json(new ApiResponse(200, {cartItems, cartData}, "Showing all Cart Items"));

    } catch (error) {
        throw new ApiError(401, "Error in Fetching Cart Details");
    }
})

export {addToCart, removeFromCart, getCartData, deleteFromCart}