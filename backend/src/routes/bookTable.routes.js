import { Router } from "express";
import { bookTable,cancelTableBooking,listTableBooking,listTableBookingForAdmin,assignTableNumber } from "../controllers/bookTable.controllers.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router=Router()

router.route("/add-booking").post(verifyJWT,bookTable)
router.route("/cancel-booking").post(cancelTableBooking)
router.route("/list-booking").get(verifyJWT,listTableBooking)

router.route("/assign-table").post(assignTableNumber)

router.route("/list-booking-admin").get(listTableBookingForAdmin)


export default router;