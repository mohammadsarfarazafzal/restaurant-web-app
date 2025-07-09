import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/cartslice"
import authReducer from "../Features/authSlice"
import adminReducer from "../Features/adminSlice.js"

export const store = configureStore({
    reducer:{
        cart:cartReducer,
        auth:authReducer,
        admin: adminReducer
    }
})


