import React from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";

const validateForm = (data) => {
  // at least 2 characters
  if (!data.fullname || data.fullname.trim().length < 2) {
    return "Please enter a valid name.";
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    return "Please enter a valid email address.";
  }
  // 10 digits
  if (!/^\d{10}$/.test(data.phoneNumber)) {
    return "Please enter a valid 10-digit phone number.";
  }
  // at least 8 characters
  if (!data.password || data.password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  return null;
};

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: ""
  })
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const notify = (cond, message) => {
    if(cond){
      toast.success(message)
    }
    else{
      toast.error(message)
    }
  }
    const register = async () => {
      const validationError = validateForm(formData);
      if (validationError) {
        notify(false, validationError);
        return;
      }
      
      setIsLoading(true);
      try {
        const res = await axios.post("https://restaurant-backend-3jsp.onrender.com/api/v1/users/register", formData);
        setFormData({
          fullname: "",
          email: "",
          phoneNumber: "",
          password: ""
        });
        if (res.data.success) {
          notify(true, "Thank You, Account Created Successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        console.error(error);
        notify(false, "Account Creation Failed")
      } finally {
        setIsLoading(false);
      }
    }
  return (
    <div className='flex justify-center items-center'>
        <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form onSubmit={(e)=>{e.preventDefault()}} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              value={formData.fullname}
              onChange={(e)=>{setFormData({...formData, fullname: e.target.value})}}
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
            value={formData.email}
              onChange={(e)=>{setFormData({...formData, email: e.target.value})}}
              size="lg"
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
            value={formData.phoneNumber}
              onChange={(e)=>{setFormData({...formData, phoneNumber: e.target.value})}}
              size="lg"
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
            value={formData.password}
            onChange={(e)=>{setFormData({...formData, password: e.target.value})}}
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
          checked={agreed}
          onChange={(e)=>setAgreed(e.target.checked)}
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
          disabled={!agreed || isLoading}
          onClick={()=>{
            register();
          }}
          className="mt-6" fullWidth>
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
        Creating Account...
      </div>
    ) : (
      "Sign Up"
    )}
          </Button>
          <ToastContainer />
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <button className="font-medium text-gray-900"
            onClick={()=>{
              navigate("/Login")
            }}>
              Sign in
            </button>
          </Typography>
        </form>
      </Card>
    </div>
  )
}

export default SignUpForm