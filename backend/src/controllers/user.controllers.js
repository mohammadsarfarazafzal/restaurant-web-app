import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const generateTokens = async (user) => {
  try {
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError("Failed Generating Tokens", 500, error);
  }
};

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
  if (exitedUser) {
    throw new ApiError(409, "User already exits.");
  }
  //create user
  const user = await User.create({
    fullname,
    email,
    password,
  });
  //remove password and refreshToken
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //sending the response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const logInUser = asyncHandler(async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  if (!(email || phoneNumber)) {
    throw new ApiError("Email is Required.", 400);
  }
  const user = await User.findOne({ $or: [{ email }, { phoneNumber }] });
  if (!user) {
    throw new ApiError("No User Created with this Email.", 404);
  }
  const passwordCorrect = await user.isPasswordCorrect(password);
  if (!passwordCorrect) {
    throw new ApiError("Password is incorrect.", 401);
  }
  const { accessToken, refreshToken } = await generateTokens(user);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "Login Successful", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

export { registerUser, logInUser };
