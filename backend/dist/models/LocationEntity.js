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
const CityEntity_1 = __importDefault(require("./CityEntity"));
const CountryEntity_1 = __importDefault(require("./CountryEntity"));
let LocationEntity = class LocationEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LocationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LocationEntity.prototype, "streetName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "zipCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => CityEntity_1.default, city => city.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], LocationEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LocationEntity.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => CountryEntity_1.default, country => country.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], LocationEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LocationEntity.prototype, "countryId", void 0);
LocationEntity = __decorate([
    (0, typeorm_1.Entity)()
], LocationEntity);
exports.default = LocationEntity;
