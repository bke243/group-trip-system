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
const PersonEntity_1 = __importDefault(require("../models/PersonEntity"));
const index_util_1 = require("../utils/index.util");
class PersonService {
    constructor() {
        this.getRepository = () => {
            return this.personRepository;
        };
        this.getPersons = () => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.find();
        });
        this.createPersonEntity = (newPersonAccount, newPersonDetails) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.create({
                firstName: newPersonDetails.firstName,
                lastName: newPersonDetails.lastName,
                birthDate: newPersonDetails.birthDate,
                telephone: newPersonDetails.telephone,
                account: newPersonAccount.id,
                accountId: newPersonAccount.id,
            });
        });
        this.savePerson = (person) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.save(person);
        });
        this.findPersonByAccountId = (accountId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.findOne({ where: { accountId: accountId } });
        });
        this.findPersonsByAccountIds = (accountIds) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.find({ where: { accountId: (0, typeorm_1.In)(accountIds) } });
        });
        this.personRepository = (0, typeorm_1.getConnectionManager)().get(index_util_1.APPLICATION_CONNECTION_NAME).getRepository(PersonEntity_1.default);
    }
}
exports.default = new PersonService();
