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
const PackageEntity_1 = __importDefault(require("../models/PackageEntity"));
const index_util_1 = require("../utils/index.util");
class PackageService {
    constructor() {
        this.getRepository = () => {
            return this.locationRepository;
        };
        this.getPackages = () => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.find();
        });
        this.createPackageEntity = (packageCreateData) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.create({
                name: packageCreateData.name,
                activities: packageCreateData.activities,
                description: packageCreateData.description,
                price: packageCreateData.price,
                created: new Date(),
                startDate: packageCreateData.startDate,
                endDate: packageCreateData.endDate,
                count: packageCreateData.count,
                maxPersons: packageCreateData.maxPersons,
                location: packageCreateData.locationId,
                locationId: packageCreateData.locationId,
                adminId: packageCreateData.adminId,
                admin: packageCreateData.adminId,
            });
        });
        this.createPackageEntityWithoutKeys = (packageCreateData) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.create({
                name: packageCreateData.name,
                activities: packageCreateData.activities,
                description: packageCreateData.description,
                price: packageCreateData.price,
                created: new Date(),
                startDate: packageCreateData.startDate,
                endDate: packageCreateData.endDate,
                count: packageCreateData.count,
                maxPersons: packageCreateData.maxPersons,
                location: packageCreateData.locationId,
                locationId: packageCreateData.locationId,
                adminId: packageCreateData.adminId,
                admin: packageCreateData.adminId,
            });
        });
        this.savePackage = (packageEntity) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.save(packageEntity);
        });
        this.updatePackage = (packageId, packageEntity) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository
                .query(`UPDATE package_entity SET 
      name = $2, 
      activities = $3, 
      description = $4,
      price = $5,
      count = $6,
      startDate = $7,
      endDate = $8,
      maxPersons = $9,
      locationId = $10
      WHERE id = $1`, [packageId, packageEntity.name, packageEntity.activities, packageEntity.description, packageEntity.price,
                packageEntity.count, packageEntity.startDate, packageEntity.endDate, packageEntity.maxPersons, packageEntity.locationId]);
        });
        this.findPackageById = (packageId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.findOne({ where: { id: packageId }, relations: ["location", "location.city", "location.country"] });
        });
        this.deletePackageById = (packageEntity) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.delete({ id: packageEntity.id });
        });
        this.decreasePackageCount = (packageId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            const my_package = yield repository.findOne({ id: packageId });
            if (!(my_package instanceof PackageEntity_1.default))
                throw Error('Package not found');
            const decreaseCount = yield repository
                .update({
                id: my_package.id
            }, {
                count: my_package.count - 1
            })
                .then(() => {
                return true;
            })
                .catch(err => {
                return err;
            });
        });
        this.locationRepository = (0, typeorm_1.getConnectionManager)().get(index_util_1.APPLICATION_CONNECTION_NAME).getRepository(PackageEntity_1.default);
    }
}
exports.default = new PackageService();
