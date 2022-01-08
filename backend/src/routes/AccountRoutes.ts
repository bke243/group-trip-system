import { Router } from "express";
import AccountCallbacks from "../middleware-callbacks/AccountCallbacks";
import { validateBodyParams } from "../middlewares/request-body-validator";
import { AccountLoginSchema, AccountSingUpSchema } from "../utils/schemas/AccountSchema.util";

const router = Router();

// get all accounts to be disabled and removed
router.get("/accounts", AccountCallbacks.getAccounts);

// create a user account
router.post("/user/signup", validateBodyParams(AccountSingUpSchema), AccountCallbacks.hasAccountWithSameEmail, AccountCallbacks.postUserSignUp);

// create an admin user account that will work only once
router.post("/admin/signup", validateBodyParams(AccountSingUpSchema), AccountCallbacks.hasAccountWithSameEmail, AccountCallbacks.postAdminSignUp);

// autehnticate the user and return a the user
router.post("/login", validateBodyParams(AccountLoginSchema), AccountCallbacks.postLogin);

export default router;