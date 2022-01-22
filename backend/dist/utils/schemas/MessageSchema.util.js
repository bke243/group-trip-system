"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.MessageSchema = joi_1.default.object({
    content: joi_1.default.string().required(),
    receiverId: joi_1.default.number().positive(),
});
