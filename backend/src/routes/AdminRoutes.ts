import { Router } from "express";
import AdminCallbacks from "../middleware-callbacks/AdminCallbacks";

import isUserAuthenticated from "../middlewares/check-user-auth";


const router = Router();

// get all locations
router.get("/", isUserAuthenticated, AdminCallbacks.getAdmins);

export default router;