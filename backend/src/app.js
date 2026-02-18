import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


const allowedOrigins = [
    "https://spicytouch.onrender.com", // Deployed frontend
    "http://127.0.0.1:5500",           // Local Live Server (VS Code)
    "http://localhost:5500"            // Localhost alternative
];

// Configuring CORS with multiple origins
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true 
}));

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Configuring-parser
app.use(cookieParser());

// --- ROUTES ---
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

import cartRouter from "./routes/cart.routes.js";
app.use("/api/v1/cart", cartRouter);

import menuRouter from "./routes/menu.routes.js";
app.use("/api/v1/menu", menuRouter);

import bookingRouter from "./routes/bookTable.routes.js";
app.use("/api/v1/tableBooking", bookingRouter);

import orderRouter from "./routes/order.routes.js";
app.use("/api/v1/orders", orderRouter);

export { app };