import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export default {
  dbURL: process.env.DATABASE_URL,
  port: process.env.PORT,
  accessTokenKey: process.env.ACCESS_TOKEN_SECRET_KEY,
  refreshTokenKey: process.env.REFRESH_TOKEN_SECRET_KEY,
  salt: process.env.SALT,
  googleClient: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRedirect: process.env.GOOGLE_CLIENT_REDIRECT,
};
