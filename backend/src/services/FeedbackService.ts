import { APPLICATION_CONNECTION_NAME } from './../utils/index.util';
import { getConnectionManager } from 'typeorm';
import { Repository } from 'typeorm';
import FeedbackEntity from '../models/FeedbackEntity';
import GroupService from './GroupService';
import PackageService from './PackageService';
import PackageEntity from '../models/PackageEntity';
import AccountService from './AccountService';
import PurchaseService from './PurchaseService';
import GroupEntity from '../models/GroupEntity';
import PurchaseDetailEntity from '../models/PurchaseDetailEntity';
import AccountEntity from '../models/AccountEntity';
import UserService from './UserService';
import GroupUserService from './GroupUserService';
import UserEntity from '../models/UserEntity';


class FeedbackService {
    private FeedbackRepository: Repository<FeedbackEntity>
    constructor() {
        this.FeedbackRepository = getConnectionManager().get(APPLICATION_CONNECTION_NAME).getRepository(FeedbackEntity);
    }

    public getRepository = () => {
        return this.FeedbackRepository;
    }

    public async createFeedback(request: any) {
        const repository = this.getRepository();
        const userData = request.body.userAccountData;
        const user = await UserService.findUserByAccountId(userData.userAccountId);
        if (user instanceof UserEntity) {
            const account = await AccountService.findAccountById(userData.userAccountId);
            const group = await GroupService.findGroupById(request.body.group_id);
            const current_package = await PackageService.findPackageById(request.body.package_id);
            if (group instanceof GroupEntity && current_package instanceof PackageEntity) {
                const verifyUser = await GroupUserService.verifyUser(user?.id, group?.id)
                if (!(verifyUser[1] == 0)) {
                    const purchase_detail = await PurchaseService.getPurchaseByPackageAndGroup(current_package, group);
                    if (purchase_detail instanceof PurchaseDetailEntity && account instanceof AccountEntity) {
                        if (new Date(current_package.endDate).getTime() < Date.now()) {
                            try {
                                const newFeedback = repository
                                    .insert({
                                        account: account.id,
                                        purchase: purchase_detail.id,
                                        feedback: request.body.feedback
                                    })
                                return newFeedback;
                            } catch(e) {
                                console.log(e);
                                throw `${e}`
                            }
                        } else {
                            console.log('HEEEEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
                            throw 'Package has not ended yet';
                        }
                    } else {
                        throw 'Purchase was not made by this user in this group for this package';
                    }
                } else {
                    throw 'User not part of the group'
                }
            } else {
                throw 'Package or Group not found'
            }
        } else {
            throw 'User not found for this token'
        }
        
        
    }
}

export default new FeedbackService();