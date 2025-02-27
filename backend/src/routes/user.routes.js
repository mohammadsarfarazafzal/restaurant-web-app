import {Router} from "express"
import {logInUser, logOutUser, registerUser} from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(logInUser);

router.route("/logout").post(verifyJWT,logOutUser)

export default router;