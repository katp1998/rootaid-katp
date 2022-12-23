import { Request, Response, Router } from "express";
import passport from "passport";
import { findOrCreateUser } from "../controllers/user.controller";

const router = Router();

//@desc: Authentication with google
//@route: GET /auth/google
router.get(
  "/google/login",
  passport.authenticate("google", { scope: ["email", "profile"]}, findOrCreateUser)
);

//@desc: Google callback
//@route: GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/google/login",
    successRedirect: "/success",
  })
);

//@desc: successfully authenticated
//@route: GET /auth/success
router.get("/success", (rq: Request, rs: Response) => {
  rs.send("successfully authenticated");
});

export default router;
