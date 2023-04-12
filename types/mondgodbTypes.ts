import { Document } from "mongoose";

export interface Itask extends Document {
  name: string;
  completed: boolean;
}
