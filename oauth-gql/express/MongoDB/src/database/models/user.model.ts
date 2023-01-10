import { model, Schema } from "mongoose";
import { IUser } from "../types/user.type";

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  refreshToken: { type: String },
});

export default model<IUser>("User", userSchema);
