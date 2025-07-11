import Router from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    createRazorpayOrder
} from "../controllers/order.controllers.js";

const router = Router();

router.route("/create").post(verifyJWT, createOrder);
router.route("/user-orders").get(verifyJWT, getUserOrders);
router.route("/all").get(getAllOrders);
router.route("/update-status").post(updateOrderStatus);
router.route("/razorpay-order").post(verifyJWT, createRazorpayOrder);

export default router;