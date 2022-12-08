import { generateToken, validatePassword } from "../../utils/index";
import { generatePassword } from "../../utils/index";
import {
  findUser,
  createUser,
} from "../../database/repositories/user.repository";

const registerUser = async (name: string, email: string, password: string) => {
  try {
    //CHECK IF USER EXISTS:
    

    //if (!userExists) {
      

      //creating user in database (user.repository):


    //} else
      return {message: 'user exists, please login'}
    
  } catch (error) {
    //ERRORS THROWN WHEN REGISTERING USER WAS UNSUCCESSFUL:
    console.log(error);
    return {message: 'error in registering user, thrown from user.service.ts'};
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    //CHECK IF USER EXISTS:

    //if (!userExists) {
      //COMPARE PASSWORDS:
      
      
      //if (validatedPassword) {
        //IF THE PASSWORD IS CORRECT:
    

      //} else {
        //IF THE USER IS NOT CORRECT:
        return { error: "Incorrect Password" };
  
    //} else {
      //IF USER DOESNT EXIST
      return { error: " User not registered " };

  } catch (error) {
    return error;
  }
};

export { registerUser, loginUser };
