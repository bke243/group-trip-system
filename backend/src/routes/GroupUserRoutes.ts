import { Router, Request, Response, NextFunction } from "express";
import isUserAuthenticated from "../middlewares/check-user-auth";
import { validateBodyParams } from "../middlewares/request-body-validator";
import { CreateGroupSchema, UpdateGroupSchema } from "../utils/schemas/GroupSchema.util";
import GroupUserCallbacks from "../middleware-callbacks/GroupUserCallbacks";
import { AddGroupUserSchema } from "../utils/schemas/GroupUserSchema.util";

const router = Router();


// delete group member
router.delete("/:userId",isUserAuthenticated, GroupUserCallbacks.deleteGroupUserByUserId);

// add group member
router.post("/", validateBodyParams(AddGroupUserSchema), GroupUserCallbacks.addGroupUserByUserEmail);

export default router;
