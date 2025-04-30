import { Order } from "../models/order.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create new order
const createOrder = asyncHandler(async (req, res) => {
    try {
        const { totalPrice, orderType, address, tableNumber, items } = req.body;
        
        if (!totalPrice || !orderType || !items) {
            throw new ApiError(400, "All fields are required");
        }

        // Validate address for delivery orders
        if (orderType === "Delivery" && !address) {
            throw new ApiError(400, "Address is required for delivery orders");
        }

        // Validate table number for dine-in orders
        if (orderType === "Dine-in" && !tableNumber) {
            throw new ApiError(400, "Table number is required for dine-in orders");
        }

        const order = await Order.create({
            user: req.user._id,
            totalPrice,
            orderType,
            address,
            tableNumber,
            items,
            orderStatus: "Pending",
            paymentStatus: "Unpaid"
        });

        // Clear user's cart after order creation
        await User.findByIdAndUpdate(req.user._id, { cartData: {} });

        return res.status(200).json(
            new ApiResponse(200, order, "Order created successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error creating order");
    }
});

// Get user's orders
const getUserOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        return res.status(200).json(
            new ApiResponse(200, orders, "Orders fetched successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error fetching orders");
    }
});

// Get all orders (admin)
const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'fullname phoneNumber')
            .sort({ createdAt: -1 });

        return res.status(200).json(
            new ApiResponse(200, orders, "All orders fetched successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error fetching orders");
    }
});

// Update order status (admin)
const updateOrderStatus = asyncHandler(async (req, res) => {
    try {
        const { orderId, orderStatus } = req.body;

        if (!orderId || !orderStatus) {
            throw new ApiError(400, "Order ID and status are required");
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { orderStatus },
            { new: true }
        );

        if (!order) {
            throw new ApiError(404, "Order not found");
        }

        return res.status(200).json(
            new ApiResponse(200, order, "Order status updated successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error updating order status");
    }
});

export {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus
}