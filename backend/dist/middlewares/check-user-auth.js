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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AccountCallbacks_1 = __importDefault(require("../middleware-callbacks/AccountCallbacks"));
const request_body_validator_1 = require("./request-body-validator");
const isUserAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization ? req.headers.authorization.split(" ")[1] : "";
        const decoded = yield jsonwebtoken_1.default.verify(authorization, AccountCallbacks_1.default.jwtSecret);
        req.body.userAccountData = Object.assign(Object.assign({}, decoded), { userAccountId: decoded.userId });
    }
    catch (error) {
        res.status(request_body_validator_1.RESPONSE_STATUS.UNAUTHORIZED).json({ messagr: "Unauthorized" });
    }
    next();
});
exports.default = isUserAuthenticated;
