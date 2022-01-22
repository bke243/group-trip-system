import { UserAccountData } from './../middlewares/check-user-auth';
import jwt from 'jsonwebtoken';
import { APPLICATION_CONNECTION_NAME } from './../utils/index.util';
import { getConnectionManager } from 'typeorm';
import { Repository } from 'typeorm';
import PurchaseDetailEntity from '../models/PurchaseDetailEntity';
import AccountCallbacks from '../middleware-callbacks/AccountCallbacks';
import UserService from './UserService';
import AccountService from './AccountService';
import PackageService from './PackageService';
import AdminService from './AdminService';
import GroupService from './GroupService';
import GroupUserService from './GroupUserService';
import GroupEntity from '../models/GroupEntity';
import PackageEntity from '../models/PackageEntity';


class PurchaseService {
    private PurchaseRepository: Repository<PurchaseDetailEntity>
    constructor() {
        this.PurchaseRepository = getConnectionManager().get(APPLICATION_CONNECTION_NAME).getRepository(PurchaseDetailEntity);
    }

    public async createPurchase(request: any) :Promise<PurchaseDetailEntity> {
        const user = await UserService.findUserByAccountId(request.body.userAccountData.userAccountId);
        const current_package = await PackageService.findPackageById(request.body.package_id);
        if(!(current_package instanceof PackageEntity)) throw Error('Package not found');
        console.log(request.body.userAccountData);
        const group = await GroupService.findGroupById(request.body.group_id);
        if(!(group instanceof GroupEntity)) throw Error('Group not found');
        const admin = await AdminService.findAdminByAccountId(request.body.userAccountData.userAccountId)
        const userCountInGroup = await GroupUserService.getGroupUserCount(group.id)
        if(current_package.maxPersons >= userCountInGroup) throw Error('Package already has maximum number of people allowed, sorry :(')
        if(!(current_package.admin == admin?.id)) throw Error('User is not the owner of this package therefore cannot make a purchase')
        const payment_details = request.body.payment_details;
        if(payment_details.expiry_year == Number(new Date().getFullYear().toString().substr(-2)) && payment_details.expiry_month < (new Date().getMonth()+1)) {
            throw Error('Your card has expired');
        } else {
            try {
                const newPurchase = await this.PurchaseRepository
                    .create({
                        cost: current_package.price,
                        purchase_status: 'paid',
                        group: group,
                        groupId: group.id
                    })
                await PackageService.decreasePackageCount(current_package.id);
                return newPurchase;
            } catch(e) {
                throw Error(`${e}`);
            }
        }
    }
}

export default new PurchaseService();