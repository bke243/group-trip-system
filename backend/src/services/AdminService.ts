import { getConnectionManager, Repository } from "typeorm";
import AccountEntity from "../models/AccountEntity";
import AdminEntity from "../models/AdminEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";

class AdminService {
  private adminRepository: Repository<AdminEntity>;
  constructor() {
    this.adminRepository = getConnectionManager().get(APPLICATION_CONNECTION_NAME).getRepository(AdminEntity);
  }

  public getRepository = () => {
    return this.adminRepository;
  }

  public getAdmins = async () => {
    const repository = this.getRepository();
    return repository.find();
  }

  public createAdminEntity = async (newPersonAccount: AccountEntity) => {
    const repository = this.getRepository();
    return repository.create({ 
        account: newPersonAccount.id,
        accountId: newPersonAccount.id,
     })
  }

  public saveAdmin = async (admin: AdminEntity) => {
    const repository = this.getRepository();
    return repository.save(admin);
  }

  public findAdminByAccountId = async (accountId: number) => {
    const repository = this.getRepository();
    return repository.findOne({ where: { accountId: accountId  }});
  }
}

export default new AdminService();