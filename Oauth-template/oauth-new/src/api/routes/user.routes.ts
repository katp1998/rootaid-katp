import { Request, Response, Router } from "express";
import passport from "passport";
import { findOrCreateUser } from "../controllers/user.controller";

const router = Router();

//@desc: Authentication with google
//@route: GET /auth/google
router.get(
  "/google",
  passport.authenticate(
    "google",
    { scope: ["email", "profile"] },
    findOrCreateUser
  )
);

//@desc: Google callback
//@route: GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate(
    "google",
    {
      failureRedirect: "/google/login",
    },
    (rq: Request, rs: Response) => {
      //successful redirect:
      rs.send("Successfully logged in");
    }
  )
);

export default router;
