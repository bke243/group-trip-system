import { Router } from "express";
import LocationCallbacks from "../middleware-callbacks/LocationCallbacks";

import isUserAuthenticated from "../middlewares/check-user-auth";


const router = Router();

// get all locations
router.get("/", isUserAuthenticated, LocationCallbacks.getLocations);

export default router;