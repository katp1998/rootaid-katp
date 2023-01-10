import { Request, Response, Router } from "express";
import passport from "passport";
import { ensureAuth, ensureGuest } from "../../middleware/auth.middleware";

const router = Router();

//@desc: Authentication with google
//@route: GET api/auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//@desc: Google callback
//@route: GET api/auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate(
    "google",
    {
      failureRedirect: "/",
    },
    (rq: Request, rs: Response) => {
      //successful redirect:
      rs.send("Successfully logged in");
    }
  )
);

//@desc: login
//@route: GET api/auth/
router.get("/", ensureGuest, (rq: Request, rs: Response) => {
  rs.send("This is the login page");
});

//@desc: dashboard
//@route: GET api/auth/dashboard
router.get("/dashboard", ensureAuth, (rq: Request, rs: Response) => {
  rs.send("this is the dashboard");
});

//@desc: logout
//@route: GET api/auth/logout
router.get("/logout");

export default router;
