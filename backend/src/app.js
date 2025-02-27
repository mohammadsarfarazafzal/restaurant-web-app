import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//configusring cors
app.use(cors({
    origin:process.env.CORS_ORIGIN,
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

// order router
import orderRouter from "./routes/order.routes.js"

app.use("/api/v1/order", orderRouter)

export {app}