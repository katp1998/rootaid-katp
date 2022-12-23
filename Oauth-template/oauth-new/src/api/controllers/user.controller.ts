import { Request, Response } from "express";
import { findOrCreateUser } from "../../services/user.service";

//Interfaces:
//Register request interface:
export interface RegisterInputs {
  name: string;
  email: string;
  googleID: string;
}

export const handleFindCreateUser = async (rq: Request, rs: Response) => {
  try {
    const { name, email, googleID } = rq.body;
    const data = await findOrCreateUser(name, email, googleID);
    rs.cookie("auth", data.refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
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
