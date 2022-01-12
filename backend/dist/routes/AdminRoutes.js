"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminCallbacks_1 = __importDefault(require("../middleware-callbacks/AdminCallbacks"));
const check_user_auth_1 = __importDefault(require("../middlewares/check-user-auth"));
const router = (0, express_1.Router)();
// get all locations
router.get("/", check_user_auth_1.default, AdminCallbacks_1.default.getAdmins);
exports.default = router;
