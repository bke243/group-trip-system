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
class AccountController {
    constructor() {
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
        this.createAccount = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = req.body;
                const newAccountEntity = yield AccountService_1.default.createAccountEntity(requestBody);
                const result = yield AccountService_1.default.saveAccount(newAccountEntity);
                return res.json({ result });
            }
            catch (error) {
                console.log(error);
            }
            return res.send("could not create Account");
        });
    }
}
exports.default = new AccountController();
