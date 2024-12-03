import express from "express";
import { generateOtpCode } from "../controller/otpCodeContoler.js";
const otpRouter = express.Router();

otpRouter.post("/api/generate-otp", generateOtpCode);

export default otpRouter;
