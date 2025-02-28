import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { addItem,removeMenuItem,listMenuItems } from "../controllers/menu.controllers.js";


const router=Router()
//addItem
router.route("/add").post(
    upload.single("image"),
    addItem
);
//removeItem
router.route("/remove").post(removeMenuItem);

//ListMenuItem
router.route("/list").get(listMenuItems);

export default router;
