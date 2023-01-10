import e from "express";
import passport from "passport";
import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { handleCreateUser } from "../api/controllers/user.controller";
import User from "../database/models/user.model";
import { IUserInputs } from "../database/types/user.types";

passport.serializeUser((user: any, done) => {
  done(null, user.googleID);
});

passport.deserializeUser((user: IUserInputs, done) => {
  User.find({ googleID: user.googleID }, (error: any, user: IUserInputs) =>
    done(error, user)
  );
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "620068405520-jvrahi87k6vus644tm3guu79jv11knut.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/api/auth/google/callback",
      scope: ["email", "profile"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      const newUser = {
        name: profile.displayName,
        email: profile._json.email!,
        googleID: profile.id,
      };
      try {
        //check if user exists:
        const userExists = await User.findOne({ googleID: profile.id });

        if (!userExists) {
          //Create user:
          const user = await handleCreateUser(newUser);
          done(null, user);
        } else {
          //return null:
          done(null, userExists);
        }
      } catch (error) {
        console.log("Shit happened!");
        console.log(error);
      }
    }
  )
);
