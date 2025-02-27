import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const verifyJWT = asyncHandler(async (req, res, next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            throw new ApiError("Access Token Invalid", 401);
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if(!user){
            throw new ApiError("Invalid Access Token", 401);
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError("Unauthorized Access Token", 401, error?.message);
    }
})

export {verifyJWT}