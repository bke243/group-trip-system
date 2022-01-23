import { CreatePurchaseSchema } from './../utils/schemas/PurchaseSchema.util';
import { Router } from "express";
import PurchaseCallbacks from "../middleware-callbacks/PurchaseCallbacks";
import isUserAuthenticated from "../middlewares/check-user-auth";
import { validateBodyParams } from "../middlewares/request-body-validator";

const router = Router();

// create purchase/order
router.post("/", validateBodyParams(CreatePurchaseSchema), isUserAuthenticated, PurchaseCallbacks.createPurchase);

export default router;