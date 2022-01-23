import { Router } from "express";
import FeedbackCallbacks from "../middleware-callbacks/FeedbackCallbacks";
import isUserAuthenticated from "../middlewares/check-user-auth";
import { validateBodyParams } from "../middlewares/request-body-validator";
import { CreateFeedbackSchema } from "../utils/schemas/FeedbackSchema.util";

const router = Router();

// create feedback
router.post("/", validateBodyParams(CreateFeedbackSchema), isUserAuthenticated, FeedbackCallbacks.createFeedback);

export default router;