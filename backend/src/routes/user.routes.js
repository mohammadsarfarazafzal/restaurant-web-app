import { Router } from "express"
import { logInUser, logOutUser, registerUser, authenticate } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(logInUser);

router.route("/logout").post(verifyJWT, logOutUser);

router.route("/auth").post(verifyJWT, authenticate);

export default router;