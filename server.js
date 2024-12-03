import express from "express";
import { configDotenv } from "dotenv";
import { connectDatabase } from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import otpRouter from "./routes/otpRouter.js";
import cors from "cors";
const app = express();

app.use(express.json());
connectDatabase();
configDotenv();
app.use([userRouter, otpRouter]);
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "this is working" });
});

app.listen(8000, () => {
  console.log("app is running on ", 8000);
});
