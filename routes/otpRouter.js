import express from "express";
import { generateOtpCode, verifyOtp } from "../controller/otpCodeContoler.js";
const otpRouter = express.Router();

otpRouter.post("/api/generate-otp", generateOtpCode);
otpRouter.post("/api/verify-otp", verifyOtp);

export default otpRouter;
