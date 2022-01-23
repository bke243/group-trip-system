"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FeedbackCallbacks_1 = __importDefault(require("../middleware-callbacks/FeedbackCallbacks"));
const check_user_auth_1 = __importDefault(require("../middlewares/check-user-auth"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
const FeedbackSchema_util_1 = require("../utils/schemas/FeedbackSchema.util");
const router = (0, express_1.Router)();
// create feedback
router.post("/", (0, request_body_validator_1.validateBodyParams)(FeedbackSchema_util_1.CreateFeedbackSchema), check_user_auth_1.default, FeedbackCallbacks_1.default.createFeedback);
exports.default = router;
