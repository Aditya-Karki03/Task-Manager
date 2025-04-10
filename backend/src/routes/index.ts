import express from "express";
import userRouter from "./userRoutes";
import authRouter from "./authRoutes";
import taskRouter from "./taskRoutes";
const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/task", taskRouter);

export default router;
