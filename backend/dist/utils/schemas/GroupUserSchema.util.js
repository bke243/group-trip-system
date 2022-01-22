"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddGroupUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.AddGroupUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    groupId: joi_1.default.number().positive().required()
});
