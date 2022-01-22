"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchaseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CreatePurchaseSchema = joi_1.default.object({
    group_id: joi_1.default.number().positive().required(),
    package_id: joi_1.default.number().positive().required(),
    payment_details: joi_1.default.object({
        card_number: joi_1.default.string().length(16).required(),
        expiry_month: joi_1.default.number().min(1).max(12).required(),
        expiry_year: joi_1.default.number().min(Number(new Date().getFullYear().toString().substr(-2))).max(50).required(),
        cvc: joi_1.default.string().length(3).required()
    }).required()
});
