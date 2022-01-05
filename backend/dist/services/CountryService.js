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
const CountryEntity_1 = __importDefault(require("../models/CountryEntity"));
const index_util_1 = require("../utils/index.util");
class CountryService {
    constructor() {
        this.getRepository = () => {
            return this.countryRepository;
        };
        this.getCountries = () => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.find();
        });
        this.createCountryEntity = (country) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.create({
                name: country.name,
            });
        });
        this.saveCountry = (country) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.save(country);
        });
        this.findCountryById = (contryId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.findOne({ where: { id: contryId } });
        });
        this.countryRepository = typeorm_1.getConnectionManager().get(index_util_1.APPLICATION_CONNECTION_NAME).getRepository(CountryEntity_1.default);
    }
}
exports.default = new CountryService();
