import mongoose, { Schema } from "mongoose";
import { Itask } from "../../types/mondgodbTypes";

const TaskSchema: Schema = new Schema({
  name: String,
  completed: Boolean,
});

export default mongoose.model<Itask>("Task", TaskSchema);
