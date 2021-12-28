import { Router } from "express";
import AccountController from "../controllers/AccountController";
import { validateBodyParams } from "../middlewares/request-body-validator";
import AccountSchema from "../utils/schemas/AccountSchema.util";

const router = Router();

// get all accounts to be disabled and removed
router.get("/accounts", AccountController.getAccounts);

// create a user account
router.post("/user/sign-up", validateBodyParams(AccountSchema),AccountController.createAccount);

// create an admin user account that will work only once
router.post("/admin/sign-up", validateBodyParams(AccountSchema), AccountController.createAccount);

export default router;