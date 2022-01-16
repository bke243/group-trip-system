import UserService from "../services/UserService";
import { NextFunction, Request, Response } from "express";

class UserCallbacks {

  constructor() {

  }

  public getUserWIthPersonalDetails = async (request: Request<{}, {}, any>, response: Response, next: NextFunction) => {
    return  UserService.getUserWIthPersonalDetails().then((admins) => {
        return response.json(admins);
    }).catch((error) => {
        return response.json({ error });
    })
  }
}

export default new UserCallbacks();