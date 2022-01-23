"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFeedbackSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CreateFeedbackSchema = joi_1.default.object({
    group_id: joi_1.default.number().positive().required(),
    package_id: joi_1.default.number().positive().required(),
    feedback: joi_1.default.string().min(1).required()
});
