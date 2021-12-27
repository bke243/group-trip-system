import { Router } from "express";
import AccountController from "../controllers/AccountController";

const router = Router();

// get all accounts to be disabled and removed
router.get("/accounts", AccountController.getAccounts);

// create a user account
router.post("/user/sign-up", AccountController.createAccount);

// create an admin user account that will work only once
router.post("/admin/sign-up", AccountController.createAccount);

export default router;