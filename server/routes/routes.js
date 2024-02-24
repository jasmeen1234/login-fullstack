import express from "express";
import { signUpController,loginController,emailVarificationController,emailOTPVarificationController,resetController,setController } from "../controller/userController.js";

const router =express.Router();

router.post("/signup",signUpController)
router.post("/login",loginController)
router.post("/password/reset",resetController)
router.post("/password/set",setController)
//router.get("/verify/:token",emailVarificationController);
router.get("/verify/otp",emailOTPVarificationController)


export default router;