import express from "express";
import userController from "../Controllers/userController.js"; 
import auth from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login); 
userRouter.get("/getUserInfo", auth, userController.getUserInfo);

export default userRouter;
