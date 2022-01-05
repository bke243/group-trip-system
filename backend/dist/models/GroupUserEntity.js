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
const UserEntity_1 = __importDefault(require("./UserEntity"));
let GroupUserEntity = class GroupUserEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GroupUserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => GroupEntity_1.default, group => group.id),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Number)
], GroupUserEntity.prototype, "group", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], GroupUserEntity.prototype, "groupId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => UserEntity_1.default, user => user.id),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Number)
], GroupUserEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], GroupUserEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], GroupUserEntity.prototype, "membershipAccepted", void 0);
GroupUserEntity = __decorate([
    typeorm_1.Entity()
], GroupUserEntity);
exports.default = GroupUserEntity;
