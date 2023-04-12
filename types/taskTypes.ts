export interface Task {
  _id: string;
  completed: boolean;
  name: string;
}

export interface TasksResponse {
  data: {
    tasks: Task[];
  };
}
