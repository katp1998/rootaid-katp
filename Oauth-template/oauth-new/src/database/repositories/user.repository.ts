import User from "../models/user.model";
import { IUserInputs } from "../types/user.types";

//create user:
export const createUser = async ({ name, email, googleID }: IUserInputs) => {
  try {
    //create user:
    const newUser = new userModel({
      name,
      email,
      googleID,
    });

    const userResult = await newUser.save();
    return userResult;
  } catch (error) {
    return error;
  }
};

//find user by GoogleID:
export const findUserById = async (googleID: string) => {
  try {
    const existingUser = await User.findOne({ googleID: googleID });
    //console.log({ existingUser });
    return existingUser;
  } catch (error) {
    return {
      error: "error",
    };
  }
};

//find user by email:
export const findUser = async (email: string) => {
  try {
    const existingUser = await User.findOne({ email: email });
    return existingUser;
  } catch (error) {}
};

//find user by token:
export const findUserByToken = async (refreshToken: any) => {
  try {
    const existingUser = await User.findOne({
      refreshToken: refreshToken,
    });
    return existingUser;
  } catch (error) {}
};

//save refresh token:
export const saveRefreshToken = async (
  googleID: string,
  refreshToken: string
) => {
  const user = await User
    .findById(googleID)
    .findOneAndUpdate({ refreshToken: refreshToken });

  const result = await user?.save();
  //  console.log(result)
};

//remove refresh token:
export const removeRefreshToken = async (refreshToken: string) => {
  try {
    const user = await findUserByToken(refreshToken);
    if (user) {
      user.refreshToken = "";
      const result = await user.save();
      console.log(result);
    }
  } catch (error) {}
};
