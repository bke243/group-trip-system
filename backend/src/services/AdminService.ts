import { getConnectionManager, Repository } from "typeorm";
import AccountEntity from "../models/AccountEntity";
import AdminEntity from "../models/AdminEntity";
import PersonEntity from "../models/PersonEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";
import AccountService from "./AccountService";
import PersonService from "./PersonService";

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

  public getAdminsWithPersonDetails = async () => {
    const persons = await (await PersonService.getPersons()).reduce((indexedPersons, person) => {
      indexedPersons[person.accountId] = person;
      return indexedPersons
    }, {} as { [accountId: number]: PersonEntity });
    const admins = await this.getRepository().find();
    const mappedAdmin = admins.map((admin) => ({ ...admin, adminDetails: persons[admin.accountId] }));

    return mappedAdmin;
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

  public findAdminByEmail = async (accountEmail: string) => {
    return AccountService.findAccountByEmail(accountEmail).then((userAccount) => {
      if (userAccount) return this.findAdminByAccountId(userAccount.id);
      return;
    })
  }

  public findAdminByAccountId = async (accountId: number) => {
    const repository = this.getRepository();
    return repository.findOne({ where: { accountId: accountId  }});
  }
}

export default new AdminService();