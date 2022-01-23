import AccountService from "../services/AccountService";
import { NextFunction, Request, response, Response } from "express";
import { AccountCreationDto, AccountLoginDto } from "../models/AccountEntity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RESPONSE_STATUS } from "../middlewares/request-body-validator";
import UserService from "../services/UserService";
import PersonService from "../services/PersonService";
import AdminService from "../services/AdminService";

class AccountCallbacks {

  public jwtSecret = "do not do it in production"
  constructor() {

  }

  public getAccounts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const accounts = await AccountService.getAccounts();
      return res.json({ accounts });
    } catch (error) {
      next(error);
    }
  }

  public hasAccountWithSameEmail = async (req: Request<{}, {}, AccountCreationDto>, response: Response, next: NextFunction) => {
    const newUserEmail = req.body.email;
      return  AccountService.findAccountByEmail(newUserEmail).then((user) => {
        if (user) {
          return response.status(RESPONSE_STATUS.CONFLICT).json({ status: RESPONSE_STATUS.CONFLICT, result: "User email is already taken"  }); 
        }
        next();
      }).catch((error) => {
        next(error);
      });
  }

  public postUserSignUp = async (request: Request<{}, {}, AccountCreationDto>, response: Response, next: NextFunction) => {
    const requestBody = request.body;
    return bcrypt.hash(requestBody.password, 13).then(async (hashedPassword) => {
      const updatedRequestBody = { ...requestBody, password: hashedPassword };
      const newAccountEntity = await AccountService.createAccountEntity(updatedRequestBody);
      return  AccountService.saveAccount(newAccountEntity);
      }).then(async (userAccount) => {
        const userEntity = await UserService.createUserEntity(userAccount);
        const personEntity = await PersonService.createPersonEntity(userAccount, requestBody)
        await UserService.saveUser(userEntity);
        await PersonService.savePerson(personEntity);
        const token = jwt.sign({
          email: userAccount.email, userId: userAccount.id 
        }, this.jwtSecret, {
          expiresIn: "24h"
        });

        return response.status(RESPONSE_STATUS.OK).json({ token: `Bearer ${token}`, personData: { email: userAccount.email, id: userAccount.id } });
      }).catch((error) => {
        next(error);
      });
  }

  public postAdminSignUp = async (request: Request<{}, {}, AccountCreationDto>, response: Response, next: NextFunction) => {
    const requestBody = request.body;
    return bcrypt.hash(requestBody.password, 13).then(async (hashedPassword) => {
      const updatedRequestBody = { ...requestBody, password: hashedPassword };
      const newAccountEntity = await AccountService.createAccountEntity(updatedRequestBody);
      return  AccountService.saveAccount(newAccountEntity);
      }).then(async (userAccount) => {
        const adminEntity = await AdminService.createAdminEntity(userAccount);
        const personEntity = await PersonService.createPersonEntity(userAccount, requestBody)
        await AdminService.saveAdmin(adminEntity);
        await PersonService.savePerson(personEntity);
        const token = jwt.sign({
          email: userAccount.email, userId: userAccount.id 
        }, this.jwtSecret, {
          expiresIn: "24h"
        });

        return response.status(RESPONSE_STATUS.OK).json({ token: `Bearer ${token}`, personData: { email: userAccount.email, id: userAccount.id } });
      }).catch((error) => {
        next(error);;
      });
  }

  public postLogin = async (request: Request<{}, {}, AccountLoginDto>, response: Response, next: NextFunction) => {
    const userEmail = request.body.email;
    return AccountService.findAccountByEmail(userEmail).then((user) => {
      if (!user) {
        return response.status(RESPONSE_STATUS.UNAUTHORIZED).json({ status: RESPONSE_STATUS.UNAUTHORIZED, result: "Invalud  email or password" });
      }
      return bcrypt.compare(request.body.password, user.password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign(
          { email: user.email, userId: user.id },
            this.jwtSecret,
          {
            expiresIn: "24h",
          });
          return response.status(RESPONSE_STATUS.OK).json({ token: `Bearer ${token}`,  personData: { email: user.email, id: user.id }});
        }
        return response.status(RESPONSE_STATUS.UNAUTHORIZED).json({ status: RESPONSE_STATUS.UNAUTHORIZED, result: "Invalud  email or password" });
      })
    }).catch((error) => {
      next(error);
    })
  }
}

export default new AccountCallbacks();