import {Router} from "express"
import {verifyJWT} from "../middlewares/auth.middlewares.js";
import {addToCart} from "../controllers/cart.controllers.js"

const router = Router();

router.route("/add").post(verifyJWT, addToCart);

export default router;