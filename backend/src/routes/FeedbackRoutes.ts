import { Router } from 'express';
import FeedbackCallback from '../middleware-callbacks/FeedbackCallback';
import isUserAuthenticated from "../middlewares/check-user-auth";
import { validateBodyParams } from "../middlewares/request-body-validator";
import { CreateFeedbackSchema } from "../utils/schemas/FeedbackSchema.util";

const router = Router();

// create feedback
router.post("/", validateBodyParams(CreateFeedbackSchema), isUserAuthenticated, FeedbackCallback.createFeedback);

export default router;