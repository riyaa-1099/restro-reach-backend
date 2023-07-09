import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
require("dotenv").config();

class AuthenticationMiddleware {
  public authentication = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    let token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    // console.log(token)
    if (token) {
      try {
        const secretKey = process.env.SECRETKEY;
        if (!secretKey) {
          throw new Error("Missing secret key");
        }

        const decoded: JwtPayload | string = jwt.verify(token, secretKey);
        const userID =
          typeof decoded !== "string" && decoded.userID ? decoded.userID : null;
        const isAdmin =
          typeof decoded !== "string" && decoded.isAdmin
            ? decoded.isAdmin
            : false;
        req.body.userID = userID;
        req.body.isAdmin = isAdmin;

        // res.cookie("userID", userID, { maxAge: 3600000, httpOnly: true });
        next();
      } catch (error) {
        res.status(401).send("something wrong");
      }
    } else {
      res.status(401).send("No token provided, cant continue, login first");
    }
  };
}

export default AuthenticationMiddleware;
