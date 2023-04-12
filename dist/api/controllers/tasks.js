"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.getTask = exports.createTask = exports.getAllTasks = void 0;
const task_1 = __importDefault(require("../models/task"));
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_1.default.find({});
        res.status(200).json({ tasks, amount: tasks.length });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAllTasks = getAllTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_1.default.create(req.body);
        res.status(201).json({ task });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createTask = createTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: taskID } = req.params;
        const task = yield task_1.default.findOne({ _id: taskID });
        if (!task) {
            return res.status(404).json({ message: `No task with id : ${taskID}` });
        }
        res.status(200).json({ task });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getTask = getTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: taskID } = req.params;
        const task = yield task_1.default.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json({ message: `No task with id : ${taskID}` });
        }
        res.status(200).json({ task });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: taskID } = req.params;
        const task = yield task_1.default.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ task });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.updateTask = updateTask;
