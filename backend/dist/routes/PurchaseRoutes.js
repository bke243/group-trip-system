"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PurchaseSchema_util_1 = require("./../utils/schemas/PurchaseSchema.util");
const express_1 = require("express");
const PurchaseCallbacks_1 = __importDefault(require("../middleware-callbacks/PurchaseCallbacks"));
const check_user_auth_1 = __importDefault(require("../middlewares/check-user-auth"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
const router = (0, express_1.Router)();
// create purchase/order
router.post("/", (0, request_body_validator_1.validateBodyParams)(PurchaseSchema_util_1.CreatePurchaseSchema), check_user_auth_1.default, PurchaseCallbacks_1.default.createPurchase);
exports.default = router;
