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
const MessageEntity_1 = __importDefault(require("../models/MessageEntity"));
const index_util_1 = require("../utils/index.util");
class MessageService {
    constructor() {
        this.MessageService = () => {
            return this.messageRepository;
        };
        this.getMessages = () => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.find();
        });
        this.createMessageEntity = (messageDetails) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.create({
                content: messageDetails.content,
                originId: messageDetails.originId,
                receiverId: messageDetails.destinationId,
                sentDate: new Date(),
            });
        });
        this.saveMessageEntity = (messageEntity) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return repository.save(messageEntity);
        });
        this.getMessagesByUserOrAdminId = (userOrAdminid) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            const originMessages = yield repository.find({ where: { originId: userOrAdminid } });
            const destinationMessages = yield repository.find({ where: { receiverId: userOrAdminid } });
            return [...originMessages, ...destinationMessages];
        });
        this.messageRepository = (0, typeorm_1.getConnectionManager)().get(index_util_1.APPLICATION_CONNECTION_NAME).getRepository(MessageEntity_1.default);
    }
    getRepository() {
        return this.messageRepository;
    }
}
exports.default = new MessageService();
