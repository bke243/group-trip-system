import { Router, Request, Response, NextFunction } from "express";
import isUserAuthenticated from "../middlewares/check-user-auth";
import { validateBodyParams } from "../middlewares/request-body-validator";
import { CreateGroupSchema, UpdateGroupSchema } from "../utils/schemas/GroupSchema.util";
import GroupUserCallbacks from "../middleware-callbacks/GroupUserCallbacks";
import { AddGroupUserSchema } from "../utils/schemas/GroupUserSchema.util";

const router = Router();

// verify group member 
router.get("/verify/:userId/:groupId", GroupUserCallbacks.verifyUser);


// delete group member
router.delete("/:userId/:groupId", isUserAuthenticated,GroupUserCallbacks.deleteGroupUserByUserId);

// add group member *Todo: ADD NEW API KEY
router.post("/", validateBodyParams(AddGroupUserSchema), isUserAuthenticated, GroupUserCallbacks.addGroupUserByUserEmail);

export default router;
