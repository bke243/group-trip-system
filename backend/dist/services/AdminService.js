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
const AdminEntity_1 = __importDefault(require("../models/AdminEntity"));
const index_util_1 = require("../utils/index.util");
const AccountService_1 = __importDefault(require("./AccountService"));
const PersonService_1 = __importDefault(require("./PersonService"));
class AdminService {
    constructor() {
        this.getRepository = () => {
            return this.adminRepository;
        };
        this.getAdmins = () => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.find();
        });
        this.getAdminsWithPersonDetails = () => __awaiter(this, void 0, void 0, function* () {
            const persons = yield (yield PersonService_1.default.getPersons()).reduce((indexedPersons, person) => {
                indexedPersons[person.accountId] = person;
                return indexedPersons;
            }, {});
            const admins = yield this.getRepository().find();
            const mappedAdmin = admins.map((admin) => (Object.assign(Object.assign({}, admin), { adminDetails: persons[admin.accountId] })));
            return mappedAdmin;
        });
        this.createAdminEntity = (newPersonAccount) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.create({
                account: newPersonAccount.id,
                accountId: newPersonAccount.id,
            });
        });
        this.saveAdmin = (admin) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.save(admin);
        });
        this.findAdminByEmail = (accountEmail) => __awaiter(this, void 0, void 0, function* () {
            return AccountService_1.default.findAccountByEmail(accountEmail).then((userAccount) => {
                if (userAccount)
                    return this.findAdminByAccountId(userAccount.id);
                return;
            });
        });
        this.findAdminByAccountId = (accountId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.findOne({ where: { accountId: accountId } });
        });
        this.adminRepository = (0, typeorm_1.getConnectionManager)().get(index_util_1.APPLICATION_CONNECTION_NAME).getRepository(AdminEntity_1.default);
    }
}
exports.default = new AdminService();
