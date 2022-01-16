"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminCallbacks_1 = __importDefault(require("../middleware-callbacks/AdminCallbacks"));
const UserCallbacks_1 = __importDefault(require("../middleware-callbacks/UserCallbacks"));
const check_user_auth_1 = __importDefault(require("../middlewares/check-user-auth"));
const router = (0, express_1.Router)();
// get all users
router.get("/", check_user_auth_1.default, AdminCallbacks_1.default.isAdminUser, UserCallbacks_1.default.getUserWIthPersonalDetails);
// block the user
router.post("/block/:accountId", check_user_auth_1.default, AdminCallbacks_1.default.isAdminUser, UserCallbacks_1.default.PostLockUser);
// block the user
router.post("/unblock/:accountId", check_user_auth_1.default, AdminCallbacks_1.default.isAdminUser, UserCallbacks_1.default.PostActivateUser);
exports.default = router;
