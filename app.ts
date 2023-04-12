import express, { Request, Response, NextFunction } from "express";
import tasks from "./api/routes/tasks";
const app = express();
const port = 3000 || process.env.PORT;

//middleware
app.use(express.json());

//routes
app.get("/hello", (req: Request, res: Response) => {
  res.send("Task manager");
});

app.use("/api/v1/tasks", tasks);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
