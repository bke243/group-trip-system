import { Router } from "express";
import AdminCallbacks from "../middleware-callbacks/AdminCallbacks";
import MessagesCallbacks from "../middleware-callbacks/MessagesCallbacks";

import isUserAuthenticated from "../middlewares/check-user-auth";
import { validateBodyParams } from "../middlewares/request-body-validator";
import { MessageSchema } from "../utils/schemas/MessageSchema.util";
import { UserMessageSchema } from "../utils/schemas/UserMessageSchema.util";



const router = Router();



router.post("/admin", validateBodyParams(MessageSchema), isUserAuthenticated,  AdminCallbacks.isAdminUser,MessagesCallbacks.createMessage);

router.post("/user", validateBodyParams(UserMessageSchema), isUserAuthenticated,  MessagesCallbacks.createMessageForUser);

router.get("/", isUserAuthenticated, MessagesCallbacks.getAllMessages);

router.get("/:userOrAdminId", isUserAuthenticated, MessagesCallbacks.getAllMessagesByUserOrAdmin);


export default router;