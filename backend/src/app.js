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

//configuring-parser
app.use(cookieParser())

app.get('/', function (req, res) {
  res.send('Server is up and running')
})

export {app}