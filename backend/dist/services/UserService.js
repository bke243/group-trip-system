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
const UserEntity_1 = __importDefault(require("../models/UserEntity"));
const index_util_1 = require("../utils/index.util");
const PersonService_1 = __importDefault(require("./PersonService"));
class UserService {
    constructor() {
        this.getRepository = () => {
            return this.userRepository;
        };
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.find();
        });
        this.createUserEntity = (newPersonAccount) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.create({
                account: newPersonAccount.id,
                accountId: newPersonAccount.id,
            });
        });
        this.saveUser = (user) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.save(user);
        });
        this.getUserWIthPersonalDetails = () => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            const users = yield (yield repository.find({ relations: ["account"] })).map((user) => ({
                id: user.id,
                accountId: user.accountId,
                email: user.account.email,
                isActive: user.account.isActive
            }));
            const usersAccountIds = [...users].map((user) => user.accountId);
            const personsDetails = yield (yield PersonService_1.default.findPersonsByAccountIds(usersAccountIds)).reduce((persons, nextPerson) => {
                persons[nextPerson.accountId] = nextPerson;
                return persons;
            }, {});
            const usersWithPersonDetails = users.map((user) => (Object.assign(Object.assign({}, user), { personDetails: personsDetails[user.accountId] })));
            return usersWithPersonDetails;
        });
        this.findUserByAccountId = (accountId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.findOne({ where: { accountId: accountId } });
        });
        this.userRepository = (0, typeorm_1.getConnectionManager)().get(index_util_1.APPLICATION_CONNECTION_NAME).getRepository(UserEntity_1.default);
    }
}
exports.default = new UserService();
