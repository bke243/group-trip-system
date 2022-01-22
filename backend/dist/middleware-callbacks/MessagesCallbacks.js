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
const MessageService_1 = __importDefault(require("../services/MessageService"));
const request_body_validator_1 = require("../middlewares/request-body-validator");
class MessageCallbacks {
    constructor() {
        this.getAllMessages = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            return MessageService_1.default.getMessages().then((messages) => {
                return response.json(messages);
            }).catch((error) => {
                return response.json({ error });
            });
        });
        this.getAllMessagesByUserOrAdmin = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userOrAdminId = (_a = request.params) === null || _a === void 0 ? void 0 : _a.userOrAdminId;
            if (!this.isNumber(userOrAdminId))
                return response.status(request_body_validator_1.RESPONSE_STATUS.BAD_REQUEST).json({ message: "Missing the id of the sender or receiver or improper data type" });
            return MessageService_1.default.getMessagesByUserOrAdminId(userOrAdminId).then((messages) => {
                return response.json(messages);
            }).catch((error) => {
                return response.json({ error });
            });
        });
        this.createMessage = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const requestBody = request.body;
            const messageEntity = yield MessageService_1.default.createMessageEntity({
                content: requestBody.content,
                destinationId: requestBody.receiverId,
                originId: requestBody.userAccountData.userAccountId
            });
            return MessageService_1.default.saveMessageEntity(messageEntity).then((message) => {
                return response.json(message);
            }).catch((error) => {
                return response.json({ error });
            });
        });
        this.isNumber = (value) => {
            return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
        };
    }
}
exports.default = new MessageCallbacks();
