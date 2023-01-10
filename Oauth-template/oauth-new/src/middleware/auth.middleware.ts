//protected routes:
import { NextFunction, Request, Response } from "express";

export const ensureAuth = (rq: Request, rs: Response, next: NextFunction) => {
  if (rq.isAuthenticated()) {
    //if the user is authenticated:
    return next();
  } else {
    //or else redirect to homepage:
    rs.redirect("/");
  }
};

export const ensureGuest = (rq: Request, rs: Response, next: NextFunction) => {
  if (rq.isAuthenticated()) {
    rs.redirect("/success");
  } else {
    return next();
  }
};
