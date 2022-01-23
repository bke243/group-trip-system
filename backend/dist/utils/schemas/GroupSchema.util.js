"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGroupSchema = exports.CreateGroupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CreateGroupSchema = joi_1.default.object({
    name: joi_1.default.string().regex(/^[a-zA-Z0-9]{1,30}$/).required(),
    destination: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
});
exports.UpdateGroupSchema = joi_1.default.object({
    // TO DO
    groupId: joi_1.default.number().positive().required(),
    name: joi_1.default.string().regex(/^[a-zA-Z0-9]{1,30}$/).required(),
    destination: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
});
