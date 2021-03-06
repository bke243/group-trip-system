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
const CityEntity_1 = __importDefault(require("../models/CityEntity"));
const index_util_1 = require("../utils/index.util");
class CityService {
    constructor() {
        this.getRepository = () => {
            return this.cityRepository;
        };
        this.getCity = () => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.find();
        });
        this.createCityEntity = (city) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.create({
                name: city.name,
                country: city.countryId,
                countryId: city.countryId,
            });
        });
        this.saveCity = (city) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            const hasCity = yield repository.findOne({ where: { name: city.name } });
            if (hasCity)
                return hasCity;
            return repository.save(city);
        });
        this.findCityById = (contryId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.findOne({ where: { id: contryId } });
        });
        this.cityRepository = (0, typeorm_1.getConnectionManager)().get(index_util_1.APPLICATION_CONNECTION_NAME).getRepository(CityEntity_1.default);
    }
}
exports.default = new CityService();
