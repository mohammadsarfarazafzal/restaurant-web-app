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
// register user
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, phoneNumber, admin } = req.body;

  //If any field is blank
  if (
    [fullname, email, password, phoneNumber].some(
      (field) => field?.trim() === ""
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
    phoneNumber,
    admin
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
    throw new ApiError("Email or Number is Required.", 400);
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
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200,  {
        user: loggedInUser,
        accessToken,
        refreshToken,
      }, "Login Successful")
    );
});

//logOut
const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

//refreshAccessToken
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken || req.user?.refreshToken;
  // console.log("Received refresh token:", incomingRefreshToken);

  try {
    if (!incomingRefreshToken) {
      // console.log("No refresh token provided");
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // console.log("token decoded", decodedToken);
    
    const user = await User.findById(decodedToken?._id);

    // console.log("user found", user);

    if (!user) {
      console.log("User not found for ID:", decodedToken?._id);
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const { accessToken, refreshToken } = await generateTokens(user);
    // console.log("generated: ",accessToken, refreshToken);
    
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken
          },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    // Handle specific JWT errors
    let errorMessage = "Invalid refresh token";
    if (error instanceof jwt.TokenExpiredError) {
      errorMessage = "Refresh token expired";
    } else if (error instanceof jwt.JsonWebTokenError) {
      errorMessage = "Invalid refresh token";
    }
    
    throw new ApiError(401, errorMessage);
  }
});

//change passowrd
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isOldPasswordCorrect) {
    throw new ApiError(400, "Invalid old Password");
  }

  //if old one is correct
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const authenticate = asyncHandler((req, res) => {
  const admin = req.user.admin;
  return res.status(200).json(
      new ApiResponse(200, {admin}, "User is LoggedIn"));
});


export { registerUser, logInUser, logOutUser, authenticate };
