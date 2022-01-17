import { Router, Request, Response, NextFunction } from "express";
import GroupEntity from "../models/GroupEntity";
import GroupService from "../services/GroupService";
import isUserAuthenticated from "../middlewares/check-user-auth";
import { validateBodyParams } from "../middlewares/request-body-validator";
import { CreateGroupSchema, UpdateGroupSchema } from "../utils/schemas/GroupSchema.util";
import GroupCallbacks from "../middleware-callbacks/GroupCallbacks";

const router = Router();


// get groups
router.get("/",isUserAuthenticated, GroupCallbacks.getGroups);


// create group
router.post("/", isUserAuthenticated, validateBodyParams(CreateGroupSchema), GroupCallbacks.createGroups);

// update group 
router.put("/:groupId", isUserAuthenticated, validateBodyParams(UpdateGroupSchema), GroupCallbacks.updateGroup);

// delete group
router.delete("/:groupId",isUserAuthenticated, GroupCallbacks.deleteGroupById);



export default router;
