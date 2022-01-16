import AdminService from "../services/AdminService";
import { NextFunction, Request, Response } from "express";
import { AccountLoginDto } from "../models/AccountEntity";
import AccountService from "../services/AccountService";
import { RESPONSE_STATUS } from "../middlewares/request-body-validator";
import { UserAccountData } from "../middlewares/check-user-auth";

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

  public isAdminUser = async (request: Request<{}, {}, { userAccountData: UserAccountData }>, response: Response, next: NextFunction) => {
    const userEmail = request.body.userAccountData?.email;
      try {
        const userAccount = await AccountService.findAccountByEmail(userEmail);
        if (!userAccount) return response.status(RESPONSE_STATUS.UNAUTHORIZED).json({ status: RESPONSE_STATUS.UNAUTHORIZED, result: "Not 1 Authorized" });
        const adminUser = await AdminService.findAdminByAccountId(userAccount.id);
        if (!adminUser) response.status(RESPONSE_STATUS.UNAUTHORIZED).json({ status: RESPONSE_STATUS.UNAUTHORIZED, result: "Not Authorized" });
      } catch(error) {
      
        return response.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: error });
      }
      next();
  }
}

export default new AdminCallbacks();