import { Router, Request, Response, NextFunction } from "express";
import GroupEntity from "../models/GroupEntity";
import GroupService from "../services/GroupService";
import isUserAuthenticated from "../middlewares/check-user-auth";
import { validateBodyParams } from "../middlewares/request-body-validator";
import { CreateGroupSchema, UpdateGroupSchema } from "../utils/schemas/GroupSchema.util";
import GroupCallbacks from "../middleware-callbacks/GroupCallbacks";

const router = Router();



// create group
// isUserAuthenticated is omitted for testing purposes
router.post("/", validateBodyParams(CreateGroupSchema), GroupCallbacks.createGroups);

// update group 
// isUserAuthenticated is omitted for testing purposes
router.put("/:groupId", validateBodyParams(UpdateGroupSchema), GroupCallbacks.updateGroup);

// TODO delete
// isUserAuthenticated is omitted for testing purposes 
// router.delete("/:groupId", GroupCallbacks.deleteGroupById);



export default router;
