import express from "express";
import dotenv from "dotenv";
import connection from "./database/connection";
import userRoutes from "./api/routes/user.routes";
import passport from "passport";

dotenv.config();
const PORT = 3000; //add process.env.PORT
import "./strategies/google";


//express middleware
const app = express();


//passport middleware:
app.use(passport.initialize());
app.use(passport.session());

//Adding user routes:
app.use("/api/auth", userRoutes);

//connecting to database:
connection();

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
