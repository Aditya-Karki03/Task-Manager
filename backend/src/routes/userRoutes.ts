import express from "express";
import { UserController } from "../controller/UserController";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/sign-up", userController.createUser);
userRouter.post("/login", userController.login);

export default userRouter;
