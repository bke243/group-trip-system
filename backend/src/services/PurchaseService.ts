import { APPLICATION_CONNECTION_NAME } from './../utils/index.util';
import { getConnectionManager } from 'typeorm';
import { Repository } from 'typeorm';
import PurchaseDetailEntity from '../models/PurchaseDetailEntity';
import PackageService from './PackageService';
import AdminService from './AdminService';
import GroupService from './GroupService';
import GroupUserService from './GroupUserService';
import GroupEntity from '../models/GroupEntity';
import PackageEntity from '../models/PackageEntity';


class PurchaseService {
    private PurchaseDetailRepository: Repository<PurchaseDetailEntity>;
  constructor() {
    this.PurchaseDetailRepository = getConnectionManager().get(APPLICATION_CONNECTION_NAME).getRepository(PurchaseDetailEntity);
  }

  public getRepository = () => {
    return this.PurchaseDetailRepository;
  }

    public async createPurchase(request: any) {
        const repository = this.getRepository();
        const current_package = await PackageService.findPackageById(request.body.package_id);
        const group = await GroupService.findGroupById(request.body.group_id);
        if (current_package instanceof PackageEntity && group instanceof GroupEntity) {
            const admin = await AdminService.findAdminByAccountId(request.body.userAccountData.userAccountId)
            const userCountInGroup = await GroupUserService.getGroupUserCount(group.id)
            if (current_package.maxPersons >= userCountInGroup) {
                if (current_package.adminId == admin?.id) {
                    const payment_details = request.body.payment_details;
                    if (current_package.count >= 1) {
                        if(payment_details.expiry_year == Number(new Date().getFullYear().toString().substr(-2)) && payment_details.expiry_month < (new Date().getMonth()+1)) {
                            throw Error('Your card has expired');
                        } else {
                            try {
                                const newPurchaseObject = {
                                    cost: current_package.price,
                                    paid: true,
                                    group: group.id,
                                    groupId: group.id,
                                    package: current_package.id,
                                    packageId: current_package.id
                                }
                                const decreaseCount = await PackageService.decreasePackageCount(current_package.id);
                                if (!decreaseCount) throw Error('Error when decreasing the count for package'); 
                                return repository.insert(newPurchaseObject)
                            } catch(e) {
                                throw `${e}`;
                            }
                        }
                    } else {
                        throw 'Sorry no more place left for this package'
                    }
                } else {
                    throw 'User is not the owner of this package therefore cannot make a purchase';
                }
            } else {
                throw 'Count of users in the group exceed the number of allowed people for the package';
            }
        } else {
            throw 'Package and Group not found';
        }
        
    }

    public async getPurchaseByPackageAndGroup(my_package: PackageEntity, group: GroupEntity) :Promise<PurchaseDetailEntity> {
        try {
            const my_purchase = await this.PurchaseDetailRepository
                .findOne({
                    where: {
                        package: my_package.id,
                        packageId: my_package.id,
                        group: group.id,
                        groupId: group.id
                    }
                })
            if(!(my_purchase instanceof PurchaseDetailEntity)) throw Error('Purchase not found');
            return my_purchase;
        } catch(e) {
            throw Error(`${e}`);
        }
    }
}

export default new PurchaseService();