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
const AccountService_1 = __importDefault(require("../services/AccountService"));
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.APIKEY,
    },
}));
class GroupUserCallbacks {
    constructor() {
        this.isNumber = (value) => {
            return value != null && value !== "" && !isNaN(Number(value.toString()));
        };
        this.verifyUser = (request, response, next) => {
            var _a, _b;
            return GroupUserService_1.default.verifyUser(parseInt((_a = request.params) === null || _a === void 0 ? void 0 : _a.userId), parseInt((_b = request.params) === null || _b === void 0 ? void 0 : _b.groupId));
        };
        this.addGroupUserByUserEmail = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const groupId = request.body.groupId;
            return GroupService_1.default.findGroupById(groupId).then((foundGroup) => __awaiter(this, void 0, void 0, function* () {
                if (!foundGroup)
                    return response
                        .status(request_body_validator_1.RESPONSE_STATUS.NOT_FOUND)
                        .json({ message: "Group not found " });
                const foundUser = yield UserService_1.default.findUserByAccountId(request.body.userAccountData.userAccountId);
                const requesterId = foundUser === null || foundUser === void 0 ? void 0 : foundUser.id;
                if (foundGroup.ownerId !== requesterId)
                    return response
                        .status(request_body_validator_1.RESPONSE_STATUS.NOT_FOUND)
                        .json({ message: "Requester has no permission!" });
                const emailAccount = yield AccountService_1.default.findAccountByEmail(request.body.email);
                const userEmailAccount = yield UserService_1.default.findUserByAccountId(emailAccount === null || emailAccount === void 0 ? void 0 : emailAccount.id);
                if (!userEmailAccount)
                    return response
                        .status(request_body_validator_1.RESPONSE_STATUS.NOT_FOUND)
                        .json({ message: "Email not found " });
                const groupUserBody = {
                    groupId: groupId,
                    userId: userEmailAccount.id,
                    membershipAccepted: false,
                };
                const newGroupUserEntity = yield GroupUserService_1.default.createGroupUserEntity(groupUserBody);
                const foundGroupUser = yield GroupUserService_1.default.findGroupUserByGroupIdUserId(groupId, userEmailAccount.id);
                if (foundGroupUser)
                    return response
                        .status(request_body_validator_1.RESPONSE_STATUS.NOT_FOUND)
                        .json({ message: "Invitation already sent!" });
                const createdGroupUser = yield GroupUserService_1.default.saveGroupUser(newGroupUserEntity);
                return GroupUserService_1.default.getGroupUserByGroupId(groupId)
                    .then((foundGroupCollection) => {
                    for (let index = 0; index < foundGroupCollection.length; index++) {
                        const element = foundGroupCollection[index];
                        console.log(process.env.SEND_GRID_API_KEY);
                        const user = element.user;
                        const account = user.account;
                        if (account.email === request.body.email) {
                            if (element.membershipAccepted === true)
                                return response.json({ message: "Already member!" });
                            else {
                                transporter.sendMail({
                                    to: request.body.email,
                                    from: "257307@student.pwr.edu.pl",
                                    subject: "Group trip invitation!",
                                    html: "Click to accept <a href='http://127.0.0.1:5000/groupUser/verify/" +
                                        element.userId +
                                        "/" +
                                        element.groupId +
                                        "'> invitation!</a>",
                                });
                                return response.json({ message: "Ok!" });
                            }
                        }
                    }
                    return response.json({ message: "Something went wrong!" });
                })
                    .catch((error) => {
                    return response.status(500).json({ error });
                });
            }));
        });
        this.deleteGroupUserByUserId = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const userId = parseInt((_a = request.params) === null || _a === void 0 ? void 0 : _a.userId);
            const groupId = parseInt((_b = request.params) === null || _b === void 0 ? void 0 : _b.groupId);
            if (!this.isNumber(userId))
                return response
                    .status(request_body_validator_1.RESPONSE_STATUS.BAD_REQUEST)
                    .json({ message: "Missing the user id or improper data type" });
            return GroupService_1.default.findGroupById(groupId)
                .then((requesterGroup) => __awaiter(this, void 0, void 0, function* () {
                const foundUser = yield UserService_1.default.findUserByAccountId(request.body.userAccountData.userAccountId);
                if ((requesterGroup === null || requesterGroup === void 0 ? void 0 : requesterGroup.ownerId) !== (foundUser === null || foundUser === void 0 ? void 0 : foundUser.id)) {
                    return response
                        .status(request_body_validator_1.RESPONSE_STATUS.UNAUTHORIZED)
                        .json({ message: "User has no permission!" });
                }
                const deleteGroupUserResult = GroupUserService_1.default.deleteGroupUserByUserId(userId, groupId);
                return response.json(deleteGroupUserResult);
            }))
                .catch((error) => {
                return response.status(500).json({ error });
            });
        });
    }
}
exports.default = new GroupUserCallbacks();
