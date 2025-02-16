import express from "express";
import { loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { multipleUploads, singleUpload } from "../middlewares/multer.js";
const userRouter = express.Router();


userRouter.post("/register",singleUpload,registerUser);
userRouter.post("/login",loginUser);
userRouter.put("/profile/update",multipleUploads,isLoggedIn,updateProfile);
userRouter.get("/logout",isLoggedIn,logoutUser);

export default userRouter;