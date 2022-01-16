import { Router } from "express";
import UserCallbacks from "../middleware-callbacks/UserCallbacks";

import isUserAuthenticated from "../middlewares/check-user-auth";


const router = Router();

// get all users
router.get("/", isUserAuthenticated, UserCallbacks.getUserWIthPersonalDetails);

// block the user
router.post("/block/:accountId", isUserAuthenticated, UserCallbacks.PostLockUser);

// block the user
router.post("/unblock/:accountId", isUserAuthenticated, UserCallbacks.PostActivateUser);

export default router;