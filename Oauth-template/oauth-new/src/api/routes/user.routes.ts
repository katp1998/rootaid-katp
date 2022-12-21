import { Router } from "express";
import passport from "passport";

const router = Router();

//@desc: Authentication with google
//@route: GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//@desc: Google callback
//@route: GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: '/',
    successRedirect: '/success'
  })
);

export default router;
