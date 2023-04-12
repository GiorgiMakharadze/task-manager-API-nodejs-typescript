import axios, { AxiosResponse } from "axios";

const taskIDDOM: HTMLSpanElement | null | any =
  document.querySelector(".task-edit-id");
const taskNameDOM: HTMLInputElement | null | any =
  document.querySelector(".task-edit-name");
const taskCompletedDOM: HTMLInputElement | null | any = document.querySelector(
  ".task-edit-completed"
);
const editFormDOM: HTMLFormElement | null | any =
  document.querySelector(".single-task-form");
const editBtnDOM: HTMLButtonElement | null | any =
  document.querySelector(".task-edit-btn");
const formAlertDOM: HTMLDivElement | null | any =
  document.querySelector(".form-alert");
const params: string = window.location.search;
const id: string | number | null = new URLSearchParams(params).get("id");
let tempName: string;

interface Task {
  _id: string;
  completed: boolean;
  name: string;
}

const showTask = async () => {
  try {
    const {
      data: { task },
    }: AxiosResponse<{ task: Task }> = await axios.get(`/api/v1/tasks/${id}`);
    const { _id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTask();

editFormDOM.addEventListener("submit", async (e: SubmitEvent) => {
  editBtnDOM.textContent = "Loading...";
  e.preventDefault();
  try {
    const taskName: string = taskNameDOM.value;
    const taskCompleted: boolean = taskCompletedDOM.checked;

    const {
      data: { task },
    }: AxiosResponse<{ task: Task }> = await axios.patch(
      `/api/v1/tasks/${id}`,
      {
        name: taskName,
        completed: taskCompleted,
      }
    );

    const { _id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, edited task`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    console.error(error);
    taskNameDOM.value = tempName;
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  editBtnDOM.textContent = "Edit";
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
