import { Request, Response } from "express";
import { Prisma, PrismaClient } from "../../generated/prisma";
import { newTaskValidator, updateTaskValidator } from "../utils/validator";

const prismaClient = new PrismaClient();

//TODO: middleware to check if the assignee exist in the task route
//TODO: middleware to authenticate user
export class TaskController {
  async createTask(req: Request, res: Response) {
    //taskName, taskDescription, dueDate, priority, Tag, AssignedTo,
    const {
      taskName,
      taskDescription,
      taskDueDate,
      taskPriority,
      taskStatus,
      taskAssignedTo,
      taskCategory,
    } = req.body;

    //validate input
    const { data, error, success } = newTaskValidator({
      taskName,
      taskDescription,
      taskDueDate,
      taskPriority,
      taskStatus,
      taskAssignedTo,
      taskCategory,
    });
    if (!success) {
      res.status(403).json({
        message: error?.errors[0]?.message,
        data: null,
      });
      return;
    }
    try {
      //TODO: check for the taskAssignedTo user, it should exist in the db
      //TODO: taskDueDate should not be date below the present date
      const assignedToExist = await prismaClient.user.findFirst({
        where: {
          id: Number(taskAssignedTo),
        },
      });
      if (!assignedToExist) {
        res.status(404).json({
          message: "The assignee does not exist",
          data: null,
        });
        return;
      }

      const task = await prismaClient.task.create({
        data: {
          tName: taskName,
          tDesc: taskDescription,
          tCategory: taskCategory,
          tAssignedToId: Number(taskAssignedTo),
          tPriorities: taskPriority,
          tStatus: taskStatus,
          tDueDate: new Date(taskDueDate),
        },
      });
      res.status(201).json({
        message: "Task created Successful",
        data: task,
      });
    } catch (error: any) {
      console.log("Error while creating task", error);
      res.status(500).json({
        message: "Internal Server Error",
        data: null,
      });
    }
  }

  //update task
  //PATCH request
  async updateTask(req: Request, res: Response) {
    // const {
    //   taskName,
    //   taskDescription,
    //   taskDueDate,
    //   taskPriority,
    //   taskStatus,
    //   taskAssignedTo,
    //   taskCategory,
    // } = req.body;
    const allowedFields = [
      "taskName",
      "taskDescription",
      "taskDueDate",
      "taskPriority",
      "taskStatus",
      "taskAssignedTo",
      "taskCategory",
    ];

    //filter the data which needs to be updated and put it in dataToUpdate
    const dataToUpdate: Record<string, any> = {};
    allowedFields.map((fields) => {
      if (req.body[fields] !== undefined) {
        dataToUpdate[fields] = req.body[fields];
      }
    });

    //validate input data
    const { error, success, data } = updateTaskValidator(dataToUpdate);
    if (!success) {
      res.status(402).json({
        message: error?.errors[0]?.message,
        data: null,
      });
      return;
    }
    try {
      const updatedTask = await prismaClient.task.update({
        where: {
          id: Number(req.query.id),
        },
        data: dataToUpdate,
      });

      res.status(201).json({
        message: "Task updated successfully",
        data: updatedTask,
      });
    } catch (error: any) {
      console.log("Error while updating task", error);
      res.status(500).json({
        message: "Internal server error",
        data: null,
      });
    }
  }

  //tasks of a particular user
  async getAllTasks(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || typeof id !== "number") {
      res.status(400).json({
        message: "Invalid User",
      });
      return;
    }
    try {
      const tasks = await prismaClient.task.findMany({
        where: {
          tAssignedTo: id,
        },
      });
      res.status(200).json({
        message: "Tasks retrieved successfully",
        data: tasks,
      });
    } catch (error: any) {
      console.log("Error while getting all tasks", error);
      res.status(500).json({
        message: "Internal server error",
        data: null,
      });
    }
  }

  //delete a task
  async deleteTasks(req: Request, res: Response) {
    //should be able to delete one as well as many tasks
    //should be array of tasks to be deleted [1,2,3,4,5]
    const { id } = req.params;
    if (!id || typeof id !== "number")
      res.status(400).json({
        message: "Invalid Task id",
        data: null,
      });
    try {
      //delete many is used because avoiding the execution of catch block incase the task does not exist
      const isValidTask = await prismaClient.task.deleteMany({
        where: {
          id: Number(id),
        },
      });
      if (isValidTask.count == 0) {
        res.status(400).json({
          message: "No Task Found to delete",
          data: null,
        });
      } else {
        res.status(201).json({
          message: "Task deleted successfully",
          data: isValidTask,
        });
      }
    } catch (error) {
      console.log("Error while deleting the task", error);
      res.status(500).json({
        message: "Internal Server error",
        data: null,
      });
    }
  }
}
