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
        this.savePackage = (user) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.save(user);
        });
        this.findPackageById = (accountId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.findOne({ where: { id: accountId } });
        });
        this.locationRepository = typeorm_1.getConnectionManager().get(index_util_1.APPLICATION_CONNECTION_NAME).getRepository(PackageEntity_1.default);
    }
}
exports.default = new PackageService();
