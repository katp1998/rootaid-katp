import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  findUserByToken,
  saveRefreshToken,
} from "../../database/repository/user.respository";
import { findOrCreateUser } from "../../services/user.service";
import config from "../../config";
import { Request, response, Response } from "express";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

// Set up Google OAuth strategy
const googleStrategy = new GoogleStrategy(
  {
    clientID: config.googleClient as string,
    clientSecret: config.googleClientSecret as string,
    callbackURL: config.googleRedirect,
  },
  async (
    accessToken: any,
    refreshToken: string,
    profile: any,
    callback: any
  ) => {
    try {
      // Find or create the user in the database
      const user = await findOrCreateUser(profile);
      // Save the access and refresh tokens in the database
      await saveRefreshToken(profile.id, refreshToken);
      return callback(null, user);
    } catch (error: any) {
      return callback(error);
    }
  }
);

// Handle the authentication process
export const findOrCreateUserController = (
  rq: Request,
  rs: Response,
  callback: any
) => {
  googleStrategy.authenticate(rq, (err: any, user: any, info: any) => {
    if (err) return callback(err);
    if (!user) return rs.redirect("/login"); //this part need to figure out in gql sense

    // Save the access and refresh tokens in the database
    saveRefreshToken(user.id, info.refresh_token);

    // Set the refresh token as a cookie
    rs.cookie("refresh_token", info.refresh_token, {
      httpOnly: true,
      secure: true, // in production, you should use https
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });
  });
};
