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

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: ""
  })
  const navigate = useNavigate();
  const notify = (cond, message) => {
    if(cond){
      toast.success(message)
    }
    else{
      toast.error(message)
    }
  }
    const register = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/v1/users/register",formData);
            setFormData({
              fullname: "",
              email: "",
              phoneNumber: "",
              address: "",
              password: ""
            })
            console.log(res);
            if(res.data.success){
              notify(true,"Thank You, Account Created Successfully!");
            setTimeout(()=>{
              navigate("/login");
            },3000)
            }
        } catch (error) {
            console.error(error);
            notify(false, "Account Creation Failed")
            
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
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              value={formData.fullname}
              onChange={(e)=>{setFormData({...formData, fullname: e.target.value})}}
              size="lg"
              placeholder="name@mail.com"
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
              Your Complete Address
            </Typography>
            <Input
            value={formData.address}
            onChange={(e)=>{setFormData({...formData, address: e.target.value})}}
              size="lg"
              placeholder="Building Number, Street, City, Pincode, State"
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
          onClick={()=>{
            register();
          }}
          className="mt-6" fullWidth>
            sign up
          </Button>
          <ToastContainer />
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            {/* <a href="#" className="font-medium text-gray-900">
              Sign In
            </a> */}
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