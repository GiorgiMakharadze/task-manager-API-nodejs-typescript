import express from "express";
import morgan from "morgan";
import tasks from "./api/routes/tasks";
import { connectDB } from "./api/db/connect";
import { notFound } from "./api/middleware/not-found";
import { errorHandlerMiddleware } from "./api/middleware/error-handler";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

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
