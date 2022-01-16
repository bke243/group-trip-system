import UserService from "../services/UserService";
import { NextFunction, Request, Response } from "express";
import AccountService from "../services/AccountService";
import { RESPONSE_STATUS } from "../middlewares/request-body-validator";
import { UserAccountData } from "../middlewares/check-user-auth";

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

  public PostLockUser = async (request: Request<{ accountId: string }, {}, { userAccountData: UserAccountData }>, response: Response, next: NextFunction) => {
    const accountId = request.params?.accountId;
    if (!this.isNumber(accountId)) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the user id or improper data type"});
    return AccountService.findAccountById(accountId).then(async (userAccount) => {
      if (!userAccount) return response.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "User not found "});
      const blockedUser = await AccountService.blockUserById(userAccount.id);
      return response.json(blockedUser);
    }).catch((error) => {
      return response.json({ result: error });
    });
  }

  public PostActivateUser = async (request: Request<{ accountId: string }, {}, { userAccountData: UserAccountData }>, response: Response, next: NextFunction) => {
    const accountId = request.params?.accountId;
    if (!this.isNumber(accountId)) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({ message: "Missing the user id or improper data type"});
    return AccountService.findAccountById(accountId).then(async (userAccount) => {
      if (!userAccount) return response.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "User not found "});
      const blockedUser = await AccountService.activateUserById(userAccount.id);
      return response.json(blockedUser);
    }).catch((error) => {
      return response.json({ result: error });
    });
  }

  private  isNumber = (value: string | number) =>{
    return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
 }
}

export default new UserCallbacks();