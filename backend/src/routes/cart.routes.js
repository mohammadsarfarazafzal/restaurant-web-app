import {Router} from "express"
import {verifyJWT} from "../middlewares/auth.middlewares.js";
import {addToCart, removeFromCart, getCartData} from "../controllers/cart.controllers.js"

const router = Router();

router.route("/add").post(verifyJWT, addToCart);
router.route("/remove").post(verifyJWT, removeFromCart);
router.route("/all").get(verifyJWT, getCartData);

export default router;