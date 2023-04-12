import { Request, Response } from "express";

export const getAllTasks = (req: Request, res: Response) => {
  res.send("all items from the file");
};

export const createTask = (req: Request, res: Response) => {
  res.send("create task");
};

export const getTask = (req: Request, res: Response) => {
  res.send("get single task");
};

export const updateTask = (req: Request, res: Response) => {
  res.send("update task");
};

export const deleteTask = (req: Request, res: Response) => {
  res.send("delete task");
};
