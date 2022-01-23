"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_user_auth_1 = __importDefault(require("../middlewares/check-user-auth"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
const GroupSchema_util_1 = require("../utils/schemas/GroupSchema.util");
const GroupCallbacks_1 = __importDefault(require("../middleware-callbacks/GroupCallbacks"));
const router = (0, express_1.Router)();
// get groups
router.get("/", check_user_auth_1.default, GroupCallbacks_1.default.getGroups);
// create group
router.post("/", (0, request_body_validator_1.validateBodyParams)(GroupSchema_util_1.CreateGroupSchema), check_user_auth_1.default, GroupCallbacks_1.default.createGroups);
// update group 
router.put("/:groupId", (0, request_body_validator_1.validateBodyParams)(GroupSchema_util_1.UpdateGroupSchema), check_user_auth_1.default, GroupCallbacks_1.default.updateGroup);
// delete group
router.delete("/:groupId", check_user_auth_1.default, GroupCallbacks_1.default.deleteGroupById);
exports.default = router;
