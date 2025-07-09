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
  const navigate = useNavigate();

  const notify = (message) => {toast.error(message)}

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        formdata, {withCredentials:true}
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
        navigate("/Menu")
      }

    } catch (error) {
      console.log("Login Failed", error.response?.data || error.message);
      notify(error.response?.data?.message || "Login Failed");
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
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
            className="mt-6"
            fullWidth
          >
            Sign In
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