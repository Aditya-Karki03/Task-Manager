import express from "express";
import { TaskController } from "../controller/TaskController";

const taskRouter = express.Router();

const taskController = new TaskController();

taskRouter.post("/add-task", taskController.createTask);

export default taskRouter;
