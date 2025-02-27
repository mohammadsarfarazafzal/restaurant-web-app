import { Menu } from "../models/menu.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addToCart = asyncHandler(async (req, res) => {
    const cartData = await req.user?._id.cartData;
    if(!cartData){
        throw new ApiError("Cart Not Found", 401);
    }
    cartData.items.quantity+=1;
})

export {addToCart}