"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePackageSchema = exports.CreatePackageSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CreatePackageSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    activities: joi_1.default.array().items(joi_1.default.string()).min(1).required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().positive().required(),
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().required(),
    count: joi_1.default.number().positive().required(),
    maxPersons: joi_1.default.number().positive().required(),
    country: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    streetName: joi_1.default.string().required(),
    zipCode: joi_1.default.string().allow(null),
    state: joi_1.default.string().allow(null),
});
exports.UpdatePackageSchema = joi_1.default.object({
    id: joi_1.default.number().positive().required(),
    name: joi_1.default.string().required(),
    activities: joi_1.default.array().items(joi_1.default.string()).min(1).required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().positive().required(),
    created: joi_1.default.date().required(),
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().required(),
    count: joi_1.default.number().positive().required(),
    maxPersons: joi_1.default.number().positive().required(),
    adminId: joi_1.default.number().positive().required(),
    locationId: joi_1.default.number().positive().required(),
    country: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    streetName: joi_1.default.string().required(),
    zipCode: joi_1.default.string(),
    state: joi_1.default.string(),
});
