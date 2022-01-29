import { Router, Request, Response, NextFunction } from "express";
import GroupEntity from "../models/GroupEntity";
import GroupService from "../services/GroupService";
import isUserAuthenticated from "../middlewares/check-user-auth";
import { validateBodyParams } from "../middlewares/request-body-validator";
import { CreateGroupSchema, UpdateGroupSchema } from "../utils/schemas/GroupSchema.util";
import GroupCallbacks from "../middleware-callbacks/GroupCallbacks";
import GroupUserCallbacks from "../middleware-callbacks/GroupUserCallbacks";

const router = Router();


// get groups
router.get("/", isUserAuthenticated, GroupCallbacks.getGroups);

// create group
router.post("/", validateBodyParams(CreateGroupSchema), isUserAuthenticated, GroupCallbacks.createGroups);

// update group 
router.put("/:groupId", validateBodyParams(UpdateGroupSchema), isUserAuthenticated, GroupCallbacks.updateGroup);

// delete group
router.delete("/:groupId", isUserAuthenticated, GroupCallbacks.deleteGroupById);

// get all group users
router.get("/:groupId/users", isUserAuthenticated, GroupUserCallbacks.getAlGroupMemebers);



export default router;
