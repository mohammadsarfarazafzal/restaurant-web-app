import { Menu } from "../models/menu.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addToCart = asyncHandler(async (req, res) => {
    try {
        const cartData = await req.user?.cartData;
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
        throw new ApiError(401, "Error in Adding To Cart", error.messsage);
    }
})

const removeFromCart = asyncHandler(async (req, res) => {
    try {
        const cartData = await req.user?.cartData;
        if(!cartData){
            throw new ApiError("Cart Not Found", 401);
        }

        if(cartData[itemId]>0){
            cartData[itemId]-=1;
        }

        await User.findByIdAndUpdate(req.user._id, {cartData});

        res.
        status(200).
        json(new ApiResponse("Item removed from cart", 200));

    } catch (error) {
        throw new ApiError(401, "Error in Removing From Cart", error.messsage);
    }
})

const getCartData = asyncHandler(async(req, res)=>{
    try {
        const cartData = await req.user?.cartData;

        if(!cartData){
            throw new ApiError("Cart Not Found", 401);
        }

        res.status(200).json(new ApiResponse(200, "Showing all Cart Items", cartData));

    } catch (error) {
        throw new ApiError(401, "Error in Fetching Cart Details", error.messsage);
    }
})

export {addToCart, removeFromCart, getCartData}