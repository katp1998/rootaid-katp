import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  //password: string -> will not be applicable for oauth
  refreshToken: string;
}
export interface IUserInputs {
  username?: string;
  email: string;
  //password:string -> will not be applicable for oauth
}
