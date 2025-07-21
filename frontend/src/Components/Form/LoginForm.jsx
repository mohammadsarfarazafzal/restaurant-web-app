import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify"
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../StateManagement/Cart_Management/Features/authSlice.js";
import { setAdmin } from "../../StateManagement/Cart_Management/Features/adminSlice.js";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const LoginForm = () => {
  const token = useSelector((state)=>state.auth.token);
  const adminToken = useSelector((state)=>state.admin.token);
  const dispatch=useDispatch()
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const notify = (message) => {toast.error(message)}

  const login = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://restaurant-backend-3jsp.onrender.com/api/v1/users/login",
        formdata,
        { withCredentials: true }
      );
      
      setFormData({
        email: "",
        password: "",
        phoneNumber: "",
      })
      
      if(res.data.success){
        dispatch(setToken(true));
        if(res.data.data.user.admin){
          dispatch(setAdmin(true));
        }
        navigate("/Menu");
      }

    } catch (error) {
      console.log("Login Failed", error.response?.data || error.message);
      notify(error.response?.data?.message || "Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome back! Enter your details to login.
        </Typography>
        <form onSubmit={(e)=>{e.preventDefault()}} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              value={formdata.email}
              onChange={(e) =>
                setFormData({ ...formdata, email: e.target.value })
              }
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Number
            </Typography>
            <Input
              size="lg"
              value={formdata.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formdata, phoneNumber: e.target.value })
              }
              placeholder="+91"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              value={formdata.password}
              onChange={(e) =>
                setFormData({ ...formdata, password: e.target.value })
              }
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
            className="mt-6"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
          <ToastContainer />
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <button
              className="font-medium text-gray-900"
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                navigate("/SignUp");
              }}
            >
              Sign up
            </button>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;