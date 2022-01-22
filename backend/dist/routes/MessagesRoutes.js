"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminCallbacks_1 = __importDefault(require("../middleware-callbacks/AdminCallbacks"));
const MessagesCallbacks_1 = __importDefault(require("../middleware-callbacks/MessagesCallbacks"));
const check_user_auth_1 = __importDefault(require("../middlewares/check-user-auth"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
const MessageSchema_util_1 = require("../utils/schemas/MessageSchema.util");
const router = (0, express_1.Router)();
router.post("/admin", (0, request_body_validator_1.validateBodyParams)(MessageSchema_util_1.MessageSchema), check_user_auth_1.default, AdminCallbacks_1.default.isAdminUser, MessagesCallbacks_1.default.createMessage);
router.get("/", check_user_auth_1.default, MessagesCallbacks_1.default.getAllMessages);
router.get("/:userOrAdminId", check_user_auth_1.default, MessagesCallbacks_1.default.getAllMessagesByUserOrAdmin);
exports.default = router;
