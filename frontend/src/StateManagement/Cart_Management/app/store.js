import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/cartslice"
import authReducer from "../Features/authSlice"

// export const store=configureStore({
//     reducer:cartReducer
// })

export const store = configureStore({
    reducer:{
        cart:cartReducer,
        auth:authReducer
    }
})


