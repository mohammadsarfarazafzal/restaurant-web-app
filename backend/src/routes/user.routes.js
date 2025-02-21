import {Router} from "express"
import {logInUser} from "../controllers/user.controllers.js"

const router = Router();

router.route("/login").post(logInUser);

export default router;