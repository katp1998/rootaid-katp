import { Request, Response } from "express";
import { logIn, signUp } from "../../services/user.service";

//Interfaces:
//Register request interface:
export interface RegisterInputs {
  name: string;
  email: string;
  googleID: string;
}

export interface LoginInputs {
  googleID: string;
  email: string;
}

export const handleLoginUser = async (
  userInputs: LoginInputs,
  rs: Response
) => {
  try {
    const { googleID, email } = userInputs;
    const data = await logIn(googleID, email);
    //rs.cookie('auth', data.)
  } catch (error) {}
};

export const handleCreateUser = async (userInputs: RegisterInputs) => {
  const { name, email, googleID } = userInputs;

  try {
    //pass userInputs to user.service.ts:
    const data = await signUp(name, email, googleID);
    // rs.cookie("auth", data.refreshToken, {
    //   httpOnly: true,
    //   sameSite: "none",
    //   maxAge: 24 * 60 * 60 * 1000,
    // });
    return data;
  } catch (error) {}

  //if user exists:
  // res.cookie('jwt',data.refreshToken, {httpOnly:true , sameSite:'none', maxAge:24*60*60*1000})

  //if the user doesnt exist, create an user account:
  // res.cookie('jwt',data.refreshToken, {httpOnly:true , sameSite:'none', maxAge:24*60*60*1000})
};

export const refreshToken = (rq: Request, rs: Response) => {
  const cookies = rq.cookies;
  //check if there are any cookies:

  //setting the refresh token:
};

export const logoutUser = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const findUser = logout(refreshToken);
  if (!findUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  return res.sendStatus(204);
};
