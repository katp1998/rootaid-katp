import { Request, Response } from "express";
import {
  createUser,
  findUserById,
} from "../database/repositories/user.repository";

//Login:
export const logIn = async (googleID: string, email: string) => {};

//Register a user:
export const signUp = async (name: string, email: string, googleID: string) => {
  //check if user exists:
  const user = await findUserById(googleID);

  if (!user) {
    //create a user:
    const newUser = await createUser({ name, email, googleID });

    //generate refresh token:

    //save refresh token:

    //accessToken,
    //refreshToken

    //return the existing user:
    return {};
  } else {
    //create new user:
    const newUser = await createUser({ name, email, googleID });
    return { id: newUser._id, accessToken, name: newUser.name, refreshToken };
  }
};

export const refreshTokenHandler = (rq: Request, rs: Response) => {};

export const logout =async (refreshToken : string) => {
    
  await removeRefreshToken(refreshToken)

}