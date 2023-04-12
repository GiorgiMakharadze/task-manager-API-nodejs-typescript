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
const axios_1 = __importDefault(require("axios"));
const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let tempName = "";
const showTask = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: { task }, } = yield axios_1.default.get(`/api/v1/tasks/${id}`);
        const { _id: taskID, completed, name } = task;
        taskIDDOM === null || taskIDDOM === void 0 ? void 0 : taskIDDOM.textContent = taskID;
        taskNameDOM === null || taskNameDOM === void 0 ? void 0 : taskNameDOM.value = name;
        tempName = name;
        if (completed) {
            taskCompletedDOM === null || taskCompletedDOM === void 0 ? void 0 : taskCompletedDOM.checked = true;
        }
    }
    catch (error) {
        console.log(error);
    }
});
showTask();
editFormDOM === null || editFormDOM === void 0 ? void 0 : editFormDOM.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!editBtnDOM)
        return;
    editBtnDOM.textContent = "Loading...";
    e.preventDefault();
    try {
        const taskName = (_a = taskNameDOM === null || taskNameDOM === void 0 ? void 0 : taskNameDOM.value) !== null && _a !== void 0 ? _a : "";
        const taskCompleted = (_b = taskCompletedDOM === null || taskCompletedDOM === void 0 ? void 0 : taskCompletedDOM.checked) !== null && _b !== void 0 ? _b : false;
        const { data: { task }, } = yield axios_1.default.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
        });
        const { _id: taskID, completed, name } = task;
        taskIDDOM === null || taskIDDOM === void 0 ? void 0 : taskIDDOM.textContent = taskID;
        taskNameDOM === null || taskNameDOM === void 0 ? void 0 : taskNameDOM.value = name;
        tempName = name;
        if (completed) {
            taskCompletedDOM === null || taskCompletedDOM === void 0 ? void 0 : taskCompletedDOM.checked = true;
        }
        if (formAlertDOM) {
            formAlertDOM.style.display = "block";
            formAlertDOM.textContent = `success, edited task`;
            formAlertDOM.classList.add("text-success");
        }
    }
    catch (error) {
        console.error(error);
        taskNameDOM === null || taskNameDOM === void 0 ? void 0 : taskNameDOM.value = tempName;
        if (formAlertDOM) {
            formAlertDOM.style.display = "block";
            formAlertDOM.innerHTML = `error, please try again`;
        }
    }
    if (editBtnDOM) {
        editBtnDOM.textContent = "Edit";
    }
    setTimeout(() => {
        if (formAlertDOM) {
            formAlertDOM.style.display = "none";
            formAlertDOM.classList.remove("text-success");
        }
    }, 3000);
}));
