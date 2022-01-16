import { Router } from "express";
import AdminCallbacks from "../middleware-callbacks/AdminCallbacks";
import UserCallbacks from "../middleware-callbacks/UserCallbacks";

import isUserAuthenticated from "../middlewares/check-user-auth";


const router = Router();

// get all users
router.get("/", isUserAuthenticated, AdminCallbacks.isAdminUser, UserCallbacks.getUserWIthPersonalDetails);

// block the user
router.post("/block/:accountId", isUserAuthenticated, AdminCallbacks.isAdminUser,  UserCallbacks.PostLockUser);

// block the user
router.post("/unblock/:accountId", isUserAuthenticated, AdminCallbacks.isAdminUser, UserCallbacks.PostActivateUser);

export default router;