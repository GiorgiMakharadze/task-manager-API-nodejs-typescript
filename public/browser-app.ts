import axios from "axios";

interface Task {
  _id: string;
  name: string;
  completed: boolean;
}

interface TasksResponse {
  data: {
    tasks: Task[];
  };
}

const tasksDOM: HTMLElement | null = document.querySelector(".tasks");
const loadingDOM: HTMLElement | null = document.querySelector(".loading-text");
const formDOM: HTMLFormElement | null = document.querySelector(".task-form");
const taskInputDOM: HTMLInputElement | null =
  document.querySelector(".task-input");
const formAlertDOM: HTMLElement | null = document.querySelector(".form-alert");
// Load tasks from /api/tasks
const showTasks = async (): Promise<void> => {
  if (!tasksDOM || !loadingDOM) return;

  loadingDOM.style.visibility = "visible";
  try {
    const response: TasksResponse = await axios.get("/api/v1/tasks");
    const { tasks }: any = response.data;

    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }

    const allTasks = tasks
      .map((task: Task) => {
        const { completed, _id: taskID, name } = task;
        return `<div class="single-task ${completed && "task-completed"}">
          <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
          <div class="task-links">
            <!-- edit link -->
            <a href="task.html?id=${taskID}"  class="edit-link">
              <i class="fas fa-edit"></i>
            </a>
            <!-- delete btn -->
            <button type="button" class="delete-btn" data-id="${taskID}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>`;
      })
      .join("");

    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};

showTasks();
// delete task /api/tasks/:id

if (tasksDOM) {
  tasksDOM.addEventListener("click", async (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el.parentElement?.classList.contains("delete-btn")) {
      if (!loadingDOM) return;

      loadingDOM.style.visibility = "visible";
      const id = el.parentElement.dataset.id;
      try {
        await axios.delete(`/api/v1/tasks/${id}`);
        showTasks();
      } catch (error) {
        console.log(error);
      }
    }
    if (loadingDOM) loadingDOM.style.visibility = "hidden";
  });
}

// form

if (formDOM && taskInputDOM && formAlertDOM) {
  formDOM.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    const name = taskInputDOM.value;

    try {
      await axios.post("/api/v1/tasks", { name });
      showTasks();
      taskInputDOM.value = "";
      formAlertDOM.style.display = "block";
      formAlertDOM.textContent = `success, task added`;
      formAlertDOM.classList.add("text-success");
    } catch (error) {
      formAlertDOM.style.display = "block";
      formAlertDOM.innerHTML = `error, please try again`;
    }
    setTimeout(() => {
      formAlertDOM.style.display = "none";
      formAlertDOM.classList.remove("text-success");
    }, 3000);
  });
}
