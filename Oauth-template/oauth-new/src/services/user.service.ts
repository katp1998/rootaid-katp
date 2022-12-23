import { Request, Response } from "express";
import {
  createUser,
  findUserById,
} from "../database/repositories/user.repository";

//Find an existing user or create one:
export const findOrCreateUser = async (
  name: string,
  email: string,
  googleID: string
) => {
  //check if user exists:
  const user = await findUserById(googleID);

  if (user) {
    user
    //generate refresh token:

    //save refresh token:

    return {
      
      
    };

    //accessToken,
    //refreshToken

    //return the existing user:
    return user;
  } else {
    //create new user:
    const newUser = await createUser({ name, email, googleID });
    return { id: newUser._id, accessToken, name: newUser.name, refreshToken };
  }
};

export const refreshTokenHandler = (rq: Request, rs: Response) => {};
