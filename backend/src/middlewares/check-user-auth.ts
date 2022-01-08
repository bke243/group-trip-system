import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import AccountCallbacks from "../middleware-callbacks/AccountCallbacks";
import { RESPONSE_STATUS } from "./request-body-validator";

const isUserAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const authorization = req.headers.authorization ? req.headers.authorization.split(" ")[1] : "";
    const decoded: any = await jwt.verify(authorization, AccountCallbacks.jwtSecret);  
    req.body.userAccountData = { ...decoded, userAccountId: decoded.userId };
    next();
  } catch(error) {
    res.status(RESPONSE_STATUS.UNAUTHORIZED).json({messagr: "Unauthorized"});
  }
};

export interface UserAccountData {
  email: string;
  userAccountId: number;
}

export default isUserAuthenticated;