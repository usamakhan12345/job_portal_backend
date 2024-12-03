import mongoose from "mongoose";
import { Schema } from "mongoose";

const otpSchema = new Schema({
  otpCode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const otpModel = new mongoose.model("Otp", otpSchema);

export default otpModel;
