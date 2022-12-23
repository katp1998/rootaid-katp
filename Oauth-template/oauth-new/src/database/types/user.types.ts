import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  googleID: string;
  refreshToken: string;
}

export interface IUserInputs {
  name?: string;
  email: string;
  googleID: string;
}
