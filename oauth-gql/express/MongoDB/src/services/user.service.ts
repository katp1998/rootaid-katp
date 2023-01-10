import {
  findUser,
  createUser,
  findUserById,
} from "../database/repository/user.respository";
import { IUserInputs } from "../database/types/user.type";

//findorcreateuser:

export const findOrCreateUser = async (profile: any) => {
  try {
    //check if the user already exists:
    const existingUser = await findUser(profile.emails[0].value);
    if (!existingUser) {
        //create a new user:
        const newUser: IUserInputs = {
        username: profile.displayName,
        email: profile.emails[0].value,
      };
      const createdNewUser = await createUser(newUser);
      return createdNewUser;
      
    } else {
      //return the existing user:
      return existingUser;
    }
  } catch (error) {
    return error;
  }
};
