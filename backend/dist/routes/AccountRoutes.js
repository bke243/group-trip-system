"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AccountController_1 = __importDefault(require("../controllers/AccountController"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
const AccountSchema_util_1 = __importDefault(require("../utils/schemas/AccountSchema.util"));
const router = express_1.Router();
// get all accounts to be disabled and removed
router.get("/accounts", AccountController_1.default.getAccounts);
// create a user account
router.post("/user/sign-up", request_body_validator_1.validateBodyParams(AccountSchema_util_1.default), AccountController_1.default.createAccount);
// create an admin user account that will work only once
router.post("/admin/sign-up", request_body_validator_1.validateBodyParams(AccountSchema_util_1.default), AccountController_1.default.createAccount);
exports.default = router;
