import { saveRefreshToken } from "../../database/repository/user.respository";
import { googleStrategy } from "../../utils/GoogleStrategy";
import { Request, Response } from "express";

const resolvers = {
    findOrCreateUserResolver: async (req: Request, res: Response, callback: any) => {
      googleStrategy.authenticate(req, (error: any, user: any, info: any) => {
        if (error) return callback(error);
        if (!user) return res.redirect("/login"); //this part need to figure out in gql sense

        // Save the access and refresh tokens in the database
        saveRefreshToken(user.id, info.refresh_token);

        // Set the refresh token as a cookie
        res.cookie("refresh_token", info.refresh_token, {
          httpOnly: true,
          secure: true, // in production, you should use https
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        });
      });
    },
  };

export default resolvers;
