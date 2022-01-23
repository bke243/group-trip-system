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
const PackageService_1 = __importDefault(require("./PackageService"));
const AdminService_1 = __importDefault(require("./AdminService"));
const GroupService_1 = __importDefault(require("./GroupService"));
const GroupUserService_1 = __importDefault(require("./GroupUserService"));
const GroupEntity_1 = __importDefault(require("../models/GroupEntity"));
const PackageEntity_1 = __importDefault(require("../models/PackageEntity"));
class PurchaseService {
    constructor() {
        this.getRepository = () => {
            return this.PurchaseDetailRepository;
        };
        this.PurchaseDetailRepository = (0, typeorm_1.getConnectionManager)().get(index_util_1.APPLICATION_CONNECTION_NAME).getRepository(PurchaseDetailEntity_1.default);
    }
    createPurchase(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            const current_package = yield PackageService_1.default.findPackageById(request.body.package_id);
            const group = yield GroupService_1.default.findGroupById(request.body.group_id);
            if (current_package instanceof PackageEntity_1.default && group instanceof GroupEntity_1.default) {
                const admin = yield AdminService_1.default.findAdminByAccountId(request.body.userAccountData.userAccountId);
                const userCountInGroup = yield GroupUserService_1.default.getGroupUserCount(group.id);
                if (current_package.maxPersons >= userCountInGroup) {
                    if (current_package.adminId == (admin === null || admin === void 0 ? void 0 : admin.id)) {
                        const payment_details = request.body.payment_details;
                        if (current_package.count >= 1) {
                            if (payment_details.expiry_year == Number(new Date().getFullYear().toString().substr(-2)) && payment_details.expiry_month < (new Date().getMonth() + 1)) {
                                throw Error('Your card has expired');
                            }
                            else {
                                try {
                                    const newPurchaseObject = {
                                        cost: current_package.price,
                                        paid: true,
                                        group: group.id,
                                        groupId: group.id,
                                        package: current_package.id,
                                        packageId: current_package.id
                                    };
                                    const decreaseCount = yield PackageService_1.default.decreasePackageCount(current_package.id);
                                    if (!decreaseCount)
                                        throw Error('Error when decreasing the count for package');
                                    return repository.insert(newPurchaseObject);
                                }
                                catch (e) {
                                    throw `${e}`;
                                }
                            }
                        }
                        else {
                            throw 'Sorry no more place left for this package';
                        }
                    }
                    else {
                        throw 'User is not the owner of this package therefore cannot make a purchase';
                    }
                }
                else {
                    throw 'Count of users in the group exceed the number of allowed people for the package';
                }
            }
            else {
                throw 'Package and Group not found';
            }
        });
    }
    getPurchaseByPackageAndGroup(my_package, group) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const my_purchase = yield this.PurchaseDetailRepository
                    .findOne({
                    where: {
                        package: my_package.id,
                        packageId: my_package.id,
                        group: group.id,
                        groupId: group.id
                    }
                });
                if (!(my_purchase instanceof PurchaseDetailEntity_1.default))
                    throw Error('Purchase not found');
                return my_purchase;
            }
            catch (e) {
                throw Error(`${e}`);
            }
        });
    }
}
exports.default = new PurchaseService();
