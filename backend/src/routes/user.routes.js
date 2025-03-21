import {Router} from "express"
import {logInUser, logOutUser, registerUser, refreshAccessToken} from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(logInUser);

router.route("/logout").post(verifyJWT,logOutUser)

router.route("/refresh-token").post(verifyJWT,refreshAccessToken)

export default router;