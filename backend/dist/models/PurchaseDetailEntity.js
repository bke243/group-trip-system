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
const GroupEntity_1 = __importDefault(require("./GroupEntity"));
const PackageEntity_1 = __importDefault(require("./PackageEntity"));
let PurchaseDetailEntity = class PurchaseDetailEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PurchaseDetailEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PurchaseDetailEntity.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], PurchaseDetailEntity.prototype, "paid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => GroupEntity_1.default, group => group.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], PurchaseDetailEntity.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PurchaseDetailEntity.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => PackageEntity_1.default, packageEntity => packageEntity.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], PurchaseDetailEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PurchaseDetailEntity.prototype, "countryId", void 0);
PurchaseDetailEntity = __decorate([
    (0, typeorm_1.Entity)()
], PurchaseDetailEntity);
exports.default = PurchaseDetailEntity;
