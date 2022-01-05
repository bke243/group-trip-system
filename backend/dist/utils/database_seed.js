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
exports.addDummyPackages = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AccountService_1 = __importDefault(require("../services/AccountService"));
const AdminService_1 = __importDefault(require("../services/AdminService"));
const PersonService_1 = __importDefault(require("../services/PersonService"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
const PackageEntity_1 = __importDefault(require("../models/PackageEntity"));
const LocationEntity_1 = __importDefault(require("../models/LocationEntity"));
const CountryEntity_1 = __importDefault(require("../models/CountryEntity"));
const CityEntity_1 = __importDefault(require("../models/CityEntity"));
const CountryService_1 = __importDefault(require("../services/CountryService"));
const CityService_1 = __importDefault(require("../services/CityService"));
const LocationService_1 = __importDefault(require("../services/LocationService"));
const PackageService_1 = __importDefault(require("../services/PackageService"));
const addDummyPackages = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dummySingUpDto = {
        email: "dummy5@gmail.com",
        firstName: "firstname",
        lastName: "last name",
        password: "password",
        telephone: "535735",
        birthDate: "11/07/2021",
    };
    return bcrypt_1.default.hash(dummySingUpDto.password, 13).then((hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedRequestBody = Object.assign(Object.assign({}, dummySingUpDto), { password: hashedPassword });
        const newAccountEntity = yield AccountService_1.default.createAccountEntity(updatedRequestBody);
        return AccountService_1.default.saveAccount(newAccountEntity);
    })).then((userAccount) => __awaiter(void 0, void 0, void 0, function* () {
        const adminEntity = yield AdminService_1.default.createAdminEntity(userAccount);
        const personEntity = yield PersonService_1.default.createPersonEntity(userAccount, dummySingUpDto);
        const admin = yield AdminService_1.default.saveAdmin(adminEntity);
        yield PersonService_1.default.savePerson(personEntity);
        const today = new Date();
        const location = new LocationEntity_1.default();
        const country = new CountryEntity_1.default();
        const city = new CityEntity_1.default();
        country.name = "France";
        city.name = "Panama";
        location.streetName = "marie curie sklodowskiej";
        location.zipCode = "50-370";
        location.state = "some loaction";
        const createdCountry = yield CountryService_1.default.saveCountry(country);
        city.country = createdCountry.id;
        city.countryId = createdCountry.id;
        const createdCity = yield CityService_1.default.saveCity(city);
        location.city = createdCity.id;
        location.cityId = createdCity.id;
        location.country = createdCountry.id;
        location.countryId = createdCountry.id;
        const createdLoaction = yield LocationService_1.default.saveLocation(location);
        const packageNames = ["package 1", "package 2", "package 3", "package 4", "package 5"];
        packageNames.forEach((packageName) => __awaiter(void 0, void 0, void 0, function* () {
            const packageEntity = new PackageEntity_1.default();
            packageEntity.name = packageName;
            packageEntity.activities = ["It is a long established fact that a reader will be distracted", "It is a long established fact that a reader will be distracted", "It is a long established fact that a reader will be distracted"];
            packageEntity.description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry";
            packageEntity.price = 454056;
            packageEntity.created = new Date();
            packageEntity.startDate = new Date();
            packageEntity.endDate = new Date(today.getTime() + 86400000);
            packageEntity.count = 10;
            packageEntity.maxPersons = 10;
            packageEntity.location = createdLoaction.id;
            packageEntity.locationId = createdLoaction.id;
            packageEntity.admin = admin.id;
            packageEntity.adminId = admin.id;
            const createdPackage = yield PackageService_1.default.savePackage(packageEntity);
            console.log(createdPackage);
        }));
        return response.status(request_body_validator_1.RESPONSE_STATUS.OK).json({ message: "successfully done" });
    })).catch((error) => {
        return response.json({ result: error });
    });
});
exports.addDummyPackages = addDummyPackages;
