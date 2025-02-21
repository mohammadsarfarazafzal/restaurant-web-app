import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, phoneNumber, address } = req.body;

  //If any field is blank
  if (
    [fullname, email, password, phoneNumber, address].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  //check if user is already there
  const exitedUser = await User.findOne({
    $or: [{ fullname }, { email }],
  });
  if(exitedUser){
    throw new ApiError(409,"User already exits.")
  }
  //create user
  const user=await User.create({
    fullname,
    email,
    password,
  })
  //remove password and refreshToken
  const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
  )

  //sending the response
  return res
  .status(201)
  .json(new ApiResponse(201,createdUser,"User registered successfully"))
});

