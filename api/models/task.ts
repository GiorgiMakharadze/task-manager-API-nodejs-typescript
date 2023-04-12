import mongoose, { Schema } from "mongoose";
import { Itask } from "../../types/mondgodbTypes";

const TaskSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<Itask>("Task", TaskSchema);
