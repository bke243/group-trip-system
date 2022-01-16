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
const AdminService_1 = __importDefault(require("../services/AdminService"));
const AccountService_1 = __importDefault(require("../services/AccountService"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
class AdminCallbacks {
    constructor() {
        this.getAdmins = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            return AdminService_1.default.getAdminsWithPersonDetails().then((admins) => {
                return response.json(admins);
            }).catch((error) => {
                return response.json({ error });
            });
        });
        this.isAdminUser = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userEmail = request.body.userAccountData.email;
            try {
                const userAccount = yield AccountService_1.default.findAccountByEmail(userEmail);
                if (!userAccount)
                    return response.status(request_body_validator_1.RESPONSE_STATUS.UNAUTHORIZED).json({ status: request_body_validator_1.RESPONSE_STATUS.UNAUTHORIZED, result: "Not 1 Authorized" });
                const adminUser = yield AdminService_1.default.findAdminByAccountId(userAccount.id);
                if (!adminUser)
                    response.status(request_body_validator_1.RESPONSE_STATUS.UNAUTHORIZED).json({ status: request_body_validator_1.RESPONSE_STATUS.UNAUTHORIZED, result: "Not Authorized" });
            }
            catch (error) {
                return response.status(request_body_validator_1.RESPONSE_STATUS.BAD_REQUEST).json({ message: error });
            }
            next();
        });
    }
}
exports.default = new AdminCallbacks();
