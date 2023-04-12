"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = exports.getAllTasks = void 0;
const getAllTasks = (req, res) => {
    res.send("all items from the file");
};
exports.getAllTasks = getAllTasks;
const createTask = (req, res) => {
    res.send("create task");
};
exports.createTask = createTask;
const getTask = (req, res) => {
    res.send("get single task");
};
exports.getTask = getTask;
const updateTask = (req, res) => {
    res.send("update task");
};
exports.updateTask = updateTask;
const deleteTask = (req, res) => {
    res.send("delete task");
};
exports.deleteTask = deleteTask;
