import { Request, Response } from "express";
import Task from "../models/task";

export const getAllTasks = (req: Request, res: Response) => {
  res.send("all items from the file");
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getTask = (req: Request, res: Response) => {
  res.json({ id: req.params.id });
};

export const updateTask = (req: Request, res: Response) => {
  res.send("update task");
};

export const deleteTask = (req: Request, res: Response) => {
  res.send("delete task");
};
