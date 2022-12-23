import { model, Schema } from "mongoose";
import { IUser } from '../types/user.types'

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleID: { type: String, required: true },
  refreshToken : {default: '',  type: String, required:false}
  
});

export default model<IUser>("User", userSchema);