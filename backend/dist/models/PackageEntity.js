"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AdminEntity_1 = __importDefault(require("./AdminEntity"));
const LocationEntity_1 = __importDefault(require("./LocationEntity"));
let PackageEntity = class PackageEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PackageEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PackageEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("text", { array: true }),
    __metadata("design:type", Array)
], PackageEntity.prototype, "activities", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PackageEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PackageEntity.prototype, "price", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], PackageEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], PackageEntity.prototype, "startDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], PackageEntity.prototype, "endDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PackageEntity.prototype, "count", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PackageEntity.prototype, "maxPersons", void 0);
__decorate([
    typeorm_1.ManyToOne(type => AdminEntity_1.default, admin => admin.id),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Number)
], PackageEntity.prototype, "admin", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PackageEntity.prototype, "adminId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => LocationEntity_1.default, location => location.id),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Number)
], PackageEntity.prototype, "location", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PackageEntity.prototype, "locationId", void 0);
PackageEntity = __decorate([
    typeorm_1.Entity()
], PackageEntity);
exports.default = PackageEntity;
