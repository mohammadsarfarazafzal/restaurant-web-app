import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//configusring cors
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//middlewares
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public")) 


//configuring-parser
app.use(cookieParser())

// user router
import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users", userRouter)

// cart router
import cartRouter from "./routes/cart.routes.js"
app.use("/api/v1/cart", cartRouter)

//menu router
import menuRouter from "./routes/menu.routes.js"
app.use("/api/v1/menu",menuRouter)

//booking route
import bookingRouter from "./routes/bookTable.routes.js"
app.use("/api/v1/tableBooking",bookingRouter)

//order route
import orderRouter from "./routes/order.routes.js"
app.use("/api/v1/orders", orderRouter)

export {app}