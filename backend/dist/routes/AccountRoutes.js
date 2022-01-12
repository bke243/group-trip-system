"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AccountCallbacks_1 = __importDefault(require("../middleware-callbacks/AccountCallbacks"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
const AccountSchema_util_1 = require("../utils/schemas/AccountSchema.util");
const router = (0, express_1.Router)();
// get all accounts to be disabled and removed
router.get("/accounts", AccountCallbacks_1.default.getAccounts);
// create a user account
router.post("/signup", (0, request_body_validator_1.validateBodyParams)(AccountSchema_util_1.AccountSingUpSchema), AccountCallbacks_1.default.hasAccountWithSameEmail, AccountCallbacks_1.default.postUserSignUp);
// create an admin user account that will work only once
router.post("/admin/signup", (0, request_body_validator_1.validateBodyParams)(AccountSchema_util_1.AccountSingUpSchema), AccountCallbacks_1.default.hasAccountWithSameEmail, AccountCallbacks_1.default.postAdminSignUp);
// autehnticate the user and return a the user
router.post("/login", (0, request_body_validator_1.validateBodyParams)(AccountSchema_util_1.AccountLoginSchema), AccountCallbacks_1.default.postLogin);
exports.default = router;
