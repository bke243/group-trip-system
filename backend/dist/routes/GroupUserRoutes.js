"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_user_auth_1 = __importDefault(require("../middlewares/check-user-auth"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
const GroupUserCallbacks_1 = __importDefault(require("../middleware-callbacks/GroupUserCallbacks"));
const GroupUserSchema_util_1 = require("../utils/schemas/GroupUserSchema.util");
const router = (0, express_1.Router)();
// verify group member 
router.get("/verify/:userId/:groupId", GroupUserCallbacks_1.default.verifyUser);
// delete group member
router.delete("/:userId/:groupId", check_user_auth_1.default, GroupUserCallbacks_1.default.deleteGroupUserByUserId);
// add group member *Todo: ADD NEW API KEY
router.post("/", (0, request_body_validator_1.validateBodyParams)(GroupUserSchema_util_1.AddGroupUserSchema), check_user_auth_1.default, GroupUserCallbacks_1.default.addGroupUserByUserEmail);
exports.default = router;
