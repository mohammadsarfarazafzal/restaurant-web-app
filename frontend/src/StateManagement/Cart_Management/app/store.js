import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/cartslice"

// export const store=configureStore({
//     reducer:cartReducer
// })

export const store = configureStore({
    reducer:{
        cart:cartReducer,
    }
})


