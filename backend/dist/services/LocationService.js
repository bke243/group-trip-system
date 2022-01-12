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
const LocationEntity_1 = __importDefault(require("../models/LocationEntity"));
const index_util_1 = require("../utils/index.util");
class LocationService {
    constructor() {
        this.getRepository = () => {
            return this.locationRepository;
        };
        this.getLocations = () => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.find({ relations: ["country", "city"] });
        });
        this.createLocationEntity = (location) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.create({
                streetName: location.streetName,
                zipCode: location.zipCode,
                state: location.state,
                country: location.countryId,
                countryId: location.countryId,
                cityId: location.cityId,
                city: location.cityId,
            });
        });
        this.saveLocation = (location) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            const existingLocation = yield repository.findOne({ where: {
                    streetName: location.streetName,
                    zipCode: location.zipCode,
                    state: location.state,
                    country: location.countryId,
                    countryId: location.countryId,
                    cityId: location.cityId,
                    city: location.cityId
                } });
            if (existingLocation)
                return existingLocation;
            return repository.save(location);
        });
        this.findLocationByAccountId = (accountId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.findOne({ where: { accountId: accountId } });
        });
        this.locationRepository = (0, typeorm_1.getConnectionManager)().get(index_util_1.APPLICATION_CONNECTION_NAME).getRepository(LocationEntity_1.default);
    }
}
exports.default = new LocationService();
