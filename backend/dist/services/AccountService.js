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
const typeorm_1 = require("typeorm");
const AccountEntity_1 = __importDefault(require("../models/AccountEntity"));
const index_util_1 = require("../utils/index.util");
class AccountService {
    constructor() {
        this.getRepository = () => {
            return this.accountRepository;
        };
        this.getAccounts = () => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.find();
        });
        this.createAccountEntity = (newAccountDetails) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.create({
                created: new Date(),
                email: newAccountDetails.email,
                password: newAccountDetails.password,
            });
        });
        this.saveAccount = (account) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.save(account);
        });
        this.findAccountByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.findOne({ where: { email: email } });
        });
        this.findAccountById = (accountId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.findOne({ where: { id: accountId } });
        });
        this.blockUserById = (accountId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            const userEntity = yield repository.findOne({ where: { id: accountId } });
            userEntity.isActive = false;
            return repository.save(userEntity);
        });
        this.activateUserById = (accountId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            const userEntity = yield repository.findOne({ where: { id: accountId } });
            userEntity.isActive = true;
            return repository.save(userEntity);
        });
        this.accountRepository = (0, typeorm_1.getConnectionManager)().get(index_util_1.APPLICATION_CONNECTION_NAME).getRepository(AccountEntity_1.default);
    }
}
exports.default = new AccountService();
