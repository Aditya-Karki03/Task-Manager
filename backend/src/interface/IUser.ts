export interface IRegistrationValidator {
  email: string;
  fName: string;
  lName: string;
}

enum TaskPriority {
  low,
  high,
  medium,
  urgent,
}

enum TaskStatus {
  todo,
  inProgress,
  completed,
  stuck,
}

export interface ITaskValidator {
  taskName: string;
  taskDescription: string;
  taskDueDate: Date;
  taskPriority: TaskPriority;
  taskStatus: TaskStatus;
  taskAssignedTo: string;
  taskCategory: string;
}

export interface IUpdateTaskValidator {
  taskName?: string;
  taskDescription?: string;
  taskDueDate?: Date;
  taskPriority?: TaskPriority;
  taskStatus?: TaskStatus;
  taskAssignedTo?: string;
  taskCategory?: string;
}
