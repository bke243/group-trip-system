"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountLoginSchema = exports.AccountSingUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.AccountSingUpSchema = joi_1.default.object({
    password: joi_1.default.string().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string(),
    telephone: joi_1.default.string(),
    email: joi_1.default.string().email().required(),
    birthDate: joi_1.default.string(),
});
exports.AccountLoginSchema = joi_1.default.object({
    password: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
});
