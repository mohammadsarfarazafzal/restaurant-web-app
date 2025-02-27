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

import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users", userRouter)

import cartRouter from "./routes/cart.routes.js"

app.use("/api/v1/cart", cartRouter)

export {app}