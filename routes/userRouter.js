import express from "express";

const userRouter = express.Router();
import { signup, signIn } from "../controller/userControler.js";

userRouter.post("/api/sign-up", signup);
userRouter.post("/api/sign-in", signIn);

export default userRouter;
