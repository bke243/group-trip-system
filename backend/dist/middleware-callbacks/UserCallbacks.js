"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
const AccountService_1 = __importDefault(require("../services/AccountService"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
class UserCallbacks {
    constructor() {
        this.getUserWIthPersonalDetails = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            return UserService_1.default.getUserWIthPersonalDetails().then((admins) => {
                return response.json(admins);
            }).catch((error) => {
                return response.json({ error });
            });
        });
        this.PostLockUser = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const accountId = (_a = request.params) === null || _a === void 0 ? void 0 : _a.accountId;
            if (!this.isNumber(accountId))
                return response.status(request_body_validator_1.RESPONSE_STATUS.BAD_REQUEST).json({ message: "Missing the user id or improper data type" });
            return AccountService_1.default.findAccountById(accountId).then((userAccount) => __awaiter(this, void 0, void 0, function* () {
                if (!userAccount)
                    return response.status(request_body_validator_1.RESPONSE_STATUS.NOT_FOUND).json({ message: "User not found " });
                const blockedUser = yield AccountService_1.default.blockUserById(userAccount.id);
                return response.json(blockedUser);
            })).catch((error) => {
                return response.json({ result: error });
            });
        });
        this.PostActivateUser = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const accountId = (_b = request.params) === null || _b === void 0 ? void 0 : _b.accountId;
            if (!this.isNumber(accountId))
                return response.status(request_body_validator_1.RESPONSE_STATUS.BAD_REQUEST).json({ message: "Missing the user id or improper data type" });
            return AccountService_1.default.findAccountById(accountId).then((userAccount) => __awaiter(this, void 0, void 0, function* () {
                if (!userAccount)
                    return response.status(request_body_validator_1.RESPONSE_STATUS.NOT_FOUND).json({ message: "User not found " });
                const blockedUser = yield AccountService_1.default.activateUserById(userAccount.id);
                return response.json(blockedUser);
            })).catch((error) => {
                return response.json({ result: error });
            });
        });
        this.isNumber = (value) => {
            return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
        };
    }
}
exports.default = new UserCallbacks();
