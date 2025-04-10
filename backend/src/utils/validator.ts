import { z } from "zod";
import {
  IRegistrationValidator,
  ITaskValidator,
  IUpdateTaskValidator,
} from "../interface/IUser";

export function registrationDataValidator(userInfo: IRegistrationValidator) {
  const schema = z.object({
    fName: z.string().refine((name) => name.length > 1 && name.length < 30, {
      message: "First Name must be within 30 letters",
    }),

    lName: z.string().refine((name) => name.length > 0 && name.length < 40, {
      message: "Last Name should be within 30 letters",
    }),

    email: z.string().email({
      message: "Please type a valid email",
    }),
  });
  const { success, error, data } = schema.safeParse(userInfo);
  return {
    success,
    error,
    data,
  };
}

export function newTaskValidator(taskInfo: ITaskValidator) {
  const schema = z.object({
    taskName: z
      .string()
      .min(1, {
        message: "Task Name must be minimum 1 letter",
      })
      .max(50, {
        message: "Task Name must be within 50 letters",
      }),

    taskDescription: z
      .string()
      .min(1, {
        message: "Task Description must be minimum 1 letter",
      })
      .max(255, {
        message: "Task Description must be within 255 letters",
      })
      .optional(),

    taskDueDate: z.coerce
      .date({ message: "Please provide task due date" })
      .refine(
        (date) => {
          return date >= new Date(Date.now());
        },
        {
          message: "Please input a valid date",
        }
      ),

    taskPriority: z.enum(["low", "high", "medium", "urgent"]),

    taskStatus: z.enum(["todo", "inProgress", "completed", "stuck"]),

    taskAssignedTo: z.number({
      message: "Invalid assignee",
    }),

    taskCategory: z
      .string()
      .refine((category) => category.length > 0 && category.length < 50, {
        message: "Define category within 50 words",
      }),
  });

  const { success, data, error } = schema.safeParse(taskInfo);
  return {
    success,
    data,
    error,
  };
}

export function updateTaskValidator(taskInfo: IUpdateTaskValidator) {
  //make every single property optional
  const schema = z.object({
    taskName: z
      .string()
      .min(1, {
        message: "Task Name must be minimum 1 letter",
      })
      .max(50, {
        message: "Task Name must be within 50 letters",
      })
      .optional(),

    taskDescription: z
      .string()
      .min(1, {
        message: "Task Description must be minimum 1 letter",
      })
      .max(255, {
        message: "Task Description must be within 255 letters",
      })
      .optional(),

    taskDueDate: z.coerce
      .date({ message: "Please provide task due date" })
      .refine((date) => date >= new Date(Date.now()), {
        message: "Invalid Due Date",
      })
      .optional(),

    taskPriority: z.enum(["low", "high", "medium", "urgent"]).optional(),

    taskStatus: z.enum(["todo", "inProgress", "completed", "stuck"]).optional(),

    taskAssignedTo: z
      .number({
        message: "Please assign the task to someone",
      })
      .optional(),

    taskCategory: z
      .string()
      .refine((category) => category.length > 0 && category.length < 50, {
        message: "Define category within 50 words",
      })
      .optional(),
  });

  const { success, data, error } = schema.safeParse(taskInfo);
  return {
    success,
    data,
    error,
  };
}
