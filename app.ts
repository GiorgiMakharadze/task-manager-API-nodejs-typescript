import express, { NextFunction } from "express";
import tasks from "./api/routes/tasks";
import { connectDB } from "./api/db/connect";
import { notFound } from "./api/middleware/not-found";
import "dotenv/config";

const app = express();
const port = 3000 || process.env.PORT;

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error: Error | any) {
    console.log(error.message);
  }
};

start();
