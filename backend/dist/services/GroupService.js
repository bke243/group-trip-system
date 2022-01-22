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
const GroupEntity_1 = __importDefault(require("../models/GroupEntity"));
const index_util_1 = require("../utils/index.util");
class GroupService {
    constructor() {
        this.getRepository = () => {
            return this.groupRepository;
        };
        this.getGroups = () => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.find({ relations: ["owner", "owner.account"] });
        });
        this.createGroupEntity = (groupCreateData, ownerId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.create({
                name: groupCreateData.name,
                created: new Date(),
                ownerId: ownerId,
                destination: groupCreateData.destination,
                description: groupCreateData.description,
            });
        });
        this.saveGroup = (groupEntity) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.save(groupEntity);
        });
        this.updateGroup = (groupId, groupEntity) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.query(`UPDATE group_entity SET 
      name = $1,
      destination = $2,
      description = $3
      WHERE id = $4`, [
                groupEntity.name,
                groupEntity.destination,
                groupEntity.description,
                groupId
            ]);
        });
        this.findGroupById = (groupId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.findOne({
                where: { id: groupId }
            });
        });
        this.deleteGroupById = (groupId) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.delete({ id: groupId });
        });
        this.groupRepository = (0, typeorm_1.getConnectionManager)()
            .get(index_util_1.APPLICATION_CONNECTION_NAME)
            .getRepository(GroupEntity_1.default);
    }
}
exports.default = new GroupService();
