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
const GroupService_1 = __importDefault(require("../services/GroupService"));
const GroupUserService_1 = __importDefault(require("../services/GroupUserService"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
const UserService_1 = __importDefault(require("../services/UserService"));
class GroupCallbacks {
    constructor() {
        this.getGroups = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            return GroupService_1.default.getGroups().then((groups) => {
                return response.json(groups);
            }).catch((error) => {
                return response.json(error);
            });
        });
        this.isNumber = (value) => {
            return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
        };
        this.createGroups = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const requestBody = request.body;
            return UserService_1.default.findUserByAccountId(requestBody.userAccountData.userAccountId).then((foundUser) => __awaiter(this, void 0, void 0, function* () {
                const newGroupEntity = yield GroupService_1.default.createGroupEntity(requestBody, foundUser === null || foundUser === void 0 ? void 0 : foundUser.id);
                const createdGroup = yield GroupService_1.default.saveGroup(newGroupEntity);
                const groupUserBody = { groupId: createdGroup.id, userId: requestBody.userAccountData.userAccountId, membershipAccepted: true };
                const newGroupUserEntity = yield GroupUserService_1.default.createGroupUserEntity(groupUserBody);
                const createdGroupUser = yield GroupUserService_1.default.saveGroupUser(newGroupUserEntity);
                return response.json({ createdGroup: createdGroup });
            })).catch((error) => {
                return response.status(500).json({ error });
            });
        });
        this.updateGroup = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const groupId = (_a = request.params) === null || _a === void 0 ? void 0 : _a.groupId;
            const requestBody = request.body;
            if (!this.isNumber(groupId))
                return response.status(request_body_validator_1.RESPONSE_STATUS.BAD_REQUEST).json({ message: "Missing the group id or improper data type" });
            if (parseInt(groupId) !== requestBody.groupId)
                return response.status(request_body_validator_1.RESPONSE_STATUS.BAD_REQUEST).json({ message: "Missing the group id or improper data type" });
            return GroupService_1.default.findGroupById(requestBody.groupId).then((foundGroup) => __awaiter(this, void 0, void 0, function* () {
                if (!foundGroup)
                    return response.status(request_body_validator_1.RESPONSE_STATUS.NOT_FOUND).json({ message: "Group not found " });
                const foundUser = yield UserService_1.default.findUserByAccountId(requestBody.userAccountData.userAccountId);
                // group
                const groupEntityBody = { name: requestBody.name, destination: requestBody.destination, description: requestBody.description };
                const groupEntity = yield GroupService_1.default.createGroupEntity(groupEntityBody, foundUser === null || foundUser === void 0 ? void 0 : foundUser.id);
                if (foundGroup.ownerId !== (foundUser === null || foundUser === void 0 ? void 0 : foundUser.id)) {
                    return response.status(request_body_validator_1.RESPONSE_STATUS.UNAUTHORIZED).json({ message: "User has no permission!" });
                }
                const updatedGroup = yield GroupService_1.default.updateGroup(requestBody.groupId, groupEntity);
                return response.json({ group: updatedGroup });
            })).catch((error) => {
                return response.status(500).json({ error });
            });
        });
        this.deleteGroupById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const groupId = (_b = request.params) === null || _b === void 0 ? void 0 : _b.groupId;
            if (!this.isNumber(groupId))
                return response.status(request_body_validator_1.RESPONSE_STATUS.BAD_REQUEST).json({ message: "Missing the group id or improper data type" });
            return GroupService_1.default.findGroupById(groupId).then((foundGroup) => __awaiter(this, void 0, void 0, function* () {
                if (!foundGroup)
                    return response.status(request_body_validator_1.RESPONSE_STATUS.NOT_FOUND).json({ message: "Group not found " });
                const foundUser = yield UserService_1.default.findUserByAccountId(request.body.userAccountData.userAccountId);
                if (foundGroup.ownerId !== (foundUser === null || foundUser === void 0 ? void 0 : foundUser.id)) {
                    return response.status(request_body_validator_1.RESPONSE_STATUS.UNAUTHORIZED).json({ message: "User has no permission!" });
                }
                const deleteGroupUserResult = GroupUserService_1.default.deleteGroupUserByGroupId(foundGroup.id);
                const deleteGroupResult = GroupService_1.default.deleteGroupById(foundGroup.id);
                return response.json(deleteGroupResult);
            })).catch((error) => {
                return response.status(500).json({ error });
            });
        });
    }
}
exports.default = new GroupCallbacks();
