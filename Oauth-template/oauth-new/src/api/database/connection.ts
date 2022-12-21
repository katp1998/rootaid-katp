import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongo_uri =
  "mongodb+srv://kethmieperera:kat123@kattesting.xeri85k.mongodb.net/test" ||
  process.env.MONGO_URI;

export default () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(`${mongo_uri}`);
  console.log("Database Connected");

  mongoose.connection.on("error", (e) => {
    console.error(`Database connection unsuccessful: Error ${e}`);
  });
};
