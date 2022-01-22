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
const PurchaseDetailEntity_1 = __importDefault(require("../models/PurchaseDetailEntity"));
const UserService_1 = __importDefault(require("./UserService"));
const PackageService_1 = __importDefault(require("./PackageService"));
const AdminService_1 = __importDefault(require("./AdminService"));
const GroupService_1 = __importDefault(require("./GroupService"));
const GroupUserService_1 = __importDefault(require("./GroupUserService"));
const GroupEntity_1 = __importDefault(require("../models/GroupEntity"));
const PackageEntity_1 = __importDefault(require("../models/PackageEntity"));
class PurchaseService {
    constructor() {
        this.PurchaseRepository = (0, typeorm_1.getConnectionManager)().get(index_util_1.APPLICATION_CONNECTION_NAME).getRepository(PurchaseDetailEntity_1.default);
    }
    createPurchase(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserService_1.default.findUserByAccountId(request.body.userAccountData.userAccountId);
            const current_package = yield PackageService_1.default.findPackageById(request.body.package_id);
            if (!(current_package instanceof PackageEntity_1.default))
                throw Error('Package not found');
            console.log(request.body.userAccountData);
            const group = yield GroupService_1.default.findGroupById(request.body.group_id);
            if (!(group instanceof GroupEntity_1.default))
                throw Error('Group not found');
            const admin = yield AdminService_1.default.findAdminByAccountId(request.body.userAccountData.userAccountId);
            const userCountInGroup = yield GroupUserService_1.default.getGroupUserCount(group.id);
            if (current_package.maxPersons >= userCountInGroup)
                throw Error('Package already has maximum number of people allowed, sorry :(');
            if (!(current_package.admin == (admin === null || admin === void 0 ? void 0 : admin.id)))
                throw Error('User is not the owner of this package therefore cannot make a purchase');
            const payment_details = request.body.payment_details;
            if (payment_details.expiry_year == Number(new Date().getFullYear().toString().substr(-2)) && payment_details.expiry_month < (new Date().getMonth() + 1)) {
                throw Error('Your card has expired');
            }
            else {
                try {
                    const newPurchase = yield this.PurchaseRepository
                        .create({
                        cost: current_package.price,
                        purchase_status: 'paid',
                        group: group,
                        groupId: group.id
                    });
                    yield PackageService_1.default.decreasePackageCount(current_package.id);
                    return newPurchase;
                }
                catch (e) {
                    throw Error(`${e}`);
                }
            }
        });
    }
}
exports.default = new PurchaseService();
