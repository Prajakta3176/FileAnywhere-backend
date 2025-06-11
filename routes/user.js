import express from "express";
export const userRouter = express.Router();
import {
  getUserInformation,
  signin,
  signup,
} from "../controllers/user.js";
import authenticateToken from "../middlewares/userAuth.js";

// sign up functionality

userRouter
  .post("/signup", signup)
  .post("/signin", signin)
  .get("/user-information", authenticateToken, getUserInformation)

export default userRouter;
