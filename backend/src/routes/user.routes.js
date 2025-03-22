import { Router } from "express"
import { logInUser, logOutUser, registerUser } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(logInUser);

router.route("/logout").post(verifyJWT, logOutUser);

router.route("/refresh").post(verifyJWT, (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, "User is LoggedIn"));
});

export default router;