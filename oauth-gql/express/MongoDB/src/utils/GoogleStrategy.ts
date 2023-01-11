import config from "../config";
import { saveRefreshToken } from "../database/repository/user.respository";
import { findOrCreateUser } from "../services/user.service";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import resolvers from "../graphql/resolvers/user.resolver";

// Set up Google OAuth strategy
export const googleStrategy = new GoogleStrategy(
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
      // Find or create the user in the database !! need to figure out if these are combined in service level or resolver level
      const user = await resolvers.findOrCreateUserResolver(
        profile,
        accessToken,
        callback
      );
      // Save the access and refresh tokens in the database
      await saveRefreshToken(profile.id, refreshToken);
      return callback(null, user);
    } catch (error: any) {
      return callback(error);
    }
  }
);
