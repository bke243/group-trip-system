import { CreatePurchaseSchema } from './../utils/schemas/PurchaseSchema.util';
import { Router } from 'express';
import isUserAuthenticated from "../middlewares/check-user-auth";
import { validateBodyParams } from "../middlewares/request-body-validator";
import PurchaseCallback from '../middleware-callbacks/PurchaseCallback';

const router = Router();

// create purchase/order
router.post("/", validateBodyParams(CreatePurchaseSchema), isUserAuthenticated, PurchaseCallback.createPurchase);

export default router;