import passport from "passport";
import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "620068405520-jvrahi87k6vus644tm3guu79jv11knut.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/callback",
      scope: ["email", "profile"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      console.log(profile);
        
    }
  )
);
