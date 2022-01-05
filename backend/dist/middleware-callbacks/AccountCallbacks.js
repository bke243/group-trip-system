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
const AccountService_1 = __importDefault(require("../services/AccountService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
const UserService_1 = __importDefault(require("../services/UserService"));
const PersonService_1 = __importDefault(require("../services/PersonService"));
const AdminService_1 = __importDefault(require("../services/AdminService"));
class AccountCallbacks {
    constructor() {
        this.jwtSecret = "do not do it in production";
        this.getAccounts = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield AccountService_1.default.getAccounts();
                return res.json({ accounts });
            }
            catch (error) {
                console.log(error);
                return res.json({ error });
            }
        });
        this.hasAccountWithSameEmail = (req, response, next) => __awaiter(this, void 0, void 0, function* () {
            const newUserEmail = req.body.email;
            return AccountService_1.default.findAccountByEmail(newUserEmail).then((user) => {
                if (user) {
                    return response.status(request_body_validator_1.RESPONSE_STATUS.CONFLICT).json({ status: request_body_validator_1.RESPONSE_STATUS.CONFLICT, result: "User email is already taken" });
                }
                next();
            }).catch((error) => {
                return response.status(request_body_validator_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ status: request_body_validator_1.RESPONSE_STATUS.INTERNAL_SERVER_ERROR, result: error });
            });
        });
        this.postUserSignUp = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const requestBody = request.body;
            return bcrypt_1.default.hash(requestBody.password, 13).then((hashedPassword) => __awaiter(this, void 0, void 0, function* () {
                const updatedRequestBody = Object.assign(Object.assign({}, requestBody), { password: hashedPassword });
                const newAccountEntity = yield AccountService_1.default.createAccountEntity(updatedRequestBody);
                return AccountService_1.default.saveAccount(newAccountEntity);
            })).then((userAccount) => __awaiter(this, void 0, void 0, function* () {
                const userEntity = yield UserService_1.default.createUserEntity(userAccount);
                const personEntity = yield PersonService_1.default.createPersonEntity(userAccount, requestBody);
                yield UserService_1.default.saveUser(userEntity);
                yield PersonService_1.default.savePerson(personEntity);
                const token = jsonwebtoken_1.default.sign({
                    email: userAccount.email, userId: userAccount.id
                }, this.jwtSecret, {
                    expiresIn: "24h"
                });
                return response.status(request_body_validator_1.RESPONSE_STATUS.OK).json({ token: `Bearer ${token}`, personData: { email: userAccount.email, id: userAccount.id } });
            })).catch((error) => {
                return response.json({ result: error });
            });
        });
        this.postAdminSignUp = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const requestBody = request.body;
            return bcrypt_1.default.hash(requestBody.password, 13).then((hashedPassword) => __awaiter(this, void 0, void 0, function* () {
                const updatedRequestBody = Object.assign(Object.assign({}, requestBody), { password: hashedPassword });
                const newAccountEntity = yield AccountService_1.default.createAccountEntity(updatedRequestBody);
                return AccountService_1.default.saveAccount(newAccountEntity);
            })).then((userAccount) => __awaiter(this, void 0, void 0, function* () {
                const adminEntity = yield AdminService_1.default.createAdminEntity(userAccount);
                const personEntity = yield PersonService_1.default.createPersonEntity(userAccount, requestBody);
                yield AdminService_1.default.saveAdmin(adminEntity);
                yield PersonService_1.default.savePerson(personEntity);
                const token = jsonwebtoken_1.default.sign({
                    email: userAccount.email, userId: userAccount.id
                }, this.jwtSecret, {
                    expiresIn: "24h"
                });
                return response.status(request_body_validator_1.RESPONSE_STATUS.OK).json({ token: `Bearer ${token}`, personData: { email: userAccount.email, id: userAccount.id } });
            })).catch((error) => {
                return response.json({ result: error });
            });
        });
        this.postLogin = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userEmail = request.body.email;
            return AccountService_1.default.findAccountByEmail(userEmail).then((user) => {
                if (!user) {
                    return response.status(request_body_validator_1.RESPONSE_STATUS.UNAUTHORIZED).json({ status: request_body_validator_1.RESPONSE_STATUS.UNAUTHORIZED, result: "Invalud  email or password" });
                }
                return bcrypt_1.default.compare(request.body.password, user.password).then((doMatch) => {
                    if (doMatch) {
                        const token = jsonwebtoken_1.default.sign({ email: user.email, userId: user.id }, this.jwtSecret, {
                            expiresIn: "24h",
                        });
                        return response.status(request_body_validator_1.RESPONSE_STATUS.OK).json({ token: `Bearer ${token}`, personData: { email: user.email, id: user.id } });
                    }
                    return response.status(request_body_validator_1.RESPONSE_STATUS.UNAUTHORIZED).json({ status: request_body_validator_1.RESPONSE_STATUS.UNAUTHORIZED, result: "Invalud  email or password" });
                });
            }).catch((error) => {
                return response.json({ result: error });
            });
        });
    }
}
exports.default = new AccountCallbacks();
