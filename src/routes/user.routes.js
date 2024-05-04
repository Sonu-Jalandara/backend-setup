
import { Router } from "express";
import {  registerUser } from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";


// file uploading i.e. avatar , coverImage

const router = Router()

router.route("/register").post(
//    // upload.fields is middleware
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),

  
     registerUser)

export default router