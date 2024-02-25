import express from "express";
import { signUpController,loginController,emailVarificationController,emailOTPVarificationController,resetController,setController,getAllUsersController,deleteUserController } from "../controller/userController.js";

const router =express.Router();

router.post("/signup",signUpController)
router.post("/login",loginController)
router.post("/password/reset",resetController)
router.post("/password/set",setController)
//router.get("/verify/:token",emailVarificationController);
router.get("/verify/otp",emailOTPVarificationController)
router.get("/admin/userslist",getAllUsersController)
router.delete("/admin/delete/user/:id",deleteUserController)

export default router;