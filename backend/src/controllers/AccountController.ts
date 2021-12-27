import AccountService from "../services/AccountService";
import { Request, Response } from "express";
import { AccountCreationDto } from "../models/AccountEntity";

class AccountController {
  constructor() {

  }

  public getAccounts = async (_req: Request, res: Response) => {
    try {
      const accounts = await AccountService.getAccounts();
      return res.json({ accounts });
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  }

  public createAccount = async (req: Request<{}, {}, AccountCreationDto>, res: Response) => {
    try {
      const requestBody = req.body;
      const newAccountEntity = await AccountService.createAccountEntity(requestBody);
      const result = await AccountService.saveAccount(newAccountEntity);
      return res.json({ result });

    } catch (error) {
      console.log(error);
    }
    return res.send("could not create Account");
  }
}

export default new AccountController();