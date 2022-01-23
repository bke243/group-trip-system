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
const index_util_1 = require("./../utils/index.util");
const typeorm_1 = require("typeorm");
const FeedbackEntity_1 = __importDefault(require("../models/FeedbackEntity"));
const GroupService_1 = __importDefault(require("./GroupService"));
const PackageService_1 = __importDefault(require("./PackageService"));
const PackageEntity_1 = __importDefault(require("../models/PackageEntity"));
const AccountService_1 = __importDefault(require("./AccountService"));
const PurchaseService_1 = __importDefault(require("./PurchaseService"));
const GroupEntity_1 = __importDefault(require("../models/GroupEntity"));
const PurchaseDetailEntity_1 = __importDefault(require("../models/PurchaseDetailEntity"));
const AccountEntity_1 = __importDefault(require("../models/AccountEntity"));
const UserService_1 = __importDefault(require("./UserService"));
const GroupUserService_1 = __importDefault(require("./GroupUserService"));
const UserEntity_1 = __importDefault(require("../models/UserEntity"));
class FeedbackService {
    constructor() {
        this.getRepository = () => {
            return this.FeedbackRepository;
        };
        this.FeedbackRepository = (0, typeorm_1.getConnectionManager)().get(index_util_1.APPLICATION_CONNECTION_NAME).getRepository(FeedbackEntity_1.default);
    }
    createFeedback(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            const userData = request.body.userAccountData;
            const user = yield UserService_1.default.findUserByAccountId(userData.userAccountId);
            if (user instanceof UserEntity_1.default) {
                const account = yield AccountService_1.default.findAccountById(userData.userAccountId);
                const group = yield GroupService_1.default.findGroupById(request.body.group_id);
                const current_package = yield PackageService_1.default.findPackageById(request.body.package_id);
                if (group instanceof GroupEntity_1.default && current_package instanceof PackageEntity_1.default) {
                    const verifyUser = yield GroupUserService_1.default.verifyUser(user === null || user === void 0 ? void 0 : user.id, group === null || group === void 0 ? void 0 : group.id);
                    if (!(verifyUser[1] == 0)) {
                        const purchase_detail = yield PurchaseService_1.default.getPurchaseByPackageAndGroup(current_package, group);
                        if (purchase_detail instanceof PurchaseDetailEntity_1.default && account instanceof AccountEntity_1.default) {
                            if (new Date(current_package.endDate).getTime() < Date.now()) {
                                try {
                                    const newFeedback = repository
                                        .insert({
                                        account: account.id,
                                        purchase: purchase_detail.id,
                                        feedback: request.body.feedback
                                    });
                                    return newFeedback;
                                }
                                catch (e) {
                                    console.log(e);
                                    throw `${e}`;
                                }
                            }
                            else {
                                console.log('HEEEEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
                                throw 'Package has not ended yet';
                            }
                        }
                        else {
                            throw 'Purchase was not made by this user in this group for this package';
                        }
                    }
                    else {
                        throw 'User not part of the group';
                    }
                }
                else {
                    throw 'Package or Group not found';
                }
            }
            else {
                throw 'User not found for this token';
            }
        });
    }
}
exports.default = new FeedbackService();
