import { Router } from "express";
import { bookTable,cancelTableBooking,listTableBooking } from "../controllers/bookTable.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router=Router()

router.route("/add-booking").post(verifyJWT,bookTable)
router.route("/cancel-booking").post(verifyJWT,cancelTableBooking)
router.route("/list-booking").get(listTableBooking)

export default router;