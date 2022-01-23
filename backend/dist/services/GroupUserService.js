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
const GroupUserEntity_1 = __importDefault(require("../models/GroupUserEntity"));
const index_util_1 = require("../utils/index.util");
class GroupUserService {
    constructor() {
        this.getRepository = () => {
            return this.groupUserRepository;
        };
        this.getGroupUser = () => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.find();
        });
        this.getGroupUserByGroupId = (groupId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.find({
                where: { groupId: groupId },
                relations: ["user", "user.account"]
            });
        });
        this.createGroupUserEntity = (groupUserCreateData) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.create({
                groupId: groupUserCreateData.groupId,
                userId: groupUserCreateData.userId,
                membershipAccepted: groupUserCreateData.membershipAccepted
            });
        });
        this.saveGroupUser = (groupUserEntity) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.save(groupUserEntity);
        });
        this.findGroupUserById = (userId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.findOne({
                where: { userId: userId }
            });
        });
        this.findGroupUserByGroupIdUserId = (groupId, userId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.findOne({
                where: { groupId: groupId, userId: userId }
            });
        });
        this.verifyUser = (userId, groupId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.query(`UPDATE group_user_entity SET 
      "membershipAccepted" = $1
      WHERE "groupId" = $2 and "userId" = $3`, [
                true,
                groupId,
                userId
            ]);
        });
        this.deleteGroupUserByGroupId = (groupId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.delete({ groupId: groupId });
        });
        this.deleteGroupUserByUserId = (userId, groupId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.delete({ userId: userId, groupId: groupId });
        });
        this.getGroupUserCount = (groupId) => __awaiter(this, void 0, void 0, function* () {
            const userCount = yield this.getRepository().findAndCount({ groupId: groupId });
            return userCount[1];
        });
        this.groupUserRepository = (0, typeorm_1.getConnectionManager)()
            .get(index_util_1.APPLICATION_CONNECTION_NAME)
            .getRepository(GroupUserEntity_1.default);
    }
}
exports.default = new GroupUserService();
