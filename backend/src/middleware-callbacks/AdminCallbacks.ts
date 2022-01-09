import AdminService from "../services/AdminService";
import { NextFunction, Request, Response } from "express";

class AdminCallbacks {

  constructor() {

  }

  public getAdmins = async (request: Request<{}, {}, any>, response: Response, next: NextFunction) => {
    return  AdminService.getAdminsWithPersonDetails().then((admins) => {
        return response.json(admins);
    }).catch((error) => {
        return response.json({ error });
    })
  }
}

export default new AdminCallbacks();