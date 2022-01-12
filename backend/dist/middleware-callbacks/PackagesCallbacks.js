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
const PackageService_1 = __importDefault(require("../services/PackageService"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
const AdminService_1 = __importDefault(require("../services/AdminService"));
const CountryService_1 = __importDefault(require("../services/CountryService"));
const LocationService_1 = __importDefault(require("../services/LocationService"));
const CityService_1 = __importDefault(require("../services/CityService"));
class PackagesCallbacks {
    constructor() {
        this.getPackages = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            return PackageService_1.default.getPackages().then((packages) => {
                return response.json(packages);
            }).catch((error) => {
                return response.status(500).json({ error });
            });
        });
        this.getPackageById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const packageId = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id;
            if (!this.isNumber(packageId))
                return response.status(request_body_validator_1.RESPONSE_STATUS.BAD_REQUEST).json({ message: "Missing the package id or improper data type" });
            return PackageService_1.default.findPackageById(packageId).then((foundPackage) => {
                if (!foundPackage)
                    return response.status(request_body_validator_1.RESPONSE_STATUS.NOT_FOUND).json({ message: "Package not found " });
                const flatPackage = Object.assign({}, foundPackage);
                const packageLocation = flatPackage.location;
                flatPackage.city = packageLocation.city.name;
                flatPackage.country = packageLocation.country.name;
                flatPackage.streetName = packageLocation.streetName;
                flatPackage.zipCode = packageLocation === null || packageLocation === void 0 ? void 0 : packageLocation.zipCode;
                flatPackage.state = packageLocation === null || packageLocation === void 0 ? void 0 : packageLocation.state;
                delete flatPackage.location;
                return response.json(flatPackage);
            }).catch((error) => {
                return response.status(500).json({ error });
            });
        });
        this.isNumber = (value) => {
            return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
        };
        this.createPackages = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const requestBody = request.body;
            return AdminService_1.default.findAdminByEmail(requestBody.userAccountData.email).then((adminRequester) => __awaiter(this, void 0, void 0, function* () {
                if (!adminRequester)
                    return response.status(request_body_validator_1.RESPONSE_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
                // creating country 
                const countryEntity = yield CountryService_1.default.createCountryEntity(requestBody.country.toLowerCase());
                const createdCountry = yield CountryService_1.default.saveCountry(countryEntity);
                // create city
                const cityEntity = yield CityService_1.default.createCityEntity({ name: requestBody.city.toLowerCase(), countryId: createdCountry.id });
                const createdCity = yield CityService_1.default.saveCity(cityEntity);
                // create loaction
                const locationEnity = yield LocationService_1.default.createLocationEntity({ streetName: requestBody.streetName,
                    state: requestBody === null || requestBody === void 0 ? void 0 : requestBody.state,
                    zipCode: requestBody === null || requestBody === void 0 ? void 0 : requestBody.zipCode,
                    countryId: createdCountry.id,
                    cityId: createdCity.id });
                const createdLocation = yield LocationService_1.default.saveLocation(locationEnity);
                // package
                const packageEntity = yield PackageService_1.default.createPackageEntity(Object.assign(Object.assign({}, requestBody), { locationId: createdLocation.id, adminId: adminRequester.id }));
                const createdPackage = yield PackageService_1.default.savePackage(packageEntity);
                return response.json({ package: createdPackage });
            })).catch((error) => {
                return response.status(500).json({ error });
            });
        });
        this.updatePackage = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const packageId = (_b = request.params) === null || _b === void 0 ? void 0 : _b.id;
            const requestBody = request.body;
            if (!this.isNumber(packageId))
                return response.status(request_body_validator_1.RESPONSE_STATUS.BAD_REQUEST).json({ message: "Missing the package id or improper data type" });
            if (parseInt(packageId) !== requestBody.id)
                return response.status(request_body_validator_1.RESPONSE_STATUS.BAD_REQUEST).json({ message: "Missing the package id or improper data type" });
            return PackageService_1.default.findPackageById(requestBody.id).then((foundPackage) => __awaiter(this, void 0, void 0, function* () {
                if (!foundPackage)
                    return response.status(request_body_validator_1.RESPONSE_STATUS.NOT_FOUND).json({ message: "Package not found " });
                // creating country 
                const countryEntity = yield CountryService_1.default.createCountryEntity(requestBody.country.toLowerCase());
                const createdCountry = yield CountryService_1.default.saveCountry(countryEntity);
                // create city
                const cityEntity = yield CityService_1.default.createCityEntity({ name: requestBody.city.toLowerCase(), countryId: createdCountry.id });
                const createdCity = yield CityService_1.default.saveCity(cityEntity);
                // create loaction
                const locationEnity = yield LocationService_1.default.createLocationEntity({ streetName: requestBody.streetName,
                    state: requestBody === null || requestBody === void 0 ? void 0 : requestBody.state,
                    zipCode: requestBody === null || requestBody === void 0 ? void 0 : requestBody.zipCode,
                    countryId: createdCountry.id,
                    cityId: createdCity.id });
                const createdLocation = yield LocationService_1.default.saveLocation(locationEnity);
                // package
                const packageEntity = yield PackageService_1.default.createPackageEntity(Object.assign({}, requestBody));
                // delete packageEntity.admin;
                // delete packageEntity.adminId;
                const updatedPackage = yield PackageService_1.default.updatePackage(requestBody.id, packageEntity);
                // delete flatPackage.location;
                return response.json({ package: updatedPackage });
            })).catch((error) => {
                return response.status(500).json({ error });
            });
        });
        this.deletePackageById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            var _c;
            const packageId = (_c = request.params) === null || _c === void 0 ? void 0 : _c.id;
            if (!this.isNumber(packageId))
                return response.status(request_body_validator_1.RESPONSE_STATUS.BAD_REQUEST).json({ message: "Missing the package id or improper data type" });
            return PackageService_1.default.findPackageById(packageId).then((foundPackage) => {
                if (!foundPackage)
                    return response.status(request_body_validator_1.RESPONSE_STATUS.NOT_FOUND).json({ message: "Package not found " });
                const deletepackageResult = PackageService_1.default.deletePackageById(foundPackage);
                return response.json(deletepackageResult);
            }).catch((error) => {
                return response.status(500).json({ error });
            });
        });
    }
}
exports.default = new PackagesCallbacks();
